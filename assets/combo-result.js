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

var id = getUrlParameter('id');

var cohort = getUrlParameter('cohort');

if (id) {
  localStorage.setItem('rid', id);
}

id = localStorage.getItem('rid');
// console.log('Id from localstorage => ', id);

if (!id) {
  alert('Your recommendation is not found. Please fill the diagnosis to help us share the recommended plan.');
  document.location.href= 'https://form.traya.health/questions?cohort=1&source=ResultPage'
}
var baseUrls = {
  DEV: 'https://api.v2dev.hav-g.in/',
  PROD: 'https://api.hav-g.in/'
}
//var baseUrl = 'https://api.v2dev.hav-g.in/';
var baseUrl = baseUrls.PROD;
var liveendpoint = 'https://api.hav-g.in/dgReport?id=';
// console.log(cohort);
if (cohort == 2) {
  liveendpoint = baseUrl + 'dgReport/v2?id=';
} else {
  liveendpoint = baseUrl + 'dgReport/v1?id=';
}

// https://api.hav-g.in/dgReport?id=

var variantsID = 0;
function displayProduct(data) {

  var r = Object.assign(data.User_Analysis, data.Recommendations);
  // console.log(r);

  $('.productt').hide();
//   if (r.Health_tatva === 'Yes') {
//     $('#healthTatva').show();
//     getProductByHandle('copy-of-traya-health-tatva-1');
//   }
//   if (r.Hair_ras === 'Yes') {
//     $('#hairRasa').show();
//     getProductByHandle('hair-fall-tablets-1');
//   }
//   if (r.Gut_shuddi === 'Yes') {
//     $('#gutShuddhi').show();
//     getProductByHandle('copy-of-traya-gut-shuddhi-1');
//   }
//   if (r.Minoxidil === 'Yes' && r.gender === 'M') {
//     getProductByHandle('traya-minoxidil-1');
//     $('#hairSerum').show();
//   }
//   if (r.Minoxidil === 'Yes' && r.gender === 'F') {
//     getProductByHandle('copy-of-traya-health-minoxidil-1');
//     $('#hairSerum').show();
//   }
//   if (r.Shampoo === 'Normal') {
//     $('#shampooDarmotology').show();
//     getProductByHandle('copy-of-traya-hair-fall-shampoo-1');
//   }
//   if (r.Shampoo === 'Anti dandruff') {
//     $('#hairAntidandruff').show();
//     getProductByHandle('copy-of-traya-ketoconazole-2-shampoo-1');
//   }
//   if (r.Hair_vitamin === 'Yes') { 
//     $('#hairVitamins').show();
//     getProductByHandle('copy-of-multivitamin-tablets-1');
//   }

//   if (r.Serum === 'Yes') {
//     $('#hairRootserum').show();
//     getProductByHandle('copy-traya-health-hair-root-serum-1');
//   }

//   if (r.Scalp_oil === 'Yes' || r.Scalp_oil === 'bergamot and ylang ylang') {
//     $('#scalpOil').show();
//     getProductByHandle('herbal-hair-oil-1');
//   }
//   if (r.Kevon === 'Yes' ) {
//   	getProductByHandle('kevon-lotion-1');
//   }
  
  if (r.stage === 'Stage-1' || r.stage === 'Stage-2' || r.stage === 'Heavy Hair Fall Across The Head'){
    getProductByHandle('hairline-defender');
    $(".product-featured-image").append("<div class='img_wrap'><img src='//cdn.shopify.com/s/files/1/0100/1622/7394/products/1-02.jpg' /></div>");
    $('[data-desc-first]').removeClass('d-none');
    $('.heavy-stage').detach();
    $('[data-code]').removeClass('d-none');
  }
  if (r.stage === 'Heavy Hair Fall Across The Head'){
    $('[data-content-first]').removeClass('d-none');
    $('[data-accordion-first]').removeClass('d-none');
  }
  if (r.stage === 'Stage-1' || r.stage === 'Stage-2'){
    $('[data-content-first1]').removeClass('d-none');
    $('[data-accordion-first1]').removeClass('d-none');
  }
  if (r.stage === 'Stage-3' || r.stage === 'Stage-4' || r.stage === 'Stage-5'){
    getProductByHandle('dht-blocker');
    $(".product-featured-image").append("<div class='img_wrap'><img src='//cdn.shopify.com/s/files/1/0100/1622/7394/files/defend-img02.jpg' /></div>");
    $('[data-desc-second]').removeClass('d-none');
    $('[data-content-second]').removeClass('d-none');
    $('[data-accordion-second]').removeClass('d-none');
    $('.heavy-stage').detach();
    $('[data-code]').detach();
  }
  if (r.stage === 'Stage-6' || r.stage === 'Coin Size Patch'){
    $('.heavy-stage').removeClass('d-none');
    $('.normal-stages').detach();
  }

}


var prices = 0;
var variantsIDs = [];
function getProductByHandle(handle) {

  jQuery.getJSON('/products/'+handle+'.js', function(product) {

    if (handle === 'customised-diet-plan' || handle === 'prescription-from-ayurveda-doctor-and-dermatologist-included') {

    } else {
      $('#productImg').hide();
      var title = product.title.replace('Combo', 'Kit');
      $('#productDescList').append(title);
    }
    var p = product.price;
    prices = prices + p;
    // console.log(prices);
    $('#price').html('₹' + JSON.stringify(prices).slice(0, -2) + '');


    
    if(product.handle == 'hairline-defender') {
		variantsIDs.push({
        'id': 37762404778162,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37770313564338,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37547237310642,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37546421289138,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      })
    } else if(product.handle == 'dht-blocker') {
		variantsIDs.push({
        'id': 37547237310642,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37997006225586,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37546421289138,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
      variantsIDs.push({
        'id': 37770313564338,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      })
    } else {
      variantsIDs.push({
        'id': product.variants[0].id,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      })
    }
    
  });

}

function checkout() {

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
    document.location.href = '/cart';
    return response.json();
  })
  .catch((error) => {
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
    //document.location.href = '/cart';
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
    success: function(){
      var t = document.querySelector('cart-drawer');
      let cart_drawer = e.sections['cart-drawer'];
      CartDrawerUpdate(t, cart_drawer, drawer=false,0);
      $('a.site-header__icon.site-header__cart').hide();
    },
    dataType: 'json'
  });

};

$(document).ready(function(){

  clearCart();

  jQuery.ajax({
    url: liveendpoint+id,
    dataType: 'json',
    headers: {
      "Authorization": "Bearer d7ef603e-71ea-44a1-93f2-2bacd08c4a90"
    }
  })
  .done(function(data){
    // console.log(data);
    displayProduct(data);

    $('[data-user-name]').text(data.User_Analysis.first_name);
    $('#name1').text(data.User_Analysis.first_name);
    $('#name3').text(data.User_Analysis.first_name);
    $('#typeOfLoss').text(data.Recommendations.Type_of_hair_loss);
    $('#stage').text(data.User_Analysis.stage);
    $('#typeOfLoss3').text(data.Recommendations.Type_of_hair_loss);
    $('#stage3').text(data.User_Analysis.stage);
    
    $('[data-stage]').text(data.User_Analysis.stage);
    
    if(data.User_Analysis.stage === 'Stage-1'){
      $('[data-stage-text]').text('Stage 2');
    }
    
    if(data.User_Analysis.stage === 'Stage-2'){
      $('[data-stage-text]').text('Stage 3');
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
      $('#female-result').show();
      $('.page-result-hero').removeClass('male');
      $('#Gender').text('Female');
    } else {
      $('#male-result').show();
      $('.page-result-hero').addClass('male');
      $('#Gender').text('Male');
    }

    var Max_months = data.Recommendations.Max_months;
    if (Max_months < 6) {

      $('#regroMonth1').text('1 MONTH');
      $('#regroMonth2').text('2-3 MONTHS');
      $('#regroMonth3').text('4-5 MONTHS');
      $('#FirstStage').removeClass('d-none');
    }

    if (Max_months === 6) {

      $('#regroMonth1').text('1 MONTH');
      $('#regroMonth2').text('2-4 MONTHS');
      $('#regroMonth3').text('5-6 MONTHS');
      $('#ThirdStage').removeClass('d-none');

    }

    if (Max_months > 6) {

      $('#regroMonth1').text('1-2 MONTHS');
      $('#regroMonth2').text('3-5 MONTHS');
      $('#regroMonth3').text('5-8 MONTHS');
      $('#FourthStage').removeClass('d-none');

    }

    var sleep = JSON.parse(data.User_Analysis.sleep) * 100;
    var energy = JSON.parse(data.User_Analysis.energy) * 100;
    var gut_health = JSON.parse(data.User_Analysis.gut_health) * 100;

    $('#gutHealth .colored').width(gut_health + '%');
    $('#sleepHealth .colored').width(sleep + '%');
    $('#energyHealth .colored').width(energy + '%');
    var r = data.Recommendations;

  });
  
  
  $('.hormon-slides').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  
});