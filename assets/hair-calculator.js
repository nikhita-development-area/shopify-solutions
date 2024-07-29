const areaButtons = document.querySelectorAll(".area-btn");
const graftNeededSpan = document.getElementById("graft-needed");
const hairCountSpan = document.getElementById("hair-count");
const costContainerSpan = document.getElementById("cost-container");
const costContainerMobile = document.getElementById("cost-container_mobile");
const svgPaths = document.querySelectorAll("svg path[data-path]");
const rangeBar = document.getElementById("range-bar");
const inputSpan = document.querySelector(".inputSpan");
const calculateBtn = document.getElementById("calculate_btn");
const productCost = document.getElementById("product_cost").getAttribute("data-cost");
const Cost = document.getElementById("cost");
const CostMobile = document.getElementById("cost_mobile");
const pricingMobile = document.querySelector(".pricing-mobile");

let totalGrafts = 0;
let totalHairs = 0;
let totalCost = 0;
let selectedCount = 0;

const areaValues = {
  1: { grafts: 400, hairs: 650, cost: 50000 },
  2: { grafts: 1000, hairs: 1700, cost: 60000 },
  3: { grafts: 750, hairs: 1800, cost: 50000 },
  4: { grafts: 900, hairs: 2250, cost: 55000 },
  5: { grafts: 1900, hairs: 4750, cost: 95000 },
  6: { grafts: 600, hairs: 1600, cost: 45000 },
  7: { grafts: 600, hairs: 750, cost: 40000 },
};

function updateResults() {
  graftNeededSpan.textContent = totalGrafts;
  hairCountSpan.textContent = totalHairs;
  rangeBar.value = selectedCount;
  let inputWidth = 100 / 7 * selectedCount;
  inputSpan.style.width = `${inputWidth}%` ;
}

function formatNumberWithCommas(number) {
  let numStr = number.toString();
  let lastThree = numStr.slice(-3);
  let otherNumbers = numStr.slice(0, -3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

function updateCost() {
  var formattedTotalCost = formatNumberWithCommas(totalCost);
  var formattedCost = formatNumberWithCommas(totalCost - +productCost);

  costContainerSpan.textContent = formattedTotalCost;
  costContainerMobile.textContent = formattedTotalCost;
  Cost.textContent = formattedCost;
  CostMobile.textContent = formattedCost;
}

function initializeSelections() {
  document.querySelectorAll(".area-btn.selected").forEach((button) => {
    const area = button.getAttribute("data-area");
    const { grafts, hairs, cost } = areaValues[area];
    const path = document.querySelector(`svg path[data-path="${area}"]`);

    path.classList.add("selected");
    totalGrafts += grafts;
    totalHairs += hairs;
    totalCost += cost;
    selectedCount++;
  });

  updateResults();
}

areaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const area = button.getAttribute("data-area");
    const { grafts, hairs, cost } = areaValues[area];
    const path = document.querySelector(`svg path[data-path="${area}"]`);

    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      path.classList.remove("selected");
      totalGrafts -= grafts;
      totalHairs -= hairs;
      totalCost -= cost;
      selectedCount--;
    } else {
      button.classList.add("selected");
      path.classList.add("selected");
      totalGrafts += grafts;
      totalHairs += hairs;
      totalCost += cost;
      selectedCount++;
    }

    updateResults();
  });
});

calculateBtn.addEventListener("click", ()=>{
  updateCost();
})


calculateBtn.addEventListener("click", ()=>{
  pricingMobile.classList.remove("hidden");
  pricingMobile.scrollIntoView({ behavior: "smooth"});
  pricingMobile.style.paddingTop = '94px';
})

// Initialize with predefined selections for areas 2 and 4
initializeSelections();
updateCost();