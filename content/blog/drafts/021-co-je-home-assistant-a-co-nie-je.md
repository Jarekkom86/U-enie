<!-- markdownlint-disable MD013 -->

# Draft 021 — Čo je Home Assistant a čo nie je

- **Status:** draft
- **Typ:** vysvetľujúci článok / vstup do série Home Assistant od nuly
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ, ktorý zvažuje Home Assistant alebo ho práve nainštaloval
- **Search intent:** informačný
- **Focus keyword:** čo je Home Assistant

## SEO title

Čo je Home Assistant a čo nie je: praktické vysvetlenie

## Meta description

Čo je Home Assistant, ako fungujú integrácie, zariadenia, entity a automatizácie, čo vie lokálne a kedy stále závisíte od internetu alebo cloudu.

## H1

Čo je Home Assistant a čo nie je: základ, ktorý sa oplatí pochopiť pred nákupom smart zariadení

## Úvod

Home Assistant sa často opisuje ako „smart home hub“. To je užitočná skratka, ale nie úplne presná.

V praxi ide o platformu, ktorá beží na vašom vlastnom hardvéri a spája zariadenia, služby, protokoly a automatizácie do jedného systému. Home Assistant môže komunikovať lokálne so zariadeniami vo vašej sieti, ale môže zároveň používať aj cloudové integrácie tam, kde ich konkrétny výrobok vyžaduje.

Pre používateľa je preto dôležité rozlíšiť tri veci:

1. **kde beží samotný Home Assistant,**
2. **ako komunikuje s konkrétnym zariadením,**
3. **či dané zariadenie alebo integrácia potrebuje internet.**

Keď tieto vrstvy oddelíte, prestane byť „lokálna smart domácnosť“ marketingovým sloganom a stane sa technickým rozhodnutím.

## Rýchla odpoveď

Home Assistant je lokálne bežiaca platforma pre smart domácnosť. Samotné jadro môže fungovať na vašom hardvéri doma a dáta sa štandardne spracúvajú lokálne. To však **neznamená, že každé pripojené zariadenie je automaticky lokálne**.

Ak integrácia používa lokálne API, Zigbee, ESPHome alebo inú lokálnu komunikáciu, veľká časť funkcionality môže fungovať aj bez internetu. Ak je zariadenie navrhnuté iba pre cloud výrobcu, Home Assistant môže byť stále závislý od jeho služby.

## Z čoho sa Home Assistant skladá

Oficiálna dokumentácia stavia Home Assistant na niekoľkých základných pojmoch.

### Integrácia

Integrácia je softvérová vrstva, ktorá umožní Home Assistantu komunikovať s konkrétnym zariadením, službou alebo platformou.

Príklad:

- ESPHome integrácia prepája ESPHome zariadenia,
- BleBox integrácia prepája podporované BleBox zariadenia,
- niektoré integrácie komunikujú lokálne,
- iné používajú internetový cloud výrobcu.

Pri výbere zariadenia preto nestačí otázka „je kompatibilné s Home Assistantom?“. Dôležitá je aj otázka **ako** je kompatibilné.

### Zariadenie

Device reprezentuje fyzickú alebo logickú jednotku. Jedno fyzické zariadenie môže mať viac funkcií.

Napríklad smart zásuvka môže mať:

- samotný vypínač,
- meranie výkonu,
- meranie energie,
- diagnostické senzory.

### Entita

Entity sú jednotlivé funkcie a hodnoty, s ktorými Home Assistant pracuje.

Príklady:

- `switch` pre zapnutie zásuvky,
- `sensor` pre teplotu,
- `light` pre svetlo,
- `binary_sensor` pre pohyb alebo otvorenie dverí.

Entity sú základom dashboardov, automatizácií a podmienok.

### Oblasť

Area zodpovedá reálnemu priestoru, napríklad obývačke, kuchyni alebo technickej miestnosti.

Keď sú zariadenia správne priradené do oblastí, Home Assistant vie s nimi pracovať kontextovo a nemusíte umiestnenie vkladať do každého názvu.

### Automatizácia

Automatizácia spája udalosť alebo zmenu stavu s podmienkou a akciou.

Príklad:

- pohyb sa zistí,
- iba ak je večer,
- zapne sa svetlo.

Home Assistant teda nie je iba univerzálna aplikácia na manuálne ovládanie. Najväčší zmysel začne dávať vtedy, keď medzi zariadeniami vytvoríte pravidlá.

## Čo znamená „beží lokálne“

Home Assistant je navrhnutý tak, aby bežal na hardvéri u vás doma. Oficiálna dokumentácia uvádza, že vaše dáta zostávajú lokálne a samotná platforma nepotrebuje povinný cloudový účet.

To prináša praktické výhody:

- systém nie je automaticky závislý od vzdialeného servera pre každú základnú operáciu,
- lokálne integrácie môžu reagovať aj pri výpadku internetu,
- máte väčšiu kontrolu nad tým, ktoré služby používate.

Treba však dodať dôležité „ale“: konkrétna integrácia môže internet stále vyžadovať. Home Assistant dokumentácia pri integráciách rozlišuje aj ich spôsob komunikácie a pri niektorých otvorene označuje internetovú závislosť.

## Čo Home Assistant nie je

### Nie je to záruka lokálneho ovládania každého zariadenia

Logo Home Assistant alebo existencia integrácie ešte automaticky neznamená, že konkrétne zariadenie komunikuje lokálne.

Pri výbere produktu treba overiť:

- či integrácia používa Local Push, Local Polling alebo cloud,
- či zariadenie potrebuje účet výrobcu,
- čo sa stane pri výpadku internetu,
- ktoré funkcie sú dostupné lokálne a ktoré nie.

### Nie je to náhrada za všetky rádiové adaptéry

Home Assistant software sám osebe nevytvorí Zigbee, Thread, Z-Wave alebo Bluetooth rádio, ak ho hostiteľský hardvér nemá.

Pri niektorých protokoloch potrebujete koordinátor, adaptér alebo bridge.

### Nie je to dôvod nakúpiť všetky protokoly naraz

Začiatočník často spraví chybu, že si pripraví Wi-Fi, Zigbee, Thread, Matter, Bluetooth a niekoľko hubov ešte pred prvým projektom.

Lepší postup je začať problémom, ktorý chcete vyriešiť, a až potom vybrať technológiu.

### Nie je to systém, ktorý sa nikdy nemení

Home Assistant sa aktívne vyvíja. Integrácie, rozhranie aj odporúčané postupy sa menia.

Preto je dôležité:

- robiť zálohy,
- pred väčšou aktualizáciou pozrieť release notes,
- pri technických návodoch overovať aktuálnu dokumentáciu.

## Potrebujem Home Assistant Cloud?

Nie na samotné lokálne fungovanie Home Assistanta.

Home Assistant Cloud je voliteľná služba, ktorá môže zjednodušiť vzdialený prístup a integráciu s niektorými hlasovými asistentmi. Oficiálna dokumentácia ho odporúča ako jednoduchú cestu k vzdialenému prístupu bez ručného otvárania portov na routeri.

To je odlišné od otázky, či Home Assistant doma funguje. Lokálna inštancia môže bežať aj bez predplatného.

## Pre koho Home Assistant dáva zmysel

Home Assistant je vhodný najmä ak chcete:

- kombinovať zariadenia rôznych značiek,
- vytvárať vlastné automatizácie,
- používať lokálne protokoly,
- budovať vlastné ESPHome zariadenia,
- mať kontrolu nad štruktúrou smart domácnosti,
- postupne rozširovať systém bez viazania všetkého na jednu aplikáciu výrobcu.

Ak chcete iba jednu smart žiarovku ovládanú z mobilnej aplikácie, Home Assistant nemusí byť prvý krok, ktorý potrebujete.

## Ako začať bez chaosu

Odporúčaný postup:

1. rozbehnite Home Assistant na podporovanom hardvéri,
2. vytvorte oblasti podľa reálnych miestností,
3. pridajte jednu existujúcu integráciu,
4. pochopte rozdiel medzi device a entity,
5. vytvorte jednu jednoduchú automatizáciu,
6. až potom pridávajte ďalší protokol alebo vlastný ESPHome projekt.

Takto si skôr vybudujete systém než zbierku nesúvisiacich zariadení.

## KomArena prepojenie

Nadradený hub:

- Home Assistant: https://komarena.sk/home-assistant/

Súvisiace články:

- Draft 003 — Prvý ESPHome projekt s ESP32
- Draft 006 — Prvá Zigbee sieť v Home Assistante
- Draft 022 — Lokálna vs cloudová smart domácnosť
- budúci článok — Ako pomenovať zariadenia a entity

Produktové CTA sa v tomto vysvetľujúcom článku nemá vkladať nasilu. Home Assistant Green alebo konkrétny koordinátor sa doplní iba vtedy, keď bude konkrétny produkt publikovaný a prejde aktuálnym skladovým a ekonomickým gate.

## Záver

Home Assistant nie je iba ďalšia smart home aplikácia. Je to vrstva, ktorá vie spojiť zariadenia, entity, oblasti a automatizácie do jedného systému.

Najväčšia chyba je predpokladať, že „Home Assistant kompatibilné“ automaticky znamená lokálne, bez cloudu a bez ďalšieho hardvéru. Pri každom zariadení treba poznať spôsob komunikácie a jeho reálne limity.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Getting started: https://www.home-assistant.io/getting-started/
- Home Assistant — Concepts and terminology: https://www.home-assistant.io/getting-started/concepts-terminology/
- Home Assistant — Privacy FAQ: https://www.home-assistant.io/faq/is-my-data-private/
- Home Assistant — Remote access: https://www.home-assistant.io/docs/configuration/remote/
- Home Assistant — Organizing: https://www.home-assistant.io/docs/organizing/

## Open points

- Otvorený bod: pred publikovaním doplniť jeden screenshot aktuálneho prehľadu Devices & services bez citlivých údajov.
- Otvorený bod: pridať inbound link z hlavnej stránky `/home-assistant/` až pri publikačnom kroku.
- Otvorený bod: Home Assistant Green CTA aktivovať iba po finálnom produktovom gate.

## Facebook post

Home Assistant nie je len „ďalší hub“ a kompatibilita ešte automaticky neznamená lokálne ovládanie.

V novom základe série vysvetľujeme rozdiel medzi integráciou, zariadením, entitou a automatizáciou — a hlavne to, kedy smart domácnosť funguje lokálne a kedy stále potrebuje cloud výrobcu.

Celý článok: [URL po publikovaní]

## Instagram caption

Home Assistant dáva najväčší zmysel, keď rozumiete štyrom slovám: integrácia, zariadenie, entita a automatizácia. Potom prestane byť smart home zbierkou aplikácií.

#komarena #homeassistant #smarthome #esphome #lokalnesmarthome

## Reels / Shorts idea

**Hook:** „Home Assistant je lokálny. Znamená to, že všetky vaše zariadenia sú lokálne? Nie.“

Ukázať:

1. Home Assistant dashboard,
2. integráciu,
3. device,
4. viac entít jedného zariadenia,
5. lokálny ESPHome/BleBox príklad,
6. cloudovú integráciu ako kontrast.

## Newsletter snippet

**Predmet:** Home Assistant od nuly: čo vlastne riadi a čo nie

Nový základný článok vysvetľuje integrácie, zariadenia, entity, oblasti a automatizácie a ukazuje, prečo kompatibilita s Home Assistantom ešte nie je to isté ako lokálne ovládanie.