# Garmin AI Coach

Osobný analytický projekt pre spracovanie exportovaných Garmin dát a tvorbu bezpečných odporúčaní pre tréning, regeneráciu, spánok, pitný režim a stravu.

## Stav projektu

Toto je počiatočný blueprint. Zatiaľ nepridáva žiadny automatický prístup ku Garmin účtu, žiadne prihlasovanie a žiadne ukladanie citlivých údajov.

## Ciele v1

1. Načítať Garmin exporty zo súborov.
2. Uložiť dáta lokálne do jednoduchej databázy.
3. Vypočítať základný denný readiness stav.
4. Vytvoriť denný a týždenný report.
5. Oddeliť tréningové odporúčania od zdravotnej diagnostiky.
6. Pripraviť čistú architektúru pre neskorší dashboard.

## Dáta pre prvú verziu

Prvá verzia má pracovať iba so súbormi, ktoré používateľ manuálne exportuje alebo vloží do projektu.

Podporované typy plánované pre v1:

- CSV exporty,
- FIT súbory,
- TCX súbory,
- manuálne zadané poznámky k spánku, strave a pocitu tela.

## Navrhovaná štruktúra

```text
garmin-ai-coach/
  README.md
  data/
    raw/
    processed/
  src/
    importers/
    analysis/
    reports/
  tests/
```

## Moduly v1

### Import

Úloha importu je previesť vstupné súbory na jednotný interný formát.

Minimálne polia:

- dátum,
- typ aktivity,
- trvanie,
- vzdialenosť,
- priemerný tep,
- maximálny tep,
- kalórie,
- spánok,
- stres,
- poznámka používateľa.

### Analýza

Analýza má najprv počítať jednoduché pravidlové skóre bez AI.

Príklady:

- slabý spánok zníži tréningovú pripravenosť,
- vysoký pokojový tep zníži tréningovú pripravenosť,
- viac ťažkých dní po sebe zvýši riziko preťaženia,
- ľahké dni a kvalitný spánok zlepšia odporúčanie.

### Reporty

Denný report má obsahovať:

- stav pripravenosti,
- hlavné dôvody hodnotenia,
- odporúčanú intenzitu,
- jednoduché odporúčanie pitného režimu,
- jednoduché odporúčanie stravy,
- upozornenie pri rizikovom trende.

Týždenný report má obsahovať:

- prehľad tréningovej záťaže,
- spánkový trend,
- regeneráciu,
- progres,
- návrh ďalšieho týždňa.

## Bezpečnostné pravidlá

- Projekt nesmie ukladať heslá ani tokeny.
- Projekt nesmie tvrdiť, že robí lekársku diagnózu.
- Odporúčania majú byť konzervatívne pri únave, chorobe alebo neobvyklých metrikách.
- Pri rizikových príznakoch má výstup odporučiť odbornú kontrolu.
- Dáta používateľa majú zostať lokálne, pokiaľ používateľ výslovne nenastaví iný režim.

## Pravidlá vývoja

- Malé PR po krokoch.
- Maximálne 3 súbory na jednu úlohu.
- Cieľovo do 200 zmenených riadkov na PR.
- Najprv import dát, až potom AI.
- Najprv pravidlová analýza, až potom odporúčací model.

## Najbližší technický krok

Pridať minimálny Python parser pre jednoduchý CSV súbor s dennými metrikami a testovací ukážkový vstup.

Navrhovaný ďalší PR:

```text
garmin-ai-coach/src/importers/daily_csv.py
garmin-ai-coach/tests/test_daily_csv.py
garmin-ai-coach/data/sample_daily_metrics.csv
```
