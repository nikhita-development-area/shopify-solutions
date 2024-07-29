/* paginate doctors list */
let url = window.location.href;
let pathname = new URL(url).pathname;
// Split the pathname using '/' as the separator
let pathParts = pathname.split("/");

// Get the part you are interested in (assuming it's always the second part)
let desiredPart = pathParts[2];
let parts = pathname.split("/");
let cityName = parts[parts.length - 1];
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");
function doctors_list(pageNumber) {
  let apiurl;
  if (pathname.includes("hair-transplant")) {
    apiurl = `https://public-jgfas325.hav-g.in/getdoctors/${cityName}?type=transplant-doctors&pageNumber=${pageNumber}&pageSize=10`;
  } else if (pathname.includes("hair-doctors")) {
    apiurl = `https://public-jgfas325.hav-g.in/doctors/${cityName}?pageNumber=${pageNumber}&pageSize=10`;
  } else {
    apiurl = `https://public-jgfas325.hav-g.in/getdoctors/${cityName}?type=dermatologists&pageNumber=${pageNumber}&pageSize=10`;
  }
  fetch(apiurl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var scriptElement = document.createElement("script");
      scriptElement.setAttribute("defer", "");
      scriptElement.setAttribute("type", "application/ld+json");
      const jsonStrings = [];
      data.doctorRecords.forEach((doctor, index) => {
        const schema = {
          "@context": "http://schema.org/",
          "@type": doctor.doctor_profile,
          name: doctor.doctor_name,
          medicalSpecialty: doctor.specialities_detail.split("|"),
          address: {
            "@type": "PostalAddress",
            addressLocality: doctor.city_name,
            streetAddress: doctor.address_details,
          },
          priceRange: doctor.doctor_fee,
          currenciesAccepted: "INR",
        };
        jsonStrings.push(JSON.stringify(schema));
      });
      const combinedJson = `${jsonStrings.join(",\n")}`;
      scriptElement.appendChild(document.createTextNode(combinedJson));
      document.head.appendChild(scriptElement);
      let hair_doc_loader = document.querySelector("#hair_doc_loader");
      hair_doc_loader.style.display = "none";
      if (data.doctorRecords.length == 0) {
        const url = `https://traya.health/blogs/${desiredPart}/${cityName}`;
        window.location.assign(url);
      }
      let doc_list = document.querySelector("#list");
      if (doc_list) {
        document.querySelector(
          ".doctors-list-heading"
        ).innerHTML = `${data.H1}`;
      }
      let doctor_data = document.querySelector("#doctor_data");
      let pagiNation = document.querySelector(".list");
      let image_section = document.querySelector(".image_section");
      data.doctorRecords.forEach((doc_data, index) => {
        index = index + 1;
        let HTML = `
       <div class="doctor_deatils_main" index=${index}>
         <div class="doc_details_top">
           <div class="doc_detail_left">
             <h3 class="doc_name mb-0"><strong>${doc_data.doctor_name}</strong></h3>
             <p class="doc_profile">${doc_data.doctor_profile}</p>
             <p class="doc_exp">${doc_data.doctor_experiences}</p>
             <p class="doc_fee">Consultation Fee: ${doc_data.doctor_fee}</p>
           </div>
           <div class="doc_detail_right">
               <b><p class="doc_add">Address:</p></b>
               <p class="doc_add_details">${doc_data.address_details}</p>
           </div>
         </div>
         <div class="doc_details_bottom">
           <b><p class="sep">Specialities:</p></b>
           <p class="sep_detail sep_spacialisties">${doc_data.specialities_detail}</p>
           <b><p class="education sep">Education:</p></b>
             <span class="normal sep_detail education_detail sep_detail_truncate">${doc_data.education_detail}</span><span class="dl-see-more">+see more</span> 
         </div>
       </div>
       `;
        let parsedHTML = new DOMParser()
          .parseFromString(HTML, "text/html")
          ?.querySelector(".doctor_deatils_main");
        if (doctor_data) {
          doctor_data.append(parsedHTML);
        }
      });
      let total_count = data.totalDoctorCount;
      let page_10 = total_count / 10;
      let totalPage = Math.ceil(page_10, "page_10");
      let last = totalPage - pageNumber;
      let prev_btn = document.querySelector(".previous_paginationBTN");
      let next_btn = document.querySelector(".next_paginationBTN");
      let paginationBTN_wrapper;
      let start, end;

      pageNumber = parseInt(pageNumber);
      if (totalPage <= 3) {
        start = 1;
        end = totalPage;
      } else if (pageNumber >= 3 && last != 0) {
        start = pageNumber - 1;
        end = pageNumber + 1;
      } else if (last == 0) {
        start = pageNumber - 2;
        end = pageNumber;
      } else {
        start = 1;
        end = 3;
      }
      if (pageNumber == 1) {
        prev_btn.classList.add("disabled");
      } else {
        prev_btn.classList.remove("disabled");
      }
      if (pageNumber == totalPage) {
        next_btn.classList.add("disabled");
      } else {
        next_btn.classList.remove("disabled");
      }

      if (next_btn) {
        next_btn.addEventListener("click", function () {
          let next_pageNumber =
            parseInt(
              document
                .querySelector(".paginationBTN.active")
                .getAttribute("pagenumber")
            ) + 1;
          let paginationBTN_active_Atrr = document.querySelector(
            '[pagenumber="' + next_pageNumber + '"]'
          );
          paginationBTN_active_Atrr.click();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }

      if (prev_btn) {
        prev_btn.addEventListener("click", function () {
          let pre_pageNumber =
            parseInt(
              document
                .querySelector(".paginationBTN.active")
                .getAttribute("pagenumber")
            ) - 1;
          let paginationBTN_active_Atrr = document.querySelector(
            '[pagenumber="' + pre_pageNumber + '"]'
          );
          paginationBTN_active_Atrr.click();
          console.log(paginationBTN_active_Atrr, "nextPaginationBTN");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }

      for (let i = start; i <= end; i++) {
        paginationBTN_wrapper = document.querySelector(".pagination__buttons");
        let paginationHTML = `
        <div class="pagination_main">
          <div class="paginiation_parent">
            <a href="#" id="paginationBTN" pageNumber="${i}" class="paginationBTN ${
          i == pageNumber ? "active" : ""
        }">${i}</a>
          </div>
        </div>`;
        var parsedPagination = new DOMParser()
          .parseFromString(paginationHTML, "text/html")
          ?.querySelector(".pagination_main");
        paginationBTN_wrapper.append(parsedPagination);
      }

      let image_html1 = `
     <div class="image_section rounded-lg">
          <a class="img_contain" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
            .substring(1)
            .replaceAll("/", "_")}&utm_campaign=blogs_hd_card1" >
               <img class="desktop_image__new" src="//traya.health/cdn/shop/files/desktop_image_700x.png?v=1692863573" width="" height="" loading="lazy" alt="image" title="image">
               <img class="mobile_image__new" src="//traya.health/cdn/shop/files/mobile-img_9d47d971-6c9c-4084-843b-255e7cbc1f4c_700x.png?v=1692863589" width="" height="" loading="lazy" alt="image" title="image">
          </a>
          <div class="text_contain">
            <a style="display: block;text-wrap: wrap;" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
              .substring(1)
              .replaceAll("/", "_")}&utm_campaign=blogs_hd_card1" >
             <h2 class="faq-hd-heading dlist-heading">Save on travel time &amp; effort</h2>
            </a>
             <a style="display: block;text-wrap: wrap;" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
               .substring(1)
               .replaceAll(
                 "/",
                 "_"
               )}&utm_campaign=blogs_hd_card1" class="dl-img-para">Get doctor recommended plans from the comfort of your home with Traya.</a>
             <a id="hairtestctablog2" class="assessment-btn btn-dark d-lg-inline-section font-weight-bold px-3 py-2 rounded-lg hair-form-actn-link" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
               .substring(1)
               .replaceAll("/", "_")}&utm_campaign=blogs_hd_card1" style="pointer-events: auto;">
              Take the Hair Test
             </a>
          </div>
     </div> 
        `;
      let image_html2 = `
         <div class="image_section rounded-lg hide">
           <a class="img_contain" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
             .substring(1)
             .replaceAll("/", "_")}&utm_campaign=blogs_hd_card2" >
              <img class="desktop_image__new img_hair_transpant1" src="//traya.health/cdn/shop/files/wepik-export-20230807060306yRiv_1_1_700x.png?v=1693460176" width="" height="" loading="lazy" alt="image" title="image">
             <img class="mobile_image__new img_hair_transpant2" src="//traya.health/cdn/shop/files/wepik-export-20230807060306yRiv_1_2_700x.png?v=1693460261" width="" height="" loading="lazy" alt="image" title="image">
           </a>
          <div class="text_contain">
           <a style="display: block;text-wrap: wrap;" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
             .substring(1)
             .replaceAll("/", "_")}&utm_campaign=blogs_hd_card2" >
             <h2 class="faq-hd-heading dlist-heading">Know the ‘why’ of Hair Fall</h2>
            </a>
              <a style="display: block;text-wrap: wrap;" href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
                .substring(1)
                .replaceAll(
                  "/",
                  "_"
                )}&utm_campaign=blogs_hd_card2" class="dl-img-para">Get doctor recommended plans from the comfort of your home with Traya.</a>
             <a id="hairtestctablog3" class="assessment-btn btn-dark d-lg-inline-section font-weight-bold px-3 py-2 rounded-lg hair-form-actn-link" href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
               .substring(1)
               .replaceAll("/", "_")}&utm_campaign=blogs_hd_card2" style="pointer-events: auto;">
              Take the Hair Test
             </a>
          </div>
         </div>`;
      const doctorElements = document.querySelectorAll(".doctor_deatils_main");
      for (let i = 0; i < doctorElements.length; i++) {
        if ((i + 1) % 5 === 0 && i !== 0) {
          const imageToInsert = (i + 1) % 10 === 0 ? image_html2 : image_html1;
          doctorElements[i].insertAdjacentHTML("afterend", imageToInsert);
        }
      }
      let number;
      let paginationBTN_active;
      let paginationBTN = document.querySelectorAll(".paginationBTN");
      if (paginationBTN != 0) {
        paginationBTN.forEach(function (pagination, index) {
          pagination.addEventListener("click", function (e) {
            e.preventDefault();
            doctor_data.innerHTML = "";
            paginationBTN_wrapper.innerHTML = "";
            $(this).addClass("active").siblings().removeClass("active");
            number = pagination.getAttribute("pagenumber");
            var locationHref = window.location.href;
            if (locationHref.includes("?page")) {
              let newPath = locationHref.split("?page")[0];
              locationHref = `${newPath}?page=${number}`;
            } else {
              locationHref = `${locationHref}?page=${number}`;
            }
            window.history.replaceState({}, "", locationHref);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            doctors_list(number);
          });
        });
      }
      // DND** for dynamic banner
      // if (pathname.includes("hair-transplant")){
      //    let img_hair_transpant1 = document.querySelector(".img_hair_transpant1")
      //    let img_hair_transpant2 = document.querySelector(".img_hair_transpant2")
      //   console.log(img_hair_transpant2,"img_hair_transpant")
      //   if (window.innerWidth <= 768) {
      //        console.log("Change the src attribute")
      //       img_hair_transpant2.src = "https://cdn.shopify.com/s/files/1/0100/1622/7394/files/RRT599_1_44200d18-a9a3-4b1d-ae3d-89288ab86e97.png?v=1706613081";
      //   }
      //   // else {
      //   //    console.log("Change the src attribute for larger screens")
      //   //     img_hair_transpant2.src = "new_image_path_for_large_screen.jpg";
      //   // }
      // }
      // banner doctors_list
      let banner_text = document.querySelectorAll(".banner_text");
      banner_text.forEach((item) => {
        let tgtseptext = item.textContent;
        item.innerHTML = tgtseptext.replace(/%s/g, `${total_count}`);
      });
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    })
    .finally(() => {
      doctorsActions();
    });
  function doctorsActions() {
    let tgtsep = document.querySelectorAll(".sep_spacialisties");
    tgtsep.forEach((item) => {
      let tgtseptext = item.textContent;
      item.innerHTML = tgtseptext.replace(/:::/g, " | ");
    });
    let tgtEdu = document.querySelectorAll(".education_detail");
    tgtEdu.forEach((item) => {
      let tgtEduText = item.innerHTML;
      let modifiedText = tgtEduText.replace(/:::/g, "<br>").replace(/:::/g, "");
      item.innerHTML = modifiedText;
    });
    $(".dl-see-more").click(function () {
      $(this)
        .parent()
        .find(".education_detail")
        .removeClass("sep_detail_truncate");
      $(this).hide();
    });
  }
}
const page_no = page || 1;
doctors_list(page_no);
/* end paginate doctors list */

/* faq hair doctors */
let loadMore = document.querySelector(".loadMore");
let showMore = parseInt(
  document.querySelector(".faq-hair-doctors")?.getAttribute("show_faq")
);
let load_faq = document.querySelectorAll(".accordion-item");
let less;
if (loadMore) {
  loadMore.addEventListener("click", function () {
    less = loadMore.classList.contains("less");
    if (less) {
      loadMore.classList.remove("less");
      loadMore.innerText = "Show more";
      load_faq.forEach(function (faq, i) {
        if (showMore <= i) {
          faq.classList.add("hide");
        }
      });
    } else {
      loadMore.classList.add("less");
      loadMore.innerText = "Show less";
      load_faq.forEach(function (faq) {
        faq.classList.remove("hide");
      });
    }
  });
}
/* end faq hair doctors */

/* you may like */
if ($(".may_you_like").length > 0) {
  $(".may_you_like").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: "40px",
    arrows: false,
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}
/* end you may like */
