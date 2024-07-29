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

var id = getUrlParameter('id'), f_name, C_number, C_email, user__gender, user_gender, caseId;

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

  var newapi = baseUrl + 'dgReport/female?id=';
  //console.log(newapi);
  liveendpoint = newapi;

  if(id){

    jQuery(document).ready(function($){

      jQuery.ajax({
        url: liveendpoint+id,
        dataType: 'json',
        headers: token
      })
      .done(function(data){
       console.log(data);
        displayComboProduct(data.Recommendations);
        let goal = data.User_Analysis.goal;
        if(goal != null && goal != 'undefined'){
          goal = goal.replace('{"',"").replace(/","/g,", ").replace(/Anti-/g,'').replace(/More/g,'').replace('"}',"")
        }else {
         goal = 'Goal';
        }
        let root_cause = `Gut:${data.User_Analysis.gut}, Stress:${data.User_Analysis.stress}`;
       // let suffering = JSON.parse(JSON.stringify(data.User_Analysis.suffering)).split(',');
        var suffering_data = data.User_Analysis.suffering_from_conditions;
        var hair_type = data.User_Analysis.hair_quality;
        // console.log("root_cause", root_cause);
       // console.log("goal", goal);
        let Stress = data.User_Analysis.stress;
        let Genetics = data.User_Analysis.family_genetic;
        let FamilyGenetics = data.User_Analysis.family_genetic;
        let EnergyLevel = data.User_Analysis.energy_level;
        let Digestion = data.User_Analysis.acidity_bloating_gas_indigestion;
         let Lowthyroid = data.User_Analysis.suffering_from_conditions;
        let vitamindefeciencies = data.User_Analysis.vitamin_defeciencies;
        
       // console.log("Lowthyroid", Lowthyroid);
        // console.log("stress", Stress);
        // console.log(typeof Stress);
        //if(data.User_Analysis.stage && data.User_Analysis.stage != "None"){factors.push(data.User_Analysis.stage)}
        // console.log("suffering_data", suffering_data);
       // if(suffering_data){
         // let suffering = suffering_data.replace(/^\{|\}$/g,'').split(',');
      //console.log("..", suffering);
       //    for(let i in suffering){
       //      if(JSON.parse(suffering[i]) == "None"){
       //        // factors.push('Lifestyle');
       //      }else if (JSON.parse(suffering[i]).includes("Anemia")){
       //        // factors.push('Lifestyle');
       //      }else if (JSON.parse(suffering[i]).includes("Other Hormonal Issues")){
       //        // factors.push('Lifestyle');
       //      } else if (JSON.parse(suffering[i]).includes("Low Thyroid (Hypothyroidism)")){
       //       factors.push('Thyroid');
       //      }
       //      else{
       //      factors.push(JSON.parse(suffering[i]));
       //      }
       //    }
  //      //  }
  // if(FamilyGenetics){
  //       let FamilyGenetic = FamilyGenetics.replace(/^\{|\}$/g,'');
  //     console.log("..", FamilyGenetic);
     
  //      if(FamilyGenetic == "Yes, Father or father's side of family"){
  //       factors.push('FatherGenetic');
  //       }
  //     if(FamilyGenetic == "Yes, Mother or mother's side of family"){
  //       factors.push('MotherGenetic');
  //       }
  //    if(FamilyGenetic == "Both"){
  //       factors.push('Genetics');
  //       }
  //     }
        
     //       if(hair_type == "Damaged Hair"){
     //       console.log("hair_type", hair_type);
     //  $('#shopify-section-template--16089857228978__6a5e91de-8473-40df-b204-c3dad01b5816').addClass('female_age_restrict');
     // }

        
       // if(Genetics == 'Both' || Genetics == 'None'){
       //  factors.push('Genetics');
       //  // console.log("push data Genetics");
       //  }
       // if(Stress == 'High' || Stress == 'Moderate'){
       //  factors.push('Stress');
       //  // console.log("push data stress");
       //  }
       //   factors.push('Lifestyle','Nutrition');
       //  if(Digestion == 'Yes'){
       //  factors.push('Digestion');
       //  // console.log("push data Digestion");
       //  }

 
         let primaryRootcause = data.root_causes.primaryRootCause
        for(var i=0; i < primaryRootcause.length; i++){
      // console.log("primaryRootcause", primaryRootcause[i].title);
           let itemvalue = primaryRootcause[i].title
          if (itemvalue == 'Autoimmune' )  {
            //console.log(itemvalue);
         $('.product-section_heading-kit').text('Your Customised Kit'); 
       } factors.push(primaryRootcause[i].title);
          
        }

       let otherrootitems = data.root_causes.defaultRootCause
        for(var i=0; i < otherrootitems.length; i++){
     // console.log(otherrootitems[i].title);
          let itemvalues = otherrootitems[i].title
          if (itemvalues == "Genetics" && FamilyGenetics == "Yes, Father or father's side of family")  {
      console.log(itemvalues);
         factors.push('FatherGenetic');
       } 
              else if (itemvalues == "Stress" && Stress == "Low")  {
           factors.push('Stresslow');
       }
                  else if (itemvalues == "Stress" && Stress == "Moderate")  {
           factors.push('Stressmoderate');
       }
                      else if (itemvalues == "Stress" && Stress == "High")  {
           factors.push('Stresshigh');
       }
            else if (itemvalues == "Genetics" && FamilyGenetics == "Yes, Mother or mother's side of family")  {
           factors.push('MotherGenetic');
       }
           else if (itemvalues == "Genetics" && FamilyGenetics == "Both")  {
      factors.push('Genetics');
       }
             else if (itemvalues == "Metabolism" && EnergyLevel == "Very low in the afternoon")  {
      factors.push('Energylevel');
       }
        else if (itemvalues == "Metabolism" && EnergyLevel == "Low by evening/ night")  {
      factors.push('Energylevel');
        }  
        else if (itemvalues == "Metabolism" && EnergyLevel == "Low when I wake up, but gradually increases")  {
      factors.push('Energylevel');
       }
          else if (itemvalues == "Metabolism" && EnergyLevel == "Always high")  {
      factors.push('Energylevel');
       }
            else if (itemvalues == "Deficiency" && vitamindefeciencies == "Yes")  {
      factors.push('Vitamindeficiency');
       }
         else{
           factors.push(otherrootitems[i].title);
         } 
        }
        
       console.log("factors", factors);
       // console.log("factors0", factors[0]);
        $('[data-user-name]').text(data.User_Analysis.first_name);
        $('[data-user-name-info]').text(data.User_Analysis.first_name + "'s");
        $('.femleBannerTTls [scalp-type]').text(data.User_Analysis.hair_type);
        $('.femleBannerTTls [hair-concern]').text(goal);
        $('.femleBannerTTls [root-cause]').text(factors[0]);
        $('[primary-root]').text(factors[0]);
        var User_Analysis = data.User_Analysis;
    // console.log(User_Analysis);
        f_name = User_Analysis.first_name; 
        C_number = User_Analysis.phone; 
        C_email = User_Analysis.email;
        user__gender = User_Analysis.gender;
         caseId = User_Analysis.case_id;
        if(user__gender == 'F') {
            user_gender = 'Female';
          }

         $('.root_cause_iconFR .mainFactImages').hide();
          for(let i in factors){
            if(i < 6 && i != 0){
              let factor = factors[i].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');  
          //console.log(factor);
            $(`[${factor}]`).show();
            }
            if(i >= 5) break;
          }

          $('.root_cause_iconFRs .mainFactImages').hide();
          for(let i in factors){
            if(i < 6 && i != 0){
              let factor = factors[0].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');  
               //console.log("factorssssssssss", factor);
            $(`.root_cause_iconFRs [${factor}]`).show();
            }
          }
        
          $('.RootCause .rootcause_description').hide();
          for(let i in factors){
            if(i < 5 && i == 0){
              let factor = factors[i].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');  
               // console.log("factorssssssssss", factor);
            $(`.RootCause [${factor}]`).show();
            }
          }
          $('.formulation .formulation-text').hide();
          for(let i in factors){
            if(i < 5 && i == 0){
              let factor = factors[0].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');  
               // console.log("factorssssssssss", factor);
            $(`.formulation [${factor}]`).show();
            }
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

         $('#add-to-cart-result-page-frp, .sticky-btn #add-to-cart-result-page-frp, .add-to-cart-result-page').attr('user-mobile',data.User_Analysis.phone);
      $('#add-to-cart-result-page-frp, .sticky-btn #add-to-cart-result-page-frp, .add-to-cart-result-page').attr('user-email',data.User_Analysis.email);
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
    jQuery('body').on('click', '#add-to-cart-result-page-frp', function(evt) {
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
  if (r.Defence_shampoo === 'Yes') {
    getProductByHandle('shampoo');
    var Desc = 'Chemical-free hair and scalp cleanser shampoo';
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
  if (r.Anti_danruff_shampoo === 'Yes') {
    $('#hairAntidandruff').show();
    getProductByHandle('anti-dandruff-shampoo');
    var Desc = 'Made with antifungal ingredients for getting rid of dandruff of all types';
  }

  
 if (r.pcos_santulan === 'Yes') {
    getProductByHandle('pcos-santulan-for-pcos-and-hormone-related-hair-loss');
    var Desc = 'An Ayurvedic formulation that controls PCOS and hormone related hair fall and regularises menstrual cycles';
  }


  if (r.meno_santulan === 'Yes') {
    getProductByHandle('meno-santulan-tablets-for-menopause-support-and-menopausal-hair-fall');
    var Desc = 'An ultimate herbal mix that controls hair fall in menopausal and perimenopausal women';
  }

  if (r.mom_santulan === 'Yes') {
    getProductByHandle('mom-santulan-tablets-for-hair-fall-in-post-pregnancy-or-post-childbirth-period');
    var Desc = 'A restorative supplement that helps treat hair loss in women in the postpartum (post-childbirth) period.';
  }

  if (r.thyro_santulan === 'Yes') {
    getProductByHandle('thyro-santulan-tablets-for-supporting-thyroid-health');
    var Desc = 'A dynamic combination of herbal constituents to tackle thyroid related hair fall';
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
  
  if (r.Nasya === 'Yes') {
    getProductByHandle('shatavari-ghrita');
  }

  //  if (r.Nasya === 'No') {
  //   getProductByHandle('shatavari-ghrita');
  // }

  if (r.Digest_Boost === 'Yes') {
      getProductByHandle('digest-boost-for-improved-digestive-ability-traya-health');
  }
  
  if(r.gender === 'M'){
    $('[data-gender]').append('Male');
  } else {
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
  if(data.Nasya == "Yes"){
    products.push({'handle': "shatavari-ghrita"});
     mainImageUrl = 'https://cdn.shopify.com/s/files/1/0100/1622/7394/products/3_eba490d7-8e10-438a-a911-3917a4bb7177.jpg';
  	var mainImageTag = `<img id="FeaturedMedia--25101940654258" class="feature-row__image rounded-lg product-featured-media lazyautosizes lazyloaded" alt="Shatavari Ghrita"
               sizes="445px" srcset="${mainImageUrl}">`;
      let thumbImage =`<li class="result_thumbnails-item product-single__thumbnail">
                <img class="product-single__thumbnail-image" src="${mainImageUrl}" alt="Shatavari Ghrita">
              </li>`;
      $('.result-page .product-single__thumbnails').append(thumbImage);
      $('.result-combo-pr-image .product-single__media').append(mainImageTag);
     
  }

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

var prices = 0;
var variantsIDs = [];
function getProductByHandle(handle) {
var $ = jQuery;
  jQuery.getJSON('/products/'+handle+'.js', function(product) {
    

    if (handle === 'customised-diet-plan' || handle === 'prescription-from-ayurveda-doctor-and-dermatologist-included') {

    } else {
      
     if(product.title == 'Minoxidil 5% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/minoxdi-5.webp?v=1678098085`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/minoxidil-5.webp?v=1678098080`;
      }
      if(product.title == 'Hair Vitamin with DHT Blockers | Biotin and Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/mob-hair-vitamin.webp?v=1678098388`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/hair-vitamin.webp?v=1678098158`;
      }
      if(product.title == 'Hair Ras Ayurvedic Hair Herbs | 100% Natural Hair Supplement with Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/hair-ras.webp?v=1678098446`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/hair-ras-main.webp?v=1678098440`;
      }
      
      if(product.title == 'Scalp Oil with Essential Oils for Hair Growth with Bhringraj'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp-therapy-mob.png?v=1678940320`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp-therapy.png?v=1678940318`;
      }
        if(product.handle == 'scalp-oil-with-scalp-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp-therapy-mob.png?v=1678940320`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/scalp-therapy.png?v=1678940318`;
        }
        if(product.handle == 'scalp-oil-with-growth-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/growth-therapy-mob.png?v=1678940260`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/growth-therapy.png?v=1678940257`;
        }
        if(product.handle == 'scalp-oil-with-dandruff-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/dandruff-therapy-mob.png?v=1678940170`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/dandruff-therapy.png?v=1678940167`;
        }
        if(product.handle == 'scalp-oil-with-calm-therapy-booster-shots'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/calm-therpay-mob.png?v=1678940103`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/calm-therapy.png?v=1678940100`;
        }
      if(product.handle == 'digest-boost-for-improved-digestive-ability-traya-health'){
          var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Digest-food.webp?v=1678098808`;
          var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/digest_food.webp?v=1678098794`;
        }
      if(product.title == 'Health Tatva for Energy | Absorption | Immunity | Fatigue'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/tatva.webp?v=1678098851`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/health-tatva.webp?v=1678098842`;
      }
      if(product.title == 'Recap Serum For Hair Fall Control And Better Scalp Health | Contains Redensyl, Procapil And Capixyl (30 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/recapserum.webp?v=1678098892`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/recap-serum.webp?v=1678098885`;
      }
      if(product.title == 'Minoxidil 2% Hair Growth Serum for Hair Fall Control (60 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/minoxidil-2.webp?v=1678098949`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/minoxil2.webp?v=1678098962`;
      }
      if(product.title == 'Gutt Shuddhi for Better Digestion & Gut Health | In 30 Days'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/gutt--suddhi.webp?v=1678099050`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/gutt-suddhi.webp?v=1678099042`;
      }
      if(product.title == 'Traya Nasal Drops with Shatavari for Nourishing Hair Follicles'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/nasal-drop.webp?v=1678099093`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/nasal-drops.webp?v=1678099083`;
      }
      if(product.title == 'Defence shampoo | Mild Shampoo with Biotin (100 ml)'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353009.webp?v=1678099191`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/defence-shampoo.webp?v=1678099154`;
      }
      if(product.title == 'Anti-Dandruff Shampoo with Ichthammol & Aloevera | Paraben Free'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/dandruff-shampoo.webp?v=1678099427`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/anti-dandruff-shampoo.webp?v=1678099421`;
      }
      if(product.title == 'Scalp Controller | Plant Based Dandruff Treatment for Itchy Scalp'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/dandruff-therapy-mob.png?v=1678940170`
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/dandruff-therapy.png?v=1678940167`;
      }
      
      if(product.title == 'Dandruff night lotion'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/antidandruff-night-lotion.webp?v=1678099571`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/anti-dandruff-night-lotion.webp?v=1678099550`;
      }
      
// if(product.title == 'Kevon 2% Anti-fungal lotion for heavy dandruff'){
//         var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352731.jpg?v=1670602207`;
//         var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102352738.jpg?v=1670603575`;
//       }          
       if(product.title == 'Meno Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/meno-santulan.webp?v=1678099616`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/meno.webp?v=1678099605`;
      }
      if(product.title == 'Mom Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/mom-santulan.webp?v=1678099656`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/mom-santulan_da5991a4-0701-4216-82fa-a44894c10b80.webp?v=1678099666`;
      }
      if(product.title == 'PCOS Santulan'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/pcos.webp?v=1678099709`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/pcos-santulan.webp?v=1678099716`;
      }
      if(product.title == 'Thyro Santulan Tablets'){
        var resultImg = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/thyro-santulan-mob.webp?v=1678099751`;
        var resultImgdesk = `https://cdn.shopify.com/s/files/1/0100/1622/7394/files/thyro-santulan.webp?v=1678099767`;
      }
      var price = theme.Currency.formatMoney(product.price, theme.moneyFormat)
      var html = `<div class="col-md-10 pt-2 pt-md-0 result-product m-auto">
		    <div class="product-item h-100 mb-0">
					<img id="${product.handle}" src="${resultImg}" class="mx-auto d-md-none card border-0 rounded-lg shadow"><img id="${product.handle}" src="${resultImgdesk}" class="mx-auto d-none d-md-block card border-0 rounded-lg shadow">
			</div>
	</div>`;


      var title = $('[data-product-title]').append(product.title);

      $('.product-section .container > .row').append(html);

      $(".product-featured-image").append("<div class='img_wrap'><img id='"+ product.handle + "' src='"+ product.featured_image + "' /></div>");
      $('#productImg').hide();
      $('#productDescList').append("<li>"+product.title+"</li>");
      
    }
    var p = product.price, doc_fee = 100000, diet_plan= 50000, hair_coach = 50000, total__price, Percentage;
    prices = prices + p;
    total__price = ((doc_fee + diet_plan + hair_coach) + (prices));
    discount_pricetext = ((total__price-prices)/100);
    //console.log(discount_pricetext);
    //console.log(prices);
    $('.total-price').html(theme.Currency.formatMoney(prices, theme.moneyFormat));
    //$('[doc_fee]').html(theme.Currency.formatMoney(doc_fee, theme.moneyFormat));
    //$('[diet_plan]').html(theme.Currency.formatMoney(diet_plan, theme.moneyFormat));
   // $('[hair_coach]').html(theme.Currency.formatMoney(hair_coach, theme.moneyFormat));
    $('.all-total-price').html(theme.Currency.formatMoney(total__price, theme.moneyFormat));
    $('#add-to-cart-result-page-frp').attr('data-price', prices);
    Percentage = parseInt(((total__price -prices)/total__price)*100);
    $('.new-female-off-per').html('( ' + Percentage + '% OFF ' + ')');
   $('.model_discount_price').html(' You Saved ' + '₹ ' + parseInt(discount_pricetext));

    if(getCookie("GuestForm_id")){
    variantsIDs.push({
      'id': product.variants[0].id,
      'quantity': 1,
      properties: {
        '_result_id': id
      }
    });
    }else{
    variantsIDs.push({
      'id': product.variants[0].id,
      'quantity': 1
    });
    }
    
  });

}

function checkout() {
   localStorage.setItem('user__gender',user_gender);
  localStorage.setItem('caseId',caseId);
  var $ = jQuery;
  var formData = {
    'items': variantsIDs,
    sections: 'cart-drawer',
     attributes: {
        first_name: f_name,
        phone: C_number,
        email: C_email
      }
  };
  // variantsIDs.forEach(e => {
  //   e.quantity = 1;
  // });
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
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }
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
// function buyItNow() {
//   var $ = jQuery;
//   var qty =$('[name="month"]:checked').val();
//   variantsIDs.forEach(e => {
//     e.quantity = qty;
//   });
//   let formData = {
//     'items': variantsIDs
//   };
//   if(qty == 3){
//   var acturl = '/cart/checkout?discount=Result5'
//   }else{
//   var acturl = '/cart/checkout'
//   }

//   fetch('/cart/add.js', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData)
//   })
//   .then(response => {
//    //$('.site-header__cart.js-drawer-open-right').trigger('click');
//    document.location.href = acturl;
//     return response.json();
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
// }
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
      if ($(window).scrollTop() >= $('[product-section]').offset().top + $('[product-section]').outerHeight() - window.innerHeight) {
        $('[sticky__btn]').css('display', 'block');
      } else {
        $('[sticky__btn]').css('display', 'none');
      }
    });
    
    $(window).on('scroll', function() { 
    if ($(window).scrollTop() >= $('.result-fe .site-footer').offset().top - window.innerHeight) {
      $('[sticky__btn]').css('position', 'static');
    } else {
      $('[sticky__btn]').css('position', 'fixed');
    }
  });

$(document).ready(function(){
  setTimeout(function(){
    $('.result_product_slides').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      arrows: true,
      autoplaySpeed: 2000
    });
  }, 2500);
  if ($(window).width() < 768) {
      $('.result_doctor_slides').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false,
        autoplaySpeed: 2000,
      });
  }
});