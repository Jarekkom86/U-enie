<!-- markdownlint-disable MD013 -->

# Draft 019 — DHT22 / AM2302 + ESPHome + Home Assistant

- **Status:** draft
- **Typ:** začiatočnícky senzorový projekt
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Produkty, testy a porovnania
- **Focus keyword:** DHT22 ESPHome

## SEO title

DHT22 + ESPHome: teplota a vlhkosť v Home Assistante

## Meta description

Ako pripojiť DHT22/AM2302 k ESP32 a ESPHome, nastaviť teplotu a vlhkosť, pull-up na DATA linke a vyhnúť sa chybnému umiestneniu senzora.

## H1

DHT22 s ESP32 a ESPHome: prvý izbový senzor teploty a vlhkosti

## Úvod

DHT22, často predávaný aj ako AM2302 alebo modul s týmto senzorom, je jednoduchá cesta k dvom základným veličinám: teplote a relatívnej vlhkosti.

Na KomArena je DHT22/AM2302 aktuálne skladom, takže je vhodný ako praktický začiatočnícky projekt k ESP32 DevKit V1. Na rozdiel od BME280 však nemeria barometrický tlak.

## Čo budete potrebovať

- ESP32 DevKit V1 alebo inú kompatibilnú dosku,
- DHT22 / AM2302 modul,
- dátový USB kábel,
- vodiče,
- podľa konkrétneho modulu externý pull-up rezistor na DATA linke,
- ESPHome a Home Assistant.

## DHT22 vs hotový modul

Samostatný DHT22 senzor a breakout/modul nie sú vždy elektricky rovnaká vec. Niektoré moduly už obsahujú pull-up rezistor, iné nie.

ESPHome dokumentácia upozorňuje, že DHT22/DHT11 potrebujú pull-up na dátovej linke a uvádza približne 4,7 kΩ ako odporúčanú hodnotu výrobcu; pri hotovom module však treba najprv overiť, či rezistor už nie je osadený.

## Princíp zapojenia

```text
DHT22 / AM2302     ESP32
VCC             -> vhodné napájanie podľa modulu
GND             -> GND
DATA            -> vhodný GPIO
```

Medzi DATA a 3,3 V môže byť potrebný pull-up podľa konkrétneho senzora/modulu.

Presný pinout fyzického KomArena modulu treba overiť podľa označenia PCB; fotografie inej revízie nie sú dostatočný dôkaz.

## ESPHome model konfigurácie

```yaml
sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Obývačka teplota"
    humidity:
      name: "Obývačka vlhkosť"
    update_interval: 60s
```

GPIO4 je modelový príklad. Pred publikovaním finálneho projektu treba vybrať pin podľa konkrétnej ESP32 dosky.

ESPHome podporuje aj explicitný model `AM2302`, čo môže pomôcť, ak auto-detection nefunguje správne s konkrétnym kusom.

## Nečítajte DHT22 príliš často

DHT séria nie je navrhnutá ako vysokofrekvenčný senzor. Pre izbovú automatizáciu nemá zmysel čítať hodnotu desiatky krát za sekundu. Rozumný interval znižuje zbytočné chyby a šum.

ESPHome príklad používa interval 60 sekúnd, čo je pre bežný izbový monitoring dobrý východiskový bod.

## Umiestnenie rozhoduje viac než jedna desatinná čiarka

Ak dáte DHT22 tesne vedľa ESP32 regulátora alebo do nevetranej malej krabičky, môže merať teplo zariadenia namiesto miestnosti.

### Praktické pravidlá

- senzor umiestnite ďalej od regulátora a ESP32 čipu,
- nechajte okolo senzora prirodzené prúdenie vzduchu,
- nedávajte ho na priame slnko,
- neumiestňujte ho tesne nad radiátor alebo výduch,
- pri krabičke navrhnite ventilačné otvory.

Draft 016 rieši práve návrh krabičky pre ESP32 a senzorové vetranie.

## Home Assistant automatizácie

Po pridaní do Home Assistanta možno teplotu/vlhkosť použiť napríklad na:

- graf a históriu,
- upozornenie pri vysokej vlhkosti,
- spustenie ventilácie podľa podmienok,
- kombináciu s oknom, kúrením alebo odvlhčovačom,
- dlhodobejšie porovnávanie miestností.

Automatizácia klimatizácie alebo kúrenia musí zohľadniť hysteréziu a spoľahlivosť merania; jeden hobby senzor nemá byť jediný bezpečnostný prvok kritického systému.

## DHT22 alebo BME280?

DHT22:

- teplota,
- relatívna vlhkosť,
- jednoduché single-wire-style dátové rozhranie.

BME280:

- teplota,
- relatívna vlhkosť,
- barometrický tlak,
- I²C/SPI.

Draft 020 porovná tieto dve cesty bez predstierania, že jedna je univerzálne „lepšia“.

## KomArena prepojenie

- DHT22 / AM2302: https://komarena.sk/produkt/dht22-am2302-senzor-teploty-a-vlhkosti/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- OLED SSD1306: https://komarena.sk/produkt/oled-096-i2c-ssd1306-displej-128x64-pre-esphome-dashboard/
- Draft 003 — prvý ESPHome projekt
- Draft 016 — krabička pre ESP32
- Draft 017 — OLED dashboard
- Draft 020 — DHT22 vs BME280

K 11. 9. 2026 je DHT22/AM2302 aj ESP32 DevKit V1 na KomArena skladom. Pred publikovaním CTA stav znovu overiť.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome DHT Temperature+Humidity Sensor: https://esphome.io/components/sensor/dht/
- aktuálna KomArena produktová stránka DHT22 / AM2302

## Open points

- fyzicky overiť, či konkrétny KomArena modul už obsahuje pull-up rezistor,
- overiť presný pinout skladovej PCB,
- spraviť 24-hodinové porovnanie s referenčným senzorom,
- neskôr pripraviť projekt DHT22 + OLED + ESP32.

## Facebook post

Chcete prvý jednoduchý senzor do Home Assistanta?

ESP32 + DHT22 vie merať teplotu a vlhkosť cez ESPHome. Dôležitejšie než kopírovanie YAML je však overiť konkrétny modul, pull-up na DATA linke a umiestniť senzor mimo tepla samotnej ESP32.

Návod: [URL po publikovaní]

## Instagram caption

ESP32 + DHT22 = jednoduchý izbový ESPHome senzor. Ale ak ho zavriete k teplému regulátoru, budete merať vlastnú krabičku.

#komarena #dht22 #esp32 #esphome #homeassistant #smarthome

## Newsletter snippet

**Predmet:** Prvý izbový ESPHome senzor s DHT22

Praktický projekt ukazuje zapojenie, pull-up na dátovej linke, YAML aj správne umiestnenie senzora mimo tepla elektroniky.
