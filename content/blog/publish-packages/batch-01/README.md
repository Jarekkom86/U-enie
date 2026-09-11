<!-- markdownlint-disable MD013 -->

# Publish package — Batch 01

Dátum redakčného preflightu: 2026-09-11

Tento adresár je WordPress-ready staging. **Nič v ňom sa samo nepublikuje.**

## Vybrané články

1. 003 — Prvý ESPHome projekt s ESP32
2. 005 — Stabilné napájanie ESP32
3. 013 — Ako vybrať napájanie pre ESP32
4. 014 — Bluetooth Proxy vs USB adaptér
5. 008 — PLA vs PLA+ vs ABS+

## WordPress drafts vytvorené

Batch 01 bol zapísaný na KomArena.sk ako **draft**, nie ako publish/pending/scheduled:

| Source | WordPress ID | Slug |
| --- | ---: | --- |
| 003 | 4296 | `esphome-esp32-prvy-projekt-home-assistant` |
| 005 | 4297 | `esp32-restart-brownout-napajanie` |
| 013 | 4298 | `napajanie-esp32-vyber-zdroja` |
| 014 | 4299 | `bluetooth-proxy-vs-usb-adapter-home-assistant` |
| 008 | 4300 | `pla-vs-pla-plus-vs-abs-plus` |

Detail konfigurácie a edit URL sú v `wordpress-drafts.md`.

## Live WordPress duplicate audit

Kontrola pred vytvorením draftov:

- publikované články: 4,
- pôvodné drafty: 1 prázdny historický draft,
- názvový konflikt s Batch 01: **0**,
- zistený slug konflikt s Batch 01: **0**.

Existujúce publikované články pri kontrole:

- BleBox wLightBox v3 + Home Assistant,
- PIR / HC-SR501,
- HC-SR04 s Arduinom,
- Arduino UNO vs ESP32.

## Live WordPress taxonomy check

Overené kategórie:

- `583` — Home Assistant & ESPHome (`home-assistant-esphome`)
- `322` — Návody a projekty (`navody-a-projekty`)
- `586` — Produkty, testy a porovnania (`produkty-testy-porovnania`)
- `585` — 3D tlač (`3d-tlac`)

Priradenie v live draftoch:

| Draft | Primárna kategória | Sekundárna kategória |
| --- | --- | --- |
| 003 | 583 | 322 |
| 005 | 583 | 322 |
| 013 | 583 | 322 |
| 014 | 583 | 586 |
| 008 | 585 | 586 |

Default kategória `Nezaradené` bola po priradení cieľových kategórií odstránená.

## Fresh source check

Overené 2026-09-11:

- ESPHome Getting Started: prvé nahratie nového zariadenia cez USB, následné OTA aktualizácie, Device Builder a automatické/manual pridanie do Home Assistanta.
- Espressif FAQ: brownout reset vzniká pri poklese napájania pod bezpečnú úroveň; medzi prvé kontroly patrí stabilný zdroj a USB kábel.
- ESPHome Bluetooth Proxy: ESP32 default 3 connection slots, maximum 9 pri ESP-IDF, odporúčanie neprekračovať 5 kvôli RAM/stabilite; pasívne reklamy nie sú limitované počtom aktívnych slotov.
- eSUN PLA+: 210–230 °C nozzle, 45–60 °C bed, 100 % fan, drying 50 °C / 8–12 h.
- eSUN ABS+: 230–270 °C nozzle, 95–110 °C bed, 0 % fan, odporúčaná enclosed-chamber tlač.

## Live product reality check

### ESP32 DevKit V1 — ID 2159

- publish / visible,
- purchasable,
- instock,
- backorders off,
- canonical live permalink:
  `https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/`

### HW-319 LM2596 — ID 2997

- publish / visible,
- purchasable,
- instock pri preflighte,
- backorders off,
- low-stock produkt — CTA sa kontroluje znovu v deň publikácie,
- canonical live permalink:
  `https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/`

## Schema / SEO policy

Aktuálny Yoast na KomArena povoľuje okrem iného `Article`, `BlogPosting` a `TechArticle`.

Aplikované na live drafty:

| Draft | Schema article type | SEO status |
| --- | --- | --- |
| 003 | TechArticle | title/meta/focus applied |
| 005 | TechArticle | title/meta/focus applied |
| 013 | TechArticle | title/meta/focus applied; HW-319 CTA day-of gate |
| 014 | TechArticle | title/meta/focus applied; practical proxy test remains recommended before publish approval |
| 008 | Article | title/meta/focus applied; ABS+ CTA remains commercial gate |

## Excerpts

WordPress pri prvom vytvorení použil automatické excerpt-y z úvodu. Pripravené redakčné excerpt-y boli preto následne explicitne aplikované cez `post-update` na ID 4296–4300.

## Internal-link policy

Verejný payload používa iba:

- existujúce live huby a produktové URL,
- odkazy na súvisiace články až po tom, čo ich finálny WordPress permalink reálne existuje,
- žiadne interné Draft čísla v publikovanom texte,
- žiadne skladové počty, interné gate, sourcing ani dodávateľské poznámky.

## Featured images

Pre drafty boli priradené existujúce médiá z KomArena knižnice:

- 003 → media 3512 — ESP32 brand main,
- 005 → media 2162 — ESP32 product view,
- 013 → media 3510 — HW-319 brand main,
- 014 → media 1989 — ESP32 detail,
- 008 → media 4017 — 3D PLA+ application models.

Pôvodné kreatívne briefy ostávajú v `featured-images.md` pre prípad neskoršieho vytvorenia samostatných editorial hero obrázkov.

## Template check

Produkčný článok 4289 aj nový draft 4296 používajú WordPress `default` post template, bez Elementor dát. Batch 01 preto zachováva rovnakú základnú renderovaciu cestu.

## Stav

- editorial/SEO/source preflight: **PASS**,
- duplicate audit: **PASS**,
- taxonomy check: **PASS**,
- live product permalink check: **PASS** pre ESP32/HW-319,
- WordPress draft creation: **EXECUTED — IDs 4296–4300**,
- WordPress publish: **NOT EXECUTED**,
- scheduling: **NOT EXECUTED**,
- merge to `main`: **NOT EXECUTED**.
