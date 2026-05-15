<!-- markdownlint-disable MD013 MD060 -->

# ESP32 DevKit Source Document

## Stav dokumentu

- Typ: LEVEL 2 produktovy zdrojovy dokument.
- WooCommerce import: nie.
- CSV vystup: nie v tomto sprinte.
- Publikovanie produktu: nie.
- Odporucany WooCommerce stav: `Status = draft`, `Published = 0`, kym sa neoveri konkretny model, sklad, cena, obsah balenia a fotografia.

## Pracovny nazov produktu

ESP32 DevKit vyvojova doska pre ESPHome a Home Assistant projekty.

## Ucel produktu

ESP32 DevKit je zakladna vyvojova doska pre nizkonapatove IoT a smart home projekty. V kontexte KomArena ma sluzit ako hlavna doska pre prve ESPHome projekty, napriklad meranie teploty, vlhkosti, stavu kontaktu alebo ine jednoduche senzoricke projekty.

## Pre koho je produkt urceny

- Zakaznik, ktory chce zacat s ESPHome.
- Pouzivatel Home Assistant, ktory chce vlastne senzory alebo jednoduche DIY integracie.
- Maker, ktory potrebuje univerzalnu vyvojovu dosku s bezdratovou konektivitou.
- Technicky zakaznik, ktory vie pracovat s nizkym napatim a konfiguraciou firmware.

## Overene alebo podporene tvrdenia

Tieto tvrdenia su povolene iba ako vseobecny ramec, nie ako finalne parametre konkretneho skladoveho produktu:

| Oblast | Tvrdenie | Stav |
|---|---|---|
| Platforma | ESPHome ma oficialnu dokumentaciu pre ESP32 platformu. | zdroj overit pri produktovom finalizovani |
| Home Assistant | Home Assistant ma integraciu ESPHome. | zdroj overit pri produktovom finalizovani |
| Pouzitie | Doska je vhodna ako vyvojovy zaklad pre nizkonapatove ESPHome projekty. | povolene ako vseobecny popis |
| Konkretne parametre | Napatie, pinout, cip, USB prevodnik, rozmery a obsah balenia zavisia od konkretneho modelu. | otvoreny bod |

## Otvorene body pred produktovym opisom

- Otvoreny bod: udaj treba overit. Konkretna verzia dosky a oznacenie modelu.
- Otvoreny bod: udaj treba overit. Pouzity ESP32 modul alebo cip.
- Otvoreny bod: udaj treba overit. Napajacie napatie a odporucany zdroj.
- Otvoreny bod: udaj treba overit. Logicka uroven GPIO.
- Otvoreny bod: udaj treba overit. USB konektor a USB-UART prevodnik.
- Otvoreny bod: udaj treba overit. Pocet dostupnych GPIO pinov pre dany model.
- Otvoreny bod: udaj treba overit. Rozmery dosky.
- Otvoreny bod: udaj treba overit. Obsah balenia.
- Otvoreny bod: udaj treba overit. Realny sklad.
- Otvoreny bod: udaj treba overit. Nakupna a predajna cena.
- Otvoreny bod: udaj treba overit. Interny EAN zacinajuci na 2998.
- Otvoreny bod: udaj treba overit. SKU vo formate KOM-ESP32-XXXX.

## Kompatibilita a zdroje

Pred finalnym produktovym textom pouzi primarne oficialne zdroje:

- [ESPHome ESP32 platform documentation](https://esphome.io/components/esp32/).
- [ESPHome getting started documentation](https://esphome.io/guides/getting_started_hassio/).
- [Home Assistant ESPHome integration](https://www.home-assistant.io/integrations/esphome/).
- [Espressif ESP32-DevKitC documentation](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/index.html).
- [Espressif ESP32 hardware reference](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/index.html).

Otvoreny bod: kompatibilitu s Home Assistant / ESPHome / ESPBuild je potrebne overit podla konkretnej konfiguracie.

## Navrh produktoveho SEO zameru

- Primarny zamer: ESP32 vyvojova doska pre ESPHome.
- Sekundarny zamer: ESP32 Home Assistant senzoricky projekt.
- Podporny zamer: ESP32 starter kit, ESPHome teplomer, ESP32 pre smart home.

## Navrh kratkeho popisu

ESP32 vyvojova doska pre nizkonapatove ESPHome a Home Assistant projekty. Vhodna ako zaklad pre senzory, prototypy a prve smart home merania. Konkretne technicke parametre je potrebne overit podla presneho modelu pred publikovanim produktu.

## Navrh dlheho popisu - draft

ESP32 DevKit je prakticky zaklad pre zakaznikov, ktori chcu zacat s vlastnymi ESPHome projektmi v Home Assistant. Umoznuje pripravit nizkonapatove senzoricke riesenia, napriklad jednoduchy teplomer, monitoring vlhkosti alebo prototyp na breadboarde.

Produkt je vhodne predavat nie ako izolovanu dosku, ale ako sucast odporucanej zostavy: ESP32 doska, senzor, Dupont vodice, breadboard, USB kabel a navod. Tak zakaznik pochopi, co realne potrebuje na prvy funkcny projekt.

Technicke parametre musia byt pred publikovanim doplnene podla konkretneho skladoveho modelu. Ak sa model, pinout alebo napajanie lisi, produkt musi ostat v stave draft.

## Technicke parametre - draft tabulka

| Parameter | Hodnota |
|---|---|
| Model dosky | Otvoreny bod: udaj treba overit. |
| Cip alebo modul | Otvoreny bod: udaj treba overit. |
| Napajanie | Otvoreny bod: udaj treba overit. |
| Logicka uroven | Otvoreny bod: udaj treba overit. |
| USB konektor | Otvoreny bod: udaj treba overit. |
| Bezdratova konektivita | Otvoreny bod: udaj treba overit. |
| Rozmery | Otvoreny bod: udaj treba overit. |
| Obsah balenia | Otvoreny bod: udaj treba overit. |

## Bezpecnostne odporucania

- Pouzivaj iba overene nizkonapatove napajanie vhodne pre konkretny model dosky.
- Pred pripojenim senzora over napatie a pinout.
- Neprepajaj GPIO priamo s vyssim napatim bez vhodneho prisposobenia urovni.
- Breadboard a Dupont vodice su vhodne na prototyp, nie ako finalne odolne instalacne riesenie.
- Tento produktovy dokument nezahŕna pracu s 230 V.
- Pri projektoch s rele alebo vyssim prudom vytvor samostatne bezpecnostne upozornenie.

## Suvisiace produkty

- DHT22 alebo iny teplotno-vlhkostny senzor.
- DS18B20 alebo iny teplotny senzor.
- Dupont vodice.
- Breadboard.
- USB kabel.
- Bezpecny nizkonapatovy zdroj.
- Krabicka alebo montazne prislusenstvo.

## Suvisiace navody a projekty

- Pripravujeme navod: Ako zacat s ESPHome bezpecne.
- Pripravujeme projekt: ESPHome teplomer pre Home Assistant.
- Pripravujeme porovnanie: ESP32 vs ESP8266 pre Home Assistant.

## Import readiness

Produkt nie je pripraveny na import. Pred importom treba overit presny model, sklad, cenu, EAN, SKU, obsah balenia, fotografie, kategorie, technicke parametre a bezpecnostne upozornenia.

## Odporucany dalsi sprint

Create ESP32 DevKit WooCommerce CSV draft: az po overeni konkretneho modelu pripravit jeden draft produkt do CSV so `Status = draft` a `Published = 0`.
