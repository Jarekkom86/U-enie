# Changelog — KomArena Resale Radar

Všetky významné zmeny KomArena Resale Radar sa zapisujú sem.

MASTER DESIGN LOCK: schválený vizuálny jazyk KomArena sa pri funkčných aktualizáciách nemení bez výslovného pokynu vlastníka.

## 0.1.3-expanded — 2026-09-08

### Pridané

1. **24 zdrojov namiesto 9** — rozšírenie siete o ďalšie slovenské, české a poľské zdroje a o geograficky výhodné Rakúsko a Maďarsko; Nemecko slúži najmä na špecifické modely, diely a benchmark.
2. **P1–P4 priorita zdrojov a segmentov** — P1 aktívne loviť, P2 silné príležitosti, P3 selektívne, P4 iba výnimočný deal/diely/lokálny odvoz.
3. **21 produktových segmentov** — kávovary, konzoly, PC/notebooky, hry, telefóny/tablety, robotické vysávače, aku náradie, PC komponenty, Dyson/tyčové vysávače, 3D tlačiarne, smart home, networking, audio, za odvoz, foto, drony, čítačky, monitory, tlačiarne, TV a veľká biela technika.
4. **Opraviteľnosť a obrat** — každý segment má vlastné skóre opraviteľnosti a rýchlosti obratu, cieľový čistý zisk, ROI, preferované modely, vhodné poruchy a zoznam rizík.
5. **Dynamická prioritná matica** — spodná časť Radaru už nie je pevná trojica kariet; vykresľuje P1–P4 priamo z `data/categories.json`.
6. **PRO FILTER v2** — filtruje aj podľa P1–P4, minimálnej opraviteľnosti a minimálnej rýchlosti obratu; kategórie sa načítavajú dynamicky z dát.
7. **Rozšírené krajiny** — rýchle filtre a PRO FILTER podporujú SK, CZ, PL, AT, HU a DE.
8. **Nové presety** — P1 aktívny lov, Top Deal, Rýchly obrat, Najlepšie opraviteľné, BA + SK/AT/HU, Kávovary, Konzoly, Telefóny, Robotické vysávače, Aku náradie, Za odvoz a Verification outliery.
9. **Reálne zapojenie filtra do indexu** — `filters.css` a `filters-v2.js` sú načítané priamo z `index.html`; predchádzajúci prototyp filtra zostáva v repozitári iba ako história, ale nie je aktívne načítaný.
10. **Rozšírený source registry** — priorita zdroja, spôsob monitoringu, stav integrácie a zameranie sú explicitne uložené v dátach.

### P1 — aktívne loviť

- De'Longhi a automatické kávovary
- PlayStation / Xbox / Nintendo konzoly a originálne ovládače
- Business notebooky, vybrané MacBooky a PC
- Hry, retro a výhodné bundle
- iPhone / Samsung / Google telefóny a tablety
- Robotické vysávače Roborock / Dreame / iRobot
- Aku náradie Makita / Bosch Professional / DeWalt / Milwaukee

### P2 — silné príležitosti

- GPU / CPU / RAM / SSD a PC komponenty
- Dyson a prémiové tyčové vysávače
- 3D tlačiarne
- Smart home / Home Assistant / Shelly / Sonoff / Zigbee / Thread
- Ubiquiti / MikroTik / Omada a sieťové prvky
- Hi-Fi / soundbary / aktívne audio
- darované / za odvoz / symbolická cena

### Bezpečnosť a disciplína

- Telefóny, MacBooky, drony a konzoly s Activation Lock / FRP / account lock alebo nejasným vlastníctvom majú bezpečnostné veto.
- Batérie s nafúknutím, požiarom alebo nejasným poškodením BMS sa nepovažujú za bežný rýchly servisný flip.
- Pri 230 V a sieťovej časti spotrebičov sa nepredpokladá laická oprava; Radar iba hodnotí obchodnú príležitosť a riziko.
- Veľká biela technika a TV sú P4 kvôli logistike, skladovaniu a riziku panelov/ťažkých opráv.
- Facebook zdroje zostávajú `manual-only`; žiadne session cookies ani obchádzanie podmienok platformy.

### Overenie

- GitHub Actions `KomArena validation` pre funkčný commit `779f6fdb4482137a7e0a9faca52d41b4880b67af`: **success**.
- MASTER vizuálny smer KomArena zostal zachovaný.

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
