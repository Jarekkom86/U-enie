<!-- markdownlint-disable MD013 -->

# KomArena.sk WooCommerce CSV batch 001 – report

## Summary

Vytvorený bol prvý testovací WooCommerce CSV balík 20 produktov pre KomArena.sk. Všetky produkty sú nastavené ako `draft`, pretože pri nich ostávajú otvorené body k technickým parametrom, kompatibilite, obsahu balenia, skladovej dostupnosti alebo finálnej importnej schéme.

CSV nepoužíva obrázky a obsahuje iba povinné minimálne stĺpce: `Name`, `Short description`, `Description`, `SKU`, `Regular price`, `Categories`, `EAN`, `Stock`, `Status`, `Tax status`.

## Zoznam produktov

| # | Produkt | SKU | Interný EAN | Kategória | Cena | Status | Otvorené body |
| ---: | --- | --- | --- | --- | ---: | --- | --- |
| 1 | ESP32 vývojová doska pre smart home prototypy | `KOM-ESP-0001` | `2998000000011` | Vývojové dosky | 8.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 2 | ESP8266 vývojová doska pre jednoduché Wi-Fi projekty | `KOM-ESP-0002` | `2998000000028` | Vývojové dosky | 5.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 3 | USB kábel pre ESP32 a ESP8266 vývojové dosky | `KOM-KAB-0003` | `2998000000035` | Elektronika | 2.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 4 | Dupont vodiče samec-samec pre prototypovanie | `KOM-KAB-0004` | `2998000000042` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 5 | Dupont vodiče samec-samica pre moduly a senzory | `KOM-KAB-0005` | `2998000000059` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 6 | Nepájivé kontaktné pole pre elektronické prototypy | `KOM-ELK-0006` | `2998000000066` | Elektronika | 4.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 7 | DHT22 / DHT11 teplotný a vlhkostný senzor pre ESP projekty | `KOM-SEN-0007` | `2998000000073` | Senzory | 4.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 8 | DS18B20 teplotný senzor pre meranie v ESP projekte | `KOM-SEN-0008` | `2998000000080` | Senzory | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 9 | PIR senzor pohybu pre nízkonapäťové smart home projekty | `KOM-SEN-0009` | `2998000000097` | Senzory | 4.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 10 | LDR svetelný senzor pre meranie intenzity osvetlenia | `KOM-SEN-0010` | `2998000000103` | Senzory | 1.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 11 | Relé modul pre bezpečný nízkonapäťový ESP projekt | `KOM-REL-0011` | `2998000000110` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 12 | MOSFET modul pre nízkonapäťové spínanie záťaže | `KOM-ELK-0012` | `2998000000127` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 13 | LM2596 step-down menič pre nízkonapäťové napájanie | `KOM-NAP-0013` | `2998000000134` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 14 | MT3608 step-up menič pre nízkonapäťové prototypy | `KOM-NAP-0014` | `2998000000141` | Elektronika | 2.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 15 | MB102 napájací modul pre nepájivé kontaktné pole | `KOM-NAP-0015` | `2998000000158` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 16 | Držiak batérií pre nízkonapäťové elektronické projekty | `KOM-BAT-0016` | `2998000000165` | Batérie | 2.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 17 | Sada rezistorov pre elektronické a ESP prototypy | `KOM-ELK-0017` | `2998000000172` | Elektronika | 4.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 18 | Sada LED diód pre výučbu a smart home indikáciu | `KOM-ELK-0018` | `2998000000189` | Elektronika | 3.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 19 | Základná pinzeta pre prácu s elektronikou | `KOM-NAR-0019` | `2998000000196` | Náradie | 2.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |
| 20 | Začiatočnícky ESP32 smart home kit pre prvé projekty | `KOM-KIT-0020` | `2998000000202` | Kity a sety | 24.99 | draft | Technické parametre, kompatibilitu s Home Assistant / ESPHome / ESPBuild, obsah balenia, reálny sklad, finálnu cenu a finálnu EAN schému treba overiť pred importom alebo publikovaním. |

## Otvorené body

- Otvorený bod: overiť presné technické parametre každého produktu podľa reálnej dodávky.
- Otvorený bod: overiť kompatibilitu s Home Assistant / ESPHome / ESPBuild podľa konkrétnej konfigurácie a firmvéru.
- Otvorený bod: potvrdiť finálne zloženie balenia, najmä pri kite, sadách a moduloch s viacerými variantmi.
- Otvorený bod: potvrdiť skladové množstvá; v testovacom CSV je `Stock` nastavený na `0`.
- Otvorený bod: potvrdiť finálnu cenotvorbu pred importom do WooCommerce; testovacie ceny sú nastavené ako čisté čísla s koncovkou `.99`.
- Otvorený bod: potvrdiť finálnu schému interných EAN pred hromadným importom; uvedené EAN sú interné identifikátory začínajúce na `2998`, nie oficiálne EAN výrobcov.

## Odporúčané ďalšie kroky

1. Overiť reálne produktové varianty, parametre, fotografie a obsah balenia podľa dodávateľov.
2. Doplniť alebo upraviť skladové množstvá podľa reálneho skladu.
3. Pre produkty s overenými parametrami pripraviť finálne `publish` verzie; zvyšné produkty ponechať ako `draft`.
4. Pripraviť interné prelinkovanie Produkt → Blog/návod → Modelový projekt → Odporúčané produkty → Sociálne siete → Newsletter.
5. Pripraviť samostatný blogový a projektový plán pre ESP32, senzory, relé a napájacie moduly s dôrazom na bezpečné nízke napätie.

## Čo sa nemenilo

- Nebol menený produkčný web.
- Neboli menené platby, checkout, objednávky, databáza, doprava ani daňové nastavenia.
- Neboli vložené API kľúče, heslá, tokeny ani certifikáty.
- Neboli použité obrázky.
- Nebol menený PHP/CSS/JS/HTML/JSON runtime kód.

## Bezpečnostná poznámka

Texty používajú iba bezpečné nízkonapäťové modelové príklady. Pri relé nie je uvádzaný návod na prácu s 230 V a pri napájacích moduloch sa vyžaduje kontrola polarity, napätia a limitov modulu.
