<!-- markdownlint-disable MD013 -->

# KomArena WebOps OS report

## Stav reportu

Tento dokument je historicky snapshot vytvoreny v PR #12 dňa 2026-05-14. Aktualny prevadzkovy stav Autopilot OS sa vedie v `docs/autopilot/state.md` a planovana praca v `docs/autopilot/backlog.md`.

Po vzniku reportu boli do `main` zloucene:

- PR #13 — KomArena Autopilot OS v3 core,
- PR #14 — KomArena Autopilot Sprint Runner,
- PR #15 — ESP32 ESPHome starter product cluster draft,
- PR #16 — ESP32 DevKit source document.

Otvoreny PR #19 nie je sucastou `main`. Tento report zostava pracovnou mapou a historickym podkladom; pri rozpore ma prednost aktualny `state.md`, backlog a potvrdena Git historia.

## Summary

Tento report mapoval stav repozitara pri vytvoreni PR #12 pre autonomnu pracu Codex agentov na KomArena.sk. Cieľom je pomenovať, čo už v repozitári existuje, kde sa nachádzajú produktové CSV, šablóny, stránky a obsahové štandardy, čo je pripravené na ďalšiu prácu, čo chýba a ktoré oblasti sú rizikové.

Report nemení produktové dáta, runtime kód, nastavenia produkčného webu ani importné súbory. Slúži ako pracovná mapa pre ďalšie malé Pull Requesty.

## Aktuálne oblasti repozitára

### 1. KomArena operačný systém a strategické dokumenty

Koreň repozitára obsahuje `AGENTS.md`, ktorý definuje záväzné pravidlá práce agenta, bezpečnostné obmedzenia, produktový štandard, CSV pravidlá, testovanie a formát reportov.

V adresári `docs/` sú hlavné strategické a operačné dokumenty:

- `docs/komarena-strategy.md` — pozícia značky, zákazník, obchodná logika a strategické smerovanie.
- `docs/product-standard.md` — záväzný produktový štandard pre produktové texty a WooCommerce výstupy.
- `docs/content-standard.md` — pravidlá pre blogy, návody a obsahový systém.
- `docs/category-architecture.md` — hlavné kategórie a odporúčané podkategórie.
- `docs/seo-internal-linking.md` — SEO a interné prelinkovanie.
- `docs/product-blog-project-system.md` — systém Produkt → Blog → Projekt → Predajná zostava.
- `docs/social-content-standard.md` — štandard sociálneho obsahu.

### 2. Produktové CSV a produktové reporty

Produktové CSV sú v adresári `docs/product-csv/`:

- `docs/product-csv/komarena-products-batch-001.csv` — pôvodný produktový CSV balík s 20 položkami.
- `docs/product-csv/komarena-products-batch-001-report.md` — report k pôvodnému CSV balíku.
- `docs/product-csv/komarena-products-batch-001-verified.csv` — overenejšia pracovná verzia s 5 položkami, stĺpcom `Published` a bezpečným `draft` stavom.
- `docs/product-csv/komarena-products-batch-001-verified-report.md` — detailný report k overenému balíku.

Aktuálne CSV sú dokumentačné/importné pracovné súbory, nie dôkaz, že produkty sú pripravené na publikovanie. Pri neoverených parametroch zostáva správny stav `draft`.

### 3. Šablóny pre budúce výstupy

Šablóny sú v adresári `docs/templates/`:

- `docs/templates/product-output-template.md` — šablóna produktového výstupu.
- `docs/templates/article-template.md` — šablóna článku alebo návodu.
- `docs/templates/social-package-template.md` — šablóna sociálneho balíčka.
- `docs/templates/csv-product-rules.md` — pravidlá WooCommerce CSV.

Tieto šablóny sú základ pre opakovateľnú tvorbu produktov, článkov, sociálnych príspevkov a importných CSV.

### 4. Stránky, UI a runtime časť

V repozitári nie je samostatný adresár s exportom WordPress stránok, blogových článkov alebo WooCommerce produktových stránok. Nachádza sa tu však WordPress plugin pre vizuálny systém:

- `komarena-ui-system/komarena-ui-system.php` — hlavný PHP súbor pluginu.
- `komarena-ui-system/assets/css/komarena-unified-ui.css` — frontend CSS.
- `komarena-ui-system/assets/js/komarena-ui.js` — JavaScript súbor, podľa README pripravený na budúce použitie.
- `komarena-ui-system/README.md` — popis pluginu, rozsahu a inštalácie.
- `komarena-ui-system/CHANGELOG.md` — zmeny UI pluginu.

Pre túto úlohu sa runtime súbory nemenili. Pri budúcich zmenách UI treba výslovné zadanie, screenshot alebo vizuálnu kontrolu a samostatný menší PR.

### 5. Blogové a content štandardy

Blogový a obsahový systém je zatiaľ definovaný hlavne štandardmi, nie hotovým adresárom publikovaných článkov:

- `docs/content-standard.md` definuje typy článkov, štruktúru článku, technickú pravdivosť a prepojenie na predaj.
- `docs/product-blog-project-system.md` definuje väzbu Produkt → Blog/návod → Modelový projekt → Odporúčané produkty → Interné odkazy → Sociálne siete → Newsletter.
- `docs/templates/article-template.md` definuje praktickú šablónu článku.
- `docs/social-content-standard.md` a `docs/templates/social-package-template.md` definujú nadväzujúce sociálne výstupy.

Chýba samostatný adresár pre konkrétne blogové návrhy alebo hotové články, napríklad `docs/blog-drafts/`.

### 6. Automatizácia a validačné workflow

Repozitár obsahuje GitHub Actions workflow:

- `.github/workflows/validate.yml` — validuje zmenené súbory, PHP syntax, JavaScript syntax, Markdown v `AGENTS.md` a `docs/**/*.md`, citlivé cesty a bezpečnostné pravidlá.

Workflow podporuje bezpečný vývoj cez PR, ale aktuálne lokálne prostredie nemusí mať všetky rovnaké nástroje ako GitHub runner.

### 7. Nesúvisiaca alebo doplnková oblasť

Repozitár obsahuje aj adresár:

- `gmail-cleaner-control-center/` — Google Apps Script / HTML nástroj pre Gmail cleaner control center.

Táto časť nepôsobí ako jadro KomArena e-shopu. Pri autonómnej práci na KomArena.sk by sa jej agent nemal dotýkať, pokiaľ úloha výslovne nesúvisí s týmto nástrojom.

## Čo je pripravené

- Základné pravidlá práce agenta sú jasne definované v `AGENTS.md`.
- Existuje strategický rámec značky a sortimentu KomArena.sk.
- Existuje produktový štandard s dôrazom na pravdivosť, bezpečnosť, otvorené body a `draft` stav pri neistote.
- Existuje kategóriová architektúra s povolenými hlavnými kategóriami.
- Existuje systém Produkt → Blog → Projekt → Odporúčané produkty → Interné odkazy → Sociálne siete → Newsletter.
- Existujú šablóny pre produkty, články, sociálne balíčky a CSV.
- Existuje prvý produktový CSV balík a menší overenejší CSV balík s reportom.
- Existuje UI plugin ako oddelená runtime časť, ktorú možno testovať samostatne.
- Existuje validačný GitHub Actions workflow.

## Čo chýba

- Chýba centrálny index produktových CSV s aktuálnym stavom každého balíka, napríklad `docs/product-csv/README.md`.
- Chýba jasné rozlíšenie medzi pôvodným 20-produktovým CSV a overenejším 5-produktovým CSV ako preferovaným pracovným základom.
- Pôvodný CSV balík nemá stĺpec `Published`, ktorý aktuálne zadanie vyžaduje pri WooCommerce CSV.
- Chýba adresár pre blogové návrhy alebo hotové články.
- Chýba adresár pre modelové projekty a predajné zostavy.
- Chýba evidencia interných odkazov medzi produktmi, článkami, kategóriami a sociálnymi výstupmi.
- Chýba synchronizácia repozitárového backlogu s GitHub Issues a PR metadátami; autoritatívny repo backlog je v `docs/autopilot/backlog.md`.
- Chýba lokálna dokumentácia k tomu, ako validovať CSV nad rámec základného parsovania.
- Chýba dokumentovaný postup publikovania produktu z `draft` do `publish`.
- Chýba evidencia zdrojov pravdy pre každý produkt mimo jednotlivých produktových reportov.

## Rizikové oblasti

### Produktové riziká

- Pôvodný 20-produktový CSV balík môže obsahovať neoverené alebo otvorené technické údaje. Bez ručnej kontroly nesmie byť použitý ako produkčný import.
- Pri produktoch s neoverenou kompatibilitou s Home Assistant / ESPHome / ESPBuild musí zostať `Status = draft` a `Published = 0`, ak je stĺpec dostupný.
- Interné EAN začínajúce na `2998` sa nesmú prezentovať ako oficiálne EAN výrobcov.

### Obsahové a SEO riziká

- Home Assistant je strategický obsahový pilier, ale nesmie sa používať ako univerzálna SEO nálepka pre každý produkt.
- Ak produkt nemá reálny blog, nemá sa v popise vkladať živý odkaz; má sa použiť formulácia `Pripravujeme návod: ...`.
- Bez centrálneho interného prelinkovania môže vzniknúť duplicita článkov, nejasné slugs a nekonzistentné CTA.

### Bezpečnostné riziká

- Relé, napájacie moduly, batérie a meniče napätia vyžadujú bezpečnostné upozornenia.
- Návody pre laikov nesmú viesť k práci s 230 V. Pri 230 V treba jasne uviesť, že práca patrí odborne spôsobilej osobe.
- Pri neoverených parametroch je bezpečnejšie pripraviť iba nízkonapäťový modelový príklad.

### Technické riziká

- Runtime súbory `php`, `css`, `js`, `html`, `json` sa nemajú meniť bez výslovného zadania.
- `komarena-ui-system` je WordPress plugin, preto aj malé vizuálne zmeny môžu ovplyvniť veľkú časť webu.
- V repozitári je aj `gmail-cleaner-control-center`, ktorý nesúvisí priamo s KomArena produktovým obsahom a môže zvádzať k neželanému rozširovaniu rozsahu.

## Odporúčaných 10 ďalších issues pre autonómnu prácu

1. **Vytvoriť index produktových CSV**
   Vytvoriť `docs/product-csv/README.md` s prehľadom CSV súborov, počtom produktov, stavom overenia, povinnými stĺpcami, odporúčaným použitím a otvorenými bodmi.

2. **Zvalidovať pôvodný 20-produktový CSV balík**
   Skontrolovať `docs/product-csv/komarena-products-batch-001.csv` voči aktuálnym CSV pravidlám, doplniť report rozdielov a odporučiť, či sa má migrovať do novšej štruktúry so stĺpcom `Published`.

3. **Pripraviť produktový výstup pre ESP32 ako vzorový produkt**
   Na základe overených zdrojov pripraviť jeden samostatný produktový dokument pre ESP32 vývojovú dosku s HTML kartovým štýlom, bezpečnostnými upozorneniami, blogovým uhlom a otvorenými bodmi.

4. **Pripraviť produktový výstup pre LOLIN D1 mini / ESP8266**
   Pripraviť samostatný produktový dokument s jasným rozlíšením originálnej dosky vs. klonu a s dôrazom na overenie reálnej dodávky.

5. **Vytvoriť prvý blogový návrh k ESPHome meraniu teploty**
   Vytvoriť návrh článku podľa `docs/templates/article-template.md`, napríklad bezpečný nízkonapäťový projekt ESPHome + teplotný senzor + Home Assistant integračný kontext.

6. **Vytvoriť adresár pre blogové návrhy**
   Zaviesť `docs/blog-drafts/README.md` s pravidlami názvov, slugov, meta description, otvorených bodov a interného prelinkovania.

7. **Vytvoriť adresár pre modelové projekty**
   Zaviesť `docs/model-projects/README.md` s pravidlami pre bezpečné nízkonapäťové modelové projekty, odporúčané produkty a bezpečnostné upozornenia.

8. **Pripraviť interný prelinkovací register**
   Vytvoriť `docs/internal-linking-map.md`, ktorý prepojí produkty, plánované blogy, kategórie, modelové projekty, sociálne balíčky a newsletter témy.

9. **Pripraviť checklist publikovania produktu**
   Vytvoriť dokument, ktorý definuje podmienky pre prechod produktu z `draft` do `publish`: overené parametre, sklad, cena, kategória, EAN, bezpečnosť, obsah balenia, zdroje a interné odkazy.

10. **Pripraviť bezpečnostný audit produktových kategórií**
    Skontrolovať kategórie s vyšším rizikom, najmä relé, napájanie, batérie a meniče, a pripraviť povinné bezpečnostné formulácie pre produktové popisy a návody.

## What did not change

- Nebol menený produkčný web.
- Neboli menené platby, checkout, objednávky, databáza, doprava ani daňové nastavenia.
- Neboli vložené API kľúče, heslá, tokeny, certifikáty ani citlivé údaje.
- Neboli menené produktové CSV súbory.
- Neboli menené PHP, CSS, JS, HTML ani JSON runtime súbory.
- Neboli použité ani pridané obrázky.

## Open points

- Otvorený bod: rozhodnúť o ďalšom postupe pre otvorený PR #19; nie je súčasťou `main`.
- Otvorený bod: overiť, či produkčný WordPress obsahuje exportovateľné stránky, blogy a produkty, ktoré zatiaľ nie sú v tomto repozitári.
- Otvorený bod: rozhodnúť, či sa bude pôvodný 20-produktový CSV balík ďalej udržiavať, alebo nahradí overenejším menším balíkom.
- Otvorený bod: potvrdiť cieľovú štruktúru adresárov pre blogové návrhy, modelové projekty, produktové dokumenty a interné prelinkovanie.
