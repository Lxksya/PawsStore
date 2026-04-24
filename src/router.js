import { getProductById } from "./state/store.js";
import { appEls } from "./ui/dom.js";
import { renderCatalogPage } from "./pages/catalogPage.js";
import { renderProductPage } from "./pages/productPage.js";
import { renderCartPage } from "./pages/cartPage.js";
import { closeOverlays, openMenu, renderShell, syncCartBadge } from "./ui/shell.js";

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

function onClick(event) {
  const menuOpen = event.target.closest("#menuOpen");
  const menuClose = event.target.closest("#menuClose");

  if (menuOpen) {
    openMenu();
    return;
  }

  if (menuClose) {
    closeOverlays();
  }
}

export function initApp() {
  renderShell();
  renderRoute();

  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("click", onClick);
  appEls.backdrop.addEventListener("click", closeOverlays);

  syncCartBadge();
}
