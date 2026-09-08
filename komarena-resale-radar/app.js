"use strict";

const WATCHLIST_KEY = "komarena-resale-radar-watchlist-v1";

const CATEGORY_LABELS = {
  delonghi: "Kávovary",
  consoles: "Konzoly",
  pc: "PC / notebooky",
  games: "Hry",
  free: "Za odvoz"
};

const SOURCE_FALLBACK = [
  { id: "bazos-sk", name: "Bazoš.sk", country: "SK", priority: 1, url: "https://www.bazos.sk/", monitoring: ["RSS", "e-mail", "saved query"], status: "ready" },
  { id: "bazos-cz", name: "Bazoš.cz", country: "CZ", priority: 1, url: "https://www.bazos.cz/", monitoring: ["RSS", "e-mail", "saved query"], status: "ready" },
  { id: "darujizaodvoz-cz", name: "Daruji za odvoz", country: "CZ", priority: 1, url: "https://www.darujizaodvoz.cz/", monitoring: ["app alert", "manual review"], status: "ready-manual" },
  { id: "olx-pl", name: "OLX.pl", country: "PL", priority: 1, url: "https://www.olx.pl/", monitoring: ["saved search", "platform alert"], status: "ready" },
  { id: "allegro-lokalnie-pl", name: "Allegro Lokalnie", country: "PL", priority: 1, url: "https://allegrolokalnie.pl/", monitoring: ["saved search", "manual review"], status: "ready-manual" }
];

const SAMPLE_DEALS = [
  {
    id: "demo-delonghi-local",
    title: "De'Longhi Magnifica S — modelový lokálny kus",
    category: "delonghi",
    country: "SK",
    source: "Modelový príklad",
    location: "Bratislava okolie",
    purchase: 35,
    shipping: 0,
    parts: 20,
    fees: 0,
    other: 0,
    contingency: 15,
    resale: 180,
    demand: 8,
    risk: 3,
    ageHours: 0.8,
    logistics: 10,
    note: "Modelový príklad známej opraviteľnej poruchy; nie živý inzerát."
  },
  {
    id: "demo-ps4",
    title: "PS4 Slim + DualShock — modelový bundle",
    category: "consoles",
    country: "SK",
    source: "Modelový príklad",
    location: "Senec",
    purchase: 100,
    shipping: 0,
    parts: 4,
    fees: 0,
    other: 0,
    contingency: 10,
    resale: 145,
    demand: 9,
    risk: 2,
    ageHours: 0.5,
    logistics: 10,
    note: "Pred nákupom test HDMI, mechaniky, Wi‑Fi, ovládača a účtových zámkov."
  },
  {
    id: "demo-thinkpad",
    title: "ThinkPad business notebook — chýbajúci SSD",
    category: "pc",
    country: "CZ",
    source: "Modelový príklad",
    location: "Brno",
    purchase: 90,
    shipping: 8,
    parts: 25,
    fees: 0,
    other: 4,
    contingency: 15,
    resale: 195,
    demand: 8,
    risk: 3,
    ageHours: 9,
    logistics: 5,
    note: "Dobrá iba pri funkčnej doske, displeji a bez BIOS locku."
  },
  {
    id: "demo-games",
    title: "PlayStation hry — modelový 8 ks bundle",
    category: "games",
    country: "SK",
    source: "Modelový príklad",
    location: "Šamorín",
    purchase: 50,
    shipping: 0,
    parts: 0,
    fees: 7,
    other: 0,
    contingency: 5,
    resale: 105,
    demand: 9,
    risk: 2,
    ageHours: 4,
    logistics: 10,
    note: "Zisk vzniká rozdelením bundle na hodnotnejšie samostatné kusy."
  },
  {
    id: "demo-free-pc",
    title: "Nekompletný PC za odvoz — modelový príklad",
    category: "free",
    country: "CZ",
    source: "Modelový príklad",
    location: "do 80 km",
    purchase: 0,
    shipping: 12,
    parts: 10,
    fees: 0,
    other: 5,
    contingency: 8,
    resale: 60,
    demand: 6,
    risk: 4,
    ageHours: 18,
    logistics: 5,
    note: "Aj nulová cena musí zaplatiť cestu, test, čistenie a likvidáciu zvyšku."
  }
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function profitPoints(profit) {
  if (profit >= 200) return 25;
  if (profit >= 120) return 22;
  if (profit >= 80) return 18;
  if (profit >= 50) return 14;
  if (profit >= 25) return 8;
  if (profit > 0) return 3;
  return 0;
}

function roiPoints(roi) {
  if (roi >= 100) return 20;
  if (roi >= 70) return 18;
  if (roi >= 50) return 15;
  if (roi >= 35) return 12;
  if (roi >= 20) return 7;
  if (roi > 0) return 3;
  return 0;
}

function freshnessPoints(hours) {
  if (hours <= 1) return 10;
  if (hours <= 6) return 8;
  if (hours <= 24) return 6;
  if (hours <= 72) return 3;
  return 1;
}

function verdictFor(score, profit, veto = false) {
  if (veto || profit <= 0) return "skip";
  if (score >= 78) return "buy";
  if (score >= 62) return "negotiate";
  if (score >= 50) return "watch";
  return "skip";
}

function calculateDeal(deal) {
  const purchase = Number(deal.purchase || 0);
  const shipping = Number(deal.shipping || 0);
  const parts = Number(deal.parts || 0);
  const fees = Number(deal.fees || 0);
  const other = Number(deal.other || 0);
  const contingency = Number(deal.contingency || 0);
  const resale = Number(deal.resale || 0);
  const demand = clamp(Number(deal.demand || 1), 1, 10);
  const risk = clamp(Number(deal.risk || 10), 1, 10);
  const ageHours = Math.max(0, Number(deal.ageHours || 0));
  const logistics = clamp(Number(deal.logistics || 1), 1, 10);

  const totalCost = purchase + shipping + parts + fees + other + contingency;
  const netProfit = resale - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : (netProfit > 0 ? 999 : 0);
  const scoreRaw =
    profitPoints(netProfit) +
    roiPoints(roi) +
    demand * 2 +
    (11 - risk) * 1.5 +
    freshnessPoints(ageHours) +
    logistics;
  const score = Math.round(clamp(scoreRaw, 0, 100));
  const verdict = verdictFor(score, netProfit, Boolean(deal.veto));

  return { ...deal, totalCost, netProfit, roi, score, verdict };
}

const deals = SAMPLE_DEALS.map(calculateDeal).sort((a, b) => b.score - a.score);

function euro(value) {
  return new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value || 0);
}

function pct(value) {
  if (!Number.isFinite(value)) return "—";
  const capped = Math.min(value, 999);
  return `${Math.round(capped)} %`;
}

function verdictLabel(verdict) {
  return {
    buy: "KÚPIŤ",
    negotiate: "VYJEDNÁVAŤ",
    watch: "SLEDOVAŤ",
    skip: "PRESKOČIŤ"
  }[verdict] || "SLEDOVAŤ";
}

function getWatchlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function setWatchlist(items) {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
  } catch (_) {
    // localStorage may be unavailable in hardened/private contexts.
  }
  renderWatchlist();
  renderKpis();
}

function saveToWatchlist(item) {
  const current = getWatchlist();
  if (current.some(entry => entry.id === item.id)) return;
  current.unshift({ ...item, savedAt: new Date().toISOString() });
  setWatchlist(current.slice(0, 100));
}

function removeFromWatchlist(id) {
  setWatchlist(getWatchlist().filter(item => item.id !== id));
}

function renderKpis() {
  const hot = deals.filter(deal => deal.score >= 78 && deal.verdict === "buy");
  const profit = deals.reduce((sum, deal) => sum + Math.max(0, deal.netProfit), 0);
  document.getElementById("kpiDeals").textContent = String(deals.length);
  document.getElementById("kpiHot").textContent = String(hot.length);
  document.getElementById("kpiProfit").textContent = euro(profit);
  document.getElementById("kpiWatchlist").textContent = String(getWatchlist().length);
}

function filteredDeals() {
  const country = document.getElementById("filterCountry").value;
  const category = document.getElementById("filterCategory").value;
  const verdict = document.getElementById("filterVerdict").value;

  return deals.filter(deal =>
    (country === "all" || deal.country === country) &&
    (category === "all" || deal.category === category) &&
    (verdict === "all" || deal.verdict === verdict)
  );
}

function renderDeals() {
  const rows = document.getElementById("dealRows");
  const data = filteredDeals();
  rows.innerHTML = data.map(deal => `
    <tr>
      <td><span class="score">${deal.score}</span></td>
      <td>
        <span class="product-title">${escapeHtml(deal.title)}</span>
        <span class="meta">${escapeHtml(CATEGORY_LABELS[deal.category] || deal.category)} · ${escapeHtml(deal.location || "")}</span>
      </td>
      <td>${escapeHtml(deal.source)}<br><span class="meta">${deal.country}</span></td>
      <td>${euro(deal.purchase)}</td>
      <td>${euro(deal.shipping + deal.parts + deal.fees + deal.other + deal.contingency)}</td>
      <td>${euro(deal.resale)}</td>
      <td><strong>${euro(deal.netProfit)}</strong></td>
      <td>${pct(deal.roi)}</td>
      <td><span class="verdict ${deal.verdict}">${verdictLabel(deal.verdict)}</span></td>
      <td><button class="button ghost save-deal" type="button" data-id="${deal.id}">Uložiť</button></td>
    </tr>
  `).join("");

  document.getElementById("emptyDeals").hidden = data.length > 0;
}

function renderWatchlist() {
  const items = getWatchlist();
  const cards = document.getElementById("watchlistCards");
  const empty = document.getElementById("emptyWatchlist");

  cards.innerHTML = items.map(item => `
    <article class="watch-card">
      <button class="remove-watch" type="button" data-remove-id="${escapeHtml(item.id)}" aria-label="Odstrániť z watchlistu">×</button>
      <p class="eyebrow">${escapeHtml(item.country || "MANUAL")} · ${escapeHtml(CATEGORY_LABELS[item.category] || item.category || "ANALÝZA")}</p>
      <h3>${escapeHtml(item.title || "Bez názvu")}</h3>
      <p>${escapeHtml(item.note || "Uložené na ďalšie overenie.")}</p>
      <div class="watch-metrics">
        <span>Score ${Math.round(Number(item.score || 0))}</span>
        <span>Zisk ${euro(Number(item.netProfit || 0))}</span>
        <span>ROI ${pct(Number(item.roi || 0))}</span>
        <span class="verdict ${escapeHtml(item.verdict || "watch")}">${verdictLabel(item.verdict || "watch")}</span>
      </div>
    </article>
  `).join("");

  empty.hidden = items.length > 0;
}

function readNum(id, fallback = 0) {
  const value = Number(document.getElementById(id).value);
  return Number.isFinite(value) ? value : fallback;
}

function analyzerInput() {
  return {
    id: `manual-${Date.now()}`,
    title: document.getElementById("qaTitle").value.trim() || "Manuálna analýza",
    category: "delonghi",
    country: "MANUAL",
    source: "Quick Analyzer",
    location: "manuálne",
    purchase: readNum("qaPurchase"),
    resale: readNum("qaResale"),
    shipping: readNum("qaShipping"),
    parts: readNum("qaParts"),
    fees: 0,
    other: readNum("qaOther"),
    contingency: readNum("qaContingency"),
    demand: readNum("qaDemand", 1),
    risk: readNum("qaRisk", 10),
    ageHours: readNum("qaAge"),
    logistics: readNum("qaLogistics", 1),
    note: "Manuálne vypočítané v Quick Analyzeri. Pred nákupom overiť stav, model, vlastníctvo a trhovú cenu."
  };
}

function reasonFor(result) {
  if (result.netProfit <= 0) return "Ekonomika je záporná alebo nulová. Bez výrazne nižšej nákupnej ceny ponuku preskočiť.";
  if (result.verdict === "buy") return "Silná kombinácia zisku, ROI, dopytu a rizika. Priorita na okamžité manuálne overenie — nie automatický nákup.";
  if (result.verdict === "negotiate") return "Zaujímavá ponuka, ale rezerva nie je dostatočne silná. Skús znížiť nákupnú cenu alebo potvrdiť lacnejšiu opravu.";
  if (result.verdict === "watch") return "Ponuka je hraničná. Sleduj pokles ceny, doplň diagnostiku alebo počkaj na lepší pomer kapitálu a zisku.";
  return "Score je príliš nízke vzhľadom na viazaný kapitál, riziko alebo slabý absolútny zisk.";
}

let latestAnalysis = null;

function renderAnalysis(result) {
  latestAnalysis = result;
  document.getElementById("qaScore").textContent = String(result.score);
  const verdict = document.getElementById("qaVerdict");
  verdict.className = `verdict ${result.verdict}`;
  verdict.textContent = verdictLabel(result.verdict);
  document.getElementById("qaTotal").textContent = euro(result.totalCost);
  document.getElementById("qaProfit").textContent = euro(result.netProfit);
  document.getElementById("qaRoi").textContent = pct(result.roi);
  document.getElementById("qaBreakEven").textContent = euro(result.totalCost);
  document.getElementById("qaReason").textContent = reasonFor(result);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadSources() {
  let sources = SOURCE_FALLBACK;
  try {
    const response = await fetch("data/sources.json", { cache: "no-store" });
    if (response.ok) {
      const json = await response.json();
      if (Array.isArray(json.sources)) sources = json.sources;
    }
  } catch (_) {
    // Opening index.html directly from disk can block fetch; fallback keeps UI usable.
  }

  const container = document.getElementById("sourceCards");
  container.innerHTML = sources
    .sort((a, b) => (a.priority || 9) - (b.priority || 9))
    .map(source => `
      <article class="source-card">
        <div class="source-meta">
          <span class="country">${escapeHtml(source.country)}</span>
          <span class="pill">P${escapeHtml(source.priority)}</span>
        </div>
        <h3><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.name)}</a></h3>
        <p>${escapeHtml((source.monitoring || []).join(" · "))}</p>
        <span class="pill">${escapeHtml(source.status || "candidate")}</span>
      </article>
    `).join("");
  document.getElementById("sourceCount").textContent = `${sources.length} zdrojov`;
}

function bindEvents() {
  ["filterCountry", "filterCategory", "filterVerdict"].forEach(id => {
    document.getElementById(id).addEventListener("change", renderDeals);
  });

  document.getElementById("dealRows").addEventListener("click", event => {
    const button = event.target.closest(".save-deal");
    if (!button) return;
    const deal = deals.find(item => item.id === button.dataset.id);
    if (deal) saveToWatchlist(deal);
  });

  document.getElementById("watchlistCards").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-id]");
    if (button) removeFromWatchlist(button.dataset.removeId);
  });

  document.getElementById("clearWatchlist").addEventListener("click", () => {
    if (getWatchlist().length === 0) return;
    if (window.confirm("Vymazať všetky lokálne uložené položky z watchlistu?")) setWatchlist([]);
  });

  document.getElementById("analyzerForm").addEventListener("submit", event => {
    event.preventDefault();
    renderAnalysis(calculateDeal(analyzerInput()));
  });

  document.getElementById("saveAnalysis").addEventListener("click", () => {
    const fresh = calculateDeal(analyzerInput());
    renderAnalysis(fresh);
    saveToWatchlist(fresh);
  });

  ["qaPurchase", "qaResale", "qaShipping", "qaParts", "qaOther", "qaContingency", "qaDemand", "qaRisk", "qaAge", "qaLogistics"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => renderAnalysis(calculateDeal(analyzerInput())));
  });
}

function init() {
  renderKpis();
  renderDeals();
  renderWatchlist();
  renderAnalysis(calculateDeal(analyzerInput()));
  bindEvents();
  loadSources();
}

document.addEventListener("DOMContentLoaded", init);
