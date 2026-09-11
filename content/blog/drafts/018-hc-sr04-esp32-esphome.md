<!-- markdownlint-disable MD013 -->

# Draft 018 — HC-SR04 + ESP32 + ESPHome

- **Status:** draft
- **Typ:** praktický návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Produkty, testy a porovnania
- **Focus keyword:** HC-SR04 ESPHome ESP32

## SEO title

HC-SR04 + ESP32 + ESPHome: bezpečné meranie vzdialenosti

## Meta description

Ako použiť HC-SR04 s ESP32 a ESPHome, prečo treba riešiť 5 V ECHO signál, ako nastaviť timeout a čo ovplyvňuje ultrazvukové meranie.

## H1

HC-SR04 s ESP32 a ESPHome: vzdialenosť v Home Assistante bez 5 V chyby na GPIO

## Úvod

HC-SR04 je bežný ultrazvukový senzor vzdialenosti. S ESPHome sa dá jeho meranie publikovať do Home Assistanta bez písania vlastného C++ kódu.

Najdôležitejší rozdiel oproti starému Arduino UNO návodu je elektrický: klasické Arduino UNO pracuje s 5 V logikou, zatiaľ čo ESP32 používa 3,3 V GPIO. Pri bežnom HC-SR04 môže byť ECHO približne 5 V, takže ho nemožno slepo viesť priamo do vstupu ESP32.

## Čo budete potrebovať

- ESP32 DevKit alebo inú presne overenú ESP32 dosku,
- HC-SR04,
- vhodné prispôsobenie logickej úrovne ECHO pre 3,3 V GPIO,
- prepojovacie vodiče,
- stabilné napájanie,
- ESPHome + Home Assistant.

## Ako HC-SR04 meria

ESP32 vyšle cez TRIG krátky impulz. HC-SR04 vyšle ultrazvuk a na ECHO vytvorí impulz zodpovedajúci času letu k objektu a späť. ESPHome z tohto času vypočíta vzdialenosť.

ESPHome upozorňuje, že jednoduché ultrazvukové senzory typu HC-SR04 v praxi často nezmerajú spoľahlivo viac než približne dva metre, hoci datasheety konkrétnych modulov môžu uvádzať vyššie maximum. Článok preto nebude marketingové maximum prezentovať ako garantovaný pracovný dosah.

## Bezpečný princíp zapojenia

```text
HC-SR04        ESP32
VCC         -> napájanie podľa konkrétneho modulu
GND         -> GND
TRIG        -> vhodný ESP32 GPIO
ECHO        -> PRISPÔSOBENIE ÚROVNE -> vhodný ESP32 GPIO
```

### Prečo ECHO nejde priamo

ESP32 GPIO nie je 5 V tolerantný univerzálny vstup. Ak HC-SR04 vracia približne 5 V, použite správne navrhnutý delič alebo level shifter tak, aby vstup ESP32 dostal bezpečnú úroveň.

Konkrétny delič v produkčnom článku zverejniť až po reálnom overení s KomArena skladovým kusom a meraní multimetrom/osciloskopom.

## ESPHome model konfigurácie

```yaml
sensor:
  - platform: ultrasonic
    trigger_pin: GPIO5
    echo_pin: GPIO18
    name: "Vzdialenosť"
    update_interval: 1s
    timeout: 2m
```

GPIO5 a GPIO18 sú iba modelové príklady. Pred použitím treba vybrať bezpečné GPIO podľa konkrétnej dosky.

ESPHome podporuje `timeout`, pretože pri chýbajúcom alebo slabom odraze sa ECHO nemusí vrátiť. Príliš veľký timeout zbytočne predlžuje meranie a môže vyzerať ako platná vzdialenosť až po internom timeoute senzora.

## Ako nastaviť timeout

Nastavujte ho podľa reálnej aplikácie, nie podľa maximálneho čísla z e-shopu.

Príklad:

- ak senzor sleduje objekt do 80 cm, nepotrebujete timeout 4 m,
- kratší realistický limit môže zlepšiť správanie pri chýbajúcom odraze,
- hodnotu odlaďte na reálnom mechanickom usporiadaní.

## Čo ovplyvňuje meranie

### Uhol objektu

Ultrazvuk sa môže odraziť mimo prijímača.

### Materiál

Mäkký, štruktúrovaný alebo zvuk pohlcujúci materiál môže mať slabý odraz.

### Malý cieľ

Úzky predmet nemusí vracať dostatok energie.

### Teplota

Rýchlosť zvuku vo vzduchu sa s teplotou mení. Pre orientačný hobby projekt to často stačí, ale presné meranie musí teplotu zohľadniť.

### Viac ultrazvukových senzorov

Ak merajú naraz blízko seba, môžu sa navzájom rušiť. Merania je vhodné časovo oddeliť.

## Použitie v Home Assistante

Po publikovaní entity možno:

- sledovať vzdialenosť,
- vytvoriť prahové upozornenie,
- zobraziť trend,
- spustiť automatizáciu pri priblížení objektu.

Pre nádrž alebo kvapalinu treba navyše posúdiť vlhkosť, kondenzáciu, tvar hladiny a fakt, že bežný HC-SR04 nie je vodotesný.

## KomArena prepojenie

- HC-SR04: https://komarena.sk/produkt/hc-sr04-ultrazvukovy-senzor-esphome/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- legacy rewrite 1971 — Arduino UNO verzia
- Draft 003 — prvý ESPHome projekt
- Draft 013 — napájanie ESP32
- Senzory: https://komarena.sk/senzory/

K 11. 9. 2026 je HC-SR04 aj ESP32 DevKit V1 na KomArena skladom. Pred publikovaním znovu overiť.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome Ultrasonic Distance Sensor: https://esphome.io/components/sensor/ultrasonic/
- HC-SR04 datasheet reference linked by ESPHome/SparkFun
- aktuálna KomArena HC-SR04 produktová stránka s 5 V ECHO upozornením

## Open points

- fyzicky zmerať ECHO úroveň konkrétneho KomArena kusu,
- vybrať a otestovať konkrétny level-shifting/delič pre finálnu schému,
- vytvoriť vlastnú schému KomArena namiesto prevzatej generickej ilustrácie,
- otestovať timeout pri 0,5 m / 1 m / 2 m na reálnom kuse.

## Facebook post

HC-SR04 funguje s ESP32, ale staré Arduino zapojenie nekopírujte naslepo.

Kľúčový rozdiel je ECHO: pri bežnom HC-SR04 môže byť približne 5 V, zatiaľ čo ESP32 GPIO je 3,3 V. Nový návod vysvetľuje bezpečný princíp a ESPHome timeout.

Návod: [URL po publikovaní]

## Instagram caption

HC-SR04 + ESP32? Najprv vyriešte ECHO úroveň, až potom YAML.

#komarena #hcsr04 #esp32 #esphome #homeassistant #robotika

## Newsletter snippet

**Predmet:** HC-SR04 s ESP32: najprv ECHO, potom ESPHome

Pripravili sme moderný variant starého Arduino návodu s jasným 5 V/3,3 V rozdielom, timeoutom a reálnymi limitmi ultrazvukového merania.
