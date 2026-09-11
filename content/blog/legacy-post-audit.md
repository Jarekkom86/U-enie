<!-- markdownlint-disable MD013 -->

# KomArena blog — audit legacy článkov

Audit je iba pracovný migračný plán. Tento dokument nemení produkčný WordPress.

Kontrolované publikované články:

1. `PIR senzor (napr. HC-SR501)` — post ID 2426
2. `Zapojenie a použitie ultrazvukového senzora HC-SR04 s Arduinom` — post ID 1971
3. `Ako si vybrať správnu vývojovú dosku: Arduino UNO vs. ESP32` — post ID 1964

Kontrola vykonaná 11. 9. 2026.

## Spoločné P0 zistenia

### SEO metadata

Všetky tri články majú v aktuálnom Yoast meta výstupe prázdne:

- SEO title override,
- meta description,
- focus keyword,
- Open Graph title/description/image,
- Twitter/X title/description/image,
- explicitný schema article type.

Pred začlenením do nového Blog systému treba každému článku doplniť minimálne:

- SEO title,
- meta description,
- focus keyword,
- vhodný `BlogPosting` alebo `TechArticle` schema typ podľa finálnej stratégie,
- featured/social image,
- interné odkazy na nový content cluster.

### Vizuálny a štruktúrny štandard

Legacy články nevznikli podľa nového `content/blog/` štandardu. Chýba im jednotný publish gate, explicitné zdroje, open points a sociálny balíček.

Pri migrácii ich netreba slepo prepisovať. Treba zachovať existujúcu URL a zlepšiť obsah na mieste, aby sa nestrácala história a prípadná SEO hodnota.

## 1. PIR senzor HC-SR501 — ID 2426

Produkčná URL:

https://komarena.sk/pir-senzor-napr-hc-sr501/

### Čo je použiteľné

- praktický smart-home uhol,
- základné vysvetlenie PIR princípu,
- konkrétne použitia v Home Assistante,
- existujúci odkaz na ESP32 DevKit V1,
- nízkonapäťový charakter projektu.

### P0 technická oprava — H/L trigger režimy

Aktuálny článok opisuje režimy spôsobom, ktorý je zavádzajúci.

Pre bežný HC-SR501 datasheet platí:

- `L` = single / non-repeatable trigger,
- `H` = repeatable / retriggerable trigger.

Pri `L` nový pohyb počas aktívneho časovača typicky nereštartuje timer. Pri `H` ďalšia detekcia timer znovu predĺži / reštartuje.

Aktuálnu formuláciu preto pred ďalšou propagáciou opraviť. Nepoužívať zjednodušenie „L zostane HIGH, kým je objekt v zornom poli“ ako definíciu režimu.

### P0 overenie časovania

Aktuálny článok uvádza rozsah približne `0,3 sekundy až 5 minút`. Bežne publikované HC-SR501 datasheety uvádzajú delay približne 5–300 s, pričom na trhu existujú varianty modulov.

Pred opravou treba overiť presný modul predávaný KomArena, nie iba generický názov HC-SR501.

### Obsahové zlepšenia

Doplniť:

- sekciu „čo budete potrebovať“,
- vysvetlenie kalibračného času po zapnutí,
- jasné oddelenie vstupného napájania modulu a logickej úrovne OUT,
- troubleshooting falošných detekcií,
- presný ESPHome príklad až po overení GPIO a produktu,
- zdroje a open points.

### Interné odkazy

Pridať:

- https://komarena.sk/esp-esphome/
- https://komarena.sk/home-assistant/
- https://komarena.sk/senzory/
- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- budúci článok `ESP32 + PIR + ESPHome`

### Odporúčaný status

`needs-revision-before-promotion`

Článok môže zostať publikovaný, ale nemal by byť aktívne tlačený cez sociálne siete, kým sa neopraví trigger-mode časť a neoverí presná verzia modulu.

## 2. HC-SR04 s Arduinom — ID 1971

Produkčná URL:

https://komarena.sk/zapojenie-a-pouzitie-ultrazvukoveho-senzora-hc-%e2%80%91-sr04-s-arduinom/

### Čo je použiteľné

- jasná základná štruktúra,
- zoznam komponentov,
- schéma princípu zapojenia,
- ukážkový Arduino kód,
- vysvetlenie time-of-flight princípu,
- nápady na projekty.

### P0 jazyková kvalita

V texte sú viditeľné chyby a poškodené formulácie, napríklad:

- `preážky`,
- `vypočita`,
- `počas / 2`,
- `knižnic`,
- rozbité alebo chybné formulácie v bezpečnostnej časti.

Článok treba celý jazykovo prejsť, nie iba opraviť jednu vetu.

### P0 technické overenie

Pred refreshom overiť proti datasheetu presného modulu:

- pracovné napätie,
- rozsah merania,
- deklarovanú presnosť,
- minimálny merací cyklus,
- logickú úroveň ECHO.

Ak vznikne verzia pre ESP32, treba výslovne riešiť 5 V ECHO a 3,3 V GPIO bezpečne podľa konkrétnej dosky. Nesmie sa automaticky preniesť Arduino UNO zapojenie na ESP32.

### SEO / obchodné zlepšenia

Aktuálny záver iba všeobecne odkazuje na e-shop. Doplniť:

- konkrétny produkt iba ak je publikovaný a objednateľný,
- relevantnú vývojovú dosku,
- vodiče / breadboard,
- senzorový hub,
- ďalší návod.

### Interné odkazy

Pridať:

- https://komarena.sk/senzory/
- https://komarena.sk/navody/
- https://komarena.sk/esp-esphome/
- Arduino/ESP32 porovnanie po oprave
- budúci `HC-SR04 + ESP32/ESPHome` článok iba po technickom overení

### URL poznámka

Slug obsahuje percent-encoded špeciálny spojovník `%e2%80%91`. URL nemeníme bez SEO dôvodu. Ak sa niekedy zjednoduší, musí sa vytvoriť správny 301 redirect.

### Odporúčaný status

`needs-full-editorial-refresh`

## 3. Arduino UNO vs. ESP32 — ID 1964

Produkčná URL:

https://komarena.sk/ako-si-vybrat-spravnu-vyvojovu-dosku-arduino-uno-vs-esp32/

### Najväčší strategický problém

Článok porovnáva generické `Arduino UNO` a `ESP32`, ale dnešný katalóg KomArena obsahuje napríklad Arduino UNO R4 WiFi a viacero rôznych ESP32 platforiem.

Nie je správne miešať parametre klasického UNO R3 / ATmega328P s obchodným CTA na novší UNO R4 WiFi bez jasného označenia generácie.

### P0 obsahová voľba

Pred opravou rozhodnúť jednu z dvoch ciest:

**A. Zachovať historické porovnanie**

Premenovať a spresniť článok na:

`Arduino UNO R3 vs. ESP32: základné rozdiely pre začiatočníka`

Potom odstrániť obchodné tvrdenia, ktoré by naznačovali, že ide o aktuálne porovnanie celého sortimentu.

**B. Urobiť nový aktuálny poradca**

Vytvoriť nový článok:

`Arduino UNO R4 WiFi vs. ESP32: čo zvoliť v roku 2026`

a pôvodný článok ponechať ako historický/začiatočnícky obsah s interným odkazom na nový poradca.

Preferované riešenie: **B**, pretože zachová existujúcu URL a zároveň nevytvorí nepresný hybrid starých a nových parametrov.

### P0 odstrániť časovo nestabilné ceny

Aktuálna porovnávacia tabuľka obsahuje približné ceny `od 7 €` a `od 10 €`.

Takéto čísla rýchlo starnú a nie sú potrebné pre evergreen technické porovnanie. Nahradiť ich relatívnym cenovým kontextom alebo dynamickým odkazom na aktuálny produkt.

### P0 jazyková kvalita

V texte sú chyby typu:

- `Vyber`,
- `kľúcovým`,
- `knižnic`,
- `úro vni`,
- gramaticky nesprávne formulácie,
- záverečný CTA s textom `Výkée dosky`.

Pred ďalšou propagáciou treba kompletnú jazykovú redakciu.

### Parametre ESP32

Tvrdenia typu `34 programovateľných I/O`, `520 kB SRAM` alebo `až 4 MB flash` sú závislé od konkrétneho ESP32 čipu/modulu/dosky a sú príliš generické pre dnešnú širokú ESP32 rodinu.

Aktualizovaný článok musí porovnávať presne pomenované dosky alebo rodiny, nie jednu univerzálnu „ESP32“ konfiguráciu.

### Interné odkazy

Pridať:

- https://komarena.sk/esp-esphome/
- https://komarena.sk/produkty/
- Draft 003 — prvý ESPHome projekt
- Draft 005 — stabilné napájanie ESP32
- nový budúci článok UNO R4 WiFi vs. konkrétna ESP32 doska

### Odporúčaný status

`needs-repositioning-and-refresh`

## Migračné poradie

### P0 — pred verejným launchom nového Blog systému

1. opraviť PIR H/L trigger režimy,
2. doplniť SEO meta všetkým trom článkom,
3. jazykovo opraviť HC-SR04 a Arduino/ESP32 článok,
4. odstrániť zastarané ceny z Arduino/ESP32 porovnania,
5. doplniť interné odkazy na nové huby a drafty,
6. overiť featured images a social-preview obrazky.

### P1 — po základnom launchi

1. vytvoriť `ESP32 + PIR + ESPHome` praktický návod,
2. vytvoriť `HC-SR04 + ESP32` iba s bezpečným level shifting riešením a overeným hardvérom,
3. vytvoriť aktuálne `UNO R4 WiFi vs. ESP32` porovnanie,
4. doplniť produktové CTA podľa aktuálneho skladu a marže.

## Zdrojové overenie k auditu

- HC-SR501 datasheet mirror / trigger mode: H = repeatable, L = non-repeatable.
- MakerGuides HC-SR501 tutorial: L single trigger, H repeating trigger; repeating trigger reštartuje delay timer pri novej detekcii.
- Aktuálny Yoast meta read pre posty 2426, 1971 a 1964: SEO fields sú prázdne.
- Produkčný obsah všetkých troch článkov bol prečítaný pred vytvorením auditu.

## Čo sa týmto auditom nemení

- žiadny WordPress post,
- žiadny permalink,
- žiadne SEO meta na produkcii,
- žiadna kategória,
- žiadny produkt,
- žiadny Facebook príspevok.
