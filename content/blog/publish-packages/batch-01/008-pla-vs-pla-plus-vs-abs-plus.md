<!-- markdownlint-disable MD013 -->

# WordPress payload — 008

- **Status:** ready-for-review
- **Post title:** PLA vs PLA+ vs ABS+: ktorý filament vybrať
- **Slug:** `pla-vs-pla-plus-vs-abs-plus`
- **Excerpt:** PLA, PLA+ alebo ABS+? Praktické porovnanie jednoduchosti tlače, húževnatosti, tepelného použitia a nárokov na tlačiareň.
- **Primárna kategória:** 3D tlač
- **Sekundárna kategória:** Produkty, testy a porovnania
- **Tags:** PLA; PLA+; ABS+; eSUN; 3D tlač
- **SEO title:** PLA vs PLA+ vs ABS+: ktorý filament vybrať na 3D tlač
- **Meta description:** PLA, PLA+ alebo ABS+? Praktické porovnanie tlačiteľnosti, húževnatosti, tepla, warping-u a vhodnosti pre modely, držiaky a kryty.
- **Focus keyword:** PLA vs PLA+ vs ABS+
- **Schema article type:** Article
- **Canonical:** default vlastný permalink
- **Robots:** index, follow
- **Featured image brief:** `featured-images.md#008`

# PLA vs PLA+ vs ABS+: ako vybrať filament podľa použitia

Pri výbere filamentu je lepšie pýtať sa **na čo má hotový diel slúžiť** než hľadať jeden univerzálne „najlepší“ materiál.

Dekoratívny model, krabička elektroniky a dielenský držiak majú rozdielne priority. PLA, PLA+ a ABS+ preto predstavujú odlišné kompromisy medzi jednoduchosťou tlače, mechanickými vlastnosťami, teplotou a nárokmi na tlačiareň.

## Rýchle porovnanie

### PLA

- **Jednoduchosť tlače:** veľmi dobrá.
- **Warping:** nízky.
- **Funkčné diely:** skôr ľahšie použitie.
- **Vyššia teplota:** obmedzené použitie.
- **Uzavretá komora:** bežne nie.
- **Vetranie:** bežné pracovné podmienky.

### PLA+

- **Jednoduchosť tlače:** dobrá až veľmi dobrá.
- **Warping:** zvyčajne nízky.
- **Funkčné diely:** praktický univerzál.
- **Vyššia teplota:** stále obmedzená podľa konkrétnej formulácie.
- **Uzavretá komora:** bežne nie.
- **Vetranie:** bežné pracovné podmienky.

### ABS+

- **Jednoduchosť tlače:** náročnejšia.
- **Warping:** vyššie riziko.
- **Funkčné diely:** technickejšie použitie.
- **Vyššia teplota:** vhodnejší smer než PLA/PLA+.
- **Uzavretá komora:** pri eSUN ABS+ odporúčaná.
- **Vetranie:** zvýšená pozornosť.

Presné vlastnosti sa líšia podľa konkrétnej formulácie a výrobcu.

## PLA: jednoduchý referenčný materiál

PLA je vhodný na:

- vizuálne modely,
- prototypy,
- dekorácie,
- organizéry,
- diely bez výraznej tepelnej záťaže.

Jeho výhodou je jednoduché spracovanie a nízka tendencia k warping-u. Slabšou stránkou býva vyššia teplota alebo náročnejšie mechanické použitie.

## PLA+: keď chcete jednoduchý workflow a väčšiu rezervu

PLA+ nie je jeden univerzálny štandard s presne rovnakou receptúrou u všetkých výrobcov.

Pri aktuálnom eSUN PLA+ výrobca uvádza odporúčané nastavenia približne:

- tryska **210–230 °C**,
- podložka **45–60 °C**,
- ventilátor **100 %**,
- pri navlhnutom materiáli sušenie **50 °C približne 8–12 hodín**.

PLA+ je praktický na:

- držiaky,
- krabičky elektroniky v bežnom interiéri,
- funkčné prototypy,
- organizačné diely,
- modely, pri ktorých chcete väčšiu húževnatosť než pri základnom PLA.

Vyššia húževnatosť však automaticky neznamená vysokú tepelnú odolnosť.

## ABS+: technickejší materiál s vyššími nárokmi

Aktuálny eSUN ABS+ používa vyššie tlačové teploty:

- tryska približne **230–270 °C**,
- podložka **95–110 °C**,
- ventilátor **0 %**,
- výrobca odporúča tlač v uzavretej komore.

ABS+ preto dáva väčší zmysel tam, kde potrebujete funkčný technický diel a ste pripravení na náročnejšie tlačové podmienky.

Pri ABS/ABS+ zabezpečte vhodné vetranie pracoviska a riaďte sa bezpečnostnou dokumentáciou výrobcu.

## Ako vybrať podľa projektu

### Dekorácia alebo vizuálny model

Začnite PLA alebo PLA+.

### Krabička pre ESP32 v interiéri

PLA+ je často rozumný kompromis, ak krabička nebude pri zdroji výrazného tepla.

### Dielenský držiak

Pri miernom zaťažení môže stačiť PLA+. Pri vyššom teple alebo mechanickom namáhaní môže byť vhodnejší ABS+.

### Diel v aute alebo pri zdroji tepla

Bežné PLA a PLA+ posudzujte opatrne. Materiál vyberajte podľa reálnych teplotných podmienok a údajov výrobcu.

### Veľký diel

Pri ABS+ rastie význam stabilného tepelného prostredia a kontroly warping-u. Ak tlačiareň nemá vhodné podmienky, materiálová výhoda môže byť vykúpená problémovou tlačou.

## Prečo neexistuje jedna správna teplota

Výsledok ovplyvňuje:

- konkrétny filament,
- hotend a tryska,
- rýchlosť tlače,
- chladenie,
- podložka,
- konštrukcia tlačiarne.

Začnite rozsahom výrobcu a profil dolaďujte podľa reálneho výsledku.

## Skladovanie

Filament môže časom absorbovať vlhkosť. Prejavom môže byť syčanie pri extrúzii, horší povrch alebo vyšší stringing.

Materiál skladujte v suchu a pri sušení používajte teplotu odporúčanú pre konkrétnu formuláciu. Jedna teplota neplatí pre všetky filamenty.

## Čo by som vybral

- **PLA:** jednoduchý model alebo prototyp bez zvýšenej tepelnej záťaže.
- **PLA+:** univerzálnejší materiál na modely aj funkčnejšie interiérové diely.
- **ABS+:** technickejší diel, vyššia teplota a prostredie, kde zvládnete náročnejšiu tlač.

Pozrite si [3D tlač na KomArena](https://komarena.sk/3d-tlac/). Konkrétny produktový variant má zmysel vyberať podľa aktuálnej dostupnosti a plánovaného použitia.

## Bezpečnosť

Hotend a podložka pracujú pri vysokých teplotách. Tlačený diel nepovažujte automaticky za bezpečnostný, nosný, potravinársky alebo elektricky certifikovaný komponent iba podľa názvu filamentu.

## Zdroje

- eSUN — PLA+
- eSUN — ABS+

Parametre overené 11. 9. 2026.
