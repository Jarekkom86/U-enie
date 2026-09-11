<!-- markdownlint-disable MD013 -->

# KomArena blog — interné prelinkovanie v1

Tento dokument je pracovná mapa pre systém:

**Produkt → článok / návod → modelový projekt → súvisiaci produkt → kategória → ďalší článok → sociálny obsah**

Cieľom je, aby žiadny dôležitý článok nebol SEO ani obchodná slepá ulička.

## Záväzné pravidlá

Každý publikovaný článok má mať podľa relevancie:

- 1 hlavný odkaz na nadradenú obsahovú sekciu,
- 1 až 3 odkazy na reálne relevantné produkty,
- minimálne 1 odkaz na súvisiaci článok alebo návod,
- prirodzený návrat na kategóriu alebo ďalší krok používateľa,
- žiadny odkaz na produkt, ktorý nie je publikovaný alebo ktorého kompatibilita nie je overená.

Ceny a sklad sa v evergreen článkoch nemajú hardcodovať, pokiaľ to nie je zámerne časovo označený cenový článok.

## Hlavné obsahové huby

| Hub | URL | Úloha |
| --- | --- | --- |
| Blog | https://komarena.sk/blog/ | centrálny feed článkov |
| Home Assistant | https://komarena.sk/home-assistant/ | nadradený hub pre HA obsah |
| ESP & ESPHome | https://komarena.sk/esp-esphome/ | ESP32/ESP8266/ESPHome hub |
| Senzory | https://komarena.sk/senzory/ | senzorové návody a produkty |
| Napájanie | https://komarena.sk/napajanie/ | zdroje, meniče a stabilita |
| Protokoly a integrácie | https://komarena.sk/protokoly-a-integracie/ | Zigbee, Matter, Thread, BLE a integrácie |
| Značky a kompatibilita | https://komarena.sk/smart-znacky/ | kompatibilita a výber ekosystému |
| 3D tlač | https://komarena.sk/3d-tlac/ | filamenty, príslušenstvo a 3D návody |
| Návody | https://komarena.sk/navody/ | praktický Build Lab rozcestník |
| ReSmart | https://komarena.sk/resmart/ | servisná cesta pri probléme namiesto DIY |
| Produkty | https://komarena.sk/produkty/ | katalóg / obchodná cesta |

## Draft 001 — BleBox wLightBox v3 + Home Assistant

### Primárne inbound odkazy

- Home Assistant hub
- Protokoly a integrácie
- budúci článok o lokálnom smart osvetlení
- produktová stránka BleBox wLightBox v3

### Primárne outbound odkazy

- produkt BleBox wLightBox v3
- Home Assistant hub
- Protokoly a integrácie
- budúci článok: Wi-Fi vs. Zigbee pre osvetlenie

### Obchodný ďalší krok

Používateľ má po článku vedieť rozhodnúť, či potrebuje LED ovládač, napájací zdroj a vhodný LED pás.

## Draft 002 — Home Assistant Green

### Primárne inbound odkazy

- Home Assistant hub
- článok o prvej Zigbee sieti
- články pre začiatočníkov v Home Assistante

### Primárne outbound odkazy

- Home Assistant hub
- Protokoly a integrácie
- Draft 006 — prvá Zigbee sieť
- budúca produktová stránka Home Assistant Green iba po finalizácii produktu

### Obchodný ďalší krok

Green funguje ako nosný vstupný bod do ekosystému: Green → Zigbee/Thread adaptér → senzory → ESPHome → automatizácie.

## Draft 003 — Prvý ESPHome projekt s ESP32

### Primárne inbound odkazy

- ESP & ESPHome hub
- Home Assistant hub
- produkt ESP32 DevKit V1

### Primárne outbound odkazy

- ESP32 DevKit V1
- ESP & ESPHome hub
- Draft 005 — stabilné napájanie ESP32
- Draft 007 — Bluetooth Proxy
- Senzory

### Obchodný ďalší krok

ESP32 → USB kábel → breadboard / vodiče → prvý senzor → ďalší konkrétny projekt.

## Draft 004 — eSUN PLA+ výber a tlač

### Primárne inbound odkazy

- 3D tlač hub
- konkrétne PLA+ produkty
- Draft 008 — PLA vs. PLA+ vs. ABS+

### Primárne outbound odkazy

- aktuálne objednateľné eSUN PLA+ varianty
- 3D tlač hub
- Draft 008
- budúci článok o skladovaní a sušení filamentu

### Obchodný ďalší krok

PLA+ → vhodná farba → skladovanie/sušenie → príslušenstvo → ďalší filament podľa použitia.

## Draft 005 — Stabilné napájanie ESP32

### Primárne inbound odkazy

- Napájanie hub
- Draft 003 — prvý ESPHome projekt
- produktové stránky ESP32
- budúce návody k senzorom a displejom

### Primárne outbound odkazy

- Napájanie
- ESP & ESPHome
- Draft 003
- konkrétne zdroje/meniče až po overení parametrov a skladu

### Obchodný ďalší krok

Diagnostika → vhodný zdroj / menič → kvalitný kábel → stabilný ESP32 projekt.

## Draft 006 — Prvá Zigbee sieť v Home Assistante

### Primárne inbound odkazy

- Home Assistant hub
- Protokoly a integrácie
- Draft 002 — Home Assistant Green
- budúci článok ZHA vs. Zigbee2MQTT

### Primárne outbound odkazy

- Home Assistant
- Protokoly a integrácie
- Značky a kompatibilita
- Draft 002
- konkrétny Zigbee koordinátor až po zalistovaní a overení

### Obchodný ďalší krok

Koordinátor → routery → senzory → automatizácie.

### FAIL CLOSED

Kým KomArena nemá publikovaný vhodný Zigbee koordinátor, článok nesmie obsahovať falošný produktový CTA.

## Draft 007 — ESPHome Bluetooth Proxy

### Primárne inbound odkazy

- ESP & ESPHome hub
- Home Assistant hub
- Draft 003
- budúce články o BLE senzoroch

### Primárne outbound odkazy

- ESP & ESPHome
- Home Assistant
- Draft 005 — stabilné napájanie ESP32
- Draft 003 — prvý ESPHome projekt
- konkrétna ESP32 doska až po overení čipu a Bluetooth podpory

### Obchodný ďalší krok

ESP32 s BLE → stabilné napájanie → proxy → podporované BLE zariadenia.

## Draft 008 — PLA vs. PLA+ vs. ABS+

### Primárne inbound odkazy

- 3D tlač hub
- PLA+ a ABS+ produktové stránky
- Draft 004

### Primárne outbound odkazy

- Draft 004 — eSUN PLA+
- 3D tlač hub
- aktuálne objednateľné PLA+ produkty
- ABS+ produkt iba ak prejde skladovým a maržovým gate

### Obchodný ďalší krok

Výber podľa použitia → materiál → farba → príslušenstvo → skladovanie / sušenie.

## Aktuálne produktové linky použiteľné v draftoch

### ESP / ESPHome

- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/
- PIR HC-SR501: https://komarena.sk/pir-senzor-napr-hc-sr501/

### Smart Home

- BleBox wLightBox v3: https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/

### eSUN PLA+

- Grass Green: https://komarena.sk/produkt/esun-pla-plus-grass-green-175-mm-1-kg/
- Haze Blue: https://komarena.sk/produkt/esun-pla-plus-haze-blue-175-mm-1-kg/
- Peak Green: https://komarena.sk/produkt/esun-pla-plus-peak-green-175-mm-1-kg/
- Space Blue: https://komarena.sk/produkt/esun-pla-plus-space-blue-175-mm-1-kg/

### eSUN ABS+

- Black: https://komarena.sk/produkt/esun-abs-plus-black-175-mm-1-kg/
- Grey: https://komarena.sk/produkt/esun-abs-plus-grey-175-mm-1-kg/
- Orange: https://komarena.sk/produkt/esun-abs-plus-orange-175-mm-1-kg/

ABS+ odkazy sú obsahovo použiteľné, ale obchodný CTA musí rešpektovať aktuálnu objednateľnosť a maržový gate.

## Legacy články, ktoré treba zapojiť

### PIR senzor HC-SR501

Má smerovať na:

- ESP32 / ESPHome,
- Home Assistant,
- Draft 003,
- budúci samostatný ESPHome PIR projekt.

### HC-SR04 s Arduinom

Má smerovať na:

- senzory,
- vývojové dosky,
- budúci článok HC-SR04 + ESP32 / ESPHome, ak vznikne technicky korektná verzia.

### Arduino UNO vs. ESP32

Má smerovať na:

- ESP & ESPHome,
- Draft 003,
- relevantné vývojové dosky.

## Chýbajúce mosty — P0 obsah

Aby cluster neostal rozbitý, prioritne vzniknú:

1. ZHA vs. Zigbee2MQTT — čo zvoliť a pre koho.
2. ESP32 + PIR + ESPHome — prvá pohybová automatizácia.
3. BME280 + ESPHome — teplota, vlhkosť a tlak.
4. Ako vybrať napájanie pre ESP32 projekt.
5. Ako skladovať a sušiť filament.
6. Home Assistant Green + Zigbee koordinátor — kompletný štartovací setup po zalistovaní koordinátora.
7. Bluetooth Proxy vs. USB Bluetooth adaptér.
8. 3D tlačená krabička pre ESP32 — PLA+ vs. ABS+ podľa prostredia.

## Publish gate pre interné linky

Pred publikovaním článku:

- všetky interné URL otvoriť a overiť HTTP stav,
- odstrániť odkazy na nepublikované alebo vyradené produkty,
- cenu a sklad nevkladať do anchor textu,
- pri produkte s neistou dostupnosťou odkaz ponechať iba ako technický príklad alebo ho odstrániť,
- aspoň jeden inbound link na nový článok doplniť z existujúcej relevantnej stránky / článku,
- nevytvárať umelé prelinkovanie iba kvôli počtu odkazov.
