<!-- markdownlint-disable MD013 -->

# KomArena Blog — article/card template v1

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

## 2. Odporúčaná štruktúra článku

1. **H1** — jasná odpoveď na otázku, nie marketingový slogan.
2. **Úvod 2–4 odseky** — problém, pre koho je článok, čo používateľ na konci bude vedieť.
3. **Rýchla odpoveď / decision box** — pri poradcoch a porovnaniach krátka odpoveď skôr než detail.
4. **H2 obsahové bloky** — jeden problém alebo rozhodnutie na blok.
5. **Tabuľka / schéma / YAML** — iba ak pomáha rozhodnúť alebo reálne vykonať krok.
6. **Najčastejšie chyby** — praktická prevencia.
7. **Bezpečnosť / limity** — priamo pri relevantnom kroku.
8. **KomArena prepojenie** — 1–3 produkty + hub + súvisiaci článok, iba ak sú relevantné.
9. **Záver** — čo spraviť ďalej, nie opakovanie celého článku.
10. **Zdroje** — primárne/official zdroje a dátum overenia.

## 3. CTA pravidlá

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

## 4. Interné linkovanie

Na článok:

- 1 nadradený hub,
- 1 až 3 produktové odkazy podľa relevancie,
- 1 až 3 súvisiace články,
- minimálne jeden plánovaný inbound link z existujúcej produkčnej stránky.

Anchor text má hovoriť, čo používateľ otvorí. Nepoužívať opakovane „kliknite sem“.

## 5. Featured image štandard

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

Preferovať žiadny text alebo maximálne krátky 2–4 slovný label. Názov článku už zobrazuje karta/WordPress; netreba ho duplikovať do obrázka.

### Alt text

Alt text má opisovať viditeľný obsah, napríklad:

`ESP32 DevKit V1 s OLED SSD1306 displejom na stole`

Nie:

`najlepší ESP32 ESPHome Home Assistant lacno kúpiť KomArena`

## 6. Blog card štandard

Karta má obsahovať:

- featured image,
- kategóriu alebo jeden stručný kontextový štítok,
- titulok článku,
- excerpt približne 140–180 znakov,
- dátum,
- jasný text odkazu napr. „Čítať návod“ / „Pozrieť porovnanie“.

Karta nemá zobrazovať:

- dlhý zoznam tagov,
- dodávateľské dáta,
- ceny produktov, ak článok nie je cenové porovnanie,
- viacero CTA tlačidiel súťažiacich o pozornosť.

## 7. SEO / Yoast staging

Pred publish pripraviť:

- SEO title ideálne približne do 60 renderovaných znakov,
- meta description približne 145–160 znakov,
- focus keyword ako prirodzenú tému, nie frázu opakovanú nasilu,
- canonical default na vlastný permalink, pokiaľ nie je dôvod inak,
- index/follow default pre originálny hodnotný článok,
- schema typ Article/TechArticle/HowTo iba podľa reálneho obsahu a možností aktuálneho Yoast nastavenia.

## 8. Kód, YAML a zapojenia

- kód musí byť kopírovateľný,
- žiadne nevysvetlené placeholder piny,
- pri generic boarde uviesť, že pinout sa môže líšiť,
- 5 V vs 3,3 V rozhrania explicitne označiť,
- YAML kontrolovať proti aktuálnej ESPHome dokumentácii,
- bezpečnostný limit umiestniť pred rizikový krok.

## 9. Technické zdroje

Poradie preferencie:

1. výrobca / oficiálna dokumentácia,
2. Home Assistant / ESPHome / Arduino / Espressif / Bosch a podobná primárna dokumentácia,
3. datasheet/TDS,
4. sekundárny zdroj iba ako doplnok, nie jediný dôkaz technického tvrdenia.

Pri dynamickej technológii doplniť dátum overenia.

## 10. Sociálny derivát

Ku každému článku pripraviť krátky Facebook text:

- problém alebo zaujímavý fakt,
- 1–2 praktické pointy,
- odkaz na plný článok na KomArena,
- neprepisovať celý článok na Facebook.

Instagram/social vizuál môže vychádzať z featured image, ale nemá byť podmienkou publikácie článku.

## 11. Stavový flow

`draft` → `ready-for-review` → `approved-for-publish` → `published`

Žiadny článok nepreskakuje `ready-for-review`, ak obsahuje elektrické zapojenie, kompatibilitu, produktový CTA alebo tvrdenia závislé od verzie softvéru/hardvéru.
