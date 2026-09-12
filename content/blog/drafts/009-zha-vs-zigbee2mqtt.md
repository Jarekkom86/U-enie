<!-- markdownlint-disable MD013 -->

# Draft 009 — ZHA vs. Zigbee2MQTT

- **Status:** draft
- **Typ:** porovnanie / rozhodovací návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť, Protokoly a integrácie
- **Cieľová skupina:** používateľ Home Assistant, ktorý pripravuje prvú Zigbee sieť alebo zvažuje zmenu stacku
- **Search intent:** informačný / rozhodovací
- **Focus keyword:** ZHA vs Zigbee2MQTT

## SEO title

ZHA vs. Zigbee2MQTT: čo zvoliť pre Home Assistant

## Meta description

ZHA alebo Zigbee2MQTT? Praktické porovnanie architektúry, koordinátora, MQTT, správy zariadení, migrácie a toho, pre koho je ktoré riešenie vhodnejšie.

## H1

ZHA vs. Zigbee2MQTT: dve cesty k Zigbee v Home Assistante

## Úvod

Pri prvej Zigbee sieti sa veľmi rýchlo objaví otázka: **ZHA alebo Zigbee2MQTT?**

Na internete sa často prezentuje ako súboj, v ktorom musí existovať jeden univerzálny víťaz. Praktickejšie je pozrieť sa na architektúru, údržbu a potreby konkrétneho používateľa.

Obe riešenia môžu vytvoriť kvalitnú Zigbee sieť. Rozdiel je najmä v tom, ako sa sieť spravuje, aké ďalšie komponenty potrebuje a koľko vrstiev chcete prevádzkovať.

## ZHA v skratke

ZHA — Zigbee Home Automation — je integrácia priamo v Home Assistante.

Home Assistant dokumentácia uvádza, že ZHA komunikuje s kompatibilným Zigbee koordinátorom a vytvára Zigbee sieť, do ktorej sa párujú zariadenia.

Pre používateľa to znamená, že Zigbee konfigurácia, zariadenia a veľká časť správy zostávajú v rozhraní Home Assistanta.

## Zigbee2MQTT v skratke

Zigbee2MQTT je samostatná aplikácia, ktorá komunikuje so Zigbee koordinátorom a publikuje zariadenia a ich stavy cez MQTT.

Oficiálny Getting Started pre Zigbee2MQTT uvádza tri základné časti:

- podporovaný Zigbee adaptér,
- systém, na ktorom Zigbee2MQTT beží,
- MQTT broker.

Home Assistant sa potom pripája k tejto MQTT vrstve.

## Najdôležitejší rozdiel: architektúra

### ZHA

Princíp:

**Zigbee zariadenie → koordinátor → ZHA → Home Assistant**

Výhoda je menej samostatných vrstiev na pochopenie a správu.

### Zigbee2MQTT

Princíp:

**Zigbee zariadenie → koordinátor → Zigbee2MQTT → MQTT broker → Home Assistant**

Táto architektúra pridáva MQTT ako samostatnú vrstvu, ale zároveň oddeľuje Zigbee stack od samotného Home Assistanta.

## Kedy dáva zmysel ZHA

ZHA je silný kandidát, ak:

- chcete Zigbee spravovať priamo v Home Assistante,
- nechcete pridávať MQTT iba kvôli Zigbee,
- preferujete menej samostatných služieb,
- používate podporovaný koordinátor,
- vaše zariadenia a požadované funkcie fungujú dobre v ZHA.

Pre prvú Zigbee sieť môže byť táto jednoduchosť veľmi hodnotná.

## Kedy dáva zmysel Zigbee2MQTT

Zigbee2MQTT môže byť vhodnejší, ak:

- už MQTT používate,
- chcete Zigbee stack oddeliť od Home Assistanta,
- potrebujete zariadenie alebo špecifickú funkciu, ktorú Zigbee2MQTT podporuje lepšie pre váš konkrétny model,
- chcete pracovať s jeho vlastným frontend rozhraním a diagnostikou,
- vyhovuje vám samostatná služba a jej údržba.

Rozhodnutie by malo vychádzať z konkrétneho hardvéru a zariadení, nie z toho, ktoré riešenie je populárnejšie v jednej diskusii.

## Podpora koordinátora

Obe platformy majú zoznam podporovaného hardvéru, ale zoznamy a odporúčania nie sú totožné.

Pred nákupom adaptéra treba skontrolovať:

1. podporu v riešení, ktoré chcete používať,
2. typ rádiového čipu,
3. požadovaný coordinator firmware,
4. spôsob pripojenia,
5. prípadné poznámky výrobcu alebo projektu.

Zigbee2MQTT napríklad oficiálne uvádza odporúčané rodiny adaptérov a upozorňuje, že niektoré adaptéry potrebujú správny coordinator firmware.

## Podpora zariadení

Nie je rozumné porovnávať iba absolútny počet zariadení.

Pri konkrétnom produkte nás zaujíma:

- či sa spáruje,
- ktoré entity sprístupní,
- či fungujú výrobné špecifiká,
- či potrebuje custom handler / quirk / converter,
- či funguje firmware update, binding alebo špeciálne funkcie.

Pred nákupom drahšieho alebo kritického zariadenia preto kontrolujte konkrétny model v dokumentácii zvoleného stacku.

## Migrácia nie je dobrý prvý experiment

Ak už máte stabilnú Zigbee sieť, neprechádzajte zo ZHA na Zigbee2MQTT alebo opačne iba preto, že ste čítali nový komentár na fóre.

Migrácia môže závisieť od koordinátora, zálohy siete a podpory cieľového riešenia. V niektorých scenároch môže byť nutné zariadenia znova párovať.

Pred migráciou treba mať:

- aktuálnu zálohu,
- zoznam zariadení,
- dokumentovanú konfiguráciu,
- potvrdenú podporu koordinátora,
- rollback plán.

## Čo by sme odporučili začiatočníkovi

Ak začínate od nuly a nemáte špecifický dôvod pre MQTT stack, ZHA je logický prvý kandidát na otestovanie v Home Assistante.

Ak už MQTT používate, máte konkrétny Zigbee2MQTT use case alebo potrebujete jeho podporu pre konkrétne zariadenia, Zigbee2MQTT môže byť lepšia voľba.

Toto nie je univerzálne pravidlo. Je to rozhodovací rámec.

## Rozhodovací checklist

Vyberte ZHA, ak odpovedáte skôr áno na:

- Chcem čo najmenej samostatných služieb.
- Chcem Zigbee spravovať priamo v Home Assistante.
- Môj koordinátor aj zariadenia sú dobre podporované v ZHA.

Vyberte Zigbee2MQTT, ak odpovedáte skôr áno na:

- MQTT už používam alebo ho chcem používať.
- Chcem Zigbee oddeliť do samostatnej služby.
- Konkrétne zariadenie/funkcia má lepšiu podporu v Zigbee2MQTT.
- Nevadí mi spravovať ďalšiu vrstvu.

## Čomu sa vyhnúť

### Nákup koordinátora pred rozhodnutím o stacku

Najprv vyberte architektúru a až potom adaptér.

### Migrácia bez dôvodu

Ak sieť funguje, migrácia sama osebe neprináša hodnotu zákazníkovi.

### „Podporuje Zigbee“ = „podporuje všetko“

Konkrétny model zariadenia treba overiť v konkrétnom stacku.

### Porovnávanie iba podľa počtu podporovaných zariadení

Dôležitá je kvalita podpory funkcií, ktoré reálne potrebujete.

## Väzba na KomArena sortiment

Pri príprave draftu KomArena nemá publikovaný ZBDongle produkt. Preto tento článok zostáva poradenský a konkrétny koordinátor sa doplní až po zalistovaní a overení.

To zároveň zabráni tomu, aby obsah odporúčal koordinátor iba preto, že je populárny, bez obchodnej a technickej kontroly.

## Interné odkazy — návrh

- Draft 006 — prvá Zigbee sieť
- Home Assistant: https://komarena.sk/home-assistant/
- Protokoly a integrácie: https://komarena.sk/protokoly-a-integracie/
- Značky a kompatibilita: https://komarena.sk/smart-znacky/
- Draft 002 — Home Assistant Green

## CTA

Pred nákupom Zigbee koordinátora si najprv vyberte architektúru. Ak chcete jednoduchosť a priamu integráciu, začnite kontrolou ZHA. Ak už staviate na MQTT alebo potrebujete konkrétnu Zigbee2MQTT funkciu, overte podporu presných zariadení a adaptéra tam.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — ZHA: https://www.home-assistant.io/integrations/zha/
- Zigbee2MQTT — Getting started: https://www.zigbee2mqtt.io/guide/getting-started/
- Zigbee2MQTT — Supported adapters: https://www.zigbee2mqtt.io/guide/adapters/

## Open points

- Otvorený bod: po výbere KomArena Zigbee koordinátora overiť podporu v ZHA aj Zigbee2MQTT.
- Otvorený bod: doplniť samostatnú migračnú príručku iba po otestovaní na reálnom lab setup-e.
- Otvorený bod: pripraviť screenshotové porovnanie aktuálnych UI až tesne pred publikovaním.

## Facebook post

ZHA alebo Zigbee2MQTT? Odpoveď nie je „to, čo používa najviac ľudí“.

ZHA drží Zigbee priamo v Home Assistante. Zigbee2MQTT pridáva samostatný Zigbee stack a MQTT vrstvu. Obe cesty môžu fungovať dobre — rozhoduje váš koordinátor, zariadenia a to, koľko infraštruktúry chcete spravovať.

Celé porovnanie: [URL po publikovaní]

## Instagram caption

ZHA vs. Zigbee2MQTT: najprv architektúra, potom koordinátor. Nie opačne.

#komarena #homeassistant #zigbee #zha #zigbee2mqtt #smarthome

## Reels / Shorts idea

**Hook:** „ZHA alebo Zigbee2MQTT za 30 sekúnd?“

Ukázať dve jednoduché schémy:

- Zigbee → ZHA → Home Assistant,
- Zigbee → Zigbee2MQTT → MQTT → Home Assistant.

Potom tri rozhodovacie otázky: MQTT? konkrétna kompatibilita? jednoduchosť?

## Newsletter snippet

**Predmet:** ZHA alebo Zigbee2MQTT? Najprv si vyberte architektúru

Nové porovnanie vysvetľuje rozdiel bez fanúšikovských táborov. Pozrieme sa na koordinátor, MQTT, zariadenia, údržbu a situácie, v ktorých dáva každé riešenie väčší zmysel.
