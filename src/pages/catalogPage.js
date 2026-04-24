import { getFilteredProducts, getState } from "../state/store.js";
import { renderCatalogCard } from "../ui/cards.js";

function selected(current, target) {
  return current === target ? "selected" : "";
}

function checkedSet(ratings, value) {
  return ratings.has(value) ? "checked" : "";
}

export function renderCatalogPage() {
  const state = getState();
  const products = getFilteredProducts();

  return `
    <section class="hero">
      <div class="container">
        <h1>Shop All Products</h1>
        <p>Discover the best products for your furry friends</p>
      </div>
    </section>

    <section class="container catalog-layout">
      <aside id="catalogFilters" class="filters-panel">
        <div class="filters-header">
          <h3>Filters</h3>
          <button class="icon-btn small" data-action="close-filters" aria-label="Закрыть фильтры">✕</button>
        </div>
        <div class="filter-group">
          <h4>Rating</h4>
          <label><input type="checkbox" data-filter-rating="5" ${checkedSet(state.filters.ratings, 5)} /> 5+ Stars</label>
          <label><input type="checkbox" data-filter-rating="4" ${checkedSet(state.filters.ratings, 4)} /> 4+ Stars</label>
          <label><input type="checkbox" data-filter-rating="3" ${checkedSet(state.filters.ratings, 3)} /> 3+ Stars</label>
        </div>
        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="price-inputs">
            <label>Min<input type="number" id="minPrice" min="0" step="1" value="${state.filters.minPrice}" placeholder="0" /></label>
            <label>Max<input type="number" id="maxPrice" min="0" step="1" value="${state.filters.maxPrice}" placeholder="100" /></label>
          </div>
        </div>
      </aside>

      <div class="catalog-content">
        <div class="catalog-toolbar">
          <div class="toolbar-left">
            <button class="btn btn-muted mobile-filter-btn" data-action="open-filters">☰ Filters</button>
            <span>${products.length} products</span>
          </div>
          <label class="sort-select">Sort by:
            <select id="sortSelect">
              <option value="name-asc" ${selected(state.filters.sort, "name-asc")}>Name (A-Z)</option>
              <option value="name-desc" ${selected(state.filters.sort, "name-desc")}>Name (Z-A)</option>
              <option value="price-asc" ${selected(state.filters.sort, "price-asc")}>Price (Low-High)</option>
              <option value="price-desc" ${selected(state.filters.sort, "price-desc")}>Price (High-Low)</option>
            </select>
          </label>
        </div>

        <div class="catalog-grid">
          ${products.map((item) => renderCatalogCard(item)).join("")}
        </div>
      </div>
    </section>
  `;
}
