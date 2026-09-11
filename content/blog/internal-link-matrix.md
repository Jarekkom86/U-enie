<!-- markdownlint-disable MD013 -->

# KomArena blog — interné prelinkovanie v2

Toto je jediný staging zdroj pravdy pre interné linkovanie blogu.

**Produkt → článok / návod → modelový projekt → súvisiaci produkt → kategória → ďalší článok → sociálny obsah**

## Záväzné pravidlá

Každý publikovaný článok má mať podľa relevancie:

- 1 nadradený obsahový hub,
- 1 až 3 odkazy na reálne relevantné produkty,
- 1 až 3 odkazy na súvisiace články alebo návody,
- aspoň jeden plánovaný inbound link z existujúcej produkčnej stránky,
- žiadny aktívny nákupný CTA na nepublikovaný, skrytý alebo nevhodne vypredaný produkt,
- žiadnu hardcoded cenu alebo sklad v evergreen texte,
- žiadne dodávateľské, sourcing, nákupné ani interné SKU poznámky.

Pred publikovaním sa každý URL, sklad, visibility, backorder a kompatibilita overujú znova. Produktový URL sa nikdy neodvodzuje z názvu; zdroj pravdy je aktuálne pole `permalink` živého WooCommerce produktu.

## Hlavné obsahové huby

| Hub | URL |
| --- | --- |
| Blog | https://komarena.sk/blog/ |
| Home Assistant | https://komarena.sk/home-assistant/ |
| ESP & ESPHome | https://komarena.sk/esp-esphome/ |
| Senzory | https://komarena.sk/senzory/ |
| Napájanie | https://komarena.sk/napajanie/ |
| Protokoly a integrácie | https://komarena.sk/protokoly-a-integracie/ |
| Značky a kompatibilita | https://komarena.sk/smart-znacky/ |
| 3D tlač | https://komarena.sk/3d-tlac/ |
| Návody | https://komarena.sk/navody/ |
| ReSmart | https://komarena.sk/resmart/ |
| Produkty | https://komarena.sk/produkty/ |

## Produktové URL — snapshot pre staging

Tieto URL sú pracovný snapshot. Tesne pred publikovaním sa vždy načítajú znova zo živého WooCommerce produktu.

### ESP / senzory

- ESP32 DevKit V1, ID 2159: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- HC-SR501: https://komarena.sk/produkt/hc-sr501-pir-senzor/ — aktuálne outofstock/hidden
- BME280: https://komarena.sk/produkt/bme280-senzor-teploty-vlhkosti-a-tlaku-vzduchu/ — aktuálne outofstock
- BMP280: https://komarena.sk/produkt/bmp280-senzor-teploty-a-tlaku-vzduchu/ — aktuálne outofstock
- DHT22 / AM2302: https://komarena.sk/produkt/dht22-am2302-senzor-teploty-a-vlhkosti/
- HC-SR04: https://komarena.sk/produkt/hc-sr04-ultrazvukovy-senzor-esphome/
- OLED SSD1306: https://komarena.sk/produkt/oled-096-i2c-ssd1306-displej-128x64-pre-esphome-dashboard/
- HW-319 LM2596: https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/

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

ABS+ CTA je vždy pod skladovým a maržovým gate.

## Draft mapa 001–020

| Draft | Primárny inbound | Primárny outbound | Obchodný ďalší krok | Gate |
| --- | --- | --- | --- | --- |
| 001 BleBox + HA | HA hub, produkt BleBox, protokoly | BleBox, HA, protokoly | LED kontrolér → zdroj → LED pás | produkčný článok už existuje; nerepublikovať |
| 002 Home Assistant Green | HA hub, beginner HA | HA, 006, 009 | Green → koordinátor → senzory → ESPHome | finálne zalistovanie Green + marža/CTA |
| 003 Prvý ESPHome projekt | ESP hub, HA, ESP32 produkt | ESP32, 005, 007, 010, 011, 013 | ESP32 → kábel → prvý senzor | stock/source/link preflight |
| 004 eSUN PLA+ | 3D hub, PLA+ produkty, 008 | PLA+ varianty, 008, 012 | materiál → farba → skladovanie | aktuálne varianty pred CTA |
| 005 Stabilné napájanie ESP32 | Napájanie, 003, 007, 013 | Napájanie, ESP hub, 003, 013 | diagnostika → zdroj/kábel/menič | žiadne generické prúdové garancie |
| 006 Prvá Zigbee sieť | HA, protokoly, 002, 009 | HA, protokoly, 009 | koordinátor → routery → senzory | bez koordinátora CTA do zalistovania |
| 007 ESPHome Bluetooth Proxy | ESP, HA, 003, 014 | ESP32, 005, 013, 014 | ESP32 BLE → proxy → BLE zariadenia | konkrétny čip + aktuálne proxy limity |
| 008 PLA vs PLA+ vs ABS+ | 3D, 004, 012, filamenty | 004, 012, 016 | použitie → materiál → skladovanie | ABS+ marža/sklad |
| 009 ZHA vs Zigbee2MQTT | 006, HA, protokoly | 006, 002, HA | stack → kompatibilný koordinátor | konkrétny koordinátor overený pre stack |
| 010 ESP32 + PIR | legacy 2426, 003, senzory | ESP32, 003, 005 | ESP32 → PIR → automatizácia | HC-SR501 outofstock/hidden |
| 011 BME280 + ESPHome | 003, senzory, 015, 020 | ESP32, 005, 015, 017 | ESP32 → BME280 → HA | BME280 outofstock |
| 012 Skladovanie filamentu | 3D, 004, 008 | 004, 008, 3D | filament → skladovanie/sušenie | eBOX/eVacuum marža/sklad |
| 013 Výber napájania ESP32 | 003, 005, 007, ESP32, HW-319 | ESP32, HW-319, 005, 014 | vstup → zdroj/kábel → menič | HW-319 recheck, žiadny 230 V DIY |
| 014 Proxy vs USB Bluetooth | 007, HA, ESP32 | 007, 013, ESP32 | lokálny USB + vzdialené BLE proxy | USB dongle iba podľa aktuálnej HA kompatibility |
| 015 BME280 vs BMP280 | 011, senzory, 020 | 011, DHT22, senzory | vybrať podľa meraných veličín | BME280/BMP280 outofstock |
| 016 ESP32 krabička PLA+/ABS+ | 004, 008, 012, 013 | ESP32, 004, 008, 012 | prostredie → materiál → návrh | ABS+ nie je automaticky outdoor |
| 017 OLED dashboard | OLED, ESP32, 003, 019 | OLED, ESP32, 013, 019 | ESP32 → OLED → senzor → krabička | radič, I2C, napájanie a YAML test |
| 018 HC-SR04 + ESP32 | HC-SR04, legacy 1971, ESP32 | HC-SR04, ESP32, 003, 013 | level shift → ESPHome → aplikácia | ECHO ~5 V nesmie priamo do 3,3 V GPIO |
| 019 DHT22 + ESPHome | DHT22, ESP32, 003, 017 | DHT22, ESP32, 016, 017, 020 | ESP32 + DHT22 → HA → display | pinout + DATA pull-up konkrétneho modulu |
| 020 DHT22 vs BME280 | 019, 011, 015, senzory | DHT22, 011, 015, 017 | vybrať podľa veličín a rozhrania | BME280 iba informačne počas vypredania |

## Legacy články / rewrites

### 2426 — PIR / HC-SR501

Po oprave má smerovať na Draft 003, Draft 010, ESP & ESPHome a Senzory.

Povinná oprava: H = retrigger/repeat, L = single/non-retrigger. HC-SR501 produkt je počas vypredania iba technická referencia.

### 1971 — HC-SR04 + Arduino UNO

Po oprave má smerovať na HC-SR04 produkt, Senzory a Draft 018.

Arduino UNO verzia pracuje v 5 V logike. ESP32 verzia musí riešiť ECHO približne 5 V → 3,3 V GPIO prispôsobenie.

### 1964 — Arduino UNO vs ESP32

Po oprave má smerovať na ESP32 DevKit V1, Draft 003, 005, 013 a 014.

Nepoužívať univerzálnu tabuľku pre všetky ESP32 rodiny; ESP32-S3 odlíšiť od klasickej ESP32 cesty.

## Stock-backed obsahové balíčky

### ESPHome Build Lab

ESP32 DevKit V1 → Draft 003 → Draft 005 → Draft 013 → Draft 014 → podľa projektu 017/018/019.

### Izbový senzor

ESP32 DevKit V1 → DHT22/AM2302 → Draft 019 → voliteľne OLED Draft 017 → krabička Draft 016.

### Ultrazvukový projekt

ESP32 DevKit V1 → HC-SR04 → bezpečný level shift/delič → Draft 018.

### 3D tlač

Draft 008 → Draft 004 → Draft 012 → Draft 016 podľa použitia.

## Produktové inbound úlohy po publikovaní

- ESP32 DevKit V1 → Build Lab rozcestník s 003/005/013/014/017/018/019.
- OLED SSD1306 → Draft 017.
- HC-SR04 → Draft 018 + opravený legacy 1971.
- DHT22/AM2302 → Draft 019 + 020.
- BleBox wLightBox v3 → existujúci produkčný BleBox článok.
- relevantné PLA+ varianty → Draft 004/008/012 podľa kontextu.

Inbound odkazy sa pridávajú až po existencii finálneho permalinku článku.

## Publish gate pre interné linky

Pred každým publish approval:

- [ ] produktové URL načítať z aktuálneho živého WooCommerce `permalink`, nie odvodiť z názvu,
- [ ] všetky interné URL otvoriť a overiť,
- [ ] odstrániť odkazy na nepublikované alebo vyradené produkty,
- [ ] overiť stock/visibility/backorder v deň schválenia,
- [ ] cenu a sklad nedávať do evergreen anchor textu,
- [ ] pri vypredanom produkte použiť iba informačný link, ak je to pre používateľa užitočné,
- [ ] vložiť aspoň jeden inbound link z existujúcej produkčnej stránky,
- [ ] nevytvárať umelé prelinkovanie iba kvôli počtu odkazov,
- [ ] neuvádzať dodávateľa ani interné sourcing dáta.

## Súvisiace staging dokumenty

- `publish-readiness.md` — poradie a gate 20 draftov
- `article-template.md` — WordPress/article/card/featured-image štandard
- `legacy-post-audit.md` — pôvodné problémy legacy článkov
- `product-content-opportunities.md` — produktovo-obsahové príležitosti
