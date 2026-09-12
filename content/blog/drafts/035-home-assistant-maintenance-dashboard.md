<!-- markdownlint-disable MD013 -->

# Draft 035 — Home Assistant maintenance dashboard

- **Status:** draft
- **Typ:** praktický monitoring / maintenance návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** ReSmart servis; Návody a projekty
- **Cieľová skupina:** používateľ Home Assistanta, ktorý chce mať technické problémy oddelené od rodinného dashboardu
- **Search intent:** informačný / praktický
- **Focus keyword:** Home Assistant maintenance dashboard

## SEO title

Home Assistant maintenance dashboard: batérie, unavailable a systém

## Meta description

Vytvorte maintenance prehľad pre Home Assistant: Repairs, unavailable zariadenia, batérie, disk, CPU a technické stavy bez chaosu na hlavnom dashboarde.

## H1

Home Assistant maintenance dashboard: čo sledovať, aby ste problém videli skôr než rodina

## Úvod

Rodinný dashboard má slúžiť na ovládanie domácnosti. Nemá byť zaplnený diagnostikou, percentami CPU, desiatkami batérií a technickými warningmi.

Na tieto informácie je vhodnejší samostatný **maintenance/admin dashboard**.

Jeho úloha je jednoduchá:

- ukázať, čo vyžaduje pozornosť,
- odhaliť trend pred výpadkom,
- zrýchliť troubleshooting,
- nezahltiť bežných používateľov.

## Začnite built-in Maintenance a Repairs

Aktuálny Home Assistant už poskytuje vlastné systémové a maintenance prehľady.

Repairs nájdete v:

**Settings → System → Repairs**

Ak built-in Maintenance dashboard pokrýva konkrétny problém, nevytvárajte jeho kompletnú ručnú kópiu iba preto, aby ste mali viac kariet.

Vlastný admin dashboard má skôr agregovať najdôležitejšie výnimky a odkazy na detail.

## Čo patrí na maintenance prehľad

Dobrý základ:

1. Repairs/issues,
2. unavailable zariadenia,
3. nízke batérie,
4. Home Assistant disk/CPU/RAM podľa dostupnosti,
5. backup stav,
6. kritické sieťové zariadenia,
7. ESPHome nodes, ktoré sú dlhšie offline,
8. update stav,
9. prípadne UPS/NAS stavy.

Nie všetko musí byť jedna karta. Dôležitejšia je informačná hierarchia.

## System Monitor: sledujte iba to, čo viete použiť

Oficiálna **System monitor** integrácia môže poskytovať senzory napríklad pre:

- disk usage,
- memory usage,
- CPU usage,
- network usage,
- running processes,
- processor temperature, ak ju hardware poskytuje.

Dôležité: tieto entity sú aktuálne označené ako diagnostic a sú predvolene vypnuté. Aktivujte iba tie, ktoré reálne potrebujete.

Nema zmysel zobrazovať 25 metrik len preto, že existujú.

## Disk je praktickejší než okamžitý CPU spike

Krátkodobý CPU spike pri update, backup alebo databázovej úlohe nemusí byť problém.

Oveľa užitočnejšie môže byť sledovať:

- rast využitia disku,
- veľkosť Recorder databázy,
- zlyhané backupy,
- dlhodobo vysokú memory pressure,
- opakujúce sa restarty.

Maintenance dashboard má ukazovať trendy a výnimky, nie produkovať ďalší šum.

## Unavailable zariadenia: rozlišujte kritické a nepodstatné

Nie každá unavailable entita znamená incident.

Napríklad:

- vypnutý testovací ESP32 môže byť očakávaný,
- sezónne zariadenie môže byť odpojené,
- mobilný tracker môže prirodzene miznúť,
- kritický termostat alebo koordinátor už incident je.

Preto využite Labels alebo inú organizáciu, aby ste odlíšili:

- kritické zariadenia,
- test/lab zariadenia,
- sezónne zariadenia.

Alert „1 unavailable“ bez kontextu nie je dobrá diagnostika.

## Batérie: neukazujte 70 percentuálnych kariet

Praktickejší model je:

- zoznam zariadení pod zvoleným prahom,
- počet batérií vyžadujúcich pozornosť,
- detailný zoznam až po rozkliknutí.

Presný prah nemusí byť rovnaký pre všetky zariadenia. Niektoré battery zariadenia reportujú percentá nepresne alebo skokovo.

Preto percento používajte ako servisný signál, nie laboratórne meranie zostávajúcej kapacity.

## Backup health

Maintenance workflow má odpovedať:

- vznikol posledný plánovaný backup?
- je uložený v požadovanej lokalite?
- zlyhala niektorá backup location?
- máte emergency kit mimo systému?

Emergency key samotný nikdy nezobrazujte na dashboarde.

Ak Home Assistant neposkytuje priamo všetky požadované entity pre váš backup setup, neobchádzajte bezpečnosť neoverenými custom skriptami iba kvôli jednej karte.

## Repairs ako priorita, nie dekorácia

Repair issue vzniká preto, že Home Assistant našiel problém vyžadujúci pozornosť.

Maintenance rutina:

1. nový repair issue si prečítať,
2. pochopiť dopad,
3. spraviť odporúčaný podporovaný krok,
4. overiť, že issue zmizlo,
5. až potom riešiť menej dôležité warningy.

## Update stavy

Na admin dashboard môže mať zmysel prehľad dostupných aktualizácií.

Ale samotné číslo „5 updates“ nie je dôvod aktualizovať všetko naraz.

Pred kritickým update stále platí:

- backup,
- relevantné release notes,
- vhodný čas na test,
- Repairs/Logs po update.

## Sieťová vrstva

Ak Home Assistant závisí od lokálnych zariadení, diagnostika môže sledovať dostupnosť kritických infraštruktúrnych bodov, napríklad:

- router,
- access point,
- NAS,
- ESPHome gateway/proxy,
- Zigbee/Thread bridge podľa architektúry.

Nie je cieľom pingovať každú žiarovku každých pár sekúnd. Sledujte body, ktorých výpadok vysvetľuje výpadok viacerých zariadení.

## ESPHome health

Pri ESPHome môže byť užitočné odlíšiť:

- device offline,
- Wi-Fi slabý signál,
- časté restarty,
- brownout/napájací problém,
- neaktuálny firmware iba vtedy, ak je update reálne potrebný.

Maintenance dashboard nemá byť náhradou ESPHome logu. Má ukázať, kam sa pozrieť.

## Jednoduché sekcie dashboardu

### Systém

- disk,
- memory,
- CPU trend,
- uptime/restart informácia podľa dostupnosti.

### Home Assistant health

- Repairs,
- updates,
- backups.

### Zariadenia

- kritické unavailable,
- nízke batérie.

### Sieť / infra

- router/AP/NAS alebo ďalšie kritické body.

### Build Lab

- ESPHome testovacie zariadenia oddelene od produkčných.

## Alert vs dashboard

Niektoré problémy nemáte objaviť až pri otvorení maintenance stránky.

Pre kritické podmienky môže mať zmysel notifikácia, napríklad:

- disk nad kritický prah,
- backup dlhodobo zlyháva,
- kritické zariadenie je offline dlhšie než tolerovaný čas.

Ale každá notifikácia musí mať jasnú akciu. Inak vznikne alert fatigue a používateľ ich začne ignorovať.

## Nealarmujte okamžitý výpadok každého zariadenia

Wi-Fi alebo batériový senzor môže krátko vypadnúť.

Pre notifikáciu je často vhodnejšie:

- používať oneskorenie,
- overiť, či problém pretrváva,
- notifikovať iba kritické zariadenia.

Jednosekundová unavailable udalosť nie je automaticky servisný incident.

## Maintenance review raz za týždeň

Aj bez komplikovaných alertov môžete raz týždenne skontrolovať:

- Repairs,
- Backups,
- disk,
- unavailable,
- batérie,
- pending updates,
- opakujúce sa error logy.

Päť minút pravidelnej údržby je lepších než riešenie desiatich zanedbaných warningov naraz.

## ReSmart servisný prínos

Ak klient pošle iba „smart home nefunguje“, diagnostika začína od nuly.

Ak má maintenance prehľad alebo aspoň tieto dáta:

- Repairs,
- unavailable kritické zariadenia,
- posledný backup,
- systémový disk,
- relevantný log,

servis môže rýchlejšie určiť vrstvu problému.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- ReSmart: https://komarena.sk/resmart/
- Draft 030 — Zálohy a obnova
- Draft 031 — Dashboard organizácia
- Draft 033 — Smart zariadenie offline
- Draft 034 — Bezpečný update
- Draft 023 — DHCP rezervácia vs statická IP

## CTA

Hlavný dashboard nechajte jednoduchý. Technické výnimky sústreďte do maintenance prehľadu a nastavte upozornenia iba tam, kde viete, čo po upozornení reálne urobíte.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Repairs: https://www.home-assistant.io/integrations/repairs/
- Home Assistant — System Monitor: https://www.home-assistant.io/integrations/systemmonitor/
- Home Assistant — Dashboards: https://www.home-assistant.io/dashboards/
- Home Assistant — Backups: https://www.home-assistant.io/common-tasks/general/

## Open points

- Otvorený bod: pred publikovaním vytvoriť vlastný anonymizovaný maintenance dashboard screenshot.
- Otvorený bod: overiť, ktoré backup/update stavy sú v aktuálnej KomArena testovacej HA inštalácii dostupné ako entity bez custom riešení.
- Otvorený bod: pripraviť nadväzujúci článok s konkrétnymi alert automations až po otestovaní YAML.

## Facebook post

Rodinný Home Assistant dashboard nemá vyzerať ako server monitoring.

Na batérie, unavailable zariadenia, Repairs, disk a backupy je lepší samostatný maintenance prehľad. Pripravili sme praktickú štruktúru bez desiatok zbytočných diagnostických kariet.

Celý článok: [URL po publikovaní]

## Instagram caption

Rodina potrebuje ovládanie. Admin potrebuje výnimky. Nedávajte oba dashboardy do jednej obrazovky.

#komarena #homeassistant #maintenance #dashboard #resmart

## Reels / Shorts idea

**Hook:** „Čo má byť na Home Assistant maintenance dashboarde?“

Ukázať:

1. Repairs,
2. unavailable critical,
3. batteries low,
4. disk/backup,
5. updates,
6. detail v logu.

## Newsletter snippet

**Predmet:** Home Assistant maintenance dashboard bez technického chaosu

Nový návrh oddeľuje systémové výnimky od rodinného ovládania a ukazuje, čo sledovať pri Repairs, unavailable zariadeniach, batériách, disku a backupoch.