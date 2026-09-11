<!-- markdownlint-disable MD013 -->

# Legacy rewrite — post 1964 — Arduino UNO vs ESP32

- **Status:** needs-review / do-not-publish
- **Existujúci post ID:** 1964
- **Existujúca URL:** https://komarena.sk/ako-si-vybrat-spravnu-vyvojovu-dosku-arduino-uno-vs-esp32/
- **Typ:** evergreen porovnanie pre začiatočníka
- **Kategórie:** Návody a projekty; Produkty, testy a porovnania
- **Focus keyword:** Arduino UNO vs ESP32

## Navrhovaný titulok

Arduino UNO vs ESP32: ktorú vývojovú dosku zvoliť pre váš projekt?

## SEO title

Arduino UNO vs ESP32: rozdiely a výber dosky pre projekt

## Meta description

Arduino UNO alebo ESP32? Porovnanie logiky, výkonu, Wi-Fi/Bluetooth, vstupov, ekosystému a typických projektov bez miešania rôznych ESP32 variantov.

## Prečo nejde o jednoduchý patch

Pôvodná verzia mieša konkrétny Arduino UNO Rev3 s neurčitou kategóriou „ESP32“ a uvádza niektoré parametre, akoby platili pre každú ESP32 dosku. V roku 2026 je katalóg ESP32 širší: klasická ESP32, ESP32-S3 a ďalšie varianty nemajú identickú bezdrôtovú výbavu, počet vyvedených pinov ani pamäť.

Rewrite preto porovnáva:

- **Arduino UNO Rev3** ako konkrétnu referenčnú dosku,
- **klasickú ESP32 platformu / KomArena ESP32 DevKit V1** ako druhý konkrétny smer,
- ESP32-S3 uvádza iba ako samostatnú alternatívu, nie ako synonymum klasickej ESP32.

## H1

Arduino UNO vs ESP32: jednoduché porovnanie podľa toho, čo chcete postaviť

## Rýchla odpoveď

Ak sa učíte úplné základy digitálnych vstupov/výstupov, chcete 5 V ekosystém a pracujete s množstvom klasických Arduino materiálov, UNO je stále zrozumiteľná voľba.

Ak však chcete Home Assistant, ESPHome, Wi-Fi, BLE, lokálne IoT alebo viac výkonu v jednej kompaktnej doske, klasická ESP32 je pre KomArena projekty zvyčajne praktickejší štart.

## Arduino UNO Rev3

Oficiálne UNO Rev3 používa ATmega328P, 5 V prevádzkovú logiku, 16 MHz takt, 14 digitálnych I/O pinov, 6 analógových vstupov, 32 KB Flash a 2 KB SRAM.

### Výhody

- jednoduchý model mikrokontroléra,
- veľa vzdelávacích materiálov,
- široká história shieldov a knižníc,
- 5 V logika môže byť praktická pri starších moduloch navrhnutých pre Arduino svet.

### Limity

- bez integrovaného Wi-Fi a Bluetooth,
- veľmi obmedzená RAM oproti ESP32,
- pri sieťových projektoch potrebuje ďalší hardvér.

## Klasická ESP32 / DevKit V1

Klasická ESP32 platforma kombinuje 32-bitový procesor, 2,4 GHz Wi-Fi a Bluetooth BR/EDR + BLE. KomArena DevKit V1 používa 3,3 V GPIO logiku a je vhodný pre ESPHome, Home Assistant, senzory, lokálne webové rozhrania a vlastné IoT uzly.

### Výhody

- Wi-Fi priamo v platforme,
- Bluetooth/BLE pri klasickej ESP32,
- výrazne viac výkonu a pamäte než ATmega328P,
- veľmi silné použitie v ESPHome a Home Assistante,
- viac periférií a možností pre moderné IoT projekty.

### Na čo si dať pozor

- GPIO je 3,3 V — 5 V signály nemožno automaticky pripájať priamo,
- presný pinout a počet použiteľných GPIO závisí od konkrétnej dosky,
- nie každý pin je vhodný na každý účel,
- „ESP32“ nie je jeden jediný hardvér.

## Arduino UNO Rev3 vs KomArena ESP32 DevKit V1

| Oblasť | Arduino UNO Rev3 | Klasická ESP32 / DevKit V1 |
| --- | --- | --- |
| Mikrokontrolér | ATmega328P, 8-bit AVR | ESP32, 32-bit platforma |
| Logika GPIO | 5 V | 3,3 V |
| Takt | 16 MHz | podľa klasickej ESP32 platformy až 240 MHz |
| Flash | 32 KB | závisí od modulu/dosky |
| SRAM | 2 KB | klasická ESP32 má výrazne viac internej SRAM; presná dostupná pamäť závisí aj od systému |
| Wi-Fi | nie | 2,4 GHz 802.11 b/g/n |
| Bluetooth | nie | BR/EDR + BLE na klasickej ESP32 |
| Typický KomArena use case | výučba, klasické Arduino projekty | ESPHome, Home Assistant, IoT, BLE/Wi-Fi senzory |

Tabuľka zámerne neuvádza univerzálny počet ESP32 GPIO ani univerzálnu veľkosť Flash pre všetky dosky.

## A čo ESP32-S3?

ESP32-S3 je samostatná modernejšia vetva. KomArena má položku ESP32-S3 N16R8 s Wi-Fi a Bluetooth 5 LE. Na rozdiel od klasickej ESP32 však ESP32-S3 nepodporuje klasické Bluetooth BR/EDR.

Preto článok nesmie tvrdiť, že každý „ESP32“ má rovnakú Bluetooth výbavu.

## Výber podľa projektu

### Chcem prvý ESPHome senzor

Zvoľte kompatibilnú ESP32 dosku. Draft 003 vedie používateľa od prvého flashu po Home Assistant.

### Chcem sa učiť úplné základy bez siete

Arduino UNO môže byť veľmi prehľadná didaktická platforma, najmä ak už máte materiály a moduly pre 5 V Arduino ekosystém.

### Chcem Bluetooth Proxy

Vyberajte ESP32 variant s podporovaným BLE a overte kompatibilitu s aktuálnym ESPHome. Klasická ESP32 DevKit V1 je obsahovo vhodný kandidát; presnú revíziu treba skontrolovať pred publikovaním návodu.

### Chcem viac pamäte, displej alebo náročnejší projekt

Pozrite sa aj na ESP32-S3, ale vyberajte podľa reálnych požiadaviek projektu, nie iba podľa názvu alebo maxima v tabuľke.

## Napájanie a logické úrovne sú dôležitejšie než benchmark

Najčastejšia praktická chyba nie je „málo MHz“, ale zlé elektrické zapojenie. UNO a ESP32 pracujú s inými GPIO úrovňami. Pri moduloch ako HC-SR04 treba pri prechode na ESP32 riešiť 5 V ECHO. Pri I²C moduloch treba overiť breakout dosku, pull-up rezistory a napájanie konkrétneho kusu.

## KomArena prepojenie

- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- ESP32-S3 N16R8: https://komarena.sk/produkt/esp32-s3-n16r8-wifi-bluetooth-5-0-vyvojova-doska/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- Draft 007 — ESPHome Bluetooth Proxy

K 11. 9. 2026 je ESP32 DevKit V1 reálne skladom; ESP32-S3 je na backorder. Stav znovu overiť tesne pred publikovaním.

## Zdroje a overenie

- Arduino UNO Rev3 official: https://store.arduino.cc/products/arduino-uno-rev3
- Espressif ESP32 documentation: https://www.espressif.com/en/products/socs/esp32
- Espressif ESP32-S3: https://www.espressif.com/en/products/socs/esp32-s3
- ESPHome: https://esphome.io/

## Migračný checklist

- [ ] zachovať existujúcu URL,
- [ ] opraviť jazykové chyby,
- [ ] odstrániť staré orientačné ceny z porovnávacej tabuľky,
- [ ] nahradiť univerzálne ESP32 čísla presnejším platformovým vysvetlením,
- [ ] doplniť 5 V vs 3,3 V logiku,
- [ ] doplniť ESP32-S3 ako samostatný variant,
- [ ] doplniť aktuálne produktové URL,
- [ ] nastaviť SEO title/meta/focus keyword,
- [ ] pridať tagy Arduino UNO, ESP32, vývojové dosky, ESPHome,
- [ ] vizuálne otestovať tabuľku na mobile.
