import { PRODUCTS } from "../data/products.js";

const STORAGE_KEYS = {
  cart: "pawsstore_cart_v2",
  promo: "pawsstore_promo_v2"
};

const state = {
  cart: loadCart(),
  promoCode: loadPromo(),
  filters: {
    ratings: new Set(),
    minPrice: "",
    maxPrice: "",
    sort: "name-asc"
  },
  ui: {
    currentImageIndex: 0,
    openAccordions: {
      specs: true,
      description: false
    }
  }
};

export function getState() {
  return state;
}

export function getProducts() {
  return PRODUCTS;
}

export function getProductById(id) {
  return PRODUCTS.find((item) => item.id === id);
}

export function setFilterSort(value) {
  state.filters.sort = value;
}

export function setPriceRange(minValue, maxValue) {
  state.filters.minPrice = minValue;
  state.filters.maxPrice = maxValue;
}

export function toggleRatingFilter(value, enabled) {
  if (enabled) {
    state.filters.ratings.add(value);
  } else {
    state.filters.ratings.delete(value);
  }
}

export function setPromoCode(code) {
  state.promoCode = code;
  if (code) {
    localStorage.setItem(STORAGE_KEYS.promo, code);
  } else {
    localStorage.removeItem(STORAGE_KEYS.promo);
  }
}

export function getCartCount() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

export function setCartQty(productId, qty) {
  if (qty <= 0) {
    delete state.cart[productId];
  } else {
    state.cart[productId] = qty;
  }
  persistCart();
}

export function getCartQty(productId) {
  return state.cart[productId] || 0;
}

export function getCartItems() {
  return Object.entries(state.cart)
    .map(([id, qty]) => {
      const product = getProductById(id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);
}

export function setCurrentImageIndex(index) {
  state.ui.currentImageIndex = index;
}

export function toggleAccordion(section) {
  state.ui.openAccordions[section] = !state.ui.openAccordions[section];
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || {};
  } catch {
    return {};
  }
}

function loadPromo() {
  return localStorage.getItem(STORAGE_KEYS.promo) || "";
}

function persistCart() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
}
