const PRODUCTS = [
  {
    id: "carrier",
    category: "Travel & Carriers",
    name: "Airline-Approved Pet Travel Carrier",
    price: 54.99,
    rating: 4,
    reviews: 14,
    subtitle: "Travel & Carriers",
    description:
      "Soft-sided pet carrier approved for airline cabin use. Features mesh panels for ventilation, padded shoulder strap, and collapsible design for easy storage.",
    highlights: [
      "Dimensions: 18 x 11 x 11 inches",
      "Material: Polyester with mesh panels",
      "Weight limit: Up to 15 lbs"
    ],
    specs: [
      ["Dimensions", "18 x 11 x 11 inches"],
      ["Material", "Polyester with mesh panels"],
      ["Weight Limit", "Up to 15 lbs"],
      ["Airline Approved", "Yes (TSA compliant)"],
      ["Features", "Collapsible, padded strap"]
    ],
    images: [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "ball",
    category: "Toys",
    name: "Interactive Rubber Chew Ball",
    price: 15.99,
    rating: 5,
    reviews: 5,
    subtitle: "Dog Toys",
    description: "Durable chew ball for active dogs with textured grip and bounce design.",
    highlights: ["Safe rubber", "Textured surface", "Long-lasting"],
    specs: [["Size", "Medium"], ["Material", "Natural rubber"], ["Use", "Indoor / outdoor"]],
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "scratcher",
    category: "Cats",
    name: "Multi-Level Cat Scratching Post",
    price: 89.99,
    rating: 4.5,
    reviews: 4,
    subtitle: "Cat Furniture",
    description: "Compact scratching post with sisal-covered levels and soft perch.",
    highlights: ["Sisal rope", "Compact footprint", "Stable base"],
    specs: [["Height", "34 in"], ["Material", "Sisal & plush"], ["Assembly", "10 min"]],
    images: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "bed",
    category: "Beds",
    name: "Orthopedic Memory Foam Pet Bed",
    price: 69.99,
    rating: 3.5,
    reviews: 4,
    subtitle: "Sleep & Comfort",
    description: "Supportive memory foam bed with removable washable cover.",
    highlights: ["Memory foam", "Machine washable cover", "Anti-slip base"],
    specs: [["Size", "L"], ["Color", "Slate"], ["Care", "Washable cover"]],
    images: [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1597633125097-5a9961e1f6e5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "bowl",
    category: "Feeding",
    name: "Premium Stainless Steel Dog Bowl",
    price: 24.99,
    rating: 5,
    reviews: 5,
    subtitle: "Feeding Essentials",
    description: "Rust-resistant non-slip bowl for everyday feeding.",
    highlights: ["Stainless steel", "Non-slip bottom", "Dishwasher safe"],
    specs: [["Capacity", "1.2 L"], ["Material", "304 steel"], ["Base", "Rubberized"]],
    images: [
      "https://images.unsplash.com/photo-1583512603782-9a5f6f2d93e9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "leash",
    category: "Accessories",
    name: "Reflective Nylon Dog Leash & Collar Set",
    price: 32.99,
    rating: 4,
    reviews: 4,
    subtitle: "Outdoor Essentials",
    description: "Reflective set for safe evening walks with durable clip hardware.",
    highlights: ["Reflective stitching", "Heavy-duty clasp", "Adjustable collar"],
    specs: [["Leash", "1.5 m"], ["Collar", "S-M adjustable"], ["Material", "Nylon"]],
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1f7dee7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const STORAGE_KEYS = {
  cart: "pawsstore_cart_v1",
  promo: "pawsstore_promo_v1"
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
  galleryIndex: 0
};

const app = document.getElementById("app");
const header = document.getElementById("siteHeader");
const footer = document.getElementById("siteFooter");
const toastWrap = document.getElementById("toastWrap");

renderShell();
window.addEventListener("hashchange", renderRoute);
window.addEventListener("click", onGlobalClick);
window.addEventListener("input", onGlobalInput);
window.addEventListener("submit", onGlobalSubmit);

renderRoute();

function renderShell() {
  header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="#/catalog" aria-label="На главную">
        <span class="brand-icon">🐾</span>
        <span class="brand-text">PawsStore</span>
      </a>
      <nav class="desktop-nav">
        <a href="#/catalog">Shop</a>
        <a href="#/catalog">Categories</a>
        <a href="#/catalog">Deals</a>
        <a href="#/about">About</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="Поиск">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.23-1.57l.27.28v.79L19 20.49L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
        </button>
        <a class="icon-btn cart-link" href="#/cart" aria-label="Корзина">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2s-.9-2-2-2zM7.17 14h9.92c.75 0 1.41-.41 1.75-1.03L22 7V5h-3.21l-1.94 4H8.53L6.16 2H2v2h2l3.6 7.59l-1.35 2.44C5.52 15.37 6.48 17 8 17h12v-2H8l1.17-1z"/></svg>
          <span class="badge" id="cartBadge">0</span>
        </a>
        <button class="icon-btn menu-btn" id="menuOpen" type="button" aria-label="Открыть меню">☰</button>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a class="brand footer-brand" href="#/catalog"><span class="brand-icon">🐾</span><span class="brand-text">PawsStore</span></a>
        <p class="footer-muted">Your trusted source for premium pet supplies and accessories.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#/catalog">Shop All</a></li>
          <li><a href="#/catalog">New Arrivals</a></li>
          <li><a href="#/catalog">Best Sellers</a></li>
          <li><a href="#/catalog">Sale Items</a></li>
        </ul>
      </div>
      <div>
        <h4>Customer Service</h4>
        <ul>
          <li><a href="#/about">Contact Us</a></li>
          <li><a href="#/about">Shipping Info</a></li>
          <li><a href="#/about">Returns Policy</a></li>
          <li><a href="#/about">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4>Newsletter</h4>
        <p class="footer-muted">Subscribe to get special offers and updates.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Your email" aria-label="Email" />
          <button type="button">✉</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">© 2026 PawsStore. All rights reserved.</div>
  `;

  syncBadge();
}

function renderRoute() {
  const hash = window.location.hash || "#/catalog";

  if (hash === "#/catalog" || hash === "#/") {
    app.innerHTML = renderCatalogPage();
    hydrateCatalogControls();
    return;
  }

  if (hash.startsWith("#/product/")) {
    const id = hash.split("/")[2];
    const product = getProduct(id);
    if (!product) {
      app.innerHTML = `<section class="container page-pad"><h1>Товар не найден</h1><a href="#/catalog" class="btn btn-primary">В каталог</a></section>`;
      return;
    }
    state.galleryIndex = 0;
    app.innerHTML = renderProductPage(product);
    return;
  }

  if (hash === "#/cart") {
    app.innerHTML = renderCartPage();
    return;
  }

  app.innerHTML = `<section class="container page-pad"><h1>О странице</h1><p>Демо-страница. Перейдите в каталог для покупок.</p><a href="#/catalog" class="btn btn-primary">В каталог</a></section>`;
}

function renderCatalogPage() {
  const filtered = getFilteredProducts();

  return `
    <section class="hero">
      <div class="container">
        <h1>Shop All Products</h1>
        <p>Discover the best products for your furry friends</p>
      </div>
    </section>

    <section class="container catalog-wrap page-pad">
      <aside class="filters" id="filterPanel">
        <div class="filters-head">
          <h3>Filters</h3>
          <button class="icon-btn small" data-action="close-mobile-filters" aria-label="Закрыть фильтры">✕</button>
        </div>
        <div class="filter-group">
          <h4>Rating</h4>
          ${[5, 4, 3]
            .map(
              (v) => `
              <label class="check-line">
                <input type="checkbox" data-filter-rating="${v}" ${state.filters.ratings.has(v) ? "checked" : ""} />
                <span>${v}+ Stars</span>
              </label>`
            )
            .join("")}
        </div>
        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="price-row">
            <label>Min<input type="number" min="0" step="1" id="minPrice" value="${state.filters.minPrice}" placeholder="$ 0" /></label>
            <label>Max<input type="number" min="0" step="1" id="maxPrice" value="${state.filters.maxPrice}" placeholder="$ 100" /></label>
          </div>
        </div>
      </aside>

      <div class="catalog-content">
        <div class="catalog-toolbar">
          <div class="toolbar-left">
            <button class="btn btn-muted mobile-filter-btn" data-action="open-mobile-filters">☰ Filters</button>
            <span>${filtered.length} products</span>
          </div>
          <label class="sort-wrap">Sort by:
            <select id="sortSelect">
              <option value="name-asc" ${selected(state.filters.sort, "name-asc")}>Name (A-Z)</option>
              <option value="name-desc" ${selected(state.filters.sort, "name-desc")}>Name (Z-A)</option>
              <option value="price-asc" ${selected(state.filters.sort, "price-asc")}>Price (Low-High)</option>
              <option value="price-desc" ${selected(state.filters.sort, "price-desc")}>Price (High-Low)</option>
            </select>
          </label>
        </div>

        <div class="product-grid">
          ${filtered.map(renderProductCard).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <a href="#/product/${product.id}" class="card-image-wrap">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <span class="price-pill">$${product.price.toFixed(2)}</span>
      </a>
      <div class="card-body">
        <a href="#/product/${product.id}" class="product-title">${product.name}</a>
        <div class="rating">${renderStars(product.rating)} <small>(${product.reviews})</small></div>
        <button class="btn btn-circle" data-action="add" data-id="${product.id}" aria-label="Добавить ${product.name}">🛒</button>
      </div>
    </article>
  `;
}

function renderProductPage(product) {
  const inCart = !!state.cart[product.id];
  const activeImage = product.images[state.galleryIndex];

  return `
    <section class="container page-pad product-page">
      <nav class="crumbs"><a href="#/catalog">Home</a> › <a href="#/catalog">${product.category}</a> › ${product.name}</nav>
      <div class="product-layout">
        <div class="gallery-box">
          <img class="main-product-image" src="${activeImage}" alt="${product.name}" />
          <div class="thumb-row">
            ${product.images
              .map(
                (img, i) => `<button class="thumb ${i === state.galleryIndex ? "active" : ""}" data-action="thumb" data-index="${i}"><img src="${img}" alt="${product.name} ${i + 1}" /></button>`
              )
              .join("")}
          </div>
          <div class="slider-controls">
            <button class="btn btn-muted" data-action="slide-prev">←</button>
            <button class="btn btn-muted" data-action="slide-next">→</button>
          </div>
        </div>

        <div class="product-info">
          <span class="tag">${product.category}</span>
          <h1>${product.name}</h1>
          <div class="rating large">${renderStars(product.rating)} <small>${product.rating} out of 5</small></div>
          <div class="price-main">$${product.price.toFixed(2)}</div>

          <section class="highlights">
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
              <span>${state.cart[product.id] || 1}</span>
              <button data-action="qty-plus" data-id="${product.id}">+</button>
            </div>
          </div>

          <button class="btn btn-primary full" data-action="add" data-id="${product.id}">${inCart ? "Уже в корзине" : "Add to Cart"}</button>

          <section class="accordion" data-accordion="specs">
            <button class="accordion-trigger" data-action="toggle-accordion" aria-expanded="true">Technical Specifications</button>
            <div class="accordion-panel open">
              <div class="spec-grid">
                ${product.specs
                  .map(
                    ([k, v]) => `<div class="spec"><small>${k}</small><strong>${v}</strong></div>`
                  )
                  .join("")}
              </div>
            </div>
          </section>

          <section class="accordion" data-accordion="description">
            <button class="accordion-trigger" data-action="toggle-accordion" aria-expanded="false">Расширенное описание</button>
            <div class="accordion-panel">
              <p>${product.description} Meets TSA requirements for in-cabin pet travel.</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function renderCartPage() {
  const items = cartItems();
  if (items.length === 0) {
    return `
      <section class="container page-pad empty-cart">
        <div class="empty-icon">👜</div>
        <h1>Your cart is empty</h1>
        <p>Discover amazing products for your furry friends!</p>
        <a class="btn btn-primary" href="#/catalog">Start Shopping</a>
      </section>
    `;
  }

  const subtotal = getSubtotal(items);
  const tax = subtotal * 0.08;
  const discount = state.promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  return `
    <section class="container page-pad cart-page">
      <div class="cart-heading">
        <h1>Shopping Bag</h1>
        <p>${items.length} item${items.length > 1 ? "s" : ""} ready for checkout</p>
      </div>

      <div class="cart-layout">
        <section class="cart-list">
          ${items.map(renderCartRow).join("")}
        </section>

        <aside class="order-summary">
          <div class="summary-head">
            <h2>Order Summary</h2>
            <p>${items.length} items in your bag</p>
          </div>

          <form class="promo-form" id="promoForm">
            <label for="promoInput">Promo Code</label>
            <div>
              <input id="promoInput" name="promo" type="text" placeholder="Enter code" value="${state.promoCode}" />
              <button class="btn btn-dark" type="submit">Apply</button>
            </div>
            <p class="promo-msg" id="promoMsg"></p>
          </form>

          <dl class="totals">
            <div><dt>Subtotal</dt><dd>$${subtotal.toFixed(2)}</dd></div>
            <div><dt>Tax (8%)</dt><dd>$${tax.toFixed(2)}</dd></div>
            <div ${discount ? "" : "hidden"}><dt>Discount</dt><dd>−$${discount.toFixed(2)}</dd></div>
          </dl>
          <div class="total-row"><span>Total</span><strong>$${total.toFixed(2)}</strong></div>

          <button class="btn btn-primary full" type="button">Proceed to Checkout</button>
          <a href="#/catalog" class="continue-link">← Continue Shopping</a>
        </aside>
      </div>
    </section>
  `;
}

function renderCartRow(item) {
  const line = item.price * item.qty;
  return `
    <article class="cart-row">
      <img src="${item.images[0]}" alt="${item.name}" />
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
        <strong>$${line.toFixed(2)}</strong>
        <small>$${item.price.toFixed(2)} each</small>
      </div>
      <button class="icon-btn" data-action="remove" data-id="${item.id}" aria-label="Удалить">🗑</button>
    </article>
  `;
}

function onGlobalClick(event) {
  const target = event.target.closest("[data-action], #menuOpen, #menuClose");
  if (!target) return;

  if (target.id === "menuOpen") {
    document.getElementById("mobileMenu").classList.add("open");
    return;
  }

  if (target.id === "menuClose") {
    document.getElementById("mobileMenu").classList.remove("open");
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "add") {
    addToCart(id);
  }

  if (action === "remove") {
    removeFromCart(id);
  }

  if (action === "qty-plus") {
    setQty(id, (state.cart[id] || 0) + 1);
  }

  if (action === "qty-minus") {
    const next = Math.max((state.cart[id] || 1) - 1, 0);
    if (next === 0) {
      removeFromCart(id);
    } else {
      setQty(id, next);
    }
  }

  if (action === "open-mobile-filters") {
    document.getElementById("filterPanel")?.classList.add("open");
  }

  if (action === "close-mobile-filters") {
    document.getElementById("filterPanel")?.classList.remove("open");
  }

  if (action === "thumb") {
    state.galleryIndex = Number(target.dataset.index);
    renderRoute();
  }

  if (action === "slide-prev" || action === "slide-next") {
    const product = getCurrentProduct();
    if (!product) return;
    const len = product.images.length;
    state.galleryIndex = action === "slide-prev" ? (state.galleryIndex - 1 + len) % len : (state.galleryIndex + 1) % len;
    renderRoute();
  }

  if (action === "toggle-accordion") {
    const accordion = target.closest(".accordion");
    const panel = accordion.querySelector(".accordion-panel");
    const open = panel.classList.toggle("open");
    target.setAttribute("aria-expanded", String(open));
  }
}

function onGlobalInput(event) {
  if (event.target.id === "sortSelect") {
    state.filters.sort = event.target.value;
    renderRoute();
  }

  if (event.target.id === "minPrice") {
    state.filters.minPrice = event.target.value;
    renderRoute();
  }

  if (event.target.id === "maxPrice") {
    state.filters.maxPrice = event.target.value;
    renderRoute();
  }

  if (event.target.matches("[data-filter-rating]")) {
    const rating = Number(event.target.dataset.filterRating);
    if (event.target.checked) {
      state.filters.ratings.add(rating);
    } else {
      state.filters.ratings.delete(rating);
    }
    renderRoute();
  }
}

function onGlobalSubmit(event) {
  if (event.target.id !== "promoForm") return;
  event.preventDefault();

  const input = document.getElementById("promoInput");
  const message = document.getElementById("promoMsg");
  const value = input.value.trim().toUpperCase();

  if (!value) {
    message.textContent = "Введите промокод";
    message.className = "promo-msg error";
    return;
  }

  if (value === "SAVE10") {
    state.promoCode = value;
    localStorage.setItem(STORAGE_KEYS.promo, value);
    message.textContent = "Промокод применен: скидка 10%";
    message.className = "promo-msg success";
    renderRoute();
    return;
  }

  state.promoCode = "";
  localStorage.removeItem(STORAGE_KEYS.promo);
  message.textContent = "Неверный промокод";
  message.className = "promo-msg error";
}

function addToCart(id) {
  setQty(id, (state.cart[id] || 0) + 1);
  const p = getProduct(id);
  if (p) showToast(`Added 1 ${p.name} to cart`);
}

function removeFromCart(id) {
  const p = getProduct(id);
  delete state.cart[id];
  persistCart();
  syncBadge();
  renderRoute();
  if (p) showToast(`${p.name} removed from cart`);
}

function setQty(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  state.cart[id] = qty;
  persistCart();
  syncBadge();
  renderRoute();
}

function persistCart() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
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

function cartItems() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ ...getProduct(id), qty }))
    .filter(Boolean);
}

function getSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCurrentProduct() {
  if (!window.location.hash.startsWith("#/product/")) return null;
  return getProduct(window.location.hash.split("/")[2]);
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  const min = Number(state.filters.minPrice || 0);
  const max = Number(state.filters.maxPrice || Number.POSITIVE_INFINITY);

  list = list.filter((p) => p.price >= min && p.price <= max);

  if (state.filters.ratings.size) {
    list = list.filter((p) => {
      for (const r of state.filters.ratings) {
        if (p.rating >= r) return true;
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

function selected(value, expected) {
  return value === expected ? "selected" : "";
}

function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded).padEnd(5, "☆");
}

function syncBadge() {
  const count = Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = String(count);
    badge.style.display = count ? "inline-flex" : "none";
  }
}

function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  toastWrap.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

function hydrateCatalogControls() {
  const panel = document.getElementById("filterPanel");
  if (panel && window.innerWidth > 980) {
    panel.classList.remove("open");
  }
}
