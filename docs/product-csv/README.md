<!-- markdownlint-disable MD013 MD060 -->

# Register produktových CSV

Tento dokument je autoritatívny index pracovných produktových CSV v repozitári KomArena. Určuje, ktorý súbor je preferovaný pracovný základ, ktoré súbory sú historické vstupy a aké podmienky musia byť splnené pred importom alebo publikovaním.

Register nemení produktové dáta a nepotvrdzuje pripravenosť na produkčný import.

## Rozhodnutie o pracovnom základe

Od 2026-07-11 platí:

1. `komarena-products-batch-001-verified.csv` je preferovaný pracovný základ pre ďalšie produktové návrhy a validačné práce.
2. `komarena-products-batch-001.csv` zostáva zachovaný ako historický 20-produktový vstup a nesmie sa použiť ako priamy produkčný import.
3. Každý CSV súbor sa posudzuje spolu so svojím sprievodným reportom.
4. Žiadny evidovaný CSV balík nie je automaticky pripravený na publikovanie.
5. Budúce zmeny sa majú robiť v novom malom PR; historické súbory sa neprepisujú bez samostatného zdôvodnenia.

## Evidované artefakty

| Artefakt | Položky | Úloha | Schéma | Aktuálny stav | Povolené použitie |
|---|---:|---|---|---|---|
| `komarena-products-batch-001-verified.csv` | 5 | Preferovaný pracovný základ | Obsahuje `Published` | Všetko `draft`, `Published = 0`, `Stock = 0` | Ďalšie overovanie, produktové návrhy a príprava budúcej importnej verzie |
| `komarena-products-batch-001-verified-report.md` | 5 | Dôkazový a validačný report | Zdroje, overené údaje, otvorené body a bezpečnostné poznámky | Aktuálny sprievodný report preferovaného balíka | Povinný kontext pri práci s overeným CSV |
| `komarena-products-batch-001.csv` | 20 | Historický testovací vstup | Neobsahuje `Published` | Všetko `draft`; údaje a varianty vyžadujú ďalšie overenie | Inventár nápadov a porovnávací historický zdroj, nie produkčný import |
| `komarena-products-batch-001-report.md` | 20 | Historický sprievodný report | Zoznam produktov a spoločné otvorené body | Historický podklad | Kontext k pôvodnému balíku a plán ďalšieho overovania |

## Poradie autority

Pri rozpore používaj toto poradie:

1. tento register určuje, ktorý balík je pracovný základ,
2. report k preferovanému balíku určuje overené fakty a otvorené body,
3. preferované CSV obsahuje aktuálne štruktúrované pracovné záznamy,
4. historický report a historické CSV slúžia iba ako referencia,
5. novší potvrdený dôkaz od výrobcu, dodávateľa alebo zo skutočného skladu má prednosť, ale musí byť zapracovaný cez samostatný PR.

## Bezpečnostné a publikačné hranice

Pred importom alebo zmenou produktu na publikovaný stav musia byť potvrdené minimálne:

- presný výrobca, model a variant reálnej dodávky,
- technické parametre a kompatibilita podľa dôveryhodných zdrojov,
- obsah balenia,
- reálna cena a sklad,
- bezpečnostné upozornenia,
- produktové fotografie s jasným právom použitia,
- výsledná WooCommerce importná schéma,
- pravidlá identifikátorov zo samostatného kroku T-004,
- úspešná validácia CSV a kontrola výsledku na stagingu.

Kým tieto podmienky nie sú splnené, produkt zostáva `draft`, `Published = 0` a sklad sa nesmie domýšľať.

## Identifikátory

Hodnoty začínajúce na `2998` sú v existujúcich reportoch vedené ako interné identifikátory. Nesmú sa prezentovať ako výrobcom pridelené EAN. Presné pravidlá pre `SKU`, EAN-13 a pole `Published` budú formalizované v T-004.

## Zakázané skratky

- Nekopírovať automaticky všetkých 20 historických položiek do preferovaného balíka.
- Neprepisovať otvorené body vágne formulovaným tvrdením, že produkt je overený.
- Nezmeniť `draft` na `publish` iba preto, že záznam má cenu alebo interný identifikátor.
- Nepovažovať úspešné parsovanie CSV za dôkaz správnosti produktových údajov.
- Nemeniť produkciu, WooCommerce ani externé systémy v rámci dokumentačného registra.

## Ďalší krok

T-004 má v samostatnom dokumentačnom PR formalizovať jednotné pravidlá pre primárny `SKU`, validáciu EAN-13 a povinné použitie poľa `Published`.
