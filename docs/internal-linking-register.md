<!-- markdownlint-disable MD013 MD060 -->

# Register interného prelinkovania KomArena

## Stav a rozsah

- Typ: LEVEL 2 plánovací register pre B-005.
- Zdroj pravdy pre aktuálnu prevádzku: GitHub dashboard issue #24.
- Tento dokument neobsahuje potvrdené produkčné URL, nemení WordPress, navigáciu ani obsah stránok a nepridáva žiadne živé interné odkazy.
- Položka so stavom `planned` je návrh väzby medzi existujúcimi dokumentmi a budúcim obsahom. Nie je to potvrdenie, že cieľová stránka, produkt alebo kategória už existuje v e-shope.

## Záväzné pravidlá

- Použi prelinkovanie iba tam, kde ho podporuje `docs/seo-internal-linking.md` a systém Produkt → Blog → Projekt → Predajná zostava.
- Home Assistant je obsahový a integračný kontext; nie je automatickou kategóriou ani dôkazom kompatibility produktu.
- Názov kategórie v tomto registri je pracovný názov z kategóriovej architektúry, nie potvrdený WooCommerce slug ani URL.
- Neodkazuj z produktu na neexistujúci článok ani projekt. Kým cieľ neexistuje, použi iba formuláciu `Pripravujeme ...` alebo položku ponechaj v stave `planned`.
- Pri produkte, modeli, sklade, cene, obsahu balenia alebo kompatibilite bez dôkazu musí zostať príslušná položka `draft` a otvorený bod musí zostať viditeľný.
- Prelinkovanie nesmie nahradiť bezpečnostné upozornenie. Návody s relé, napájaním alebo vyšším napätím vyžadujú samostatné bezpečnostné posúdenie.

## Význam stavov

| Stav | Význam |
|---|---|
| `planned` | Väzba vyplýva z existujúcich dokumentov, ale cieľ nie je verejne overený alebo publikovaný. |
| `draft-ready` | Zdrojový aj cieľový obsah sú pripravené ako draft a čakajú na obsahové a technické overenie. |
| `verified` | Existenciu, správnu kategóriu, slug a obsah odkazu potvrdil read-only audit. |
| `published` | Odkaz je živý a bol po publikovaní overený; tento stav sa nesmie nastaviť bez samostatného produkčného auditu. |

## Register väzieb

| ID | Zdrojový objekt | Pripravovaný cieľ | Úloha odkazu | Pracovná kategória alebo kontext | Povinná brána pred zverejnením | Stav |
|---|---|---|---|---|---|---|
| IL-001 | ESP32 DevKit produktový zdrojový dokument | Návod `Ako začať s ESPHome bezpečne` | Vysvetliť prvý nízkonapäťový scenár bez tvrdenia o konkrétnom modeli. | Vývojové dosky; ESPHome obsahový kontext | Overiť presný model dosky, existenciu článku a jeho finálny slug. | `planned` |
| IL-002 | ESP32 DevKit produktový zdrojový dokument | Modelový projekt `ESPHome teplomer pre Home Assistant` | Prepojiť produkt s bezpečným nízkonapäťovým použitím. | Vývojové dosky + Senzory | Overiť konkrétny senzor, zapojenie, konfiguráciu a bezpečnostný rozsah projektu. | `planned` |
| IL-003 | ESP32 DevKit produktový zdrojový dokument | Súvisiace príslušenstvo: senzor, Dupont vodiče, breadboard, USB kábel a vhodný zdroj | Pomôcť zákazníkovi pochopiť kompletný štartovací kontext. | Vývojové dosky; Senzory; Elektronika | Potvrdiť konkrétne predajné položky, sklad, kategórie a kompatibilitu. | `planned` |
| IL-004 | ESP32 ESPHome Starter Product Cluster | Článok `Čo dokúpiť k ESP32 vývojovej doske` | Viesť od hlavnej dosky k potrebnému príslušenstvu bez vymyslených kitov. | Vývojové dosky; Kity a sety | Overiť finálny obsah článku a konkrétne odporúčané položky. | `planned` |
| IL-005 | ESP32 ESPHome Starter Product Cluster | Článok `Ako vybrať prvý senzor pre Home Assistant projekt` | Pomôcť s výberom senzora v relevantnom integračnom kontexte. | Senzory | Overiť konkrétne modely a nepoužiť neoverenú kompatibilitu ako marketingové tvrdenie. | `planned` |
| IL-006 | ESP32 ESPHome Starter Product Cluster | Modelový projekt `ESPHome teplomer pre Home Assistant` | Prepojiť cluster, návod a projekt do jednej zákazníckej cesty. | Vývojové dosky; Senzory; Kity a sety | Overiť komponenty a zachovať iba nízkonapäťový rozsah. | `planned` |
| IL-007 | Budúci článok o bezpečnom napájaní ESP32 | Bezpečnostné odporúčania v relevantných produktových dokumentoch | Prepojiť poradenský obsah s bezpečným výberom príslušenstva. | Elektronika; Náradie | Pripraviť a odborne overiť samostatný článok; neuvádzať parametre modulov bez zdroja. | `planned` |

## Prevádzkový postup

1. Pred prípravou článku alebo projektu over, že má zdrojový dokument označené otvorené body a že cieľ nepretvára plánovaný obsah na hotové technické tvrdenie.
2. Po vytvorení draftu doplň jeho pracovný názov, vlastníka a plánovaný slug do príslušnej položky; bez read-only kontroly ho neoznač ako `verified`.
3. Pred vložením živého odkazu skontroluj existenciu cieľa, finálny slug, kategóriu, kontext CTA, bezpečnostné upozornenie a platnosť produktového stavu.
4. Po publikovaní vykonaj read-only kontrolu stránky a až potom zmeň stav na `published`.
5. Ak sa cieľ zruší, zmení slug alebo sa produkt vráti do `draft`, záznam v registri aktualizuj a živý odkaz odstráň iba cez samostatne schválený produkčný postup.

## Otvorené body

- Otvorený bod: finálne WooCommerce slugs, existujúca kategóriová hierarchia a reálne produktové stránky nie sú v tomto repozitári potvrdené.
- Otvorený bod: žiadny z plánovaných článkov ani modelových projektov v registri nebol read-only overený ako publikovaný.
- Otvorený bod: konkrétne modely, sklad, ceny, SKU, EAN a obsah balenia treba pred prepojením na predajnú stránku overiť samostatne.
- Otvorený bod: pri práci s napájaním, batériami alebo relé treba samostatne určiť bezpečnostný rozsah a nikdy nenavádzať laikov na prácu s 230 V.

## Kontrolné kritériá

- Každá väzba má zdrojový dokument, zamýšľaný cieľ, účel a jasnú bránu pred zverejnením.
- Register neobsahuje vymyslené produkčné URL, slugs, SKU, ceny, sklad ani tvrdenie o kompatibilite konkrétneho produktu.
- Každý odkaz vedie zákazníka v systéme Produkt → Blog → Projekt → Odporúčané produkty → Interné odkazy bez automatického publikovania.
- Žiadna položka nie je označená ako `published` bez samostatného read-only produkčného auditu.

## Odporúčaný ďalší krok

Pred prípravou prvého článku alebo modelového projektu vykonať read-only audit existujúcich WordPress kategórií a stránok. Až potom sa smie potvrdiť konkrétny slug alebo zmeniť niektorá položka registra z `planned` na `verified`.
