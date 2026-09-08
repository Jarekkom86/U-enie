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
        evidence.textContent = deal.verificationHold
          ? `LIVE · POVINNÉ OVERENIE · evidencia ${confidence}%`
          : `LIVE · evidencia ${confidence}%`;
        evidence.title = [deal.benchmark, deal.note].filter(Boolean).join("\n\n");
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

    // Price outliers and incomplete evidence never receive a direct BUY verdict.
    // The underlying score remains visible so the user can see the economic upside,
    // but the operational verdict is capped until identity/state evidence is checked.
    if (result.verdict === "buy") {
      return { ...result, verdict: "negotiate" };
    }
    return result;
  }

  function updateLiveUi(snapshot) {
    const notice = document.querySelector(".notice");
    if (notice) {
      notice.innerHTML = "";
      const strong = document.createElement("strong");
      strong.textContent = "LIVE snapshot: ";
      notice.append(strong, document.createTextNode(
        `verejné ponuky overené ${snapshot.observedAt || "dnes"}. ` +
        "Predajná cena, servis a riziková rezerva sú naše konzervatívne odhady. " +
        "Cenový outlier alebo chýbajúce údaje aktivujú povinné manuálne overenie."
      ));
    }

    const dealKpi = document.getElementById("kpiDeals");
    if (dealKpi && dealKpi.nextElementSibling) {
      dealKpi.nextElementSibling.textContent = "evidence-backed snapshot";
    }

    const version = document.querySelector(".topbar .version");
    if (version) version.textContent = snapshot.version || "v0.1.1";
  }

  async function loadLiveSnapshot() {
    try {
      const response = await fetch("data/live-deals.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const snapshot = await response.json();
      if (!snapshot || !Array.isArray(snapshot.deals) || snapshot.deals.length === 0) {
        throw new Error("Live snapshot has no deals");
      }

      const scored = snapshot.deals
        .map(item => applyVerificationGate(calculateDeal(item)))
        .sort((a, b) => b.score - a.score);

      deals.splice(0, deals.length, ...scored);
      renderKpis();
      renderDeals();
      updateLiveUi(snapshot);
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
