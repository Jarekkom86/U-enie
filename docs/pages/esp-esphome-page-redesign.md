<!-- markdownlint-disable MD013 -->

# ESP & ESPHome Page Redesign

## Krátky audit pôvodnej stránky

Issue #18 popisuje pôvodnú ESP & ESPHome stránku ako nevyhovujúcu:

- slabý kontrast a bledý text,
- veľké prázdne bloky,
- čierne rohové artefakty,
- slabá hero sekcia,
- nejednotný rytmus oproti stránke Home Assistant,
- nedostatočne profesionálny dojem pre KomArena.sk.

Keďže repo neobsahuje export pôvodnej WordPress stránky, riešenie je pripravené ako bezpečná reverzibilná shortcode šablóna v plugine.

## Nová obsahová štruktúra

1. Hero sekcia s technickým diagramom.
2. Prečo zvoliť ESPHome a ESP32.
3. Ako začať s ESPHome.
4. Odporúčaná skladba ESPHome systému.
5. ESP32 technické parametre.
6. ESPHome v praxi.
7. Bezpečnostné odporúčania.
8. Pre koho je ESPHome vhodné.
9. Kedy radšej zvoliť hotové zariadenie.
10. FAQ.
11. Kompatibilita a overené zdroje.

## Hlavný headline a podnadpis

### H1

ESP & ESPHome: vlastné smart home senzory, relé a doplnky pre Home Assistant

### Podnadpis

ESPHome pomáha vytvárať vlastné zariadenia pre Home Assistant bez klasického programovania. S ESP32 doskou, vhodným senzorom, stabilným napájaním a opatrnou konfiguráciou môžete pripraviť meranie teploty, vlhkosti, monitoring technickej miestnosti alebo jednoduché nízkonapäťové automatizácie.

## Finálne sekcie

### Hero

- Vysvetľuje ESPHome bez prehnaných tvrdení.
- Obsahuje HTML/CSS diagram: Home Assistant -> ESPHome -> ESP32 -> senzory / relé / displeje / meranie.
- CTA: Pozrieť ESP produkty, Ako začať s ESPHome.

### Prečo zvoliť ESPHome a ESP32

Karty:

- Lokálna integrácia s Home Assistantom.
- Vlastné senzory a moduly.
- Flexibilita pre projekty.
- Výborný pomer cena / možnosti.

### Ako začať s ESPHome

Ľavý stĺpec:

- vybrať ESP32 dosku,
- pridať senzor alebo modul,
- pripraviť stabilné napájanie,
- nakonfigurovať ESPHome,
- pridať zariadenie do Home Assistantu.

Pravý stĺpec:

KomArena odporúčanie, ktoré začína bezpečne: ESP32, jednoduchý senzor, USB napájanie a Home Assistant.

### Odporúčaná skladba ESPHome systému

Produktové karty:

- ESP32 vývojová doska,
- DHT22 alebo BME280 senzor,
- Relé modul,
- Napájací modul / USB napájanie.

Každá karta má názov, využitie, opatrnú kompatibilitu a CTA.

### ESP32 technické parametre

Tabuľka uvádza iba všeobecné bezpečné parametre:

- typ platformy,
- bezdrôtová konektivita,
- napájanie,
- využitie,
- integrácia,
- programovanie.

### ESPHome v praxi

Karty:

- meranie teploty a vlhkosti,
- ovládanie relé a svetiel,
- monitoring technickej miestnosti,
- vlastné smart home doplnky.

### Bezpečnostné odporúčania

Výrazný bezpečnostný box obsahuje upozornenia k 230 V, relé modulom, napájaniu, krytom, poistkám a bezpečným svorkám.

### Pre koho je ESPHome vhodné

Karty pre používateľov Home Assistantu, vlastné senzory, technicky zvedavých zákazníkov a servisné/project riešenia KomArena.

### Kedy radšej zvoliť hotové zariadenie

Férové odporúčanie, že ESPHome nie je vždy najjednoduchšia cesta a zákazník môže niekedy radšej zvoliť hotové Zigbee, Thread alebo Wi-Fi zariadenie.

### FAQ

Otázky:

- Potrebujem vedieť programovať?
- Funguje ESPHome bez internetu?
- Je ESPHome vhodné pre začiatočníka?
- Môžem ovládať 230 V zariadenia?
- Aký je rozdiel medzi ESP32 a ESP8266?
- Ako sa ESPHome prepája s Home Assistantom?

### Kompatibilita a overené zdroje

Záver smeruje na ESPHome dokumentáciu, Home Assistant ESPHome integráciu, ESP32 dokumentáciu konkrétnej dosky a budúce KomArena návody / Build Lab.

## Odporúčané produkty alebo kategórie na prelinkovanie

- ESP32 vývojové dosky.
- Senzory DHT22, BME280, DS18B20.
- Relé moduly.
- USB káble a napájanie.
- Dupont vodiče.
- Breadboard.
- Kity a sety pre prvé ESPHome projekty.

Aktuálna šablóna používa fallback WordPress vyhľadávacie URL. Finálne kategórie treba potvrdiť vo WordPress administrácii.

## SEO

### SEO title

ESP & ESPHome pre Home Assistant | ESP32 senzory a moduly KomArena

### Meta description

Postavte si vlastné ESPHome senzory, relé a doplnky pre Home Assistant. Prehľad ESP32, senzorov, napájania, bezpečnosti a odporúčanej zostavy KomArena.

### H1

ESP & ESPHome: vlastné smart home senzory, relé a doplnky pre Home Assistant

## Vizuálne pravidlá pre implementáciu

- Použiť koreňovú triedu `.ka-esp-page`.
- Svetlé technické pozadie.
- Biele karty s tyrkysovým okrajom.
- Žiadne tmavé karty s bledým textom.
- Žiadne externé obrázky ani logá.
- Diagram riešiť v HTML/CSS.
- Tabuľku spraviť responzívnu cez horizontálny overflow.
- Bezpečnostný box odlíšiť žltkastým pozadím.

## WordPress / Elementor bloková štruktúra

Odporúčaný bezpečný spôsob nasadenia:

1. Nahrať a aktivovať plugin `komarena-ui-system` vo verzii 1.0.3.
2. Vo WordPress stránke ESP & ESPHome vložiť Shortcode blok.
3. Do bloku vložiť:

```text
[komarena_esp_esphome_page]
```

4. Skontrolovať desktop náhľad.
5. Skontrolovať mobilný náhľad.
6. Až potom publikovať alebo aktualizovať stránku.

## Reálne upravené v repozitári

- `komarena-ui-system/komarena-ui-system.php` - verzia 1.0.3 a shortcode.
- `komarena-ui-system/templates/esp-esphome-page.html` - HTML šablóna stránky.
- `komarena-ui-system/assets/css/komarena-web-polish.css` - scoped CSS pre `.ka-esp-page`.
- `komarena-ui-system/README.md` - použitie shortcodu.
- `komarena-ui-system/CHANGELOG.md` - záznam verzie 1.0.3.
- `templates/style-brief.md` - fixný dizajnový brief pre lokálneho agenta.
- `docs/komarena-unified-style-system.md` - jednotný štýlový systém.
- `docs/agent-memory.md` - lokálna pamäť agenta.

## Čo treba potvrdiť alebo doriešiť

- Finálne URL produktových kategórií vo WordPress.
- Či má byť stránka vložená ako shortcode do existujúcej stránky alebo ako nová WordPress stránka.
- Reálny verejný desktop a mobilný náhľad po nahratí pluginu.
- Doplnenie interných KomArena Build Lab návodov po ich publikovaní.
