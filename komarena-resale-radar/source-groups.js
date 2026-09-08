"use strict";

(function groupSourceRegistry() {
  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function titleFor(priority) {
    return {
      1: "P1 · Aktívne monitorovať",
      2: "P2 · Silné doplnkové zdroje",
      3: "P3 · Oportunistické / selektívne",
      4: "P4 · Benchmark a výnimočné nákupy"
    }[priority] || `P${priority}`;
  }

  function noteFor(priority) {
    return {
      1: "Najvyššia frekvencia kontroly a najrýchlejšia reakcia na nový deal.",
      2: "Pravidelné sledovanie, najmä pri správnej kategórii a cenovom diskonte.",
      3: "Použiť pri špecifických modeloch, poruchách alebo lokálnej logistickej výhode.",
      4: "Primárne cenový benchmark, diely alebo výnimočne podhodnotená ponuka."
    }[priority] || "";
  }

  function sourceCard(source) {
    const focus = Array.isArray(source.focus) ? source.focus.slice(0, 5) : [];
    return `
      <article class="source-card">
        <div class="source-meta">
          <span class="country">${esc(source.country)}</span>
          <span class="pill">P${esc(source.priority)}</span>
        </div>
        <h3><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.name)}</a></h3>
        <p>${esc((source.monitoring || []).join(" · "))}</p>
        ${focus.length ? `<p class="source-focus">${focus.map(esc).join(" · ")}</p>` : ""}
        <span class="pill">${esc(source.status || "candidate")}</span>
      </article>`;
  }

  function render(sources) {
    const container = document.getElementById("sourceCards");
    if (!container || !Array.isArray(sources)) return;
    container.className = "source-priority-groups";
    container.dataset.grouped = "true";
    container.innerHTML = [1, 2, 3, 4].map(priority => {
      const items = sources.filter(item => Number(item.priority) === priority);
      if (!items.length) return "";
      return `
        <section class="source-priority-group">
          <div class="source-priority-head">
            <div>
              <h3>${esc(titleFor(priority))}</h3>
              <p>${esc(noteFor(priority))}</p>
            </div>
            <span class="pill">${items.length} zdrojov</span>
          </div>
          <div class="source-grid">${items.map(sourceCard).join("")}</div>
        </section>`;
    }).join("");
    const counter = document.getElementById("sourceCount");
    if (counter) counter.textContent = `${sources.length} zdrojov`;
  }

  async function loadAndRender() {
    try {
      const response = await fetch("data/sources.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.sources)) render(data.sources);
    } catch (error) {
      console.warn("Resale Radar grouped sources unavailable:", error);
    }
  }

  function boot() {
    const container = document.getElementById("sourceCards");
    if (!container) return;
    const observer = new MutationObserver(() => {
      if (container.dataset.grouped === "true") return;
      if (container.children.length) loadAndRender().then(() => observer.disconnect());
    });
    observer.observe(container, { childList: true });
    if (container.children.length) loadAndRender().then(() => observer.disconnect());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
