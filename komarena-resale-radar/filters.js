"use strict";

(function enableAdvancedFilters() {
  const FILTER_STATE_KEY = "komarena-resale-radar-filters-v1";
  const FILTER_PRESETS_KEY = "komarena-resale-radar-filter-presets-v1";

  const defaultState = {
    search: "",
    location: "",
    source: "",
    countries: [],
    categories: [],
    purchaseMin: "",
    purchaseMax: "",
    resaleMin: "",
    resaleMax: "",
    minProfit: "",
    minRoi: "",
    minScore: "",
    maxRisk: "",
    minDemand: "",
    maxAge: "",
    minLogistics: "",
    verification: "all",
    profitableOnly: false,
    urgentOnly: false,
    verificationOnly: false,
    sort: "score-desc"
  };

  const builtInPresets = {
    "top-deals": {
      label: "🔥 Top deal — okamžité preverenie",
      state: { minProfit: 60, minRoi: 35, minScore: 78, maxRisk: 5, minDemand: 7, maxAge: 48, profitableOnly: true, sort: "score-desc" }
    },
    "fast-flip": {
      label: "⚡ Rýchly flip",
      state: { minProfit: 40, minRoi: 30, minScore: 68, maxRisk: 4, minDemand: 7, maxAge: 72, profitableOnly: true, sort: "age-asc" }
    },
    "local-ba": {
      label: "📍 Lokálne BA + okolie",
      state: { countries: ["SK"], location: "Bratislava, Petržalka, Senec, Šamorín, Dunajská Streda, Malacky", minLogistics: 8, sort: "score-desc" }
    },
    "delonghi-service": {
      label: "☕ De'Longhi servisný flip",
      state: { categories: ["delonghi"], minProfit: 45, minRoi: 35, maxRisk: 5, minDemand: 6, maxAge: 168, profitableOnly: true, sort: "profit-desc" }
    },
    "console-flip": {
      label: "🎮 Konzoly — likvidný flip",
      state: { categories: ["consoles"], minProfit: 40, minRoi: 25, minScore: 65, maxRisk: 5, minDemand: 8, maxAge: 96, profitableOnly: true, sort: "score-desc" }
    },
    "free-upside": {
      label: "♻️ Za odvoz / symbolická cena",
      state: { categories: ["free"], purchaseMax: 10, minProfit: 20, minRoi: 50, maxRisk: 6, sort: "profit-desc" }
    },
    "verification": {
      label: "🛡️ Povinné overenie / outliery",
      state: { verification: "hold", sort: "score-desc" }
    }
  };

  let state = loadState();
  let currentResultCount = 0;

  function cloneDefaults() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function normalizeState(raw) {
    const next = { ...cloneDefaults(), ...(raw || {}) };
    next.countries = Array.isArray(next.countries) ? next.countries : [];
    next.categories = Array.isArray(next.categories) ? next.categories : [];
    return next;
  }

  function loadState() {
    try {
      return normalizeState(JSON.parse(localStorage.getItem(FILTER_STATE_KEY) || "{}"));
    } catch (_) {
      return cloneDefaults();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(FILTER_STATE_KEY, JSON.stringify(state));
    } catch (_) {
      // Filtering still works when localStorage is unavailable.
    }
  }

  function loadCustomPresets() {
    try {
      const parsed = JSON.parse(localStorage.getItem(FILTER_PRESETS_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveCustomPresets(presets) {
    try {
      localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets));
    } catch (_) {
      // Non-persistent fallback is acceptable.
    }
  }

  function numberOrNull(value) {
    if (value === "" || value === null || value === undefined) return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function normalizeText(value) {
    return String(value || "").toLocaleLowerCase("sk-SK").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function matchesTokens(value, query) {
    if (!query) return true;
    const haystack = normalizeText(value);
    const tokens = String(query)
      .split(",")
      .map(token => normalizeText(token.trim()))
      .filter(Boolean);
    if (!tokens.length) return true;
    return tokens.some(token => haystack.includes(token));
  }

  function getDealValue(deal, key) {
    const value = Number(deal[key]);
    return Number.isFinite(value) ? value : 0;
  }

  function applyAdvancedFilters(inputDeals) {
    let output = inputDeals.filter(deal => {
      if (state.search) {
        const combined = [deal.title, deal.note, deal.benchmark, deal.category, deal.source, deal.location].join(" ");
        if (!normalizeText(combined).includes(normalizeText(state.search))) return false;
      }

      if (!matchesTokens(deal.location, state.location)) return false;
      if (!matchesTokens(deal.source, state.source)) return false;

      if (state.countries.length && !state.countries.includes(deal.country)) return false;
      if (state.categories.length && !state.categories.includes(deal.category)) return false;

      const purchaseMin = numberOrNull(state.purchaseMin);
      const purchaseMax = numberOrNull(state.purchaseMax);
      const resaleMin = numberOrNull(state.resaleMin);
      const resaleMax = numberOrNull(state.resaleMax);
      const minProfit = numberOrNull(state.minProfit);
      const minRoi = numberOrNull(state.minRoi);
      const minScore = numberOrNull(state.minScore);
      const maxRisk = numberOrNull(state.maxRisk);
      const minDemand = numberOrNull(state.minDemand);
      const maxAge = numberOrNull(state.maxAge);
      const minLogistics = numberOrNull(state.minLogistics);

      if (purchaseMin !== null && getDealValue(deal, "purchase") < purchaseMin) return false;
      if (purchaseMax !== null && getDealValue(deal, "purchase") > purchaseMax) return false;
      if (resaleMin !== null && getDealValue(deal, "resale") < resaleMin) return false;
      if (resaleMax !== null && getDealValue(deal, "resale") > resaleMax) return false;
      if (minProfit !== null && getDealValue(deal, "netProfit") < minProfit) return false;
      if (minRoi !== null && getDealValue(deal, "roi") < minRoi) return false;
      if (minScore !== null && getDealValue(deal, "score") < minScore) return false;
      if (maxRisk !== null && getDealValue(deal, "risk") > maxRisk) return false;
      if (minDemand !== null && getDealValue(deal, "demand") < minDemand) return false;
      if (maxAge !== null && getDealValue(deal, "ageHours") > maxAge) return false;
      if (minLogistics !== null && getDealValue(deal, "logistics") < minLogistics) return false;

      if (state.verification === "clear" && deal.verificationHold) return false;
      if (state.verification === "hold" && !deal.verificationHold) return false;
      if (state.profitableOnly && getDealValue(deal, "netProfit") <= 0) return false;
      if (state.urgentOnly && !(getDealValue(deal, "score") >= 78 && getDealValue(deal, "ageHours") <= 24)) return false;
      if (state.verificationOnly && !deal.verificationHold) return false;

      return true;
    });

    const sorters = {
      "score-desc": (a, b) => getDealValue(b, "score") - getDealValue(a, "score"),
      "profit-desc": (a, b) => getDealValue(b, "netProfit") - getDealValue(a, "netProfit"),
      "roi-desc": (a, b) => getDealValue(b, "roi") - getDealValue(a, "roi"),
      "age-asc": (a, b) => getDealValue(a, "ageHours") - getDealValue(b, "ageHours"),
      "purchase-asc": (a, b) => getDealValue(a, "purchase") - getDealValue(b, "purchase"),
      "purchase-desc": (a, b) => getDealValue(b, "purchase") - getDealValue(a, "purchase"),
      "risk-asc": (a, b) => getDealValue(a, "risk") - getDealValue(b, "risk")
    };

    output = output.slice().sort(sorters[state.sort] || sorters["score-desc"]);
    currentResultCount = output.length;
    return output;
  }

  function activeCount() {
    let count = 0;
    Object.entries(state).forEach(([key, value]) => {
      const defaultValue = defaultState[key];
      if (Array.isArray(value)) {
        if (value.length) count += 1;
      } else if (value !== defaultValue && value !== "") {
        count += 1;
      }
    });
    return count;
  }

  function chips() {
    const result = [];
    if (state.search) result.push(`Text: ${state.search}`);
    if (state.location) result.push(`Lokalita: ${state.location}`);
    if (state.source) result.push(`Zdroj: ${state.source}`);
    if (state.countries.length) result.push(`Krajiny: ${state.countries.join("+")}`);
    if (state.categories.length) result.push(`Kategórie: ${state.categories.join("+")}`);
    if (state.purchaseMin !== "" || state.purchaseMax !== "") result.push(`Nákup ${state.purchaseMin || 0}–${state.purchaseMax || "∞"} €`);
    if (state.resaleMin !== "" || state.resaleMax !== "") result.push(`Predaj ${state.resaleMin || 0}–${state.resaleMax || "∞"} €`);
    if (state.minProfit !== "") result.push(`Zisk ≥ ${state.minProfit} €`);
    if (state.minRoi !== "") result.push(`ROI ≥ ${state.minRoi} %`);
    if (state.minScore !== "") result.push(`Score ≥ ${state.minScore}`);
    if (state.maxRisk !== "") result.push(`Riziko ≤ ${state.maxRisk}`);
    if (state.minDemand !== "") result.push(`Dopyt ≥ ${state.minDemand}`);
    if (state.maxAge !== "") result.push(`Vek ≤ ${state.maxAge} h`);
    if (state.minLogistics !== "") result.push(`Logistika ≥ ${state.minLogistics}`);
    if (state.verification === "clear") result.push("Bez verification hold");
    if (state.verification === "hold") result.push("Iba verification hold");
    if (state.profitableOnly) result.push("Iba ziskové");
    if (state.urgentOnly) result.push("Urgentné");
    return result;
  }

  function filterMarkup() {
    return `
      <div class="pro-filter-toolbar">
        <div class="pro-filter-summary">
          <strong>PRO FILTER</strong>
          <span id="proFilterActive" class="pill">0 aktívnych</span>
          <span id="proFilterResults" class="pill active">0 výsledkov</span>
        </div>
        <div class="pro-filter-actions">
          <button id="proFilterToggle" class="button ghost" type="button" aria-expanded="false">Rozšírený filter</button>
          <button id="proFilterReset" class="button ghost" type="button">Reset</button>
        </div>
      </div>
      <div id="proFilterPanel" class="pro-filter-panel" hidden>
        <div class="filter-preset-row">
          <select id="proPresetSelect" aria-label="Preset filtra"></select>
          <input id="proPresetName" type="text" maxlength="40" placeholder="Názov vlastného presetu" aria-label="Názov vlastného presetu">
          <button id="proPresetSave" class="button ghost" type="button">Uložiť preset</button>
        </div>

        <div class="pro-filter-grid">
          <section class="pro-filter-group wide">
            <h3>Hľadanie a lokalita</h3>
            <div class="pro-filter-fields">
              <label>Text / model / porucha<input id="pfSearch" type="search" placeholder="PS5 Pro, ECAM, HDMI, SSD…"></label>
              <label>Lokalita — oddeľ čiarkou<input id="pfLocation" type="text" placeholder="Bratislava, Senec, Šamorín"></label>
              <label>Zdroj<input id="pfSource" type="text" placeholder="Bazoš, OLX, Aukro…"></label>
              <label>Radenie
                <select id="pfSort">
                  <option value="score-desc">Najvyššie score</option>
                  <option value="profit-desc">Najvyšší čistý zisk</option>
                  <option value="roi-desc">Najvyššie ROI</option>
                  <option value="age-asc">Najnovšie ponuky</option>
                  <option value="purchase-asc">Najnižšia nákupná cena</option>
                  <option value="purchase-desc">Najvyššia nákupná cena</option>
                  <option value="risk-asc">Najnižšie riziko</option>
                </select>
              </label>
            </div>
          </section>

          <section class="pro-filter-group">
            <h3>Krajiny</h3>
            <div class="check-grid">
              <label><input class="pf-country" type="checkbox" value="SK"> Slovensko</label>
              <label><input class="pf-country" type="checkbox" value="CZ"> Česko</label>
              <label><input class="pf-country" type="checkbox" value="PL"> Poľsko</label>
              <label><input class="pf-country" type="checkbox" value="MANUAL"> Manuálne</label>
            </div>
          </section>

          <section class="pro-filter-group wide">
            <h3>Kategórie</h3>
            <div class="check-grid">
              <label><input class="pf-category" type="checkbox" value="delonghi"> De'Longhi / kávovary</label>
              <label><input class="pf-category" type="checkbox" value="consoles"> Konzoly / ovládače</label>
              <label><input class="pf-category" type="checkbox" value="pc"> PC / notebooky</label>
              <label><input class="pf-category" type="checkbox" value="games"> Hry / bundle</label>
              <label><input class="pf-category" type="checkbox" value="free"> Za odvoz / darované</label>
            </div>
          </section>

          <section class="pro-filter-group">
            <h3>Nákupná cena</h3>
            <div class="pro-filter-fields">
              <label>Min €<input id="pfPurchaseMin" type="number" min="0" step="1" placeholder="0"></label>
              <label>Max €<input id="pfPurchaseMax" type="number" min="0" step="1" placeholder="bez limitu"></label>
            </div>
          </section>

          <section class="pro-filter-group">
            <h3>Predajná cena</h3>
            <div class="pro-filter-fields">
              <label>Min €<input id="pfResaleMin" type="number" min="0" step="1" placeholder="0"></label>
              <label>Max €<input id="pfResaleMax" type="number" min="0" step="1" placeholder="bez limitu"></label>
            </div>
          </section>

          <section class="pro-filter-group wide">
            <h3>Ekonomika dealu</h3>
            <div class="pro-filter-fields">
              <label>Min. čistý zisk €<input id="pfMinProfit" type="number" step="1" placeholder="napr. 50"></label>
              <label>Min. ROI %<input id="pfMinRoi" type="number" step="1" placeholder="napr. 30"></label>
              <label>Min. Deal Score<input id="pfMinScore" type="number" min="0" max="100" step="1" placeholder="napr. 78"></label>
              <label>Min. dopyt 1–10<input id="pfMinDemand" type="number" min="1" max="10" step="1" placeholder="napr. 7"></label>
            </div>
          </section>

          <section class="pro-filter-group wide">
            <h3>Riziko, čerstvosť a logistika</h3>
            <div class="pro-filter-fields">
              <label>Max. technické riziko 1–10<input id="pfMaxRisk" type="number" min="1" max="10" step="1" placeholder="napr. 5"></label>
              <label>Max. vek ponuky v hodinách<input id="pfMaxAge" type="number" min="0" step="1" placeholder="napr. 24"></label>
              <label>Min. logistické skóre 1–10<input id="pfMinLogistics" type="number" min="1" max="10" step="1" placeholder="8 = cca do 30 km"></label>
              <label>Overenie
                <select id="pfVerification">
                  <option value="all">Všetky</option>
                  <option value="clear">Bez povinného overenia</option>
                  <option value="hold">Iba povinné overenie</option>
                </select>
              </label>
            </div>
          </section>

          <section class="pro-filter-group">
            <h3>Rýchle prepínače</h3>
            <div class="switch-row">
              <label><input id="pfProfitableOnly" type="checkbox"> Iba ziskové dealy</label>
              <label><input id="pfUrgentOnly" type="checkbox"> Urgentné: score ≥ 78 a ≤ 24 h</label>
            </div>
            <p class="filter-danger-note">Povinné overenie sa nesmie obísť filtrom. Cenový outlier zostáva manuálne blokovaný pred nákupom.</p>
          </section>
        </div>

        <div class="filter-footer">
          <div id="proFilterChips" class="filter-chips"></div>
          <div class="filter-result-count"><strong id="proFilterCountText">0</strong> zobrazených ponúk</div>
        </div>
      </div>`;
  }

  function buildUi() {
    if (document.getElementById("proFilterShell")) return;
    const inbox = document.querySelector('.section.panel[aria-labelledby="inbox-title"]');
    if (!inbox) return;
    const sectionHead = inbox.querySelector(".section-head");
    if (!sectionHead) return;

    const shell = document.createElement("div");
    shell.id = "proFilterShell";
    shell.className = "pro-filter-shell";
    shell.innerHTML = filterMarkup();
    sectionHead.insertAdjacentElement("afterend", shell);

    populatePresetOptions();
    applyStateToUi();
    bindUi();
    updateMeta();
  }

  function populatePresetOptions() {
    const select = document.getElementById("proPresetSelect");
    if (!select) return;
    const custom = loadCustomPresets();
    select.innerHTML = '<option value="">Vyber preset…</option>';

    Object.entries(builtInPresets).forEach(([id, preset]) => {
      const option = document.createElement("option");
      option.value = `builtin:${id}`;
      option.textContent = preset.label;
      select.append(option);
    });

    Object.entries(custom).forEach(([id, preset]) => {
      const option = document.createElement("option");
      option.value = `custom:${id}`;
      option.textContent = `★ ${preset.label || id}`;
      select.append(option);
    });
  }

  function checkedValues(selector) {
    return Array.from(document.querySelectorAll(selector)).filter(input => input.checked).map(input => input.value);
  }

  function value(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
  }

  function checked(id) {
    const element = document.getElementById(id);
    return Boolean(element && element.checked);
  }

  function collectState() {
    state = normalizeState({
      ...state,
      search: value("pfSearch").trim(),
      location: value("pfLocation").trim(),
      source: value("pfSource").trim(),
      countries: checkedValues(".pf-country"),
      categories: checkedValues(".pf-category"),
      purchaseMin: value("pfPurchaseMin"),
      purchaseMax: value("pfPurchaseMax"),
      resaleMin: value("pfResaleMin"),
      resaleMax: value("pfResaleMax"),
      minProfit: value("pfMinProfit"),
      minRoi: value("pfMinRoi"),
      minScore: value("pfMinScore"),
      maxRisk: value("pfMaxRisk"),
      minDemand: value("pfMinDemand"),
      maxAge: value("pfMaxAge"),
      minLogistics: value("pfMinLogistics"),
      verification: value("pfVerification") || "all",
      profitableOnly: checked("pfProfitableOnly"),
      urgentOnly: checked("pfUrgentOnly"),
      sort: value("pfSort") || "score-desc"
    });
    saveState();
  }

  function setInput(id, nextValue) {
    const element = document.getElementById(id);
    if (element) element.value = nextValue ?? "";
  }

  function setChecked(id, nextValue) {
    const element = document.getElementById(id);
    if (element) element.checked = Boolean(nextValue);
  }

  function applyStateToUi() {
    setInput("pfSearch", state.search);
    setInput("pfLocation", state.location);
    setInput("pfSource", state.source);
    setInput("pfPurchaseMin", state.purchaseMin);
    setInput("pfPurchaseMax", state.purchaseMax);
    setInput("pfResaleMin", state.resaleMin);
    setInput("pfResaleMax", state.resaleMax);
    setInput("pfMinProfit", state.minProfit);
    setInput("pfMinRoi", state.minRoi);
    setInput("pfMinScore", state.minScore);
    setInput("pfMaxRisk", state.maxRisk);
    setInput("pfMinDemand", state.minDemand);
    setInput("pfMaxAge", state.maxAge);
    setInput("pfMinLogistics", state.minLogistics);
    setInput("pfVerification", state.verification);
    setInput("pfSort", state.sort);
    setChecked("pfProfitableOnly", state.profitableOnly);
    setChecked("pfUrgentOnly", state.urgentOnly);

    document.querySelectorAll(".pf-country").forEach(input => {
      input.checked = state.countries.includes(input.value);
    });
    document.querySelectorAll(".pf-category").forEach(input => {
      input.checked = state.categories.includes(input.value);
    });
  }

  function applyAndRender() {
    collectState();
    renderDeals();
    updateMeta();
  }

  function resetFilters() {
    state = cloneDefaults();
    saveState();
    applyStateToUi();
    const basicCountry = document.getElementById("filterCountry");
    const basicCategory = document.getElementById("filterCategory");
    const basicVerdict = document.getElementById("filterVerdict");
    if (basicCountry) basicCountry.value = "all";
    if (basicCategory) basicCategory.value = "all";
    if (basicVerdict) basicVerdict.value = "all";
    renderDeals();
    updateMeta();
  }

  function applyPreset(identifier) {
    if (!identifier) return;
    const [type, id] = identifier.split(":");
    let preset = null;
    if (type === "builtin") preset = builtInPresets[id];
    if (type === "custom") preset = loadCustomPresets()[id];
    if (!preset || !preset.state) return;

    state = normalizeState({ ...cloneDefaults(), ...preset.state });
    saveState();
    applyStateToUi();
    renderDeals();
    updateMeta();
  }

  function savePreset() {
    const nameInput = document.getElementById("proPresetName");
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
      if (nameInput) nameInput.focus();
      return;
    }

    collectState();
    const custom = loadCustomPresets();
    const id = `${Date.now()}`;
    custom[id] = { label: name, state: { ...state } };
    saveCustomPresets(custom);
    if (nameInput) nameInput.value = "";
    populatePresetOptions();
    const select = document.getElementById("proPresetSelect");
    if (select) select.value = `custom:${id}`;
  }

  function updateMeta() {
    const count = activeCount();
    const active = document.getElementById("proFilterActive");
    const results = document.getElementById("proFilterResults");
    const countText = document.getElementById("proFilterCountText");
    const chipsContainer = document.getElementById("proFilterChips");

    if (active) {
      active.textContent = `${count} aktívnych`;
      active.classList.toggle("active", count > 0);
    }
    if (results) results.textContent = `${currentResultCount} výsledkov`;
    if (countText) countText.textContent = String(currentResultCount);
    if (chipsContainer) {
      chipsContainer.innerHTML = chips().map(text => `<span class="filter-chip">${escapeHtml(text)}</span>`).join("");
    }
  }

  function bindUi() {
    const toggle = document.getElementById("proFilterToggle");
    const panel = document.getElementById("proFilterPanel");
    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
        toggle.textContent = expanded ? "Rozšírený filter" : "Skryť filter";
      });
    }

    document.getElementById("proFilterReset")?.addEventListener("click", resetFilters);
    document.getElementById("proPresetSelect")?.addEventListener("change", event => applyPreset(event.target.value));
    document.getElementById("proPresetSave")?.addEventListener("click", savePreset);

    const liveInputs = document.querySelectorAll(
      "#proFilterPanel input:not(#proPresetName), #proFilterPanel select:not(#proPresetSelect)"
    );
    liveInputs.forEach(input => {
      const eventName = input.type === "text" || input.type === "search" || input.type === "number" ? "input" : "change";
      input.addEventListener(eventName, applyAndRender);
    });

    ["filterCountry", "filterCategory", "filterVerdict"].forEach(id => {
      document.getElementById(id)?.addEventListener("change", () => queueMicrotask(updateMeta));
    });
  }

  function installFilterHooks() {
    if (typeof filteredDeals !== "function" || typeof renderDeals !== "function") return false;

    const basicFilteredDeals = filteredDeals;
    filteredDeals = function filteredDealsWithProFilter() {
      return applyAdvancedFilters(basicFilteredDeals());
    };

    const previousRenderDeals = renderDeals;
    renderDeals = function renderDealsWithFilterMeta() {
      previousRenderDeals();
      updateMeta();
    };

    return true;
  }

  function boot() {
    buildUi();
    if (!installFilterHooks()) return;
    renderDeals();
    updateMeta();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
