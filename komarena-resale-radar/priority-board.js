"use strict";

(function enablePriorityBoard() {
  const fallbackLegend = {
    1: "Aktívne loviť — vysoká likvidita alebo veľmi dobrá opraviteľnosť.",
    2: "Silný segment — kupovať pri dobrom diskonte a jasnej diagnostike.",
    3: "Selektívne — záleží na konkrétnom modeli, poruche a logistike.",
    4: "Iba výnimočný deal, diely alebo lokálny odvoz."
  };

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function euro(value) {
    const number = Number(value || 0);
    return new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(number);
  }

  function groupTitle(priority) {
    return {
      1: "Aktívny lov",
      2: "Silné príležitosti",
      3: "Selektívne segmenty",
      4: "Iba výnimočný deal"
    }[priority] || `Priorita ${priority}`;
  }

  function renderCategory(category) {
    const preferred = Array.isArray(category.preferred) ? category.preferred.slice(0, 4) : [];
    const goodFaults = Array.isArray(category.goodFaults) ? category.goodFaults.slice(0, 6) : [];
    const avoid = Array.isArray(category.avoid) ? category.avoid.slice(0, 5) : [];

    return `
      <article class="priority-card" data-category-id="${esc(category.id)}">
        <div class="priority-card-top">
          <h4>${esc(category.name)}</h4>
          <span class="demand">DOPYT ${esc(category.demand ?? "–")}/10</span>
        </div>
        <div class="priority-metrics">
          <span>Zisk ≥ ${euro(category.targetNetProfit)}</span>
          <span>ROI ≥ ${esc(category.targetRoiPct ?? "–")}%</span>
          <span>Opraviteľnosť ${esc(category.repairability ?? "–")}/10</span>
          <span>Obrat ${esc(category.turnover ?? "–")}/10</span>
        </div>
        <p><strong>Preferovať:</strong> ${preferred.length ? preferred.map(esc).join(" · ") : "podľa konkrétneho modelu"}</p>
        <details class="priority-detail">
          <summary>Opravy a riziká</summary>
          ${goodFaults.length ? `<p><strong>Dobré poruchy:</strong></p><ul>${goodFaults.map(item => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
          ${avoid.length ? `<p><strong>Vyhnúť sa:</strong></p><ul>${avoid.map(item => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
        </details>
      </article>`;
  }

  function renderBoard(data) {
    const root = document.getElementById("priorityBoard");
    if (!root) return;
    const categories = Array.isArray(data.categories) ? data.categories : [];
    const legend = data.priorityLegend || fallbackLegend;

    const groups = [1, 2, 3, 4].map(priority => {
      const items = categories
        .filter(item => Number(item.priority) === priority)
        .sort((a, b) => (Number(b.demand || 0) + Number(b.turnover || 0)) - (Number(a.demand || 0) + Number(a.turnover || 0)));
      if (!items.length) return "";

      return `
        <section class="priority-group" data-priority="${priority}">
          <div class="priority-group-head">
            <div class="priority-group-title">
              <span class="priority-badge p${priority}">P${priority}</span>
              <div>
                <h3>${esc(groupTitle(priority))}</h3>
                <p>${esc(legend[String(priority)] || legend[priority] || fallbackLegend[priority])}</p>
              </div>
            </div>
            <span class="priority-count">${items.length} segmentov</span>
          </div>
          <div class="priority-cards">${items.map(renderCategory).join("")}</div>
        </section>`;
    }).join("");

    root.innerHTML = groups || '<div class="priority-fallback">Prioritná matica nemá dáta.</div>';

    const total = document.getElementById("priorityCategoryCount");
    if (total) total.textContent = `${categories.length} segmentov`;
  }

  async function load() {
    const root = document.getElementById("priorityBoard");
    if (!root) return;
    try {
      const response = await fetch("data/categories.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      renderBoard(data);
      window.KA_RESALE_CATEGORIES = Array.isArray(data.categories) ? data.categories : [];
      document.dispatchEvent(new CustomEvent("ka:categories-ready", { detail: { categories: window.KA_RESALE_CATEGORIES } }));
    } catch (error) {
      root.innerHTML = '<div class="priority-fallback">Prioritnú maticu sa nepodarilo načítať.</div>';
      console.warn("Resale Radar category matrix unavailable:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load, { once: true });
  } else {
    load();
  }
})();
