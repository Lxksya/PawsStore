import { getCartItems, getState } from "../state/store.js";
import { formatPrice } from "../utils/format.js";

function renderCartRow(item) {
  const lineTotal = item.qty * item.price;

  return `
    <article class="cart-row">
      <img src="${item.images[0]}" alt="${item.name}" onerror="this.onerror=null;this.src='./src/assets/products/fallback.svg';" />
      <div>
        <h3>${item.name}</h3>
        <p>${item.subtitle}</p>
      </div>
      <div class="qty-control">
        <button data-action="qty-minus" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button data-action="qty-plus" data-id="${item.id}">+</button>
      </div>
      <div class="cart-prices">
        <strong>${formatPrice(lineTotal)}</strong>
        <small>${formatPrice(item.price)} each</small>
      </div>
      <button class="icon-btn" data-action="remove-item" data-id="${item.id}" aria-label="Удалить товар">🗑</button>
    </article>
  `;
}

export function renderCartPage() {
  const items = getCartItems();

  if (items.length === 0) {
    return `
      <section class="container empty-cart-page">
        <div class="empty-icon">👜</div>
        <h1>Your cart is empty</h1>
        <p>Discover amazing products for your furry friends!</p>
        <a class="btn btn-primary" href="#/catalog">Start Shopping</a>
      </section>
    `;
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const isDiscountApplied = getState().promoCode === "SAVE10";
  const discount = isDiscountApplied ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  return `
    <section class="container cart-page">
      <div class="cart-heading">
        <h1>Shopping Bag</h1>
        <p>${items.length} item${items.length > 1 ? "s" : ""} ready for checkout</p>
      </div>

      <div class="cart-steps">
        <span class="active">1 Cart</span>
        <span>2 Checkout</span>
        <span>3 Complete</span>
      </div>

      <div class="shipping-banner">
        <span>🏷 Free shipping on orders over <strong>$50</strong></span>
        <strong class="ok">✔ Qualified!</strong>
      </div>

      <div class="cart-layout">
        <section class="cart-list">
          ${items.map((item) => renderCartRow(item)).join("")}
        </section>

        <aside class="order-summary">
          <div class="summary-head">
            <h2>Order Summary</h2>
            <p>${items.length} items in your bag</p>
          </div>

          <form id="promoForm" class="promo-form">
            <label for="promoInput">Promo Code</label>
            <div>
              <input id="promoInput" name="promo" type="text" value="${getState().promoCode}" placeholder="Enter code" />
              <button class="btn btn-dark" type="submit">Apply</button>
            </div>
            <p class="promo-message" id="promoMessage"></p>
          </form>

          <dl class="totals">
            <div><dt>Subtotal</dt><dd>${formatPrice(subtotal)}</dd></div>
            <div><dt>Tax (8%)</dt><dd>${formatPrice(tax)}</dd></div>
            <div ${isDiscountApplied ? "" : "hidden"}><dt>Discount</dt><dd>−${formatPrice(discount)}</dd></div>
          </dl>

          <div class="total-line">
            <span>Total</span>
            <strong>${formatPrice(total)}</strong>
          </div>

          <button class="btn btn-primary full" type="button">Proceed to Checkout</button>
          <a class="continue-link" href="#/catalog">← Continue Shopping</a>
        </aside>
      </div>
    </section>
  `;
}
