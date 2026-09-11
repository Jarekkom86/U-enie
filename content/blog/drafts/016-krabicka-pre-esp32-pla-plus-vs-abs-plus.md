<!-- markdownlint-disable MD013 -->

# Draft 016 — Krabička pre ESP32: PLA+ alebo ABS+?

- **Status:** draft
- **Typ:** praktické porovnanie 3D materiálov
- **Primárna kategória:** 3D tlač
- **Sekundárne kategórie:** Návody a projekty; Home Assistant & ESPHome; Produkty, testy a porovnania
- **Focus keyword:** krabička ESP32 PLA ABS

## SEO title

Krabička pre ESP32: PLA+ vs ABS+ podľa použitia a teploty

## Meta description

PLA+ alebo ABS+ na 3D tlačenú krabičku pre ESP32? Porovnanie tlačiteľnosti, tepla, uzavretia elektroniky, vetrania a praktických scenárov.

## H1

PLA+ alebo ABS+ na krabičku pre ESP32: materiál vyberajte podľa prostredia, nie podľa názvu

## Úvod

3D tlačená krabička vie z ESP32 prototypu spraviť použiteľné zariadenie, ale nesprávny materiál alebo zlé vetranie môžu zhoršiť teplotu elektroniky aj meranie senzorov.

Pre bežný interiérový ESPHome uzol môže byť PLA+ veľmi praktické. ABS+ dáva väčší zmysel tam, kde potrebujete vyššiu tepelnú rezervu a viete materiál spoľahlivo tlačiť v uzavretej tlačiarni. Ani jeden materiál však automaticky nerobí krabičku vhodnú do exteriéru, rozvádzača alebo k sieťovému napätiu.

## Čo musí krabička riešiť

Pred výberom filamentu si odpovedzte:

- bude zariadenie v interiéri alebo pri zdroji tepla?
- meria teplotu/vlhkosť a potrebuje prúdenie vzduchu?
- je v krabičke iba ESP32 alebo aj menič, relé, displej či LED?
- potrebuje prístup k USB, BOOT/EN tlačidlám alebo svorkám?
- ako sa bude krabička montovať a servisovať?

Materiál je iba jedna časť návrhu.

## PLA+ — jednoduchší interiérový default

eSUN PLA+ je navrhnuté ako ľahko tlačiteľný PLA-based materiál s vyššou húževnatosťou oproti bežnému PLA podľa výrobcu. Pre malé elektronické krabičky má praktické výhody:

- jednoduchšia tlač na bežnej otvorenej tlačiarni,
- nižšia tendencia k warpu než ABS trieda,
- dobrá rozmerová presnosť pre prototypy,
- jednoduché iterovanie otvorov a úchytov.

### Kedy PLA+ dáva zmysel

- interiérový ESPHome senzor,
- krabička na stole alebo stene mimo zdroja tepla,
- prototyp, ktorý budete viackrát prerábať,
- držiak OLED alebo malého senzora.

### Limity

PLA/PLA+ nie je ideálny tam, kde môže byť dlhodobo vysoká teplota. Krabičku preto neumiestňujte bez posúdenia napríklad do rozpáleného auta, tesne ku kúreniu alebo k výkonovej elektronike.

## ABS+ — vyššia tepelná rezerva, náročnejšia tlač

eSUN pri ABS+ uvádza vyššiu teplotnú odolnosť než pri PLA-oriented materiáloch a odporúča vyhrievanú podložku a tlač v uzavretej komore. Aktuálna produktová stránka uvádza heat distortion temperature približne 73 °C pre daný materiál/test.

### Kedy ABS+ dáva zmysel

- krabička blízko mierne vyšších prevádzkových teplôt,
- funkčný diel, kde je tepelná rezerva dôležitejšia než jednoduchosť tlače,
- tlačiareň s uzavretou komorou a zvládnutým ABS procesom.

### Nevýhody

- väčšie riziko warpu a zmrštenia,
- vyššia teplota trysky a podložky,
- potreba kontrolovaného prostredia a rozumného vetrania pracoviska,
- zložitejší prvý úspešný výtlačok.

Výrobca pri ABS+ výslovne odporúča enclosed-chamber printing. To je praktický rozdiel oproti PLA+ projektu na bežnej otvorenej tlačiarni. cite technical source in publishing system; not rendered in final WordPress copy unless desired

## Porovnanie pre elektronickú krabičku

| Oblasť | PLA+ | ABS+ |
| --- | --- | --- |
| Jednoduchosť tlače | jednoduchšia | náročnejšia |
| Warp | zvyčajne menší problém | treba aktívne riešiť |
| Uzavretá komora | zvyčajne nie je nutná | odporúčaná |
| Tepelná rezerva | nižšia | vyššia |
| Rýchle prototypovanie | veľmi vhodné | menej pohodlné |
| Typický KomArena use case | izbový ESPHome uzol | funkčná krabička s vyššou teplotnou rezervou |

Tabuľka nie je bezpečnostná certifikácia. Vlastnosti finálneho dielu ovplyvňuje geometria, orientácia vrstiev, profil tlače, farba a konkrétna šarža filamentu.

## Krabička pre senzor teploty potrebuje vzduch

Ak do krabičky dáte BME280, DHT22 alebo iný environmentálny senzor, problémom môže byť vlastné teplo ESP32, regulátora a displeja.

Praktické pravidlá:

- senzor držte ďalej od najteplejších komponentov,
- vytvorte ventilačné otvory tak, aby cez senzor prirodzene prúdil vzduch,
- ak treba presnejšiu izbovú teplotu, zvážte oddelenú senzorovú komoru,
- nezakrývajte otvory dekoratívnou stenou iba kvôli vzhľadu.

## Wi-Fi a Bluetooth potrebujú rozumnú RF cestu

PLA+ ani ABS+ nie sú kovová Faradayova klietka, ale návrh krabičky stále ovplyvňuje anténu:

- nedávajte PCB anténu tesne k veľkej kovovej skrutke alebo zdroju,
- neumiestňujte anténnu časť ESP32 medzi kovové držiaky,
- ak je doska v rozvádzači alebo kovovej skrinke, samotná zmena filamentu RF problém nevyrieši.

## Servisovateľnosť

Dobrá krabička má umožniť:

- bezpečne odpojiť napájanie,
- dostať sa k USB portu alebo servisnému konektoru,
- stlačiť BOOT/EN, ak to projekt potrebuje,
- vymeniť senzor bez zničenia celej skrinky,
- viesť vodiče cez odľahčenie ťahu.

Pre prototyp je často lepší skrutkovaný alebo zacvakávací kryt než krabička, ktorú treba pri každej úprave rozrezať.

## Čomu sa vyhnúť

### „ABS+ = automaticky outdoor"

Nie. Exteriér znamená UV, vodu, kondenzáciu, mráz, teplotné cykly a tesnenie. Výber ABS+ sám o sebe nevytvorí vhodný outdoor enclosure.

### „PLA+ je vždy bezpečné, lebo ESP32 sa veľmi nehreje"

Nie. Teplotu môže zvýšiť lineárny regulátor, step-down menič, výkonové relé, slnko alebo okolité zariadenie.

### 230 V v hobby krabičke podľa blogu

Tento článok nie je návod na výrobu sieťového rozvádzača ani krytu pre 230 V. Požiarna klasifikácia, vzdialenosti, izolácia a bezpečnostné normy sú samostatná odborná téma.

## KomArena prepojenie

- 3D tlač: https://komarena.sk/3d-tlac/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/
- Draft 004 — eSUN PLA+ výber a tlač
- Draft 008 — PLA vs PLA+ vs ABS+
- Draft 012 — skladovanie a sušenie filamentu
- Draft 013 — napájanie ESP32

Konkrétne PLA+ a ABS+ produktové CTA aktivovať až po poslednej kontrole skladu a marže. ABS+ už v minulosti podliehalo FAIL CLOSED pri slabej marži, preto sa nesmie automaticky označiť ako objednateľný produkt iba preto, že článok ho technicky odporúča.

## Zdroje a overenie

Overené 11. 9. 2026:

- eSUN PLA+ product: https://www.esun3d.com/pla-pro-product
- eSUN ABS+ product: https://www.esun3d.com/abs-pro-product
- eSUN ABS+ TDS — tlačové parametre, shrinkage/enclosure odporúčanie
- aktuálny KomArena ESP32/3D printing cluster

## Open points

- pred publikovaním overiť presnú generáciu eSUN ABS+ v KomArena sklade voči aktuálnemu TDS,
- nevkladať jednu univerzálnu teplotu tlače bez odkazu na konkrétnu špulku/TDS,
- vytvoriť vlastný testovací model KomArena ESP32 krabičky a odmerať teplotu vo vnútri PLA+ vs ABS+,
- zvážiť 3D súbor ako bezplatný download po reálnom otestovaní.

## Facebook post

PLA+ alebo ABS+ na krabičku pre ESP32?

Pre bežný interiérový senzor je PLA+ často najpraktickejší štart. ABS+ má väčšiu tepelnú rezervu, ale chce lepšie zvládnutú tlač a uzavretú komoru.

Najdôležitejšie je však prostredie, vetranie senzora a teplo elektroniky.

Celé porovnanie: [URL po publikovaní]

## Instagram caption

Krabičku pre ESP32 nevyberajte podľa toho, ktorý filament znie „odolnejšie“. Interiér, teplo, senzorové vetranie a servis rozhodujú viac.

#komarena #3dtlac #esp32 #esphome #pla #abs

## Newsletter snippet

**Predmet:** PLA+ alebo ABS+ na ESP32 krabičku?

Nový návrh vysvetľuje, kedy je jednoduchšie PLA+ lepšia voľba a kedy sa oplatí ABS+, plus čo urobiť s vetraním senzorov a RF časťou ESP32.
