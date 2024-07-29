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

if (id) {
  localStorage.setItem('user-gender', 'male');
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');
(function($){
  if (!id) {
    if(window.location.pathname == '/pages/result4-a'){
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
      $('.result.result-new').addClass('d-none');
      $('.transplant-stage-six').removeClass('d-none');
      }else{
      $('.result.result-new').removeClass('d-none');
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
    }

   // if (r.Nasya === 'Yes') {
   //    getProductByHandle('shatavari-ghrita');
   //    var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
   //  }

   //   if (r.Nasya === 'No') {
   //    getProductByHandle('shatavari-ghrita');
   //    var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
   //  }
    
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


  var prices = 0;
  var variantsIDs = [];
  function getProductByHandle(handle, adtitle) {
    jQuery.getJSON('/products/'+handle+'.js', function(product) {
      var price = parseInt(product.price/100);
      var title = $('[data-product-title]').append(product.title);
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
        $('.product-section .container > .row').append(html);
    });
  }

  function checkout() {
    localStorage.setItem('user__gender',user_gender);
    let formData = {
      'items': variantsIDs,
      sections: 'cart-drawer',
      attributes: {
        first_name: f_name,
        phone: C_number
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
        $('.Stage-1').addClass('checkStage');
      } else if (selectedStage === 'Stage-4') {
        $('.Stage-2').addClass('checkStage');

      } else if (selectedStage === 'Stage-5') {

        $('.Stage-3').addClass('checkStage');
      } else if (selectedStage === 'Stage-6') {

        $('.Stage-5').addClass('checkStage');
      } else if (selectedStage === 'Coin Size Patch') {
        $('.Stage-7').addClass('selectedStage');
        $('.Stage-1').addClass('checkStage hide-text');

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


  if(window.location.pathname == '/pages/result4-a'){
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
      if ($(window).scrollTop() >= $('.result4-a .site-footer').offset().top - window.innerHeight) {
        $('.sticky-btn').css('position', 'static');
      } 
        else {
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