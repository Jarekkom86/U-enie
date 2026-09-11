<!-- markdownlint-disable MD013 -->

# KomArena — produkt → obsah: opportunity map

- **Status:** working map
- **Overené:** 11. 9. 2026
- **Účel:** prepájať reálny katalóg KomArena so SEO obsahom bez vymýšľania skladovosti, kompatibility alebo obchodných CTA.

## Pravidlá

1. Produkt môže dostať aktívny predajný CTA iba ak je publikovaný, relevantný a v čase publikovania článku prejde skladovým/maržovým gate.
2. Vypredaný alebo skrytý produkt môže zostať technickou referenciou, nie však „kúpte teraz“ CTA.
3. Ceny sa do evergreen článkov hardcodujú iba pri zámerne časovo označenom cenovom obsahu.
4. Pri generických moduloch sa nepredpokladá univerzálny pinout, napájanie ani limity.
5. Každý produkt má smerovať minimálne na jeden užitočný návod alebo porovnanie a každý silný článok má mať prirodzený ďalší krok v katalógu.

## P0 — produkty s okamžitou obsahovou hodnotou

| Produkt | Stav 11. 9. 2026 | Existujúci / plánovaný obsah | Ďalší najlepší článok | CTA gate |
| --- | --- | --- | --- | --- |
| ESP32 DevKit V1, ID 2159 | 19 ks, skladom | Draft 003 prvý ESPHome projekt; 005 stabilné napájanie; 007 Bluetooth Proxy; 010 PIR | 013 výber napájania; OLED dashboard; HC-SR04 + ESPHome | OPEN po poslednej kontrole skladu |
| HW-319 LM2596, ID 2997 | 2 ks, skladom | Draft 005 stabilné napájanie | 013 Ako vybrať napájanie pre ESP32 | OPEN, ale bez tvrdenia „3 A trvalo“ |
| OLED SSD1306, ID 2911 | 10 ks, skladom | nepriamo Draft 003 | ESPHome OLED dashboard: teplota, Wi-Fi, stav uzla | OPEN po overení konkrétnej revízie |
| HC-SR04, ID 2910 | 10 ks, skladom | legacy 1971 Arduino; produktová stránka už má ESPHome príklad | moderný HC-SR04 + ESP32 + ESPHome | OPEN; povinné upozornenie ECHO 5 V → 3,3 V |
| DHT22 / AM2302, ID 2209 | 10 ks, skladom | zatiaľ bez samostatného draftu | DHT22 + ESPHome; DHT22 vs BME280 | OPEN po overení modulu/pinoutu |
| ESP32 Expansion Board 30P, ID 2170 | 29 ks, skladom | nepriamo ESP32 cluster | Prehľadné prototypovanie ESP32: breadboard vs terminal adapter | OPEN iba pre kompatibilné 30-pin dosky |

## ESP32 DevKit V1 — hlavný Build Lab vstup

**Produkt:** https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/

### Obsahové cesty

- ESP32 → prvý ESPHome projekt → Home Assistant.
- ESP32 → stabilné napájanie → HW-319 / vhodný zdroj.
- ESP32 → Bluetooth Proxy → Bluetooth zariadenia v Home Assistante.
- ESP32 → HC-SR501 → pohybová automatizácia, keď sa PIR vráti do skladu.
- ESP32 → BME280/BMP280 → environmentálny uzol, keď sa senzory vrátia do skladu.
- ESP32 → OLED SSD1306 → lokálny mini-dashboard.
- ESP32 → HC-SR04 → vzdialenosť / stav nádoby / robotika s bezpečným prispôsobením ECHO.
- ESP32 → Expansion Board 30P → servisné a prototypovacie zapojenie.

### P0 inbound odkazy na produkt

Po publikovaní majú na ESP32 DevKit V1 smerovať minimálne Draft 003, 005, 007 a budúce 013/moderný HC-SR04 návod.

## HW-319 LM2596 — obsah pre napájanie

**Produkt:** https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/

### Silné témy

- Ako znížiť 12 V DC na vhodnú vetvu pre nízkonapäťový projekt.
- Prečo „LM2596 = 3 A“ neznamená, že každý generický modul bezpečne zvládne 3 A trvalo.
- Ako nastaviť step-down menič bez záťaže a overiť výstup multimetrom.
- Brownout na ESP32: zdroj, kábel, pokles napätia a odber periférií.

### FAIL CLOSED

- neuvádzať neoverený vstupný/výstupný rozsah konkrétneho HW-319 kusu,
- neuvádzať garantovaný trvalý prúd celého modulu podľa maxima samotného LM2596 čipu.

## OLED SSD1306 — jednoduchý cross-sell k ESP32

**Produkt:** https://komarena.sk/produkt/oled-096-i2c-ssd1306-displej-128x64-pre-esphome-dashboard/

### Navrhovaný cluster

1. ESPHome OLED dashboard krok za krokom.
2. ESP32 + BME280 + OLED: lokálna meteostanica.
3. Diagnostický displej pre ESPHome: IP, Wi-Fi, uptime, senzorové hodnoty.
4. Ako overiť I²C adresu a prečo sa generické moduly môžu líšiť.

## HC-SR04 — modernizovať starý článok a využiť sklad

**Produkt:** https://komarena.sk/produkt/hc-sr04-ultrazvukovy-senzor-esphome/

### Obsahové cesty

- legacy Arduino UNO článok → produkt,
- nový ESP32 + ESPHome článok → produkt + ESP32 DevKit V1,
- robotika / parkovací indikátor,
- orientačné suché meranie nádoby s jasným upozornením, že bežný HC-SR04 nie je vodotesný.

### Povinné technické pravidlo

Pri ESP32/ESP8266 musí článok výslovne riešiť, že ECHO z bežného 5 V HC-SR04 môže byť približne 5 V a nesmie ísť priamo do 3,3 V GPIO bez vhodného prispôsobenia úrovne.

## DHT22 / AM2302 — skladom, vhodný pre začiatočníkov

**Produkt:** https://komarena.sk/produkt/dht22-am2302-senzor-teploty-a-vlhkosti/

### Navrhované články

- DHT22 + ESPHome + Home Assistant krok za krokom.
- DHT22 vs BME280: kedy stačí teplota/vlhkosť a kedy má zmysel tlak.
- Ako umiestniť izbový senzor, aby nemeral teplo z ESP32 alebo zdroja.

### Cross-sell

ESP32 DevKit V1 + DHT22 + OLED SSD1306 tvorí jednoduchý skladom dostupný začiatočnícky projekt.

## ESP32 Expansion Board 30P — prototypovanie a servis

**Produkt:** https://komarena.sk/produkt/esp32-esp32s-expansion-board-30p-terminal-adapter/

### Navrhované články

- Breadboard vs skrutkové svorky pri ESP32 prototypovaní.
- Ako si pred vložením dosky overiť 30-pin rozstup a pinout.
- Servisný ESPHome uzol: kedy sú terminály lepšie než Dupont vodiče.

### FAIL CLOSED

Neoznačovať adaptér za univerzálne kompatibilný so všetkými ESP32 doskami.

## P1 — obsahovo silné, ale obchodný CTA momentálne uzavretý

### BME280, ID 2211

- URL: https://komarena.sk/produkt/bme280-senzor-teploty-vlhkosti-a-tlaku-vzduchu/
- stav: publikovaný, **vypredaný**, backorder vypnutý.
- obsah: Draft 011; Draft 015 BME280 vs BMP280.
- CTA: technický odkaz áno, nákupný CTA až po obnovení skladu.

### BMP280, ID 2212

- URL: https://komarena.sk/produkt/bmp280-senzor-teploty-a-tlaku-vzduchu/
- stav: publikovaný, **vypredaný**, backorder vypnutý.
- obsah: Draft 015 BME280 vs BMP280.
- hlavná edukačná pointa: BMP280 nemeria relatívnu vlhkosť.

### HC-SR501 PIR, ID 2213

- URL: https://komarena.sk/produkt/hc-sr501-pir-senzor/
- stav: publikovaný, **vypredaný a skrytý z katalógu**.
- obsah: legacy rewrite 2426 + Draft 010.
- CTA: iba informačný odkaz, kým sa produkt nevráti do skladu a viditeľného katalógu.

### ESP32-S3 N16R8, ID 2204

- URL: https://komarena.sk/produkt/esp32-s3-n16r8-wifi-bluetooth-5-0-vyvojova-doska/
- stav: na backorder.
- obsahové príležitosti: ESP32 vs ESP32-S3; BLE projekt; displeje a PSRAM.
- technická pointa: ESP32-S3 podporuje Bluetooth 5 LE, nie klasické BR/EDR.

## Smart Home / Zigbee

### SONOFF NSPanel Pro White, ID 4282

**URL:** https://komarena.sk/produkt/sonoff-nspanel-pro-white-nspanel86pw-home-assistant/

### Navrhované články

- NSPanel Pro ako nástenný Home Assistant dashboard: možnosti a obmedzenia.
- NSPanel Pro vs samostatný Zigbee koordinátor: nie je to ten istý typ architektúry.
- Matter Bridge, MQTT a Home Assistant: čo patrí do ktorej integračnej vrstvy.

### Gate

Produkt je dodávateľský/backorder. Pred publikovaním vždy znovu skontrolovať dostupnosť a aktuálny firmware/integrácie SONOFF.

## Obsahové balíčky, ktoré vieme postaviť z reálneho skladu

### Starter: prvý ESPHome uzol

- ESP32 DevKit V1
- dátový USB kábel podľa dostupného katalógu
- Draft 003
- následne DHT22 alebo OLED

### Sensor station

- ESP32 DevKit V1
- DHT22 / AM2302
- OLED SSD1306
- budúci článok DHT22 + OLED + Home Assistant

### Distance / robotika

- ESP32 DevKit V1
- HC-SR04
- vhodný level shifting / delič podľa overeného návrhu
- nový ESPHome HC-SR04 návod

### Stable power lab

- ESP32 DevKit V1
- HW-319, ak vstupný zdroj a odber projektu zodpovedajú použitiu
- Draft 005 + Draft 013

## Ďalšie P0 články odvodené z katalógu

1. ESPHome OLED SSD1306 dashboard s ESP32.
2. HC-SR04 + ESP32 + ESPHome: bezpečné ECHO a Home Assistant.
3. DHT22 + ESPHome: prvý izbový senzor.
4. DHT22 vs BME280: rozdiely bez marketingového balastu.
5. ESP32 DevKit V1 vs ESP32-S3: čo reálne získa používateľ.
6. Breadboard vs ESP32 30P terminal adapter.
7. NSPanel Pro ako Home Assistant panel: čo funguje a čo nie je náhrada koordinátora.

## Publish-time kontrola

Pred každým produktovým článkom overiť:

- `status=publish`,
- `catalog_visibility`,
- `stock_status`, `stock_quantity`, `backorders`,
- aktuálnu cenu iba ak ju článok potrebuje,
- presnú URL,
- kompatibilitu s opisovaným projektom,
- zdroje výrobcu / oficiálnu dokumentáciu,
- maržový gate pri produktoch, kde je obchodná dostupnosť závislá od dodávateľa.
