<!-- markdownlint-disable MD013 -->

# Draft 024 — Ako pomenovať zariadenia a entity v Home Assistante

- **Status:** draft
- **Typ:** organizačný návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ Home Assistanta, ktorému rastie počet zariadení, entít a automatizácií
- **Search intent:** informačný / praktický
- **Focus keyword:** pomenovanie entít Home Assistant

## SEO title

Ako pomenovať zariadenia a entity v Home Assistante bez chaosu

## Meta description

Praktický systém pomenovania zariadení, entít, oblastí a labelov v Home Assistante. Ako využiť nový Entity ID format bez zbytočného duplikovania názvov.

## H1

Ako pomenovať zariadenia a entity v Home Assistante, aby systém zostal prehľadný aj po rokoch

## Úvod

Pri piatich zariadeniach je skoro jedno, ako ich pomenujete. Pri päťdesiatich už nie.

Nejasné názvy typu `sensor_1`, `teplota2`, `switch_kuchyna_final` alebo opakované názvy miestností sa časom prenesú do dashboardov, automatizácií, skriptov aj hlasového ovládania.

Home Assistant dnes ponúka oblasti, poschodia, labely a nastaviteľný formát Entity ID. Preto už nie je potrebné vkladať všetok kontext priamo do každého názvu.

Cieľom tohto článku nie je vymyslieť jedinú univerzálnu konvenciu. Cieľom je vytvoriť systém, ktorý je konzistentný a ktorý viete udržať.

## Rýchla odpoveď

Najpraktickejšie pravidlo je:

- **Area:** pomenujte ako reálnu miestnosť alebo priestor.
- **Device:** pomenujte podľa toho, čo fyzicky je.
- **Entity:** pomenujte podľa funkcie alebo meranej veličiny.
- **Entity ID:** nechajte Home Assistant skladať podľa zvoleného formátu alebo ho upravte iba vtedy, keď máte jasnú konvenciu.
- **Label:** používajte na funkčné skupiny, ktoré nie sú miestnosťou.

Napríklad:

- Area: `Obývačka`
- Device: `Multisenzor`
- Entity: `Teplota`
- výsledné Entity ID môže byť napríklad `sensor.obyvacka_multisenzor_teplota`

Presný formát závisí od nastavenia vašej inštancie.

## Home Assistant dnes oddeľuje kontext od názvu

Oficiálna dokumentácia odporúča používať krátke samostatné názvy a miesto nepridávať zbytočne do názvu zariadenia, ak je už zariadenie správne priradené do Area.

Príklad:

Dobré:

- Area: `Pracovňa`
- Device: `Multisenzor`
- Entity: `Teplota`

Zbytočne duplicitné:

- Area: `Pracovňa`
- Device: `Pracovňa multisenzor`
- Entity: `Pracovňa multisenzor teplota`

Home Assistant pozná vzťah medzi Area, Device a Entity, takže nie je potrebné opakovať rovnaký kontext v každej vrstve.

## Area: používajte fyzický priestor

Area má reprezentovať miestnosť alebo priestor v reálnom svete.

Typické názvy:

- Obývačka
- Kuchyňa
- Spálňa
- Chodba
- Technická miestnosť
- Garáž
- Záhrada

Area nie je vhodná na kategórie typu:

- Zigbee zariadenia
- Svetlá
- Kritické zariadenia
- Batériové senzory

Na takéto funkčné skupiny sú vhodnejšie labely alebo skupiny.

## Floors: nepchajte poschodie do každého názvu

Ak máte viacpodlažný dom, Home Assistant podporuje Floors.

Area môže byť priradená k poschodiu. To znamená, že namiesto názvu `Prízemie obývačka` môže byť:

- Floor: `Prízemie`
- Area: `Obývačka`

Takýto model je čistejší a dá sa použiť aj pri automatizáciách alebo filtrovaní.

## Device: pomenujte fyzický alebo logický celok

Device by mal hovoriť, čo zariadenie je, nie čo všetko jeho entity robia.

Príklady:

- `Multisenzor`
- `Stropné svetlo`
- `ESP32 technická`
- `Termostat`
- `Smart zásuvka`

Pri viacerých rovnakých zariadeniach v jednej Area použite rozlišujúci detail, ktorý bude dávať zmysel aj o rok.

Napríklad:

- `Stropné svetlo`
- `Lampička pri gauči`

Nie:

- `Svetlo 1`
- `Svetlo 2`

ak z názvu neskôr neviete, ktoré je ktoré.

## Entity: pomenujte funkciu

Entity reprezentuje konkrétnu funkciu alebo hodnotu.

Pri jednom multisenzore môžu entity byť:

- Teplota
- Vlhkosť
- Tlak
- Batéria
- Signál

Nie je potrebné písať `Obývačka Multisenzor Teplota`, ak Home Assistant už pozná Device aj Area.

Krátke entity sú praktickejšie aj v dashboardoch a hlasovom ovládaní.

## Entity ID: dôležité rozlíšenie medzi názvom a ID

Home Assistant rozlišuje:

- zobrazovaný názov entity,
- technické Entity ID, napríklad `sensor.obyvacka_multisenzor_teplota`.

Zmena názvu entity nemusí automaticky znamenať zmenu Entity ID.

Oficiálna dokumentácia upozorňuje, že ak ručne zmeníte Entity ID a používate ho v automatizáciách alebo skriptoch, musíte skontrolovať jeho referencie.

Preto Entity ID neprepisujte iba preto, aby vyzeralo krajšie.

## Nový Entity ID format

Home Assistant umožňuje nastaviť, z ktorých častí sa majú nové Entity ID generovať.

V nastavení môžete pracovať s prvkami:

- Floor,
- Area,
- Device,
- Entity.

Poradie a výber môžete upraviť v:

**Settings → System → Entity ID format**

Dôležité:

- zmena formátu sa týka nových generovaných Entity ID,
- existujúce entity sa automaticky neprepisujú,
- niektoré integrácie môžu navrhovať vlastné Entity ID.

Pre existujúcu veľkú inštanciu preto nerobte hromadné premenovanie bez plánu.

## Odporúčaná KomArena konvencia pre novú domácnosť

Jednoduchý model:

### Area

Fyzická miestnosť alebo priestor.

### Device

Krátky názov fyzického zariadenia.

### Entity

Iba funkcia.

### Label

Funkčná skupina alebo vlastnosť.

Príklady labelov:

- `Batériové`
- `Kritické`
- `Vysoká spotreba`
- `Exteriér`
- `Servisovať`

Label môže spájať zariadenia a entity naprieč miestnosťami bez toho, aby ste nič premenovávali.

## ESPHome: názov zariadenia plánujte skôr než ho rozmiestnite

Pri ESPHome je dobré oddeliť:

- interný názov uzla,
- Device name v Home Assistante,
- jednotlivé entity.

Pri prvom prototype je názov `esp32-test` v poriadku. Pri trvalom zariadení je lepšie vedieť, akú funkciu má a kde bude.

Zároveň však neviažte interné názvy na náhodný produktový názov senzora, ak sa senzor môže neskôr vymeniť.

Príklad:

lepšie:

`technicka-prostredie`

než:

`bme280-1`

ak bude zariadenie dlhodobo reprezentovať celú meraciu jednotku a senzor sa môže zmeniť.

## Automatizácie pomenujte podľa výsledku

Pri automatizáciách je dobré, aby názov odpovedal na otázku „čo robí?“.

Dobré:

- `Chodba — svetlo pri pohybe večer`
- `Kúrenie — vypnúť pri otvorenom okne`
- `Práčka — upozorniť po skončení`

Slabé:

- `Automation 12`
- `Test final 2`
- `PIR new`

Pri väčšom systéme vám názov automatizácie ušetrí viac času než komplikované farebné dashboardy.

## Labels vs Areas vs Groups

Tieto nástroje neriešia to isté.

### Area

Fyzické miesto.

### Floor

Skupina oblastí podľa poschodia.

### Label

Funkčná alebo logická vlastnosť naprieč systémom.

### Group

Kombinuje viac entít do jednej logickej entity.

Príklad:

- Area: `Obývačka`
- Label: `Vysoká spotreba`
- Group: všetky svetlá, ktoré sa majú ovládať ako jeden celok

Správny model znižuje potrebu vkladať všetky informácie do názvu.

## Ako upratať existujúci chaos

Nemeňte všetko naraz.

Odporúčaný postup:

1. vytvorte správne Floors a Areas,
2. priraďte Devices do Areas,
3. zaveďte jednoduché labely,
4. upravte zobrazované názvy,
5. až potom riešte Entity ID,
6. po každej zmene otestujte automatizácie a dashboardy.

Hromadné premenovanie Entity ID bez inventúry môže rozbiť externé skripty, MQTT väzby alebo ďalšie systémy, ktoré staré ID používajú.

## Časté chyby

### Miestnosť v každom názve

Ak je Area nastavená správne, vzniká zbytočná duplicita.

### Čísla bez významu

`Sensor 1`, `Sensor 2`, `Sensor 3` fungujú iba dovtedy, kým si pamätáte, kde sú.

### Premenovanie ID bez kontroly automatizácií

Zobrazovaný názov a Entity ID nie sú to isté.

### Príliš komplikovaná konvencia

Ak nový názov potrebuje päť pravidiel a tabuľku, pravdepodobne ho nebudete používať konzistentne.

## KomArena prepojenie

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 003 — Prvý ESPHome projekt s ESP32
- Draft 023 — DHCP rezervácia vs statická IP

Tento článok je čistý evergreen bez potreby produktového CTA.

## Záver

Dobrý naming systém nie je o tom, aby všetky Entity ID vyzerali dokonale. Je o tom, aby ste pri ďalšej automatizácii vedeli rýchlo nájsť správne zariadenie a rozumeli systému aj po roku.

Home Assistant už dnes pozná Floors, Areas, Devices, Entities aj Labels. Využite tento kontext a názvy držte čo najjednoduchšie.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Customizing entities: https://www.home-assistant.io/docs/configuration/customizing-devices/
- Home Assistant — Organizing: https://www.home-assistant.io/docs/organizing/
- Home Assistant — Areas: https://www.home-assistant.io/docs/organizing/areas/
- Home Assistant — Labels: https://www.home-assistant.io/docs/organizing/labels/
- Home Assistant 2026.8 — entity ID format changes: https://www.home-assistant.io/blog/2026/08/05/release-20268/

## Open points

- Otvorený bod: pred publikovaním vytvoriť anonymizovaný screenshot Area → Device → Entity hierarchie.
- Otvorený bod: preveriť, či chceme KomArena naming convention ponúknuť aj ako stiahnuteľnú jednu stranu/checklist.
- Otvorený bod: inbound link z budúceho článku o plánovaní Home Assistant domácnosti.

## Facebook post

Máte v Home Assistante `sensor_1`, `sensor_2`, `final_light` a `automation 12`?

Pri malej inštalácii to nevadí. Pri desiatkach zariadení už áno.

Nový návod ukazuje, ako rozdeliť názvy medzi Area, Device, Entity a Label a ako použiť nový Entity ID format bez zbytočného duplikovania miestností v každom názve.

Celý článok: [URL po publikovaní]

## Instagram caption

Area = kde. Device = čo. Entity = funkcia. Label = logická skupina. Štyri jednoduché pravidlá, ktoré držia Home Assistant prehľadný.

#komarena #homeassistant #smarthome #organizacia #esphome

## Reels / Shorts idea

**Hook:** „Takto si nezničíte Home Assistant názvami po prvých 50 zariadeniach.“

Ukázať:

1. chaotický zoznam entít,
2. Area,
3. Device,
4. krátke Entity names,
5. Label,
6. výsledné filtrovanie a automation picker.

## Newsletter snippet

**Predmet:** Home Assistant bez chaosu: jednoduchý naming systém

Nový návod ukazuje, ako pomenovať Areas, Devices a Entities a kedy použiť Labels. Cieľom nie sú krásne ID, ale systém, ktorý zostane čitateľný aj po rokoch.