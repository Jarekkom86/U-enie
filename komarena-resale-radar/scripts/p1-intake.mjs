import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const OUTPUT = path.join(ROOT, 'data', 'p1-auto-listings.json');

const SEARCHES = [
  { id: 'bazos-sk-delonghi', country: 'SK', category: 'delonghi', priority: 1, currency: 'EUR', source: 'Bazoš.sk', url: 'https://elektro.bazos.sk/inzeraty/predam-magnifica/' },
  { id: 'bazos-sk-iphone13', country: 'SK', category: 'phones', priority: 1, currency: 'EUR', source: 'Bazoš.sk', url: 'https://mobil.bazos.sk/inzeraty/iphone-13-128gb/' },
  { id: 'bazos-sk-ps5', country: 'SK', category: 'consoles', priority: 1, currency: 'EUR', source: 'Bazoš.sk', url: 'https://pc.bazos.sk/inzeraty/predam-playstation5/' },
  { id: 'bazos-sk-roborock', country: 'SK', category: 'robot-vacuums', priority: 1, currency: 'EUR', source: 'Bazoš.sk', url: 'https://elektro.bazos.sk/inzeraty/predam-roborock/' },
  { id: 'bazos-sk-makita', country: 'SK', category: 'power-tools', priority: 1, currency: 'EUR', source: 'Bazoš.sk', url: 'https://dom.bazos.sk/inzeraty/makita-ddf/' },
  { id: 'bazos-cz-ps5', country: 'CZ', category: 'consoles', priority: 1, currency: 'CZK', source: 'Bazoš.cz', url: 'https://pc.bazos.cz/inzeraty/ps5-slim/' },
  { id: 'bazos-cz-delonghi', country: 'CZ', category: 'delonghi', priority: 1, currency: 'CZK', source: 'Bazoš.cz', url: 'https://elektro.bazos.cz/inzeraty/delonghi-magnifica/' }
];

const USER_AGENT = 'KomArena-Resale-Radar/0.2 (+https://github.com/Jarekkom86/komarena-webops-lab; low-frequency public-search monitor)';

function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function stripHtml(value = '') {
  return decodeEntities(value.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function parseNumericPrice(value = '') {
  const normalized = stripHtml(value).replace(/\s/g, '').replace(',', '.');
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function absoluteUrl(base, href) {
  try { return new URL(href, base).href; } catch { return null; }
}

function extractClassText(segment, className) {
  const pattern = new RegExp(`<div[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i');
  const match = segment.match(pattern);
  return match ? stripHtml(match[1]) : '';
}

function parseBazos(html, search) {
  const linkRegex = /<a[^>]+href=["']([^"']*\/inzerat\/\d+\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const anchors = [];
  let match;
  while ((match = linkRegex.exec(html))) {
    anchors.push({ index: match.index, href: match[1], title: stripHtml(match[2]) });
  }

  const out = [];
  const seen = new Set();
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const url = absoluteUrl(search.url, anchor.href);
    const idMatch = url?.match(/\/inzerat\/(\d+)\//);
    const listingId = idMatch?.[1];
    if (!url || !listingId || seen.has(listingId) || !anchor.title) continue;
    seen.add(listingId);

    const nextIndex = anchors[i + 1]?.index ?? Math.min(html.length, anchor.index + 6500);
    const start = Math.max(0, anchor.index - 500);
    const end = Math.min(html.length, Math.max(nextIndex, anchor.index + 2500));
    const segment = html.slice(start, end);

    const priceText = extractClassText(segment, 'inzeratycena');
    const location = extractClassText(segment, 'inzeratylok');
    const description = extractClassText(segment, 'inzeratypopis');
    const dateMatch = stripHtml(segment).match(/\[(\d{1,2}\.\d{1,2}\.\s*\d{4})\]/);
    const nativePrice = parseNumericPrice(priceText);

    out.push({
      id: `${search.id}-${listingId}`,
      listingId,
      title: anchor.title,
      category: search.category,
      priority: search.priority,
      country: search.country,
      source: search.source,
      sourceFamily: 'bazos',
      sourceSearchId: search.id,
      sourceSearchUrl: search.url,
      sourceUrl: url,
      publishedDateText: dateMatch?.[1]?.replace(/\s+/g, '') ?? null,
      nativePrice,
      nativeCurrency: search.currency,
      location: location || null,
      descriptionSnippet: description.slice(0, 650) || null,
      ingestMode: 'public-search-html',
      verificationHold: true,
      enriched: false
    });
  }
  return out;
}

async function fetchSearch(search) {
  const started = Date.now();
  try {
    const response = await fetch(search.url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html,application/xhtml+xml' },
      redirect: 'follow',
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const listings = parseBazos(html, search);
    return {
      status: { id: search.id, ok: true, httpStatus: response.status, count: listings.length, durationMs: Date.now() - started, capturedAt: new Date().toISOString() },
      listings
    };
  } catch (error) {
    return {
      status: { id: search.id, ok: false, error: String(error?.message || error), count: 0, durationMs: Date.now() - started, capturedAt: new Date().toISOString() },
      listings: []
    };
  }
}

async function readPrevious() {
  try { return JSON.parse(await fs.readFile(OUTPUT, 'utf8')); } catch { return { listings: [] }; }
}

function mergeHistory(previous, current, capturedAt) {
  const oldById = new Map((previous.listings || []).map(item => [item.id, item]));
  return current.map(item => {
    const old = oldById.get(item.id);
    return {
      ...old,
      ...item,
      firstSeenAt: old?.firstSeenAt || capturedAt,
      lastSeenAt: capturedAt,
      seenCount: Number(old?.seenCount || 0) + 1,
      active: true
    };
  });
}

async function main() {
  const capturedAt = new Date().toISOString();
  const previous = await readPrevious();
  const results = [];
  for (const search of SEARCHES) {
    // Sequential low-frequency requests are deliberate: do not hammer marketplaces.
    results.push(await fetchSearch(search));
    await new Promise(resolve => setTimeout(resolve, 900));
  }

  const current = results.flatMap(result => result.listings);
  const deduped = Array.from(new Map(current.map(item => [`${item.sourceFamily}:${item.listingId}`, item])).values());
  const merged = mergeHistory(previous, deduped, capturedAt);

  const payload = {
    version: '0.2.0-p1-auto-discovery',
    capturedAt,
    sourceMode: 'low-frequency public search pages; no login, no cookies, no seller contact',
    sourceStatus: results.map(result => result.status),
    listingCount: merged.length,
    listings: merged
  };

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  const failures = payload.sourceStatus.filter(status => !status.ok);
  console.log(`P1 intake captured ${payload.listingCount} unique listings from ${SEARCHES.length} searches.`);
  for (const status of payload.sourceStatus) {
    console.log(`${status.ok ? 'OK' : 'FAIL'} ${status.id}: ${status.count} listings${status.error ? ` — ${status.error}` : ''}`);
  }
  if (failures.length === SEARCHES.length) process.exitCode = 2;
}

await main();
