let urlHT = window.location.href;
let pathnameHT = new URL(urlHT).pathname;
let partsHT = pathnameHT.split("/");
let cityNameHT = partsHT[partsHT.length - 1];

async function fetchDoctorList() {
  try {
    let apiurl;
    if (pathnameHT.includes("hair-transplant")) {
      apiurl = `https://public-jgfas325.hav-g.in/getdoctors/${cityNameHT}?type=hair-transplant-doctors&pageNumber=1&pageSize=12`;
    }
    const response = await fetch(apiurl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.doctorRecords;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null; // Or handle the error as needed
  }
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

fetchDoctorList().then((doctorRecords) => {
  if (doctorRecords) {
    const chunks = chunkArray(doctorRecords, 3);
    chunks.forEach((chunk, index) => {
      // Get the corresponding div element
      const divId = `hair_trasplant_${index + 1}`;
      const divElement = document.getElementById(divId);
      if (divElement) {
        // Clear existing content if needed
        divElement.innerHTML = "";

        // Append each doctor's information to the div
        chunk.forEach((doctor) => {
          const doctorInfo = `
                        <div class="doctor_deatils_main ht_main">
                          <div class="doc_details_top_ht">
                            <div class="doc_detail_left_ht">
                              <h3 class="doc_name_ht mb-0"><strong>${doctor.doctor_name}</strong></h3>
                              <p class="doc_profile_ht">${doctor.doctor_profile}</p>
                              <p class="doc_exp_ht">${doctor.doctor_experiences}</p>
                              <p class="doc_fee_ht">${doctor.doctor_fee} Consultation Fees </p>
                            </div>
                            <div class="doc_detail_right_ht">
                              <p class="doc_add_details_ht">${doctor.address_details}</p>
                            </div>
                          </div>
                        </div>
                    `;
          divElement.innerHTML += doctorInfo;
        });
      }
    });
  } else {
    console.log("Failed to fetch doctor records.");
  }
});

// for infinite scroll

let pageNumber = 5; // Initial page number
const pageSize = 3; // Page size can be changed as needed
const contentDiv = document.getElementById("content");
const loadingDiv = document.getElementById("loading");
const targetSection = document.getElementById("target-section");
let isLoading = false;
let hasMoreData = true;
let nextBannerType = 1;

function createBanner1() {
  const bannerElement = document.createElement("div");
  bannerElement.innerHTML = `
    <div class="holistic_plan_container">
  <div class="holistic_plan_main">
    <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
      .substring(1)
      .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2" id="htcard2">
      <div class="holistic_heading">Traya's Holistic Plan for Hair Regrowth</div>
    </a>
    <div class="holistic_svg_wrapper">
      <div class="holistic_aayurveda">
        <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
          .substring(1)
          .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2" id="htcard2">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
              <circle cx="32.5" cy="32" r="32" fill="#CADDAF"></circle>
              <path d="M21.384 14.9327C21.4268 14.7729 21.5008 14.6232 21.6015 14.492C21.7022 14.3608 21.8278 14.2508 21.9711 14.1682C22.1144 14.0856 22.2726 14.0321 22.4366 14.0106C22.6006 13.9892 22.7672 14.0003 22.9269 14.0433L22.9488 14.0492C23.234 14.1423 25.8419 15.7723 29.6234 17.569C34.4436 19.8584 40.8545 22.7973 43.3673 27.2442C47.1658 33.9656 45.9175 39.3597 39.6679 43.296L42.2326 47.8344C42.3053 47.9562 42.353 48.0914 42.3728 48.2319C42.3925 48.3724 42.384 48.5154 42.3476 48.6526C42.3113 48.7897 42.2478 48.9183 42.161 49.0305C42.0742 49.1428 41.9659 49.2365 41.8423 49.3063C41.7187 49.376 41.5825 49.4203 41.4415 49.4366C41.3006 49.4528 41.1578 49.4408 41.0215 49.401C40.8853 49.3612 40.7585 49.2946 40.6484 49.2051C40.5383 49.1156 40.4473 49.0049 40.3806 48.8796L37.8155 44.3411C31.2195 47.6647 25.9544 45.9517 22.1559 39.2303C17.6682 31.2965 21.2292 15.5976 21.384 14.9327ZM25.0958 38.0328C28.2766 43.6603 31.1852 44.9478 36.6155 42.2219L34.2306 38.0014L29.8155 37.3733C29.6752 37.356 29.5398 37.3109 29.4171 37.2407C29.2945 37.1705 29.187 37.0765 29.1011 36.9643C29.0152 36.852 28.9525 36.7238 28.9166 36.5871C28.8808 36.4504 28.8725 36.3079 28.8924 36.168C28.9122 36.028 28.9597 35.8934 29.0321 35.772C29.1046 35.6507 29.2005 35.5449 29.3142 35.461C29.4279 35.3771 29.5572 35.3167 29.6946 35.2833C29.8319 35.2499 29.9746 35.2443 30.1141 35.2666L32.9087 35.6648L30.3281 31.0989C30.2007 30.8541 30.1734 30.5693 30.252 30.3048C30.3305 30.0402 30.5088 29.8165 30.7492 29.6809C30.9895 29.5453 31.2732 29.5083 31.5402 29.5779C31.8073 29.6475 32.0369 29.8181 32.1806 30.0537L38.467 41.1773C40.3164 40.0087 42.3067 39.3004 43.1025 37.8203C44.5155 35.1899 43.5823 31.4537 41.5472 27.8524C39.2414 23.7713 32.8734 21.8691 28.2492 19.7399C26.2221 18.8057 24.616 17.2449 23.4823 16.8254C23.1483 18.5778 21.5244 22.2971 21.3278 25.9024C21.0854 30.322 23.2673 34.7993 25.0943 38.0328H25.0958Z" fill="#577432"></path>
            </svg>
          </span>
        </a>
        <h3 class="aayurveda_heading">Ayurveda</h3>
      </div>
      <span class="holistic_plus_logo_first">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="94" viewBox="0 0 11 94" fill="none">
          <path d="M5.25 37C4.87482 37 4.60065 36.9494 4.42749 36.8482C4.25433 36.7325 4.1461 36.5879 4.10281 36.4143C4.05952 36.2263 4.03788 36.0239 4.03788 35.8069V28.1714C4.03788 27.9544 4.05952 27.7592 4.10281 27.5857C4.1461 27.3977 4.25433 27.2531 4.42749 27.1518C4.61508 27.0506 4.89646 27 5.27165 27C5.64683 27 5.91378 27.0578 6.07251 27.1735C6.24567 27.2748 6.3539 27.4194 6.39719 27.6074C6.44048 27.7809 6.46212 27.9834 6.46212 28.2148V35.7852C6.46212 36.0166 6.44048 36.2263 6.39719 36.4143C6.3539 36.5879 6.24567 36.7325 6.07251 36.8482C5.91378 36.9494 5.63961 37 5.25 37ZM1.39719 33.2256C1.19517 33.2256 1.00036 33.2039 0.812771 33.1605C0.63961 33.1171 0.502525 33.0087 0.401515 32.8351C0.300505 32.6616 0.25 32.3868 0.25 32.0108C0.25 31.6204 0.300505 31.3384 0.401515 31.1649C0.516955 30.9913 0.66847 30.8829 0.856061 30.8395C1.04365 30.7961 1.24567 30.7744 1.46212 30.7744H9.05952C9.27597 30.7744 9.47078 30.7961 9.64394 30.8395C9.83153 30.8829 9.97583 30.9913 10.0768 31.1649C10.1923 31.3384 10.25 31.6204 10.25 32.0108C10.25 32.3868 10.1923 32.6616 10.0768 32.8351C9.97583 33.0087 9.83875 33.1171 9.66558 33.1605C9.49242 33.2039 9.29762 33.2256 9.08117 33.2256H1.39719Z" fill="#414042"></path>
        </svg>
      </span>
      <div class="holistic_dermatology">
        <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
          .substring(1)
          .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2" id="htcard2">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#E2DCEA"></circle>
              <path d="M32.263 48.5433C40.2167 48.0965 44.0224 43.8387 43.5757 35.885C43.2672 30.3922 36.4302 22.1967 35.2703 20.4086C34.8407 19.7461 31.471 15.5044 31.2846 15.3229C31.0414 15.1016 30.7202 14.9859 30.3917 15.0014C30.0632 15.0168 29.7542 15.1621 29.5328 15.4053L29.5181 15.422C29.2847 15.7074 23.9685 24.7523 23.6684 25.1814C23.3251 25.6679 19.3776 33.1817 19.6052 37.2322C19.8013 40.6921 19.7817 43.9161 21.3928 45.8116C24.019 48.9003 27.7698 48.7954 32.263 48.5433ZM30.8408 18.4008C31.3994 18.289 34.7009 23.7312 35.7127 24.7979C36.7244 25.8646 40.9759 32.4117 41.1785 36.0198C41.3126 37.8429 40.9447 39.6679 40.1147 41.2967C39.2847 42.9254 38.0243 44.2956 36.4704 45.2584C35.5224 45.817 32.6784 46.354 29.9674 46.5061C23.2485 46.8837 21.5885 44.0338 22.0034 37.0958C22.3986 30.4648 30.2832 18.5121 30.8413 18.4008H30.8408Z" fill="#4E2F7B"></path>
              <path d="M26.0039 39.3479C26.1343 39.6088 26.2295 40.5318 26.3962 40.9173C26.5975 41.3853 26.8992 41.8034 27.28 42.142C27.6608 42.4806 28.1113 42.7313 28.5997 42.8765C28.6634 42.8902 30.557 42.5626 31.0322 42.2233C31.1465 42.1419 31.887 42.7946 31.783 42.9741C31.5349 43.4027 30.401 43.776 29.2363 43.8569C28.7459 43.8902 27.1794 43.8078 26.3472 43.2684C25.8635 42.5523 25.4371 41.7991 25.0721 41.0158C24.9672 40.4014 24.9074 39.7802 24.8931 39.1571C24.8931 39.1571 25.8734 39.0865 26.0039 39.3479Z" fill="#4E2F7B"></path>
            </svg>
          </span>
        </a>
        <h3 class="dermatology_heading">Dermatology</h3>
      </div>
      <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
        .substring(1)
        .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2">
        <span class="holistic_plus_logo_first" id="htcard2">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="94" viewBox="0 0 11 94" fill="none">
            <path d="M5.25 37C4.87482 37 4.60065 36.9494 4.42749 36.8482C4.25433 36.7325 4.1461 36.5879 4.10281 36.4143C4.05952 36.2263 4.03788 36.0239 4.03788 35.8069V28.1714C4.03788 27.9544 4.05952 27.7592 4.10281 27.5857C4.1461 27.3977 4.25433 27.2531 4.42749 27.1518C4.61508 27.0506 4.89646 27 5.27165 27C5.64683 27 5.91378 27.0578 6.07251 27.1735C6.24567 27.2748 6.3539 27.4194 6.39719 27.6074C6.44048 27.7809 6.46212 27.9834 6.46212 28.2148V35.7852C6.46212 36.0166 6.44048 36.2263 6.39719 36.4143C6.3539 36.5879 6.24567 36.7325 6.07251 36.8482C5.91378 36.9494 5.63961 37 5.25 37ZM1.39719 33.2256C1.19517 33.2256 1.00036 33.2039 0.812771 33.1605C0.63961 33.1171 0.502525 33.0087 0.401515 32.8351C0.300505 32.6616 0.25 32.3868 0.25 32.0108C0.25 31.6204 0.300505 31.3384 0.401515 31.1649C0.516955 30.9913 0.66847 30.8829 0.856061 30.8395C1.04365 30.7961 1.24567 30.7744 1.46212 30.7744H9.05952C9.27597 30.7744 9.47078 30.7961 9.64394 30.8395C9.83153 30.8829 9.97583 30.9913 10.0768 31.1649C10.1923 31.3384 10.25 31.6204 10.25 32.0108C10.25 32.3868 10.1923 32.6616 10.0768 32.8351C9.97583 33.0087 9.83875 33.1171 9.66558 33.1605C9.49242 33.2039 9.29762 33.2256 9.08117 33.2256H1.39719Z" fill="#414042"></path>
          </svg>
        </span>
      </a>
      <div class="holistic_nutrition">
        <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
          .substring(1)
          .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2" id="htcard2">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
              <circle cx="32.5" cy="32" r="32" fill="#D3EDE0"></circle>
              <path d="M27.9611 21.2083C28.2944 21.0341 28.5866 20.7906 28.8179 20.4941C29.0492 20.1975 29.2143 19.8549 29.3021 19.4892C29.3899 19.1236 29.3984 18.7433 29.3269 18.3741C29.2555 18.0048 29.1058 17.6552 28.8879 17.3487C28.67 17.0422 28.3889 16.7859 28.0637 16.5971C27.7384 16.4083 27.3765 16.2913 27.0023 16.2541C26.6281 16.2169 26.2502 16.2603 25.8941 16.3813C25.5381 16.5024 25.2121 16.6983 24.9381 16.9559C24.8962 16.9681 24.8802 17.0296 24.8447 17.0619C23.6624 16.2415 22.2228 15.8772 20.7925 16.0366C19.3622 16.196 18.0381 16.8683 17.0654 17.9289C16.0927 18.9895 15.5372 20.3666 15.5018 21.8053C15.4664 23.244 15.9535 24.6468 16.8729 25.754C16.7887 26.1872 16.7907 26.6327 16.8787 27.0652C16.9667 27.4976 17.1391 27.9085 17.3859 28.2743C17.6327 28.6402 17.9491 28.9538 18.3172 29.1974C18.6852 29.4409 19.0976 29.6096 19.5308 29.6938C19.964 29.7779 20.4096 29.7759 20.842 29.6879C21.2744 29.5999 21.6853 29.4276 22.0511 29.1807C22.417 28.9339 22.7306 28.6175 22.9742 28.2495C23.2177 27.8815 23.3864 27.469 23.4706 27.0358L25.5268 28.5739C25.968 29.0512 27.1242 30.5076 28.8558 28.9383L31.1698 26.9229L31.2011 26.9134C31.2943 26.8254 31.3534 26.7072 31.3679 26.5799C31.3824 26.4525 31.3513 26.3241 31.2801 26.2175L27.9611 21.2083ZM29.287 27.2066L26.3223 24.0356C26.2233 23.9323 26.0876 23.8721 25.9446 23.8681C25.8015 23.8641 25.6627 23.9166 25.5581 24.0142C25.4534 24.1119 25.3915 24.2468 25.3856 24.3897C25.3798 24.5327 25.4305 24.6723 25.5268 24.7781L28.2905 27.7646L26.8161 28.1963L23.2934 25.5731C23.2109 25.4986 23.1072 25.4516 22.9967 25.4386C22.8862 25.4257 22.7745 25.4475 22.6769 25.5009C22.5794 25.5544 22.5009 25.6369 22.4524 25.737C22.4038 25.8371 22.3877 25.9498 22.4061 26.0594C22.458 26.3994 22.4321 26.7466 22.3304 27.0751C22.2288 27.4035 22.054 27.7047 21.8192 27.9559C21.5844 28.2071 21.2957 28.4018 20.9748 28.5253C20.6539 28.6489 20.3092 28.698 19.9665 28.6692C19.6239 28.6403 19.2923 28.5342 18.9966 28.3587C18.7009 28.1832 18.4488 27.943 18.2593 27.6561C18.0698 27.3692 17.9479 27.043 17.9026 26.7022C17.8573 26.3614 17.8898 26.0147 17.9978 25.6882L17.9872 25.6516C18.0009 25.5818 18.0047 25.5104 17.9983 25.4395C17.9734 25.299 17.8941 25.174 17.7777 25.0916C17.331 24.8008 17.0005 24.3625 16.8439 23.853C16.6874 23.3436 16.7146 22.7953 16.9209 22.3039C17.1272 21.8125 17.4995 21.409 17.9729 21.164C18.4462 20.919 18.9905 20.848 19.5109 20.9633C19.6088 20.9827 19.7101 20.9746 19.8036 20.9399L19.9129 20.9081C20.0387 20.8387 20.132 20.7223 20.1722 20.5844C20.2125 20.4464 20.1965 20.2981 20.1277 20.172C19.9753 19.8972 19.8815 19.5937 19.8521 19.2809C19.8228 18.968 19.8586 18.6525 19.9573 18.3541C20.0561 18.0558 20.2155 17.7811 20.4256 17.5475C20.6358 17.3138 20.8921 17.1263 21.1783 16.9966C21.4645 16.8669 21.7745 16.798 22.0887 16.7941C22.403 16.7902 22.7146 16.8515 23.004 16.974C23.2933 17.0966 23.5541 17.2777 23.77 17.5061C23.9859 17.7344 24.1521 18.0051 24.2581 18.3009C24.283 18.3905 24.3349 18.4703 24.4069 18.5293C24.4789 18.5883 24.5674 18.6235 24.6602 18.6302L24.7386 18.6466C24.8503 18.6529 24.9612 18.6246 25.0562 18.5654C25.1511 18.5063 25.2254 18.4193 25.269 18.3162C25.3615 18.0582 25.5202 17.829 25.7293 17.6516C25.9383 17.4743 26.1903 17.355 26.46 17.3058C26.7296 17.2565 27.0076 17.2791 27.2658 17.3711C27.524 17.4632 27.7534 17.6215 27.9312 17.8302C28.1089 18.0389 28.2286 18.2907 28.2783 18.5603C28.3281 18.8299 28.306 19.1078 28.2144 19.3662C28.1229 19.6245 27.965 19.8543 27.7566 20.0324C27.5482 20.2105 27.2966 20.3307 27.0271 20.3809C26.8856 20.4066 26.76 20.4875 26.678 20.6057C26.5961 20.724 26.5645 20.87 26.5901 21.0115C26.6106 21.1113 26.659 21.2033 26.7296 21.2767L30.1345 26.3952L29.287 27.2066Z" fill="#38745A" stroke="#38745A" stroke-width="1.03997" stroke-miterlimit="10"></path>
              <path d="M46.3811 35.0604C46.1001 36.9553 44.4414 44.6936 42.6758 45.7752C39.4418 47.7562 35.2391 49.0761 31.5618 48.8927C28.4511 48.7364 25.3065 47.4568 22.4805 46.0044C18.6157 44.0192 19.5464 41.4289 19.01 37.6741C28.0564 37.1698 38.5327 35.8449 50.8731 36.803C52.2779 36.9122 52.3273 34.5318 50.9112 34.6061C41.3834 35.1049 26.212 33.46 16.6897 34.1399C16.4825 34.1592 16.284 34.2328 16.1142 34.3531C15.9444 34.4735 15.8092 34.6365 15.7224 34.8256C15.6355 35.0148 15.6 35.2235 15.6194 35.4307C15.6388 35.638 15.7124 35.8365 15.8328 36.0062C16.2743 38.5768 16.2606 41.1222 17.2509 43.5768C17.9459 45.2993 19.4208 46.6916 20.9566 47.6654C24.1819 49.7106 28.4048 49.7743 32.0895 49.9577C36.4068 50.1755 40.9607 49.5983 44.6156 47.1327C48.6156 44.4337 47.9266 39.4764 48.5762 35.0962C48.7857 33.6997 46.586 33.6814 46.3811 35.0604Z" fill="#38745A"></path>
              <path d="M39.1354 26.7131C38.2827 27.366 37.3829 27.955 36.4434 28.4754L36.0335 28.7088C35.9438 28.752 35.8409 28.7592 35.746 28.729C35.6511 28.6988 35.5714 28.6335 35.5231 28.5464C35.4748 28.4593 35.4616 28.3571 35.4863 28.2606C35.5109 28.1641 35.5715 28.0807 35.6557 28.0275L36.0656 27.7942C36.894 27.3355 37.6904 26.8215 38.4496 26.2555C38.3744 25.6664 38.1447 23.1545 39.5696 21.5471C41.1591 19.7555 44.118 19.8715 44.2418 19.876C44.332 19.8833 44.4168 19.9217 44.4819 19.9845C44.5469 20.0474 44.5882 20.1309 44.5985 20.2208C44.62 20.3446 45.0863 23.2682 43.4982 25.0599C42.1911 26.5269 39.9414 26.7007 39.1354 26.7131ZM43.8764 20.6614C43.1122 20.6857 41.2141 20.8695 40.1441 22.0643C39.1776 23.1453 39.1263 24.8151 39.1772 25.6834C40.16 24.8818 41.0683 23.993 41.8913 23.028L42.1906 22.675C42.2238 22.6358 42.2643 22.6036 42.3098 22.5801C42.3554 22.5566 42.4051 22.5423 42.4562 22.5381C42.5073 22.5338 42.5587 22.5397 42.6076 22.5553C42.6564 22.5709 42.7017 22.596 42.7408 22.6291C42.7799 22.6622 42.8122 22.7027 42.8356 22.7483C42.8591 22.7939 42.8734 22.8436 42.8777 22.8947C42.8819 22.9458 42.8761 22.9972 42.8605 23.046C42.8448 23.0949 42.8198 23.1401 42.7866 23.1793L42.496 23.5318C41.7958 24.35 41.036 25.1153 40.2229 25.8214C41.2437 25.6973 42.1948 25.2391 42.9278 24.518C43.9883 23.3315 43.9424 21.4183 43.8764 20.6586V20.6614Z" fill="#38745A" stroke="#38745A" stroke-width="0.6" stroke-miterlimit="10"></path>
            </svg>
          </span>
        </a>
        <h3 class="nutrition_heading">Nutrition</h3>
      </div>
    </div>
      <a href="https://form.traya.health/questions?cohort=1&amp;location=card1&amp;page=${window.location.pathname
        .substring(1)
        .replaceAll("/", "_")}&utm_campaign=blogs_ht_card2" id="htcard2">
        <div class="holistic_sub_heading">Traya's approach combines the power of 3 Sciences to holistically regrow hair. 93% Saw Results in 5 months</div>
      </a>
  </div>
</div>
  `;
  return bannerElement;
}

function createBanner2() {
  const bannerElement = document.createElement("div");
  bannerElement.innerHTML = `
    <div>
      <div class="blog-banner-one">
        <div class="blog-content">
          <div class="heading_banner">
            <a href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
              .substring(1)
              .replaceAll("/", "_")}&utm_campaign=blogs_ht_card1" id="htcard1">
              <h1>Transplant can't solve your Problem</h1>
            </a>
          </div>
          <div class="paragraph_banner">
            <a href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
              .substring(1)
              .replaceAll("/", "_")}&utm_campaign=blogs_ht_card1" id="htcard1">
              <p>67,000+ people avoided Hair Transplant by finding the Root Cause of Hair Loss</p>
            </a>
          </div>
          <div class="banner_one_btn">
          <a href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
            .substring(1)
            .replaceAll("/", "_")}&utm_campaign=blogs_ht_card1" class="btn" id="htcard1">
            FIND THE ROOT CAUSE
          </a>
          </div>
        </div>
        <div class="blog-images">
          <a  href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
            .substring(1)
            .replaceAll("/", "_")}&utm_campaign=blogs_ht_card1" id="htcard1">
            <img
              src="https://cdn.shopify.com/s/files/1/0100/1622/7394/files/desktop_image_700x_3a31c423-f6f4-4e6e-8e40-b6f101b7d4a9.png?v=1719942760"
              alt="Desktop Image"
              class="desktop-image"
              width=""
              height="">
          </a>
          <a  href="https://form.traya.health/questions?cohort=1&amp;location=card2&amp;page=${window.location.pathname
            .substring(1)
            .replaceAll("/", "_")}&utm_campaign=blogs_ht_card1" id="htcard1">
            <img
              src="https://cdn.shopify.com/s/files/1/0100/1622/7394/files/desktop_image_700x_3a31c423-f6f4-4e6e-8e40-b6f101b7d4a9.png?v=1719942760"
              alt="Mobile Image"
              class="mobile-image"
              width=""
              height="">
          </a>
        </div>
      </div>
    </div>
  `;
  return bannerElement;
}

function fetchMoreContent() {
  if (isLoading || !hasMoreData) return;
  isLoading = true;
  loadingDiv.style.display = "flex";

  // Delay for at least 2 seconds
  setTimeout(() => {
    fetch(
      `https://public-jgfas325.hav-g.in/getdoctors/${cityNameHT}?type=hair-transplant-doctors&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.doctorRecords.length === 0) {
          hasMoreData = false; // No more data to load
        } else {
          data.doctorRecords.forEach((doctor) => {
            const doctorElement = document.createElement("div");
            doctorElement.innerHTML = `
                          <div class="doctor_deatils_main">
                            <div class="doc_details_top_ht">
                              <div class="doc_detail_left_ht">
                                <h3 class="doc_name_ht mb-0"><strong>${doctor.doctor_name}</strong></h3>
                                <p class="doc_profile_ht">${doctor.doctor_profile}</p>
                                <p class="doc_exp_ht">${doctor.doctor_experiences}</p>
                                <p class="doc_fee_ht">${doctor.doctor_fee} Consultation Fees </p>
                              </div>
                              <div class="doc_detail_right_ht">
                                <p class="doc_add_details_ht">${doctor.address_details}</p>
                              </div>
                            </div>
                          </div>
                      `;
            contentDiv.appendChild(doctorElement);
          });

          let bannerElement;
          if (nextBannerType === 1) {
            bannerElement = createBanner1();
            nextBannerType = 2;
          } else {
            bannerElement = createBanner2();
            nextBannerType = 1;
          }
          contentDiv.appendChild(bannerElement);
          pageNumber++; // Increment the page number for the next load
        }
        loadingDiv.style.display = "none";
        isLoading = false;
      })
      .catch((error) => {
        console.error("Error fetching more content:", error);
        loadingDiv.style.display = "none";
        isLoading = false;
      });
  }, 1000); // Delay of 2 seconds before fetching content
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  // Check if the element is even partially in the viewport
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  return (vertInView && horInView);
}

document.addEventListener("scroll", function () {
  if (isElementInViewport(targetSection)) {
    fetchMoreContent();
  }
});

// Initial load
fetchMoreContent();
