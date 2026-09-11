<!-- markdownlint-disable MD013 -->

# Internal-link matrix — extension for Drafts 017–020

Tento súbor rozširuje hlavný obsahový graf o stock-backed sensor/display cluster.

## Draft 017 — ESPHome OLED SSD1306 dashboard

### Inbound

- produkt OLED SSD1306
- produkt ESP32 DevKit V1
- Draft 003 — prvý ESPHome projekt
- Draft 011 — BME280 + ESPHome
- Draft 019 — DHT22 + ESPHome
- ESP & ESPHome hub

### Outbound

- OLED SSD1306 produkt
- ESP32 DevKit V1
- Draft 003
- Draft 013 — napájanie ESP32
- Draft 019 — DHT22 + ESPHome
- Draft 011 — BME280 + ESPHome

### Obchodný ďalší krok

ESP32 → OLED → jeden reálny senzor → krabička → lokálny diagnostický/senzorový dashboard.

### Gate

Pred publikovaním overiť radič, I²C variant, adresu a napájanie reálneho KomArena OLED kusu.

## Draft 018 — HC-SR04 + ESP32 + ESPHome

### Inbound

- HC-SR04 produkt
- legacy rewrite 1971 Arduino UNO
- ESP32 DevKit V1
- Senzory hub
- ESP & ESPHome hub

### Outbound

- HC-SR04 produkt
- ESP32 DevKit V1
- Draft 003
- Draft 013
- legacy Arduino článok ako platformové porovnanie

### Obchodný ďalší krok

HC-SR04 + ESP32 → bezpečný level shift/delič → ESPHome → Home Assistant → konkrétna robotická alebo vzdialenostná aplikácia.

### Povinný safety gate

ECHO z bežného 5 V HC-SR04 sa nesmie viesť priamo do 3,3 V ESP32 GPIO bez vhodného prispôsobenia logickej úrovne.

## Draft 019 — DHT22 + ESPHome

### Inbound

- DHT22/AM2302 produkt
- ESP32 DevKit V1
- Draft 003
- Draft 017 — OLED
- Senzory hub

### Outbound

- DHT22 produkt
- ESP32 DevKit V1
- Draft 003
- Draft 016 — krabička pre ESP32
- Draft 017 — OLED dashboard
- Draft 020 — DHT22 vs BME280

### Obchodný ďalší krok

ESP32 + DHT22 → správne umiestnenie → Home Assistant → OLED/krabička podľa projektu.

### Gate

Pred finálnym zapojením overiť, či konkrétny KomArena modul už obsahuje DATA pull-up a aký má fyzický pinout.

## Draft 020 — DHT22 vs BME280

### Inbound

- Draft 019 — DHT22 projekt
- Draft 011 — BME280 projekt
- Draft 015 — BME280 vs BMP280
- DHT22/BME280 produktové stránky
- Senzory hub

### Outbound

- DHT22 produkt — aktuálne stock-backed
- BME280 produkt — technická referencia počas vypredania
- Draft 019
- Draft 011
- Draft 015
- Draft 017 — OLED dashboard

### Rozhodovací cieľ

Používateľ má pochopiť, že DHT22 a BME280 oba merajú teplotu/vlhkosť, ale BME280 pridáva tlak a používa I²C/SPI. Aktuálna dostupnosť nie je dôvod označiť DHT22 za technicky univerzálne lepší senzor.

### FAIL CLOSED

BME280 nákupný CTA zostáva vypnutý, kým produkt nemá reálny sklad/backorder povolený podľa obchodného pravidla.

## Stock-backed balíčky vzniknuté týmto clusterom

### Jednoduchý izbový senzor

- ESP32 DevKit V1
- DHT22/AM2302
- Draft 019

### Senzor s lokálnym displejom

- ESP32 DevKit V1
- DHT22/AM2302
- OLED SSD1306
- Draft 017 + 019

### Ultrazvukový ESPHome projekt

- ESP32 DevKit V1
- HC-SR04
- overené prispôsobenie ECHO
- Draft 018

## Nové inbound úlohy po publikovaní

- produkt OLED SSD1306 má odkazovať na Draft 017,
- produkt HC-SR04 má odkazovať na Draft 018 a opravený legacy 1971,
- DHT22 produkt má odkazovať na Draft 019 a Draft 020,
- ESP32 DevKit V1 má odkazovať na Build Lab rozcestník so 003/013/014/017/018/019.

## Pred publish

- overiť produktové URL a sklad,
- skontrolovať presný hardware revision/pinout,
- zvoliť vlastné bezpečné schémy namiesto generických obrázkov,
- otestovať YAML na reálnom zariadení,
- vložiť inbound odkazy až po existencii finálnych permalinkov.
