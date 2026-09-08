"use strict";

(function enableProFilterV2() {
  const STATE_KEY = "komarena-resale-radar-filters-v2";
  const PRESETS_KEY = "komarena-resale-radar-filter-presets-v2";

  const fallbackCategories = [
    { id: "delonghi", name: "De'Longhi a kávovary", priority: 1, repairability: 9, turnover: 8 },
    { id: "consoles", name: "Konzoly a ovládače", priority: 1, repairability: 7, turnover: 10 },
    { id: "pc", name: "PC a notebooky", priority: 1, repairability: 8, turnover: 8 },
    { id: "games", name: "Hry a bundle", priority: 1, repairability: 5, turnover: 10 },
    { id: "phones", name: "Telefóny a tablety", priority: 1, repairability: 7, turnover: 10 },
    { id: "robot-vacuums", name: "Robotické vysávače", priority: 1, repairability: 8, turnover: 8 },
    { id: "power-tools", name: "Aku náradie", priority: 1, repairability: 8, turnover: 9 },
    { id: "free", name: "Za odvoz / darované", priority: 2, repairability: 7, turnover: 6 }
  ];

  let categoryList = fallbackCategories.slice();
  let categoryMap = new Map(categoryList.map(item => [item.id, item]));
  let resultCount = 0;

  const defaults = {
    search: "",
    location: "",
    source: "",
    countries: [],
    priorities: [],
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
    minRepairability: "",
    minTurnover: "",
    verification: "all",
    profitableOnly: false,
    urgentOnly: false,
    sort: "score-desc"
  };

  const builtIns = {
    "p1-hunter": { label: "🎯 P1 — aktívny lov", state: { priorities: [1], minDemand: 7, minScore: 60, sort: "score-desc" } },
    "top-deals": { label: "🔥 Top deal", state: { minProfit: 60, minRoi: 35, minScore: 78, maxRisk: 5, minDemand: 7, maxAge: 48, profitableOnly: true, sort: "score-desc" } },
    "fast-flip": { label: "⚡ Rýchly obrat", state: { minProfit: 30, minRoi: 25, minScore: 65, maxRisk: 5, minDemand: 7, minTurnover: 8, maxAge: 72, profitableOnly: true, sort: "age-asc" } },
    "repairable": { label: "🔧 Najlepšie opraviteľné", state: { minRepairability: 8, maxRisk: 6, minRoi: 30, profitableOnly: true, sort: "profit-desc" } },
    "local-ba": { label: "📍 BA + SK / AT / HU", state: { countries: ["SK", "AT", "HU"], location: "Bratislava, Petržalka, Senec, Šamorín, Dunajská Streda, Malacky, Wien, Kittsee, Hainburg, Mosonmagyaróvár, Rajka", minLogistics: 5, sort: "score-desc" } },
    "coffee": { label: "☕ Kávovary", state: { categories: ["delonghi"], minProfit: 45, minRoi: 35, maxRisk: 5, profitableOnly: true, sort: "profit-desc" } },
    "console": { label: "🎮 Konzoly", state: { categories: ["consoles"], minProfit: 40, minRoi: 25, minDemand: 8, maxRisk: 5, profitableOnly: true, sort: "score-desc" } },
    "phones": { label: "📱 Telefóny", state: { categories: ["phones"], minProfit: 40, minRoi: 20, maxRisk: 5, profitableOnly: true, sort: "score-desc" } },
    "robot": { label: "🤖 Robotické vysávače", state: { categories: ["robot-vacuums"], minProfit: 40, minRoi: 35, maxRisk: 5, profitableOnly: true, sort: "profit-desc" } },
    "tools": { label: "🛠️ Aku náradie", state: { categories: ["power-tools"], minProfit: 30, minRoi: 30, maxRisk: 5, profitableOnly: true, sort: "score-desc" } },
    "free": { label: "♻️ Za odvoz / do 10 €", state: { categories: ["free"], purchaseMax: 10, minProfit: 20, minRoi: 50, maxRisk: 6, sort: "profit-desc" } },
    "verification": { label: "🛡️ Cenové outliery na overenie", state: { verification: "hold", sort: "score-desc" } }
  };

  function cloneDefaults() { return JSON.parse(JSON.stringify(defaults)); }
  function normalize(raw) {
    const next = { ...cloneDefaults(), ...(raw || {}) };
    ["countries", "priorities", "categories"].forEach(key => { if (!Array.isArray(next[key])) next[key] = []; });
    next.priorities = next.priorities.map(Number).filter(Number.isFinite);
    return next;
  }

  function loadState() {
    try { return normalize(JSON.parse(localStorage.getItem(STATE_KEY) || "{}")); }
    catch (_) { return cloneDefaults(); }
  }
  let state = loadState();

  function saveState() { try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {} }
  function loadCustom() { try { return JSON.parse(localStorage.getItem(PRESETS_KEY) || "{}"); } catch (_) { return {}; } }
  function saveCustom(value) { try { localStorage.setItem(PRESETS_KEY, JSON.stringify(value)); } catch (_) {} }

  function n(value) {
    if (value === "" || value === null || value === undefined) return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }
  function val(deal, key) { const num = Number(deal[key]); return Number.isFinite(num) ? num : 0; }
  function norm(value) { return String(value || "").toLocaleLowerCase("sk-SK").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function tokensMatch(value, query) {
    if (!query) return true;
    const hay = norm(value);
    return String(query).split(",").map(v => norm(v.trim())).filter(Boolean).some(token => hay.includes(token));
  }
  function esc(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function apply(input) {
    let out = input.filter(deal => {
      const meta = categoryMap.get(deal.category) || null;
      if (state.search) {
        const combined = [deal.title, deal.note, deal.benchmark, deal.category, meta?.name, deal.source, deal.location].join(" ");
        if (!norm(combined).includes(norm(state.search))) return false;
      }
      if (!tokensMatch(deal.location, state.location)) return false;
      if (!tokensMatch(deal.source, state.source)) return false;
      if (state.countries.length && !state.countries.includes(deal.country)) return false;
      if (state.categories.length && !state.categories.includes(deal.category)) return false;
      if (state.priorities.length) {
        if (!meta || !state.priorities.includes(Number(meta.priority))) return false;
      }

      const limits = {
        purchaseMin: n(state.purchaseMin), purchaseMax: n(state.purchaseMax), resaleMin: n(state.resaleMin), resaleMax: n(state.resaleMax),
        minProfit: n(state.minProfit), minRoi: n(state.minRoi), minScore: n(state.minScore), maxRisk: n(state.maxRisk),
        minDemand: n(state.minDemand), maxAge: n(state.maxAge), minLogistics: n(state.minLogistics),
        minRepairability: n(state.minRepairability), minTurnover: n(state.minTurnover)
      };
      if (limits.purchaseMin !== null && val(deal, "purchase") < limits.purchaseMin) return false;
      if (limits.purchaseMax !== null && val(deal, "purchase") > limits.purchaseMax) return false;
      if (limits.resaleMin !== null && val(deal, "resale") < limits.resaleMin) return false;
      if (limits.resaleMax !== null && val(deal, "resale") > limits.resaleMax) return false;
      if (limits.minProfit !== null && val(deal, "netProfit") < limits.minProfit) return false;
      if (limits.minRoi !== null && val(deal, "roi") < limits.minRoi) return false;
      if (limits.minScore !== null && val(deal, "score") < limits.minScore) return false;
      if (limits.maxRisk !== null && val(deal, "risk") > limits.maxRisk) return false;
      if (limits.minDemand !== null && val(deal, "demand") < limits.minDemand) return false;
      if (limits.maxAge !== null && val(deal, "ageHours") > limits.maxAge) return false;
      if (limits.minLogistics !== null && val(deal, "logistics") < limits.minLogistics) return false;
      if (limits.minRepairability !== null && Number(meta?.repairability || 0) < limits.minRepairability) return false;
      if (limits.minTurnover !== null && Number(meta?.turnover || 0) < limits.minTurnover) return false;
      if (state.verification === "clear" && deal.verificationHold) return false;
      if (state.verification === "hold" && !deal.verificationHold) return false;
      if (state.profitableOnly && val(deal, "netProfit") <= 0) return false;
      if (state.urgentOnly && !(val(deal, "score") >= 78 && val(deal, "ageHours") <= 24)) return false;
      return true;
    });

    const sorters = {
      "score-desc": (a,b) => val(b,"score")-val(a,"score"),
      "profit-desc": (a,b) => val(b,"netProfit")-val(a,"netProfit"),
      "roi-desc": (a,b) => val(b,"roi")-val(a,"roi"),
      "age-asc": (a,b) => val(a,"ageHours")-val(b,"ageHours"),
      "purchase-asc": (a,b) => val(a,"purchase")-val(b,"purchase"),
      "purchase-desc": (a,b) => val(b,"purchase")-val(a,"purchase"),
      "risk-asc": (a,b) => val(a,"risk")-val(b,"risk")
    };
    out = out.slice().sort(sorters[state.sort] || sorters["score-desc"]);
    resultCount = out.length;
    return out;
  }

  function checkedValues(selector) { return Array.from(document.querySelectorAll(selector)).filter(x => x.checked).map(x => x.value); }
  function inputValue(id) { return document.getElementById(id)?.value ?? ""; }
  function isChecked(id) { return Boolean(document.getElementById(id)?.checked); }

  function collect() {
    state = normalize({ ...state,
      search: inputValue("pf2Search").trim(), location: inputValue("pf2Location").trim(), source: inputValue("pf2Source").trim(),
      countries: checkedValues(".pf2-country"), priorities: checkedValues(".pf2-priority").map(Number), categories: checkedValues(".pf2-category"),
      purchaseMin: inputValue("pf2PurchaseMin"), purchaseMax: inputValue("pf2PurchaseMax"), resaleMin: inputValue("pf2ResaleMin"), resaleMax: inputValue("pf2ResaleMax"),
      minProfit: inputValue("pf2MinProfit"), minRoi: inputValue("pf2MinRoi"), minScore: inputValue("pf2MinScore"), maxRisk: inputValue("pf2MaxRisk"), minDemand: inputValue("pf2MinDemand"), maxAge: inputValue("pf2MaxAge"), minLogistics: inputValue("pf2MinLogistics"),
      minRepairability: inputValue("pf2MinRepairability"), minTurnover: inputValue("pf2MinTurnover"), verification: inputValue("pf2Verification") || "all",
      profitableOnly: isChecked("pf2Profitable"), urgentOnly: isChecked("pf2Urgent"), sort: inputValue("pf2Sort") || "score-desc"
    });
    saveState();
  }

  function activeCount() {
    return Object.entries(state).reduce((count,[key,value]) => {
      if (Array.isArray(value)) return count + (value.length ? 1 : 0);
      return count + ((value !== defaults[key] && value !== "") ? 1 : 0);
    }, 0);
  }

  function categoryMarkup() {
    return categoryList
      .slice()
      .sort((a,b) => Number(a.priority)-Number(b.priority) || String(a.name).localeCompare(String(b.name),"sk"))
      .map(item => `<label title="P${esc(item.priority)} · opraviteľnosť ${esc(item.repairability ?? "–")}/10 · obrat ${esc(item.turnover ?? "–")}/10"><input class="pf2-category" type="checkbox" value="${esc(item.id)}"> P${esc(item.priority)} · ${esc(item.name)}</label>`)
      .join("");
  }

  function markup() {
    return `
      <div class="pro-filter-toolbar">
        <div class="pro-filter-summary"><strong>PRO FILTER v2</strong><span id="pf2Active" class="pill">0 aktívnych</span><span id="pf2Results" class="pill active">0 výsledkov</span></div>
        <div class="pro-filter-actions"><button id="pf2Toggle" class="button ghost" type="button" aria-expanded="false">Rozšírený filter</button><button id="pf2Reset" class="button ghost" type="button">Reset</button></div>
      </div>
      <div id="pf2Panel" class="pro-filter-panel" hidden>
        <div class="filter-preset-row"><select id="pf2Preset"></select><input id="pf2PresetName" type="text" maxlength="40" placeholder="Názov vlastného presetu"><button id="pf2SavePreset" class="button ghost" type="button">Uložiť preset</button></div>
        <div class="pro-filter-grid">
          <section class="pro-filter-group wide"><h3>Hľadanie, lokalita a zdroj</h3><div class="pro-filter-fields">
            <label>Text / model / porucha<input id="pf2Search" type="search" placeholder="PS5, ECAM, iPhone, Dyson, Makita, HDMI…"></label>
            <label>Lokalita — viac miest čiarkou<input id="pf2Location" type="text" placeholder="Bratislava, Senec, Wien, Kittsee…"></label>
            <label>Zdroj<input id="pf2Source" type="text" placeholder="Bazoš, OLX, Willhaben, Aukro…"></label>
            <label>Radenie<select id="pf2Sort"><option value="score-desc">Najvyššie score</option><option value="profit-desc">Najvyšší zisk</option><option value="roi-desc">Najvyššie ROI</option><option value="age-asc">Najnovšie</option><option value="purchase-asc">Najnižšia cena</option><option value="purchase-desc">Najvyššia cena</option><option value="risk-asc">Najnižšie riziko</option></select></label>
          </div></section>
          <section class="pro-filter-group"><h3>Krajiny</h3><div class="check-grid">
            <label><input class="pf2-country" type="checkbox" value="SK"> SK</label><label><input class="pf2-country" type="checkbox" value="CZ"> CZ</label><label><input class="pf2-country" type="checkbox" value="PL"> PL</label><label><input class="pf2-country" type="checkbox" value="AT"> AT</label><label><input class="pf2-country" type="checkbox" value="HU"> HU</label><label><input class="pf2-country" type="checkbox" value="DE"> DE</label><label><input class="pf2-country" type="checkbox" value="MANUAL"> Manuálne</label>
          </div></section>
          <section class="pro-filter-group"><h3>Priorita segmentu</h3><div class="check-grid"><label><input class="pf2-priority" type="checkbox" value="1"> P1 aktívne loviť</label><label><input class="pf2-priority" type="checkbox" value="2"> P2 silné</label><label><input class="pf2-priority" type="checkbox" value="3"> P3 selektívne</label><label><input class="pf2-priority" type="checkbox" value="4"> P4 výnimočne</label></div></section>
          <section class="pro-filter-group wide"><h3>Kategórie</h3><div id="pf2Categories" class="check-grid category-check-grid">${categoryMarkup()}</div></section>
          <section class="pro-filter-group"><h3>Nákupná cena</h3><div class="pro-filter-fields"><label>Min €<input id="pf2PurchaseMin" type="number" min="0" step="1"></label><label>Max €<input id="pf2PurchaseMax" type="number" min="0" step="1"></label></div></section>
          <section class="pro-filter-group"><h3>Predajná cena</h3><div class="pro-filter-fields"><label>Min €<input id="pf2ResaleMin" type="number" min="0" step="1"></label><label>Max €<input id="pf2ResaleMax" type="number" min="0" step="1"></label></div></section>
          <section class="pro-filter-group wide"><h3>Ekonomika dealu</h3><div class="pro-filter-fields"><label>Min. čistý zisk €<input id="pf2MinProfit" type="number" step="1"></label><label>Min. ROI %<input id="pf2MinRoi" type="number" step="1"></label><label>Min. Deal Score<input id="pf2MinScore" type="number" min="0" max="100"></label><label>Min. dopyt 1–10<input id="pf2MinDemand" type="number" min="1" max="10"></label></div></section>
          <section class="pro-filter-group wide"><h3>Riziko a logistika</h3><div class="pro-filter-fields"><label>Max. riziko 1–10<input id="pf2MaxRisk" type="number" min="1" max="10"></label><label>Max. vek h<input id="pf2MaxAge" type="number" min="0"></label><label>Min. logistika 1–10<input id="pf2MinLogistics" type="number" min="1" max="10"></label><label>Overenie<select id="pf2Verification"><option value="all">Všetky</option><option value="clear">Bez hold</option><option value="hold">Iba povinné overenie</option></select></label></div></section>
          <section class="pro-filter-group"><h3>Kvalita segmentu</h3><div class="pro-filter-fields"><label>Min. opraviteľnosť 1–10<input id="pf2MinRepairability" type="number" min="1" max="10"></label><label>Min. obrat 1–10<input id="pf2MinTurnover" type="number" min="1" max="10"></label></div></section>
          <section class="pro-filter-group"><h3>Rýchle prepínače</h3><div class="switch-row"><label><input id="pf2Profitable" type="checkbox"> Iba ziskové</label><label><input id="pf2Urgent" type="checkbox"> Urgentné score ≥78 / ≤24h</label></div><p class="filter-danger-note">Podozrivá cena alebo ownership/account lock zostáva povinné manuálne overenie.</p></section>
        </div>
        <div class="filter-footer"><div id="pf2Chips" class="filter-chips"></div><div class="filter-result-count"><strong id="pf2Count">0</strong> ponúk</div></div>
      </div>`;
  }

  function buildUi() {
    if (document.getElementById("proFilterShellV2")) return;
    const inbox = document.querySelector('.section.panel[aria-labelledby="inbox-title"]');
    const head = inbox?.querySelector(".section-head");
    if (!head) return;
    const shell = document.createElement("div"); shell.id = "proFilterShellV2"; shell.className = "pro-filter-shell"; shell.innerHTML = markup(); head.insertAdjacentElement("afterend", shell);
    populatePresets(); applyStateToUi(); bindUi(); updateMeta();
  }

  function populatePresets() {
    const select = document.getElementById("pf2Preset"); if (!select) return;
    select.innerHTML = '<option value="">Vyber preset…</option>';
    Object.entries(builtIns).forEach(([id,p]) => { const o=document.createElement("option"); o.value=`builtin:${id}`; o.textContent=p.label; select.append(o); });
    Object.entries(loadCustom()).forEach(([id,p]) => { const o=document.createElement("option"); o.value=`custom:${id}`; o.textContent=`★ ${p.label || id}`; select.append(o); });
  }

  function setValue(id,value) { const e=document.getElementById(id); if(e) e.value=value ?? ""; }
  function setChecked(id,value) { const e=document.getElementById(id); if(e) e.checked=Boolean(value); }
  function applyStateToUi() {
    const ids = { pf2Search:"search",pf2Location:"location",pf2Source:"source",pf2PurchaseMin:"purchaseMin",pf2PurchaseMax:"purchaseMax",pf2ResaleMin:"resaleMin",pf2ResaleMax:"resaleMax",pf2MinProfit:"minProfit",pf2MinRoi:"minRoi",pf2MinScore:"minScore",pf2MaxRisk:"maxRisk",pf2MinDemand:"minDemand",pf2MaxAge:"maxAge",pf2MinLogistics:"minLogistics",pf2MinRepairability:"minRepairability",pf2MinTurnover:"minTurnover",pf2Verification:"verification",pf2Sort:"sort" };
    Object.entries(ids).forEach(([id,key]) => setValue(id,state[key])); setChecked("pf2Profitable",state.profitableOnly); setChecked("pf2Urgent",state.urgentOnly);
    document.querySelectorAll(".pf2-country").forEach(x=>x.checked=state.countries.includes(x.value)); document.querySelectorAll(".pf2-priority").forEach(x=>x.checked=state.priorities.includes(Number(x.value))); document.querySelectorAll(".pf2-category").forEach(x=>x.checked=state.categories.includes(x.value));
  }

  function chips() {
    const out=[]; if(state.search)out.push(`Text: ${state.search}`); if(state.location)out.push(`Lokalita: ${state.location}`); if(state.source)out.push(`Zdroj: ${state.source}`); if(state.countries.length)out.push(`Krajiny: ${state.countries.join("+")}`); if(state.priorities.length)out.push(`Priority: ${state.priorities.map(x=>`P${x}`).join("+")}`); if(state.categories.length)out.push(`${state.categories.length} kategórií`);
    if(state.minProfit!=="")out.push(`Zisk ≥ ${state.minProfit} €`); if(state.minRoi!=="")out.push(`ROI ≥ ${state.minRoi}%`); if(state.minScore!=="")out.push(`Score ≥ ${state.minScore}`); if(state.maxRisk!=="")out.push(`Riziko ≤ ${state.maxRisk}`); if(state.minRepairability!=="")out.push(`Opraviteľnosť ≥ ${state.minRepairability}`); if(state.minTurnover!=="")out.push(`Obrat ≥ ${state.minTurnover}`); if(state.profitableOnly)out.push("Iba ziskové"); if(state.urgentOnly)out.push("Urgentné"); if(state.verification==="hold")out.push("Verification hold"); return out;
  }
  function updateMeta() {
    document.getElementById("pf2Active") && (document.getElementById("pf2Active").textContent=`${activeCount()} aktívnych`);
    document.getElementById("pf2Results") && (document.getElementById("pf2Results").textContent=`${resultCount} výsledkov`);
    document.getElementById("pf2Count") && (document.getElementById("pf2Count").textContent=String(resultCount));
    const c=document.getElementById("pf2Chips"); if(c)c.innerHTML=chips().map(x=>`<span class="filter-chip">${esc(x)}</span>`).join("");
  }

  function applyAndRender() { collect(); renderDeals(); updateMeta(); }
  function reset() { state=cloneDefaults(); saveState(); applyStateToUi(); ["filterCountry","filterCategory","filterVerdict"].forEach(id=>{const e=document.getElementById(id);if(e)e.value="all";}); renderDeals(); updateMeta(); }
  function applyPreset(value) {
    if(!value)return; const [type,id]=value.split(":"); const p=type==="builtin"?builtIns[id]:loadCustom()[id]; if(!p?.state)return; state=normalize({...cloneDefaults(),...p.state}); saveState(); applyStateToUi(); renderDeals(); updateMeta();
  }
  function savePreset() {
    const input=document.getElementById("pf2PresetName"); const name=input?.value.trim(); if(!name){input?.focus();return;} collect(); const all=loadCustom(); const id=String(Date.now()); all[id]={label:name,state:{...state}}; saveCustom(all); if(input)input.value=""; populatePresets(); const s=document.getElementById("pf2Preset"); if(s)s.value=`custom:${id}`;
  }
  function bindUi() {
    const toggle=document.getElementById("pf2Toggle"),panel=document.getElementById("pf2Panel"); toggle?.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));panel.hidden=open;toggle.textContent=open?"Rozšírený filter":"Skryť filter";});
    document.getElementById("pf2Reset")?.addEventListener("click",reset); document.getElementById("pf2Preset")?.addEventListener("change",e=>applyPreset(e.target.value)); document.getElementById("pf2SavePreset")?.addEventListener("click",savePreset);
    document.querySelectorAll("#pf2Panel input:not(#pf2PresetName), #pf2Panel select:not(#pf2Preset)").forEach(input=>{const ev=["text","search","number"].includes(input.type)?"input":"change";input.addEventListener(ev,applyAndRender);});
  }

  function decorateCategoryLabels() {
    document.querySelectorAll("#dealRows tr").forEach(row=>{const btn=row.querySelector(".save-deal"); const deal=btn?deals.find(d=>d.id===btn.dataset.id):null; const meta=deal?categoryMap.get(deal.category):null; const metaEl=row.children[1]?.querySelector(".meta"); if(metaEl&&meta)metaEl.textContent=`${meta.name} · ${deal.location || ""}`;});
  }

  function installHooks() {
    if(typeof filteredDeals!=="function"||typeof renderDeals!=="function")return false;
    const baseFiltered=filteredDeals; filteredDeals=function(){return apply(baseFiltered());};
    const baseRender=renderDeals; renderDeals=function(){baseRender();decorateCategoryLabels();updateMeta();};
    return true;
  }

  async function loadCategories() {
    try {
      const r=await fetch("data/categories.json",{cache:"no-store"}); if(!r.ok)throw new Error(`HTTP ${r.status}`); const j=await r.json(); if(Array.isArray(j.categories)&&j.categories.length){categoryList=j.categories;categoryMap=new Map(categoryList.map(x=>[x.id,x])); const grid=document.getElementById("pf2Categories"); if(grid){grid.innerHTML=categoryMarkup(); applyStateToUi(); grid.querySelectorAll(".pf2-category").forEach(input=>input.addEventListener("change",applyAndRender));} renderDeals();}
    } catch(error){console.warn("Resale Radar categories unavailable for filter:",error);}
  }

  function boot() { if(!installHooks())return; buildUi(); renderDeals(); loadCategories(); }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true}); else boot();
})();
