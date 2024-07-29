var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

var id = getUrlParameter('id'), f_name, C_number, C_email, user__gender, user_gender;

var cohort = getUrlParameter('cohort');

if (id) {
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');

if (!id) {
  alert('Your recommendation is not found. Please fill the diagnosis to help us share the recommended plan.');
  document.location.href= 'https://form.traya.health/questions?cohort=1&source=ResultPage'
  jQuery('[data-formPage]').show();
  jQuery('[data-resultPage]').hide();
}
var baseUrls = {
  DEV: 'https://api.v2dev.hav-g.in/',
  PROD: 'https://api.hav-g.in/'
}
var tokens = {
  DEV:{ 
    "Authorization": "Bearer e2623576-930b-48b6-81e2-a3cb5e37f47d"
  },
  PROD: { 
    "Authorization": "Bearer d7ef603e-71ea-44a1-93f2-2bacd08c4a90"
  }
}
var token = tokens.PROD;
var baseUrl = baseUrls.PROD;
var liveendpoint = 'https://api.hav-g.in/dgReport?id=';
if (cohort == 2) {
  liveendpoint = baseUrl + 'dgReport/v2?id=';
} else {
  liveendpoint = baseUrl + 'dgReport/v1?id=';
}
liveendpoint = 'https://api.hav-g.in/dgReport/v4?id=';
var stageDescription = {
  "Stage-1": "You’ve come to us at the right time! We can help you get that voluminous hair back.",
  "Stage-2": "Your hair loss has begun but you’re just in time to re-grow them quickly!",
  "Stage-3": "Your hair loss is significant but we can help you regrow and control any further hair loss.",
  "Stage-4": "Hair loss at this stage is manageable, start immediately for best results.",
  "Stage-5": "At this stage we cannot guarantee hair regrowth but can stop further hair loss.",
  "Stage-6": "At this stage we cannot guarantee hair regrowth but can stop further hair loss.",
  "Heavy Hair Fall Across The Head": "Your hair loss is 100% reversible. All we have to do is treat the root cause.",
  "Coin Size Patch": "You have alopecia areata. It’s quite difficult to treat this type of hair loss."
};

var selectedStage = 'Stage-1';


var variantsID = 0;
function displayProduct(data) {
var $ = jQuery;
  var r = Object.assign(data.User_Analysis, data.Recommendations);
  f_name = r.first_name;
  l_name = r.last_name;
  C_number = r.phone;
  user__gender = r.gender;
  if(user__gender == 'M') {
    user_gender = 'Male';
  }else if(user__gender == 'F') {
    user_gender = 'Female';
  }

  $('.productt').hide();
  if (r.Health_tatva === 'Yes') {
    $('#healthTatva').show();
    getProductByHandle('herbal-tablets');
    var Desc = 'Ayurvedic herbs to boost absorption of nutrients for improved energy and hair health';
  }

  if (r.Gut_shuddi === 'Yes') {
    $('#gutShuddhi').show();
    getProductByHandle('avipattikar-digestion-tablets');
    var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
  }
  if (r.Minoxidil === 'Yes' && r.gender === 'M') {
    getProductByHandle('traya-minoxidil-5');
    $('#hairSerum').show();
    var Desc = 'Minoxidil 5% for male androgenic alopecia hair loss and hair growth';
  }
  if (r.Minoxidil === 'Yes' && r.gender === 'F') {
    getProductByHandle('minoxidil-2');
    $('#hairSerum').show();
    var Desc = 'Minoxidil 2% treatment for female androgenic alopecia hair loss and hair growth';
  }
  if (r.Shampoo === 'Normal') {
    $('#shampooDarmotology').show();
    getProductByHandle('shampoo');
    var Desc = 'Chemical-free hair and scalp cleanser shampoo';
  }
  if (r.Shampoo === 'Anti dandruff') {
    $('#hairAntidandruff').show();
    getProductByHandle('anti-dandruff-shampoo');
    var Desc = 'Made with antifungal ingredients for getting rid of dandruff of all types';
  }
  if (r.Hair_vitamin == 'Yes') { 
    $('#hairVitamins').show();
    getProductByHandle('hair-vitamins');
    var Desc = '100% Vegetarian supplements for hair to combat vitamin deficiency related hair loss';
  }

  if ((r.Serum === 'Yes') && (r.RCP === 'No')) {
    $('#hairRootserum').show();
    getProductByHandle('recap-serum-for-hair-fall-control');
    var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
  } 
  
  if (r.RCP === 'Yes') {
    $('#hairRootserum').show();
    getProductByHandle('recap-serum-for-hair-fall-control');
    var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
  }
  
  if (r.Hair_ras === 'Yes') {
    getProductByHandle('hair-growth-herbs');
    var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
  }

  if (r.Scalp_oil === 'Yes' || r.Scalp_oil === 'bergamot and ylang ylang') {
        var boosterOil = '';
    if (r.Calm_Therapy_Booster_Oil === 'Yes'){
     boosterOil = ' + Calm Therapy Booster Oil';
     getProductByHandle('scalp-oil-with-calm-therapy-booster-shots', boosterOil);
    }else if (r.Dandruff_Therapy_Booster_Oil === 'Yes'){
     boosterOil = ' + Dandruff Therapy Booster Oil';
      getProductByHandle('scalp-oil-with-dandruff-therapy-booster-shots', boosterOil);
    }else if (r.Growth_Therapy_Booster_Oil === 'Yes'){
     boosterOil = ' + Growth Therapy Booster Oil';
      getProductByHandle('scalp-oil-with-growth-therapy-booster-shots', boosterOil);
    }else if (r.Scalp_Therapy_Booster_Oil === 'Yes'){
     boosterOil = ' + Scalp Therapy Booster Oil';
      getProductByHandle('scalp-oil-with-scalp-therapy-booster-shots', boosterOil);
    }else{
     getProductByHandle('scalp-oil-with-growth-therapy-booster-shots', boosterOil); 
    }
    $('#scalpOil').show();
    
    var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
  }

  if (r.Kevon === 'Yes') {
      $('#hairRootserum').show();
      getProductByHandle('ketoconazole-2-night-lotion');
      var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';

     // getProductByHandle('kevon-lotion-1');
     //  var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
    }
  
  // if (r.Nasya === 'Yes') {
  //   getProductByHandle('shatavari-ghrita');
  //   var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
  // }
  
  if (r.Digest_Boost === 'Yes') {
      getProductByHandle('digest-boost-for-improved-digestive-ability-traya-health');
      var Desc = 'A herbal, all-natural formulation with saunf and jeera for relieving digestive problems.';
  }
  
  if(r.gender === 'M'){
    $('[data-gender]').append('Male');
  } else {
    $('[data-gender]').append('Female');
  }
  
}


var prices = 0, doc__fee = 100000, diet__plan = 50000, hair__coach_fee = 50000, month1_total, month1DiscountPrice, month3DiscountPrice, month6DiscountPrice;
var variantsIDs = [];
function getProductByHandle(handle, adtitle) {
var $ = jQuery;
  jQuery.getJSON('/products/'+handle+'.js', function(product) {
    

    if (handle === 'customised-diet-plan' || handle === 'prescription-from-ayurveda-doctor-and-dermatologist-included') {

    } else {
      
      if(product.title == 'Minoxidil 5% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var title = 'Minoxidil 5%';
        var Desc = 'Minoxidil 5% for male androgenic alopecia hair loss and hair growth';
        var productSub = 'For regrowth of thicker and healthier looking hair in Male Pattern Hair loss';
        var productDesc = 'Targets root causes of hair thinning, receding hairline and hair fall such as shrinking of hair follicles due to DHT, poor blood flow to hair follicles and undernourished hair follcles. Made with ingredients like Minoxidil 5%, Finasteride 0.1% and Procapil 3%, that are clinically proven to regrow thick and healthy hair in men experiencing androgenic alopecia.';
        var prodContent = `<p>Clinically proven treatment for pattern hair loss to promote hair regrowth.</p> <ul>
							<li>Increases hair thickness</li>
<li>Strengthens hair follicles</li>
<li>Improves blood flow to the scalp</li>
<li>Improves hair thickness</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Minoxidil 5%, Procapil 0.3%, Finasteride 0.1%</p>`;
      }
      if(product.title == 'Hair Vitamin with DHT Blockers | Biotin and Bhringraj'){
        var title = 'Hair Vitamins';
        var Desc = '100% Vegetarian supplements for hair to combat vitamin deficiency related hair loss';
        var productSub = 'Improve your hair health with the right nutrition';
        var productDesc = 'Targets root causes of hair loss such as vitamin deficiency, poor nutrition and DHT. Made with clinically tested safe and natural ingredients to promote thicker, healthier hair and reduce hair fall. Fortified with biotin and natural DHT blockers like pumpkin seed extract, pygeum, green tea extract and bhringraj.';
      	var prodContent = `<p>Your daily vitamin fix. Contains biotin and grapeseed extracts that help strengthen hair follicles.</p> <ul>
							<li>Repairs damaged hair</li>
<li>Improves skin and hair</li>
<li>Strengthens hair</li>
<li>Boosts immune system</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Zinc, Selenium, Bhringaraj, Omega 3, Pumpkin Seed</p>`;
      }
      if(product.title == 'Hair Ras Ayurvedic Hair Herbs | 100% Natural Hair Supplement with Bhringraj'){
        var title = 'Hair Ras';
        var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
        var productSub = 'An ayurvedic herb mix that improves hair quality and delays greying';
        var productDesc = 'Nourishes hair internally with essential supplements with a formulation of rare and effective Ayurvedic herbs. Targets poor hair follicle health, dosha imbalance and poor blood flow to the scalp. Inadequate sleep, diet and lifestyle can cause an imbalance of hormones. Adaptogenic herbs in hair ras such as bhringraj, shatavari and ashwagandha help restore that. Made with proven, safe and natural ingredients these Ayurvedic multivitamin tablets help promote hair health.';
      	var prodContent = `<p>Ayurvedic herb mix that nourishes your hair and keeps it healthy.</p> <ul>
							<li>Improves blood circulation</li>
<li>Promotes hair growth</li>
<li>Delays premature greying</li>
							</ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Bhringraj, Ashwagandha, Amla, Shatavari, Tapyadi lauh, Shankhpushpi and Arjuna.</p>`;
      }
      if(product.title == 'Scalp Oil with Essential Oils for Hair Growth with Bhringraj'){
        var title = 'Scalp Oil'+adtitle;
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>100% natural customised scalp oil to suit your specific hair concerns.</p> <ul>
							<li>Maintains scalp pH</li>
<li>Stimulates hair growth</li>
<li>Controls dandruff</li>
<li>Improvises hair thickness</li>
							</ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Aloe vera, Brahmi, Bhringraj, Amla, Gudduchi, Kari patta, Yashtimadhu, Goat milk, Coconut oil.</p>`;
      }
      if(product.handle == 'scalp-oil-with-scalp-therapy-booster-shots'){
        var title = product.title.split('|')[0];
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>100% natural customised scalp oil to suit your specific hair concerns.</p> <ul>
                          <li>Maintains scalp pH</li>
                          <li>Stimulates hair growth</li>
                          <li>Controls dandruff</li>
                          <li>Improvises hair thickness</li>
                          </ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Aloe vera, Brahmi, Bhringraj, Amla, Gudduchi, Kari patta, Yashtimadhu, Goat milk, Coconut oil.</p>`;
      }
      if(product.handle == 'scalp-oil-with-growth-therapy-booster-shots'){
        var title = product.title.split('|')[0];
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>100% natural customised scalp oil to suit your specific hair concerns.</p> <ul>
                          <li>Maintains scalp pH</li>
                          <li>Stimulates hair growth</li>
                          <li>Controls dandruff</li>
                          <li>Improvises hair thickness</li>
                          </ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Aloe vera, Brahmi, Bhringraj, Amla, Gudduchi, Kari patta, Yashtimadhu, Goat milk, Coconut oil.</p>`;
      }
      if(product.handle == 'scalp-oil-with-dandruff-therapy-booster-shots'){
        var title = product.title.split('|')[0];
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>100% natural customised scalp oil to suit your specific hair concerns.</p> <ul>
                          <li>Maintains scalp pH</li>
                          <li>Stimulates hair growth</li>
                          <li>Controls dandruff</li>
                          <li>Improvises hair thickness</li>
                          </ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Aloe vera, Brahmi, Bhringraj, Amla, Gudduchi, Kari patta, Yashtimadhu, Goat milk, Coconut oil.</p>`;
      }
      if(product.handle == 'scalp-oil-with-calm-therapy-booster-shots'){
        var title = product.title.split('|')[0];
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>100% natural customised scalp oil to suit your specific hair concerns.</p> <ul>
                          <li>Maintains scalp pH</li>
                          <li>Stimulates hair growth</li>
                          <li>Controls dandruff</li>
                          <li>Improvises hair thickness</li>
                          </ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Aloe vera, Brahmi, Bhringraj, Amla, Gudduchi, Kari patta, Yashtimadhu, Goat milk, Coconut oil.</p>`;
      }
      if(product.title == 'Health Tatva for Energy | Absorption | Immunity | Fatigue'){
        var title = 'Health Tatva';
        var Desc = 'Ayurvedic herbs to boost absorption of nutrients for improved energy and hair health';
        var productSub = 'Detoxify your way to healthier hair';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor nutrition, sluggish metabolism, absorption, and fatigue. Made with proven, safe and natural ingredients, these immunity booster tablets promote overall health for hair fall control and hair growth. Suitable for those with gas, acidity, bloating and low energy levels.';
        var prodContent = `<p>Natural herbs that bring about internal balance by improving metabolism and digestion.</p> <ul>
							<li>Increases energy levels</li>
<li>Boosts immunity</li>
<li>Improves absorption</li>
<li>Promotes gut health</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Sonth, Black Pepper, Guduchi, Pippali, Cumin</p>`;
      }
      if(product.title == 'ReCaP Serum for Hair Fall Control and Hair Growth | Contains Redensyl, Procapil and Capixyl (30 ml)'){
        var title = 'ReCaP Hair Serum';
        var Desc = 'A serum to strengthen hair roots, improve scalp circulation and boost hair growth in early stages of hair loss.';
        var productSub = 'Promotes hair regrowth naturally by improving follicle health';
        var productDesc = 'Targets root causes of hair fall control such as premature ageing of hair follicles, shrinking hair follicles and weak hair roots. Traya Hair Root Serum is made with patented and clincally proven ingredients like Redensyl 3%, Caffeine, Biotin and Cressatine. Recommended for early stages (1 & 2) of pattern hair loss and telogen effluvium.';
        var prodContent = `<p>A serum to strengthen hair roots, improve scalp circulation and boost hair growth in early stages of hair loss.</p> <ul>
							<li>Delays ageing of hair roots</li>
<li>Makes hair strands thicker</li>
<li>Reverses the effect of DHT</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Redensyl, Procapil, Capixyl</p>`;
      }
      if(product.title == 'Minoxidil 2% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var title = 'Minoxidil 2%';
        var Desc = 'Minoxidil 2% treatment for female androgenic alopecia hair loss and hair growth';
        var productSub = 'For regrowth of thicker and healthier looking hair in Female Pattern Hair loss';
        var productDesc = 'Targets root causes of hair thinning, widened partition and hair fall such as shrinking of hair follicles due to DHT, poor blood flow to hair follicles and undernourished hair roots. Made with ingredients like Minoxidil 2% and Procapil 3%, that are clinically proven to regrow thick and healthy hair in women experiencing androgenic alopecia';
        var prodContent = `<p>Clinically proven treatment for pattern hair loss to promote hair regrowth.</p> <ul>
							<li>Increases hair thickness</li>
<li>Strengthens hair follicles</li>
<li>Maintains scalp health</li>
<li>Improves hair thickness</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Minoxidil 2%, Procapil 0.3%</p>`;
      }
      if(product.title == 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days'){
        var title = 'Gut Shuddhi';
        var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
        var productSub = 'Fix your digestion to fix your hair loss';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor digestion, incomplete bowel movements, low gut motility and toxins. Made with safe and natural ayurvedic herbs these digestion tablets promote overall health for controlling hair fall and hair growth. Suitable for those with unsatisfactory bowel movements, improper diet and brain fog. Perfect for a gut cleanse and detox.';
        var prodContent = `<p>A natural herb mix that detoxifies and maintains healthy digestion.</p> <ul>
							<li>Relieves constipation, acid reflux and gas</li>
<li>Cleanses and detoxifies the gut</li>
<li>Aids digestion</li>
							</ul>`;
        var prodContent2 = `<p><b>Herbs:</b> Bibhitaki, Amla, Haritaki, Cardamom, Clove, Ginger, Bay leaf and more.</p>`;
      }
      if(product.title == 'Traya Nasal Drops with Shatavari for Nourishing Hair Follicles'){
          var title = 'Nasal Drops';
          var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
          var productSub = 'Sleep better and manage stress';
          var productDesc = 'Targets root causes of hair fall and hair thinning such as poor sleep pattern, physical and mental stress. Traya Shatavari Ghrit is made with Ayurvedic herbs and pure ghee to promote overall health for stronger, thicker hair and reduced hair loss.';
          var prodContent = `<p>Medicated herbal oil to nourish hair follicles and reduce sleep-related hair fall/ hair loss</p> <ul>
<li>Aids restful sleep</li>
<li>Controls hair loss</li>
<li>Reduces stress</li>
<li>Relieves headaches</li>
</ul>`;
          var prodContent2 = `<p><b>Ingredients:</b> Shatavari, Ghee, Yashtimadhu, Jatamansi.</p>`;
        }
      if(product.title == 'Defence shampoo | Mild Shampoo with Biotin (100 ml)'){
        var title = 'Defence Shampoo';
        var Desc = 'Chemical-free hair and scalp cleanser shampoo';
        var productSub = 'Nourishes, strengthens and moisturizes hair. Doesn’t claim to stop hair fall.';
        var productDesc = 'When we say shampoos don’t help resolve hair loss, we stand by it. Shampoos help cleanse the scalp of oil, dirt, dust and residue. So if you already own a chemical-free shampoo, go ahead and use it. If you want to try something new or are on the Traya Hair Loss Regime. This mild cleansing formula is made with ingredients like Biotin, Niacinamide, and Pea Sprout extracts for a clean and healthy scalp and hair.';
        var prodContent = `<p>A gentle hair cleanser that nourishes, strengthens and moisturizes your hair.</p> <ul>
							<li>Protects hair from damage</li>
<li>Maintains scalp health</li>
<li>Improves hair quality</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Biotin, Pea sprouts, Niacinamide</p>`;
      }
      if(product.title == 'Anti-Dandruff Shampoo with Ichthammol & Aloevera | Paraben Free'){
        var title = 'Anti-Dandruff Shampoo';
        var Desc = 'Made with antifungal ingredients for getting rid of dandruff of all types';
        var productSub = 'Fights dandruff to give you a clean and reduces irritation';
        var productDesc = 'Made with clinically proven antifungal and soothing ingredients such as Ichthammol and aloevera. This medicinal anti-dandruff shampoo gets rid of mild, flaky and heavy dandruff. It also prevents the recurrence of dandruff and improves scalp health';
        var prodContent = `<p>Unique combination that reduces dandruff caused by fungal or an oily scalp.</p> <ul>
							<li>Hydrates scalp</li>
<li>Reduces Itchiness</li>
<li>Removes dandruff</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Ichthammol, Anti-dandruff solution 2% and aloe vera</p>`;
      }
      if(product.title == 'Scalp Controller | Plant Based Dandruff Treatment for Itchy Scalp'){
        var title = 'Scalp Controller';
        var Desc = 'Instant relief for scalp itching and irritation caused by dandruff';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p>Targets the root causes of itchy scalp to provide instant relief.</p> <ul>
							<li>Soothes scalp</li>
<li>Normalizes sebum production</li>
<li>Reduces flaky dandruff</li>
<li>Rehydrates the scalp</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Rosebay extract, neem extract, Lecithin.</p>`;
      }    
      
//       if(product.title == 'Kevon 2% Anti-fungal lotion for heavy dandruff'){
//         var title = 'Kevon Lotion';
//         var Desc = 'Relief from heavy dandruff and scalp itching';
//         var productSub = 'Treats your dandruff and improves scalp health';
//         var productDesc = 'Made with a clinically proven antifungal ingredient. This medical stay on lotion stops the growth of the fungus Malassezia furfur and controls hair loss due to itchiness. Best results are seen when used with an Anti-dandruff shampoo.';
//         var prodContent = `<p>Treats your dandruff and improves scalp health. Made with a clinically proven antifungal ingredient.</p> <ul>
// 							<li>Reduces Scalp irritation</li>
// <li>Prevents Inflammation</li>
// <li>Stops growth of Dandruff</li>
// 							</ul>`;
//         var prodContent2 = `<p><b>Ingredients:</b> Anti-dandruff solution 2%</p>`;
//       }

      if(product.title == 'Dandruff night lotion'){
        var title = 'Dandruff night lotion';
        var Desc = 'Relief from heavy dandruff and scalp itching';
        var productSub = 'Treats your dandruff and improves scalp health';
        var productDesc = 'Made with a clinically proven antifungal ingredient. This medical stay on lotion stops the growth of the fungus Malassezia furfur and controls hair loss due to itchiness. Best results are seen when used with an Anti-dandruff shampoo.';
        var prodContent = `<p>Treats your dandruff and improves scalp health. Made with a clinically proven antifungal ingredient.</p> <ul>
							<li>Reduces Scalp irritation</li>
<li>Prevents Inflammation</li>
<li>Stops growth of Dandruff</li>
							</ul>`;
        var prodContent2 = `<p><b>Ingredients:</b> Anti-dandruff solution 2%</p>`;
      }

      if(product.title == 'Digest Boost for Improved Digestive Ability'){
          var title = 'Digest Boost';
          var Desc = 'A herbal, all-natural formulation with saunf and jeera for relieving digestive problems.';
          var productSub = 'Digest Boost for improved digestive ability';
          var productDesc = 'This Ayurvedic medicine provides relief from digestive ailments such as gas, constipation, bloating, acidity and cramps. It is a non habit-forming herbal medication which also aids in improving appetite, absorption and excretion. Ayurvedic herbs in this supplement help neutralise stomach acid to treat acidity and abdominal discomfort. It acts as a digestive stimulant and has no side effects.';
          var prodContent = `<p>100% natural supplement that fights digestive ailments, promotes gut health and balances doshas.</p> <ul>
<li>Helps in absorption of nutrients</li>
<li>Boosts appetite</li>
<li>Relieves gas and discomfort</li>
<li>Lowers cholesterol naturally</li>
</ul>`;
          var prodContent2 = `<p><b>Ingredients:</b> Dhamaso, Ganthoda, Shah Jeera, Variyali.</p>`;
        }
      if (product.title === 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days') {
        var title = 'Gutt Shuddhi';
        var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
        var productSub = 'Fix your digestion to fix your hair loss';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor digestion, incomplete bowel movements, low gut motility and toxins. Made with safe and natural ayurvedic herbs these digestion tablets promote overall health for controlling hair fall and hair growth. Suitable for those with unsatisfactory bowel movements, improper diet and brain fog. Perfect for a gut cleanse and detox.';
      }
      
      var price = theme.Currency.formatMoney(product.price, theme.moneyFormat)
       var html = `<div class="col-md-6 mb-4"><div class="product-item card border-0 shadow p-3 p-md-4 h-100 mb-0">
<div class="price-on-top">
  <h5 class="font-weight-bold mb-0 text-tradewind mt-3 d-none d-md-block">${price}</h5>
  <h6 class="font-weight-bold mb-0 text-tradewind mt-3 d-md-none w-100">${price}</h6>
</div>
<div class="row shadow-none pb-0">
<div class="col-12">
<h6 class="font-weight-bold text-uppercase mt-md-4 d-md-none" data-product-name><a href="${product.url}" class="text-decoration-none">${ title }</a></h6>
<h4 class="font-weight-bold mb-3 text-uppercase d-none d-md-block" data-product-name><a href="${product.url}" class="text-decoration-none">${ title }</a></h4>
</div>
<div class="col-5">

<a href="${product.url}" class="text-decoration-none product_list_result">
<img id="${product.handle}" src="${ product.featured_image }" class="mx-auto" />
</a>
</div>
<div class="col-7 pl-0 pl-md-3">

${ prodContent }


</div>
</div>
${ prodContent2 }
</div></div>`;

      var title = $('[data-product-title]').append(product.title);

      $('.product-section .container > .row').append(html);

      $(".product-featured-image").append("<div class='img_wrap'><img id='"+ product.handle + "' src='"+ product.featured_image + "' /></div>");
      $('#productImg').hide();
      $('#productDescList').append("<li>"+product.title+"</li>");
      
    }
    var p = product.price;
    prices = prices + p;
    $('#price').html('₹' + JSON.stringify(prices).slice(0, -2) + '');
    var discountPrice, discountedPrice, discount ;
    var selectedMonth = $('.select-plan [name="month"]:checked').closest('label');
    discount = selectedMonth.find('.main-persentage').data('discount');
    discountPrice = (prices *discount)/100;
    discountedPrice = prices - discountPrice;
//  1 month discount price
    var month_1_des=$('.month-plan-1').find('.main-persentage').data('discount');
    var discount_month_1=prices-((prices *month_1_des)/100);
    $('[three_month_plancard] .all-total-price').html(theme.Currency.formatMoney(discountedPrice*4, theme.moneyFormat));
//     $('.total-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
    $('[one_month_plancard] .total-price').html(theme.Currency.formatMoney(discount_month_1, theme.moneyFormat));
    $('[three_month_plancard] .total-price').html(theme.Currency.formatMoney(prices*4, theme.moneyFormat));
    $('[three_month_plancard] .total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice*4, theme.moneyFormat));
    $('.total-price-1').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
    $('.total-price-3').html(theme.Currency.formatMoney(prices * 4, theme.moneyFormat));
   $('[data-1month]').attr('data-1month', prices).attr('data-3month', discountedPrice*4);
    $('.total__discount_price_1').html(theme.Currency.formatMoney(discount_month_1, theme.moneyFormat));
    $('.total__discount_price_3').html(theme.Currency.formatMoney(discountedPrice*4, theme.moneyFormat));

    var fee = parseInt($('[data-docotr-fee]').attr('data-docotr-fee')); 
    $('[three_month_plancard] [data-docotr-fee]').html(theme.Currency.formatMoney(fee * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
     
    var dietPlan = parseInt($('[data-diet-plan]').attr('data-diet-plan'));  
    $('[three_month_plancard] [data-diet-plan]').html(theme.Currency.formatMoney(dietPlan * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));

    var hairCoach = parseInt($('[data-hair-coach]').attr('data-hair-coach'));  
    $('[three_month_plancard] [data-hair-coach]').html(theme.Currency.formatMoney(hairCoach * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
    
//     var total__fess=(discountedPrice * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
    var total__fess=(prices * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
    $('[three_month_plancard] .all-total-price').html(theme.Currency.formatMoney(total__fess, theme.moneyFormat));
    
    var fees_charge = (fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
   
    var percent_discount=100 - Math.round((((total__fess - fees_charge)/total__fess)*100));
   // $('.persentage').text('('+percent_discount +'% Off)');
    $('.persentage').text('(₹'+(fees_charge + discountPrice*$('.select-plan [name="month"]:checked').val()) /100 +' Off)');
    var total_fees_charge_month_1=(discount_month_1* $('.month-plan-1 [name="month"]').val())+(fee * $('.month-plan-1 [name="month"]').val())+(dietPlan * $('.month-plan-1 [name="month"]').val())+(hairCoach * $('.month-plan-1 [name="month"]').val());
    var fees_charge_month_1=(fee * $('.month-plan-1 [name="month"]').val())+(dietPlan * $('.month-plan-1 [name="month"]').val())+(hairCoach * $('.month-plan-1 [name="month"]').val());
    var percent_discount_month_1=100 - Math.round((((total_fees_charge_month_1 - fees_charge_month_1)/total_fees_charge_month_1)*100));
    let total_saving_1 = (fees_charge_month_1)/100;
    $('[one_month_plancard] .all-total-price, .one_month_tt_price').html(theme.Currency.formatMoney(total_fees_charge_month_1, theme.moneyFormat));
    $('.month-plan-1 .main-persentage').text(percent_discount_month_1+'%');
    $('[one_month_plancard] [top_pct_text]').text(percent_discount_month_1+'%');
//     $('.month-plan-1 .main-persentage').text('(₹'+total_saving_1+' Off)');
    
    var total_fees_charge_month_3=(discountedPrice* $('.month-plan-3 [name="month"]').val())+(fee * $('.month-plan-3 [name="month"]').val())+(dietPlan * $('.month-plan-3 [name="month"]').val())+(hairCoach * $('.month-plan-3 [name="month"]').val());
    var fees_charge_month_3=(fee * $('.month-plan-3 [name="month"]').val())+(dietPlan * $('.month-plan-3 [name="month"]').val())+(hairCoach * $('.month-plan-3 [name="month"]').val());
    //var percent_discount_month_3 = 100 - Math.round((((total_fees_charge_month_3 - fees_charge_month_3)/total_fees_charge_month_3)*100));
    var percent_discount_month_3 =  Math.round(((total__fess - discountedPrice*4)/total__fess)*100);
    // console.log('percent_discount_month_3', percent_discount_month_3);
//    console.log("total__fess>> ",total__fess);
//     console.log("discountedPrice*3>> ",discountedPrice*3);
    $('.three_month_tt_price').html(theme.Currency.formatMoney(total__fess, theme.moneyFormat));
    $('.month-plan-4 .main-persentage').text(percent_discount_month_3+'%');
    $('[three_month_plancard] [top_pct_text]').text(percent_discount_month_3+'%');
    let total_saving_3 = (fees_charge_month_3 + discountPrice*4)/100;
//     $('.month-plan-3 .main-persentage').text('(₹'+total_saving_3+' Off)');
    $('#add-to-cart-result-page').html('Buy Now <span>( '+$('.select-plan [name="month"]:checked').val()+' Month Plan )</span>');
    
    /* added by neeraj end  */

    $('[month1] [charge]').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
    // $('[month1] [doc__fee]').html(theme.Currency.formatMoney(doc__fee, theme.moneyFormat));
    // $('[month1] [diet__plan]').html(theme.Currency.formatMoney(diet__plan, theme.moneyFormat));
    // $('[month1] [hair_coach_fee]').html(theme.Currency.formatMoney(hair__coach_fee, theme.moneyFormat));
    
    $('[month3] [charge]').html(theme.Currency.formatMoney(prices*3, theme.moneyFormat));
    // $('[month3] [doc__fee]').html(theme.Currency.formatMoney(doc__fee*3, theme.moneyFormat));
    // $('[month3] [diet__plan]').html(theme.Currency.formatMoney(diet__plan*3, theme.moneyFormat));
    // $('[month3] [hair_coach_fee]').html(theme.Currency.formatMoney(hair__coach_fee*3, theme.moneyFormat));
    
    $('[month6] [charge]').html(theme.Currency.formatMoney(prices*6, theme.moneyFormat));
    // $('[month6] [doc__fee]').html(theme.Currency.formatMoney(doc__fee*6, theme.moneyFormat));
    // $('[month6] [diet__plan]').html(theme.Currency.formatMoney(diet__plan*6, theme.moneyFormat));
    // $('[month6] [hair_coach_fee]').html(theme.Currency.formatMoney(hair__coach_fee*6, theme.moneyFormat));
    
    // month1_total = (prices+doc__fee+diet__plan+hair__coach_fee);
     month1_total = (prices);
    // $('[month1] [realPrice]').html(theme.Currency.formatMoney(month1_total, theme.moneyFormat));
    
    $('[month3] [realPrice]').html(theme.Currency.formatMoney(month1_total *3, theme.moneyFormat));
    
    $('[month6] [realPrice]').html(theme.Currency.formatMoney(month1_total *6, theme.moneyFormat));
    
    $('[mob_kits] [charge]').html(theme.Currency.formatMoney(prices*3, theme.moneyFormat));
    // $('[mob_kits] [doc__fee]').html(theme.Currency.formatMoney(doc__fee*3, theme.moneyFormat));
    // $('[mob_kits] [diet__plan]').html(theme.Currency.formatMoney(diet__plan*3, theme.moneyFormat));
    // $('[mob_kits] [hair_coach_fee]').html(theme.Currency.formatMoney(hair__coach_fee*3, theme.moneyFormat));
    $('[mob_kits] [realPrice]').html(theme.Currency.formatMoney(month1_total *3, theme.moneyFormat));
  
     var month3Discountper = ((prices*3)*20)/100;
    var month6Discountper = ((prices*6)*30)/100;
    
    //console.log(month3Discountper);
    //console.log(month6Discountper);

    
    // cal3Discountper = prices*3 - month3Discountper
    // cal6Discountper = prices*6 - month6Discountper
  
    var discount_per = parseInt(((month1_total - prices)/month1_total)*100);
  
    //var discount_per3 = parseInt(((month1_total - prices)/month1_total)*100);
    
    //var discount_per6 = parseInt(((month1_total - prices)/month1_total)*100);

    
    // console.log(cal3Discountper);
    // console.log(cal6Discountper);
    //var discount_pers = parseInt((month1_total ÷ prices)*100);
    // console.log(month1_total);
    // console.log(prices);
    // console.log(discount_per);
    // console.log('discount_per', discount_per);
    
    // $('[month1]').parents('[card]').find('.per__off span').html(discount_per + '% OFF');
    // $('[month1]').find('.per__off').html(discount_per + '% OFF');
    // $('[month3]').parents('[card]').find('.per__off span').html((discount_per+11) + '% OFF');
    // $('[month3]').find('.per__off').html((discount_per+11) + '% OFF');
    // $('[month6]').parents('[card]').find('.per__off span').html((discount_per+17) + '% OFF');
    // $('[month6]').find('.per__off').html((discount_per+17) + '% OFF');

    month1DiscountPrice = (prices*0)/100;
    // console.log('month1DiscountPrice', (prices-month1DiscountPrice));
    month3DiscountPrice = ((prices*3)*20)/100;
    // console.log('month3DiscountPrice', (prices*3 - month3DiscountPrice));
    month6DiscountPrice = ((prices*6)*30)/100;
    // console.log('month6DiscountPrice', (prices*6 - month6DiscountPrice));

    $('[month1]').find('[all__ttl_price]').html(theme.Currency.formatMoney((prices - month1DiscountPrice), theme.moneyFormat));
    $('[month3]').find('[all__ttl_price]').html(theme.Currency.formatMoney((prices*3 - month3DiscountPrice), theme.moneyFormat));
    $('[month6]').find('[all__ttl_price]').html(theme.Currency.formatMoney((prices*6 - month6DiscountPrice), theme.moneyFormat));
    $('[mob_kits] [all__ttl_price]').html(theme.Currency.formatMoney((prices*3 - month3DiscountPrice), theme.moneyFormat));
    $('#sticky_kit_btn').html('Buy Now <span>( '+3+' Month Plan )</span>');
  
    var qty = parseInt($('[name="month"]:checked').val());
    if(qty == 1){
      var discount = '22%';
    } else if(qty == 3){
      var discount = '33%';
    }

    variantsIDs.push({
      'id': product.variants[0].id,
      'quantity': qty,
      'properties': {}
    });
  });

}

function checkout(plan) {
  localStorage.setItem('user__gender',user_gender);
  var $ = jQuery, plan;
  if(plan == "single"){
  var qty = 1;
  }else{
  var qty =$('[name="month"]:checked').val();
  }
  if(qty == 4){
    plan = "4 Months";
  }else{
     plan = "";
  }
  variantsIDs.forEach(e => {
    e.quantity = qty,
    e.properties = {'Plan': plan};
  });

 var formData = {
    'items': variantsIDs,
    sections: 'cart-drawer',
    attributes: {
      first_name: f_name,
      phone: C_number,
      email: C_email
    }
  }

   fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    localStorage.setItem('User_location', "cart");
    $('.site-header__cart.js-drawer-open-right').trigger('click');
//     document.location.href = '/cart';
    return response.json();
  }).then(result => { 
      var t = document.querySelector('cart-drawer');
      let cart_drawer = result.sections['cart-drawer'];
      CartDrawerUpdate(t, cart_drawer);
    }).catch((error) => {
    console.error('Error:', error);
  });
}

function buyItNow() {
var $ = jQuery;
  let formData = {
    'items': variantsIDs
  };

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    localStorage.setItem('User_location', "checkout");
    document.location.href = '/cart/checkout';
    return response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function ChangePrice(){
  var $ = jQuery;
  var getMonth = $('.select-plan [name="month"]:checked');
  var mainLabel = $(getMonth).closest('label');
  var price = mainLabel.find('.discounted-price').text(),
      mainPer = mainLabel.find('.main-persentage').text(),
      mainmsg =  mainLabel.find('.radio_content_msg>span:not(.save_pct)').text(),
      month = $('.select-plan [name="month"]:checked').val();
  
    var selectedMonth = $('.select-plan [name="month"]:checked').closest('label'); 
    var discount_month=$('.select-plan [name="month"]:checked').val();
     var discountPrice, discountedPrice, discount ;
    discount = selectedMonth.find('.main-persentage').data('discount');
    discountPrice = (prices *discount)/100;
    discountedPrice = prices - discountPrice;
  
  $('.select-plan label.active').removeClass('active');
  
  if($('.select-plan [name="month"]:checked').val() == 1){    
    var dataMonth = $('[data-1month]').attr('data-1month')
    $('.plan-title').text('1 month plan');    
    }else{
      var dataMonth = $('[data-1month]').attr('data-3month');
      $('.plan-title').text('3 months plan');
      }
  $('.select-plan [name="month"]:checked').closest('label').addClass('active');
  var fee = parseInt($('[data-docotr-fee]').attr('data-docotr-fee')); 
 $('[three_month_plancard] [data-docotr-fee]').html(theme.Currency.formatMoney(fee * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
  var dietPlan = parseInt($('[data-diet-plan]').attr('data-diet-plan'));  
  $('[three_month_plancard] [data-diet-plan]').html(theme.Currency.formatMoney(dietPlan * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
  var hairCoach = parseInt($('[data-hair-coach]').attr('data-hair-coach'));  
  $('[three_month_plancard] [data-hair-coach]').html(theme.Currency.formatMoney(hairCoach * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
//   $('.all-total-price').html(theme.Currency.formatMoney(dataMonth, theme.moneyFormat))
// var total__fess=(discountedPrice * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
  var total__fess=(prices * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
var fees_charge=(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
    $('.persentage').text(mainPer);
  
  var percent_discount=Math.round((((total__fess - fees_charge)/total__fess)*100.00));
 console.log(percent_discount);
//   $('.persentage').text('('+percent_discount +'% Off)');
   $('[three_month_plancard] [top_pct_text]').text(mainPer.split('%')[0]+'%');
   $('.three_month_header_msg').text(mainmsg);
  

  console.log('discountPrice', discountPrice, 'discountedPrice', discountedPrice);

  var discount = mainLabel.find('.main-persentage').data('discount');
  if(discount == 22 || discount == '22'){
    console.log('22');
    var selectedMonth = $('.select-plan [name="month"]:checked').closest('label');
    discount = selectedMonth.find('.main-persentage').data('discount');
    discountPrice = (prices *discount)/100;
    discountedPrice = prices - discountPrice;$('.all-total-price').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
//     $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice, theme.moneyFormat));
    $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
     $('.total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice, theme.moneyFormat));
   // window.open('https://traya.health/discount/22%2525off','_blank');   
    $('#add-to-cart-result-page').html('Buy Now <span>( 1 Month Plan )</span>');
  }
  else if(discount == 33 || discount == '33'){
    console.log('33');
    var selectedMonth = $('.select-plan [name="month"]:checked').closest('label'); 
    discount = selectedMonth.find('.main-persentage').data('discount');
    discountPrice = (prices *discount)/100;
    discountedPrice = prices - discountPrice;
    $('.all-total-price').html(theme.Currency.formatMoney(prices*4, theme.moneyFormat));
//     $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
    $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(prices*4, theme.moneyFormat));
    $('.total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice*4, theme.moneyFormat));
  //  window.open('https://traya.health/discount/33%2525off','_blank');
    $('#add-to-cart-result-page').html('Buy Now <span>( 4 Month Plan )</span>');
  }
  else{
//     $('.all-total-price').html(theme.Currency.formatMoney(prices * discount_month, theme.moneyFormat));
    $('.all-total-price').html(theme.Currency.formatMoney(total__fess, theme.moneyFormat));
//     $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
    //$('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice * discount_month, theme.moneyFormat));
    $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(prices * discount_month, theme.moneyFormat));
    $('.total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice * discount_month, theme.moneyFormat));
  //  window.open('https://traya.health/discount/33%2525off','_blank');
    $('#add-to-cart-result-page').html('Buy Now <span>( '+discount_month+' Month Plan )</span>');
  }
  
}

function registerCustomer() {
var $ = jQuery;
  var data = {
    "customer": {
      "first_name": "Steve",
      "last_name": "Lastnameson",
      "email": "steve.lastnameson@example.com",
      "phone": "+15142546011",
      "verified_email": true,
      "addresses": [
        {
          "address1": "123 Oak St",
          "city": "Ottawa",
          "province": "ON",
          "phone": "555-1212",
          "zip": "123 ABC",
          "last_name": "Lastnameson",
          "first_name": "Mother",
          "country": "CA"
        }
      ],
      "password": "newpass",
      "password_confirmation": "newpass",
      "send_email_welcome": false
    }
  };
  $.ajax({
    type: "POST",
    url: '/admin/api/2020-10/customers.json',
    body: JSON.stringify(data),
    success: function(result){
    },
    dataType: 'json'
  });

}

jQuery('body').on('click', '#add-to-cart-result-page, [three_month_plancard] .card_buy_now', function() {
  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    success: function(){
      setTimeout(function(){
        checkout();
      },1000);
    },
    dataType: 'json'
  });

});

jQuery('body').on('click', '#buyNowResult2', function() {

  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    success: function(){
      buyItNow();
    },
    dataType: 'json'
  });

});
jQuery('body').on('click', '[one_month_plancard] .card_buy_now', function() {
  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    success: function(){
      setTimeout(function(){
        checkout('single');
      },1000);
    },
    dataType: 'json'
  });
});

var clearCart = function() {

  jQuery.ajax({
    type: "POST",
    data: {sections: 'cart-drawer'},
    url: '/cart/clear.js',
    success: function(e){
      var t = document.querySelector('cart-drawer');
      let cart_drawer = e.sections['cart-drawer'];
      CartDrawerUpdate(t, cart_drawer, drawer=false,0);
    },
    dataType: 'json'
  });

};


function createAccount(firstName, lastName, email, password){
  var escapedData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password.replace(/\+/g, '%2B')
  }
  var data = 'form_type=create_customer&utf8=%E2%9C%93&customer%5Bfirst_name%5D=';
  data += escapedData.firstName;
  data += '&customer%5Blast_name%5D=';
  data += escapedData.lastName;
  data += '&customer%5Bemail%5D=';
  data += escapedData.email;
  data += '&customer%5Bpassword%5D=';
  data += escapedData.password;
  jQuery.post('/account', data)
  .done(function(response){
    var logErrors = jQuery(response).find('.errors').text();
    if (logErrors != '' && logErrors != 'undefined'){
      console.log(logErrors);
    }
    else{
      console.log('success!');
    }
  }).fail(function(){alert('error could not submit');});
  return false;
}

jQuery(document).ready(function($){

  clearCart();

  jQuery.ajax({
    url: liveendpoint+id,
    dataType: 'json',
    headers: token
  })
  .done(function(data){
    displayProduct(data);

    $('[data-user-name]').text(data.User_Analysis.first_name);
    $('#name1').text(data.User_Analysis.first_name);
    $('#name3').text(data.User_Analysis.first_name);
    $('#typeOfLoss').text(data.Recommendations.Type_of_hair_loss);
    $('#stage').text(data.User_Analysis.stage);
    $('#typeOfLoss3').text(data.Recommendations.Type_of_hair_loss);
    $('#stage3').text(data.User_Analysis.stage);
    // console.log(data);
    $('#stageDescription').text(stageDescription[data.User_Analysis.stage]);

    selectedStage = data.User_Analysis.stage;

    $('.' + selectedStage).addClass('selectedStage');

    if (selectedStage === 'Stage-1') {
      $('.customers-section .start-journey-btn').hide();
    } else if (selectedStage === 'Stage-1') {
    } else if (selectedStage === 'Stage-2') {
      $('.Stage-1').addClass('checkStage');
      $('.customers-section .start-journey-btn').hide();
    } else if (selectedStage === 'Stage-3') {
      $('.Stage-1').addClass('checkStage');
      $('.customers-section .start-journey-btn').hide();
    } else if (selectedStage === 'Stage-4') {
      $('.Stage-2').addClass('checkStage');
      $('.customers-section .start-journey-btn').hide();

    } else if (selectedStage === 'Stage-5') {
	// $('.product-section.pt-2').hide();
      // $('.product-section-list.pt-5').hide();
      // $('.issue__v').hide();
//      $('.root__causes_v').addClass('root_causes_bottom_space');
      // $('#add-to-cart-result-page').addClass('hide__sticky__btn');
      // $('#custom-btn-5').removeClass('d-none');
      // $('.hero-text-ptyu').hide();
      $('.page-result-hero #stageDescription').addClass('h4');
      $('.customers-section .start-journey-btn').hide();
    // $('.root__causes_v').text('Sorry we are not treat for this stage');
      $('.Stage-3').addClass('checkStage');
    } else if (selectedStage === 'Stage-6') {
	// // // $('.product-section.pt-2').hide();
      // // $('.product-section-list.pt-5').hide();
      // $('.issue__v').hide();
//      $('.root__causes_v').addClass('root_causes_bottom_space');
      // $('.hero-text-ptyu').hide();
      // $('#add-to-cart-result-page').addClass('hide__sticky__btn');
      // $('#custom-btn-5').removeClass('d-none');
      $('.page-result-hero #stageDescription').addClass('h4');
      $('.customers-section .start-journey-btn').hide();
     // $('.root__causes_v').text('Sorry we are not treat for this stage');
      $('.Stage-5').addClass('checkStage');
    } else if (selectedStage === 'Coin Size Patch') {
      //$('.Stage-1').addClass('checkStage');
       $('.Stage-7').addClass('selectedStage');
      $('h2.pattern_v').hide();
      $('.product-section.pt-2').hide();
      $('.product-section-list.pt-5').hide();
      $('.issue__v').hide();
      $('.hero-text-ptyu').hide();
     // $('.root__causes_v').addClass('root_causes_bottom_space');
      $('#add-to-cart-result-page').addClass('hide__sticky__btn');
      $('#custom-btn').removeClass('d-none');
      $('.page-result-hero #stageDescription').addClass('h4');
      //$('.root__causes_v').text('Sorry we are not treat for this stage');
    } else if (selectedStage === 'Heavy Hair Fall Across The Head') {
      $('h2.pattern_v').hide();
      $('.Stage-8').addClass('selectedStage');
      $('.Stage-2').addClass('checkStage');
      $('.customers-section .start-journey-btn').hide();
    }

    $('.diagnoses-result > img').hide();

    $('#ourdia li').hide();
    var type = data.Recommendations.Type;
    var Genetic = data.Recommendations.Genetic;
    var User_Analysis = data.User_Analysis;
    var Recommendations = data.Recommendations;

    let count=0;
    if ((type == 1 || type==2 ) && Genetic == "Yes"){
      $('#genetics').css('display','flex');

      count++;
    } 
    if (JSON.parse(User_Analysis.stress) <1){
      $('#stress').css('display','flex');
      count++;
    }
    if (JSON.parse(User_Analysis.sleep) <1){
      $('#sleepissues').css('display','flex');
      count++;
    }
    if (JSON.parse(User_Analysis.gut_health) <1  && count<4){
      $('#digestion').css('display','flex');
      count++;
    }
    if (Recommendations.Deficiency == "Yes"  && count<4){
      $('#deficiency').css('display','flex');
      count++;
    }
    if (Recommendations.Dieting == "Yes" && count<4){
      $('#weightloss').css('display','flex');
      count++;

    }
    if (count<4){
      $('#nutrition').css('display','flex');
      count++;

    }
    if (count<4){
      $('#lifestyle').css('display','flex');
      count++;
    }

    if (type === 5) {
      $('ul#ourdia li').hide();
      $('#malfunction').css('display','flex');
    }

    $('.theresults').hide();

   if (data.User_Analysis.gender === 'F') {
        $('.review-resultco-M').remove();
        $('#female-result').show();
        $('.page-result-hero').removeClass('male');
        $('.page-result-hero').addClass('female');
        $('.test-result-bg').removeClass('male');
        $('.test-result-bg').addClass('female');
        $('.test-result').removeClass('male');
        $('.test-result').addClass('female');
      } else {
        $('.review-resultco-F').remove();
        $('#male-result').show();
        $('.page-result-hero').addClass('male');
        $('.page-result-hero').removeClass('female');
        $('.test-result-bg').addClass('male');
        $('.test-result-bg').removeClass('female');
        $('.test-result').addClass('male');
        $('.test-result').removeClass('female');
      }
    $('.slick-items-container-result').slick({
      infinite: true,
      dots: false,
      autoplay: true,
      arrows: true,
      swipe : true,
      adaptiveHeight: true
    });
    var Max_months = data.Recommendations.Max_months;
    if (Max_months < 6) {
      $('#regroMonth1').text('1 MONTH');
      $('#regroMonth2').text('2-3 MONTHS');
      $('#regroMonth3').text('4-5 MONTHS');
    }

    if (Max_months === 6) {
      $('#regroMonth1').text('1 MONTH');
      $('#regroMonth2').text('2-4 MONTHS');
      $('#regroMonth3').text('5-6 MONTHS');
    }

    if (Max_months > 6) {
      $('#regroMonth1').text('1-2 MONTHS');
      $('#regroMonth2').text('3-5 MONTHS');
      $('#regroMonth3').text('5-8 MONTHS');
    }


    var r = data.Recommendations;
      setTimeout(function(){
        jQuery('.result_product_slides').slick({
          mobileFirst: true,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false,
          dots:true,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 760,
              settings: "unslick"
            }
          ]
        });
      },2e3);
  });
});


jQuery('body').on('click', '[data-thumb] > div img', function(){
  var $ = jQuery;
  var Image = $(this).attr('src');
  $('[data-main-image] img').attr('src', Image);
});

jQuery(document).ready(function($){

  var stages = {
    "Stage-1": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage01.png"
    },
    "Stage-2": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage02.png"
    },
    "Stage-3": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage03.png"
    },
    "Stage-4": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage04.png"
    },
    "Stage-5": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage05.png"
    },
    "Stage-6": {
      "desc": "",
      "img": "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/stage06.png"
    },
    "Stage-7": {
      "desc": "",
      "img": ""
    },
    "Heavy Hair Fall Across The Head": {
      "desc": "",
      "img": ""
    },
    "Coin Size Patch": {
      "desc": "",
      "img": ""
    }
  }

  $('#range-img-stage').attr('src', stages[selectedStage].img);
  $('#range-text-stage').text(stages[selectedStage].desc);

  $('#range').change(function(){
    var slider = $(this).val();

    if (selectedStage === 'Stage-1') {
      $('#range-img-stage').attr('src', stages[selectedStage].img);
      $('#range-text-stage').text(stages[selectedStage].desc);
    }

    if (selectedStage === 'Stage-2') {
      $('#range-img-stage').attr('src', stages[selectedStage].img);
      $('#range-text-stage').text(stages[selectedStage].desc);
      if (slider === 3) {
        $('#range-img-stage').attr('src', stages['Stage-1'].img);
        $('#range-text-stage').text(stages['Stage-1'].desc);
      }
    }

    if (selectedStage === 'Stage-3') {
      $('#range-img-stage').attr('src', stages[selectedStage].img);
      $('#range-text-stage').text(stages[selectedStage].desc);
      if (slider === 2) {
        $('#range-img-stage').attr('src', stages['Stage-2'].img);
        $('#range-text-stage').text(stages['Stage-2'].desc);
      }
      if (slider === 3) {
        $('#range-img-stage').attr('src', stages['Stage-1'].img);
        $('#range-text-stage').text(stages['Stage-1'].desc);
      }
    }

    if (selectedStage === 'Stage-4') {
      $('#range-img-stage').attr('src', stages[selectedStage].img);
      $('#range-text-stage').text(stages[selectedStage].desc);
      if (slider === 2) {
        $('#range-img-stage').attr('src', stages['Stage-3'].img);
        $('#range-text-stage').text(stages['Stage-3'].desc);
      }
      if (slider === 3) {
        $('#range-img-stage').attr('src', stages['Stage-2'].img);
        $('#range-text-stage').text(stages['Stage-2'].desc);
      }
    }
  });

  $('#ourdia a').click(function(e){
    e.preventDefault();
    var id = $(this).attr('data-id');
    $('#nav-tabContent #' + id).addClass('active show').siblings().removeClass('active show');
    $('#nav-tab #' + id + '-tab').addClass('active').siblings().removeClass('active');
  });
});

setTimeout(function(){
  jQuery('.slick-products').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });
}, 1500);

// Sticky Add to cart Button

jQuery(window).on('scroll', function() { 
  var $ = jQuery;
  if ($(window).scrollTop() >= $('.product-section-list').offset().top + $('.product-section-list').outerHeight() - window.innerHeight) {
    $('.sticky-btn').css('display', 'flex');
  } else {
    $('.sticky-btn').css('display', 'none');
  }
});

jQuery(window).on('scroll', function() { 
  var $ = jQuery;
  if ($(window).scrollTop() >= $('.result4-a .site-footer').offset().top - window.innerHeight) {
    $('.sticky-btn').css('position', 'static');
  } else {
    $('.sticky-btn').css('position', 'fixed');
  }
});

$(document).ready(function(){
  if ($(window).width() < 768) {
    setTimeout(function(){
      $('.result_doctor_slides').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false,
        autoplaySpeed: 2000,
      });
    }, 1500);
  }
});

function chkout(qty) {
  var $ = jQuery, qtty = qty, plans;
  if(qtty == 1) {
    plans= '1 Months'
  }else if(qtty == 3) {
    plans= '3 Months'
  }else if (qtty == 6) {
    plans= '6 Months'
  }
  variantsIDs.forEach(e => {
    e.quantity = qtty,
    e.properties = {'plans': plans}
  });
  var formData = {
    'items': variantsIDs,
    sections: 'cart-drawer',
    attributes: {
        first_name: f_name,
        phone: C_number,
        email: C_email
      }
  }
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
 .then(response => {  
      localStorage.setItem('User_location', "cart");
      return response.json();
    }).then(result => { 
      var t = document.querySelector('cart-drawer');
      let cart_drawer = result.sections['cart-drawer'];
      CartDrawerUpdate(t, cart_drawer);
    }).catch((error) => {
      console.error('Error:', error);
    });
}

jQuery('body').on('click', '.buy_now_btn', function() {
  var qty = $(this).parents('.bdEA').attr('plan');
  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    success: function(){
      setTimeout(function(){
        chkout(qty);
      },1000);
    },
    dataType: 'json'
  });

});

jQuery('body').on('click', '[buy_now]', function() {
  var qty = $(this).attr('plan');
  console.log("qty>>", qty);
  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    success: function(){
      setTimeout(function(){
        chkout(qty);
      },1000);
    },
    dataType: 'json'
  });
});

$('[card]').click(function(){
  var $ = jQuery;
  var mnth_plan = $(this).attr('month');
  var card_plan = $('[card] .month_plan')
  if(card_plan.hasClass('active')) {
    card_plan.parents('.bdC5').find('[card] .month_plan').removeClass('active');
    card_plan.parents('.bdC5').find('[card] .per__off').removeClass('active');
    $(this).find('.month_plan').addClass('active');
    $(this).find('.per__off').addClass('active');
  }
  if(mnth_plan == 1) {
     $('[mob_kits] [realPrice]').addClass('discount-cut-val');
    $('[mob_kits] [all__ttl_price]').html(theme.Currency.formatMoney((prices*1 - month1DiscountPrice), theme.moneyFormat));
    $('#sticky_kit_btn').html('Buy Now <span>( '+1+' Month Plan )</span>');
  }else if(mnth_plan == 3) {
     $('[mob_kits] [realPrice]').removeClass('discount-cut-val');
    $('[mob_kits] [all__ttl_price]').html(theme.Currency.formatMoney((prices*3 - month3DiscountPrice), theme.moneyFormat));
    $('#sticky_kit_btn').html('Buy Now <span>( '+3+' Month Plan )</span>');
  }else if(mnth_plan == 6) {
     $('[mob_kits] [realPrice]').removeClass('discount-cut-val');
    $('[mob_kits] [all__ttl_price]').html(theme.Currency.formatMoney((prices*6 - month6DiscountPrice), theme.moneyFormat));
    $('#sticky_kit_btn').html('Buy Now <span>( '+6+' Month Plan )</span>');
  }
    $('[mob_kits] [charge]').html(theme.Currency.formatMoney(prices*mnth_plan, theme.moneyFormat));
    // $('[mob_kits] [doc__fee]').html(theme.Currency.formatMoney(doc__fee*mnth_plan, theme.moneyFormat));
    // $('[mob_kits] [diet__plan]').html(theme.Currency.formatMoney(diet__plan*mnth_plan, theme.moneyFormat));
    // $('[mob_kits] [hair_coach_fee]').html(theme.Currency.formatMoney(hair__coach_fee*mnth_plan, theme.moneyFormat));
    $('[mob_kits] [realPrice]').html(theme.Currency.formatMoney(month1_total *mnth_plan, theme.moneyFormat));
    $('[buy_now]').attr('plan', mnth_plan);
});

$('[desktopCard]').click(function(){
    $('.card').removeClass('active');
  $(this).addClass('active');
});
