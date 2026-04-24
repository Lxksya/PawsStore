import { appEls } from "./ui/dom.js";
import { renderShell } from "./ui/shell.js";

function renderPlaceholder() {
  appEls.app.innerHTML = `
    <section class="container" style="padding: 2rem 0 3rem;">
      <h1>Загрузка страниц...</h1>
      <p>Идет поэтапная сборка приложения.</p>
    </section>
  `;
}

export function initApp() {
  renderShell();
  renderPlaceholder();
}
