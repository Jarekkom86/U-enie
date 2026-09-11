<!-- markdownlint-disable MD013 -->

# Draft 030 — Home Assistant zálohy a obnova

- **Status:** draft
- **Typ:** prevádzkový návod / disaster recovery
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; ReSmart servis
- **Cieľová skupina:** používateľ Home Assistanta, ktorý nechce prísť o konfiguráciu, automatizácie a integrácie pri poruche alebo migrácii
- **Search intent:** informačný / preventívny
- **Focus keyword:** Home Assistant záloha obnova

## SEO title

Home Assistant zálohy: automatické backupy, emergency kit a obnova

## Meta description

Ako nastaviť Home Assistant zálohy, uložiť ich mimo zariadenia, chrániť emergency kit a obnoviť systém po poruche alebo migrácii.

## H1

Home Assistant zálohy a obnova: čo nastaviť skôr, než systém raz nenabootuje

## Úvod

Home Assistant môže obsahovať stovky entít, automatizácie, integrácie, dashboardy a roky ladenia.

Ak je jediná záloha uložená na tom istom disku ako Home Assistant, pri poruche úložiska môžete prísť naraz o systém aj o zálohu.

Preto dobrý backup plán nerieši iba tlačidlo „Create backup“. Rieši aj:

- automatické vytváranie záloh,
- druhé úložisko,
- off-site kópiu,
- šifrovací emergency kit,
- obnovu po poruche,
- migráciu na nový hardware.

## Čo Home Assistant backup obsahuje

Aktuálna dokumentácia Home Assistant rozlišuje full a partial backup.

Full backup zahŕňa podľa podporovanej inštalácie okrem konfigurácie aj ďalšie systémové dáta, napríklad:

- `config`,
- `share`,
- ručne vytvorené alebo nainštalované apps dáta,
- `ssl`,
- `media`.

Partial backup umožňuje vybrať iba potrebné časti.

Pri veľkej inštalácii nie je vždy rozumné slepo zálohovať obrovské media alebo share priečinky, ak tým zbytočne rastie čas zálohy aj obnovy.

## Záloha nie je hotová, kým nie je mimo pôvodného disku

Lokálny backup je dobrý na rýchlu obnovu po zlej konfigurácii.

Nie je však dostatočný proti:

- fyzickému zlyhaniu SSD/SD/eMMC,
- poškodeniu zariadenia,
- strate alebo krádeži,
- chybe, ktorá zasiahne celé lokálne úložisko.

Home Assistant preto odporúča držať kópiu na inom systéme a ideálne aj off-site.

Praktický model:

1. lokálny backup pre rýchly rollback,
2. druhá kópia na NAS alebo inom úložisku,
3. off-site/cloud kópia pre havarijný scenár.

## Automatické zálohy

Aktuálne Home Assistant umožňuje automatické backupy priamo cez UI:

**Settings → System → Backups**

Pri nastavení vyberáte:

- frekvenciu,
- čas,
- počet uchovávaných záloh,
- obsah backupu,
- cieľové lokality,
- voliteľné zálohovanie pred aktualizáciou.

Pre bežnú domácnosť je pravidelný automatický backup výrazne bezpečnejší než spoliehanie sa na manuálnu disciplínu.

## Emergency kit je kritická súčasť recovery plánu

Home Assistant zálohy môžu byť šifrované. Na obnovu šifrovaného backupu potrebujete správny encryption key.

Home Assistant preto pri nastavovaní backupov poskytuje **backup emergency kit**.

Emergency kit:

- uložte mimo Home Assistant zariadenia,
- neukladajte iba do rovnakého NAS adresára ako jedinú zálohu,
- chráňte ho ako citlivý recovery údaj,
- nezverejňujte ho v GitHub repozitári, dokumentácii ani screenshotoch.

Záloha bez dostupného dešifrovacieho kľúča môže byť v krízovej situácii nepoužiteľná.

## Koľko záloh uchovávať

Jedna najnovšia záloha nie je vždy dosť.

Ak sa chyba dostane do konfigurácie a všimnete si ju až o niekoľko dní, všetky najnovšie backupy môžu obsahovať rovnaký problém.

Rozumnejší model je mať viac bodov v čase, napríklad:

- niekoľko denných backupov,
- jednu staršiu týždennú alebo mesačnú kópiu podľa možností úložiska,
- extra manuálny backup pred väčšou migráciou.

Konkrétny retention plán závisí od veľkosti inštalácie a dostupného priestoru.

## Backup pred aktualizáciou

Home Assistant umožňuje nastaviť automatický backup pred update.

To dáva zmysel najmä pred:

- Core update,
- OS/Supervisor zmenou podľa typu inštalácie,
- aktualizáciou kritickej app,
- väčšou zmenou Zigbee/Matter/Thread infraštruktúry,
- migráciou na nový disk alebo hardware.

Backup však nenahrádza čítanie breaking changes a release notes.

## Pozor na veľkú databázu

Home Assistant Recorder databáza môže backup výrazne zväčšiť.

Pred veľkou migráciou skontrolujte:

- odhadovanú veľkosť databázy,
- počet dní histórie,
- nepoužívané apps,
- media/share obsah, ktorý nemusí byť súčasťou recovery backupu.

Cieľom nie je vymazať dáta naslepo. Cieľom je vedieť, prečo má backup veľkosť napríklad 500 MB alebo 15 GB.

## Ako otestovať, že backup systém reálne funguje

Nie je potrebné každý týždeň ničiť produkčnú inštaláciu.

Ale minimálne kontrolujte:

- či sa automatické backupy reálne vytvárajú,
- či sa zapisujú do všetkých zvolených lokalít,
- či máte dostupný emergency kit,
- či viete backup stiahnuť,
- či máte zdokumentovaný restore postup.

Najlepšia záloha je tá, ktorú viete nájsť a použiť pod stresom.

## Obnova na rovnakom systéme

Home Assistant umožňuje obnoviť backup cez:

**Settings → System → Backups**

Pri restore vyberáte, ktoré časti chcete obnoviť.

Dôležité: obnovenie môže prepísať aktuálne dáta. Pred restore preto presne vedzte, čo obnovujete a z akého dátumu backup pochádza.

## Migrácia na nový hardware

Backup možno použiť aj počas onboarding procesu nového Home Assistant zariadenia.

To je praktické pri migrácii napríklad:

- na nový miniPC,
- z Raspberry Pi na iné zariadenie,
- po výmene poškodeného disku,
- na nový Home Assistant appliance.

Cieľový hardware nemusí byť identický s pôvodným.

## Rádio nie je iba súbor v backupe

Ak používate fyzické USB rádia alebo koordinátory, backup konfigurácie nie je automaticky náhradou fyzického zariadenia.

Pri migrácii skontrolujte napríklad:

- Zigbee koordinátor,
- Z-Wave rádio,
- Thread adapter,
- USB cestu/serial identifikáciu,
- či nové zariadenie používa iné integrované rádio.

Home Assistant dokumentácia pri migrácii explicitne upozorňuje, že rádia treba pripojiť k novému zariadeniu a pri zmene Zigbee rádia môže byť potrebná migrácia Zigbee siete.

## Recovery dokument mimo Home Assistanta

Ak Home Assistant úplne nenabootuje, dashboard s návodom „ako ho obnoviť“ vám nepomôže.

Majte mimo systému krátky recovery dokument:

- kde sú backupy,
- kde je emergency kit,
- aký hardware Home Assistant používa,
- aké USB rádia sú pripojené,
- základná IP/hostname informácia,
- poradie obnovy.

Bez hesiel a citlivých tokenov v obyčajnom verejnom texte.

## ReSmart pohľad: kedy už neexperimentovať

Ak systém po aktualizácii nenabootuje, neopravujte naraz:

- disk,
- databázu,
- sieť,
- rádio,
- konfiguráciu.

Najprv oddeľte:

1. hardware/storage problém,
2. boot problém,
3. Home Assistant problém,
4. integračný problém.

Ak máte funkčný backup a recovery plán, diagnostika je výrazne bezpečnejšia.

## Minimálny backup checklist

- automatický backup je zapnutý,
- backup sa ukladá aj mimo Home Assistant disku,
- emergency kit je bezpečne uložený,
- retention drží viac než jeden bod v čase,
- pred veľkým update sa vytvorí čerstvý backup,
- viete, kde backup nájdete bez funkčného Home Assistanta,
- fyzické rádia sú zdokumentované,
- restore postup ste aspoň raz prešli v dokumentácii.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- ReSmart: https://komarena.sk/resmart/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 023 — DHCP rezervácia vs statická IP
- Draft 025 — Zariadenie sa neobjavilo automaticky
- Draft 028 — Ako naplánovať Home Assistant domácnosť bez zbytočných hubov
- budúci článok: bezpečný update Home Assistanta a rollback

## CTA

Backup nastavte v deň, keď Home Assistant funguje — nie v deň, keď prestane bootovať. Automatický backup, druhá lokalita a bezpečne uložený emergency kit sú základ recovery plánu.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Common tasks / Backups: https://www.home-assistant.io/common-tasks/general/

## Open points

- Otvorený bod: pred publikovaním spraviť screenshot aktuálnej stránky Settings → System → Backups bez citlivých údajov.
- Otvorený bod: pripraviť samostatný článok o recovery po zlyhaní disku vs. po chybnej aktualizácii.
- Otvorený bod: ak KomArena začne ponúkať Home Assistant servis/migrácie, pridať ReSmart CTA až podľa reálneho procesu služby.

## Facebook post

Home Assistant backup uložený iba na tom istom disku nie je kompletný recovery plán.

Nový návod vysvetľuje automatické zálohy, off-device/off-site kópie, emergency kit a čo si pripraviť pred migráciou alebo poruchou.

Celý článok: [URL po publikovaní]

## Instagram caption

Backup je užitočný iba vtedy, keď ho po poruche viete nájsť, odomknúť a obnoviť.

#komarena #homeassistant #backup #smarthome #resmart

## Reels / Shorts idea

**Hook:** „Máte Home Assistant backup? A je na inom disku?“

Ukázať:

1. Settings → Backups,
2. lokálny backup,
3. druhú lokalitu,
4. emergency kit,
5. restore onboarding obrazovku.

## Newsletter snippet

**Predmet:** Home Assistant záloha nie je hotová, kým ju neviete obnoviť

Pripravili sme recovery checklist: automatické backupy, druhé úložisko, emergency kit, retention a migrácia na nový hardware.