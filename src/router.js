import {
  getProductById,
  getState,
  resetProductUiState,
  setAccordion,
  setCartQty,
  setCurrentImageIndex,
  setFilterSort,
  setPriceRange,
  setPromoCode,
  toggleAccordion,
  toggleRatingFilter
} from "./state/store.js";
import { appEls } from "./ui/dom.js";
import { renderCatalogPage } from "./pages/catalogPage.js";
import { renderProductPage } from "./pages/productPage.js";
import { renderCartPage } from "./pages/cartPage.js";
import { closeOverlays, openMenu, renderShell, syncCartBadge } from "./ui/shell.js";
import { showToast } from "./ui/toast.js";

function getProductIdFromHash() {
  if (!window.location.hash.startsWith("#/product/")) {
    return null;
  }
  return window.location.hash.split("/")[2];
}

function renderRoute() {
  const hash = window.location.hash || "#/catalog";

  if (hash === "#/catalog" || hash === "#/") {
    appEls.app.innerHTML = renderCatalogPage();
    return;
  }

  if (hash.startsWith("#/product/")) {
    const productId = getProductIdFromHash();
    const product = getProductById(productId);

    if (!product) {
      appEls.app.innerHTML = `
        <section class="container" style="padding:2rem 0 3rem;">
          <h1>Товар не найден</h1>
          <a href="#/catalog" class="btn btn-primary">Вернуться в каталог</a>
        </section>
      `;
      return;
    }

    appEls.app.innerHTML = renderProductPage(product);
    return;
  }

  if (hash === "#/cart") {
    appEls.app.innerHTML = renderCartPage();
    return;
  }

  appEls.app.innerHTML = `
    <section class="container" style="padding:2rem 0 3rem;">
      <h1>About</h1>
      <p>PawsStore demo page</p>
    </section>
  `;
}

function updateAndRender() {
  renderRoute();
  syncCartBadge();
}

function addProductToCart(productId) {
  const currentQty = getState().cart[productId] || 0;
  setCartQty(productId, currentQty + 1);
  const product = getProductById(productId);
  if (product) {
    showToast(`Added 1 ${product.name} to cart`);
  }
  syncCartBadge();
  renderRoute();
}

function removeProductFromCart(productId) {
  const product = getProductById(productId);
  setCartQty(productId, 0);
  if (product) {
    showToast(`${product.name} removed from cart`);
  }
  syncCartBadge();
  renderRoute();
}

function updateQuantity(productId, delta) {
  const currentQty = getState().cart[productId] || 1;
  const nextQty = Math.max(currentQty + delta, 0);
  setCartQty(productId, nextQty);
  syncCartBadge();
  renderRoute();
}

function onClick(event) {
  const menuOpen = event.target.closest("#menuOpen");
  const menuClose = event.target.closest("#menuClose");
  const addButton = event.target.closest('[data-action="add-product"]');
  const openFiltersButton = event.target.closest('[data-action="open-filters"]');
  const closeFiltersButton = event.target.closest('[data-action="close-filters"]');
  const plusButton = event.target.closest('[data-action="qty-plus"]');
  const minusButton = event.target.closest('[data-action="qty-minus"]');
  const removeButton = event.target.closest('[data-action="remove-item"]');
  const setImageButton = event.target.closest('[data-action="set-image"]');
  const imagePrevButton = event.target.closest('[data-action="image-prev"]');
  const imageNextButton = event.target.closest('[data-action="image-next"]');
  const toggleAccordionButton = event.target.closest('[data-action="toggle-accordion"]');

  if (menuOpen) {
    openMenu();
    return;
  }

  if (menuClose) {
    closeOverlays();
    return;
  }

  if (addButton) {
    addProductToCart(addButton.dataset.id);
    return;
  }

  if (plusButton) {
    updateQuantity(plusButton.dataset.id, 1);
    return;
  }

  if (minusButton) {
    updateQuantity(minusButton.dataset.id, -1);
    return;
  }

  if (removeButton) {
    removeProductFromCart(removeButton.dataset.id);
    return;
  }

  if (setImageButton) {
    setCurrentImageIndex(Number(setImageButton.dataset.index));
    renderRoute();
    return;
  }

  if (imagePrevButton || imageNextButton) {
    const productId = getProductIdFromHash();
    const product = getProductById(productId);
    if (!product) return;

    const currentIndex = getState().ui.currentImageIndex;
    const total = product.images.length;
    const nextIndex = imagePrevButton ? (currentIndex - 1 + total) % total : (currentIndex + 1) % total;

    setCurrentImageIndex(nextIndex);
    renderRoute();
    return;
  }

  if (toggleAccordionButton) {
    const section = toggleAccordionButton.dataset.section;
    toggleAccordion(section);
    renderRoute();
    return;
  }

  if (openFiltersButton) {
    document.getElementById("catalogFilters")?.classList.add("open");
    appEls.backdrop.hidden = false;
    return;
  }

  if (closeFiltersButton) {
    closeOverlays();
  }
}

function onInput(event) {
  const sortSelect = event.target.closest("#sortSelect");
  const minInput = event.target.closest("#minPrice");
  const maxInput = event.target.closest("#maxPrice");
  const ratingCheckbox = event.target.closest("[data-filter-rating]");

  if (sortSelect) {
    setFilterSort(sortSelect.value);
    updateAndRender();
    return;
  }

  if (minInput || maxInput) {
    const minPrice = document.getElementById("minPrice")?.value || "";
    const maxPrice = document.getElementById("maxPrice")?.value || "";
    setPriceRange(minPrice, maxPrice);
    updateAndRender();
    return;
  }

  if (ratingCheckbox) {
    toggleRatingFilter(Number(ratingCheckbox.dataset.filterRating), ratingCheckbox.checked);
    updateAndRender();
  }
}

function onSubmit(event) {
  const promoForm = event.target.closest("#promoForm");
  if (!promoForm) return;

  event.preventDefault();
  const promoInput = document.getElementById("promoInput");
  const promoMessage = document.getElementById("promoMessage");
  const value = promoInput?.value.trim().toUpperCase() || "";

  if (!value) {
    promoMessage.textContent = "Введите промокод";
    promoMessage.className = "promo-message error";
    return;
  }

  if (value !== "SAVE10") {
    setPromoCode("");
    promoMessage.textContent = "Неверный промокод";
    promoMessage.className = "promo-message error";
    return;
  }

  setPromoCode("SAVE10");
  promoMessage.textContent = "Промокод применен: скидка 10%";
  promoMessage.className = "promo-message success";
  renderRoute();
}

function onHashChange() {
  if (window.location.hash.startsWith("#/product/")) {
    resetProductUiState();
  } else {
    setAccordion("specs", true);
    setAccordion("description", false);
  }
  closeOverlays();
  renderRoute();
}

export function initApp() {
  renderShell();
  if (!window.location.hash || window.location.hash === "#/") {
    window.location.hash = "#/catalog";
  }
  renderRoute();

  window.addEventListener("hashchange", onHashChange);
  window.addEventListener("click", onClick);
  window.addEventListener("input", onInput);
  window.addEventListener("submit", onSubmit);
  appEls.backdrop.addEventListener("click", closeOverlays);

  syncCartBadge();
}
