function showSnapModal() {
  let modal = document.querySelector('#snap-modalon_page');
  if (modal) {
      modal.style.display = 'flex';
  } else {
      console.error('Modal element not found');
  }
}
function closeSnapPop() {
  document.getElementById('snap-modalon_page').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function spanPriceUpdate() {
   document.querySelectorAll('.snap_dp_value #dp').forEach((dpElement) => {
      dpElement.setAttribute('data-snap-price', prices / 100);
      let priceDevide = prices / 100;
      let roundedValue = Math.round(priceDevide / 3); // Rounds to the nearest whole number
      dpElement.innerHTML = roundedValue;
  });
  popPriceUpdate(prices);
}

function popPriceUpdate(price) {
  document.querySelectorAll('.popup_snap_dp_price').forEach((Element) => {
    let roundedValue = Math.round((price / 100) / 3);
    Element.innerHTML = roundedValue;
  });

  document.querySelector('.popup_snap_total_price').innerHTML = Math.round(price / 100);
  addDynamicPlanWidget();
  
}

function addDynamicPlanWidget() {
    let allDate = document.querySelectorAll('.enter_emi_date');
    if (allDate.length > 0) {
        for (let i = 1; i <= allDate.length; i++) {
            var curr_date = new Date().getDate();
            if (curr_date >= 1 && curr_date <= 23) {
                document.querySelector('.snap_emi_date_' + i).innerText = addMonths(new Date(), i);
            } else {
                if (curr_date >= 24 && curr_date <= 31) {
                    document.querySelector('.snap_emi_date_' + i).innerText = addMonths(new Date(), i + 1);
                }
            }
        }
    }
}

function addMonths(d, n) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dt = new Date(d.getTime());
    dt.setDate(28);
    dt.setMonth(dt.getMonth() + n);
    return month[dt.getMonth()];
}
