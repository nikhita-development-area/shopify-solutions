/* Click Same Root Cause on Stage Modal Automatically when Click From Result4 Page & Added Attribute (data-targets) on Files test-result.liquid & stage-modal.liquid */
let trayaProcessingAnimation = document.getElementById('traya-processing-animation');
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".f-b-main-li");
  const anchorLinks = document.querySelectorAll(".nav-link");
  const tabLinks = document.querySelectorAll(".tab-pane");

  /* By Default, Click First Root Cause on Stage Modal */
  const clickButton = document.getElementById("learn_more");

  clickButton.addEventListener("click", function() {
    const firstFlexDiv = document.querySelector(".nav-item[style*='display: flex;']");
    if(firstFlexDiv) {
      firstFlexDiv.click();
    }
  });
  /* By Default, Click First Root Cause on Stage Modal */

  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const target = this.getAttribute("data-targets");
      triggerAction(target);
    });
  });

  function triggerAction(target) {
    anchorLinks.forEach(function (link) {
      if (link.getAttribute("data-targets") === target) {
        anchorLinks.forEach(function (link) {
          link.classList.remove("active");
        });
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    tabLinks.forEach(function (tab) {
      if (tab.getAttribute("data-targets") === target) {
        tabLinks.forEach(function (tab) {
          tab.classList.remove("active");
          tab.classList.remove("show");
        });
        tab.classList.add("active");
        tab.classList.add("show");
      } else {
        tab.classList.remove("active");
        tab.classList.remove("show");
      }
    });
  }
});
/* Click Same Root Cause on Stage Modal Automatically when Click From Result4 Page & Added Attribute (data-targets) on Files test-result.liquid & stage-modal.liquid */

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

var id = getUrlParameter('id'), f_name, C_number, C_email, user__gender, user_gender, rid, caseId;

var cohort = getUrlParameter('cohort');
var selectedStage = 'Stage-1';

if (id) {
  localStorage.setItem('user-gender', 'male');
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');
(function($){
  if (!id) {
    if(window.location.pathname == '/pages/result4'){
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
    //DEV: 'https://api.dev.hav-g.in/',
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

// liveendpoint = 'https://api.dev.hav-g.in/dgReport/v4?id=';

  
  // var stageDescription = {
  //   "Stage-1": "You’ve come to us at the right time! We can help you get that voluminous hair back.",
  //   "Stage-2": "Your hair loss has just started but you’re right in time to re-grow. See best results in x months.",
  //   "Stage-3": "Your hair loss is significant but we can help you regrow. You will see visible difference on the top of your head in x months.",
  //   "Stage-4": "Hair loss at this stage is manageable, start immediately and see best results in x months.",
  //   "Stage-5": "At this stage we cannot guarantee hair regrowth but can stop further hair loss. Use at least for x months for best results.",
  //   "Stage-6": "At this stage we cannot guarantee hair regrowth but can stop further hair loss.",
  //   "Heavy Hair Fall Across The Head": "Your hair fall is 100% reversible. All we have to do is treat the root cause. Best results in x months.",
  //   "Coin Size Patches": "You have alopecia areata. It’s quite difficult to treat this type of hair loss."
  // };

  // var selectedStage = 'Stage-1';


  var variantsID = 0;
  function displayProduct(data) {
 // console.log('data>>', data);
    var r = Object.assign(data.User_Analysis, data.Recommendations);
    f_name = r.first_name;
    C_number = r.phone;
    C_email = r.email;
    user__gender = r.gender;
    setCookie('user_phone', C_number, 30)
    caseId= r.case_id;
    localStorage.setItem('caseId', caseId);
    if(user__gender == 'M') {
      user_gender = 'Male';
    }
    var coin_size = false;
    if(data.User_Analysis.stage == 'Coin Size Patch') {
      coin_size = true;
    }
     // console.log('r>>', r);
    if(r.gender == 'M' && r.stage == "Stage-1"){
      $('.other-m-stage-1').remove();
      $('.gender-m-stage-1').show();
      $('.stage1_pro_title_hide').hide();
      $('.m-stage-1-Pro_title').show();
      $('.root_impacting_stage1').addClass("root_impacting_stage1_show");
      $('.product-section-list').addClass("STtage1");
        $('.stage1_hairgrowth').text("Customised hair plan");
        $('.satge1_doctor').text("Doctor prescription");
        $('.stage1_coach').text("Hair Coach");
       $('.stageDescription_text').addClass("satge1_stageDescription_text");
      $('.result4.cust_reviews').addClass("cust_reviews_hide");
      $('.stage_1_testimonial').addClass("stage_1_testimonial_show");
      $('.issue_hair_goal').addClass("stage-diagnosed_hairgaol_stage1");
      $('.stage1_Text').addClass("stage-1_hair_issues");
      $('.user_type_stage').addClass("user_type_stage1");
      $('.diagnosed_text').addClass("user_type_stage1");
      $('.m-stage-1-title').text("’s customised hair plan");
      $('.root-cause-text').addClass("new_root");
       $('.root-cause-text.root-cause-text-desk.new_root img').attr('src', 'https://cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353161_1.webp?v=1688646677');
      $('.root_only_img').addClass("mob_root_only_img");
      //$('.root-cause-text').text("Root causes impacting your hair");
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
      getProductByHandle('herbal-tablets', '', coin_size);
      var Desc = 'Ayurvedic herbs to boost absorption of nutrients for improved energy and hair health';
    }

    if (r.Gut_shuddi === 'Yes') {
      $('#gutShuddhi').show();
      getProductByHandle('avipattikar-digestion-tablets', '', coin_size);
      var Desc = 'Ayurvedic herbs for improved digestion, gut health and hair';
    }
    if (r.Minoxidil === 'Yes' && r.gender === 'M') {
      getProductByHandle('traya-minoxidil-5', '', coin_size);
      $('#hairSerum').show();
      var Desc = 'Minoxidil 5% for male androgenic alopecia hair loss and hair growth';
    }
    if (r.Minoxidil === 'Yes' && r.gender === 'F') {
      getProductByHandle('minoxidil-2', '', coin_size);
      $('#hairSerum').show();
      var Desc = 'Minoxidil 2% treatment for female androgenic alopecia hair loss and hair growth';
    }
    if (r.Shampoo === 'Normal') {
      $('#shampooDarmotology').show();
      getProductByHandle('shampoo', '', coin_size);
      var Desc = 'Chemical-free hair and scalp cleanser shampoo';
    }
    if (r.Shampoo === 'Anti dandruff') {
      $('#hairAntidandruff').show();
      getProductByHandle('anti-dandruff-shampoo', '', coin_size);
      var Desc = 'Made with antifungal ingredients for getting rid of dandruff of all types';
    }
    if (r.Hair_vitamin === 'Yes') { 
      $('#hairVitamins').show();
      getProductByHandle('hair-vitamins', '', coin_size);
      var Desc = '100% Vegetarian supplements for hair to combat vitamin deficiency related hair loss';
    }

    if ((r.Serum === 'Yes') && (r.RCP === 'No')) {
      $('#hairRootserum').show();
      getProductByHandle('recap-serum-for-hair-fall-control', '', coin_size);
      var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
    } 

    if (r.RCP === 'Yes') {
      $('#hairRootserum').show();
      getProductByHandle('recap-serum-for-hair-fall-control', '', coin_size);
      var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
    }

    if (r.Hair_ras === 'Yes') {
      getProductByHandle('hair-growth-herbs', '', coin_size);
      var Desc = 'Better hair quality & delayed greying with herbs like shatavari and bhringraj';
    }

    if (r.Scalp_oil === 'Yes' || r.Scalp_oil === 'bergamot and ylang ylang') {
      var boosterOil = '';
      if (r.Calm_Therapy_Booster_Oil === 'Yes'){
        boosterOil = ' + Calm Therapy Booster Oil';
        getProductByHandle('scalp-oil-with-calm-therapy-booster-shots', boosterOil, coin_size);
      }else if (r.Dandruff_Therapy_Booster_Oil === 'Yes'){
        boosterOil = ' + Dandruff Therapy Booster Oil';
        getProductByHandle('scalp-oil-with-dandruff-therapy-booster-shots', boosterOil, coin_size);
      }else if (r.Growth_Therapy_Booster_Oil === 'Yes'){
        boosterOil = ' + Growth Therapy Booster Oil';
        getProductByHandle('scalp-oil-with-growth-therapy-booster-shots', boosterOil, coin_size);
      }else if (r.Scalp_Therapy_Booster_Oil === 'Yes'){
        boosterOil = ' + Scalp Therapy Booster Oil';
        getProductByHandle('scalp-oil-with-scalp-therapy-booster-shots', boosterOil, coin_size);
      }else{
        getProductByHandle('scalp-oil-with-growth-therapy-booster-shots', boosterOil, coin_size); 
      }
      $('#scalpOil').show();

      var Desc = 'Herbal hair oil with essential oils, customised based on scalp and hair type';
    }

    if (r.Kevon === 'Yes') {
      $('#hairRootserum').show();
      getProductByHandle('ketoconazole-2-night-lotion', '', coin_size);
      var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';

     // getProductByHandle('kevon-lotion-1', '', coin_size);
     //  var Desc = 'Patented hair growth serum with redensyl, biotin and caffeine';
    }

    if (r.Nasya === 'Yes') {
      getProductByHandle('shatavari-ghrita', '', coin_size);
      var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
    }

    //  if (r.Nasya === 'No') {
    //   getProductByHandle('shatavari-ghrita', '', coin_size);
    //   var Desc = 'Ayurvedic nasal drops for nourishing hair follicles and reducing sleep-related hair loss';
    // }
    
    if (r.Digest_Boost === 'Yes') {
      getProductByHandle('digest-boost-for-improved-digestive-ability-traya-health', '', coin_size);
      var Desc = 'A herbal, all-natural formulation with saunf and jeera for relieving digestive problems.';
    }

    if(r.gender === 'M'){
      $('[data-gender]').append('Male');
    } else {
      document.location.href= '/pages/female-result?id=' + id;
      $('[data-gender]').append('Female');
    }

  }


  var prices = 0, doc__fee = 100000, diet__plan = 50000, hair__coach_fee = 50000, month1_total, month1DiscountPrice, month3DiscountPrice, month6DiscountPrice;
var variantsIDs = [];
  function getProductByHandle(handle, adtitle, coin_size) {
    jQuery.getJSON('/products/'+handle+'.js', function(product) {
      var price = parseInt(product.price/100);
      var title = $('[data-product-title]').append(product.title);
      var p = product.price, final_price;
      prices = prices + p;
      final_price = (prices/100);
      discount_price = (final_price+2000);
      discount_pricetext = (discount_price-final_price);
     //console.log(discount_pricetext);
    //console.log(discount_price);
     var discount_per = parseInt((discount_pricetext / discount_price)*100);
      // console.log(discount_per);
      $('.per__off').html('(' + discount_per + '% OFF' + ')');
      $('#price').html('₹' + JSON.stringify(final_price).slice(0, -2) + '');
      //     Change total price here
      $('.all-total-price').html('₹ ' + parseInt(final_price+2000));
      $('.total-price').html('₹ ' + parseInt(final_price));
      $('.top_total-price').html('₹ ' + parseInt(final_price));
      $('.model_discount_price').html('You Saved ' + '₹ ' + parseInt(discount_pricetext));
      
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
      if(coin_size == true) {
        var coin_sizes = document.querySelectorAll('.product-section .container > .row .toChange');
        if(coin_sizes.length != 0) {
          coin_sizes.forEach((coin) => {
            coin.innerHTML = 'Hair Health';
          })
        }
      }
    });
  }

  function checkout() {
    localStorage.setItem('user__gender',user_gender);
    localStorage.setItem('caseId',caseId);
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
      if(e.id===37681124081842){
        // console.log("37547237310642");
        e.properties = {'Plan': 'Dandruff'};
      }else if(e.id===42648509186226){
        // console.log("42648509186226");
        e.properties = {'Plan': 'Dandruff'};
      }else if(e.id===41899898011826){
        // console.log("41899898011826");
        e.properties = {'Plan': 'Dandruff'};
      }
      else {
        e.properties = {'Plan': 'Auto'};
      }
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
       document.body.style.overflow = 'hidden';
    // console.log(liveendpoint);
    clearCart();
    jQuery.ajax({
      url: liveendpoint+id,
      dataType: 'json',
      headers: token
    })
    .done(function(data){
       // console.log(data);
      displayProduct(data);
       if (trayaProcessingAnimation) {
      trayaProcessingAnimation.style.display = 'none';
    }
     document.body.style.overflow = 'unset';
   

 var month_x = data.User_Analysis.Max_months;
       // console.log("monrth>> ", month_x);

 var stageDescription = {
    "Stage-1": "We will ensure your hair thickens and the hair line remains intact.",
    "Stage-2": "Your hair loss has just started but you’re right in time to re-grow. See best results in " + month_x + " months.",
    "Stage-3": "Your hair loss is significant but we can help you regrow. You will see visible difference on the top of your head in " + month_x + " months.",
    "Stage-4": "Hair loss at this stage is manageable, start immediately and see best results in " + month_x +  " months.",
    "Stage-5": "At this stage we cannot guarantee hair regrowth but can stop further hair loss. Use at least for " + month_x + " months for best results.",
    "Stage-6": "At this stage we cannot guarantee hair regrowth but can stop further hair loss.",
    "Heavy Hair Fall Across The Head": "Your hair fall can be brought under control. All we have to do is treat the root cause. Best results in " + month_x + " months.",
    "Heavy Hair Fall": "Your hair fall can be brought under control. All we have to do is treat the root cause. Best results in " + month_x + " months.",
    "Coin Size Patches": "You have alopecia areata. It’s quite difficult to treat this type of hair loss."
  };

      var illness = data.User_Analysis.experienced_in_one_year,
      genetics = data.User_Analysis.Genetic,
      userStage = data.User_Analysis.stage;
      if(illness.length != 0) {
        var TECondition = illness.filter((ill) => {
          if(ill == 'Severe Illness (Dengue, Malaria, Typhoid or Covid)') {
            return ill;
          }
        })
        if(TECondition.length == 1 && (genetics == 'Yes' || genetics == 'No') && (userStage == 'Heavy Hair Fall Across The Head' || userStage == 'Heavy Hair Fall')) {
          $('#typeOfLoss').text('Telogen Effluvium');
          $('#stage').text(data.User_Analysis.stage);
        }else if(TECondition.length == 0 && genetics == 'Yes' && (userStage == 'Heavy Hair Fall Across The Head' || userStage == 'Heavy Hair Fall')) {
          $('#typeOfLoss').text('Male pattern hair loss');
        }else if(TECondition.length == 0 && genetics == 'No' && (userStage == 'Heavy Hair Fall Across The Head' || userStage == 'Heavy Hair Fall')) {
          $('#typeOfLoss').text('Telogen Effluvium');
          $('#stage').text(data.User_Analysis.stage);
        }else {
          $('#typeOfLoss').text(data.User_Analysis.Type_of_hair_loss);
        }
      }

      /* Coin Size Changes */
      if(userStage == 'Coin Size Patch') {
        $('#coin-main-title').text("'s Treatment Plan");
        $('#coin-plan-title').text('Your Hair Treatment plan');        
        $('.cust_reviews').hide();
      }
      /* Coin Size Changes */

      /* Stage2 and Stage3 Changes */
      // var maxMonth = data.Recommendations.Max_months;
      // $('.custom-essential').hide();
      // $('.stage-faq').hide();
      // $('.soial_review').hide();
      // $('.cstm-doctors-stage-2-3').hide();
      // $('.root_cause__text').text('Top Root Causes');
      // if(userStage == 'Stage-2' || userStage == 'Stage-3') {
      //   $('body').addClass('cstm-stage-2-3'); 
      //   $('.otherstage_causes').hide();
      //   $('.dashline').show();
      //   var { primaryRootCause, defaultRootCause } = data.root_causes;
      //   primaryRootCause.forEach((cause) => {
      //     let causeName = cause.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      //     let primary__root = document.querySelector('[primary-root]');
      //     if(primary__root) {
      //       primary__root.innerHTML = `${cause.title}`;
      //     }
      //     let info = document.querySelector(`.RootCause .tooltiptext[${causeName}]`);
      //     if(info) { info.style.display = 'block' }
      //     let causes = document.querySelector(`.primary_root_img .range-slider.mainFactImages[${causeName}]`);
      //     if(causes) {
      //       causes.style.display = 'block';
      //       causes.querySelector('input').setAttribute('value', cause.progressPercentage);
      //       applyFill(causes.querySelector('input'))
      //     }
      //   });
      //   defaultRootCause.forEach((cause) => {
      //     let causeName = cause.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      //     let causes = document.querySelector(`.root_cause_container .range-slider.mainFactImages[${causeName}]`);
      //     if(causes) {
      //       causes.style.display = 'block';
      //       causes.querySelector('input').setAttribute('value', cause.progressPercentage);
      //       applyFill(causes.querySelector('input'))
      //     }
      //   });
      //   $('.cust_reviews').hide();
      //   $('.our-experts').hide();
      //   $('.cstm-user-stage2-3').show();
      //   $('.cstm-diagonosed-stage-2-3').show();
      //   $('.stage-journey').show();
      //   $('.stage-money-back').show();
      //   $('.stage-treat').show();
      //   $('.stage-faq').show();
      //   $('.soial_review').show();
      //   $('.stage-scientific').show(); 
      //   $('.cstm-doctors-stage-2-3').show();
      //   $('.cstm-prd-title-stage-2-3').text('What will be in my plan ?');

      //   if(maxMonth == 5) {
      //     $('.month-first').text('Month 1-2');
      //     $('.month-second').text('Month 3-4');
      //     $('.month-third').text('Month 5-6');
      //   } else if(maxMonth == 8) {
      //       $('.month-first').text('Month 1-3');
      //       $('.month-second').text('Month 4-5');
      //       $('.month-third').text('Month 6-8');         
      //   } else {
      //       $('.month-first').text('Month 1-3');
      //       $('.month-second').text('Month 4-6');
      //       $('.month-third').text('Month 7-12');  
      //   }
      // }

      // if(userStage == 'Stage-2') {
      //   $('#cstm-text-stage-2-3').text('Stage-2'); 
      //   $('.cstm-plan-title-stage-2-3').text("’s customised treatment plan");   
      //   $('.cstm-kit-stage-2-3').text('Hair Transformation Kit'); 
      //   $('.content-third').html('Healthy scalp and reduce <br> hair thinning');
      //   $('.journey_para').text('A glimpse of your hair transformation journey');
      //   $('[cstm-stories-stage-2]').show();
      //   $('.img-stage-2').show();
      //   $('.stage2-Description').show();
      //   $('#cstm-maxmonth-stage2').text(maxMonth);
      // }
      
      // if(userStage == 'Stage-3') {
      //   $('#cstm-text-stage-2-3').text('Stage-3'); 
      //   $('.cstm-plan-title-stage-2-3').text("’s hair regrowth treatment plan"); 
      //   $('.cstm-kit-stage-2-3').text('Your hair growth kit');
      //   $('.content-third').html('Grow new and healthy <br> set of baby hair.');
      //   $('.journey_para').text('A glimpse of your hair growth journey');
      //   $('[cstm-stories-stage-3]').show();
      //   $('.img-stage-3').show();
      //   $('.stage3-Description').show();
      //   $('#cstm-maxmonth-stage3').text(maxMonth);
      // }
      /* Stage2 and Stage3 Changes */
      
      $('[data-user-name]').text(data.User_Analysis.first_name);
      $('#name1').text(data.User_Analysis.first_name);
      $('#name3').text(data.User_Analysis.first_name);
      // $('#stage').text(data.User_Analysis.stage);
      $('#stage1').text(data.User_Analysis.stage);
      $('#typeOfLoss3').text(data.Recommendations.Type_of_hair_loss);
      $('#stage3').text(data.User_Analysis.stage);

      $('#stageDescription').text(stageDescription[data.User_Analysis.stage]);

      selectedStage = data.User_Analysis.stage;

      $('.' + selectedStage).addClass('selectedStage');

      if (selectedStage === 'Stage-1') {
        
         $('.Stage-1').addClass('all-stages');
         $('.main-stage-section').addClass('all-stages-pd');
      } else if (selectedStage === 'Stage-1') {
      } else if (selectedStage === 'Stage-2') {
           $('#stage').text('Stage-2');
        $('.Stage-2-1').addClass('checkStage');
      } else if (selectedStage === 'Stage-3') {
        $('.Stage-3-1').addClass('checkStage');
        $('#stage').text('Stage-3');
        
      } else if (selectedStage === 'Stage-4') {
        $('.Stage-4-1').addClass('checkStage');
           $('#stage').text('Stage-4');

      } else if (selectedStage === 'Stage-5') {
        $('#stage').text('Stage-5');
        $('.Stage-5-1').addClass('checkStage');
      } else if (selectedStage === 'Stage-6') {

        $('.Stage-5').addClass('checkStage');
      } else if (selectedStage === 'Coin Size Patch') {
        $('.Stage-7').addClass('selectedStage');
        //$('.Stage-1').addClass('checkStage hide-text');

      } else if (selectedStage === 'Heavy Hair Fall Across The Head' || selectedStage === "Heavy Hair Fall") {
        $('#male-stages').addClass('male-stagesTE');
        $('.TE_stage-name').show();
        $('#stageDescription').addClass('stageDescriptionTE');
        $('.Stage-8').addClass('selectedStage');
        $('.Stage-8-1').addClass('checkStage hide-text');
      }

      $('.diagnoses-result > img').hide();

      $('#ourdia li').hide();
      var type = data.Recommendations.Type;
      var Genetic = data.Recommendations.Genetic;
      var User_Analysis = data.User_Analysis;
      var Recommendations = data.Recommendations;
      var hair_goals = data.hair_goals;
      var stageTE = data.User_Analysis.stage;
      var experienced_one_year = data.User_Analysis.experienced_in_one_year;

      
$(document).ready(function() {

if (stageTE == "Stage-1"){

//var texts = $(".diagnosed_text_stage1"); 

 var texts = data.hair_goals; //Select all elements with class "text"
  // console.log("texts",texts);
  var newText = ""; // Initialize the new text string

    hair_goals[hair_goals.indexOf('Regrow hair')] = 'regrowth of hair wherever possible';
    hair_goals[hair_goals.indexOf('Control hair fall')] = 'reduction of hair fall';
    hair_goals[hair_goals.indexOf('I have a good set of hair, I want to maintain it.')] = 'maintenance of hair line';
    hair_goals[hair_goals.indexOf('Work on hair quality')] = 'better hair quality';
    hair_goals[hair_goals.indexOf('Delay greying')] = 'delay hair greying';
      
 for (var i = 0; i < texts.length; i++) {
    newText += hair_goals[i]; 
   // Append the current text
    
   if (i < texts.length - 2) {
     newText += ", "; // Add a comma if it's not the second-to-last text
   } else if (i === texts.length - 2) {
      newText += " and "; // Add "and" if it's the second-to-last text
    }
     
   }

  
 // console.log("new",newText);
   $(".male_result_commas").css('display','block');
  $(".hair_golsmal").text(newText);// Set the modified text to the container element


// var hair_goals = data.hair_goals;

//   hair_goals[hair_goals.indexOf('Regrow hair')] = 'regrow hair wherever possible';
//  hair_goals[hair_goals.indexOf('Control hair fall')] = 'controlling hairfall';
//    // hair_goals[hair_goals.indexOf('I have a good set of hair')] = 'maintenance of hair line';
//     hair_goals[hair_goals.indexOf('I have a good set of hair, I want to maintain it.')] = 'maintenance of hair line';
//     hair_goals[hair_goals.indexOf('Work on hair quality')] = 'better hair quality';
//    hair_goals[hair_goals.indexOf('Delay greying')] = 'delay hair greying';
   
  
   
// var hairgoalString = "";
// for (var i = 0; i < hair_goals.length; i++)  {
  
//  // var hair_goals_list = hair_goals[i];
//  // hairgoalString += hair_goals_list.text();

  
//    console.log("newText",hairgoalString);
//   if (i < hair_goals.length - 1) {
//  //      newText += ", "; 
//    hairgoalString += hair_goals[i] + ", ";
//   }
//   else if (i === hair_goals.length - 1) {
//    //  newText += " and "; // Add "and" if it's the second-to-last text
//     hairgoalString += hair_goals[i] + ". ";
//    }
// }
//    $(".male_result_commas").css('display','block');
//   $(".hair_golsmal").text(hairgoalString);
// //alert(hairgoalString);



  
 }
  
  }); 
  

 if (stageTE == "Heavy Hair Fall Across The Head" || stageTE == "Heavy Hair Fall"){
      
         for(var i=0; i < experienced_one_year.length; i++){
    //console.log("experienced_one_year", experienced_one_year[i]);
           
           let experienced_one = experienced_one_year[i];
//console.log("experienced_one", experienced_one);
           
        if (experienced_one == "Severe Illness (Dengue, Malaria, Typhoid or Covid)"){
      $('#illness, #nav-illness-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
         // console.log("illness");
        } 

             if (experienced_one == "Heavy weight loss / heavy weight gain"){
      $('#weight-change, #nav-weight-change-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
          //console.log("weight-change");
             }

           if (experienced_one == "Surgery / heavy medication"){
      $('#surgery, #nav-Surgery-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
          //console.log("surgery");
             }
           
        } 
    }
     

          let count=0;
      if (stageTE == "Heavy Hair Fall Across The Head" || stageTE == "Heavy Hair Fall"){
      
         for(var i=0; i < experienced_one_year.length; i++){
    //console.log("experienced_one_year", experienced_one_year[i]);
           
           let experienced_one = experienced_one_year[i];
//console.log("experienced_one", experienced_one);
           
        if (experienced_one == "Severe Illness (Dengue, Malaria, Typhoid or Covid)" && count<4){
      $('#illness, #nav-illness-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
         // console.log("illness");
           count++;
        } 

             if (experienced_one == "Heavy weight loss / heavy weight gain" && count<4){
      $('#weight-change, #nav-weight-change-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
                count++;
          //console.log("weight-change");
             }

           if (experienced_one == "Surgery / heavy medication" && count<4){
      $('#surgery, #nav-Surgery-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
              count++;
          //console.log("surgery");
             }
           
        } 
    }

      if (User_Analysis.dandruff_response == "No"){
          $('#dandruff, #nav-dandruff-tab').css('display','done'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
          // console.log("count 649",count);
      }else{
      $('#dandruff, #nav-dandruff-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
          // console.log("count 652",count);
          count++;
          // console.log("count 654",count);
      }
      
      if ((type == 1 || type==2 ) && Genetic == "Yes"){
        $('#genetics, #nav-genetics-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js

        count++;
      } 
      if (JSON.parse(User_Analysis.stress) <1  && count<4){
        $('#stress, #nav-stress-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;
      }
      if (JSON.parse(User_Analysis.sleep) <1  && count<4){
        $('#sleepissues, #nav-sleep-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;
      }
      
     
      if (JSON.parse(User_Analysis.gut_health) <1  && count<4){
        $('#digestion, #nav-digestion-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;
      }
      if (Recommendations.Deficiency == "Yes"  && count<4){
        $('#deficiency, #nav-deficiency-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;
      }
      if (Recommendations.Dieting == "Yes" && count<4){
        $('#weightloss, #nav-weight-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;

      }
      if (count<4){
        $('#nutrition, #nav-nutrition-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js
        count++;

      }
      if (count<4){
        $('#lifestyle, #nav-lifestyle-tab').css('display','flex'); // Display Those Root Cause on Stage Modal Who Are Present In Result4 Page & Added id with Comma on result4.js 
        count++;
      }

      /* Coin Size Changes */
      if(User_Analysis.stage == "Coin Size Patch"){
        if (type === 5) {
          $('ul#ourdia li').hide();
          $('.nav-item').hide();
          $('#malfunction, #nav-malfunction-tab').css('display','flex');
        }
      }
      /* Coin Size Changes */

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
          autoplay: false,
          autoplaySpeed: 2000,
          arrows: false,
          dots:true
        });
      },1500);
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


  if(window.location.pathname == '/pages/result4'){
    // Sticky Add to cart Button

     $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $('.product-section-list').offset().top + $('.product-section-list').outerHeight() - window.innerHeight) {
        $('.sticky-btn').css('display', 'block');
        $('.sticky-btn .result4_sticky_total').css('display', 'flex');
      } else {
        $('.sticky-btn').css('display', 'none');
         $('.sticky-btn .result4_sticky_total').css('display', 'none');
      }
    });

    $(window).on('scroll', function() { 
      if ($(window).scrollTop() >= ($('.result4 .site-footer').offset().top + 200) - window.innerHeight) {
        $('.sticky-btn').css('position', 'static');
      } else {
        $('.sticky-btn').css('position', 'fixed');
      }
    });
  }

$(document).ready(function(){

// setTimeout(function(){
//       $('.slick-products').slick({
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         responsive: [
//           {
//             breakpoint: 600,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2
//             }
//           },
//           {
//             breakpoint: 320,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//             }
//           }
//         ]
//       });
//     }, 1500);

  
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
const settings = {
  fill: "#99AF38",
  background: "#fff"
};

function applyFill(slider) {
  const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${
    settings.background
  } ${percentage + 0.1}%)`;
  console.log('bg', bg)
  slider.style.background = bg;
}