<!-- markdownlint-disable MD013 -->

# Draft 027 — Wi-Fi vs Zigbee vs Thread vs Matter

- **Status:** draft
- **Typ:** vysvetľovací poradca / architektúra smart home
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ, ktorý plánuje smart domácnosť a nechce kupovať zariadenia podľa loga bez pochopenia protokolu
- **Search intent:** informačný / rozhodovací
- **Focus keyword:** Wi-Fi Zigbee Thread Matter rozdiel

## SEO title

Wi-Fi vs Zigbee vs Thread vs Matter: čo je čo v smart domácnosti

## Meta description

Wi-Fi, Zigbee, Thread a Matter nie sú štyri rovnaké technológie. Pozrite si, čo je rádio, čo je sieť a čo je štandard ovládania v Home Assistante.

## H1

Wi-Fi vs Zigbee vs Thread vs Matter: ako si ich nepomýliť pri plánovaní Home Assistanta

## Rýchla odpoveď

Najväčší zdroj chaosu je porovnávať všetky štyri názvy ako keby boli priamymi konkurentmi.

- **Wi-Fi** je sieťová technológia, ktorú už bežne používate doma.
- **Zigbee** je samostatná nízkoenergetická mesh sieť pre smart zariadenia a potrebuje koordinátor.
- **Thread** je nízkoenergetická IP mesh sieť a potrebuje border router, aby komunikovala s ostatnou IP sieťou.
- **Matter** je aplikačný štandard pre smart home. V Home Assistante môže komunikovať cez Wi-Fi/Ethernet alebo cez Thread.

Preto veta „Matter alebo Thread?“ často nedáva zmysel. Matter zariadenie môže používať Thread ako transport.

## Prečo je v názvoch taký chaos

Obal smart zariadenia môže mať viac log naraz. Napríklad jedno zariadenie môže byť:

- Matter zariadenie,
- komunikovať cez Thread,
- pri prvom párovaní použiť Bluetooth,
- a nakoniec sa ovládať lokálne cez Home Assistant.

Každé z týchto slov opisuje inú vrstvu systému.

Pri nákupe preto nestačí pozerať iba na jedno logo. Treba vedieť:

1. po akej sieti zariadenie komunikuje,
2. aký controller/gateway/radio potrebuje,
3. či Home Assistant podporuje konkrétnu integráciu,
4. či zariadenie potrebuje cloud aj po prvom nastavení.

## Wi-Fi

Wi-Fi smart zariadenie sa pripája do vašej existujúcej IP siete cez access point alebo router.

Výhody:

- nepotrebujete samostatný Zigbee koordinátor,
- zariadenie je priamo v IP sieti,
- pri lokálnej integrácii môže Home Assistant komunikovať priamo so zariadením,
- je vhodné pre zariadenia, ktoré majú dostatok napájania a potrebujú vyšší dátový tok.

Nevýhody a limity:

- veľa lacných Wi-Fi zariadení je navrhnutých primárne pre cloud výrobcu,
- desiatky zariadení zvyšujú nároky na Wi-Fi infraštruktúru,
- batériové zariadenia majú často vhodnejšie nízkoenergetické alternatívy,
- samotné logo Wi-Fi nehovorí nič o lokálnom ovládaní.

Pre KomArena je dôležitá otázka nie „je to Wi-Fi?“, ale **ako Home Assistant s týmto konkrétnym zariadením komunikuje**.

## Zigbee

Zigbee vytvára vlastnú mesh sieť oddelenú od vašej Wi-Fi siete.

Home Assistant cez ZHA používa kompatibilný **Zigbee koordinátor**. Koordinátor vytvorí Zigbee sieť a zariadenia sa pripájajú práve do nej.

V Zigbee sieti sú typicky:

- **coordinator** — jeden centrálny koordinátor siete,
- **router devices** — trvalo napájané zariadenia, ktoré môžu rozširovať mesh,
- **end devices** — často batériové senzory a ovládače.

Výhody:

- veľký výber senzorov a smart zariadení,
- nízka spotreba vhodná pre batériové zariadenia,
- mesh môže zlepšovať pokrytie pomocou router zariadení,
- pri lokálnom ZHA/Zigbee2MQTT riešení nemusí byť potrebný vendor cloud.

Limity:

- potrebujete koordinátor,
- kompatibilita konkrétneho zariadenia sa musí overovať,
- mesh potrebuje dobré rozmiestnenie router zariadení,
- 2,4 GHz Zigbee môže koexistovať s Wi-Fi, ale zlé kanálové plánovanie vie spôsobiť rušenie.

## Thread

Thread je nízkoenergetická mesh sieť založená na IP.

Je navrhnutá pre zariadenia smart domácnosti s nízkou spotrebou. Na rozdiel od Zigbee sú Thread zariadenia IP adresovateľné.

Aby Thread sieť komunikovala s bežnou domácou IP sieťou, používa sa **Thread border router**.

Dôležité:

- Thread nie je automaticky Matter,
- Thread zariadenie môže používať Matter, Apple HomeKit alebo iný podporovaný aplikačný protokol,
- logo Thread preto samo o sebe nestačí na potvrdenie Matter kompatibility.

Home Assistant Thread integrácia spravuje a diagnostikuje Thread siete a ich credentials. Aktuálna dokumentácia Home Assistant zároveň stále označuje integráciu Thread ako oblasť vo vývoji.

## Matter

Matter je štandard pre to, **ako smart zariadenie opisuje svoje funkcie a ako ho controller ovláda**.

V Home Assistante beží Matter controller cez Matter Server a zariadenie môže byť dostupné napríklad cez:

- Wi-Fi,
- Ethernet,
- Thread.

Thread je teda jedna z možných sieťových ciest pre Matter, nie náhrada Matter.

Matter má aj funkciu multi-fabric, vďaka ktorej môže byť podporované zariadenie zdieľané medzi viacerými controllermi, napríklad Home Assistantom a ďalším ekosystémom.

To však neznamená, že každé Matter zariadenie má vo všetkých ekosystémoch identickú sadu funkcií. Pred nákupom treba stále kontrolovať reálnu podporu konkrétneho zariadenia.

## Bluetooth v Matter neznamená Bluetooth prevádzku

Pri Matter zariadeniach sa Bluetooth často používa pri commissioning/párovaní.

To neznamená, že po dokončení párovania musí zariadenie fungovať cez Bluetooth. Bežná prevádzka môže následne prebiehať cez Wi-Fi alebo Thread podľa typu produktu.

## Čo potrebuje Home Assistant

### Wi-Fi zariadenie

Typicky:

- funkčnú IP sieť,
- podporovanú integráciu,
- prípadne cloud účet, ak konkrétna integrácia nie je lokálna.

### Zigbee zariadenie

Typicky:

- Zigbee koordinátor,
- ZHA alebo iný Zigbee stack,
- funkčnú Zigbee mesh sieť.

### Thread zariadenie

Typicky:

- Thread border router,
- správnu Thread sieť,
- aplikačný protokol, napríklad Matter alebo HomeKit.

### Matter zariadenie

Typicky:

- Matter integráciu / Matter Server,
- sieť podľa konkrétneho produktu,
- pri Matter-over-Thread aj Thread border router.

## Connect ZBT-2: Zigbee alebo Thread, nie oboje naraz

Aktuálny Home Assistant Connect ZBT-2 podporuje Zigbee 3.0 a Thread, ale Home Assistant odporúča zariadenie **dedikovať jednému protokolu**.

ZBT-2 nemá súčasne obsluhovať Zigbee aj Thread. Home Assistant vysvetľuje, že starší multiprotocol/MultiPAN prístup prinášal problémy so stabilitou, preto ho neodporúča pre domácu prevádzku.

Praktický dôsledok:

- ak ZBT-2 použijete ako Zigbee koordinátor, nepočítajte s tým istým kusom zároveň ako Thread rádiom,
- ak chcete oba protokoly cez vlastný Home Assistant hardware, plánujte samostatné rádio pre každý protokol alebo využite existujúci kompatibilný Thread border router v domácnosti.

## Nemusíte kupovať nový Thread border router naslepo

Pred nákupom ďalšieho hardvéru skontrolujte, či už doma Thread border router nemáte.

Home Assistant dokumentácia uvádza napríklad niektoré zariadenia Apple, Google, Amazon a ďalších výrobcov, ktoré vedia túto úlohu plniť.

To neznamená, že musíte používať ich celý smart home ekosystém. Pri Matter-over-Thread môže Home Assistant využívať existujúcu Thread sieť podľa podporovanej konfigurácie.

## Rozhodovací rámec podľa zariadenia

### Batériový pohybový alebo kontaktný senzor

Zigbee alebo Thread môže byť prirodzenejšia voľba než Wi-Fi, ak je prioritou nízka spotreba.

### ESPHome projekt

Wi-Fi je dnes najjednoduchší vstup do vlastného ESPHome projektu. Bluetooth Proxy je ďalší príklad, kde ESP32 používa IP sieť a rozširuje BLE pokrytie.

### Smart zásuvka alebo svetlo

Rozhoduje konkrétny produkt. Môže byť Wi-Fi, Zigbee alebo Matter cez Wi-Fi/Thread.

### Veľa batériových senzorov

Tu dáva zmysel rozmýšľať nad mesh protokolom systematicky a nebudovať desiatky izolovaných vendor hubov.

## Čo nekupovať podľa marketingovej skratky

### „Matter = bez hubu“

Nie vždy.

Matter-over-Thread potrebuje Thread border router. Matter controller je ďalšia samostatná úloha, ktorú v Home Assistante rieši Matter Server.

### „Thread = Matter“

Nie.

Thread je sieťová technológia. Matter je aplikačný štandard.

### „Zigbee nepotrebuje infraštruktúru“

Potrebuje koordinátor a kvalitnú mesh sieť.

### „Wi-Fi znamená cloud“

Nie.

Niektoré Wi-Fi integrácie sú lokálne. Iné sú cloudové. Treba overiť konkrétny produkt a integráciu.

## Praktická stratégia pre KomArena zákazníka

Pred nákupom si pri každom zariadení zapíšte:

1. transport/sieť: Wi-Fi, Zigbee alebo Thread,
2. aplikačný štandard/integráciu: Matter, HomeKit, vendor API, ESPHome a podobne,
3. potrebný controller/radio,
4. lokálne vs cloudové ovládanie,
5. čo sa stane, ak internet prestane fungovať.

Takto rýchlo odhalíte, či nový produkt zapadá do existujúcej architektúry alebo pridáva ďalší zbytočný hub.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 006 — Prvá Zigbee sieť
- Draft 009 — ZHA vs Zigbee2MQTT
- Draft 014 — Bluetooth Proxy vs USB adaptér
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 022 — Lokálna vs cloudová smart domácnosť
- Draft 028 — Ako naplánovať Home Assistant domácnosť bez zbytočných hubov

## CTA

Nekupujte smart zariadenie iba podľa veľkého loga na krabici. Najprv si overte sieť, controller, integráciu a to, či bude fungovať lokálne spôsobom, ktorý zapadá do vašej domácnosti.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Matter: https://www.home-assistant.io/integrations/matter/
- Home Assistant — Thread: https://www.home-assistant.io/integrations/thread/
- Home Assistant — ZHA: https://www.home-assistant.io/integrations/zha/
- Home Assistant — Connect ZBT-2: https://www.home-assistant.io/connect/zbt-2/
- Home Assistant — Green: https://www.home-assistant.io/green/

## Open points

- Otvorený bod: pred publikovaním znovu overiť stav Thread integrácie a odporúčaný Home Assistant hardware.
- Otvorený bod: ak KomArena zalistuje Zigbee/Thread koordinátor, produktový CTA pridať až po reálnom compatibility a stock gate.
- Otvorený bod: pripraviť jednoduchú vrstvenú schému `Matter → Wi-Fi/Ethernet alebo Thread`, samostatne `Zigbee → coordinator`.

## Facebook post

Matter nie je ďalšie rádio vedľa Wi-Fi, Zigbee a Thread.

Práve toto nedorozumenie vedie k zbytočným hubom a nesprávnym nákupom. V novom prehľade vysvetľujeme, čo je sieť, čo je mesh, čo potrebuje koordinátor a kde do toho patrí Matter.

Celý článok: [URL po publikovaní]

## Instagram caption

Wi-Fi, Zigbee, Thread a Matter nie sú štyria rovnakí súperi. Najprv pochopte vrstvu siete a až potom vyberajte zariadenie.

#komarena #homeassistant #matter #thread #zigbee #smarthome

## Reels / Shorts idea

**Hook:** „Matter vs Thread? Táto otázka je často položená zle.“

Ukázať štyri kartičky:

1. Wi-Fi = IP sieť,
2. Zigbee = vlastná mesh + coordinator,
3. Thread = IP mesh + border router,
4. Matter = smart home štandard nad Wi-Fi/Ethernet alebo Thread.

## Newsletter snippet

**Predmet:** Matter, Thread, Zigbee alebo Wi-Fi? Najprv si upracme pojmy

Nový prehľad rozdeľuje transport, mesh sieť a aplikačný štandard tak, aby sa smart zariadenia dali vyberať podľa architektúry, nie podľa marketingového loga.