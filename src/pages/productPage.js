import { getCartQty, getState } from "../state/store.js";
import { formatPrice, renderStars } from "../utils/format.js";

export function renderProductPage(product) {
  const state = getState();
  const imageIndex = state.ui.currentImageIndex;
  const activeImage = product.images[imageIndex] || product.images[0];
  const qty = Math.max(getCartQty(product.id), 1);
  const isInCart = getCartQty(product.id) > 0;

  return `
    <section class="container product-page">
      <nav class="crumbs"><a href="#/catalog">Home</a> › <a href="#/catalog">${product.category}</a> › ${product.name}</nav>
      <div class="product-layout">
        <div class="product-gallery-box">
          <img class="product-main-image" src="${activeImage}" alt="${product.name}" />
          <div class="thumb-row">
            ${product.images
              .map(
                (img, index) => `
                  <button class="thumb ${index === imageIndex ? "active" : ""}" data-action="set-image" data-index="${index}">
                    <img src="${img}" alt="${product.name} ${index + 1}" />
                  </button>`
              )
              .join("")}
          </div>
          <div class="slider-controls">
            <button class="btn btn-muted" data-action="image-prev">←</button>
            <button class="btn btn-muted" data-action="image-next">→</button>
          </div>
        </div>

        <div class="product-info-box">
          <span class="tag">${product.category}</span>
          <h1>${product.name}</h1>
          <div class="rating-line">${renderStars(product.rating)} <small>${product.rating} out of 5 stars</small></div>
          <div class="product-price">${formatPrice(product.price)}</div>

          <section class="highlight-box">
            <h3>Key Highlights</h3>
            <ul>${product.highlights.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>

          <section>
            <h3>Description</h3>
            <p>${product.description}</p>
          </section>

          <div class="qty-row">
            <span>Quantity:</span>
            <div class="qty-control">
              <button data-action="qty-minus" data-id="${product.id}">−</button>
              <span>${qty}</span>
              <button data-action="qty-plus" data-id="${product.id}">+</button>
            </div>
          </div>

          <button class="btn btn-primary full" data-action="add-product" data-id="${product.id}">${isInCart ? "Already in Cart" : "Add to Cart"}</button>

          <section class="accordion-block">
            <button class="accordion-trigger" data-action="toggle-accordion" data-section="specs" aria-expanded="${state.ui.openAccordions.specs}">Technical Specifications</button>
            <div class="accordion-panel ${state.ui.openAccordions.specs ? "open" : ""}">
              <div class="spec-grid">
                ${product.specs.map(([title, value]) => `<article class="spec-item"><small>${title}</small><strong>${value}</strong></article>`).join("")}
              </div>
            </div>
          </section>

          <section class="accordion-block">
            <button class="accordion-trigger" data-action="toggle-accordion" data-section="description" aria-expanded="${state.ui.openAccordions.description}">Расширенное описание</button>
            <div class="accordion-panel ${state.ui.openAccordions.description ? "open" : ""}">
              <p>${product.extendedDescription}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}
