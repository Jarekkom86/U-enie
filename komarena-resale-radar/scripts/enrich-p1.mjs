import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const INPUT = path.join(ROOT, 'data', 'p1-auto-listings.json');
const RULES_FILE = path.join(ROOT, 'data', 'p1-model-rules.json');
const OUTPUT = path.join(ROOT, 'data', 'p1-scored-listings.json');

function normalize(value = '') {
  return String(value).toLocaleLowerCase('sk-SK').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
}

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

function parseBazosDate(text) {
  if (!text) return null;
  const match = String(text).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!match) return null;
  const [, d, m, y] = match;
  return new Date(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T12:00:00+02:00`);
}

function ageHours(item, now = new Date()) {
  const date = parseBazosDate(item.publishedDateText);
  if (!date || Number.isNaN(date.getTime())) return 168;
  return Math.max(0, (now - date) / 3600000);
}

function eurPrice(item, fx) {
  const price = Number(item.nativePrice);
  if (!Number.isFinite(price) || price <= 0) return null;
  if (item.nativeCurrency === 'EUR') return price;
  if (item.nativeCurrency === 'CZK') return price / Number(fx.CZK_PER_EUR || 1);
  if (item.nativeCurrency === 'PLN') return price / Number(fx.PLN_PER_EUR || 1);
  return null;
}

function containsAny(haystack, tokens = []) {
  return tokens.some(token => haystack.includes(normalize(token)));
}

function globalRejectReason(item, rulesDoc) {
  const haystack = normalize([item.title, item.descriptionSnippet].join(' '));
  if (containsAny(haystack, rulesDoc.globalRejectTokens || [])) return 'Wanted/exchange listing';
  if (!Number.isFinite(Number(item.nativePrice)) || Number(item.nativePrice) <= 0) return 'Missing or zero sale price';
  return null;
}

function matchRule(item, rules) {
  const haystack = normalize([item.title, item.descriptionSnippet].join(' '));
  const exactCategory = rules.filter(rule => rule.category === item.category);
  for (const rule of exactCategory) {
    const positive = containsAny(haystack, rule.match || []);
    const excluded = containsAny(haystack, rule.exclude || []);
    const required = !(rule.requireAny || []).length || containsAny(haystack, rule.requireAny || []);
    if (positive && !excluded && required) return rule;
  }
  return null;
}

function applyFaultRules(item, base, faultRules) {
  const haystack = normalize([item.title, item.descriptionSnippet].join(' '));
  let risk = Number(base.baseRisk || 5);
  let parts = Number(base.defaultParts || 0);
  let contingency = Number(base.defaultContingency || 0);
  let verificationHold = true;
  let veto = false;
  const matched = [];

  for (const fault of faultRules || []) {
    if (!containsAny(haystack, fault.tokens || [])) continue;
    matched.push(fault.id);
    risk += Number(fault.riskDelta || 0);
    parts = Math.max(parts, Number(fault.partsMinimum || 0));
    contingency = Math.max(contingency, Number(fault.contingencyMinimum || 0));
    if (fault.verificationHold) verificationHold = true;
    if (fault.veto) veto = true;
  }

  return { risk: clamp(risk, 1, 10), parts, contingency, verificationHold, veto, matchedFaultRules: matched };
}

function logisticsScore(item) {
  const location = normalize(item.location);
  if (item.country === 'SK') {
    if (/(bratislava|petrzalka|senec|samorin|dunajska streda|pezinok|malacky)/.test(location)) return 9;
    return 6;
  }
  if (item.country === 'CZ') {
    if (/(hodonin|breclav|brno)/.test(location)) return 6;
    return 4;
  }
  return 4;
}

function operationalVerdict(score, profit, veto) {
  if (veto || profit <= 0) return 'skip';
  if (score >= 62) return 'negotiate';
  if (score >= 50) return 'watch';
  return 'skip';
}

function enrich(item, rulesDoc, now) {
  const rejectReason = globalRejectReason(item, rulesDoc);
  if (rejectReason) return { ...item, eligibleForInbox: false, enrichmentReason: rejectReason };

  const rule = matchRule(item, rulesDoc.rules || []);
  if (!rule) return { ...item, eligibleForInbox: false, enrichmentReason: 'No trusted hardware/model rule' };

  const purchase = eurPrice(item, rulesDoc.fx || {});
  if (purchase === null) return { ...item, eligibleForInbox: false, enrichmentReason: 'Price unavailable' };

  const fault = applyFaultRules(item, rule, rulesDoc.faultRules || []);
  const shipping = item.country === 'SK' ? 0 : 15;
  const other = item.country === 'SK' ? 3 : 6;
  const resale = Number(rule.resaleReference || 0);
  const totalCost = purchase + shipping + fault.parts + other + fault.contingency;
  const netProfit = resale - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const age = ageHours(item, now);
  const logistics = logisticsScore(item);
  const demand = Number(rule.demand || 5);
  const scoreRaw = profitPoints(netProfit) + roiPoints(roi) + demand * 2 + (11 - fault.risk) * 1.5 + freshnessPoints(age) + logistics;
  const score = Math.round(clamp(scoreRaw, 0, 100));

  const priceThreshold = Number(rule.maxAutoPurchase || 0);
  const priceAdvantage = priceThreshold > 0 ? ((priceThreshold - purchase) / priceThreshold) * 100 : 0;
  const economicallyInteresting = netProfit >= 20 && roi >= 15 && purchase <= priceThreshold * 1.15;

  return {
    ...item,
    normalizedModel: rule.normalizedModel,
    modelRuleId: rule.id,
    purchase: Number(purchase.toFixed(2)),
    shipping,
    parts: fault.parts,
    fees: 0,
    other,
    contingency: fault.contingency,
    resale,
    totalCost: Number(totalCost.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    roi: Number(roi.toFixed(1)),
    demand,
    repairability: Number(rule.repairability || 5),
    turnover: Number(rule.turnover || 5),
    risk: fault.risk,
    ageHours: Number(age.toFixed(1)),
    logistics,
    score,
    verdict: operationalVerdict(score, netProfit, fault.veto),
    verificationHold: true,
    veto: fault.veto,
    matchedFaultRules: fault.matchedFaultRules,
    priceAdvantageVsRulePct: Number(priceAdvantage.toFixed(1)),
    evidenceConfidence: fault.veto ? 0.35 : 0.58,
    benchmark: `Automatický konzervatívny benchmark ${rule.normalizedModel}: referenčný predaj ${resale} €. Pred nákupom potvrdiť čerstvými porovnateľnými ponukami.`,
    note: fault.veto
      ? 'AUTO VETO: text obsahuje riziko účtového/zariadenového zámku. Nekupovať bez úplného legitímneho odomknutia a overenia vlastníctva.'
      : 'AUTO DISCOVERY: hardware/model prešiel identifikačným filtrom, ale nákup zostáva manuálne blokovaný do kontroly konkrétneho kusu, vlastníctva a čerstvej trhovej ceny.',
    eligibleForInbox: economicallyInteresting && !fault.veto,
    enrichmentReason: economicallyInteresting ? 'Trusted hardware identity + positive conservative economics' : 'Weak economics after conservative costs',
    enrichedAt: now.toISOString()
  };
}

async function main() {
  const [inputText, rulesText] = await Promise.all([fs.readFile(INPUT, 'utf8'), fs.readFile(RULES_FILE, 'utf8')]);
  const input = JSON.parse(inputText);
  const rulesDoc = JSON.parse(rulesText);
  const now = new Date();
  const enriched = (input.listings || []).map(item => enrich(item, rulesDoc, now));
  const inbox = enriched.filter(item => item.eligibleForInbox).sort((a, b) => b.score - a.score);

  const payload = {
    version: '0.2.1-p1-auto-score',
    capturedAt: input.capturedAt,
    enrichedAt: now.toISOString(),
    sourceListingCount: enriched.length,
    inboxCandidateCount: inbox.length,
    ruleVersion: rulesDoc.version,
    safety: 'Auto-enriched candidates require positive hardware identity, reject wanted/exchange/accessory noise, always retain verificationHold=true and cannot become an automatic BUY.',
    candidates: inbox,
    rejectedCount: enriched.length - inbox.length
  };

  await fs.writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`P1 enrichment: ${payload.inboxCandidateCount}/${payload.sourceListingCount} candidates passed strict identity + conservative economics.`);
  for (const candidate of inbox.slice(0, 15)) {
    console.log(`${candidate.score}\t${candidate.country}\t${candidate.normalizedModel}\tbuy ${candidate.purchase.toFixed(0)}€\tprofit ${candidate.netProfit.toFixed(0)}€\t${candidate.sourceUrl}`);
  }
}

await main();
