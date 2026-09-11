<!-- markdownlint-disable MD013 -->

# KomArena Blog — publish readiness

Dátum hodnotenia: 2026-09-11

Tento dokument určuje poradie, v akom sa majú staging drafty dostať do finálnej kontroly. Nie je to automatický publish plán a nič z neho sa samo nepublikuje.

## Hodnotiaci rámec

Každý draft sa hodnotí podľa štyroch oblastí:

- **Obchodná hodnota** — či prirodzene vedie na aktuálne relevantný produkt alebo službu.
- **Skladová pripravenosť** — či je produkt reálne objednateľný; pri evergreen článku je možné publikovať aj bez CTA, ak to dáva zmysel.
- **Technická pripravenosť** — či sú tvrdenia overené primárnymi zdrojmi a či článok nepotrebuje reálny hardware test.
- **Riziko** — pravdepodobnosť zavádzania, neaktuálnej kompatibility, chybného zapojenia alebo falošného nákupného CTA.

### Stav

- **RFR — ready-for-review:** preflight zdrojov, živého katalógu a hlavných technických gate prešiel; článok môže ísť do redakčnej/finálnej technickej kontroly. Nie je schválený na publikovanie.
- **B — pripraviť po RFR batchi:** obsah je silný, ale chýba hardware test, pinout/revision overenie alebo konkrétny produktový gate.
- **C — blokované:** publikovať až po splnení explicitnej podmienky.
- **R — reference:** už publikovaný alebo slúži ako referenčný text; nerepublikovať ako nový článok.

## Preflight checkpoint — prvý batch

Read-only preflight bol vykonaný 11. 9. 2026 proti živému WooCommerce katalógu a aktuálnej primárnej dokumentácii.

### Výsledok

| Draft | Výsledok | Overené | Čo zostáva pred `approved-for-publish` |
| --- | --- | --- | --- |
| 003 — Prvý ESPHome projekt s ESP32 | **RFR** | živý ESP32 produkt ID 2159; publikovaný, visible, 19 ks, instock; živý `permalink`; aktuálny ESPHome workflow | featured image, finálny WordPress preview, day-of stock/link check |
| 005 — Stabilné napájanie ESP32 | **RFR** | brownout framing podľa Espressif; bez univerzálneho tvrdenia o generickom module | finálna redakčná kontrola, featured image, preview |
| 013 — Ako vybrať napájanie pre ESP32 | **RFR** | ESP32 ID 2159; HW-319 ID 2997 publikovaný/visible, 2 ks instock; 230 V DIY vylúčené | HW-319 CTA znovu overiť v deň publikácie; vlastná foto/meranie je vhodné, nie povinné pre review |
| 014 — Bluetooth Proxy vs USB adaptér | **RFR** | aktuálny Home Assistant Bluetooth model; BLE-only proxy; agregácia USB + proxy; ESPHome connection slots aktualizované | praktický test KomArena ESP32 ako proxy pred finálnym schválením je odporúčaný |
| 008 — PLA vs PLA+ vs ABS+ | **RFR** | aktuálne eSUN PLA+/ABS+ primárne podklady; viac PLA+ aj ABS+ variantov je skladom | ABS+ produktový CTA zostáva pod maržovým gate; finálne varianty vybrať day-of |
| 012 — Ako skladovať a sušiť filament | **RFR** | aktuálne PLA+ drying guidance; živý eBOX/eBOX Lite/eBOX Pro stav | eBOX original/Pro bez aktívneho CTA; Lite/eVacuum iba po obchodnom gate; featured image/preview |
| 004 — eSUN PLA+ výber a tlač | **RFR** | aktuálny eSUN PLA+ TDS; živé stock-backed farby existujú | vybrať finálne živé CTA varianty v deň schválenia; Space Blue nie je vhodný hlavný CTA pri nízkom sklade |

### Dôležitá URL lekcia z preflightu

Produktový URL sa **nesmie odvodiť z názvu produktu**. Živý WooCommerce produkt ID 2159 má aktuálny permalink:

`https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/`

Pred každým publish approval sa produktové URL načítajú priamo zo živého WooCommerce poľa `permalink`.

## Readiness mapa 001–020

| Poradie | Draft | Stav | Obchod | Sklad | Technika | Hlavný gate |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | 003 — Prvý ESPHome projekt s ESP32 | **RFR** | vysoký | ESP32 stock-backed | vysoká | final preview + day-of link/stock |
| 2 | 005 — Stabilné napájanie ESP32 | **RFR** | vysoký | funguje aj bez konkrétneho meniča | vysoká | final preview |
| 3 | 013 — Ako vybrať napájanie pre ESP32 | **RFR** | vysoký | ESP32 + HW-319 stock-backed | vysoká | HW-319 day-of CTA gate |
| 4 | 014 — Bluetooth Proxy vs USB adaptér | **RFR** | vysoký | ESP32 stock-backed | vysoká | praktický proxy test pred approval odporúčaný |
| 5 | 008 — PLA vs PLA+ vs ABS+ | **RFR** | vysoký | PLA+ použiteľné; ABS+ obchodne gated | vysoká | ABS+ CTA iba po marži/sklade |
| 6 | 012 — Ako skladovať a sušiť filament | **RFR** | stredne vysoký | evergreen; príslušenstvo gated | vysoká | eBOX/eVacuum iba po obchodnom gate |
| 7 | 004 — eSUN PLA+ výber a tlač | **RFR** | vysoký | viac živých PLA+ farieb skladom | vysoká | finálne varianty vybrať day-of |
| 8 | 017 — ESPHome OLED SSD1306 dashboard | B | vysoký | OLED stock-backed | stredná/vysoká | overiť radič, I2C adresu, napájanie a YAML na reálnom kuse |
| 9 | 019 — DHT22 + ESPHome | B | vysoký | DHT22 stock-backed | stredná/vysoká | pinout + DATA pull-up konkrétneho modulu |
| 10 | 018 — HC-SR04 + ESP32 + ESPHome | B | vysoký | HC-SR04 stock-backed | stredná/vysoká | fyzicky otestovať ECHO prispôsobenie a YAML |
| 11 | 020 — DHT22 vs BME280 | B | stredne vysoký | DHT22 áno, BME280 nie | vysoká | BME280 iba informačne, žiadny nákupný CTA |
| 12 | 007 — ESPHome Bluetooth Proxy | B | vysoký | ESP32 stock-backed | vysoká | overiť konkrétny ESP32 variant/čip v reálnom teste |
| 13 | 016 — PLA+ vs ABS+ pre ESP32 krabičku | B | stredne vysoký | závisí od filamentov | vysoká | žiadne „ABS+=outdoor“, produktové CTA po marži/sklade |
| 14 | 001 — BleBox wLightBox v3 + Home Assistant | R | vysoký | produkt existuje | vysoká | produkčný článok už existuje — nerepublikovať |
| 15 | 002 — Home Assistant Green | C | veľmi vysoký | nosný produkt musí byť finálne zalistovaný | vysoká | produkt + cena/marža + finálny ekosystémový CTA |
| 16 | 006 — Prvá Zigbee sieť | C | veľmi vysoký | chýba overený koordinátor v sortimente | vysoká | žiadny koordinátor CTA pred zalistovaním |
| 17 | 009 — ZHA vs Zigbee2MQTT | C | vysoký | chýba overený koordinátor | vysoká | kompatibilita konkrétneho koordinátora s oboma stackmi |
| 18 | 010 — ESP32 + HC-SR501 + ESPHome | C | stredne vysoký | HC-SR501 outofstock/hidden | vysoká | obnoviť sklad alebo publikovať striktne bez predajného CTA |
| 19 | 011 — BME280 + ESPHome | C | vysoký | BME280 outofstock | vysoká | sklad/backorder podľa obchodných pravidiel |
| 20 | 015 — BME280 vs BMP280 | C | stredný | oba produkty outofstock | vysoká | môže ísť informačne neskôr, bez nákupných CTA |

## Preflight checkpoint — Home Assistant fundamentals 021–029

Druhá vlna bola overená 11. 9. 2026 proti aktuálnej oficiálnej dokumentácii Home Assistant. Táto vlna je zámerne evergreen a nie je viazaná na dostupnosť jedného konkrétneho produktu.

| Draft | Výsledok | Overené | Čo zostáva pred `approved-for-publish` |
| --- | --- | --- | --- |
| 021 — Čo je Home Assistant a čo nie je | **RFR** | aktuálne HA pojmy a platformový model | SEO duplicita, featured image, WordPress preview |
| 022 — Lokálna vs cloudová smart domácnosť | **RFR** | local/cloud princípy; BleBox iba ako už overený local príklad | finálny integration wording + preview |
| 023 — DHCP rezervácia vs statická IP | **RFR** | sieťový koncept bez vendor-specific router postupu | finálna redakčná kontrola + diagram siete |
| 024 — Ako pomenovať zariadenia a entity | **RFR** | aktuálne Areas/Floors/Devices/Entities/Labels pojmy | screenshoty a UI terminológia recheck day-of |
| 025 — Zariadenie sa neobjavilo automaticky | **RFR** | discovery troubleshooting bez slepého reset workflow | finálny support/diagnostics wording + screenshoty |
| 026 — Prvá automatizácia | **RFR** | trigger / condition / action model + aktuálny editor | finálny editor screenshot + syntax recheck |
| 027 — Wi-Fi vs Zigbee vs Thread vs Matter | **RFR** | Matter over Wi-Fi/Ethernet/Thread; Thread ≠ Matter; ZHA coordinator model; ZBT-2 one-protocol recommendation | Thread/Matter status recheck v deň schválenia |
| 028 — HA bez zbytočných hubov | **RFR** | coordinator vs border router vs controller; existing Thread border-router principle | žiadny hardware CTA bez compatibility/stock gate |
| 029 — Pohyb → podmienka → svetlo | **RFR** | aktuálne HA 2026.9 `triggers / conditions / actions`, run modes a troubleshooting model | YAML preveriť ešte v aktuálnom editor/config checker; screenshoty; žiadny vypredaný PIR CTA |

### Druhý bezpečný review batch

Odporúčané redakčné poradie:

1. Draft 021 — Čo je Home Assistant a čo nie je
2. Draft 022 — Lokálna vs cloudová smart domácnosť
3. Draft 027 — Wi-Fi vs Zigbee vs Thread vs Matter
4. Draft 028 — Ako naplánovať Home Assistant domácnosť bez zbytočných hubov
5. Draft 023 — DHCP rezervácia vs statická IP
6. Draft 024 — Ako pomenovať zariadenia a entity
7. Draft 025 — Zariadenie sa neobjavilo automaticky
8. Draft 026 — Prvá automatizácia
9. Draft 029 — Pohyb → podmienka → svetlo

Tento batch tvorí jeden súvislý beginner funnel:

**čo je Home Assistant → local/cloud → protokoly → architektúra → sieť → naming → troubleshooting → automation basics → modelový projekt**

## Prvý bezpečný review batch

Tieto články majú preflight **RFR**. Poradie je redakčné, nie automatické publikovanie:

1. Draft 003 — Prvý ESPHome projekt s ESP32
2. Draft 005 — Stabilné napájanie ESP32
3. Draft 013 — Ako vybrať napájanie pre ESP32
4. Draft 014 — Bluetooth Proxy vs USB adaptér
5. Draft 008 — PLA vs PLA+ vs ABS+
6. Draft 012 — Ako skladovať a sušiť filament
7. Draft 004 — eSUN PLA+ výber a tlač

Tento batch buduje tri komerčne užitočné clustre bez závislosti od vypredaného senzora alebo nezalistovaného Zigbee koordinátora:

- **ESPHome Build Lab:** 003 → 005 → 013 → 014
- **3D tlač:** 008 → 012 → 004
- **BleBox článok 001:** už existuje na produkcii a má slúžiť ako inbound/outbound referenčný bod, nie ako nový publish.

## Živé katalógové zistenia pre review batch

### ESP / napájanie

- ESP32 DevKit V1 ID 2159: publish, visible, 19 ks instock, backorders off.
- HW-319 ID 2997: publish, visible, 2 ks instock, backorders off.

### eSUN PLA+

Stock-backed kandidáti pri preflighte zahŕňali Haze Blue, Peak Green, Grass Green, Dark Yellow, Pink a Mint Green. Space Blue mal nízky fyzický sklad a nemá byť hlavný CTA. Black/White/Blue boli vypredané.

Počty sa **nepublikujú napevno** v evergreen texte; slúžia iba na výber CTA v deň schválenia.

### eSUN ABS+

Viaceré farby sú skladom, ale aktívny CTA sa neotvára automaticky. ABS+ zostáva pod obchodným/maržovým FAIL CLOSED gate.

### Sušenie / skladovanie

- eBOX original: outofstock, no backorder — bez nákupného CTA.
- eBOX Pro: outofstock, no backorder — bez nákupného CTA.
- eBOX Lite: supplier/backorder — CTA iba po obchodnom gate.
- eVacuum položky môžu byť skladom, ale stále pod maržovým gate.

## Publish-readiness checklist

Pred zmenou stavu na `ready-for-review`:

- [ ] H1 rieši jednu jasnú otázku používateľa.
- [ ] SEO title a meta description nie sú duplicitné s existujúcim článkom.
- [ ] Všetky technické tvrdenia majú primárny/official source alebo sú označené ako praktická skúsenosť.
- [ ] Každý kód/YAML/zapojenie bolo skontrolované proti aktuálnej dokumentácii.
- [ ] Pri zapojení je jasne odlíšená 5 V a 3,3 V logika.
- [ ] Článok neobsahuje univerzálne tvrdenie o generickom module, ak sa revízie líšia.
- [ ] Každý produktový URL je načítaný zo živého WooCommerce `permalink` alebo znovu overený.
- [ ] Produkt je publikovaný a jeho visibility/backorder stav je kompatibilný s CTA.
- [ ] Ceny a sklad nie sú hardcoded v evergreen verejnom texte.
- [ ] Vypredaný produkt nie je prezentovaný ako dostupný.
- [ ] Minimálne jeden outbound interný link vedie na ďalší relevantný článok/hub.
- [ ] Je definovaný aspoň jeden reálny inbound link z existujúcej produkčnej stránky.
- [ ] CTA je prirodzené a nepredáva produkt, ktorý článok technicky nepotrebuje.
- [ ] Bezpečnostné obmedzenia sú priamo pri rizikovom kroku, nie iba na konci.
- [ ] Nie sú uvedené interné sourcing poznámky, dodávateľ, nákupná cena ani dodávateľské SKU v texte určenom na publikovanie.
- [ ] Facebook/social text je krátky teaser s odkazom späť na KomArena, nie plná kópia článku.

Pred `ready-for-review` → `approved-for-publish`:

- [ ] featured image podľa `article-template.md`,
- [ ] alt text bez keyword stuffing,
- [ ] posledný stock/visibility/backorder check v deň schválenia,
- [ ] produktové URL načítať znova z live `permalink`,
- [ ] posledný HTTP/link check,
- [ ] duplicita/permalink check vo WordPress,
- [ ] kategórie a tagy sú konzistentné,
- [ ] Yoast title/meta/focus keyword pripravené,
- [ ] schema typ zodpovedá článku,
- [ ] finálny preview desktop + mobil,
- [ ] odstrániť všetky staging-only poznámky o internom sklade, obchodnom gate a dátume kontroly,
- [ ] pri dynamických témach Matter/Thread/Home Assistant UI znovu overiť aktuálnu dokumentáciu v deň schválenia,
- [ ] explicitné schválenie publikácie.

## FAIL CLOSED

Ak ktorýkoľvek z týchto bodov nie je možné overiť, draft zostáva v stagingu. Chýbajúci produkt sa nenahrádza náhodným produktom iba preto, aby článok mal CTA.

**RFR neznamená approved-for-publish.** V tomto checkpointe nie je na publikovanie schválený žiadny nový článok.
