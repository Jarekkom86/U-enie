<!-- markdownlint-disable MD013 -->

# Checklist publikovania produktu

## Účel

Tento checklist stanovuje minimálnu dôkaznú bránu pre prechod jedného produktu KomArena z `draft` do `publish`. Je to kontrolný dokument, nie pokyn na automatické publikovanie, hromadný import alebo zmenu produkčného WooCommerce.

Produkt s neúplnými alebo neoverenými údajmi zostáva `draft` a pri použití stĺpca `Published` má hodnotu `0`.

## Ako ho používať

1. Vyplniť dôkaz alebo odkaz ku každej povinnej položke.
2. Otvorený bod nezakrývať odhadom; ponechať produkt v `draft`.
3. Pred produkčnou zmenou nechať výsledok skontrolovať vlastníkom alebo povereným operátorom.
4. Záznam kontroly uložiť pri zdrojovom produkte, pracovnom issue alebo schválenom PR bez tajných údajov.

## Povinné overenia

| Oblasť | Pred publikovaním musí platiť | Dôkaz |
| --- | --- | --- |
| Identita produktu | Názov, výrobca, konkrétny model alebo variant sú jednoznačne určené. | Výrobca, dodávateľ alebo fyzická kontrola dodávky. |
| Technické údaje | Rozmery, napájanie, rozhrania, limity a obsah balenia pochádzajú z dôveryhodného zdroja alebo fyzickej kontroly. | Zdrojový dokument alebo fotodokumentácia dodávky. |
| Kompatibilita | Tvrdenia o Home Assistant, ESPHome, Matter, Zigbee alebo inom ekosystéme sú konkrétne a overené. | Výrobca, oficiálna dokumentácia alebo zdokumentovaný test. |
| Cena | Cena je aktuálna, zdanenie je správne a formát importu je čisté číslo s desatinnou bodkou. | Potvrdený cenník alebo rozhodnutie vlastníka. |
| Sklad | Skladový stav a dostupnosť zodpovedajú reálnej evidencii. | Aktuálny skladový zdroj. |
| SKU a EAN | SKU je jedinečné; interný EAN začínajúci `2998` nie je prezentovaný ako EAN výrobcu. | CSV a zdroj produktu. |
| Kategória | Produkt je v schválenej kategórii a nemá zavádzajúce štítky. | Kategóriová architektúra. |
| Fotografie | Obrázky patria KomArena, majú povolenú licenciu alebo pochádzajú z oprávneného zdroja. | Zdroj, licencia alebo vlastná fotografia. |
| Bezpečnosť | Popis obsahuje primerané upozornenia pri napájaní, batériách, relé, teple alebo 230 V. | Finálny popis a bezpečnostná kontrola. |
| Právny obsah | Záruka, vrátenie a obchodné tvrdenia zodpovedajú aktuálnym pravidlám webu. | Overený odkaz na platné stránky KomArena. |

## Obsahová a SEO kontrola

- Názov je vecný, bez neoverených superlatívov a bez cudzích ochranných známok použitých zavádzajúcim spôsobom.
- Krátky a dlhý popis odlišujú overený fakt od otvoreného bodu.
- Popis nevytvára dojem, že KomArena je oficiálny Home Assistant obchod.
- Produkt nie je prezentovaný ako hotové riešenie, ak vyžaduje zapojenie, firmvér alebo konfiguráciu.
- Pri 230 V je jasne uvedené, že práca patrí odborne spôsobilej osobe.
- Interné odkazy vedú iba na existujúce a kanonické kategórie, návody alebo projekty.
- Ak návod alebo projekt ešte nie je publikovaný, text použije formuláciu `Pripravujeme návod` bez nefunkčného odkazu.
- Pre dôležitý produkt existuje návrh väzby Produkt → Blog/návod → Modelový projekt → Odporúčané príslušenstvo → Interné odkazy → Sociálne siete → Newsletter.

## Technická kontrola pred produkčným krokom

- Produkt je najprv pripravený ako samostatný `draft` alebo v stagingu; nehromadne sa nemenia nesúvisiace produkty.
- CSV je UTF-8 a obsahuje povinné polia `Name`, `Short description`, `Description`, `SKU`, `Regular price`, `Categories`, `EAN`, `Stock`, `Status` a `Tax status`.
- Pri použití CSV importu je rozsah zmien najprv skontrolovaný mimo produkcie alebo v náhľade importu.
- Nepridávajú sa žiadne tajné údaje, API kľúče, dodávateľské prístupy ani zákaznícke exporty.
- Pred publikovaním existuje reverzibilný postup: produkt možno vrátiť na `draft` bez zmeny checkoutu, platieb, daní, dopravy alebo iných produktov.

## Schválenie a záznam

Pred zmenou na `publish` musí záznam obsahovať:

- dátum kontroly,
- identifikátor produktu a variantu,
- zdroj pravdy pre cenu, sklad a technické údaje,
- výsledok každej povinnej oblasti,
- zostávajúce otvorené body alebo potvrdenie, že žiadne nie sú,
- meno osoby, ktorá produkčný krok schválila,
- plán rollbacku.

Ak chýba čo i len jeden povinný dôkaz alebo schválenie produkčnej zmeny, správny výsledok je `draft`, nie `publish`.

## Po publikovaní

Len v schválenom produkčnom kroku overiť:

- zobrazenie ceny, skladu, kategórie, obrázkov a popisu,
- funkčné interné odkazy a kanonickú URL,
- mobilné zobrazenie,
- neprítomnosť neoverených tvrdení,
- že neboli ovplyvnené checkout, platby, doprava, dane ani iné produkty.

Ak sa kontrola nepodarí, produkt sa neoznačuje za úspešne publikovaný; postupuje sa podľa schváleného rollbacku.

## Súvisiace zdroje

- `AGENTS.md`
- `docs/product-standard.md`
- `docs/templates/csv-product-rules.md`
- `docs/category-architecture.md`
- `docs/content-standard.md`
- `docs/seo-internal-linking.md`
