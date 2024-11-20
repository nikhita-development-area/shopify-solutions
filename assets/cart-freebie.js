class CartFreeGift extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.cartAddFreebie();
  }

  cartAddFreebie() {
    fetch("/cart.js", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.processCartData(data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }

  processCartData(cart) {
    const cartSubtotal = cart.total_price / 100;
    const cartAjax = document.querySelector("cart-drawer#mini-cart");
    debugger
    if (cartAjax) {
      const offer1FreebieValue = parseFloat(cartAjax.getAttribute("data-eligible-price-1"));
      const offer2FreebieValue = parseFloat(cartAjax.getAttribute("data-eligible-price-2"));
      const offer3FreebieValue = parseFloat(cartAjax.getAttribute("data-eligible-price-3"));

      const eligibleVariantId1 = cartAjax.getAttribute("data-eligible-variantIds-1");
      const eligibleVariantId2 = cartAjax.getAttribute("data-eligible-variantIds-2");
      const eligibleVariantId3 = cartAjax.getAttribute("data-eligible-variantIds-3");
      
      // Determine which freebie, if any, should be added
      if (cartSubtotal >= offer3FreebieValue) {
        this.removeFreebies([eligibleVariantId1, eligibleVariantId2]);
        this.addOrReplaceFreebie(eligibleVariantId3);
      } else if (cartSubtotal >= offer2FreebieValue) {
        this.removeFreebies([eligibleVariantId1, eligibleVariantId3]);
        this.addOrReplaceFreebie(eligibleVariantId2);
      } else if (cartSubtotal >= offer1FreebieValue) {
        this.removeFreebies([eligibleVariantId2, eligibleVariantId3]);
        this.addOrReplaceFreebie(eligibleVariantId1);
      } else {
        // If subtotal is below all offer thresholds, remove any freebies
        this.removeFreebies([eligibleVariantId1, eligibleVariantId2, eligibleVariantId3]);
      }
    }
  }

  addOrReplaceFreebie(variantId) {
    this.removeFreebies([variantId]); // Ensure we don't add duplicates of the same freebie
    debugger
    const formData = {
      items: [{ id: variantId, quantity: 1, properties: { _freebieItem: "true" } }],
      sections: "mini-cart",
    };

    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        this.updateCartDrawer(data.sections["mini-cart"]);
        this.showToaster("Free Gift Added!");
      })
      .catch((error) => console.error("Error adding item to cart:", error));
  }

  removeFreebies(variantIds) {
    const updates = {};
    variantIds.forEach((id) => {
      updates[id] = 0; // Set quantity to 0 to remove item from cart
    });

    const data = { updates, sections: "mini-cart" };

    fetch("/cart/update.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.updateCartDrawer(data.sections["mini-cart"]);
      })
      .catch((error) => console.error("Error removing item from cart:", error));
  }

  updateCartDrawer(cartSectionHtml) {
    const cartDrawer = document.querySelector("#shopify-section-mini-cart");
    if (cartDrawer) {
      cartDrawer.innerHTML = cartSectionHtml;
      document.querySelector("#mini-cart").setAttribute("open", "true");
    }
  }

  showToaster(message) {
    const giftToaster = document.querySelector(".free-gift-toaster");
    giftToaster.innerHTML = message;
    giftToaster.setAttribute("open", "true");
    setTimeout(() => this.hideToaster(), 3000);
  }

  hideToaster() {
    document.querySelector(".free-gift-toaster").removeAttribute("open");
  }
}

customElements.define("cart-free-gift", CartFreeGift);
