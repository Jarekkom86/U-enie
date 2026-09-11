<!-- markdownlint-disable MD013 -->

# Draft 011 — BME280 + ESPHome + Home Assistant

- **Status:** draft
- **Typ:** praktický senzorový návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Senzory, Návody a projekty
- **Cieľová skupina:** používateľ, ktorý chce merať teplotu, vlhkosť a tlak cez ESPHome
- **Search intent:** informačný / projektový
- **Focus keyword:** BME280 ESPHome

## SEO title

BME280 + ESPHome: teplota, vlhkosť a tlak v Home Assistante

## Meta description

Ako použiť BME280 s ESPHome: rozdiel oproti BMP280, I²C princíp, konfigurácia, umiestnenie senzora, presnosť merania a Home Assistant entity.

## H1

BME280 + ESPHome: tri údaje z jedného senzora do Home Assistanta

## Úvod

BME280 je praktický senzor pre prvý „reálny“ ESPHome uzol, pretože z jedného čipu získate teplotu, relatívnu vlhkosť a barometrický tlak.

V Home Assistante potom môžete tieto hodnoty ukladať, zobrazovať v grafoch a používať v automatizáciách.

Najväčšie chyby pri BME280 však nevznikajú v YAML. Častejšie ide o zámenu BME280 za BMP280, nesprávne napájanie breakout modulu, inú I²C adresu alebo zlé fyzické umiestnenie senzora.

## BME280 nie je BMP280

Názvy sú podobné, ale funkcia nie je rovnaká.

- **BME280** meria teplotu, relatívnu vlhkosť a barometrický tlak.
- **BMP280** meria tlak a teplotu, ale nie relatívnu vlhkosť.

Ak chcete v Home Assistante aj humidity entitu, potrebujete BME280 alebo iný vlhkostný senzor.

## Aktuálny KomArena produkt

Publikovaná stránka:

https://komarena.sk/produkt/bme280-senzor-teploty-vlhkosti-a-tlaku-vzduchu/

Produkt má overený čip Bosch BME280 a štyri vlastné produktové obrázky, ale pri príprave draftu je `outofstock` bez backorderu.

Preto článok zostáva technicky pripravený, ale predajný CTA sa aktivuje až po obnovení dostupnosti.

## Čo budete potrebovať

- ESP32 alebo inú ESPHome-kompatibilnú dosku,
- BME280 breakout modul,
- prepojovacie vodiče,
- stabilné nízkonapäťové napájanie,
- ESPHome,
- Home Assistant.

## Napájanie: čip nie je to isté ako breakout modul

Bosch špecifikuje nízke napájacie napätie samotného BME280 čipu. Hotové breakout dosky však môžu obsahovať regulátor, level shifting alebo iné súčiastky.

Preto nepreberajte napájacie číslo z datasheetu čipu ako automatický vstupný rozsah každého modulu.

Pred zapojením overte presnú breakout dosku, označenie pinov a jej schému.

## I²C alebo SPI

BME280 podporuje digitálne rozhrania I²C aj SPI. Pre jednoduchý ESPHome projekt je I²C často praktická voľba, pretože používa spoločnú zbernicu a minimum vodičov.

ESPHome dokumentácia pre BME280 vyžaduje nakonfigurované I²C alebo SPI podľa zvoleného spôsobu pripojenia.

## Krok 1: najprv rozbehnite ESP32

Použite postup z Draftu 003:

- firmware,
- Wi-Fi,
- Home Assistant integrácia,
- stabilný online stav.

Ak sa doska reštartuje alebo vypadáva, pokračujte Draftom 005 o napájaní.

## Krok 2: nakonfigurujte I²C

Presné SDA/SCL piny závisia od konkrétnej dosky.

Modelový princíp:

```yaml
i2c:
  sda: GPIOXX
  scl: GPIOYY
  scan: true
```

`GPIOXX` a `GPIOYY` sú placeholdery. Pred publikovaním sa musia nahradiť pinmi overenými pre konkrétnu KomArena dosku.

I²C scan pomáha zistiť, či zariadenie na zbernici odpovedá.

## Krok 3: pridajte BME280

Modelová konfigurácia podľa ESPHome:

```yaml
sensor:
  - platform: bme280_i2c
    temperature:
      name: "Teplota"
    pressure:
      name: "Tlak"
    humidity:
      name: "Vlhkost"
```

Presná adresa a ďalšie parametre sa doplnia podľa reálneho modulu. BME280 breakouty môžu používať rôznu I²C adresu podľa zapojenia adresového pinu.

## Krok 4: skontrolujte, či ide naozaj o BME280

Ak sa v konfigurácii objavuje teplota a tlak, ale chýba vlhkosť, fyzický modul môže byť BMP280 alebo nesprávne identifikovaný produkt.

To je bežný dôvod, prečo lacný „BME280“ z neznámeho zdroja nesplní očakávania.

Pri KomArena produkte musí byť identita senzora podložená presným zdrojom a fotografiou, nie iba názvom listing-u.

## Krok 5: umiestnenie senzora

Ak BME280 meria prostredie, nedávajte ho:

- priamo nad regulátor ESP32,
- tesne k procesoru alebo inému zdroju tepla,
- do uzavretej krabičky bez prúdenia vzduchu,
- na priame slnko,
- do kontaktu s kondenzáciou alebo vodou bez vhodnej ochrany.

Teplota elektroniky môže ovplyvniť lokálne meranie. Pri presnejšom izbovom meraní je fyzické oddelenie senzora od teplej dosky často dôležitejšie než ďalšia desatinná čiarka v Home Assistante.

## Čo s údajmi v Home Assistante

Tri základné entity môžu slúžiť na:

- izbový dashboard,
- sledovanie trendu vlhkosti,
- automatizáciu vetrania podľa podmienok,
- tlakový trend,
- porovnanie miestností,
- upozornenie pri príliš vysokej alebo nízkej vlhkosti.

Automatizácie majú pracovať s rozumnými rozsahmi a časovým filtrovaním, nie reagovať na každý malý okamžitý výkyv.

## Časté chyby

### BME280 vs. BMP280

BMP280 nemeria vlhkosť.

### Zlé SDA/SCL piny

Piny treba vybrať podľa konkrétnej dosky.

### Nesprávna I²C adresa

Ak senzor neodpovedá, I²C scan je prvý diagnostický nástroj.

### Teplo z ESP32

Senzor namontovaný tesne pri vývojovej doske môže merať lokálne teplejšie prostredie než miestnosť.

### Predpoklad napájania podľa samotného čipu

Breakout doska môže mať inú napájaciu architektúru než holý BME280.

## Modelový projekt

**Izbový senzor prostredia: ESP32 + BME280 + Home Assistant**

Cieľ:

- merať tri veličiny,
- publikovať ich cez ESPHome,
- uložiť trend v Home Assistante,
- neskôr použiť vlhkosť alebo teplotu v automatizácii.

Prvý prototyp nechajte na stole s krátkymi vodičmi. Krabičku a finálnu montáž riešte až po overení stability a umiestnenia.

## Bezpečnostné upozornenie

Ide o nízkonapäťový senzorový projekt. Chráňte elektroniku pred vodou, kondenzáciou a skratom. Ak meranie riadi zariadenia na 230 V, výkonovú časť riešte cez certifikované zariadenie alebo odborne spôsobilú osobu.

## Interné odkazy — návrh

- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Senzory: https://komarena.sk/senzory/
- Home Assistant: https://komarena.sk/home-assistant/
- produkt BME280: https://komarena.sk/produkt/bme280-senzor-teploty-vlhkosti-a-tlaku-vzduchu/

## CTA

BME280 je dobrý ďalší krok po prvom ESPHome zariadení: jedna I²C zbernica, tri merané veličiny a okamžite použiteľné entity v Home Assistante. Pred nákupom však overte dostupnosť a konkrétny breakout modul.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome — BME280: https://esphome.io/components/sensor/bme280/
- Bosch Sensortec — BME280: https://www.bosch-sensortec.com/en/products/environmental-sensors/humidity-sensors-bme280/
- aktuálna KomArena produktová stránka BME280

## Open points

- Otvorený bod: BME280 je aktuálne vypredaný; predajný CTA aktivovať až po skladovom gate.
- Otvorený bod: pred publikovaním vybrať konkrétnu ESP32 dosku a overiť SDA/SCL piny.
- Otvorený bod: na fyzickom kuse overiť I²C adresu a breakout napájanie.
- Otvorený bod: doplniť vlastný screenshot troch entít v Home Assistante.

## Facebook post

Jeden senzor, tri údaje: teplota, vlhkosť a tlak.

BME280 je veľmi praktický ďalší krok po prvom ESPHome projekte, ale treba si dať pozor na zámenu s BMP280, napájanie breakout dosky a umiestnenie pri teplej ESP32.

Celý návod: [URL po publikovaní]

## Instagram caption

BME280 + ESPHome = teplota, vlhkosť a tlak v Home Assistante z jedného senzora.

#komarena #bme280 #esphome #esp32 #homeassistant #senzory #iot

## Reels / Shorts idea

**Hook:** „BME280 alebo BMP280? Jedno písmeno rozhoduje o vlhkosti.“

Ukázať:

1. BME280 modul,
2. tri entity,
3. I²C scan,
4. ESPHome dashboard,
5. Home Assistant graf.

## Newsletter snippet

**Predmet:** Tri údaje z jedného ESPHome senzora

BME280 meria teplotu, vlhkosť aj tlak. Návod ukáže I²C workflow, diagnostiku, umiestnenie senzora a chyby, ktoré vznikajú pri zámene s BMP280.
