import { appEls } from "./ui/dom.js";
import { renderCatalogPage } from "./pages/catalogPage.js";
import { renderProductPage } from "./pages/productPage.js";
import { renderCartPage } from "./pages/cartPage.js";
import { renderShell } from "./ui/shell.js";

function renderRoute() {
  const hash = window.location.hash || "#/catalog";

  if (hash === "#/catalog" || hash === "#/") {
    appEls.app.innerHTML = renderCatalogPage();
    return;
  }

  if (hash.startsWith("#/product/")) {
    appEls.app.innerHTML = renderProductPage();
    return;
  }

  if (hash === "#/cart") {
    appEls.app.innerHTML = renderCartPage();
    return;
  }

  appEls.app.innerHTML = `<section class="container" style="padding:2rem 0 3rem;"><h1>About</h1></section>`;
}

export function initApp() {
  renderShell();
  if (!window.location.hash || window.location.hash === "#/") {
    window.location.hash = "#/catalog";
  }
  renderRoute();
  window.addEventListener("hashchange", renderRoute);
}
