"use strict";

(function enableLiveSnapshot() {
  const originalRenderDeals = renderDeals;

  function safeExternalUrl(value) {
    try {
      const url = new URL(String(value));
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch (_) {
      return null;
    }
  }

  function dealIdentity(item) {
    if (item?.sourceFamily && item?.listingId) return `${item.sourceFamily}:${item.listingId}`;
    return String(item?.id || item?.sourceUrl || "");
  }

  function decorateLiveRows() {
    document.querySelectorAll("#dealRows tr").forEach(row => {
      const saveButton = row.querySelector(".save-deal");
      if (!saveButton) return;

      const deal = deals.find(item => item.id === saveButton.dataset.id);
      if (!deal || !deal.sourceUrl) return;

      const productCell = row.children[1];
      const actionCell = row.children[row.children.length - 1];
      const url = safeExternalUrl(deal.sourceUrl);

      if (productCell && !productCell.querySelector(".live-evidence")) {
        const evidence = document.createElement("span");
        evidence.className = "meta live-evidence";
        const confidence = Math.round(Number(deal.evidenceConfidence || 0) * 100);
        const autoTag = deal.autoDiscovered ? "AUTO P1 · " : "LIVE · ";
        evidence.textContent = deal.verificationHold
          ? `${autoTag}POVINNÉ OVERENIE · evidencia ${confidence}%`
          : `${autoTag}evidencia ${confidence}%`;
        evidence.title = [deal.normalizedModel, deal.benchmark, deal.note].filter(Boolean).join("\n\n");
        productCell.append(document.createElement("br"), evidence);
      }

      if (actionCell && url && !actionCell.querySelector(".listing-link")) {
        const link = document.createElement("a");
        link.className = "button ghost listing-link";
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Inzerát";
        actionCell.append(document.createTextNode(" "), link);
      }
    });
  }

  renderDeals = function renderDealsWithLiveEvidence() {
    originalRenderDeals();
    decorateLiveRows();
  };

  function applyVerificationGate(result) {
    if (!result.verificationHold) return result;
    if (result.verdict === "buy") return { ...result, verdict: "negotiate" };
    return result;
  }

  async function fetchJsonOptional(url) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) return null;
      return await response.json();
    } catch (_) {
      return null;
    }
  }

  function mergeSnapshots(manualSnapshot, autoSnapshot) {
    const manual = Array.isArray(manualSnapshot?.deals) ? manualSnapshot.deals : [];
    const autoCandidates = Array.isArray(autoSnapshot?.candidates)
      ? autoSnapshot.candidates.map(item => ({ ...item, autoDiscovered: true }))
      : [];

    const merged = [];
    const seen = new Set();

    // Evidence-backed manual review always wins over an automatically enriched duplicate.
    for (const item of manual) {
      const key = dealIdentity(item);
      if (key) seen.add(key);
      merged.push(item);
    }

    for (const item of autoCandidates) {
      const key = dealIdentity(item);
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      merged.push(item);
    }

    return merged;
  }

  function updateLiveUi(snapshot, autoSnapshot, displayedCount) {
    const notice = document.querySelector(".notice");
    if (notice) {
      notice.innerHTML = "";
      const strong = document.createElement("strong");
      strong.textContent = "LIVE + AUTO P1: ";
      const autoText = autoSnapshot
        ? `Automatický intake zachytil ${Number(autoSnapshot.sourceListingCount || 0)} listingov a ${Number(autoSnapshot.inboxCandidateCount || 0)} prešlo konzervatívnym modelovým filtrom. `
        : "Automatický P1 snapshot zatiaľ nie je publikovaný na tejto vetve. ";
      notice.append(strong, document.createTextNode(
        `${displayedCount} ponúk je aktuálne pripravených v Deal Inboxe. ${autoText}` +
        "AUTO kandidát nikdy nedostane priamy verdikt KÚPIŤ: najprv sa overuje konkrétny model, stav, vlastníctvo a čerstvá trhová cena."
      ));
    }

    const dealKpi = document.getElementById("kpiDeals");
    if (dealKpi && dealKpi.nextElementSibling) {
      dealKpi.nextElementSibling.textContent = autoSnapshot ? "live + auto P1 candidates" : "evidence-backed snapshot";
    }

    const version = document.querySelector(".topbar .version");
    if (version) version.textContent = autoSnapshot ? "v0.2.0-P1" : (snapshot.version || "v0.2.0");
  }

  async function loadLiveSnapshot() {
    try {
      const [snapshot, autoSnapshot] = await Promise.all([
        fetchJsonOptional("data/live-deals.json"),
        fetchJsonOptional("data/p1-scored-listings.json")
      ]);

      if (!snapshot || !Array.isArray(snapshot.deals) || snapshot.deals.length === 0) {
        throw new Error("Live snapshot has no deals");
      }

      const combined = mergeSnapshots(snapshot, autoSnapshot);
      const scored = combined
        .map(item => applyVerificationGate(calculateDeal(item)))
        .sort((a, b) => b.score - a.score);

      deals.splice(0, deals.length, ...scored);
      renderKpis();
      renderDeals();
      updateLiveUi(snapshot, autoSnapshot, scored.length);
    } catch (error) {
      const notice = document.querySelector(".notice");
      if (notice) {
        notice.innerHTML = "<strong>Fallback režim:</strong> live snapshot sa nepodarilo načítať; Deal Inbox preto zobrazuje iba výslovne označené modelové dáta.";
      }
      console.warn("KomArena Resale Radar live snapshot unavailable:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", loadLiveSnapshot);
})();
