# KomArena Resale Radar

KomArena Resale Radar je rozhodovacie centrum pre vyhľadávanie podhodnoteného použitého tovaru, darovaných vecí a opraviteľných zariadení s cieľom rýchleho a kontrolovaného ďalšieho predaja.

## Aktuálny stav

Verzia `0.2.0-p1-live-intake` už nie je iba statický MVP. Má dve dátové vrstvy:

1. **LIVE evidence layer** — ručne/verejne overené aktuálne ponuky z viacerých source family (aktuálne Bazoš SK/CZ, OLX.pl a Willhaben.at).
2. **AUTO P1 discovery layer** — nízkofrekvenčný automatický discovery pre Bazoš SK/CZ, ktorý normalizuje, deduplikuje a konzervatívne filtruje známe P1 modely.

Automaticky objavený deal nikdy nedostáva priamy verdikt `KÚPIŤ`. `verificationHold=true` zostáva povinný až do kontroly konkrétneho kusu, vlastníctva/zámkov, fyzického stavu a čerstvých porovnateľných cien.

## P1 automatický intake

Aktuálne verejné vyhľadávania:

- Bazoš.sk — De'Longhi Magnifica
- Bazoš.sk — iPhone 13 128GB
- Bazoš.sk — PlayStation 5
- Bazoš.sk — Roborock
- Bazoš.sk — Makita DDF
- Bazoš.cz — PlayStation 5 Slim
- Bazoš.cz — De'Longhi Magnifica

Workflow `.github/workflows/resale-radar-p1-intake.yml` vykonáva syntax QA, sekvenčný low-frequency intake, deterministický enrichment, strict identity filter, konzervatívny scoring a QA artifact. Po merge do `main` je pripravený na hodinový beh `17 * * * *`.

Prvý ostrý smoke test 2026-09-08 zachytil 137 unikátnych listingov. Po odstránení hier, príslušenstva, `kúpim/vymením`, parts-only a placeholder 1–5 € cien zostal 1 dôveryhodný automatický kandidát. Tento pomer je zámerný: fail-closed presnosť má vyššiu prioritu než počet výsledkov.

## Cieľ

Radar odpovedá na štyri otázky pri každej ponuke:

1. Je cena reálne pod trhom?
2. Vieme stav overiť alebo opravu rozumne odhadnúť?
3. Ako rýchlo sa produkt pravdepodobne predá?
4. Aký je čistý zisk po doprave, dieloch, poplatkoch a rizikovej rezerve?

Výsledkom je verdikt `KÚPIŤ`, `VYJEDNÁVAŤ`, `SLEDOVAŤ` alebo `PRESKOČIŤ`. Automatický discovery je z bezpečnostných dôvodov obmedzený maximálne na manuálne preverenie/vyjednávanie.

## Prioritné segmenty

### P1 — aktívny lov

- De'Longhi a automatické kávovary
- PlayStation / Xbox / Nintendo konzoly a originálne ovládače
- business notebooky, vybrané MacBooky a PC
- hry, retro a výhodné bundle
- iPhone / Samsung / Google telefóny a tablety
- Roborock / Dreame / iRobot
- Makita / Bosch Professional / DeWalt / Milwaukee

### P2–P4

Radar ďalej pokrýva PC komponenty, Dyson/tyčové vysávače, 3D tlačiarne, smart home, networking, audio, za-odvoz položky, foto, drony, čítačky, monitory, tlačiarne, TV a veľkú bielu techniku. Priorita P2–P4 znižuje agresivitu lovu podľa likvidity, opraviteľnosti, logistiky a tail risku.

## Hlavné obrazovky

- `Deal Inbox` — živé a automaticky objavené kandidáty zoradené podľa skóre
- `PRO FILTER` — krajiny, P1–P4, kategórie, model/text, zdroj, cena, profit, ROI, risk, dopyt, opraviteľnosť, obrat a verification hold
- `Quick Analyzer` — manuálny prepočet konkrétnej ponuky
- `Watchlist` — uložené ponuky a lokálne poznámky
- `Source Registry` — 24 zdrojov so source prioritou P1–P4
- `Category Playbooks` — 21 segmentov s nákupnými pravidlami, vhodnými poruchami a veto podmienkami
- `KPIs` — počet príležitostí, kapitál, očakávaný profit a rýchlosť obratu

## Bezpečnostné pravidlá

- Žiadny automatický nákup ani kontaktovanie predávajúceho.
- Žiadne heslá, cookies, session tokeny alebo osobné údaje sa neukladajú do GitHubu.
- Automatický intake používa iba verejné stránky v nízkej frekvencii; zdroje s neprípustným alebo nejasným automatizačným režimom zostávajú manual-only/platform-alert.
- Facebook Marketplace zostáva manual-only bez session-cookie scrapingu.
- Ponuka označená ako podozrivá, účet-zamknutá, nelegálna alebo s nejasným vlastníctvom sa vyradí alebo manuálne zablokuje.
- Placeholder/symbolické ceny 1–5 € sa pri bežnom P1 produkte nepovažujú automaticky za reálnu nákupnú cenu.
- Pri elektronike s nebezpečnou sieťovou časťou sa oprava realizuje len bezpečným odborným postupom.
- Pred profesionálnym predajom použitého tovaru sa započítava rezerva na reklamácie, testovanie a spotrebiteľské povinnosti.

## Súbory

- `index.html` — dashboard
- `styles.css`, `filters.css`, `priority-board.css`, `source-priority.css` — izolovaný vizuálny systém
- `app.js` — scoring, základné filtre, watchlist a analyzer
- `live.js` — LIVE + AUTO P1 merge a evidence UI
- `filters-v2.js` — PRO FILTER v2
- `priority-board.js` — dynamická P1–P4 matica sortimentu
- `source-priority.js` — P1–P4 skupiny zdrojov
- `data/sources.json` — register zdrojov
- `data/categories.json` — segmentové playbooky
- `data/live-deals.json` — evidence-backed LIVE snapshot
- `data/p1-model-rules.json` — deterministické modelové/fault pravidlá
- `data/p1-scored-listings.json` — publikovaný strict AUTO P1 QA snapshot
- `scripts/p1-intake.mjs` — verejný discovery/dedupe intake
- `scripts/enrich-p1.mjs` — identity filter, enrichment a konzervatívny score
- `docs/BUSINESS-PLAN.md` — podnikateľský model
- `docs/SCORING.md` — pravidlá skórovania
- `CHANGELOG.md` — história verzií

## Ďalšia fáza

Najvyššia priorita už nie je pridávať ďalšie kartičky. Je ňou **fresh market-comp engine**: pre presne normalizovaný model zbierať viac aktuálnych porovnateľných ponúk, oddeliť asking price od realizovanej ceny, počítať median/percentily a fail-closed odmietnuť deal, keď je vzorka slabá. Potom rozšíriť automatický intake na ďalšie povolené P1 zdroje a free-item feedy.
