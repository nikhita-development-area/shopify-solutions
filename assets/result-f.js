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

var id = getUrlParameter('id'), f_name, C_number, user__gender, user_gender;

var cohort = getUrlParameter('cohort');
var factors = [];
if (id) {
  localStorage.setItem('user-gender', 'female');
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');
  var baseUrls = {
  DEV: 'https://api.dev.hav-g.in/',
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
 // liveendpoint = baseUrl + 'dgReport/v3?id=';
    var newapi = baseUrl + 'dgReport/v6?id=';
   liveendpoint = newapi;

  if(id){

    jQuery(document).ready(function($){

      jQuery.ajax({
        url: liveendpoint+id,
        dataType: 'json',
        headers: token
      })
      .done(function(data){
               // console.log(data);
        displayComboProduct(data.Recommendations);
        let goal = data.User_Analysis.goal.replace('{"',"").replace(/","/g,", ").replace(/Anti-/g,'').replace(/More/g,'').replace('"}',"");
        let root_cause = `Gut:${data.User_Analysis.gut}, Stress:${data.User_Analysis.stress}`;
//             let suffering = JSON.parse(JSON.stringify(data.User_Analysis.suffering)).split(',');
        var suffering_data = data.User_Analysis.suffering;
//         console.log("root_cause", root_cause);
//         console.log("goal", goal);
        if(data.User_Analysis.stages && data.User_Analysis.stages != "None"){factors.push(data.User_Analysis.stages)}
//         console.log("suffering_data", suffering_data);
        if(suffering_data){
          let suffering = suffering_data.replace(/^\{|\}$/g,'').split(',');
//           console.log("..", suffering);
          for(let i in suffering){
            if(JSON.parse(suffering[i]) == "None"){
              factors.push('Lifestyle');
            }else{
            factors.push(JSON.parse(suffering[i]));
            }
          }
        }
         factors.push('Digestion','Stress','Genetics','Nutrition');
       
       // console.log(factors);
        $('[data-user-name]').text(data.User_Analysis.first_name);
        $('.femleBannerTTls [scalp-type]').text(data.User_Analysis.hair_type);
        $('.femleBannerTTls [hair-concern]').text(goal);
        $('.femleBannerTTls [root-cause]').text(factors[0]);
        var User_Analysis = data.User_Analysis;
        f_name = User_Analysis.first_name; 
        C_number = User_Analysis.phone;
        user__gender = User_Analysis.gender;
        if(user__gender == 'F') {
            user_gender = 'Female';
        }
          $('.root_cause_iconFR .mainFactImages').hide();
          for(let i in factors){
            if(i < 5 && i != 0){
              let factor = factors[i].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');  
               //console.log(factor);
            $(`[${factor}]`).show();
            }
            if(i >= 5) break;
          }

        setTimeout(function(){
          jQuery('.resco-combo .resco-row').slick({
            mobileFirst: true,
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
          $('.result-combo-pr-image .product-single__media').slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.product-single__thumbnails'
          });
          $('.product-single__thumbnails').slick({
            arrows: false,
            slidesToShow: 5,
            infinite: true,
            asNavFor: '.product-single__media',
            focusOnSelect: true
          });
          $('.slick-items-container-result').slick();
        },1300);

         $('#add-to-cart-result-page, .sticky-btn #add-to-cart-result-page, .add-to-cart-result-page').attr('user-mobile',data.User_Analysis.phone);
      $('#add-to-cart-result-page, .sticky-btn #add-to-cart-result-page, .add-to-cart-result-page').attr('user-email',data.User_Analysis.email);
      });

      var position=0;
      var scrollTo='';
      var container = $('.main-content');
      $('.mainFactImages p').click(function(e){
        e.preventDefault();
        var id = $(this).attr('data-id');
        $('#nav-tabContent #' + id).addClass('active show').siblings().removeClass('active show');
        $('#nav-tab #' + id + '-tab').addClass('active').siblings().removeClass('active');
      });

    });
    jQuery('body').on('click', '.add-to-cart-result-page', function(evt) {
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

    jQuery('body').on('click', '.buyNowResult2', function() {

      jQuery.ajax({
        type: "POST",
        url: '/cart/clear.js',
        success: function(){
          buyItNow();
        },
        dataType: 'json'
      });

    });
  }

var variantsID = 0;
function displayProduct(data) {
var $ = jQuery;
  var r = Object.assign(data.User_Analysis, data.Recommendations);

  $('.productt').hide();
  if (r.Health_tatva === 'Yes') {
    $('#healthTatva').show();
    getProductByHandle('herbal-tablets');
    var Desc = 'Ayurvedic herbs to boost absorption of nutrients for improved energy and hair health';
  }
  if (r.Hair_ras === 'Yes') {
    $('#hairRasa').show();
    getProductByHandle('hair-fall-tablets');
    var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
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

  if ((r.Serum === 'Yes') && (r.Hair_vitamin === 'No')) {
    $('#hairRootserum').show();
    getProductByHandle('hair-vitamins');
    var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
  }
  
  if (r.Hair_ras === 'Yes') {
    getProductByHandle('hair-growth-herbs');
    var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
  }

  if (r.Scalp_oil === 'Yes' || r.Scalp_oil === 'bergamot and ylang ylang') {
    $('#scalpOil').show();
    getProductByHandle('herbal-hair-oil');
    var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
  }

  if (r.Kevon === 'Yes') {
    getProductByHandle('ketoconazole-2-night-lotion');
  }
  
  if (r.Nasal === 'Yes') {
    getProductByHandle('shatavari-ghrita');
    var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
  }
  
  if(r.gender === 'M'){
    $('[data-gender]').append('Male');
  } else {
    $('[data-gender]').append('Female');
  }
  
}
function displayComboProduct(data) {
  // console.log("data> ", data);
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
  if(data.Minoxidil_2 == "Yes"){
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

var prices = 0;
var variantsIDs = [];
function getProductByHandle(handle) {
var $ = jQuery;
  jQuery.getJSON('/products/'+handle+'.js', function(product) {
    

    if (handle === 'customised-diet-plan' || handle === 'prescription-from-ayurveda-doctor-and-dermatologist-included') {

    } else {
      
      if(product.title == 'Minoxidil 5% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var title = 'Minoxidil 5%';
        var Desc = 'Minoxidil 5% for male androgenic alopecia hair loss and hair growth';
        var productSub = 'For regrowth of thicker and healthier looking hair in Male Pattern Hair loss';
        var productDesc = 'Targets root causes of hair thinning, receding hairline and hair fall such as shrinking of hair follicles due to DHT, poor blood flow to hair follicles and undernourished hair follcles. Made with ingredients like Minoxidil 5%, Finasteride 0.1% and Procapil 3%, that are clinically proven to regrow thick and healthy hair in men experiencing androgenic alopecia.';
        var prodContent = `<p class="prodContent">Clinically proven treatment for pattern hair loss to promote hair regrowth.</p> 
                          <ul class="pl-3">
                          <li>Increases hair thickness</li>
                          <li>Strengthens hair follicles</li>
                          <li>Improves blood flow to the scalp</li>
                          <li>Improves hair thickness</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Twice a day or as prescribed by Traya doctors.</p>`;
      }
      if(product.title == 'Hair Vitamin with DHT Blockers | Biotin and Bhringraj'){
        var title = 'Hair Vitamins';
        var Desc = '100% Vegetarian supplements for hair to combat vitamin deficiency related hair loss';
        var productSub = 'Improve your hair health with the right nutrition';
        var productDesc = 'Targets root causes of hair loss such as vitamin deficiency, poor nutrition and DHT. Made with clinically tested safe and natural ingredients to promote thicker, healthier hair and reduce hair fall. Fortified with biotin and natural DHT blockers like pumpkin seed extract, pygeum, green tea extract and bhringraj.';
      	var prodContent = `<p class="prodContent">Your daily vitamin fix. Contains biotin and grapeseed extracts that help strengthen hair follicles.</p> 
                          <ul class="pl-3">
                          <li>Repairs damaged hair</li>
                          <li>Improves skin and hair</li>
                          <li>Strengthens hair</li>
                          <li>Boosts immune system</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> One tablet daily or as prescribed by doctors.</p>`;
      }
      if(product.title == 'Hair Ras Ayurvedic Hair Herbs | 100% Natural Hair Supplement with Bhringraj'){
        var title = 'Hair Ras';
        var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
        var productSub = 'An ayurvedic herb mix that improves hair quality and delays greying';
        var productDesc = 'Nourishes hair internally with essential supplements with a formulation of rare and effective Ayurvedic herbs. Targets poor hair follicle health, dosha imbalance and poor blood flow to the scalp. Inadequate sleep, diet and lifestyle can cause an imbalance of hormones. Adaptogenic herbs in hair ras such as bhringraj, shatavari and ashwagandha help restore that. Made with proven, safe and natural ingredients these Ayurvedic multivitamin tablets help promote hair health.';
      	var prodContent = `<p class="prodContent">Ayurvedic herb mix that nourishes your hair and keeps it healthy.</p> 
                          <ul class="pl-3">
                          <li>Improves blood circulation</li>
                          <li>Promotes hair growth</li>
                          <li>Delays premature greying</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Two tablets, twice a day or as prescribed by doctors.</p>`;
      }
      if(product.title == 'Scalp Oil with Essential Oils for Hair Growth with Bhringraj'){
        var title = 'Scalp Oil';
        var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p class="prodContent">100% natural customised scalp oil to suit your specific hair concerns.</p> 
                          <ul class="pl-3">
                          <li>Maintains scalp pH</li>
                          <li>Stimulates hair growth</li>
                          <li>Controls dandruff</li>
                          <li>Improvises hair thickness</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"> <b>Dosage:</b> Twice a week or as prescribed by doctors.</p>`;
      }
      if(product.title == 'Health Tatva for Energy | Absorption | Immunity | Fatigue'){
        var title = 'Health Tatva';
        var Desc = 'Ayurvedic herbs to boost absorption of nutrients for improved energy and hair health';
        var productSub = 'Detoxify your way to healthier hair';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor nutrition, sluggish metabolism, absorption, and fatigue. Made with proven, safe and natural ingredients, these immunity booster tablets promote overall health for hair fall control and hair growth. Suitable for those with gas, acidity, bloating and low energy levels.';
        var prodContent = `<p class="prodContent">Natural herbs that bring about internal balance by improving metabolism and digestion.</p> 
                          <ul class="pl-3">
                          <li>Increases energy levels</li>
                          <li>Boosts immunity</li>
                          <li>Improves absorption</li>
                          <li>Promotes gut health</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> One tablet daily or as prescribed by doctors.</p>`;
      }
      if(product.title == 'ReCaP Serum for Hair Fall Control and Hair Growth | Contains Redensyl, Procapil and Capixyl (30 ml)'){
        var title = 'ReCaP Hair Serum';
        var Desc = 'A serum to strengthen hair roots, improve scalp circulation and boost hair growth in early stages of hair loss.';
        var productSub = 'Promotes hair regrowth naturally by improving follicle health';
        var productDesc = 'Targets root causes of hair fall control such as premature ageing of hair follicles, shrinking hair follicles and weak hair roots. Traya Hair Root Serum is made with patented and clincally proven ingredients like Redensyl 3%, Caffeine, Biotin and Cressatine. Recommended for early stages (1 & 2) of pattern hair loss and telogen effluvium.';
        var prodContent = `<p class="prodContent">A serum to strengthen hair roots, improve scalp circulation and boost hair growth in early stages of hair loss.</p> 
                          <ul class="pl-3">
                          <li>Delays ageing of hair roots</li>
                          <li>Makes hair strands thicker</li>
                          <li>Reverses the effect of DHT</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> 1 ml a day or as prescribed by Traya doctors</p>`;
      }
      if(product.title == 'Minoxidil 2% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var title = 'Minoxidil 2%';
        var Desc = 'Minoxidil 2% treatment for female androgenic alopecia hair loss and hair growth';
        var productSub = 'For regrowth of thicker and healthier looking hair in Female Pattern Hair loss';
        var productDesc = 'Targets root causes of hair thinning, widened partition and hair fall such as shrinking of hair follicles due to DHT, poor blood flow to hair follicles and undernourished hair roots. Made with ingredients like Minoxidil 2% and Procapil 3%, that are clinically proven to regrow thick and healthy hair in women experiencing androgenic alopecia';
        var prodContent = `<p class="prodContent">Clinically proven treatment for pattern hair loss to promote hair regrowth.</p> 
                          <ul class="pl-3">
                          <li>Increases hair thickness</li>
                          <li>Strengthens hair follicles</li>
                          <li>Maintains scalp health</li>
                          <li>Improves hair thickness</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Twice a day or as prescribed by Traya doctors.</p>`;
      }
      if(product.title == 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days'){
        var title = 'Gut Shuddhi';
        var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
        var productSub = 'Fix your digestion to fix your hair loss';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor digestion, incomplete bowel movements, low gut motility and toxins. Made with safe and natural ayurvedic herbs these digestion tablets promote overall health for controlling hair fall and hair growth. Suitable for those with unsatisfactory bowel movements, improper diet and brain fog. Perfect for a gut cleanse and detox.';
        var prodContent = `<p class="prodContent">A natural herb mix that detoxifies and maintains healthy digestion.</p> 
                          <ul class="pl-3">
                          <li>Relieves constipation, acid reflux and gas</li>
                          <li>Cleanses and detoxifies the gut</li>
                          <li>Aids digestion</li>
                          </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage: </b>One tablet daily or as prescribed by doctors.</p>`;
      }
      if(product.title == 'Traya Nasal Drops with Shatavari for Nourishing Hair Follicles'){
        var title = 'Nasal Drops';
        var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
        var productSub = 'Sleep better and manage stress';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor sleep pattern, physical and mental stress. Traya Shatavari Ghrit is made with Ayurvedic herbs and pure ghee to promote overall health for stronger, thicker hair and reduced hair loss.';
      }
      if(product.title == 'Defence shampoo | Mild Shampoo with Biotin (100 ml)'){
        var title = 'Defence Shampoo';
        var Desc = 'Chemical-free hair and scalp cleanser shampoo';
        var productSub = 'Nourishes, strengthens and moisturizes hair. Doesn’t claim to stop hair fall.';
        var productDesc = 'When we say shampoos don’t help resolve hair loss, we stand by it. Shampoos help cleanse the scalp of oil, dirt, dust and residue. So if you already own a chemical-free shampoo, go ahead and use it. If you want to try something new or are on the Traya Hair Loss Regime. This mild cleansing formula is made with ingredients like Biotin, Niacinamide, and Pea Sprout extracts for a clean and healthy scalp and hair.';
        var prodContent = `<p class="prodContent">A gentle hair cleanser that nourishes, strengthens and moisturizes your hair.</p> 
                            <ul class="pl-3">
                            <li>Protects hair from damage</li>
                            <li>Maintains scalp health</li>
                            <li>Improves hair quality</li>
                              </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Use it twice a week or as prescribed by doctors.</p>`;
      }
      if(product.title == 'Anti-Dandruff Shampoo with Ichthammol & Aloevera | Paraben Free'){
        var title = 'Anti-Dandruff Shampoo';
        var Desc = 'Made with antifungal ingredients for getting rid of dandruff of all types';
        var productSub = 'Fights dandruff to give you a clean and reduces irritation';
        var productDesc = 'Made with clinically proven antifungal and soothing ingredients such as Ichthammol and aloevera. This medicinal anti-dandruff shampoo gets rid of mild, flaky and heavy dandruff. It also prevents the recurrence of dandruff and improves scalp health';
        var prodContent = `<p class="prodContent">Unique combination that reduces dandruff caused by fungal or an oily scalp.</p> 
                        <ul class="pl-3">
                        <li>Hydrates scalp</li>
                        <li>Reduces Itchiness</li>
                        <li>Removes dandruff</li>
                          </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Twice a week or as prescribed by Traya doctors.</p>`;
      }
      if(product.title == 'Scalp Controller | Plant Based Dandruff Treatment for Itchy Scalp'){
        var title = 'Scalp Controller';
        var Desc = 'Instant relief for scalp itching and irritation caused by dandruff';
        var productSub = 'Control dandruff and reduce stress to stop your hair fall';
        var productDesc = 'Targets causes of hair loss and hair thinning related to poor scalp health such as excessive heat, dandruff and stress. Made with a combination of essentials oils, herbs and carrier oils that are customised for your scalp concerns, stress relief and prevent dandruff.';
        var prodContent = `<p class="prodContent">Targets the root causes of itchy scalp to provide instant relief.</p> 
						<ul class="pl-3">
                        <li>Soothes scalp</li>
                        <li>Normalizes sebum production</li>
                        <li>Reduces flaky dandruff</li>
                        <li>Rehydrates the scalp</li>
                        </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Rosebay extract, neem extract, Lecithin.</p>`;
      }
      
      if(product.title == 'Kevon 2% Anti-fungal lotion for heavy dandruff'){
        var title = 'Kevon Lotion';
        var Desc = 'Relief from heavy dandruff and scalp itching';
        var productSub = 'Treats your dandruff and improves scalp health';
        var productDesc = 'Made with a clinically proven antifungal ingredient. This medical stay on lotion stops the growth of the fungus Malassezia furfur and controls hair loss due to itchiness. Best results are seen when used with an Anti-dandruff shampoo.';
        var prodContent = `<p class="prodContent">Treats your dandruff and improves scalp health. Made with a clinically proven antifungal ingredient.</p> 
                          <ul class="pl-3">
                          <li>Reduces Scalp irritation</li>
                          <li>Prevents Inflammation</li>
                          <li>Stops growth of Dandruff</li>
                            </ul>`;
        var prodContent2 = `<p class="doses"><b>Dosage:</b> Ketoconazole 2%</p>`;
      }
      if (product.title === 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days') {
        var title = 'Gutt Shuddhi';
        var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
        var productSub = 'Fix your digestion to fix your hair loss';
        var productDesc = 'Targets root causes of hair fall and hair thinning such as poor digestion, incomplete bowel movements, low gut motility and toxins. Made with safe and natural ayurvedic herbs these digestion tablets promote overall health for controlling hair fall and hair growth. Suitable for those with unsatisfactory bowel movements, improper diet and brain fog. Perfect for a gut cleanse and detox.';
      }
      
      var price = theme.Currency.formatMoney(product.price, theme.moneyFormat)
      var html = `<div class="col-md-6 pt-2 pt-md-0 result-product mb-4">
		<div class="product-item card border-0 rounded-lg shadow p-3 p-md-4 h-100 mb-0">
          <div class="price-on-top p-2">
            <h5 class="font-weight-bold mb-0 text-tradewind d-none d-md-block">${price}</h5>
            <h6 class="font-weight-bold mb-0 text-tradewind d-md-none w-100">${price}</h6>
          </div>
			<div class="row shadow-none pb-0">
              <div class="col-12">
                <h6 class="font-weight-bold text-uppercase mt-md-4 d-md-none" data-product-name=""><a href="${product.url}" class="text-decoration-none" tabindex="-1">${ title }</a></h6>
                <h4 class="font-weight-bold mb-3 text-uppercase d-none d-md-block" data-product-name=""><a href="${product.url}" class="text-decoration-none" tabindex="-1">${ title }</a></h4>
              </div>
				<div class="col-5">
					<a href="${product.url}" class="text-decoration-none" tabindex="-1"> <img id="${product.handle}" src="${ product.featured_image }" class="mx-auto"> </a>
					 </div>
				<div class="col-7 pl-0 pr-0 pl-md-3">
				${ prodContent }
				</div>
			</div>
			${ prodContent2 }
		</div>
	</div>`;


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
    var month_3_des=$('.month-plan-3').find('.main-persentage').data('discount');
    var discount_month_1=prices-((prices *month_1_des)/100);
    $('.price[data-price]').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
    $('.all-total-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
//     $('.total-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
    $('.total-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
   $('.add-to-cart-result-page').attr('data-price',prices);
    $('.total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
    $('.total-price-1').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
    $('.total-price-3').html(theme.Currency.formatMoney(prices * 3, theme.moneyFormat));
   $('[data-1month]').attr('data-1month', prices).attr('data-3month', discountedPrice*3);
    $('.total__discount_price_1').html(theme.Currency.formatMoney(discount_month_1, theme.moneyFormat));
    $('.total__discount_price_3').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
   /* added by neeraj   */ 
    var fee = parseInt($('[data-docotr-fee]').attr('data-docotr-fee')); 
    $('[data-docotr-fee]').html(theme.Currency.formatMoney(fee * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
     
    var dietPlan = parseInt($('[data-diet-plan]').attr('data-diet-plan'));  
    $('[data-diet-plan]').html(theme.Currency.formatMoney(dietPlan * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));

    var hairCoach = parseInt($('[data-hair-coach]').attr('data-hair-coach'));  
    $('[data-hair-coach]').html(theme.Currency.formatMoney(hairCoach * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
    
    var total__fess=(discountedPrice * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
    $('.all-total-price').html(theme.Currency.formatMoney(total__fess, theme.moneyFormat));
    
    var fees_charge = (fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
   
    var percent_discount=100 - Math.round((((total__fess - fees_charge)/total__fess)*100));
    $('.persentage').text('('+percent_discount +'% Off)');
    
    var total_fees_charge_month_1=(discount_month_1* $('.month-plan-1 [name="month"]').val())+(fee * $('.month-plan-1 [name="month"]').val())+(dietPlan * $('.month-plan-1 [name="month"]').val())+(hairCoach * $('.month-plan-1 [name="month"]').val());
    var fees_charge_month_1=(fee * $('.month-plan-1 [name="month"]').val())+(dietPlan * $('.month-plan-1 [name="month"]').val())+(hairCoach * $('.month-plan-1 [name="month"]').val());
    var percent_discount_month_1=100 - Math.round((((total_fees_charge_month_1 - fees_charge_month_1)/total_fees_charge_month_1)*100));
    $('.month-plan-1 .main-persentage').text('('+percent_discount_month_1+'% Off)');
    
    var total_fees_charge_month_3=(discountedPrice* $('.month-plan-3 [name="month"]').val())+(fee * $('.month-plan-3 [name="month"]').val())+(dietPlan * $('.month-plan-3 [name="month"]').val())+(hairCoach * $('.month-plan-3 [name="month"]').val());
    var fees_charge_month_3=(fee * $('.month-plan-3 [name="month"]').val())+(dietPlan * $('.month-plan-3 [name="month"]').val())+(hairCoach * $('.month-plan-3 [name="month"]').val());
    var percent_discount_month_3 = 100 - Math.round((((total_fees_charge_month_3 - fees_charge_month_3)/total_fees_charge_month_3)*100));
    $('.month-plan-3 .main-persentage').text('('+month_3_des+'% Off)');
    //$('#add-to-cart-result-page').html('Buy Now <span>( '+$('.select-plan [name="month"]:checked').val()+' Month Plan )</span>');
    
    /* added by neeraj end  */
   
    var qty = parseInt($('[name="month"]:checked').val());

    if(getCookie("GuestForm_id")){
    variantsIDs.push({
      'id': product.variants[0].id,
      'quantity': qty,
      properties: {
        '_result_id': id
      }
    });
    }else{
    variantsIDs.push({
      'id': product.variants[0].id,
      'quantity': qty
    });
    }
    
  });

}

function checkout() {
  localStorage.setItem('user__gender',user_gender);
  var $ = jQuery, plan;
  var qty =$('[name="month"]:checked').val();
   if(qty == 3){
  plan = '3 Months Female';
  var formData = {
    'items': variantsIDs,
    sections: 'cart-drawer',
    attributes: {
      first_name: f_name,
      phone: C_number
    }
  }
  }else{
    plan = '';
    var formData = {
    'items': variantsIDs,
    sections: 'cart-drawer',
    attributes: {
      first_name: f_name,
      phone: C_number
    }
  }
  }
  variantsIDs.forEach(e => {
    e.quantity = qty;
    e.properties = {'Plan': plan};
  });

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    return response.json();
  }).then(result => { 
    var t = document.querySelector('cart-drawer');
    let cart_drawer = result.sections['cart-drawer'];
    CartDrawerUpdate(t, cart_drawer);
  }).catch((error) => {
    console.error('Error:', error);
  });
}
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
function buyItNow() {
  var $ = jQuery;
  var qty =$('[name="month"]:checked').val();
  variantsIDs.forEach(e => {
    e.quantity = qty;
  });
  let formData = {
    'items': variantsIDs
  };
  if(qty == 3){
  var acturl = '/cart/checkout?discount=Result5'
  }else{
  var acturl = '/cart/checkout'
  }

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
   //$('.site-header__cart.js-drawer-open-right').trigger('click');
   document.location.href = acturl;
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
  $('[data-docotr-fee]').html(theme.Currency.formatMoney(fee * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
  var dietPlan = parseInt($('[data-diet-plan]').attr('data-diet-plan'));  
  $('[data-diet-plan]').html(theme.Currency.formatMoney(dietPlan * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
  var hairCoach = parseInt($('[data-hair-coach]').attr('data-hair-coach'));  
  $('[data-hair-coach]').html(theme.Currency.formatMoney(hairCoach * $('.select-plan [name="month"]:checked').val(), theme.moneyFormat));
  
//   $('.all-total-price').html(theme.Currency.formatMoney(dataMonth, theme.moneyFormat))
var total__fess=(discountedPrice * $('.select-plan [name="month"]:checked').val())+(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
var fees_charge=(fee * $('.select-plan [name="month"]:checked').val())+(dietPlan * $('.select-plan [name="month"]:checked').val())+(hairCoach * $('.select-plan [name="month"]:checked').val());
    $('.persentage').text(mainPer);
  
  var percent_discount=Math.round((((total__fess - fees_charge)/total__fess)*100.00));
//   $('.persentage').text('('+percent_discount +'% Off)');
 
  

//   console.log('discountPrice', discountPrice, 'discountedPrice', discountedPrice);

  var discount = mainLabel.find('.main-persentage').data('discount');
    
//     $('.all-total-price').html(theme.Currency.formatMoney(prices * discount_month, theme.moneyFormat));
    $('.all-total-price').html(theme.Currency.formatMoney(total__fess, theme.moneyFormat));
//     $('.total-price').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice*3, theme.moneyFormat));
   $('.add-to-cart-result-page').attr('data-price',discountedPrice * discount_month);
    $('.total-price,.price[data-price]').not('.discounted-price').html(theme.Currency.formatMoney(discountedPrice * discount_month, theme.moneyFormat));
    $('.total__discout_price_cstm').html(theme.Currency.formatMoney(discountedPrice * discount_month, theme.moneyFormat));
  //  window.open('https://traya.health/discount/33%2525off','_blank');
    //$('#add-to-cart-result-page').html('Buy Now <span>( '+discount_month+' Month Plan )</span>');
    $('#Quantity-product-combo-new').val(discount_month);
  if(parseInt(discount) > 0){
  //$('[data-del-price]').show();
  $('[data-del-price]').html(theme.Currency.formatMoney(prices * 3, theme.moneyFormat)).show().parent().addClass('w-75');  
  }else{
 $('[data-del-price]').html(theme.Currency.formatMoney(prices, theme.moneyFormat)).hide().parent().removeClass('w-75'); 
  }
  
}
  

  var position=0;
      var scrollTo='';
      var container = $('.main-content');
      jQuery('.result-gl-rvw').click(function(e, $){
        e.preventDefault();
        var attr =$(this).attr('href').split('#')[1];
        scrollTo = $('#'+attr);
        scrollTo.trigger('click');
        position = scrollTo.offset().top
        - container.offset().top
        + container.scrollTop()-60;
        $("html").animate({ scrollTop: position }, 600);
      });
    $(window).on('scroll', function() { 
    if ($(window).scrollTop() >= $('.result-f .site-footer').offset().top - window.innerHeight) {
      $('.sticky-btn').css('position', 'static');
    } else {
      $('.sticky-btn').css('position', 'fixed');
    }
  });

$(document).ready(function(){
  $('.female-hero-slider').slick({  
    infinite: true,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
          }
      ]
  });
        $('.female-doctor-slider').slick({  
    infinite: true,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
          }
      ]
  });
    });