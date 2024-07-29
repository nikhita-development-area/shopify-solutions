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
  localStorage.setItem('user-gender', 'male');
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');
(function($){
  if (!id) {
    if(window.location.pathname == '/pages/result4b'){
      alert('Your recommendation is not found. Please fill the diagnosis to help us share the recommended plan.');
      document.location.href= 'https://form.traya.health/questions?cohort=1&source=ResultPage'
    }
    $('[data-formPage]').show();
    $('[data-resultPage]').hide();
    $('[data-resultbtn]').hide();
    $('[data-notResult]').show();
  } else {
    $('[data-result]').show();
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
    "Coin Size Patches": "You have alopecia areata. It’s quite difficult to treat this type of hair loss."
  };

  var selectedStage = 'Stage-1';


  var variantsID = 0;
  function displayProduct(data) {

    var r = Object.assign(data.User_Analysis, data.Recommendations);
    f_name = r.first_name;
    C_number = r.phone;
    C_email = r.email;
    user__gender = r.gender;
    if(user__gender == 'M') {
      user_gender = 'Male';
    }
    // console.log('r>>', r);
    if(r.gender == 'M' && r.stage == "Stage-1"){
      $('.other-m-stage-1').remove();
      $('.gender-m-stage-1').show();
      $('.m-stage-1-title').text("’s Hair Fall Control Kit");
      $('.product-section-list>.container>.card').addClass('w-md-adjust');
//       $('.result.result-new').addClass('male-stage-1-main');
    }else{
      $('.gender-m-stage-1').remove();
    }
     if(r.gender == 'M' && r.stage == "Stage-6"){
      $('.test-result, .product-section-list, .product-section, .cust_reviews, .our-experts, .sticky-btn').addClass('d-none');
      $('.transplant-stage-six').removeClass('d-none');
      }else{
      $('.test-result, .product-section-list, .product-section, .cust_reviews, .our-experts, .sticky-btn').removeClass('d-none');
      $('.transplant-stage-six').remove();
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
    if (r.Hair_vitamin === 'Yes') { 
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

    //  if (r.Nasya === 'No') {
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
      ocument.location.href= '/pages/female-result?id=' + id;
      $('[data-gender]').append('Female');
    }

  }
function displayComboProduct(data) {
  console.log("data> ", data);
  var $ = jQuery;
  var products = [];
  let mainImageUrl = '';
  var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
  
   $('.result-page .product-single__thumbnails').empty();
  $('.result-combo-pr-image .product-single__media').empty();
  mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/Artboard_1_1d035ef6-038b-42f2-96e7-8bde677d3155_640x.png';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
                        sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                	<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Combo Image">
                   </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  
  if(data.Health_tatva == "Yes"){
    products.push({'handle': "herbal-tablets"});
         mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/products/3_ca1865d2-d8fe-494f-a17b-67da239db914_640x.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Oil">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Gut_shuddi == "Yes"){
    products.push({'handle': "avipattikar-digestion-tablets"});
         mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/products/3_c61e44d3-b1c0-45e3-b6c1-a9244da0dc68_640x.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Oil">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

    if(data.Calm_Therapy_Booster_Oil == "Yes"){
    products.push({'handle': "scalp-oil-with-calm-therapy-booster-shots"});
     mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Oil">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Dandruff_Therapy_Booster_Oil == "Yes"){
    products.push({'handle': "scalp-oil-with-dandruff-therapy-booster-shots"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg" alt="Hair Oil">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
    if(data.Growth_Therapy_Booster_Oil == "Yes"){
    products.push({'handle': "scalp-oil-with-growth-therapy-booster-shots"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg" alt="Hair Oil">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Scalp_Therapy_Booster_Oil == "Yes"){
    products.push({'handle': "scalp-oil-with-scalp-therapy-booster-shots"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp_oil.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Oil">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

if(data.pcos_santulan == "Yes"){
    products.push({'handle': "pcos-santulan-for-pcos-and-hormone-related-hair-loss"});
    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/PCOS-santulan-Slide-2.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="pcos_santulan">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

if(data.meno_santulan == "Yes"){
    products.push({'handle': "meno-santulan-tablets-for-menopause-support-and-menopausal-hair-fall"});
    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/santulancreatives-07.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="meno_santulan">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

  if(data.mom_santulan  == "Yes"){
    products.push({'handle': "mom-santulan-tablets-for-hair-fall-in-post-pregnancy-or-post-childbirth-period"});
    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/santulancreatives-03.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="mom_santulan ">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

 if(data.thyro_santulan  == "Yes"){
    products.push({'handle': "thyro-santulan-tablets-for-supporting-thyroid-health"});
    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/Thyro-Santulan-Slide-3.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="thyro_santulan ">
</li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

   if(data.Scalp_Controller == "Yes"){
    products.push({'handle': "scalp-controller"});
     mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/products/2_0a841053-cf8d-4ce6-9c1e-c113cb881155_640x.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="scalp controller">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Hair_ras == "Yes"){
    products.push({'handle': "hair-growth-herbs"});
     mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/hair_ras-08.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Ras">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Hair_vitamin == "Yes"){
    products.push({'handle': "hair-vitamins"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/hair_vitamin.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Hair Vitamin">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Anti_danruff_shampoo == "Yes"){
    products.push({'handle': "anti-dandruff-shampoo"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/anti_dandruff.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Anti Dandruff Sampoo">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Defence_shampoo == "Yes"){
    products.push({'handle': "shampoo"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/anti_dandruff.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Anti Dandruff Sampoo">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Kevon == "Yes"){
    products.push({'handle': "ketoconazole-2-night-lotion"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/KEVON-13.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Kevon">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }
  if(data.Minoxidil == "Yes"){
    products.push({'handle': "minoxidil-2"});
    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/minoxidil_2.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
    let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Minoxidil 2Ml">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  }

   if(data.RCP == "Yes"){
    products.push({'handle': "recap-serum-for-hair-fall-control"});
     mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/recap_serum.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
               sizes="445px" srcset="${mainImageUrl}">`;
      let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="ReCaP Serum">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
      $('.result-combo-pr-image .product-single__media').append(mainImageTag);
     
  }
  // if(data.Nasya == "Yes"){
  //   products.push({'handle': "shatavari-ghrita"});
  //    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/3_eba490d7-8e10-438a-a911-3917a4bb7177.jpg';
  // 	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Shatavari Ghrita"
  //              sizes="445px" srcset="${mainImageUrl}">`;
  //     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
  //               <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Shatavari Ghrita">
  //             </li>`;
  //     $('.result-page .product-single__thumbnails').append(thumbImage);
  //     $('.result-combo-pr-image .product-single__media').append(mainImageTag);
     
  // }

  // if(data.Nasya == "No"){
  //   products.push({'handle': "shatavari-ghrita"});
  //    mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/3_eba490d7-8e10-438a-a911-3917a4bb7177.jpg';
  // 	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Shatavari Ghrita"
  //              sizes="445px" srcset="${mainImageUrl}">`;
  //     let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
  //               <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Shatavari Ghrita">
  //             </li>`;
  //     $('.result-page .product-single__thumbnails').append(thumbImage);
  //     $('.result-combo-pr-image .product-single__media').append(mainImageTag);
     
  // }
  
  if(data.Digest_Boost == "Yes"){
    products.push({'handle': "digest-boost-for-improved-digestive-ability-traya-health"});
     mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/products/DigestBoost02_1_640x.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Digest Boost"
               sizes="445px" srcset="${mainImageUrl}">`;
      let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Digest Boost">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
      $('.result-combo-pr-image .product-single__media').append(mainImageTag);
     
  }
    
      mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/Artboard_2_f5153578-c377-4403-af93-9b8e776c69d8.jpg';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
     thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Combo Image">
  </li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);

    mainImageUrl = '//cdn.shopify.com/s/files/1/0100/1622/7394/files/Artboard_3_ed399522-d756-4a59-90da-62bf8f27eb81.png';
    var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Healthy Gut Combo"
sizes="445px" srcset="${mainImageUrl}">`;
    thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
<img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Combo Image">
  </li>`;
    $('.result-page .product-single__thumbnails').append(thumbImage);
    $('.result-combo-pr-image .product-single__media').append(mainImageTag);
  
  products.forEach(e => {
    getProductByHandle(e.handle);
  });
}

  var prices = 0, doc__fee = 100000, diet__plan = 50000, hair__coach_fee = 50000, month1_total, month1DiscountPrice, month3DiscountPrice, month6DiscountPrice;
var variantsIDs = [];
  function getProductByHandle(handle, adtitle) {
    jQuery.getJSON('/products/'+handle+'.js', function(product) {

       if (handle === 'customised-diet-plan' || handle === 'prescription-from-ayurveda-doctor-and-dermatologist-included') {

    } else {
      
     if(product.title == 'Minoxidil 5% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353003-min_78429f77-feb1-47ab-9964-d11cafb7e2eb.png`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352924.png`;
      }
      if(product.title == 'Hair Vitamin with DHT Blockers | Biotin and Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353005-min_f824dc26-2902-4d71-af29-19bc87caffff.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352733_9c112a41-6681-40b0-bbe4-21b44ef8a666.png`;
      }
      if(product.title == 'Hair Ras Ayurvedic Hair Herbs | 100% Natural Hair Supplement with Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353018.png?v=1677592015`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353017.png?v=1677592012`;
      }
      
      if(product.title == 'Scalp Oil with Essential Oils for Hair Growth with Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352971-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352979.png`;
      }
        if(product.handle == 'scalp-oil-with-scalp-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352972-min.png`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352980_16e559cf-3c3b-40db-b3ad-ac6db3a7bc2d.png`;
        }
        if(product.handle == 'scalp-oil-with-growth-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352971-min.png`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352979.png`;
        }
        if(product.handle == 'scalp-oil-with-dandruff-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352969-min.png`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352977.png`;
        }
        if(product.handle == 'scalp-oil-with-calm-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352970-min.png`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352978.png`;
        }
      if(product.handle == 'digest-boost-for-improved-digestive-ability-traya-health'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353000-min_a0ba538f-5f94-4c0d-ac56-3cfe6696a52f.png`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352777_84fe3222-99f9-419b-b192-b8689a907e6e.png`;
        }
      if(product.title == 'Health Tatva for Energy | Absorption | Immunity | Fatigue'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352907-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353015_3702fc82-5611-453c-bcb0-790b06439540.png`;
      }
      if(product.title == 'Recap Serum For Hair Fall Control And Better Scalp Health | Contains Redensyl, Procapil And Capixyl (30 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352732-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352736_e3d756f3-cdac-483a-b5f7-ffd1b00dfd33.png`;
      }
      if(product.title == 'Minoxidil 2% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353006-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353010_3e2a12d0-d6f4-4bfa-922d-c9871813116c.png`;
      }
      if(product.title == 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352983-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352988_56c94716-233c-4f3c-a812-de518b2818fd.png`;
      }
      if(product.title == 'Traya Nasal Drops with Shatavari for Nourishing Hair Follicles'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353014-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352989_a6166969-76d0-43d4-b329-4180b606d2bf.png`;
      }
      if(product.title == 'Defence shampoo | Mild Shampoo with Biotin (100 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353009-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352885_cba84948-bdbb-4557-a566-37d15a2c4719.png`;
      }
      if(product.title == 'Anti-Dandruff Shampoo with Ichthammol & Aloevera | Paraben Free'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352883-min.png`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352886_6c06ce4a-3556-40a2-ab0a-0ab8cf3ea4c7.png`;
      }
      if(product.title == 'Scalp Controller | Plant Based Dandruff Treatment for Itchy Scalp'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352969-min.png`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352977.png`;
      }
      
      if(product.title == 'Dandruff night lotion'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352875-min_dcae5b25-6481-4115-a9b7-8d8289dee469.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352926.png`;
      }
      
// if(product.title == 'Kevon 2% Anti-fungal lotion for heavy dandruff'){
//         var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352731.jpg?v=1670602207`;
//         var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352738.jpg?v=1670603575`;
//       }          
       if(product.title == 'Meno Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_513-min_3ab894df-186c-43f9-b17e-615aa2e9bcd9.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_517_a83bab5d-0e4a-4014-b6d1-921077e59f00.png`;
      }
      if(product.title == 'Mom Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352910-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_515_f75f3e1b-ec7e-45b7-8c47-b70698a55849.png`;
      }
      if(product.title == 'PCOS Santulan'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352909-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_516_4a60d0f9-cd2d-4827-9d3b-828aacc72cd5.png`;
      }
      if(product.title == 'Thyro Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352953-min.png`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_514_47282837-ad2a-42f1-80c7-3470bf4f85fe.png`;
      }
      
      var price = parseInt(product.price/100);
var html = `<div class="col-md-10 pt-2 pt-md-0 result-product m-auto">
		    <div class="product-item h-100 mb-0">
					<a href="${product.url}" class="text-decoration-none" tabindex="-1"><img id="${product.handle}" src="${resultImg}" class="mx-auto d-md-none card border-0 rounded-lg shadow"><img id="${product.handle}" src="${resultImgdesk}" class="mx-auto d-none d-md-block card border-0 rounded-lg shadow"></a>
			</div>
	</div>`;
      
      var title = $('[data-product-title]').append(product.title);

      $('.product-section .container > .row').append(html);

      $(".product-featured-image").append("<div class='img_wrap'><img id='"+ product.handle + "' src='"+ product.featured_image + "' /></div>");
      $('#productImg').hide();
      $('#productDescList').append("<li>"+product.title+"</li>");
      
    }
      
      var p = product.price, final_price;
      prices = prices + p;
      final_price = (prices/100);
      $('#price').html('₹' + JSON.stringify(final_price).slice(0, -2) + '');
      //     Change total price here
      $('.all-total-price').html('₹ ' + parseInt(final_price+2000) + '/-');
      $('.total-price').html('₹ ' + parseInt(final_price) + '/-');
      $('#add-to-cart-result-page, .sticky-btn #add-to-cart-result-page').attr('data-price',final_price);
      variantsIDs.push({
        'id': product.variants[0].id,
        'quantity': 1
      });
      });
    // console.log(">>>", '/products/'+handle+'?view=result-product-list' );
    fetch('/products/'+handle+'?view=result-product-list')
    .then(response => {
      return response.text();
    }).then(result => {
      var html = result;
       // $('.product-section .container > .row').append(html);
       var t = document.querySelector('cart-drawer');
    let cart_drawer = result.sections['cart-drawer'];
    CartDrawerUpdate(t, cart_drawer);
    });
  }

  function checkout() {
    localStorage.setItem('user__gender',user_gender);
    let formData = {
      'items': variantsIDs,
      sections: 'cart-drawer',
      attributes: {
        first_name: f_name,
        phone: C_number,
        email: C_email
      }
    };
    variantsIDs.forEach(e => {
      e.properties = {'Plan': 'Auto'};
    });
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

  function buyItNow() {

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


  $('body').on('click', '#add-to-cart-result-page', function() {
    $.ajax({
      type: "POST",
      url: '/cart/clear.js',
      success: function(){
        checkout();
      },
      dataType: 'json'
    });

  });

  $('body').on('click', '#buyNowResult2', function() {

    $.ajax({
      type: "POST",
      url: '/cart/clear.js',
      success: function(){
        buyItNow();
      },
      dataType: 'json'
    });

  });
  
  var clearCart = function() {
    $.ajax({
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

  $(document).ready(function(){
    clearCart();
    jQuery.ajax({
      url: liveendpoint+id,
      dataType: 'json',
      headers: token
    })
    .done(function(data){
      displayProduct(data);
      // console.log("justin>> ", data);
      $('[data-user-name]').text(data.User_Analysis.first_name);
      $('#name1').text(data.User_Analysis.first_name);
      $('#name3').text(data.User_Analysis.first_name);
      $('#typeOfLoss').text(data.Recommendations.Type_of_hair_loss);
      $('#stage').text(data.User_Analysis.stage);
      $('#typeOfLoss3').text(data.Recommendations.Type_of_hair_loss);
      $('#stage3').text(data.User_Analysis.stage);

      $('#stageDescription').text(stageDescription[data.User_Analysis.stage]);

      selectedStage = data.User_Analysis.stage;

      $('.' + selectedStage).addClass('selectedStage');

      if (selectedStage === 'Stage-1') {
      } else if (selectedStage === 'Stage-1') {
      } else if (selectedStage === 'Stage-2') {
        $('.Stage-1').addClass('checkStage');
      } else if (selectedStage === 'Stage-3') {
        $('.Stage-2').addClass('checkStage');
      } else if (selectedStage === 'Stage-4') {
        $('.Stage-2').addClass('checkStage');

      } else if (selectedStage === 'Stage-5') {

        $('.Stage-3').addClass('checkStage');
      } else if (selectedStage === 'Stage-6') {

        $('.Stage-5').addClass('checkStage');
      } else if (selectedStage === 'Coin Size Patch') {
        $('.Stage-7').addClass('selectedStage');
        //$('.Stage-1').addClass('checkStage hide-text');

      } else if (selectedStage === 'Heavy Hair Fall Across The Head') {
        $('.Stage-8').addClass('selectedStage');
        $('.Stage-1').addClass('checkStage hide-text');
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
        adaptiveHeight: true,
        autoplaySpeed: 2000
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
        // jQuery('.result_product_slides').slick({
        //   mobileFirst: true,
        //   autoplay: true,
        //   autoplaySpeed: 2000,
        //   arrows: false,
        //   dots:true,
        //   adaptiveHeight: true,
        //   responsive: [
        //     {
        //       breakpoint: 760,
        //       settings: "unslick"
        //     }
        //   ]
        // });
         jQuery('.result_product_slides').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      arrows: true,
      autoplaySpeed: 2000
    });
      },2e3);
      $('#add-to-cart-result-page, .sticky-btn #add-to-cart-result-page').attr('user-mobile',data.User_Analysis.phone);
      $('#add-to-cart-result-page, .sticky-btn #add-to-cart-result-page').attr('user-email',data.User_Analysis.email);

    });
  });


  $('body').on('click', '[data-thumb] > div img', function(){
    var Image = $(this).attr('src');
    $('[data-main-image] img').attr('src', Image);
  });

  $(document).ready(function(){

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


  if(window.location.pathname == '/pages/result4b'){
    setTimeout(function(){
      $('.slick-products').slick({
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

    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $('.product-section-list').offset().top + $('.product-section-list').outerHeight() - window.innerHeight) {
        $('.sticky-btn').css('display', 'flex');
      } else {
        $('.sticky-btn').css('display', 'none');
      }
    });

    $(window).on('scroll', function() { 
      if ($(window).scrollTop() >= $('.result4b .site-footer').offset().top - window.innerHeight) {
        $('.sticky-btn').css('position', 'static');
      } else {
        $('.sticky-btn').css('position', 'fixed');
      }
    });
  }

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
}(jQuery || window.jQuery));
