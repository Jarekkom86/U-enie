<!-- markdownlint-disable MD013 -->

# Internal-link matrix — extension for Drafts 013–016 and legacy rewrites

Tento súbor rozširuje `internal-link-matrix.md`. Pred publish fázou sa má obsah konsolidovať do jednej finálnej matice.

## Draft 013 — Ako vybrať napájanie pre ESP32

### Inbound

- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- Draft 007 — Bluetooth Proxy
- Draft 010 — ESP32 + PIR
- Draft 011 — BME280 + ESPHome
- produkt ESP32 DevKit V1
- produkt HW-319 LM2596
- Napájanie hub

### Outbound

- ESP32 DevKit V1
- HW-319 LM2596
- Draft 003
- Draft 005
- Draft 014 — Bluetooth Proxy vs USB adaptér
- Napájanie hub
- ESP & ESPHome hub

### Obchodný ďalší krok

Diagnostika problému → overený vstup → kvalitný kábel/zdroj → step-down iba ak ho projekt potrebuje → stabilný ESPHome uzol.

### FAIL CLOSED

- netvrdiť, že konkrétny HW-319 garantuje trvalý prúd podľa maxima LM2596 čipu,
- pred CTA znovu overiť fyzický sklad HW-319,
- žiadny 230 V DIY postup.

## Draft 014 — Bluetooth Proxy vs USB adaptér

### Inbound

- Draft 007 — ESPHome Bluetooth Proxy
- Home Assistant hub
- ESP & ESPHome hub
- produkt ESP32 DevKit V1

### Outbound

- Draft 007
- Draft 013 — napájanie ESP32
- ESP32 DevKit V1
- Home Assistant hub
- ESP & ESPHome hub
- budúci článok „Kam umiestniť Bluetooth Proxy“

### Rozhodovací cieľ

Používateľ má po článku vedieť, že lokálny USB adaptér a vzdialené proxy sa môžu dopĺňať. Proxy nie je univerzálna náhrada pre všetky Bluetooth profily; ESPHome proxy je BLE cesta.

### FAIL CLOSED

- limit aktívnych spojení vždy preveriť v aktuálnej ESPHome dokumentácii,
- konkrétny USB dongle odporúčať iba po kontrole aktuálneho Home Assistant zoznamu kompatibility.

## Draft 015 — BME280 vs BMP280

### Inbound

- Draft 011 — BME280 + ESPHome
- Draft 003 — prvý ESPHome projekt
- Senzory hub
- BME280 a BMP280 produktové stránky
- budúci DHT22 vs BME280 článok

### Outbound

- Draft 011
- ESP32 DevKit V1
- BME280 produkt — technická referencia počas vypredania
- BMP280 produkt — technická referencia počas vypredania
- DHT22 produkt — aktuálne skladom
- Senzory hub

### Obchodný ďalší krok

Ak používateľ potrebuje vlhkosť dnes a BME280 nie je dostupný, článok môže vysvetliť DHT22 ako inú funkčnú triedu — nie ho predstierať ako plnohodnotnú náhradu barometrického senzora.

### FAIL CLOSED

BME280 aj BMP280 sú k 11. 9. 2026 vypredané bez backorderu. Žiadny „kúpte teraz“ CTA.

## Draft 016 — PLA+ vs ABS+ pre ESP32 krabičku

### Inbound

- Draft 004 — eSUN PLA+
- Draft 008 — PLA vs PLA+ vs ABS+
- Draft 012 — skladovanie/sušenie
- Draft 013 — napájanie ESP32
- ESP32 DevKit V1
- 3D tlač hub

### Outbound

- Draft 004
- Draft 008
- Draft 012
- Draft 013
- ESP32 DevKit V1
- 3D tlač hub
- konkrétne PLA+/ABS+ produkty iba po skladovom a maržovom gate

### Obsahový ďalší krok

Výber prostredia → materiál → návrh ventilácie/RF → tlač → montáž elektroniky → teplotný test hotovej krabičky.

### FAIL CLOSED

- „ABS+ = outdoor“ je zakázaná skratka,
- pri ABS+ overiť presnú generáciu/TDS a maržu,
- článok nie je návod na kryt pre 230 V alebo certifikovaný rozvádzač.

## Legacy rewrite 2426 — HC-SR501

### Inbound po oprave

- Draft 010 — ESP32 + PIR
- Draft 003 — prvý ESPHome projekt
- Senzory hub
- ESP & ESPHome hub

### Outbound po oprave

- ESP32 DevKit V1 — aktuálny slug
- Draft 010
- ESPHome hub
- HC-SR501 produkt iba ako technická referencia počas vypredania

### Povinná oprava pred inbound propagáciou

H = retrigger/repeat; L = single/non-retrigger. Pôvodný text sa nesmie ďalej propagovať v dnešnej podobe.

## Legacy rewrite 1971 — HC-SR04 + Arduino UNO

### Inbound po oprave

- produkt HC-SR04
- robotika / senzory
- budúci HC-SR04 + ESP32 + ESPHome článok

### Outbound po oprave

- HC-SR04 produkt
- Senzory hub
- budúci ESP32 variant
- Arduino UNO official context iba ako platformová referencia

### Povinná bezpečnostná vetva

Arduino UNO verzia môže pracovať v 5 V logike. ESP32 článok musí mať samostatne riešené ECHO približne 5 V → 3,3 V GPIO prispôsobenie.

## Legacy rewrite 1964 — Arduino UNO vs ESP32

### Inbound po oprave

- Draft 003
- Draft 013
- Draft 014
- vývojové dosky / ESP32 kategória

### Outbound po oprave

- ESP32 DevKit V1
- ESP32-S3 ako samostatný variant
- Draft 003
- Draft 013
- Draft 014

### Povinné pravidlo

Nepoužívať jednu univerzálnu tabuľku parametrov pre všetky ESP32 rodiny. UNO Rev3 porovnávať s konkrétnou klasickou ESP32/DevKit cestou a S3 odlíšiť.

## Nové produktové inbound cesty

- ESP32 DevKit V1 → Draft 003, 005, 007, 013, 014, 016.
- HW-319 → Draft 005 a 013.
- HC-SR04 → legacy rewrite 1971 a budúci moderný ESPHome HC-SR04 článok.
- DHT22 → budúci DHT22 + ESPHome a DHT22 vs BME280.
- OLED SSD1306 → budúci ESPHome OLED dashboard a BME280/DHT22 display projekty.
- ESP32 Expansion Board 30P → budúci prototypovací/servisný článok.

## Konsolidačný krok pred publish

Pred presunom prvého draftu do `approved-for-publish`:

1. zlúčiť túto extension do hlavnej `internal-link-matrix.md`,
2. opraviť v hlavnej matici starú ESP32 DevKit URL na aktuálny slug,
3. overiť všetky interné URL,
4. vybrať aspoň jeden reálny inbound link z už publikovanej stránky,
5. znovu skontrolovať stock/visibility/backorders pri všetkých CTA produktoch.
