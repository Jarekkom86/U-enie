<!-- markdownlint-disable MD013 -->

# Legacy rewrite — post 2426 — HC-SR501 PIR senzor

- **Status:** needs-review / do-not-publish
- **Existujúci post ID:** 2426
- **Existujúca URL:** https://komarena.sk/pir-senzor-napr-hc-sr501/
- **Dôvod rewrite:** opraviť režimy H/L, aktualizovať interné odkazy, doplniť ESPHome kontext a SEO
- **Primárna kategória:** Návody a projekty
- **Sekundárna kategória:** Home Assistant & ESPHome
- **Focus keyword:** HC-SR501 ESPHome

## Navrhovaný titulok

HC-SR501 PIR senzor s ESP32 a ESPHome: pohyb v Home Assistante

## SEO title

HC-SR501 + ESP32 + ESPHome: PIR senzor v Home Assistante

## Meta description

Ako funguje HC-SR501, čo znamenajú režimy H a L, ako ho pripojiť k ESP32 a použiť ako pohybový senzor v ESPHome a Home Assistante.

## Čo opravujeme oproti publikovanej verzii

1. **H/L režimy:** pôvodný text ich vysvetľuje zavádzajúco. Bežný HC-SR501 používa H ako retriggerable/repeat režim a L ako single/non-repeatable režim.
2. Starý ESP32 produktový odkaz smeruje na neaktuálny slug; používať aktuálnu URL.
3. Neprezentovať približný dosah/uhol ako garantovaný výsledok v každej miestnosti.
4. Doplniť, že PIR deteguje zmenu infračerveného žiarenia, nie „prítomnosť osoby“ ako takú.
5. Aktuálny produkt HC-SR501 je vypredaný a skrytý; článok nesmie mať aktívny nákupný CTA.

## H1

HC-SR501 PIR senzor s ESP32 a ESPHome: jednoduchá detekcia pohybu pre Home Assistant

## Úvod

HC-SR501 je klasický PIR modul na detekciu pohybu. Nepoužíva kameru a neposkytuje obraz; sleduje zmeny infračerveného žiarenia v zornom poli. Preto je vhodný na jednoduché automatizácie, napríklad rozsvietenie chodby, informáciu o pohybe alebo spustenie ďalšieho lokálneho scenára.

S ESP32 a ESPHome sa jeho digitálny výstup dá preniesť do Home Assistanta ako binary sensor s triedou `motion`.

## Ako PIR funguje

PIR je pasívny infračervený senzor. V praxi nereaguje na statickú „teplotu miestnosti“, ale na zmenu infračerveného obrazu pred senzorom. Výsledok preto ovplyvňuje umiestnenie, smer pohybu, tepelné zdroje, priame slnko aj prúdenie teplého vzduchu.

HC-SR501 nie je certifikovaný zabezpečovací prvok a nemal by byť jedinou vrstvou kritického alarmu.

## Nastavenia na module

Bežné vyhotovenie HC-SR501 má dva trimre:

- **citlivosť / dosah** — mení prah a praktický dosah detekcie,
- **čas aktívneho výstupu** — určuje, ako dlho zostane výstup HIGH po spustení.

Rozsahy sa medzi výrobnými sériami môžu líšiť. Pri konkrétnom kuse sa riaďte jeho dokumentáciou a reálnym testom.

## Režimy H a L — správne vysvetlenie

### H — retriggerable / repeat

Ak počas aktívneho intervalu príde ďalší pohyb, čas aktívneho výstupu sa môže znovu predĺžiť. Tento režim je praktický napríklad pre osvetlenie: pokiaľ sa v priestore pohyb pokračuje, senzor neukončí výstup iba preto, že vypršal pôvodný interval.

### L — non-retrigger / single

Po spustení prebehne jeden aktívny interval podľa nastaveného času. Nový pohyb počas tohto intervalu ho štandardne nepredlžuje rovnakým spôsobom ako H režim.

Konkrétne značenie prepojky vždy overte na dodanom module; generické klony sa môžu fyzicky líšiť.

## Zapojenie s ESP32 — princíp

Typický HC-SR501 má piny:

- VCC,
- OUT,
- GND.

Pri bežnom module sa používa napájanie podľa technickej dokumentácie konkrétneho kusu; digitálny OUT má pri HIGH typicky približne 3,3 V. Pred zapojením však skontrolujte označenie pinov svojho modulu aj pinout konkrétnej ESP32 dosky.

Príklad logiky zapojenia:

```text
HC-SR501      ESP32
VCC        -> vhodné napájanie podľa modulu/dosky
GND        -> GND
OUT        -> vhodný GPIO vstup
```

Nepoužívajte náhodný GPIO iba preto, že ho ukazuje obrázok inej ESP32 dosky.

## ESPHome konfigurácia — model

```yaml
binary_sensor:
  - platform: gpio
    pin: GPIO14
    name: "Pohyb chodba"
    device_class: motion
```

`GPIO14` je iba modelový príklad. Pred použitím sa musí overiť voči presnej doske a jej boot/strap funkciám.

## Čo s tým vie Home Assistant

Po pridaní ESPHome zariadenia možno pohyb použiť napríklad na:

- rozsvietenie svetla po detekcii,
- vypnutie svetla po čase bez ďalšieho pohybu,
- notifikáciu v určenom režime domácnosti,
- kombináciu s lux senzorom, aby sa svetlo nespúšťalo cez deň,
- kombináciu s ďalšími senzormi namiesto predstierania, že PIR vie presne určovať prítomnosť osoby.

## Najčastejšie chyby

### Senzor sa spúšťa „sám"

Skontrolujte priame slnko, radiátor, teplý vzduch, pohyb závesov a nevhodné smerovanie senzora.

### Automatizácia vypína svetlo, hoci je človek v miestnosti

PIR nie je senzor statickej prítomnosti. Človek, ktorý sa dlhšie nehýbe, nemusí vytvoriť novú detekciu. Pre jemnú presence detekciu môže byť vhodná iná technológia.

### Modul sa správa opačne, než očakávam

Overte H/L jumper a časový trimr. Nepreberajte nastavenie z fotografie inej revízie.

## KomArena prepojenie

- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Senzory: https://komarena.sk/senzory/
- Draft 003 — prvý ESPHome projekt
- Draft 010 — ESP32 + PIR + ESPHome

Produkt HC-SR501: https://komarena.sk/produkt/hc-sr501-pir-senzor/

**FAIL CLOSED:** k 11. 9. 2026 je produkt vypredaný a skrytý z katalógu. Predajný CTA neaktivovať, kým nebude znovu objednateľný a viditeľný.

## Zdroje a overenie

Overiť bezprostredne pred publikovaním:

- ESPHome Generic PIR: https://devices.esphome.io/devices/generic-pir/
- technická referencia HC-SR501 použitá na produktovej stránke KomArena
- aktuálny pinout a napájanie konkrétneho skladového modulu

## Migračný checklist

- [ ] zachovať existujúcu URL, ak nie je silný SEO dôvod na zmenu,
- [ ] opraviť H/L režimy,
- [ ] vymeniť starý ESP32 odkaz za aktuálny produktový slug,
- [ ] doplniť interné odkazy na ESPHome cluster,
- [ ] nastaviť SEO title/meta/focus keyword,
- [ ] doplniť tagy: HC-SR501, PIR, ESPHome, ESP32, Home Assistant,
- [ ] overiť stock/visibility HC-SR501,
- [ ] pri vypredanom stave ponechať iba informačný CTA,
- [ ] po editácii vizuálne skontrolovať desktop aj mobil.
