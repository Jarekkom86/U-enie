<!-- markdownlint-disable MD013 -->

# Draft 010 — ESP32 + HC-SR501 + ESPHome

- **Status:** draft
- **Typ:** praktický nízkonapäťový projekt
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty, Senzory
- **Cieľová skupina:** používateľ, ktorý chce prvý jednoduchý pohybový senzor do Home Assistanta
- **Search intent:** informačný / projektový
- **Focus keyword:** ESP32 PIR ESPHome

## SEO title

ESP32 + HC-SR501 + ESPHome: pohybový senzor pre Home Assistant

## Meta description

Praktický projekt ESP32 + HC-SR501 cez ESPHome: princíp zapojenia, GPIO binary sensor, H/L trigger režimy, testovanie a Home Assistant automatizácia.

## H1

ESP32 + HC-SR501 + ESPHome: jednoduchá detekcia pohybu v Home Assistante

## Úvod

HC-SR501 je vhodný prvý senzor pre ESPHome, pretože jeho výstup je jednoduchý digitálny stav: pohyb alebo bez pohybu.

Projekt zároveň dobre ukazuje správny pracovný postup KomArena Build Lab:

1. najprv stabilná ESP32,
2. potom jeden senzor,
3. overenie signálu v ESPHome,
4. až potom automatizácia v Home Assistante.

Návod zostáva pri bezpečnom nízkom napätí a nerieši spínanie 230 V zariadení.

## Čo budete potrebovať

- kompatibilnú ESP32 vývojovú dosku,
- HC-SR501 PIR modul,
- dátový USB kábel,
- prepojovacie vodiče,
- ESPHome,
- Home Assistant pre finálnu automatizáciu.

### Stav KomArena produktu pri príprave draftu

HC-SR501 produkt na KomArena existuje, ale je aktuálne `outofstock` a má skrytú katalógovú viditeľnosť.

Produkčná URL:

https://komarena.sk/produkt/hc-sr501-pir-senzor/

Preto článok zatiaľ nesmie používať agresívne nákupné CTA typu „kúpte teraz“. Produktový odkaz môže zostať technickou referenciou alebo sa aktivuje až po obnovení predajnosti.

## Ako HC-SR501 komunikuje s ESP32

HC-SR501 má digitálny výstup OUT. Bežná technická dokumentácia modulu uvádza približne 3,3 V pri stave HIGH a 0 V pri LOW.

To je vhodné pre GPIO vstup ESP32, ale pred zapojením treba skontrolovať pinout konkrétneho modulu aj konkrétnej dosky.

Na trhu existujú klony a fyzické označenie pinov nemusí byť pri každom module identické.

## Napájanie modulu

Bežný HC-SR501 modul má vlastnú napájaciu časť a technické podklady uvádzajú vstupný rozsah vyšší než logická úroveň jeho výstupu.

Pre jednoduchý maker projekt sa často používa 5 V napájanie modulu a 3,3 V logický OUT do ESP GPIO.

Tento článok však nebude tvrdiť univerzálne zapojenie podľa farby vodičov. Vždy sa riaďte označením `VCC`, `OUT`, `GND` na konkrétnom kuse.

## H a L trigger režim — správne vysvetlenie

Prepojka na HC-SR501 nastavuje spôsob triggerovania.

### L — single / non-repeatable trigger

Po detekcii sa výstup aktivuje na nastavený čas. Ďalší pohyb počas aktívneho intervalu typicky nereštartuje časovač.

### H — repeatable / retriggerable trigger

Pri ďalšej detekcii sa aktívny interval predlžuje / reštartuje podľa správania modulu.

Pre detekciu prítomnosti v miestnosti býva retriggerable režim často praktickejší, ale správna voľba závisí od automatizácie.

## Krok 1: rozbehnite ESP32 bez senzora

Najprv použite postup z Draftu 003 a overte:

- nahratie ESPHome firmvéru,
- Wi-Fi pripojenie,
- online stav zariadenia,
- stabilitu napájania.

Ak sa ESP32 reštartuje už bez senzora, najprv riešte Draft 005 — stabilné napájanie ESP32.

## Krok 2: vyberte vhodný GPIO

Nie každý pin ESP32 je rovnako vhodný pre ľubovoľnú funkciu. Výber závisí od konkrétnej dosky.

Preto v článku nepoužívame náhodné univerzálne číslo GPIO ako záväzné zapojenie.

Pred finálnym publikovaním vyberieme presnú KomArena ESP32 dosku a overíme bezpečný voľný input pin podľa jej dokumentácie.

## Krok 3: modelové zapojenie

Princíp je:

```text
HC-SR501          ESP32
VCC        ->     vhodné napájanie modulu
GND        ->     GND
OUT        ->     overený GPIO vstup
```

Presný napájací pin a GPIO sa doplní až po naviazaní na konkrétnu dosku.

## Krok 4: ESPHome konfigurácia

ESPHome podporuje GPIO binary sensor. Modelový základ:

```yaml
binary_sensor:
  - platform: gpio
    pin: GPIOXX
    name: "Pohyb"
    device_class: motion
```

`GPIOXX` je zámerne placeholder.

Po doplnení správneho pinu sa stav z HC-SR501 zobrazí ako binary sensor a Home Assistant ho môže použiť v automatizáciách.

## Krok 5: testujte senzor ešte pred montážou

Skontrolujte:

- či sa stav mení pri pohybe,
- či po uplynutí nastaveného času prejde späť,
- či vám vyhovuje H alebo L režim,
- či citlivosť nie je príliš vysoká,
- či senzor nereaguje na neželané tepelné zmeny.

PIR senzor nereaguje na „osobu“ ako kamera. Sleduje zmeny infračerveného žiarenia v zornom poli.

## Krok 6: umiestnenie je rovnako dôležité ako kód

Vyhnite sa miestam:

- priamo pri radiátore,
- proti oknu so silným slnečným žiarením,
- pri výraznom prievane a tepelných zmenách,
- tam, kde bude senzor sledovať nechcenú komunikáciu cez dvere.

Najprv testujte dočasne a až potom riešte finálnu krabičku a montáž.

## Modelová Home Assistant automatizácia

Bezpečný príklad bez 230 V:

**Keď PIR zistí pohyb → zapni notifikáciu alebo nízkonapäťové smart svetlo cez existujúcu certifikovanú integráciu.**

Pre prvý test môže automatizácia iba poslať notifikáciu do telefónu. Tak overíte logiku bez spínania fyzickej záťaže.

## Časté chyby

### Zamenené H/L režimy

H je retriggerable, L single/non-repeatable pre bežný HC-SR501.

### Príliš vysoká citlivosť

Senzor potom zachytáva pohyb mimo oblasti, ktorú chcete sledovať.

### Nevhodné miesto

Tepelný zdroj alebo slnko môže zhoršiť spoľahlivosť.

### Náhodne zvolený ESP32 GPIO

Najprv overte konkrétnu dosku a boot/strap funkcie pinov.

### Automatizácia maskuje problém senzora

Najprv sledujte samotný binary sensor. Až keď stav funguje správne, pridajte automatizáciu.

## Bezpečnostné upozornenie

HC-SR501 a ESP32 sú vhodné na nízkonapäťové experimentovanie. Výstup PIR senzora nie je výkonový výstup pre lampu, motor alebo relé cievku.

Ak výsledná automatizácia ovláda 230 V osvetlenie, použite hotové certifikované smart zariadenie alebo riešenie navrhnuté a zapojené odborne spôsobilou osobou.

## Interné odkazy — návrh

- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- legacy PIR článok po oprave
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Senzory: https://komarena.sk/senzory/
- Home Assistant: https://komarena.sk/home-assistant/

## CTA

Najprv postavte spoľahlivý nízkonapäťový pohybový senzor. Keď binary sensor v ESPHome funguje stabilne, Home Assistant automatizácia je už len ďalšia vrstva.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome — GPIO Binary Sensor: https://esphome.io/components/binary_sensor/gpio/
- ESPHome Devices — Generic PIR: https://devices.esphome.io/devices/generic-pir/
- HC-SR501 datasheet mirror — H repeatable / L non-repeatable trigger
- KomArena produkt HC-SR501 — aktuálny read-only katalógový stav

## Open points

- Otvorený bod: pred publikovaním vybrať konkrétnu ESP32 dosku a overiť GPIO.
- Otvorený bod: produkt HC-SR501 je aktuálne vypredaný/skrytý; komerčný CTA zapnúť až po skladovom gate.
- Otvorený bod: overiť presnú výrobnú sériu HC-SR501 a rozsah delay trimra na predávanom kuse.
- Otvorený bod: po technickom teste doplniť vlastné fotografie zapojenia.

## Facebook post

ESP32 + PIR senzor je jeden z najlepších prvých ESPHome projektov — ak ho postavíte po vrstvách.

Najprv stabilná ESP32, potom HC-SR501 ako GPIO binary sensor, overenie H/L režimu a až nakoniec Home Assistant automatizácia.

Pripravili sme návod, ktorý sa drží nízkeho napätia a nepreskakuje diagnostiku.

Celý návod: [URL po publikovaní]

## Instagram caption

ESP32 + HC-SR501 + ESPHome = jednoduchý pohybový senzor pre Home Assistant. Najprv senzor, až potom automatizácia.

#komarena #esp32 #esphome #pir #hcsr501 #homeassistant #smarthome

## Reels / Shorts idea

**Hook:** „PIR senzor do Home Assistanta za pár krokov — ale bez jednej častej chyby.“

Ukázať:

1. HC-SR501,
2. H/L jumper,
3. ESP32,
4. binary sensor v ESPHome,
5. stav motion v Home Assistante.

## Newsletter snippet

**Predmet:** Prvý pohybový senzor cez ESPHome

HC-SR501 dáva jednoduchý digitálny signál, ktorý ESPHome vie spracovať ako motion binary sensor. Nový projekt vysvetľuje správny workflow, trigger režimy a bezpečný test bez práce so sieťovým napätím.
