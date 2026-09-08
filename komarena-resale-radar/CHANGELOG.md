# Changelog — KomArena Resale Radar

Všetky významné zmeny KomArena Resale Radar sa zapisujú sem.

MASTER DESIGN LOCK: schválený vizuálny jazyk KomArena sa pri funkčných aktualizáciách nemení bez výslovného pokynu vlastníka.

## 0.1.0-mvp — 2026-09-08

### Pridané

1. **Deal Score 0–100** — spoločný model pre čistý zisk, ROI, likviditu, technické riziko, čerstvosť a logistiku.
2. **Quick Analyzer** — manuálny prepočet ponuky s verdiktom `KÚPIŤ / VYJEDNÁVAŤ / SLEDOVAŤ / PRESKOČIŤ`.
3. **Lokálny Watchlist** — uloženie analyzovaných príležitostí do `localStorage` bez servera a bez účtov.
4. **Deal Inbox** — prioritizovaná tabuľka s filtrami krajiny, kategórie a verdiktu.
5. **Source Registry** — register zdrojov pre Slovensko, Česko a Poľsko so stavom a spôsobom monitoringu.
6. **Category Playbooks** — počiatočné nákupné pravidlá pre De'Longhi, konzoly, PC/notebooky, hry a bezplatné/za-odvoz položky.
7. **Podnikateľský plán** — funnel nákup → diagnostika → repas → predaj → realizovaný výsledok → spätné učenie.
8. **Safety veto** — podozrivé vlastníctvo, účtové zámky, neprimerané bezpečnostné riziko a nelegálne položky prebijú akékoľvek skóre.

### Stabilita a bezpečnosť

- MVP nevykonáva automatické nákupy ani kontaktovanie predávajúcich.
- Demo Deal Inbox je výslovne označený ako modelový; nevydáva syntetické dáta za živé inzeráty.
- Žiadne heslá, cookies, session tokeny ani API kľúče sa neukladajú do projektu.
- Zdrojový JSON má fallback, aby Source Registry zostal použiteľný aj pri lokálnom otvorení HTML, kde prehliadač môže blokovať `fetch()`.
- Opravená inicializácia Quick Analyzeru tak, aby sa DOM čítal až po `DOMContentLoaded`.

### Dizajn

- Zachovaný KomArena fingerprint: primárny akcent `#00979d`, 14 px rádius a Montserrat/Roboto typografický systém.
- Nový projekt používa tmavý control-center variant bez zásahu do existujúceho `komarena-ui-system`.

### Otvorené body

- Živý ingest z RSS/e-mailov/API a povolených marketplace integrácií.
- Historické benchmarky reálnych predajných cien.
- Transaction ledger pre skutočné nákupné a predajné výsledky.
- Servisná databáza typických porúch, dielov a času opravy.
- Notifikácie pri vysokom Deal Score; nový samostatný hodinový task momentálne nebolo možné vytvoriť pre limit aktívnych automatizácií.
