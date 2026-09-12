<!-- markdownlint-disable MD013 -->

# KomArena blog — interné prelinkovanie v5

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
| 003 Prvý ESPHome projekt | ESP hub, HA, ESP32 produkt | ESP32, 005, 007, 010, 011, 013, 032 | ESP32 → kábel → prvý senzor | stock/source/link preflight |
| 004 eSUN PLA+ | 3D hub, PLA+ produkty, 008 | PLA+ varianty, 008, 012 | materiál → farba → skladovanie | aktuálne varianty pred CTA |
| 005 Stabilné napájanie ESP32 | Napájanie, 003, 007, 013 | Napájanie, ESP hub, 003, 013, 032, 033 | diagnostika → zdroj/kábel/menič | žiadne generické prúdové garancie |
| 006 Prvá Zigbee sieť | HA, protokoly, 002, 009, 027, 028 | HA, protokoly, 009, 027 | koordinátor → routery → senzory | bez koordinátora CTA do zalistovania |
| 007 ESPHome Bluetooth Proxy | ESP, HA, 003, 014 | ESP32, 005, 013, 014, 032 | ESP32 BLE → proxy → BLE zariadenia | konkrétny čip + aktuálne proxy limity |
| 008 PLA vs PLA+ vs ABS+ | 3D, 004, 012, filamenty | 004, 012, 016 | použitie → materiál → skladovanie | ABS+ marža/sklad |
| 009 ZHA vs Zigbee2MQTT | 006, HA, protokoly, 027, 028 | 006, 002, HA, 027 | stack → kompatibilný koordinátor | konkrétny koordinátor overený pre stack |
| 010 ESP32 + PIR | legacy 2426, 003, senzory | ESP32, 003, 005, 029 | ESP32 → PIR → automatizácia | HC-SR501 outofstock/hidden |
| 011 BME280 + ESPHome | 003, senzory, 015, 020 | ESP32, 005, 015, 017 | ESP32 → BME280 → HA | BME280 outofstock |
| 012 Skladovanie filamentu | 3D, 004, 008 | 004, 008, 3D | filament → skladovanie/sušenie | eBOX/eVacuum marža/sklad |
| 013 Výber napájania ESP32 | 003, 005, 007, ESP32, HW-319 | ESP32, HW-319, 005, 014, 032 | vstup → zdroj/kábel → menič | HW-319 recheck, žiadny 230 V DIY |
| 014 Proxy vs USB Bluetooth | 007, HA, ESP32 | 007, 013, ESP32, 027 | lokálny USB + vzdialené BLE proxy | USB dongle iba podľa aktuálnej HA kompatibility |
| 015 BME280 vs BMP280 | 011, senzory, 020 | 011, DHT22, senzory | vybrať podľa meraných veličín | BME280/BMP280 outofstock |
| 016 ESP32 krabička PLA+/ABS+ | 004, 008, 012, 013 | ESP32, 004, 008, 012 | prostredie → materiál → návrh | ABS+ nie je automaticky outdoor |
| 017 OLED dashboard | OLED, ESP32, 003, 019 | OLED, ESP32, 013, 019 | ESP32 → OLED → senzor → krabička | radič, I2C, napájanie a YAML test |
| 018 HC-SR04 + ESP32 | HC-SR04, legacy 1971, ESP32 | HC-SR04, ESP32, 003, 013 | level shift → ESPHome → aplikácia | ECHO ~5 V nesmie priamo do 3,3 V GPIO |
| 019 DHT22 + ESPHome | DHT22, ESP32, 003, 017, 032 | DHT22, ESP32, 016, 017, 020 | ESP32 + DHT22 → HA → display | pinout + DATA pull-up konkrétneho modulu |
| 020 DHT22 vs BME280 | 019, 011, 015, senzory | DHT22, 011, 015, 017 | vybrať podľa veličín a rozhrania | BME280 iba informačne počas vypredania |

## Draft mapa 021–035 — Home Assistant / ReSmart

| Draft | Primárny inbound | Primárny outbound | Obchodný ďalší krok | Gate |
| --- | --- | --- | --- | --- |
| 021 Čo je Home Assistant | HA hub, Blog, beginner články | 022, 024, 026, 030, 031, HA hub | vysvetliť platformu → vybrať prvú integráciu | evergreen; final source/SEO review |
| 022 Lokálna vs cloudová domácnosť | 021, HA hub, BleBox článok | 021, 025, 027, 033, BleBox | lokálna integrácia → konkrétny overený produkt | produkt iba ak je reálne lokálny a aktuálne kompatibilný |
| 023 DHCP rezervácia vs statická IP | 021, 025, 033, ReSmart | 024, 025, 032, 033, HA hub | stabilná sieť → menej servisných problémov | žiadne router-vendor špecifické návody bez overenia |
| 024 Naming zariadení a entít | 021, 023, 026, 031 | 025, 026, 031, 032, HA hub | poriadok → škálovateľné automatizácie | screenshoty/terminológia recheck day-of |
| 025 Zariadenie sa neobjavilo | 021, 023, 033, ReSmart | 022, 023, 024, 030, 033, ReSmart | diagnostika → integrácia → servis ak treba | žiadny slepý factory reset ako prvý krok |
| 026 Prvá automatizácia | 021, 024, HA hub | 029, 024, 031, Návody | trigger → condition → action → modelový projekt | aktuálny editor/YAML syntax recheck |
| 027 Wi-Fi vs Zigbee vs Thread vs Matter | HA, protokoly, 021, 028 | 006, 009, 022, 028 | protokol → potrebné rádio/controller → produkt až po gate | Thread/Matter stav a ZBT-2 odporúčanie recheck pred publish |
| 028 HA bez zbytočných hubov | 021, 022, 027, HA hub | 006, 009, 023, 027, 030 | inventár → minimálna architektúra → konkrétny hardware až po gate | žiadny coordinator/border-router CTA bez zalistovania a kompatibility |
| 029 Pohyb → podmienka → svetlo | 026, 024, legacy PIR, Návody | 026, 010, 024, 031 | senzor + existujúce svetlo → automatizácia | produktovo nezávislé; YAML/editor preflight + žiadny vypredaný PIR CTA |
| 030 Zálohy a obnova | 021, 025, 028, 034, ReSmart | 023, 025, 028, 034, 035, ReSmart | backup → second location → restore plan | emergency kit nikdy nezverejniť; UI recheck day-of |
| 031 Dashboard organizácia | 021, 024, 026, HA hub | 024, 026, 029, 030, 035 | Areas/naming → Sections → user dashboards | built-in dashboard names a UI recheck day-of |
| 032 HA + ESPHome starter architektúra | HA, ESP hub, 003, ESP32 produkt | 003, 005, 013, 019, 024, 026, 030 | ESP32 → kábel → native API → jeden senzor | live ESP32 permalink/stock + starter sensor gate |
| 033 Smart zariadenie offline | ReSmart, 022, 023, 025, 035 | 005, 023, 025, 030, 034, 035 | diagnostika vrstvy → supported fix → ReSmart ak treba | reset nie je prvý krok; žiadne citlivé logy/tokeny |
| 034 Bezpečný HA update | 030, 033, 035, HA hub | 030, 033, 035, Repairs/Logs | backup → release notes → update → smoke test | CLI/downgrade iba pre presný installation type; day-of UI recheck |
| 035 Maintenance dashboard | 030, 031, 033, 034, ReSmart | 030, 031, 033, 034 | Repairs + system health → výnimky → servis | system-monitor entity dostupnosť overiť; žiadne emergency secrets |

## Beginner funnel — Home Assistant od nuly

Odporúčané obsahové poradie:

**021 čo je HA → 022 local/cloud → 027 protokoly → 028 architektúra bez hub chaosu → 023 stabilná IP → 024 naming → 025 discovery troubleshooting → 030 backup/recovery → 031 dashboard → 026 prvá automatizácia → 029 pohybové svetlo → 032 ESPHome starter**

Tento funnel je zámerne evergreen a nesmie byť blokovaný tým, že konkrétny senzor, coordinator alebo border router práve nie je skladom.

## Maintenance / ReSmart funnel

Odporúčané poradie:

**033 zariadenie offline → 035 maintenance dashboard → 034 bezpečný update → 030 backup/recovery → ReSmart diagnostika**

Obsah má viesť používateľa od bezpečnej samodiagnostiky k servisu iba tam, kde už dáva servis technický zmysel. ReSmart CTA sa neaktivuje, kým služba a objednávkový proces nie sú reálne pripravené.

## Legacy články / rewrites

### 2426 — PIR / HC-SR501

Po oprave má smerovať na Draft 003, Draft 010, Draft 029, ESP & ESPHome a Senzory.

Povinná oprava: H = retrigger/repeat, L = single/non-retrigger. HC-SR501 produkt je počas vypredania iba technická referencia.

### 1971 — HC-SR04 + Arduino UNO

Po oprave má smerovať na HC-SR04 produkt, Senzory a Draft 018.

Arduino UNO verzia pracuje v 5 V logike. ESP32 verzia musí riešiť ECHO približne 5 V → 3,3 V GPIO prispôsobenie.

### 1964 — Arduino UNO vs ESP32

Po oprave má smerovať na ESP32 DevKit V1, Draft 003, 005, 013, 014 a 032.

Nepoužívať univerzálnu tabuľku pre všetky ESP32 rodiny; ESP32-S3 odlíšiť od klasickej ESP32 cesty.

## Stock-backed obsahové balíčky

### ESPHome Build Lab

ESP32 DevKit V1 → Draft 003 → Draft 005 → Draft 013 → Draft 014 → podľa projektu 017/018/019 → Draft 032 ako starter rozcestník.

### Izbový senzor

ESP32 DevKit V1 → DHT22/AM2302 → Draft 019 → voliteľne OLED Draft 017 → krabička Draft 016.

### Ultrazvukový projekt

ESP32 DevKit V1 → HC-SR04 → bezpečný level shift/delič → Draft 018.

### 3D tlač

Draft 008 → Draft 004 → Draft 012 → Draft 016 podľa použitia.

### Home Assistant od nuly

Draft 021 → 022 → 027 → 028 → 023 → 024 → 025 → 030 → 031 → 026 → 029 → 032.

### ReSmart maintenance

Draft 033 → Draft 035 → Draft 034 → Draft 030 → ReSmart podľa reálneho servisného gate.

## Produktové inbound úlohy po publikovaní

- ESP32 DevKit V1 → Build Lab rozcestník s 003/005/013/014/017/018/019/032.
- OLED SSD1306 → Draft 017.
- HC-SR04 → Draft 018 + opravený legacy 1971.
- DHT22/AM2302 → Draft 019 + 020 + 032, ak zostava prejde gate.
- BleBox wLightBox v3 → existujúci produkčný BleBox článok + Draft 022 ako príklad local smart home.
- relevantné PLA+ varianty → Draft 004/008/012 podľa kontextu.
- Home Assistant hub/page → beginner funnel 021/022/027/028/023/024/025/030/031/026/029/032 podľa finálnych permalinkov.
- ReSmart page → 033/034/035 až po reálnom servisnom a objednávkovom gate.

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
- [ ] neuvádzať dodávateľa ani interné sourcing dáta,
- [ ] pri dynamických HA UI/Matter/Thread/update témach recheck aktuálnej dokumentácie,
- [ ] v support/maintenance obsahu odstrániť tokeny, interné adresy a citlivé log údaje.

## Súvisiace staging dokumenty

- `publish-readiness.md` — readiness a gate pre všetky aktuálne drafty
- `article-template.md` — WordPress/article/card/featured-image štandard
- `legacy-post-audit.md` — pôvodné problémy legacy článkov
- `product-content-opportunities.md` — produktovo-obsahové príležitosti
