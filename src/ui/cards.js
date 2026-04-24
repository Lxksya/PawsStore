import { getCartQty } from "../state/store.js";
import { formatPrice, renderStars } from "../utils/format.js";

export function renderCatalogCard(product) {
  const inCart = getCartQty(product.id) > 0;

  return `
    <article class="product-card" data-id="${product.id}">
      <a class="product-media" href="#/product/${product.id}">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <span class="price-pill">${formatPrice(product.price)}</span>
      </a>
      <div class="product-hover-panel">
        <a class="product-name hover-name" href="#/product/${product.id}">${product.name}</a>
        <div class="rating-line">${renderStars(product.rating)} <small>(${product.reviews})</small></div>
        <div class="hover-actions">
          <strong>${formatPrice(product.price)}</strong>
          <button class="card-add-btn" data-action="add-product" data-id="${product.id}" aria-label="Добавить товар в корзину">
            ${inCart ? "✓" : "🛒"}
          </button>
        </div>
      </div>
      <div class="product-card-content">
        <a class="product-name" href="#/product/${product.id}">${product.name}</a>
        <div class="rating-line">${renderStars(product.rating)} <small>(${product.reviews})</small></div>
      </div>
      <div class="card-bottom-muted">
        <span>${product.name}</span>
        <div class="rating-line">${renderStars(product.rating)} <small>(${product.reviews})</small></div>
      </div>
    </article>
  `;
}
