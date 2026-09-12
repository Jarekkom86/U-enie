<!-- markdownlint-disable MD013 -->

# Draft 022 — Lokálna vs. cloudová smart domácnosť

- **Status:** draft
- **Typ:** poradca / architektúra smart domácnosti
- **Primárna kategória:** Smart domácnosť
- **Sekundárne kategórie:** Home Assistant & ESPHome; Návody a projekty
- **Cieľová skupina:** používateľ, ktorý vyberá zariadenia a chce vedieť, čo bude fungovať bez internetu
- **Search intent:** informačný / komerčný
- **Focus keyword:** lokálna smart domácnosť

## SEO title

Lokálna vs cloudová smart domácnosť: čo funguje bez internetu

## Meta description

Lokálna alebo cloudová smart domácnosť? Praktické porovnanie odozvy, súkromia, výpadkov internetu, vzdialeného prístupu a Home Assistant integrácií.

## H1

Lokálna vs. cloudová smart domácnosť: čo sa zmení, keď vypadne internet

## Úvod

Pri smart domácnosti sa často rieši značka, aplikácia alebo cena zariadenia. Oveľa dôležitejšia otázka je, **kadiaľ ide príkaz**, keď stlačíte tlačidlo alebo sa spustí automatizácia.

Ak zariadenie komunikuje lokálne, príkaz môže zostať vo vašej domácej sieti. Ak je závislé od cloudu výrobcu, komunikácia môže prejsť cez internet aj vtedy, keď je zariadenie fyzicky pár metrov od Home Assistanta.

Ani jeden model nie je automaticky „dobrý“ alebo „zlý“. Rozdiel je v tom, aké riziká, výhody a závislosti prijímate.

## Rýchla odpoveď

**Lokálne riešenie** je vhodné, keď chcete rýchlu odozvu, funkčnosť pri výpadku internetu a menšiu závislosť od cudzej služby.

**Cloudové riešenie** môže byť jednoduchšie na prvé sprevádzkovanie a vzdialený prístup, ale jeho fungovanie závisí od internetu a dostupnosti služby výrobcu.

Home Assistant dokáže oba svety kombinovať. Kľúčové je vedieť, ktoré konkrétne integrácie sú lokálne a ktoré cloudové.

## Ako vyzerá lokálna komunikácia

Pri lokálnej integrácii komunikuje Home Assistant so zariadením vo vašej domácej sieti alebo cez lokálny rádiový protokol.

Príklady technológií, ktoré môžu fungovať lokálne:

- ESPHome,
- Zigbee,
- Z-Wave,
- lokálne Matter/Thread riešenia podľa konkrétnej architektúry,
- lokálne Wi-Fi/LAN API zariadenia.

Oficiálna dokumentácia Home Assistant uvádza, že keď to zariadenie podporuje, Home Assistant s ním komunikuje priamo a lokálne protokoly nemusia pre základnú komunikáciu potrebovať internet.

To však neznamená, že každé zariadenie používajúce Wi-Fi je lokálne. Wi-Fi je iba transport. Zariadenie môže cez Wi-Fi komunikovať výhradne s cloudom výrobcu.

## Ako vyzerá cloudová komunikácia

Pri cloudovej integrácii môže byť cesta napríklad:

**Home Assistant → internet → cloud výrobcu → zariadenie**

alebo aplikácia výrobcu používa cloud ako riadiacu vrstvu a Home Assistant komunikuje s tým istým účtom cez API.

Praktické dôsledky:

- pri výpadku internetu môže časť funkcií prestať fungovať,
- zmena alebo ukončenie cloudovej služby môže ovplyvniť integráciu,
- odozva môže byť závislá od vzdialenej infraštruktúry,
- zariadenie môže vyžadovať účet výrobcu.

Cloudová integrácia však môže byť úplne legitímna voľba, ak výrobca neposkytuje lokálne API a používateľ prijíma túto závislosť.

## Local Push, Local Polling a Cloud

Pri Home Assistant integráciách je užitočné sledovať spôsob komunikácie.

### Local Push

Zariadenie alebo lokálny server posiela zmeny Home Assistantu bez potreby pravidelného dotazovania.

Typicky to prináša veľmi rýchlu odozvu.

### Local Polling

Home Assistant sa zariadenia pravidelne pýta na aktuálny stav v lokálnej sieti.

Je to stále lokálna komunikácia, iba s iným spôsobom aktualizácie stavu.

### Cloud Push / Cloud Polling

Komunikácia ide cez internetovú službu. Rozdiel je v tom, či cloud zmeny posiela, alebo sa Home Assistant pravidelne dotazuje.

Pre zákazníka je často dôležitejší rozdiel **lokálne vs. internetová závislosť** než samotné push/polling.

## Príklad: BleBox wLightBox v3

KomArena má konkrétny príklad zariadenia, pri ktorom je lokálna integrácia overená.

BleBox wLightBox v3 používa oficiálnu Home Assistant integráciu BleBox devices s lokálnym pollingom. Bežné ovládanie v Home Assistante tak nemusí ísť cez vzdialený cloud výrobcu.

Produkt:

https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/

Súvisiaci produkčný článok:

https://komarena.sk/blebox-wlightbox-v3-home-assistant-lokalne-led/

Toto je presne typ informácie, ktorý má byť pri technickom produkte uvedený explicitne: nie iba „Home Assistant kompatibilné“, ale **akým spôsobom integrácia komunikuje**.

## Čo sa stane pri výpadku internetu

### Lokálna automatizácia

Ak sú všetky potrebné komponenty lokálne a domáca sieť funguje, automatizácia môže pokračovať aj bez prístupu na internet.

Príklad:

- lokálny pohybový senzor,
- Home Assistant doma,
- lokálne ovládané svetlo.

### Cloudové zariadenie

Ak je riadenie závislé od API výrobcu, výpadok internetu môže znamenať, že Home Assistant nedostane stav alebo nevie odoslať príkaz.

### Zmiešaný systém

Najčastejší reálny systém je hybridný. Kritické funkcie môžu byť lokálne a menej dôležité služby cloudové.

To je často praktickejšie než dogmaticky odmietnuť všetky cloudové zariadenia.

## Lokálne neznamená automaticky bezpečné

Lokálna komunikácia znižuje niektoré závislosti, ale nevyrieši všetku bezpečnosť.

Stále potrebujete:

- aktualizovať Home Assistant a zariadenia,
- používať silné heslá,
- zapnúť viacfaktorové overenie pre Home Assistant účet,
- neotvárať zbytočne porty z internetu,
- rozumne spravovať domácu sieť.

Home Assistant dokumentácia pri vzdialenom prístupe uvádza Home Assistant Cloud ako jednoduchú a bezpečnú cestu pre väčšinu používateľov. Alternatívou môže byť VPN alebo správne navrhnutý reverse proxy. Samotné otvorenie portu bez zabezpečenia nie je vhodná skratka.

## Potrebujem vzdialený prístup, ak chcem lokálnu domácnosť?

Nie. Lokálnosť zariadení a vzdialený prístup do Home Assistanta sú dve odlišné témy.

Môžete mať:

- kompletne lokálne zariadenia,
- a voliteľný bezpečný vzdialený prístup do Home Assistanta.

Home Assistant Cloud je voliteľná vrstva. Zapnutie vzdialeného prístupu nemení automaticky lokálne zariadenia na cloudové zariadenia.

## Čo overovať pred nákupom smart zariadenia

Pred kúpou si položte tieto otázky:

1. Existuje oficiálna Home Assistant integrácia?
2. Aký IoT class / spôsob komunikácie používa?
3. Potrebuje účet výrobcu?
4. Funguje základné ovládanie bez internetu?
5. Je možné zariadeniu rezervovať stabilnú IP alebo ho lokálne objaviť?
6. Čo sa stane, ak výrobca zmení cloudové API?
7. Potrebujem samostatný hub alebo rádiový adaptér?

Takýto checklist je hodnotnejší než všeobecné označenie „smart“.

## Praktický návrh architektúry

Pre bežnú domácnosť dáva zmysel:

- kritické svetlá, senzory a automatizácie držať čo najviac lokálne,
- cloud používať tam, kde prináša reálnu hodnotu,
- vzdialený prístup riešiť samostatne a bezpečne,
- nekupovať viac hubov len preto, že zariadenia majú rôzne logá.

Home Assistant potom funguje ako integračná vrstva medzi rôznymi technológiami.

## KomArena prepojenie

- Home Assistant hub: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- BleBox wLightBox v3: https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 003 — Prvý ESPHome projekt s ESP32
- budúci článok — Wi-Fi, Zigbee, Thread a Matter bez marketingového chaosu

## Záver

Najlepšia smart domácnosť nie je tá, ktorá je „100 % lokálna“ na papieri. Je to systém, pri ktorom viete, **ktoré funkcie sú lokálne, ktoré závisia od internetu a prečo**.

Home Assistant dáva možnosť tieto vrstvy kombinovať. Pri výbere zariadení preto sledujte spôsob komunikácie, nie iba logo kompatibility.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Privacy FAQ: https://www.home-assistant.io/faq/is-my-data-private/
- Home Assistant — Remote access: https://www.home-assistant.io/docs/configuration/remote/
- Home Assistant — Concepts and terminology: https://www.home-assistant.io/getting-started/concepts-terminology/
- Home Assistant — Securing: https://www.home-assistant.io/docs/configuration/securing/
- Home Assistant — BleBox integration: https://www.home-assistant.io/integrations/blebox/

## Open points

- Otvorený bod: pred publikovaním skontrolovať live permalink a stav BleBox produktu.
- Otvorený bod: vytvoriť jednoduchú architektonickú ilustráciu „local vs cloud path“ bez konkrétnych cloudových značiek.
- Otvorený bod: inbound link pridať z produkčného BleBox článku až pri schválenom publikačnom kroku.

## Facebook post

Keď vypadne internet, čo vo vašej smart domácnosti zostane fungovať?

Rozdiel nie je v tom, či zariadenie používa Wi-Fi alebo Zigbee. Dôležité je, či Home Assistant komunikuje priamo lokálne alebo cez cloud výrobcu.

V článku ukazujeme Local Push, Local Polling, cloudové integrácie aj praktický lokálny príklad s BleBox.

Celý článok: [URL po publikovaní]

## Instagram caption

Wi-Fi neznamená cloud a „Home Assistant compatible“ neznamená automaticky lokálne. Pred nákupom sledujte spôsob komunikácie, nie iba logo.

#komarena #homeassistant #smarthome #lokalnesmarthome #esphome #blebox

## Reels / Shorts idea

**Hook:** „Internet vypadol. Ktoré smart zariadenia vám ešte fungujú?“

Ukázať dve cesty:

1. Home Assistant → lokálna sieť → zariadenie,
2. Home Assistant → internet → cloud → zariadenie,
3. odpojenie WAN,
4. lokálne svetlo stále reaguje,
5. vysvetlenie hybridného systému.

## Newsletter snippet

**Predmet:** Lokálne alebo cloudové? Rozhoduje cesta príkazu

Nový článok vysvetľuje, čo sa pri smart zariadení deje pri výpadku internetu a ako Home Assistant kombinuje lokálne a cloudové integrácie bez zbytočných sloganov.