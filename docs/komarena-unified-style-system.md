<!-- markdownlint-disable MD013 -->

# KomArena Unified Style System

## Úloha dokumentu

Tento dokument je pracovný dizajnový systém pre lokálneho agenta KomArena.sk. Používa sa pri úpravách WordPress stránok, blokov, kategórií, produktových popisov a obsahových landing stránok.

Agent má pred úpravou novej stránky skontrolovať:

1. `templates/style-brief.md`
2. `docs/komarena-unified-style-system.md`
3. `docs/agent-memory.md`
4. existujúcu stránku alebo šablónu, ktorú ide upravovať

## Základný charakter

KomArena.sk je technický e-shop a Build Lab pre ľudí, ktorí stavajú smart home, ESPHome a IoT projekty. Dizajn musí zákazníkovi rýchlo vysvetliť:

- čo riešenie robí,
- čo k tomu treba kúpiť,
- čo je bezpečné,
- čo treba overiť,
- kedy je lepšie kúpiť hotové zariadenie.

## Povolené vizuálne prvky

- svetlé technické pozadie,
- biele karty s tyrkysovým okrajom,
- jemné tiene,
- tyrkysové CTA tlačidlá,
- sekundárne biele CTA s tyrkysovým okrajom,
- praktické technické tabuľky,
- žltkasté bezpečnostné upozornenia,
- jednoduché diagramy bez externých log,
- produktové karty s krátkym využitím, kompatibilitou a CTA.

## Nepoužívať

- tmavé karty s bledým textom, ak nie je nutné,
- čierne rohové dekorácie alebo artefakty,
- príliš vysoké prázdne hero sekcie,
- dekoratívne grafiky bez informačnej hodnoty,
- karty v kartách,
- text vložený do obrázkov,
- cudzie produktové obrázky, logá predajcov alebo brandované externé vizuály,
- tvrdenia "plne kompatibilné" bez overenia.

## Stránkový rytmus

Odporúčané poradie technickej landing stránky:

1. H1 a praktický úvod.
2. Technický diagram alebo rýchle vysvetlenie.
3. Primárne a sekundárne CTA.
4. Dôvody výberu v 3 až 4 kartách.
5. Ako začať alebo ako vybrať.
6. Produktové karty.
7. Technická tabuľka.
8. Použitie v praxi.
9. Bezpečnostný box.
10. Pre koho je riešenie vhodné.
11. Kedy zvoliť alternatívu.
12. FAQ.
13. Zdroje a interné odkazy.

## Komponenty

### Hero

Hero má byť kompaktný a vecný. H1 nesmie byť marketingová fráza. Podnadpis má vysvetliť praktický úžitok a limity.

### CTA

Primárne CTA má viesť na produkt alebo kategóriu. Sekundárne CTA má viesť na návod, FAQ alebo sekciu "Ako začať".

Príklady:

- Pozrieť ESP produkty
- Ako začať s ESPHome
- Zobraziť senzory
- Prečítať návod

### Produktová karta

Produktová karta má obsahovať:

- názov,
- krátke využitie,
- kompatibilitu alebo otvorený bod,
- CTA.

Nesmie sľubovať kompatibilitu bez overenia.

### Technická tabuľka

Tabuľka má mať dva stĺpce: parameter a hodnota. Ak údaj závisí od modelu, píš "podľa konkrétnej dosky/modulu".

### Bezpečnostný box

Použiť pri 230 V, relé, napájaní, batériách, vyššom prúde, teple alebo mechanickom krytovaní.

## CSS pravidlá

- Nové stránkové systémy majú mať koreňovú triedu.
- Pre ESP & ESPHome je koreňová trieda `.ka-esp-page`.
- Všetky vnútorné triedy majú používať prefix danej stránky alebo komponentu.
- Globálne selektory používaj iba pre všeobecné UI prvky a s guardrailmi.
- WooCommerce transakčné stránky nechaj konzervatívne.

## Kontrola pred uložením

- Text je čitateľný a tmavý.
- CTA sú jasné.
- Sekcie nie sú prázdne.
- Karty majú rovnaký rytmus.
- Tabuľky sú čitateľné na desktope aj mobile.
- Na stránke nie sú cudzie obrázky ani logá.
- Bezpečnostné tvrdenia sú opatrné.
- Checkout/cart/account nie sú ovplyvnené stránkovým CSS.
