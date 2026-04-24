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

export function getFilteredProducts() {
  let list = [...PRODUCTS];

  const min = Number(state.filters.minPrice || 0);
  const max = Number(state.filters.maxPrice || Number.POSITIVE_INFINITY);

  list = list.filter((item) => item.price >= min && item.price <= max);

  if (state.filters.ratings.size > 0) {
    list = list.filter((item) => {
      for (const minRating of state.filters.ratings) {
        if (item.rating >= minRating) {
          return true;
        }
      }
      return false;
    });
  }

  list.sort((a, b) => {
    if (state.filters.sort === "name-asc") return a.name.localeCompare(b.name);
    if (state.filters.sort === "name-desc") return b.name.localeCompare(a.name);
    if (state.filters.sort === "price-asc") return a.price - b.price;
    if (state.filters.sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return list;
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

export function clearFilters() {
  state.filters.ratings.clear();
  state.filters.minPrice = "";
  state.filters.maxPrice = "";
  state.filters.sort = "name-asc";
}

export function setCurrentImageIndex(index) {
  state.ui.currentImageIndex = index;
}

export function toggleAccordion(section) {
  state.ui.openAccordions[section] = !state.ui.openAccordions[section];
}

export function setAccordion(section, open) {
  state.ui.openAccordions[section] = open;
}

export function resetProductUiState() {
  state.ui.currentImageIndex = 0;
  setAccordion("specs", true);
  setAccordion("description", false);
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
