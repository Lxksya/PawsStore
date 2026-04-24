import { getCartCount } from "../state/store.js";
import { appEls } from "./dom.js";

export function renderShell() {
  appEls.header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="#/catalog">
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
        <button type="button" class="icon-btn" aria-label="Поиск">⌕</button>
        <a href="#/cart" class="icon-btn cart-link" aria-label="Корзина">
          🛒
          <span id="cartBadge" class="badge">0</span>
        </a>
        <button id="menuOpen" class="icon-btn menu-btn" type="button" aria-label="Открыть меню">☰</button>
      </div>
    </div>
  `;

  appEls.footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="#/catalog" class="brand footer-brand"><span class="brand-icon">🐾</span><span class="brand-text">PawsStore</span></a>
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

  appEls.mobileMenu.innerHTML = `
    <button class="menu-close" id="menuClose" aria-label="Закрыть меню">✕</button>
    <nav class="mobile-nav">
      <a href="#/catalog">Shop</a>
      <a href="#/catalog">Categories</a>
      <a href="#/catalog">Deals</a>
      <a href="#/about">About</a>
      <a href="#/cart">Cart</a>
    </nav>
  `;

  syncCartBadge();
}

export function syncCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = String(count);
  badge.style.display = count ? "inline-flex" : "none";
}

export function openMenu() {
  appEls.mobileMenu.classList.add("open");
  appEls.backdrop.hidden = false;
}

export function closeOverlays() {
  appEls.mobileMenu.classList.remove("open");
  document.getElementById("catalogFilters")?.classList.remove("open");
  appEls.backdrop.hidden = true;
}
