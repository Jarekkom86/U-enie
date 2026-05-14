<!-- markdownlint-disable MD013 -->

# KomArena.sk WooCommerce CSV batch 001 verified – report

## Summary

Vytvorená bola nová overená verzia prvého produktového CSV balíka podľa záväzného štýlu vzorového produktu KomArena. Nejde o generický importný test: balík obsahuje iba 5 produktov s profesionálnym HTML layoutom, zdrojmi, jasnými otvorenými bodmi, bezpečnostnými upozorneniami a `draft` stavom.

Všetky produkty majú `Stock = 0`, `Status = draft` a `Published = 0`, pretože reálna dodávka, obsah balenia, sklad, cena a niektoré parametre musia byť ešte ručne potvrdené pred publikovaním.

Finálny cleanup upravil iba vizuálnu a štruktúrnu podobu HTML poľa `Description` v CSV podľa kartového štýlu vzorového produktu TP4056. Overené technické údaje, zdroje, `draft` stav, `Published = 0`, `Stock = 0` a otvorené body ostali zachované.

## Produkty a kontrola parametrov

### 1. Espressif ESP32-DevKitC V4 vývojová doska pre ESPHome prototypy

- SKU: `KOM-ESP-1001`
- Interný EAN: `2998000100018`
- Kategória: Vývojové dosky
- Cena: 10.99
- Status: `draft`
- Published: `0`
- Použité zdroje:
  - [Espressif ESP32-DevKitC V4 Getting Started Guide](https://docs.espressif.com/projects/esp-idf/en/v4.2/esp32/hw-reference/esp32/get-started-devkitc.html)
  - ESPHome dokumentácia k relevantným komponentom podľa konkrétneho senzora alebo modulu – overiť pri finálnej konfigurácii.
- Overené parametre:
  - Model ESP32-DevKitC V4 existuje v dokumentácii Espressif.
  - Doska je ESP32-based a väčšina I/O pinov je vyvedená na pinové lišty.
  - Na začiatok je podľa Espressif potrebná doska, USB A / micro USB B kábel a počítač.
- Otvorené parametre:
  - Otvorený bod: Overiť, či skladová položka je originálny Espressif ESP32-DevKitC V4 alebo kompatibilná doska.
  - Otvorený bod: Overiť presný osadený ESP32 modul, pinout, obsah balenia, cenu a sklad.
- Odporúčané príslušenstvo:
  - USB kábel pre vývojové dosky
  - Dupont vodiče
  - Nepájivé kontaktné pole
  - DHT22 senzor
  - DS18B20 senzor
- Bezpečnostné poznámky:
  - Používajte iba bezpečné nízkonapäťové zapojenie.
  - Pred pripojením napájania skontrolujte polaritu a zapojenie vodičov.
  - Neprepájajte dosku priamo s 230 V; práca s 230 V patrí odborne spôsobilej osobe.
  - Sledujte prehrievanie dosky, napájacieho zdroja a pripojených modulov.

### 2. LOLIN D1 mini V4.0.0 ESP8266 vývojová doska pre Wi-Fi prototypy

- SKU: `KOM-ESP-1002`
- Interný EAN: `2998000100025`
- Kategória: Vývojové dosky
- Cena: 7.99
- Status: `draft`
- Published: `0`
- Použité zdroje:
  - [LOLIN D1 mini WEMOS dokumentácia](https://www.wemos.cc/en/latest/d1/d1_mini.html)
  - [ESPHome FAQ k ESP8266 zariadeniam](https://www.esphome.io/guides/faq/)
- Overené parametre:
  - LOLIN D1 mini V4.0.0 je podľa WEMOS založený na ESP-8266EX.
  - WEMOS uvádza 4 MB flash, 11 digitálnych I/O, 1 analógový vstup, Type-C USB a 3,3 V I/O.
- Otvorené parametre:
  - Otvorený bod: Overiť, či skladová položka je LOLIN D1 mini V4.0.0 alebo klon.
  - Otvorený bod: Overiť obsah balenia, USB konektor reálnej dodávky, cenu a sklad.
- Odporúčané príslušenstvo:
  - USB-C kábel podľa reálnej dodávky
  - DHT22 senzor
  - DS18B20 senzor
  - Dupont vodiče
  - Nepájivé kontaktné pole
- Bezpečnostné poznámky:
  - Dodržte 3,3 V logické úrovne na GPIO pinoch.
  - Skontrolujte polaritu a napájanie pred pripojením senzorov.
  - Pri dlhšej prevádzke sledujte prehrievanie dosky a napájacieho zdroja.
  - Nepoužívajte dosku na priame spínanie 230 V.

### 3. DHT22 AM2302 teplotný a vlhkostný senzor pre ESPHome meranie

- SKU: `KOM-SEN-1003`
- Interný EAN: `2998000100032`
- Kategória: Senzory
- Cena: 6.99
- Status: `draft`
- Published: `0`
- Použité zdroje:
  - [AM2302/DHT22 datasheet hostovaný Digi-Key](https://www.digikey.com/en/htmldatasheets/production/1801448/0/0/1/am2302)
  - [ESPHome DHT Temperature+Humidity Sensor](https://esphome.io/components/sensor/dht/)
- Overené parametre:
  - AM2302/DHT22 je digitálny senzor relatívnej vlhkosti a teploty.
  - Datasheet uvádza DC napájanie 3,3 V až 6 V.
  - ESPHome dokumentuje DHT platformu a odporúča pull-up rezistor na dátovej linke.
- Otvorené parametre:
  - Otvorený bod: Overiť presný variant: holý senzor alebo modul s doskou.
  - Otvorený bod: Overiť, či modul už obsahuje pull-up rezistor.
  - Otvorený bod: Overiť obsah balenia, cenu a sklad.
- Odporúčané príslušenstvo:
  - ESP32-DevKitC V4
  - LOLIN D1 mini
  - Dupont vodiče
  - Nepájivé kontaktné pole
  - Sada rezistorov
- Bezpečnostné poznámky:
  - Používajte bezpečné nízke napätie a správnu polaritu.
  - Nepripájajte dátový pin na napätie mimo limitov ESP dosky.
  - Pri problémoch s meraním najprv skontrolujte pull-up rezistor, vodiče a model v konfigurácii.
  - Senzor nepoužívajte ako certifikované meradlo pre bezpečnostné alebo zdravotné rozhodnutia.

### 4. DS18B20 1-Wire teplotný senzor pre ESPHome meranie

- SKU: `KOM-SEN-1004`
- Interný EAN: `2998000100049`
- Kategória: Senzory
- Cena: 3.99
- Status: `draft`
- Published: `0`
- Použité zdroje:
  - [Analog Devices DS18B20 product page / datasheet](https://www.analog.com/en/products/ds18b20.html)
  - [ESPHome Dallas Temperature Sensor](https://esphome.io/components/sensor/dallas_temp/)
  - [ESPHome 1-Wire Bus](https://esphome.io/components/one_wire/)
- Overené parametre:
  - DS18B20 poskytuje 9 až 12-bitové meranie teploty v °C.
  - Komunikuje cez 1-Wire a každý čip má unikátny 64-bitový kód.
  - ESPHome má Dallas Temperature Sensor a 1-Wire komponent; 1-Wire bus odporúča pull-up približne 4,7 kΩ.
- Otvorené parametre:
  - Otvorený bod: Overiť konkrétne prevedenie senzora: TO-92, modul alebo káblová sonda.
  - Otvorený bod: Overiť obsah balenia, pull-up rezistor, cenu a sklad.
- Odporúčané príslušenstvo:
  - ESP32-DevKitC V4
  - LOLIN D1 mini
  - Sada rezistorov
  - Dupont vodiče
  - Nepájivé kontaktné pole
- Bezpečnostné poznámky:
  - Používajte iba bezpečné nízke napätie a správnu polaritu.
  - Nepoužívajte senzor mimo overeného teplotného a elektrického rozsahu.
  - Pri káblovej sonde overte krytie, izoláciu a vhodnosť prostredia podľa reálnej dodávky.
  - Meranie nepoužívajte ako certifikované bezpečnostné meranie bez overenia celého systému.

### 5. LM2596 step-down menič napätia pre nízkonapäťové ESP projekty

- SKU: `KOM-NAP-1005`
- Interný EAN: `2998000100056`
- Kategória: Elektronika
- Cena: 3.99
- Status: `draft`
- Published: `0`
- Použité zdroje:
  - [Texas Instruments LM2596 datasheet](https://www.ti.com/lit/ds/symlink/lm2596.pdf)
- Overené parametre:
  - LM2596 je step-down DC-DC regulátor podľa datasheetu Texas Instruments.
  - Datasheet uvádza vstupný rozsah do 40 V pre regulátor a schopnosť až 3 A DC záťažového prúdu pri správnych podmienkach.
- Otvorené parametre:
  - Otvorený bod: Overiť konkrétny modul, svorky, nastaviteľnosť, chladiace podmienky a reálne prúdové limity.
  - Otvorený bod: Overiť obsah balenia, cenu a sklad.
- Odporúčané príslušenstvo:
  - Multimeter
  - ESP32-DevKitC V4
  - LOLIN D1 mini
  - Dupont vodiče
  - Nepájivé kontaktné pole
- Bezpečnostné poznámky:
  - Pracujte iba v bezpečnom nízkonapäťovom zapojení.
  - Pred pripojením ESP dosky alebo senzora vždy zmerajte výstup multimetrom.
  - Dodržte polaritu vstupu aj výstupu, limity modulu a sledujte prehrievanie.
  - Pri skrate alebo nesprávnom nastavení môže dôjsť k poškodeniu elektroniky alebo prehrievaniu.
  - Tento text nie je návodom na prácu s 230 V; práca s 230 V patrí odborne spôsobilej osobe.

## Čo sa nemenilo

- Nebol menený produkčný web.
- Nebol menený PHP/CSS/JS/HTML/JSON runtime kód.
- Neboli menené platby, checkout, objednávky, databáza, doprava ani dane.
- Neboli vložené API kľúče, heslá, tokeny ani certifikáty.
- Neboli použité neoverené obrázky ani cudzie marketplace obrázky.

## Strategické riziká

- Ak sa skladové položky budú líšiť od overených modelov, texty musia ostať ako `draft` a treba ich upraviť podľa reálnej dodávky.
- Pri ESPHome a Home Assistant je rizikom prehnaná kompatibilita; texty preto používajú iba opatrný technický kontext a otvorené body.
- Pri LM2596 je rizikom nesprávne napájanie, polarita, skrat a prehrievanie; produkt vyžaduje dôraz na meranie multimetrom a nízkonapäťové použitie.

## Odporúčané ďalšie kroky

1. Ručne overiť produkty podľa reálnej dodávky a odlíšiť originálne dosky od klonov.
2. Pripraviť vlastné produktové fotografie bez log predajcov, vodoznakov a nejasnej licencie.
3. Až po overení pripraviť `publish` verzie produktov a doplniť reálny sklad.
4. Pripraviť blog/návod ku každému dôležitému produktu.
5. Pripraviť modelové projekty, odporúčané príslušenstvo a interné prelinkovanie Produkt → Blog/návod → Modelový projekt → Odporúčané produkty → Sociálne siete → Newsletter.
