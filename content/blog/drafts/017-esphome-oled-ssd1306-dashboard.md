<!-- markdownlint-disable MD013 -->

# Draft 017 — ESPHome OLED SSD1306 dashboard s ESP32

- **Status:** draft
- **Typ:** praktický projekt
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Produkty, testy a porovnania
- **Focus keyword:** ESPHome OLED SSD1306

## SEO title

ESPHome OLED SSD1306: malý dashboard s ESP32 krok za krokom

## Meta description

Ako pripojiť 0,96" OLED SSD1306 k ESP32 cez I²C a zobraziť stav ESPHome zariadenia, senzorové hodnoty alebo diagnostické údaje.

## H1

ESP32 + OLED SSD1306 + ESPHome: malý lokálny dashboard pre váš senzor

## Úvod

Nie každý ESPHome projekt potrebuje displej. Ak však chcete pri zariadení vidieť teplotu, stav Wi-Fi, diagnostickú hodnotu alebo jednoduchý lokálny text bez otvárania Home Assistanta, 0,96" OLED SSD1306 je praktický doplnok.

KomArena má aktuálne publikovaný 128×64 I²C SSD1306 modul, ktorý sa prirodzene prepája s ESP32 a ďalšími I²C senzormi.

## Pred zapojením overte konkrétny modul

SSD1306 existuje v I²C aj SPI variantoch a podobne vyzerajú aj moduly s iným radičom, napríklad SH1106. ESPHome má pre tieto displeje podporu, ale konfigurácia sa musí zhodovať s reálnym hardvérom.

Pri KomArena produkte preto pred publikovaním finálneho návodu overiť:

- že skladový kus je naozaj 128×64 SSD1306 I²C,
- označenie pinov,
- napájanie breakout modulu,
- reálnu I²C adresu.

ESPHome pri `ssd1306_i2c` používa ako predvolenú adresu 0x3C, ale generický modul treba pri probléme radšej oskenovať než slepo predpokladať.

## Typické zapojenie

Pre konkrétny ESP32 DevKit sa SDA/SCL piny musia zvoliť podľa dosky a konfigurácie. Princíp je:

```text
OLED SSD1306     ESP32
VCC           -> vhodné napájanie podľa modulu
GND           -> GND
SDA           -> zvolený I²C SDA
SCL           -> zvolený I²C SCL
```

Neprenášajte pinout z fotografie inej ESP32 dosky bez kontroly.

## ESPHome modelová konfigurácia

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

font:
  - file: "gfonts://Roboto"
    id: font_small
    size: 14

display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font_small), "KomArena ESPHome");
```

GPIO21/22 sú modelový príklad pre bežnú klasickú ESP32 konfiguráciu, nie univerzálna povinnosť pre každý ESP32 variant.

## Čo sa oplatí zobrazovať

### Senzorové hodnoty

- teplota,
- vlhkosť,
- tlak,
- vzdialenosť,
- stav vstupu.

### Diagnostika

- stav pripojenia,
- IP adresa iba ak to dáva zmysel a nevadí z hľadiska súkromia,
- uptime,
- RSSI Wi-Fi,
- stav konkrétnej automatizácie.

### Lokálny feedback

Napríklad pri servisnom ESPHome uzle môže displej povedať „online“, „sensor error“ alebo zobraziť poslednú nameranú hodnotu.

## I²C zbernica umožní viac zariadení

Na jednej I²C zbernici môže byť OLED aj kompatibilný senzor, ak:

- nemajú konflikt adries,
- zodpovedajú elektrické úrovne,
- pull-up rezistory a dĺžka vedenia sú vhodné,
- napájanie je stabilné.

Budúci praktický projekt môže spojiť ESP32 + DHT22 (samostatná dátová linka) + OLED alebo ESP32 + BME280 + OLED na I²C.

## Časté chyby

### Displej nič nezobrazuje

Skontrolujte I²C scan, adresu, SDA/SCL, napájanie a správny radič/model.

### Text je otočený

ESPHome má parameter `rotation`; opravte konfiguráciu namiesto fyzického pretáčania PCB, ak mechanika zariadenia vyžaduje inú orientáciu.

### ESP32 začne byť nestabilná po pridaní displeja

Vráťte sa k Draftu 013 a skontrolujte napájanie. Nová periféria síce nemá obrovský odber, ale môže odhaliť už hraničný kábel alebo zdroj.

## KomArena prepojenie

- OLED 0,96" SSD1306 128×64: https://komarena.sk/produkt/oled-096-i2c-ssd1306-displej-128x64-pre-esphome-dashboard/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- Draft 003 — prvý ESPHome projekt
- Draft 013 — napájanie ESP32
- Draft 011 — BME280 + ESPHome
- ESP & ESPHome: https://komarena.sk/esp-esphome/

K 11. 9. 2026 bol OLED aj ESP32 DevKit V1 skladom. Pred publikovaním CTA znovu overiť.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome SSD1306 OLED Display: https://esphome.io/components/display/ssd1306/
- aktuálna KomArena produktová stránka OLED SSD1306

## Open points

- otestovať reálnu I²C adresu skladového modulu,
- spraviť vlastnú fotografiu ESP32 + OLED,
- pripraviť finálnu YAML ukážku s jedným reálnym KomArena senzorom,
- zvážiť vlastný 3D tlačený držiak/krabičku.

## Facebook post

ESPHome nemusí byť iba „neviditeľná krabička“ v Home Assistante.

Malý OLED SSD1306 vie priamo pri ESP32 ukázať teplotu, Wi-Fi stav alebo diagnostiku. Pripravili sme jednoduchý projekt cez I²C bez predstierania, že každý modul má rovnakú adresu a pinout.

Návod: [URL po publikovaní]

## Instagram caption

ESP32 + 0,96" OLED + ESPHome = malý lokálny dashboard presne tam, kde ho potrebujete.

#komarena #esp32 #esphome #ssd1306 #oled #homeassistant

## Newsletter snippet

**Predmet:** Pridajte ESPHome projektu malý OLED dashboard

Ukážeme, ako správne identifikovať SSD1306 I²C modul a zobraziť na ňom senzorové alebo diagnostické údaje.
