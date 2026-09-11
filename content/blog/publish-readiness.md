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

- **A — prvý publish batch**: po poslednom URL/stock/source preflight môže ísť na review.
- **B — pripraviť po A**: obsah je silný, ale chýba hardware test, pinout/revision overenie alebo konkrétny produktový gate.
- **C — blokované**: publikovať až po splnení explicitnej podmienky.
- **R — reference**: už publikovaný alebo slúži ako referenčný text; nerepublikovať ako nový článok.

## Poradie 20 draftov

| Poradie | Draft | Stav | Obchod | Sklad | Technika | Hlavný gate |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | 003 — Prvý ESPHome projekt s ESP32 | A | vysoký | ESP32 stock-backed | vysoká | posledný link/source preflight |
| 2 | 005 — Stabilné napájanie ESP32 | A | vysoký | funguje aj bez konkrétneho meniča | vysoká | netvrdiť generické prúdové limity modulov |
| 3 | 013 — Ako vybrať napájanie pre ESP32 | A | vysoký | ESP32 + opatrný HW-319 gate | vysoká | HW-319 stock a konkrétny modul pred CTA |
| 4 | 014 — Bluetooth Proxy vs USB adaptér | A | vysoký | ESP32 stock-backed | vysoká | USB dongle neodporúčať bez aktuálnej HA kompatibility |
| 5 | 008 — PLA vs PLA+ vs ABS+ | A | vysoký | PLA+ použiteľné; ABS+ gated | vysoká | ABS+ CTA iba po marži/sklade |
| 6 | 012 — Ako skladovať a sušiť filament | A | stredne vysoký | evergreen; príslušenstvo gated | vysoká | eBOX/eVacuum iba po marži/sklade |
| 7 | 004 — eSUN PLA+ výber a tlač | A | vysoký | varianty recheck pred CTA | vysoká | reálne dostupné farby/varianty |
| 8 | 017 — ESPHome OLED SSD1306 dashboard | B | vysoký | OLED stock-backed | stredná/vysoká | overiť radič, I2C adresu, napájanie a YAML na reálnom kuse |
| 9 | 019 — DHT22 + ESPHome | B | vysoký | DHT22 stock-backed | stredná/vysoká | pinout + DATA pull-up konkrétneho modulu |
| 10 | 018 — HC-SR04 + ESP32 + ESPHome | B | vysoký | HC-SR04 stock-backed | stredná/vysoká | fyzicky otestovať ECHO prispôsobenie a YAML |
| 11 | 020 — DHT22 vs BME280 | B | stredne vysoký | DHT22 áno, BME280 nie | vysoká | BME280 iba informačne, žiadny nákupný CTA |
| 12 | 007 — ESPHome Bluetooth Proxy | B | vysoký | ESP32 stock-backed | vysoká | overiť konkrétny ESP32 variant/čip a aktuálne proxy limity |
| 13 | 016 — PLA+ vs ABS+ pre ESP32 krabičku | B | stredne vysoký | závisí od filamentov | vysoká | žiadne „ABS+=outdoor“, produktové CTA po marži/sklade |
| 14 | 001 — BleBox wLightBox v3 + Home Assistant | R | vysoký | produkt existuje | vysoká | produkčný článok už existuje — nerepublikovať |
| 15 | 002 — Home Assistant Green | C | veľmi vysoký | nosný produkt musí byť finálne zalistovaný | vysoká | produkt + cena/marža + finálny ekosystémový CTA |
| 16 | 006 — Prvá Zigbee sieť | C | veľmi vysoký | chýba overený koordinátor v sortimente | vysoká | žiadny koordinátor CTA pred zalistovaním |
| 17 | 009 — ZHA vs Zigbee2MQTT | C | vysoký | chýba overený koordinátor | vysoká | kompatibilita konkrétneho koordinátora s oboma stackmi |
| 18 | 010 — ESP32 + HC-SR501 + ESPHome | C | stredne vysoký | HC-SR501 outofstock/hidden | vysoká | obnoviť sklad alebo publikovať striktne bez predajného CTA |
| 19 | 011 — BME280 + ESPHome | C | vysoký | BME280 outofstock | vysoká | sklad/backorder podľa obchodných pravidiel |
| 20 | 015 — BME280 vs BMP280 | C | stredný | oba produkty outofstock | vysoká | môže ísť informačne neskôr, bez nákupných CTA |

## Prvý bezpečný publish batch

Poradie pre finálny review, nie automatické publikovanie:

1. Draft 003 — Prvý ESPHome projekt s ESP32
2. Draft 005 — Stabilné napájanie ESP32
3. Draft 013 — Ako vybrať napájanie pre ESP32
4. Draft 014 — Bluetooth Proxy vs USB adaptér
5. Draft 008 — PLA vs PLA+ vs ABS+
6. Draft 012 — Ako skladovať a sušiť filament
7. Draft 004 — eSUN PLA+ výber a tlač

Tento batch je zvolený preto, že buduje tri komerčne užitočné clustre bez závislosti od vypredaného senzora alebo nezalistovaného Zigbee koordinátora:

- **ESPHome Build Lab:** 003 → 005 → 013 → 014
- **3D tlač:** 008 → 012 → 004
- **BleBox článok 001:** už existuje na produkcii a má slúžiť ako inbound/outbound referenčný bod, nie ako nový publish.

## Publish-readiness checklist

Pred zmenou stavu `draft` → `ready-for-review`:

- [ ] H1 rieši jednu jasnú otázku používateľa.
- [ ] SEO title a meta description nie sú duplicitné s existujúcim článkom.
- [ ] Všetky technické tvrdenia majú primárny/official source alebo sú označené ako praktická skúsenosť.
- [ ] Každý kód/YAML/zapojenie bolo skontrolované proti aktuálnej dokumentácii.
- [ ] Pri zapojení je jasne odlíšená 5 V a 3,3 V logika.
- [ ] Článok neobsahuje univerzálne tvrdenie o generickom module, ak sa revízie líšia.
- [ ] Každý produktový URL otvára správny aktuálny produkt.
- [ ] Produkt je publikovaný a jeho visibility/backorder stav je kompatibilný s CTA.
- [ ] Ceny a sklad nie sú hardcoded v evergreen texte.
- [ ] Vypredaný produkt nie je prezentovaný ako dostupný.
- [ ] Minimálne jeden outbound interný link vedie na ďalší relevantný článok/hub.
- [ ] Je definovaný aspoň jeden reálny inbound link z existujúcej produkčnej stránky.
- [ ] Featured image spĺňa `article-template.md`.
- [ ] Alt text opisuje obrázok, nie je keyword stuffing.
- [ ] CTA je prirodzené a nepredáva produkt, ktorý článok technicky nepotrebuje.
- [ ] Bezpečnostné obmedzenia sú priamo pri rizikovom kroku, nie iba na konci.
- [ ] Nie sú uvedené interné sourcing poznámky, dodávateľ, nákupná cena ani dodávateľské SKU.
- [ ] Facebook/social text je krátky teaser s odkazom späť na KomArena, nie plná kópia článku.

Pred `ready-for-review` → `approved-for-publish`:

- [ ] posledný stock/visibility/backorder check v deň schválenia,
- [ ] posledný HTTP/link check,
- [ ] duplicita/permalink check vo WordPress,
- [ ] kategórie a tagy sú konzistentné,
- [ ] Yoast title/meta/focus keyword pripravené,
- [ ] schema typ zodpovedá článku,
- [ ] finálny preview desktop + mobil,
- [ ] explicitné schválenie publikácie.

## FAIL CLOSED

Ak ktorýkoľvek z týchto bodov nie je možné overiť, draft zostáva v stagingu. Chýbajúci produkt sa nenahrádza náhodným produktom iba preto, aby článok mal CTA.
