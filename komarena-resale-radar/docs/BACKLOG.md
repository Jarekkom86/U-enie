# KomArena Resale Radar — MASTER backlog

Priorita je obchodný prínos, spoľahlivosť dát a bezpečné rozhodovanie. Kozmetické zmeny sa nepočítajú ako pravidelné funkčné zlepšenie.

## P0 — živé dáta

### RR-001 — Bazoš intake

- vytvoriť ingest pre uložené vyhľadávania/RSS alebo e-mailové alerty tam, kde sú dostupné,
- podporovať SK a CZ,
- normalizovať názov, cenu, lokalitu, dátum, URL a identifikátor,
- deduplikovať rovnaký inzerát naprieč behmi,
- neprepísať posledný validný stav pri chybe zdroja.

Hotovo keď: nový inzerát sa objaví v Deal Inboxe s dôkazom zdroja a časom zachytenia.

### RR-002 — OLX.pl + Allegro Lokalnie intake

- používať prednostne uložené vyhľadávania/platformové alerty alebo dostupné povolené rozhrania,
- prepočet PLN → EUR ukladať spolu s použitým kurzom a časom kurzu,
- započítať dopravu cez hranice a väčšiu rizikovú rezervu.

Hotovo keď: poľská ponuka vie prejsť rovnakým scoringom ako SK/CZ bez ručných prepočtov.

### RR-003 — Live alert engine

- urgent alert: Deal Score >= 85 a vek <= 1 h,
- štandardný alert: score >= 78,
- výnimka: free/symbolická cena s mimoriadne silným upside,
- upozorniť iba na nový alebo materiálne zlacnený kandidát,
- neupozorňovať pri nulovej zmene.

Blokátor 2026-09-08: účet má aktuálne vyčerpaný limit aktívnych ChatGPT automatizácií.

## P0 — market intelligence

### RR-004 — Price Comps

Pre každý model ukladať minimálne:

- aktívne ponukové ceny,
- preferovane aj realizované predajné ceny, ak sú legálne a dôveryhodne dostupné,
- medián,
- 25./75. percentil,
- počet porovnateľných kusov,
- stav produktu,
- vek benchmarku.

Scoring nesmie považovať jednu extrémnu cenu za trhovú hodnotu.

### RR-005 — Realized P&L ledger

Po každom obchode zapísať:

- nákup,
- dopravu/cestu,
- diely,
- čas práce,
- ostatné náklady,
- dátum nákupu,
- dátum predaja,
- predajnú cenu,
- reklamácie/vrátenia,
- čistý zisk,
- ROI,
- dni do predaja.

Toto bude hlavný zdroj učenia budúcich benchmarkov.

### RR-006 — Capital Velocity

Nové KPI:

`capital_velocity = expected_net_profit × success_probability / capital_tied / expected_days_to_sale`

Radar má prioritizovať deal, ktorý zarába viac na viazané euro a deň, nie iba deal s najvyššou nominálnou maržou.

## P1 — servisná inteligencia

### RR-007 — De'Longhi fault library

Databáza:

- model/modelová rodina,
- symptóm,
- pravdepodobné príčiny,
- potrebné testy,
- typické diely,
- odhad ceny dielov,
- odhad času,
- obtiažnosť 1–10,
- úspešnosť predchádzajúcich opráv,
- bezpečnostné poznámky.

### RR-008 — Console test protocol

Checklista pre PS/Xbox/Nintendo:

- sériové číslo a vlastníctvo,
- účet/activation lock,
- HDMI/video,
- mechanika,
- Wi‑Fi/Bluetooth,
- USB,
- disk/úložisko,
- teploty/hluk,
- ovládače a drift,
- reset do továrenského stavu.

### RR-009 — PC/notebook triage

Rýchla diagnostika:

- POST/BIOS,
- BIOS lock,
- displej,
- batéria,
- SSD SMART,
- RAM test,
- porty,
- klávesnica/touchpad,
- teploty,
- nabíjanie,
- známky kvapaliny.

## P1 — workflow

### RR-010 — Deal lifecycle

Stavy:

`NEW → VERIFYING → NEGOTIATING → BOUGHT → TESTING → REPAIRING → READY_TO_SELL → LISTED → SOLD → RETURNED/CLOSED`

Každá zmena stavu má mať dátum a audit poznámku.

### RR-011 — Seller question generator

Podľa kategórie automaticky pripraviť krátky zoznam otázok, ktoré najviac znižujú neistotu. Bez automatického odoslania.

### RR-012 — 30/60/90 stock policy

- 30 dní: prvé prehodnotenie ceny,
- 60 dní: agresívnejšie prebalenie/bundle/zľava,
- 90 dní: likvidácia kapitálu alebo rozpredaj na diely podľa vyššej návratnosti.

## P1 — integrácie

### RR-013 — Google Sheets ledger

Použiť pripojený Google Sheets ako jednoduchý auditovateľný ledger pre nákupy, opravy, sklad a realizované P&L, kým nebude potrebná plná databáza.

### RR-014 — Price alert plugin

Otestovať navrhnutý Pricey plugin ako doplnkový nástroj na price history/alerts pri produktoch, kde podporuje konkrétnu URL. Nezamieňať retail price tracking za bazárový market intelligence zdroj.

### RR-015 — AI triage

Až po stabilnom dátovom základe:

- normalizácia modelu z textu,
- klasifikácia poruchy,
- odhad chýbajúcich informácií,
- návrh otázok predávajúcemu,
- stručné vysvetlenie Deal Score.

AI nesmie sama kúpiť produkt ani prebiť safety veto.

## P2 — rozšírenie segmentov

Segment sa pridá až po 10–20 overených benchmarkoch a jasnom servisnom/odbytovom playbooku. Kandidáti:

- robotické vysávače,
- audio technika,
- monitory,
- kvalitné náradie,
- vybrané foto/video vybavenie,
- networking a NAS,
- malé spotrebiče s dostupnými dielmi.

## Pravidlo každého pravidelného rozvoja

Každý plánovaný update musí:

1. zachovať MASTER dizajn bez nevyžiadanej zmeny,
2. priniesť minimálne tri konkrétne funkčné zlepšenia,
3. aktualizovať changelog,
4. uviesť testy, riziká a otvorené body,
5. neprezentovať syntetické alebo neoverené dáta ako živé ponuky.
