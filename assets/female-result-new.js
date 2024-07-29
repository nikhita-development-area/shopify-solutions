let trayaProcessingAnimation = document.getElementById('traya-processing-animation');
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};
var id = getUrlParameter('id'), f_name, C_number, C_email, user__gender, user_gender, caseId, pdPrice = 0;;
var cohort = getUrlParameter('cohort'), factors = [];
if(id) {
  localStorage.setItem('user-gender', 'female');
  localStorage.setItem('rid', id);
}
id = localStorage.getItem('rid');
if(id == undefined) {
  id = getCookie('syntheticId');
}
(function() {
  if(!id) {
    if(window.location.pathname == '/pages/result4'){
      alert('Your recommendation is not found. Please fill the diagnosis to help us share the recommended plan.');
      document.location.href= 'https://form.traya.health/questions?cohort=1&source=ResultPage'
    }
  }else
    setotherCookie('syntheticId', id, 30, '.traya.health');
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
    var liveendpoint = 'https://api.hav-g.in/dgReport/female?id=';
    // if (cohort == 2) {
    //   liveendpoint = baseUrl + 'dgReport/v2?id=';
    // } else {
    //   liveendpoint = baseUrl + 'dgReport/v1?id=';
    // }
    liveendpoint = `${baseUrl}dgReport/female?id=`
    getFemaleResult(liveendpoint, id, token);
})();

function getFemaleResult(liveendpoint, id, token) {
  document.body.style.overflow = 'hidden';
  fetch(`${liveendpoint}${id}`, {
    headers: token
  }).then((response) => {
    return response.json();
  }).then((response) => {
    showContent(response);
    rootCause(response?.root_causes);
  }).catch((error) => {
    console.error('Network Error: ', error);
  }).finally(() => {
    otherSliders();
    document.body.style.overflow = 'unset';
  });
}

function rootCause (response) {
  const primaryRootCause = response?.primaryRootCause ?? [];
  const defaultRootCause = response?.defaultRootCause ?? [];
  let primaryRootCauseHtml = '';
  let primaryRootCauseContentHtml = '';
  if (primaryRootCause.length > 0) {
    primaryRootCauseHtml = `<li class="rootCause-nav-item" role="presentation">
      <a class="rootCause-nav-link border active text-center" id="${primaryRootCause[0]?.title.replace(/ /g, "-")}-tab" data-toggle="tab" href="#${primaryRootCause[0]?.title.replace(/ /g, "-")}" role="tab" aria-controls="${primaryRootCause[0]?.title.replace(/ /g, "-")}" aria-selected="true">
        <div class="rootCauseLinkImg">
          <img src="${primaryRootCause[0]?.details?.icon}" />
        </div>
        <p class="mt-2">${primaryRootCause[0]?.title}</p>
      </a>
    </li>`;
  }
  if (primaryRootCause.length > 0) {
    primaryRootCauseContentHtml = `<div class="tab-pane fade show active" id="${primaryRootCause[0]?.title.replace(/ /g, "-")}" role="tabpanel" aria-labelledby="${primaryRootCause[0]?.title.replace(/ /g, "-")}-tab">
      <p class="m-0">${primaryRootCause[0]?.details?.description?.english}</p>
    </div>`;
  }
  const defaultRootCauseHtml = defaultRootCause.map((item) => {
    return `<li class="rootCause-nav-item" role="presentation">
      <a class="rootCause-nav-link border text-center" id="${item?.title.replace(/ /g, "-")}-tab" data-toggle="tab" href="#${item?.title.replace(/ /g, "-")}" role="tab" aria-controls="${item?.title.replace(/ /g, "-")}" aria-selected="false">
        <div class="rootCauseLinkImg">
          <img src="${item?.details?.icon}" />
        </div>
        <p class="mt-2">${item?.title}</p>
      </a>
    </li>`;
  }).join('');
  const defaultRootCauseContentHtml = defaultRootCause.map((item) => {
    return `<div class="tab-pane fade" id="${item?.title.replace(/ /g, "-")}" role="tabpanel" aria-labelledby="${item?.title.replace(/ /g, "-")}-tab">
      <p class="m-0">${item?.details?.description?.english}</p></div>`;
  }).join('');
  const rootCauseHtml = `<ul class="nav rootCause-nav-tabs border-0" id="myTab" role="tablist">${primaryRootCauseHtml}${defaultRootCauseHtml}</ul>
  <div class="tab-content rootCauseTabContent p-2 p-md-3 mt-3" id="myTabContent">${primaryRootCauseContentHtml}${defaultRootCauseContentHtml}</div>`;
  const rootCauseSectionWrapper = document.getElementById('rootCouseSectionWrapper');
  if (rootCauseSectionWrapper) {
    rootCauseSectionWrapper.innerHTML = rootCauseHtml;
  }
}

function showContent(response) {
  var normalPage = document.querySelectorAll('[page_type="normal"]');
  var cuticlePage = document.querySelectorAll('[page_type="cuticle"]');
  var isCuticle = response.User_Analysis.cuticleResultPage;
  var { User_Analysis, Recommendations, stageTransition, assessmentReport } = response;
  var RootCauses = response.root_causes.primaryRootCause[0];
  var User_Analysis_hair_fall =  User_Analysis.hair_fall_stage;
  if(RootCauses.title === 'PCOS') {
    document.querySelector('.pcos_causing_main').style.display = 'block';
  }else {
    document.querySelector('.pcos_causing_main').style.display = 'none';
  }
  var tillImage = document.querySelector(".tillImage img"), toImage = document.querySelector(".toImage img"),
    assist_report = document.querySelector(".assist_report strong"), mobileDescription = document.querySelector(".mobileDescription"),
     desktopDescription = document.querySelector(".desktopDescription");
  if(tillImage) tillImage.setAttribute("src", stageTransition.current);
  if(toImage) toImage.setAttribute("src", stageTransition.getYouHere);
  if(User_Analysis_hair_fall.toLowerCase() === "coin size patches") {
    var toImageParent = document.querySelector(".toImage"), arrowImage = document.querySelector(".stageWise-img .arrow"), stageWiseimg = document.querySelector(".stageWise-img");
    if(toImageParent) toImageParent.classList.add("d-none");
    if(arrowImage) arrowImage.classList.add("d-none");
    if(stageWiseimg) stageWiseimg.classList.add("justify-content-center");
  }
  if(assist_report) assist_report.innerHTML = User_Analysis_hair_fall;
  if(mobileDescription) mobileDescription.innerHTML = User_Analysis_hair_fall.toLowerCase() === "coin size patches" ? "While alopecia areata cannot be cured, we offer a kit to help maintain your hair. Results may be limited due to the advanced stage of female hair loss, but we are here to support you." :assessmentReport?.assessmentReport;
  if(desktopDescription) desktopDescription.innerHTML = User_Analysis_hair_fall.toLowerCase() === "coin size patches" ? "While alopecia areata cannot be cured, we offer a kit to help maintain your hair. Results may be limited due to the advanced stage of female hair loss, but we are here to support you." :assessmentReport?.assessmentReport;
  if (User_Analysis_hair_fall == "No widening" || User_Analysis_hair_fall == "Starting to see widening") {
    let product_card_head = document.querySelectorAll(".product-section_heading-kit");
    product_card_head.forEach((e) => {
      if (window.innerWidth < 768) {
        e.innerHTML = "Your Customised <br> Hair Treatment Kit";
      } else {
        e.textContent = "Your Customised Hair Treatment Kit";
      }
    });
  }
  
  f_name = User_Analysis.first_name; 
  C_number = User_Analysis.phone; 
  setCookie('user_phone', C_number, 30)
  C_email = User_Analysis.email;
  user__gender = User_Analysis.gender;
  caseId = User_Analysis.case_id;
  localStorage.setItem('caseId', caseId);
  if(user__gender == 'F') {
    user_gender = 'Female';
  }
  if(isCuticle == 'Yes'){
    normalPage.forEach((page) => {
      page.classList.add('d-none');
    });
    cuticlePage.forEach((page) => {
      page.classList.remove('d-none');
    });
    let username = document.querySelector('.cuticle-banner [username]');
    if(username) {
      username.textContent = f_name;
    }
    var hair_concerns = User_Analysis.hair_concerns, hair_chemical_treatment = User_Analysis.hair_chemical_treatment,
    hair_colouring = User_Analysis.hair_colouring, type_of_hair_colouring = User_Analysis.type_of_hair_colouring,
    hair_styling = User_Analysis.hair_styling, hair_type = User_Analysis.hair_type;
    var hair_concernText = '', cuticle_causes = document.querySelector('[cuticle_causes]'),
    cuticle_reasons = document.querySelector('[cuticle_reasons]'), reasons = `environmental factors`,
    chemical_treatment = false, hair_stylying_status = false, _hair_type = document.querySelector('[hair_type]');
    if(hair_concerns.length == 1) {
      hair_concernText = hair_concerns[0];
    }else {
      hair_concerns.forEach((concern, index) => {
        if(concern == 'Dryness') {
          concern = 'Dry';
        }else if(concern == 'Dullness') {
          concern = 'Dull';
        }else if(concern == 'Split ends') {
          concern = 'Split ends'
        }else if(concern == 'Frizziness') {
          concern = 'Frizzy hair';
        }else if(concern == 'Tangles easily') {
          concern = 'Tangling';
        }else if(concern == 'Hair Breakage') {
          concern = 'Hair Breakage';
        }else {
          concern = concern
        }
        if(index === hair_concerns.length-1) {
          hair_concernText = hair_concernText + " and " + concern;
        }else if(index === hair_concerns.length-2) {
          hair_concernText = hair_concernText + concern;
        }else {
          hair_concernText = hair_concernText + concern +', ';
        }
      });
    }
    if(cuticle_causes) {
      cuticle_causes.textContent = hair_concernText;
    }
    if(_hair_type) {
      _hair_type.textContent = hair_type;
    }
    var hair_chemical_treatment_status = hair_chemical_treatment.filter((el) => {
      if(el == 'None') {
        return el;
      }
    });
    var naturalColouring = type_of_hair_colouring ? type_of_hair_colouring.filter((el) => {
      if(el == 'Mehendi or natural colors') {
        return el;
      }
    }) : [];
    var chemicalColouring = type_of_hair_colouring ? type_of_hair_colouring.filter((el) => {
      if(el != 'Mehendi or natural colors') {
        return el;
      }
    }) : [];
    if(hair_chemical_treatment_status.length == 0) {
      chemical_treatment = true;
    }else if(hair_chemical_treatment_status.length != 0) {
      if(hair_colouring != 'Never' && naturalColouring.length == 0 && chemicalColouring.length != 0) {
        chemical_treatment = true;
      }else if(hair_colouring == 'Never' || (hair_colouring != 'Never' && naturalColouring.length != 0)) {
        chemical_treatment = false;
      }
    }
    if(hair_styling == 'Never') {
      hair_stylying_status = false;
    }else {
      hair_stylying_status = true;
    }
    if(chemical_treatment == true && hair_stylying_status == true) {
      reasons = `${reasons}, chemical treatments <span class="font-weight-normal">and</span> usage of styling tools`;
    }else if(chemical_treatment == true && hair_stylying_status == false) {
      reasons = `${reasons} <span class="font-weight-normal">and</span> chemical treatments`;
    }else if(chemical_treatment == false && hair_stylying_status == true) {
      reasons = `${reasons} <span class="font-weight-normal">and</span> usage of styling tools`;
    }else if(chemical_treatment == false && hair_stylying_status == false) {
      reasons = reasons;
    }
    if(cuticle_reasons) {
      cuticle_reasons.innerHTML = reasons;
    }
    var newCard = `
      <div class="col-md-6 d-md-none" product_card>
        <div class="row justify-content-center">
          <div class="col-md-12 px-0">
            <p class="mb-0 d-md-none text-center hydrate__heading">Traya Hydrate + Repair Shampoo & Conditioner</p>
            <img src="//cdn.shopify.com/s/files/1/0100/1622/7394/files/cuticle2x1.webp" alt="2X1 Product" title="2x1 product" width="" height="250" loading="eager" />
          </div>
        </div>
      </div>
    `;
    var pdCard = document.querySelector('[cuticle_products]');
    if(pdCard) {
      var twobyoneProductcard = new DOMParser().parseFromString(newCard, 'text/html')?.querySelector('.col-md-6');
      // pdCard.append(twobyoneProductcard);
    }
    var cuticleProductList = [];
    if(Recommendations.Nourish_Hair_Oil == 'Yes') {
      cuticleProductList.push('nourish-hair-oil-suitable-for-all-hair-types-100ml-with-argan-oil-castor-oil-rosemary-extract')
    }
    if(Recommendations.Damage_Repair_Shampoo == 'Yes') {
      cuticleProductList.push('traya-hydrate-damage-repair-shampoo-with-baobab-tree-extracts-and-vegan-keratin-100-safe-sulphate-and-paraben-free')
    }
     if(Recommendations.Hair_ras == 'Yes') {
      cuticleProductList.push('hair-growth-herbs')
    }
    if(cuticleProductList.length != 0) {
      cuticleProductList.forEach((product, index) => {
        CutitcleProductShow(product, index, cuticleProductList.length);
      })
    }
    cuticleSlider();
  }else {
    displayProducts(response);
    let goal = User_Analysis.goal;
    if(goal != null && goal != 'undefined'){
      goal = goal.replace('{"',"").replace(/","/g,", ").replace(/Anti-/g,'').replace(/More/g,'').replace('"}',"")
    }else {
     goal = 'Goal';
    }
    var root_cause = `Gut:${User_Analysis.gut}, Stress:${User_Analysis.stress}`, suffering_data = User_Analysis.suffering_from_conditions,
      hair_type = User_Analysis.hair_type, Stress = User_Analysis.stress, Genetics = User_Analysis.family_genetic,
      FamilyGenetics = User_Analysis.family_genetic, EnergyLevel = User_Analysis.energy_level, Digestion = User_Analysis.acidity_bloating_gas_indigestion,
      Lowthyroid = User_Analysis.suffering_from_conditions, vitamindefeciencies = User_Analysis.vitamin_defeciencies,
      show_treatment_months = response.show_treatment_months;
    if(show_treatment_months == true){
      var _newFresult = document.querySelectorAll('.new-fresult'), __customEssential = document.querySelectorAll('.custom-essential'),
        __female_concern_months = document.querySelectorAll('.female_concern_months'), __container_will_see = document.querySelectorAll('.container.will-see');
      if(_newFresult.length != 0) {showOrHideByClass(_newFresult, 'add', 'new-fresult_pd_true');}
      if(__customEssential.length != 0) {showOrHideByClass(__customEssential, 'add', 'custom_essential_pd_true');}
      if(__female_concern_months.length != 0) {
        showOrHideByClass(__female_concern_months, 'add', 'female_months_show');
        showOrHide(__female_concern_months, 'block');
      }
      if(__container_will_see.length != 0) {showOrHide(__container_will_see, 'none');}
    }
    var hairconcernstrue = response.hair_concerns.showHairConcerns, __hair__concerns = document.querySelectorAll('.hair-concerns'),
      hairconcerns = response.hair_concerns.hairConcerns, primaryRootcause = response.root_causes.primaryRootCause,
      otherrootitems = response.root_causes.defaultRootCause;
    if(hairconcernstrue == true){
      var __product_section_custom = document.querySelectorAll('.product-section-customm'), __female_age_conditions = document.querySelectorAll('.female_age_conditions');
      if(__product_section_custom.length != 0) {showOrHideByClass(__product_section_custom, 'add', 'product-section-pt-true');}
      // if(__female_age_conditions.length != 0) {showOrHide(__female_age_conditions, 'none');}
      if(__hair__concerns.length != 0) {showOrHide(__hair__concerns, 'block');}
    }
    if(hairconcernstrue == false){
      if(__hair__concerns.length != 0) {showOrHide(__hair__concerns, 'none');}
    }
    for(var i=0; i < hairconcerns.length; i++) {
      var hairvalue = hairconcerns[i].title;
      if (hairvalue == 'Hairfall' )  {
        var HairFall = document.querySelectorAll('.hairconcern.hairfall');
        if(HairFall.length != 0) {showOrHide(HairFall, 'block');}
      }
      if (hairvalue == 'Dandruff' )  {
        var Dandruff = document.querySelectorAll('.hairconcern.dandruff');
        if(Dandruff.length != 0) {showOrHide(Dandruff, 'block');}
      }
      if (hairvalue == 'Dull Hair' ) {
        var DullHair = document.querySelectorAll('.hairconcern.dull-hair');
        if(DullHair.length != 0) {showOrHide(DullHair, 'block');}
      }
      if (hairvalue == 'Frizzy Hair' ) {
        var FrizzyHair = document.querySelectorAll('.hairconcern.frizzy-hair');
        if(FrizzyHair.length != 0) {showOrHide(FrizzyHair, 'block');}
      }
      if (hairvalue == 'Split Ends') {
        var SplitEnds = document.querySelectorAll('.hairconcern.split-ends');
        if(SplitEnds.length != 0) {showOrHide(SplitEnds, 'block');}
      }
      if (hairvalue == 'Tangling' ) {
        var Tangling = document.querySelectorAll('.hairconcern.tangling');
        if(Tangling.length != 0) {showOrHide(Tangling, 'block');}
      }
    }
    for(var i=0; i < primaryRootcause.length; i++){
      let itemvalue = primaryRootcause[i].title
      if (itemvalue == 'Autoimmune' ) {
        var __product_section_heading_kit = document.querySelectorAll('.product-section_heading-kit');
        if(__product_section_heading_kit.length != 0) {
          __product_section_heading_kit.forEach((kit) => {
            kit.textContent = `Your Customised Kit`;
          });
        }
      }
      factors.push(primaryRootcause[i].title);
    }
    for(var i=0; i < otherrootitems.length; i++) {
      let itemvalues = otherrootitems[i].title
      if (itemvalues == "Genetics" && FamilyGenetics == "Yes, Father or father's side of family") {
        factors.push('FatherGenetic');
      }else if (itemvalues == "Stress" && Stress == "Low") {
        factors.push('Stresslow');
      }else if (itemvalues == "Stress" && Stress == "Moderate") {
        factors.push('Stressmoderate');
      }else if (itemvalues == "Stress" && Stress == "High") {
        factors.push('Stresshigh');
      }else if (itemvalues == "Genetics" && FamilyGenetics == "Yes, Mother or mother's side of family") {
        factors.push('MotherGenetic');
      }else if (itemvalues == "Genetics" && FamilyGenetics == "Both") {
        factors.push('Genetics');
      }else if (itemvalues == "Metabolism" && EnergyLevel == "Very low in the afternoon") {
        factors.push('Energylevel');
      }else if (itemvalues == "Metabolism" && EnergyLevel == "Low by evening/ night") {
        factors.push('Energylevel');
      }else if (itemvalues == "Metabolism" && EnergyLevel == "Low when I wake up, but gradually increases") {
        factors.push('Energylevel');
      }else if (itemvalues == "Metabolism" && EnergyLevel == "Always high") {
        factors.push('Energylevel');
      }else if (itemvalues == "Deficiency" && vitamindefeciencies == "Yes") {
        factors.push('Vitamindeficiency');
      }else {
        factors.push(otherrootitems[i].title);
      }
    }
    var user__name = document.querySelectorAll('[data-user-name]'), __data_user_name_info = document.querySelectorAll('[data-user-name-info]'),
      scalpType = document.querySelectorAll('.femleBannerTTls [scalp-type]'), __hair_concern = document.querySelectorAll('.femleBannerTTls [hair-concern]'),
      __root__cause = document.querySelectorAll('.femleBannerTTls [root-cause]'), __primary_root = document.querySelectorAll('[primary-root]'),
      __mainFactImages = document.querySelectorAll('.root_cause_iconFR .mainFactImages'), __femaleMainFactImages = document.querySelectorAll('.root_cause_iconFRs .mainFactImages'),
      __rootcause_description = document.querySelectorAll('.RootCause .rootcause_description'), __formulation = document.querySelectorAll('.formulation .formulation-text');
    if(user__name.length != 0){user__name.forEach((name) => {name.textContent = `${User_Analysis.first_name}`});}
    if(__data_user_name_info.length != 0) {__data_user_name_info.forEach((info) => {info.textContent = `${User_Analysis.first_name}'s`})}
    if(scalpType.length != 0) {scalpType.forEach((scalp) => {scalp.textContent = `${User_Analysis.hair_type}`})}
    if(__hair_concern.length != 0) {__hair_concern.forEach((concern) => {concern.textContent = `${goal}`})}
    if(__root__cause.length != 0) {__root__cause.forEach((cause) => {cause.textContent = `${factors[0]}`})}
    if(__primary_root.length != 0) {__primary_root.forEach((root) => {root.textContent = `${factors[0]}`})}
    if(__mainFactImages.length != 0) {showOrHide(__mainFactImages, 'none');}
    for(let i in factors) {
      if(i < 6 && i != 0){
        var factor = factors[i].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        var thisFactor = document.querySelectorAll(`[${factor}]`);
        if(thisFactor.length != 0) {showOrHide(thisFactor, 'block');}
      }
      if(i >= 5) break;
    }
    if(__femaleMainFactImages.length != 0) {showOrHide(__femaleMainFactImages, 'none');}
    for(let i in factors) {
      if(i < 6 && i != 0) {
        var factor = factors[0].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        var thisFactor = document.querySelectorAll(`.root_cause_iconFRs [${factor}]`);
        if(thisFactor.length != 0) {showOrHide(thisFactor, 'block');}
      }
    }
    if(__rootcause_description.length != 0) {showOrHide(__rootcause_description, 'none');}
    for(let i in factors) {
      if(i < 5 && i == 0) {
        let factor = factors[i].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        var thisFactor = document.querySelectorAll(`.RootCause [${factor}]`);
        if(thisFactor.length != 0) {showOrHide(thisFactor, 'block');}
      }
    }
    if(__formulation.length != 0) {showOrHide(__formulation, 'none');}
    for(let i in factors) {
      if(i < 5 && i == 0){
        let factor = factors[0].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        var thisFactor = document.querySelectorAll(`.formulation [${factor}]`);
        if(thisFactor.length != 0) {showOrHide(thisFactor, 'block');}
      }
    }
    var ATC_frp = document.querySelectorAll('#add-to-cart-result-page-frp'), stickyATC_frp = document.querySelectorAll('.sticky-btn #add-to-cart-result-page-frp'),
      ATC_rp = document.querySelectorAll('.add-to-cart-result-page');
    if(ATC_frp.length != 0) {
      ATC_frp.forEach((rp) => {
        rp.setAttribute('user-mobile', User_Analysis.phone);
        rp.setAttribute('user-email', User_Analysis.email);
      });
    }
    if(stickyATC_frp.length != 0) {
      stickyATC_frp.forEach((rp) => {
        rp.setAttribute('user-mobile', User_Analysis.phone);
        rp.setAttribute('user-email', User_Analysis.email);
      });
    }
    if(ATC_rp.length != 0) {
      ATC_rp.forEach((rp) => {
        rp.setAttribute('user-mobile', User_Analysis.phone);
        rp.setAttribute('user-email', User_Analysis.email);
      });
    }
  }
  if (trayaProcessingAnimation) {
    trayaProcessingAnimation.style.display = 'none';
  }
  document.body.style.overflow = 'unset';

  console.log(response.cart_price);
}

function showOrHide(partition, state) {
  partition.forEach((part) => {
    part.style.display = `${state}`;
  })
}

function showOrHideByClass(partition, work, state) {
  partition.forEach((part) => {
    if(work == 'add') {part.classList.add(state)}
    if(work == 'remove') {part.classList.remove(state)}
  })
}

function cuticleSlider() {
  $('.div-main').slick({
    infinite: true,
    slidesToShow: 4,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive:[
      {
        breakpoint: 992,
          settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
          settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
          settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.women-real-stories .stories').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 300,
    dots: true,
    arrows: false,
    autoplay: 1000,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        }
      }
    ]
  });
  $('.cstm_main_figma').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows:false
        }
      },
      {
      breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows:false,
          autoplay: true,
          autoplaySpeed: 2000,
          speed: 300
        }
      }
    ]
  });
  $('.cstm_main_figma_mobile').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300
  });
}

function displayProducts(response) {
  var { Recommendations, User_Analysis } = response;
  var recommendedProducts = [], __data_gender = document.querySelectorAll('[data-gender]');
  var widening = User_Analysis.hair_fall_stage, dandruff_case = User_Analysis.describe_dandruff;
  
  if(Recommendations.Health_tatva == "Yes") {
    recommendedProducts.push({
      'handle': 'herbal-tablets'
    });
  }
  if(Recommendations.Gut_shuddi == "Yes") {
    recommendedProducts.push({
      'handle': 'avipattikar-digestion-tablets'
    });
  }
  if(Recommendations.pcos_santulan == "Yes") {
    recommendedProducts.push({
      'handle': 'pcos-santulan-for-pcos-and-hormone-related-hair-loss'
    });
  }
  if(Recommendations.meno_santulan == "Yes") {
    recommendedProducts.push({
      'handle': 'meno-santulan-tablets-for-menopause-support-and-menopausal-hair-fall'
    });
  }
  if(Recommendations.mom_santulan == "Yes") {
    recommendedProducts.push({
      'handle': 'mom-santulan-tablets-for-hair-fall-in-post-pregnancy-or-post-childbirth-period'
    });
  }
  if(Recommendations.thyro_santulan == "Yes") {
    recommendedProducts.push({
      'handle': 'thyro-santulan-tablets-for-supporting-thyroid-health'
    });
  }
  if(Recommendations.Scalp_Controller == "Yes") {
    recommendedProducts.push({
      'handle': 'scalp-controller'
    });
  }
  if(Recommendations.Hair_ras == "Yes") {
    recommendedProducts.push({
      'handle': 'hair-growth-herbs'
    });
  }
  if(Recommendations.her_vitamin == "Yes") {
    recommendedProducts.push({
      'handle': 'hair-vitamin-for-her'
    });
  }
  // if(Recommendations.Hair_vitamin == "Yes") {
  //   recommendedProducts.push({
  //     'handle': 'hair-vitamins'
  //   });
  // }
  if(Recommendations.na_minox == "Yes") {
    recommendedProducts.push({
      'handle': 'minoxidil-2-alcohol-free-advanced-lipid-technology-for-improved-hair-growth-60-ml'
    });
  }
  if(Recommendations.Anti_danruff_shampoo == "Yes") {
    recommendedProducts.push({
      'handle': 'anti-dandruff-shampoo'
    });
  }
  if(Recommendations.Defence_shampoo == "Yes") {
    recommendedProducts.push({
      'handle': 'shampoo'
    });
  }
  if(Recommendations.Defence_shampoo_180ml == "Yes") {
    recommendedProducts.push({
        'handle': 'defence-shampoo-180-ml'
    });
  }
  if(Recommendations.Kevon == "Yes") {
    recommendedProducts.push({
      'handle': 'ketoconazole-2-night-lotion'
    });
  }
  if(Recommendations.Minoxidil == "Yes") {
    recommendedProducts.push({
      'handle': 'minoxidil-2'
    });
  }
  if(Recommendations.RCP == "Yes") {
    recommendedProducts.push({
      'handle': 'recap-serum-for-hair-fall-control'
    });
  }
  if(Recommendations.Nasya == "Yes") {
    recommendedProducts.push({
      'handle': 'shatavari-ghrita'
    });
  }
  if(Recommendations.shine_serum == "Yes" && (widening == 'No widening' || widening == 'Starting to see widening')) {
    recommendedProducts.push({
      'handle': 'shine-leave-in-serum-anti-frizz-anti-breakage-formula-suitable-for-all-hair-types'
    });
  }
  if(Recommendations.Nourish_Hair_Oil == "Yes" && (widening == 'No widening' || widening == 'Starting to see widening') && dandruff_case == 'No') {
    recommendedProducts.push({
      'handle': 'nourish-hair-oil-suitable-for-all-hair-types-100ml-with-argan-oil-castor-oil-rosemary-extract'
    });
  }else {
    if(Recommendations.Calm_Therapy_Booster_Oil == "Yes") {
      recommendedProducts.push({
        'handle': 'scalp-oil-with-calm-oil-shot-100ml'
      });
    }
    if(Recommendations.Dandruff_Therapy_Booster_Oil == "Yes") {
      recommendedProducts.push({
        'handle': 'scalp-oil-with-dandruff-oil-shot-100ml'
      });
    }
    if(Recommendations.Growth_Therapy_Booster_Oil == "Yes") {
      recommendedProducts.push({
        'handle': 'scalp-oil-with-growth-oil-shot-100ml'
      });
    }
    if(Recommendations.Scalp_Therapy_Booster_Oil == "Yes") {
      recommendedProducts.push({
        'handle': 'scalp-oil-with-scalp-health-oil-shot-100ml'
      });
    }
  }
  if(Recommendations.Digest_Boost == "Yes") {
    recommendedProducts.push({
      'handle': 'digest-boost-for-improved-digestive-ability-traya-health'
    });
  }
  if(Recommendations.her_santulan == "Yes") {
    recommendedProducts.push({
      'handle': 'her-santulan'
    });
  }
  if(Recommendations.calm_ras === "Yes") {
    recommendedProducts.push({
      'handle': 'calm-ras'
    });
  }
  if(Recommendations.iron_santulan === "Yes") {
    recommendedProducts.push({
      'handle': 'iron-santulan-iron-supplement-for-managing-anaemia-triggered-hair-fall'
    });
  }
  if(User_Analysis.gender == 'M') {
    __data_gender.forEach((gender) => {gender.append("Male");});
  }else if(User_Analysis.gender == 'F') {
    __data_gender.forEach((gender) => {gender.append("Female");});
  }
  if(recommendedProducts.length != 0) {
    recommendedProducts.forEach((product, index) => {
      getProductByHandle(product.handle, index, recommendedProducts.length);
    })
  }
}

const ProductCard = {
  "herbal-tablets": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353348_71da4c95-e14b-4a4d-81b1-accf214fb6ba.png?v=1702445526`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353348_71da4c95-e14b-4a4d-81b1-accf214fb6ba.png?v=1702445526`
  },
  "avipattikar-digestion-tablets": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353053_9e34c7eb-552f-48dd-b124-3b7e7f211c61.png?v=1702445238`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353053_9e34c7eb-552f-48dd-b124-3b7e7f211c61.png?v=1702445238`
  },
  "scalp-oil-with-calm-oil-shot-100ml": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007944.webp?v=1718967490`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007944.webp?v=1718967490`
  },
  "scalp-oil-with-dandruff-oil-shot-100ml": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007943.webp?v=1718967489`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007943.webp?v=1718967489`
  },
  "scalp-oil-with-growth-oil-shot-100ml": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007942.webp?v=1718967490`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007942.webp?v=1718967490`
  },
  "scalp-oil-with-scalp-health-oil-shot-100ml": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007945.webp?v=1718967490`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007945.webp?v=1718967490`
  },
  "pcos-santulan-for-pcos-and-hormone-related-hair-loss": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353342.png?v=1702444175`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353342.png?v=1702444175`
  },
  "meno-santulan-tablets-for-menopause-support-and-menopausal-hair-fall": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353343.png?v=1702445166`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353343.png?v=1702445166`
  },
  "mom-santulan-tablets-for-hair-fall-in-post-pregnancy-or-post-childbirth-period": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353341.png?v=1702444215`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353341.png?v=1702444215`
  },
  "thyro-santulan-tablets-for-supporting-thyroid-health": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353346.png?v=1702444177`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353346.png?v=1702444177`
  },
  "scalp-controller": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353060_e99dda21-2e97-4912-b199-f822cdbd820d.png?v=1702445524`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Group_102353060_e99dda21-2e97-4912-b199-f822cdbd820d.png?v=1702445524`
  },
  "hair-growth-herbs": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353350.png?v=1702445167`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353350.png?v=1702445167`
  },
  "hair-vitamin-for-her": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353646_1.webp?v=1714375607`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353646_1.webp?v=1714375607`
  },
  "hair-vitamins": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353339_aa5414cc-9535-4d34-8fc0-dee2a16408a7.png?v=1702445521`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353339_aa5414cc-9535-4d34-8fc0-dee2a16408a7.png?v=1702445521`
  },
  "anti-dandruff-shampoo": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353337.png?v=1702445522`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353337.png?v=1702445522`
  },
  "shampoo": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353338_03d89734-d839-4243-b04d-3cf665e87a5c.png?v=1702445519`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353338_03d89734-d839-4243-b04d-3cf665e87a5c.png?v=1702445519`
  },
  "defence-shampoo-180-ml":{
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007941.webp?v=1718878492`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_1000007941.webp?v=1718878492`
  },
  "ketoconazole-2-night-lotion": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353340_7b09525d-884a-427e-ba34-7c7a68e85df3.png?v=1702885616`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353340_7b09525d-884a-427e-ba34-7c7a68e85df3.png?v=1702885616`
  },
  "minoxidil-2": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353354_c102bed0-51e5-4b33-bf32-dacf8ba182fb.png?v=1704978363`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353354_c102bed0-51e5-4b33-bf32-dacf8ba182fb.png?v=1704978363`
  },
  "recap-serum-for-hair-fall-control": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353335_569613c6-0f88-446d-bc67-a1f160b3bf82.png?v=1702445518`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353335_569613c6-0f88-446d-bc67-a1f160b3bf82.png?v=1702445518`
  },
  "shatavari-ghrita": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353349_1.png?v=1702446482`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353349_1.png?v=1702446482`
  },
  "shine-leave-in-serum-anti-frizz-anti-breakage-formula-suitable-for-all-hair-types": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353323.webp?v=1721894322`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353323.webp?v=1721894322`
  },
  "digest-boost-for-improved-digestive-ability-traya-health": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353347.png`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353347.png`
  },
  "nourish-hair-oil-suitable-for-all-hair-types-100ml-with-argan-oil-castor-oil-rosemary-extract": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353632.webp`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353632.webp`
  },
  "her-santulan" : {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Her_Santulan.webp`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Her_Santulan.webp`
  },
  "calm-ras": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Calm_ras.webp`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Calm_ras.webp`
  },
  "iron-santulan-iron-supplement-for-managing-anaemia-triggered-hair-fall": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Iron_calm.webp`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Iron_calm.webp`
  },
  "minoxidil-2-alcohol-free-advanced-lipid-technology-for-improved-hair-growth-60-ml": {
    'mobileImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353668_f150090e-7f37-4c50-b436-ab8a3edecee1.webp`,
    'desktopImage': `//cdn.shopify.com/s/files/1/0100/1622/7394/files/Frame_102353668_f150090e-7f37-4c50-b436-ab8a3edecee1.webp`
  }
}
var prices = 0, variantsIDs = [];
function getProductByHandle(handle, index, count) {
  var productGrid = document.querySelectorAll('.product-section .container > .row');
  var html = `
    <div class="col-md-10 pt-2 pt-md-0 result-product m-auto">
      <div class="product-item h-100 mb-0">
        <img id="${handle}" src="${ProductCard[handle].mobileImage}" class="mx-auto d-md-none card border-0 rounded-lg shadow" alt="${handle}" title="${handle}" width="" height="">
        <img id="${handle}" src="${ProductCard[handle].desktopImage}" class="mx-auto d-none d-md-block card border-0 rounded-lg shadow" alt="${handle}" title="${handle}" width="" height="">
      </div>
    </div>
  `;
  if(productGrid.length != 0) {
    productGrid.forEach((grid) => {
      var parsedCard = new DOMParser().parseFromString(html, 'text/html')?.querySelector('.result-product');
      grid.append(parsedCard);
    })
  }
  fetch(`/products/${handle}.js`, {
    method: "GET"
  }).then((response) => {
    return response.json();
  }).then((product) => {
    var p = product.price, doc_fee = 100000, diet_plan= 50000, hair_coach = 50000, total__price, Percentage, discount_pricetext = 0;
    prices = prices + p;
    total__price = ((doc_fee + diet_plan + hair_coach) + (prices));
    discount_pricetext = ((total__price-prices)/100);
    Percentage = parseInt(((total__price -prices)/total__price)*100);
    var __total_price = document.querySelectorAll('.total-price'), __all_total_price = document.querySelectorAll('.all-total-price'),
      Frp = document.querySelectorAll('#add-to-cart-result-page-frp'), __off_per = document.querySelectorAll('.new-female-off-per'),
      __model_discount_price = document.querySelectorAll('.model_discount_price'),
      kit_2_price = document.querySelectorAll('.month-kit-2'), kit_3_price = document.querySelectorAll('.month-kit-3'),
      boot_trya_1 = document.querySelectorAll('.boot-trya-1');
    if(kit_2_price.length != 0) {
      kit_2_price.forEach((price) => {
        price.innerHTML = `<sup>₹</sup>${prices/100}`;
      });
    }
    if(kit_3_price.length != 0) {
      kit_3_price.forEach((price) => {
        price.innerHTML = `₹ ${total__price/100}`;
      });
    }
    if(boot_trya_1.length != 0) {
      boot_trya_1.forEach((price) => {
        price.innerHTML = `<small>₹</small> ${prices/100}`;
      });
    }
    if(__total_price.length != 0) {
      __total_price.forEach((price) => {
        price.innerHTML = `${theme.Currency.formatMoney(prices, theme.moneyFormat)}`;
        // call snap price funtion
        document.querySelector('#sm-widget-btn') && spanPriceUpdate();
      })
    }
    if(__all_total_price.length != 0) {
      __all_total_price.forEach((price) => {
        price.innerHTML = `${theme.Currency.formatMoney(total__price, theme.moneyFormat)}`
      })
    }
    if(Frp.length != 0) {
      Frp.forEach((rp) => {
        rp.setAttribute('data-price', prices);
      })
    }
    if(__off_per.length != 0) {
      __off_per.forEach((off) => {
        off.innerHTML = `(${Percentage} % OFF)`;
      })
    }
    if(__model_discount_price.length != 0) {
      __model_discount_price.forEach((price) => {
        price.innerHTML = `You Saved ₹ ${parseInt(discount_pricetext)}`;
      })
    }
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
  }).catch((error) => {
    console.error('Error: ', error);
  }).finally(() => {
    if(index == count -1) {
      setTimeout(() => {
        normalSlider();
      },2500);
    }
  })
}

function normalSlider() {
  $('.result_product_slides').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: false,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        }
      }
    ]
  });
}

function CutitcleProductShow(product, index, totalProducts) {
  fetch(`/products/${product}?view=cuticle-products`, {
    method: "GET"
  }).then((response) => {
    return response.text();
  }).then((response) => {
    let product = new DOMParser().parseFromString(response, 'text/html');
    let productCard = product.querySelector('[product_card]');
    let parent = document.querySelector('[cuticle_products]');
    let variantId = parseInt(product.querySelector('[product_card]').getAttribute('variant_id'));
    let price = parseInt(product.querySelector('[product_card]').getAttribute('price'));
    let priceCard = document.querySelector('[cart_value]');
    let sticky_btn_cart_value = document.querySelector('[sticky_btn_cart_value]');
    pdPrice = Math.round(price + pdPrice);
    if(priceCard) {
      priceCard.textContent = pdPrice/100;
    }
    if(sticky_btn_cart_value) {
      sticky_btn_cart_value.textContent = pdPrice/100;
    }
    if(parent && productCard) {
      parent.append(productCard);
    }
    if(getCookie("GuestForm_id")){
      variantsIDs.push({
        'id': variantId,
        'quantity': 1,
        properties: {
          '_result_id': id
        }
      });
    }else{
      variantsIDs.push({
        'id': variantId,
        'quantity': 1
      });
    }
  }).catch((error) => {
    console.error('Error: ', error);
  }).finally(() => {
    if(index == totalProducts - 1) {
      // if($(window).width() < 768) {
        setTimeout(() => {
          $('[cuticle_products]').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            centerPadding: '30px',
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            dots: false,
            responsive: [
                  {
                    breakpoint: 749,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
               ]
          });
        }, 2500);
      // }
    }
  })
}

function otherSliders() {
  $('.result_doctor_slides').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 2000,
  });
}

window.addEventListener('DOMContentLoaded', function() {
  clearCart();
  var normalRpATC = document.querySelectorAll('#add-to-cart-result-page-frp'), cuticleRpATC = document.querySelectorAll('#female_cuticle_atc_button');
  if(normalRpATC.length != 0) {
    normalRpATC.forEach((Rp) => {
      Rp.addEventListener('click', function() {
        ATCFunction();
      });
    })
  }
  if(cuticleRpATC.length != 0) {
    cuticleRpATC.forEach((Rp) => {
      Rp.addEventListener('click', function() {
        ATCFunction();
      });
    })
  }
  var textImage = document.querySelectorAll('.text_image');
  var faq__close = document.querySelectorAll('.faq__close');
  var faq__answer = document.querySelectorAll('.faq__answer');
  if(textImage.length != 0) {
    textImage.forEach((image) => {
      image.addEventListener('click', function() {
        let box_id = this.querySelector('.div-image').getAttribute('data-attr');
        let boxes = document.querySelectorAll(`[data-target-id="${box_id}"]`);
        if(boxes.length != 0) {showOrHideByClass(boxes, 'remove', 'd-none');}
        let faq_answers = document.querySelectorAll('.faq__answer');
        if(faq_answers.length != 0) {showOrHideByClass(faq_answers, 'remove', 'd-none');}
      });
    });
  }
  if(faq__close.length != 0) {
    faq__close.forEach((close) => {
      close.addEventListener('click', function() {
        var __faq_answer = document.querySelectorAll('.FAQ--answer'), __faq__answer = document.querySelectorAll('.faq__answer');
        if(__faq_answer.length != 0) {showOrHideByClass(__faq_answer, 'add', 'd-none');}
        if(__faq__answer.length != 0) {showOrHideByClass(__faq__answer, 'add', 'd-none');}
      });
    });
  }
  if(faq__answer.length != 0) {
    faq__answer.forEach((answer) => {
      answer.addEventListener('click', function() {
        var faq_answer = document.querySelectorAll('.FAQ--answer');
        if(faq_answer.length != 0) {showOrHideByClass(faq_answer, 'add', 'd-none');}
        answer.classList.add('d-none');
      });
    });
  }
})

var clearCart = function() {
  var formdata = {
    sections: 'cart-drawer'
  };
  fetch('/cart/clear.js', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  }).then((response) => {
    return response.json();
  }).then((result) => {
    var t = document.querySelector('cart-drawer');
    let cart_drawer = result.sections['cart-drawer'];
    CartDrawerUpdate(t, cart_drawer, drawer=false,0);
  }).catch((error) => {
    console.error('Error: ', error);
  })
}

function checkout() {
  localStorage.setItem('user__gender',user_gender);
  localStorage.setItem('caseId',caseId);
  var formData = {
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
  }).then((response) => {
    localStorage.setItem('User_location', "cart");
    return response.json();
  }).then((result) => {
    var t = document.querySelector('cart-drawer');
    let cart_drawer = result.sections['cart-drawer'];
    CartDrawerUpdate(t, cart_drawer);
  }).catch((error) => {
    console.error('Error:', error);
  }).finally(()=>{
    document.querySelector('#sm-widget-btn') && spanPriceUpdate();
  });
}

function ATCFunction() {
  fetch('/cart/clear.js', {
    method: 'POST'
  }).then((response) => {
    return response.json();
  }).then((res) => {
    
  }).catch((error) => {
    console.error('Clear Cart Error: ', error);
  }).finally(() => {
    checkout();
  })
}

window.addEventListener('scroll', function() {
  var productSectionList = document.querySelector('[product-section]');
  var stickyBtn = document.querySelector('[sticky__btn]');
  var windowHeight = window.innerHeight;
  var scrollTop = window.scrollY;
  if(scrollTop >= productSectionList.offsetTop + productSectionList.offsetHeight - windowHeight) {
    stickyBtn.style.display = 'block';
  }else {
    stickyBtn.style.display = 'none';
  }
  var siteFooter = document.querySelector('.female-result .site-footer');
  if(siteFooter) {
    if (scrollTop >= siteFooter.offsetTop - windowHeight) {
      stickyBtn.style.position = 'fixed';
    } else {
      stickyBtn.style.position = 'fixed';
    }
  }
});

window.addEventListener('scroll', function() {
  var productSectionList = document.querySelector('.cuticle-ind');
  var stickyBtn = document.querySelector('[btn_sticky]');
  var windowHeight = window.innerHeight;
  var scrollTop = window.scrollY;
  if(scrollTop >= productSectionList.offsetTop + productSectionList.offsetHeight - windowHeight) {
    stickyBtn.style.display = 'block';
  }else {
    stickyBtn.style.display = 'none';
  }
  var siteFooter = document.querySelector('.female-result .site-footer');
  if(siteFooter) {
    if (scrollTop >= siteFooter.offsetTop - windowHeight) {
      stickyBtn.style.position = 'fixed';
    } else {
      stickyBtn.style.position = 'fixed';
    }
  }
});