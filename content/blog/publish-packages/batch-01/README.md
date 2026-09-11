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

## Live WordPress duplicate audit

Read-only kontrola publikovaných a draft postov na KomArena.sk:

- publikované články: 4,
- drafty: 1 prázdny historický draft,
- názvový konflikt s Batch 01: **0**,
- zistený slug konflikt s Batch 01: **0**.

Existujúce publikované články pri kontrole:

- BleBox wLightBox v3 + Home Assistant,
- PIR / HC-SR501,
- HC-SR04 s Arduinom,
- Arduino UNO vs ESP32.

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

Batch 01:

| Draft | Schema article type | SEO status |
| --- | --- | --- |
| 003 | TechArticle | ready for final preview |
| 005 | TechArticle | ready for final preview |
| 013 | TechArticle | HW-319 CTA day-of gate |
| 014 | TechArticle | practical proxy test remains recommended before publish approval |
| 008 | Article | ABS+ CTA remains commercial gate |

## Internal-link policy

Verejný payload používa iba:

- existujúce live huby a produktové URL,
- odkazy na súvisiace články až po tom, čo ich finálny WordPress permalink reálne existuje,
- žiadne interné Draft čísla v publikovanom texte,
- žiadne skladové počty, interné gate, sourcing ani dodávateľské poznámky.

## Featured image standard

Pre všetkých 5 článkov:

- 1600 × 900 px, 16:9,
- bez dodávateľských názvov a watermarkov,
- bez ceny/skladu,
- bez dlhého textu v obrázku,
- produkt/komponent v centrálnej safe zone,
- WebP cieľovo približne do 250 kB,
- konkrétne briefy sú v `featured-images.md`.

## Stav

- editorial/SEO/source preflight: **PASS**,
- duplicate audit: **PASS**,
- live product permalink check: **PASS** pre ESP32/HW-319,
- WordPress publish: **NOT EXECUTED**,
- merge to `main`: **NOT EXECUTED**.
