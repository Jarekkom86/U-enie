# Changelog — KomArena Resale Radar

Všetky významné zmeny KomArena Resale Radar sa zapisujú sem.

MASTER DESIGN LOCK: schválený vizuálny jazyk KomArena sa pri funkčných aktualizáciách nemení bez výslovného pokynu vlastníka.

## 0.1.2-pro-filter — 2026-09-08

### Pridané

1. **PRO FILTER** — rozbaliteľný pokročilý filter nad Deal Inboxom bez zmeny MASTER vizuálneho smeru.
2. **Ekonomické limity** — nastaviteľná nákupná/predajná cena, minimálny čistý zisk, ROI a Deal Score.
3. **Riziko a rýchlosť** — max. technické riziko, min. dopyt, max. vek ponuky a min. logistické skóre.
4. **Multi-filter** — viacnásobný výber krajín a kategórií plus text/model/porucha, lokalita a zdroj.
5. **Verification filter** — všetky ponuky, iba bez blokácie alebo iba cenové outliery/položky s povinným overením.
6. **Rýchle prepínače** — iba ziskové dealy a urgentné ponuky (`score >= 78` a vek `<= 24 h`).
7. **Radenie** — score, čistý zisk, ROI, čerstvosť, nákupná cena a technické riziko.
8. **Preset systém** — vstavané presety Top Deal, Rýchly flip, BA + okolie, De'Longhi, Konzoly, Za odvoz a Verification; používateľ môže ukladať aj vlastné presety.
9. **Persistentné nastavenie** — PRO FILTER a vlastné presety sa ukladajú lokálne cez `localStorage`.
10. **Aktívne chips a counter** — Radar priebežne ukazuje počet aktívnych podmienok a počet výsledkov.

### Stabilita a bezpečnosť

- PRO FILTER nemení výpočet Deal Score ani verification gate; iba zužuje a radí už vyhodnotené ponuky.
- Povinné manuálne overenie cenového outlieru sa nedá filtrom zmeniť na automatický nákup.
- Pôvodné rýchle filtre Krajina/Kategória/Verdikt zostávajú funkčné a kombinujú sa s PRO filtrom.
- Filter modul sa načítava oddelene cez `filters.js` a `filters.css`, aby sa minimalizoval zásah do stabilného MVP jadra.
- GitHub Actions `KomArena validation` pre commit s PRO filtrom: **success**.

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
