import {
  getProductById,
  getState,
  resetProductUiState,
  setCartQty,
  setFilterSort,
  setPriceRange,
  toggleRatingFilter
} from "./state/store.js";
import { appEls } from "./ui/dom.js";
import { renderCatalogPage } from "./pages/catalogPage.js";
import { renderProductPage } from "./pages/productPage.js";
import { renderCartPage } from "./pages/cartPage.js";
import { closeOverlays, openMenu, renderShell, syncCartBadge } from "./ui/shell.js";
import { showToast } from "./ui/toast.js";

function renderRoute() {
  const hash = window.location.hash || "#/catalog";

  if (hash === "#/catalog" || hash === "#/") {
    appEls.app.innerHTML = renderCatalogPage();
    return;
  }

  if (hash.startsWith("#/product/")) {
    const productId = hash.split("/")[2];
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

function onClick(event) {
  const menuOpen = event.target.closest("#menuOpen");
  const menuClose = event.target.closest("#menuClose");
  const addButton = event.target.closest('[data-action="add-product"]');
  const openFiltersButton = event.target.closest('[data-action="open-filters"]');
  const closeFiltersButton = event.target.closest('[data-action="close-filters"]');

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

function onHashChange() {
  if (window.location.hash.startsWith("#/product/")) {
    resetProductUiState();
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
  appEls.backdrop.addEventListener("click", closeOverlays);

  syncCartBadge();
}
