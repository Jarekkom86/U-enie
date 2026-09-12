<!-- markdownlint-disable MD013 -->

# Draft 031 — Ako si usporiadať Home Assistant dashboard

- **Status:** draft
- **Typ:** UX / praktický Home Assistant návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Smart domácnosť
- **Cieľová skupina:** používateľ, ktorému Home Assistant dashboard časom prerástol do neprehľadnej steny kariet
- **Search intent:** informačný / praktický
- **Focus keyword:** Home Assistant dashboard

## SEO title

Home Assistant dashboard: ako si usporiadať prehľad bez chaosu

## Meta description

Ako organizovať Home Assistant dashboardy podľa miestností, funkcií a používateľov. Sections, views, built-in dashboardy a praktické pravidlá UX.

## H1

Ako si usporiadať Home Assistant dashboard, aby sa z neho nestal chaos

## Úvod

Home Assistant vie zobraziť skoro všetko. To však neznamená, že všetko má byť na jednej obrazovke.

Keď sa na hlavnom dashboarde postupne objaví každá teplota, batéria, zásuvka, automatizácia, helper a debug senzor, výsledok prestane byť užitočný pre bežné ovládanie.

Dobrý dashboard má odpovedať na jednoduchú otázku:

**Čo potrebuje tento používateľ vidieť alebo ovládať práve teraz?**

## Home dashboard vs vlastný dashboard

Aktuálny Home Assistant poskytuje built-in dashboardy a umožňuje vytvoriť vlastné dashboardy.

Home Dashboard automaticky využíva Areas a skupiny entít a aktualizuje sa spolu s domácnosťou.

Ak chcete vlastný dizajn, Home Assistant odporúča vytvoriť nový dashboard namiesto toho, aby ste silou prerábali built-in prehľad.

To má praktickú výhodu:

- systémové/built-in prehľady zostanú dostupné,
- vlastný dashboard môžete meniť bez straty referenčného pohľadu,
- pre rôznych používateľov môžete mať rôzne default dashboardy.

## Najprv upracte Areas a entity

Dashboard chaos často nevzniká v dashboarde. Vzniká už v zlom pomenovaní a nepriradených zariadeniach.

Pred dizajnom preto skontrolujte:

- Floors,
- Areas,
- názvy Devices,
- názvy Entities,
- Labels,
- zariadenia bez area.

Ak máte `sensor.temperature_2`, `sensor.temp_new` a `sensor.ble_ab12`, žiadna karta z toho neurobí intuitívny systém.

## Sections je dnes bezpečný default

Aktuálny Home Assistant používa **Sections** ako default view typ.

Sections umožňuje rozdeliť karty do zrozumiteľných skupín a pracuje s grid layoutom.

Ďalšie view typy zahŕňajú:

- Masonry,
- Panel,
- Sidebar.

Pre nový všeobecný dashboard je Sections dobrý východiskový bod. Panel sa hodí napríklad pre jednu veľkú mapu alebo špecializovaný full-width obsah.

## Jedna obrazovka = jedna úloha

Nemiešajte na jednej hlavnej obrazovke:

- rýchle každodenné ovládanie,
- diagnostiku siete,
- batérie všetkých zariadení,
- detailné grafy,
- servisné entity,
- testovacie helpery.

Rozdeľte ich podľa použitia.

Príklad:

### Home

- hlavné svetlá,
- klíma,
- otvorené dvere/okná,
- alarm/security stav,
- najdôležitejšie upozornenia.

### Rooms

Detailné ovládanie podľa miestností.

### Energy

Spotreba, výroba, zásuvky s meraním.

### Maintenance

Batérie, unavailable zariadenia, servisné stavy.

### Lab

ESPHome testy, debug senzory a technické entity.

## Built-in dashboardy využívajte namiesto duplicity

Home Assistant už poskytuje viacero špecializovaných built-in dashboardov, napríklad pre:

- Energy,
- Lights,
- Security,
- Climate,
- Maintenance,
- History,
- Activity.

Ak existujúci built-in dashboard rieši problém dobre, netreba jeho obsah ručne kopírovať na hlavný dashboard.

Hlavný dashboard môže namiesto toho ukazovať iba výnimku alebo skratku.

Príklad:

- nie zoznam 40 batérií,
- ale upozornenie „3 zariadenia majú nízku batériu“ a link na Maintenance dashboard.

## Vytvorte dashboard podľa používateľa

Technický dashboard majiteľa domu a dashboard pre rodinu nemusia byť rovnaké.

Home Assistant umožňuje mať viac dashboardov a nastaviť default dashboard podľa používateľa.

Praktické rozdelenie:

### Rodina

- veľké jednoduché ovládanie,
- miestnosti,
- minimum diagnostiky,
- žiadne nejasné technické entity.

### Admin

- systémové stavy,
- unavailable zariadenia,
- technické senzory,
- servisné informácie.

### Wall tablet

- veľké dotykové prvky,
- minimum scrollovania,
- lokálne relevantné ovládanie,
- vhodný default dashboard pre samostatný tablet user profil.

## Nedávajte všetko na prvú view

Prvá view má byť rýchla.

Dobrá prvá obrazovka často obsahuje iba:

- čo je zapnuté,
- čo je otvorené,
- čo vyžaduje pozornosť,
- 3–6 najčastejších ovládacích prvkov,
- základný stav teploty/klímy.

Detail môže byť o jedno kliknutie ďalej.

## Karty vyberajte podľa rozhodnutia, nie podľa efektu

Pýtajte sa:

- Potrebujem vidieť stav alebo ovládať?
- Potrebujem trend alebo iba aktuálnu hodnotu?
- Potrebujem jednu entitu alebo celú area?
- Je táto informácia dôležitá stále, alebo iba pri probléme?

Graf teploty za 24 hodín je užitočný pri ladení kúrenia. Nemusí byť dominantný na rodinnom home dashboarde.

## Area-based dizajn škáluje lepšie

Ak máte správne Areas, môžete dashboard stavať podľa miestností:

- Obývačka,
- Kuchyňa,
- Spálňa,
- Chodba,
- Technická miestnosť,
- Exteriér.

Výhoda je, že používateľ rozmýšľa prirodzene podľa priestoru, nie podľa výrobcu zariadenia.

Lepšie:

**Kuchyňa → svetlá, teplota, okno, zásuvky**

Horšie:

**Aqara → Shelly → ESPHome → Tuya → Sonoff**

Značka je dôležitá pre servis, nie pre každodenné ovládanie rodiny.

## Labels sú vhodné pre priečne skupiny

Nie všetko patrí do jednej area.

Labels môžete použiť napríklad na:

- kritické zariadenia,
- batériové zariadenia,
- ReSmart monitoring,
- testovacie ESPHome zariadenia,
- zariadenia na UPS,
- exteriérové prvky.

Tým nemusíte rozbíjať priestorovú štruktúru Areas.

## Dashboard nemá byť servisný log

Ak karta ukazuje niečo, čomu rozumiete iba vy po päťminútovom vysvetlení, pravdepodobne patrí do admin/diagnostic view.

Rodinný dashboard má používať:

- ľudské názvy,
- zrozumiteľné ikony,
- minimum technických jednotiek bez kontextu,
- jasné ovládacie prvky.

## Mobil vs tablet vs desktop

Rovnaký dashboard môže byť použiteľný na desktope a nepríjemný na mobile.

Pri návrhu kontrolujte:

- počet kariet nad foldom,
- veľkosť tap targetov,
- scrollovanie,
- duplicitu informácií,
- či najčastejšie ovládanie nie je schované na tretej view.

Pre wall tablet môže mať zmysel samostatný dashboard a user profil.

## Keď dashboard rastie, nepridávajte automaticky ďalšiu kartu

Pred pridaním novej karty sa opýtajte:

1. Je táto informácia potrebná každý deň?
2. Patrí na hlavný dashboard alebo do detailu?
3. Už ju nezobrazuje built-in dashboard?
4. Je to stav, výnimka alebo diagnostika?
5. Môže sa zobraziť iba pri probléme?

Každá karta má mať dôvod.

## Praktická štruktúra KomArena modelového dashboardu

### View 1 — Domov

- rýchly stav domácnosti,
- hlavné svetlá,
- klíma,
- otvorené vstupy,
- kritické upozornenia.

### View 2 — Miestnosti

Sections podľa Areas.

### View 3 — Energia

Link/prehľad relevantných spotrieb a Energy dashboardu.

### View 4 — Údržba

- unavailable,
- batérie,
- update stavy,
- servisné alarmy.

### View 5 — Build Lab

- ESPHome testy,
- senzory,
- diagnostické entity,
- prototypy.

## Čo nerobiť

### Každá entita na dashboard

Entity registry nie je dashboard.

### Organizácia podľa značiek

Používateľ chce zapnúť kuchynské svetlo, nie otvoriť „vendor page“.

### Jedna mega-view

Ak musíte 12-krát scrollovať, informačná hierarchia zlyhala.

### Custom card na každý problém

Najprv využite natívne karty a Sections. Custom karty pridávajú ďalšiu vrstvu údržby.

### Dashboard ako náhrada automatizácie

Ak každý večer ručne stláčate päť rovnakých tlačidiel, problém možno nie je dashboard, ale chýbajúca automatizácia alebo scene.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 024 — Ako pomenovať zariadenia a entity
- Draft 026 — Prvá automatizácia
- Draft 029 — Pohyb → podmienka → svetlo
- Draft 030 — Zálohy a obnova

## CTA

Najprv upracte Areas, Devices a Entities. Až potom stavajte dashboard. Dobré pomenovanie a informačná hierarchia urobia pre použiteľnosť viac než desať efektných custom kariet.

## Zdroje a overenie

Overené 11. 9. 2026 proti Home Assistant 2026.9 dokumentácii:

- Home Assistant — Dashboards: https://www.home-assistant.io/dashboards/
- Home Assistant — Dashboard views: https://www.home-assistant.io/dashboards/views/
- Home Assistant — Multiple dashboards: https://www.home-assistant.io/dashboards/dashboards/
- Home Assistant 2026.2 — Home/Overview dashboard changes: https://www.home-assistant.io/blog/2026/02/04/release-20262/

## Open points

- Otvorený bod: pred publikovaním spraviť vlastný KomArena screenshot Sections dashboardu na mobile a desktope.
- Otvorený bod: pripraviť samostatný článok „maintenance dashboard pre batérie, unavailable a updates“.
- Otvorený bod: znovu overiť názvy built-in dashboardov v deň publikácie, pretože UI Home Assistanta sa aktívne vyvíja.

## Facebook post

Home Assistant dashboard nie je zoznam všetkých entít.

Keď každú novú vec pridáte na hlavnú obrazovku, po roku z nej vznikne servisný panel, ktorý rodina nechce používať. V novom návode ukazujeme Areas, Sections, viac dashboardov a jednoduchú informačnú hierarchiu.

Celý článok: [URL po publikovaní]

## Instagram caption

Najlepší dashboard nie je ten s najviac kartami. Je to ten, kde používateľ nájde správnu vec bez rozmýšľania.

#komarena #homeassistant #dashboard #smarthome #ux

## Reels / Shorts idea

**Hook:** „Máte 40 kariet na Home Assistant hlavnej obrazovke?“

Ukázať:

1. preplnený dashboard,
2. Areas,
3. Sections,
4. jednoduchý Home view,
5. samostatný Maintenance view.

## Newsletter snippet

**Predmet:** Home Assistant dashboard bez chaosu

Nový návod ukazuje, čo patrí na Home view, čo do miestností, čo do Maintenance a prečo je organizácia Areas dôležitejšia než efektné custom karty.