<!-- markdownlint-disable MD013 -->

# KomArena Blog — article/card template v2

Tento dokument definuje jednotný staging štandard pre blogové články. Nie je to hotový WordPress block pattern; pred nasadením sa má vizuálne overiť proti aktuálnej téme KomArena.

## 1. Povinné metadata draftu

Každý článok musí mať na začiatku staging súboru:

- Status
- Typ článku
- Primárnu kategóriu
- Sekundárne kategórie iba ak sú reálne relevantné
- Cieľovú skupinu
- Search intent
- Focus keyword
- SEO title
- Meta description
- H1
- Zdroje / dátum posledného technického overenia
- Open points / publish gates

## 2. Jazykový štandard — Slovak first

Verejný text KomArena je predvolene po slovensky.

- nadpisy, odseky, CTA, popisky obrázkov, alt texty a navigačné texty písať prirodzenou slovenčinou,
- anglický výraz ponechať iba ak ide o oficiálny názov technológie, protokolu, produktu alebo ustálený technický termín,
- pri menej známom anglickom termíne ho pri prvom použití vysvetliť po slovensky, napr. `znižujúci DC-DC menič (step-down)`, `krútenie a odlepovanie rohov (warping)`, `vláknovanie (stringing)`,
- nepoužívať angličtinu iba preto, že je bežná v technických diskusiách; ak existuje prirodzený slovenský výraz, použiť ho,
- oficiálne názvy ako Home Assistant, ESPHome, Wi‑Fi, Zigbee, Thread, Matter, Bluetooth Proxy, Arduino alebo ESP32 neprekladať,
- `smart home` v bežnej vete preferenčne nahradiť výrazom `inteligentná domácnosť`,
- `logs` → `záznamy`, `checklist` → `kontrolný zoznam`, `workflow` → `spôsob práce` alebo `postup`, ak to význam dovolí,
- preklad nesmie byť mechanický; výsledná veta musí znieť prirodzene slovenskému používateľovi.

## 3. Odporúčaná štruktúra článku

1. **H1** — jasná odpoveď na otázku, nie marketingový slogan.
2. **Úvod 2–4 odseky** — problém, pre koho je článok, čo používateľ na konci bude vedieť.
3. **Relevantný obrázok v tele** — ideálne po úvode alebo pri prvom praktickom bloku.
4. **Rýchla odpoveď / rozhodovací blok** — pri poradcoch a porovnaniach krátka odpoveď skôr než detail.
5. **H2 obsahové bloky** — jeden problém alebo rozhodnutie na blok.
6. **Tabuľka / schéma / YAML** — iba ak pomáha rozhodnúť alebo reálne vykonať krok; široké tabuľky na mobile radšej nahradiť porovnávacími blokmi.
7. **Najčastejšie chyby** — praktická prevencia.
8. **Bezpečnosť / limity** — priamo pri relevantnom kroku.
9. **KomArena prepojenie** — produkty + hub + súvisiace články, iba ak sú relevantné.
10. **Záver** — čo spraviť ďalej, nie opakovanie celého článku.
11. **Zdroje** — primárne/oficiálne zdroje a dátum overenia.

## 4. Obrázky v každom článku

Každý publikovaný článok musí mať:

- **1 featured image**,
- **minimálne 1 relevantný obrázok v tele článku**,
- pri dlhšom alebo praktickom článku preferovať **2–3 obrázky**, ak reálne pomáhajú pochopiť obsah.

### Vizuálny smer

- pomer strán primárne **16:9**,
- tmavý prémiový technický vizuál, moderná inteligentná domácnosť, jemné tyrkysové svetelné prvky a čistá hierarchia,
- vizuál má vysvetľovať tému, nie byť iba dekoráciou,
- text priamo v grafike radšej nepoužívať; ak je potrebný, musí byť po slovensky a krátky,
- žiadne cudzie watermarky, dodávateľské názvy, interné SKU, sourcing informácie alebo ceny,
- pri produkte používať presnú fotografiu produktu, nie generickú podobizeň,
- pri koncepčných témach možno použiť vlastnú ilustračnú grafiku KomArena.

### Obrázky v tele

- obrázok vložiť k odseku, ktorý vysvetľuje,
- produktová fotografia môže byť klikateľná na produkt iba ak produkt prešiel publish gate,
- vypredaný/skrytý produkt možno použiť ako informatívny obrázok, ale nie ako nákupné CTA,
- každý obrázok má mať slovenský alt text a podľa potreby slovenský popis pod obrázkom,
- neopakovať ten istý obrázok bez dôvodu viackrát v jednom článku.

## 5. CTA pravidlá

CTA nesmie byť univerzálny blok vložený nasilu.

### Produktové CTA

Použiť iba ak:

- produkt rieši problém z článku,
- je publikovaný,
- jeho variant/kompatibilita bola overená,
- sklad/visibility/backorder prešiel publish gate.

Preferovaná forma:

> Pre tento projekt sa hodí [produkt], ak potrebujete [konkrétny dôvod]. Pred nákupom skontrolujte [relevantný limit].

Zakázané:

- „Kúpte teraz“ pri vypredanom alebo skrytom produkte,
- náhodný cross-sell iba kvôli marži,
- dodávateľské/SKU/sourcing poznámky,
- hardcoded sklad a cenu v evergreen odseku.

### Servisné CTA

ReSmart vložiť tam, kde DIY používateľ môže rozumne skončiť a požiadať o diagnostiku. Nie do každého článku.

## 6. Interné linkovanie

Na článok:

- 1 nadradený hub,
- 1 až 3 produktové odkazy podľa relevancie a živého product gate,
- 2 až 5 súvisiacich článkov alebo návodov, ak už existujú,
- minimálne jeden plánovaný inbound link z existujúcej produkčnej stránky alebo článku.

Anchor text má hovoriť, čo používateľ otvorí. Nepoužívať opakovane „kliknite sem“.

Po publikovaní nového článku doplniť vhodné spätné odkazy aj do starších článkov, aby nevznikali izolované stránky.

## 7. Featured image štandard

### Formát

- preferovaný pomer strán: **16:9**,
- pracovný master: **1600 × 900 px**,
- export pre web: WebP alebo iný moderný formát podporovaný WordPressom,
- cieľová veľkosť súboru: približne do **250 kB**, ak obrazová kvalita zostáva dobrá,
- dôležitý objekt držať v centrálnej bezpečnej zóne, aby orez na kartách neodrezal produkt.

### Vizuálny štýl

- čisté technické pozadie,
- jeden hlavný produkt/komponent alebo jasná schéma,
- KomArena tech/art-deco charakter iba ako jemný rámec, nie dekoratívny chaos,
- bez watermarkov tretích strán,
- bez dodávateľských názvov, interných skladových kódov a sourcing poznámok,
- výrobcu zobrazovať iba ak je to zákaznícky relevantné a právne/obsahovo vhodné.

### Text v obrázku

Preferovať žiadny text. Ak text zlepšuje vysvetlenie, musí byť krátky, prirodzený a po slovensky. Názov článku už zobrazuje karta/WordPress; netreba ho duplikovať do obrázka.

### Alt text

Alt text má opisovať viditeľný obsah po slovensky, napríklad:

`ESP32 DevKit V1 s OLED SSD1306 displejom na stole`

Nie:

`najlepší ESP32 ESPHome Home Assistant lacno kúpiť KomArena`

## 8. Blog card štandard

Karta má obsahovať:

- featured image,
- kategóriu alebo jeden stručný kontextový štítok,
- titulok článku,
- excerpt približne 140–180 znakov,
- dátum,
- jasný slovenský text odkazu napr. „Čítať návod“ / „Pozrieť porovnanie“.

Karta nemá zobrazovať:

- dlhý zoznam tagov,
- dodávateľské dáta,
- ceny produktov, ak článok nie je cenové porovnanie,
- viacero CTA tlačidiel súťažiacich o pozornosť.

## 9. SEO / Yoast staging

Pred publish pripraviť:

- SEO title ideálne približne do 60 renderovaných znakov,
- meta description približne 145–160 znakov,
- focus keyword ako prirodzenú tému, nie frázu opakovanú nasilu,
- canonical default na vlastný permalink, pokiaľ nie je dôvod inak,
- index/follow default pre originálny hodnotný článok,
- schema typ Article/TechArticle/HowTo iba podľa reálneho obsahu a možností aktuálneho Yoast nastavenia.

## 10. Kód, YAML a zapojenia

- kód musí byť kopírovateľný,
- žiadne nevysvetlené placeholder piny,
- pri všeobecnej doske uviesť, že rozloženie pinov sa môže líšiť,
- 5 V vs 3,3 V rozhrania explicitne označiť,
- YAML kontrolovať proti aktuálnej ESPHome dokumentácii,
- bezpečnostný limit umiestniť pred rizikový krok.

## 11. Technické zdroje

Poradie preferencie:

1. výrobca / oficiálna dokumentácia,
2. Home Assistant / ESPHome / Arduino / Espressif / Bosch a podobná primárna dokumentácia,
3. datasheet/TDS,
4. sekundárny zdroj iba ako doplnok, nie jediný dôkaz technického tvrdenia.

Pri dynamickej technológii doplniť dátum overenia.

## 12. Sociálny derivát

Ku každému článku pripraviť krátky Facebook text:

- problém alebo zaujímavý fakt,
- 1–2 praktické pointy,
- odkaz na plný článok na KomArena,
- neprepisovať celý článok na Facebook.

Instagram/social vizuál môže vychádzať z featured image, ale nemá byť podmienkou publikácie článku.

## 13. Stavový flow

`draft` → `ready-for-review` → `approved-for-publish` → `published`

Žiadny článok nepreskakuje `ready-for-review`, ak obsahuje elektrické zapojenie, kompatibilitu, produktový CTA alebo tvrdenia závislé od verzie softvéru/hardvéru.
