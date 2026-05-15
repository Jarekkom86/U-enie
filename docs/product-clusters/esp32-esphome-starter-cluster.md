<!-- markdownlint-disable MD013 MD060 -->

# ESP32 ESPHome Starter Product Cluster

## Stav dokumentu

- Typ: LEVEL 2 produktovy cluster draft.
- Import do WooCommerce: nie.
- Publikovanie produktov: nie.
- CSV vystup: nie v tomto sprinte.
- Stav produktov: draft, kym sa neoveria konkretne modely, sklad, ceny a obsah balenia.

## Ciel clustra

Cielom clustra je vytvorit zakaznicky pochopitelny start pre nizkonapatove ESPHome projekty v Home Assistant ekosysteme. Cluster ma zakaznikovi vysvetlit, co potrebuje na prvy bezpecny projekt, ake produkty spolu suvisia a kde su limity.

## Zakaznicky scenar

Zakaznik chce zacat s meranim teploty, vlhkosti alebo jednoduchym monitoringom v Home Assistant. Nechce len samostatnu dosku, ale zrozumitelny balicek: vyvojova doska, senzor, kable, breadboard, napajanie a navod.

## Produktove roly

| Rola | Produktovy typ | Ucel | Stav overenia |
|---|---|---|---|
| Hlavna doska | ESP32 DevKit / kompatibilna vyvojova doska | Riadenie projektu a pripojenie k sieti | Otvoreny bod: udaj treba overit. |
| Zakladny senzor | DHT22 alebo iny teplotno-vlhkostny senzor | Prvy meraci projekt | Otvoreny bod: udaj treba overit. |
| Alternativny senzor | DS18B20 alebo iny teplotny senzor | Meranie teploty podla scenara | Otvoreny bod: udaj treba overit. |
| Prepojenie | Dupont vodice | Prototypove prepojenie komponentov | Otvoreny bod: udaj treba overit. |
| Prototypovanie | Breadboard | Testovanie bez pajkovania | Otvoreny bod: udaj treba overit. |
| Napajanie | USB kabel alebo vhodny zdroj | Bezpecne nizkonapatove napajanie | Otvoreny bod: udaj treba overit. |
| Volitelne | Krabicka alebo montazne prislusenstvo | Ulozenie projektu po teste | Otvoreny bod: udaj treba overit. |

## Preco tento cluster dava zmysel

- Predava viac ako samotnu dosku: zakaznik dostane kompletny startovaci kontext.
- Vytvara prirodzene prepojenie produkt, navod, modelovy projekt, kategoria a odporucane prislusenstvo.
- Umoznuje pripravit blog a projekt bez okamziteho publikovania produktov.
- Posilnuje smer KomArena: Home Assistant, ESPHome, senzory, napajanie a bezpecne nizkonapatove projekty.

## Navrhovany lievik

1. Kategoria: ESPHome a vyvojove dosky.
2. Produkt: ESP32 vyvojova doska.
3. Prislusenstvo: senzor, kable, breadboard, USB kabel, napajanie.
4. Blog: Ako zacat s ESPHome bezpecne.
5. Projekt: ESPHome teplomer pre Home Assistant.
6. Social: kratky edukativny post o tom, preco nestaci kupit iba modul.
7. Newsletter: startovaci checklist pre prvy ESPHome projekt.

## Blogove uhly

- Ako zacat s ESPHome bezpecne.
- ESP32 vs ESP8266 pre Home Assistant projekt.
- Ako vybrat teplotny senzor pre Home Assistant.
- Preco nestaci kupit iba samotnu vyvojovu dosku.
- Bezpecne napajanie DIY nizkonapatoveho projektu.

## Modelovy projekt

### Nazov

ESPHome teplomer pre Home Assistant.

### Ciel

Vytvorit jednoduchy nizkonapatovy projekt na meranie teploty alebo vlhkosti a posielanie hodnot do Home Assistant.

### Bezpecnostny rozsah

Projekt ma byt navrhnuty iba ako nizkonapatovy priklad. Neobsahuje pracu s 230 V. Ak by sa v buducnosti pridali rele alebo zasahy do siete, musi byt uvedene, ze praca patri odborne sposobilej osobe.

## Kompatibilita a zdroje

Technicke tvrdenia musia byt v dalsom produktovom sprinte overene z oficialnych zdrojov:

- [ESPHome ESP32 platform documentation](https://esphome.io/components/esp32/).
- [ESPHome getting started documentation](https://esphome.io/guides/getting_started_hassio/).
- [Home Assistant ESPHome integration](https://www.home-assistant.io/integrations/esphome/).
- [Espressif ESP32-DevKitC documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html).

Otvoreny bod: kompatibilitu s Home Assistant / ESPHome / ESPBuild je potrebne overit podla konkretnej konfiguracie.

## Bezpecnostne odporucania

- Pouzivaj iba bezpecne nizkonapatove napajanie vhodne pre konkretnu dosku.
- Nepripajaj senzor alebo dosku na neoverene napatie.
- Over polaritu napajania a zapojenie pinov pred prvym spustenim.
- Pri breadboard testovani pocitaj s tym, ze nejde o trvale priemyselne zapojenie.
- Pri bateriach alebo externych zdrojoch dopln samostatny safety checklist.
- 230 V nie je sucastou tohto clustra.

## Otvorene body pred produktovym spracovanim

- Overit konkretny model ESP32 dosky.
- Overit presny senzor alebo senzory.
- Overit obsah balenia kazdeho produktu.
- Overit realny sklad.
- Overit nakupnu cenu a predajnu cenu zakoncenú na .99.
- Overit interny EAN zacínajuci na 2998.
- Overit SKU podla KomArena formatu.
- Overit, ci produktove popisy neobsahuju nepravdive parametre.
- Overit, ze produkty s otvorenymi bodmi ostavaju Status = draft a Published = 0.

## Navrhovane suvisiace produkty

- ESP32 vyvojova doska.
- DHT22 alebo iny teplotno-vlhkostny senzor.
- DS18B20 alebo iny teplotny senzor.
- Dupont vodice.
- Breadboard.
- USB kabel.
- Napajaci modul alebo bezpecny zdroj podla konkretnej dosky.
- Krabicka alebo montazne prislusenstvo.

## Navrhovane suvisiace kategorie

- Elektronika.
- Vyvojove dosky.
- Senzory.
- Kity a sety.
- Naradie.

## Social a newsletter balicek

### Social post uhol

Chces zacat s Home Assistant projektom, ale nevies, co ku doske dokupit? ESP32 starter cluster ukaze zaklad: doska, senzor, prepojovacie vodice, breadboard, napajanie a bezpecny nizkonapatovy navod.

### Newsletter uhol

Pripravujeme startovaci ESPHome balicek pre prve meranie teploty alebo vlhkosti v Home Assistant. Cielom nie je predat iba modul, ale dat zakaznikovi zrozumitelny a bezpecny start.

## Odporucany dalsi sprint

Create ESP32 DevKit source document: pripravit samostatny produktovy zdrojovy dokument pre konkretny ESP32 model s overenymi zdrojmi, otvorenymi bodmi a draft pravidlami.
