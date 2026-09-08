# KomArena Resale Radar — scoring v0.1

## Základná ekonomika

Pre každú ponuku počítame:

`total_cost = purchase + shipping + parts + platform_fees + other_costs + contingency`

`net_profit = expected_resale - total_cost`

`roi_pct = net_profit / total_cost * 100`

Riziková rezerva (`contingency`) je povinná pri neotestovanom alebo poškodenom tovare. V MVP sa odporúča 5–15 % očakávanej predajnej ceny podľa kategórie a neistoty.

## Deal Score 0–100

### 1. Absolútny čistý zisk — max 25

- >= 200 € → 25
- >= 120 € → 22
- >= 80 € → 18
- >= 50 € → 14
- >= 25 € → 8
- > 0 € → 3
- <= 0 € → 0

### 2. ROI — max 20

- >= 100 % → 20
- >= 70 % → 18
- >= 50 % → 15
- >= 35 % → 12
- >= 20 % → 7
- > 0 % → 3
- <= 0 % → 0

### 3. Likvidita / dopyt — max 20

Manuálne alebo historicky určený dopyt 1–10 sa násobí dvomi. Hry, bežné konzoly a známe notebookové rady môžu mať vysokú likviditu; exotické alebo ťažké zariadenia nižšiu.

### 4. Technické riziko — max 15

Používa sa inverzná škála rizika 1–10:

`repair_confidence = (11 - risk) * 1.5`

Riziko 1 znamená jednoduchú, známu a lacnú opravu alebo plne otestovaný kus. Riziko 10 znamená nejasnú poruchu, drahú dosku, vodu, BGA, chýbajúce diely alebo neoveriteľný stav.

### 5. Čerstvosť ponuky — max 10

- <= 1 h → 10
- <= 6 h → 8
- <= 24 h → 6
- <= 72 h → 3
- staršia → 1

### 6. Logistika — max 10

- osobne do 15 km → 10
- do 30 km → 8
- do 80 km → 5
- zásielka s ochranou kupujúceho → 4
- zásielka bez rozumnej ochrany → 2
- nejasná logistika → 1

## Verdikt

Bezpečnostné veto má vždy prednosť pred skóre.

- `KÚPIŤ`: score >= 78, net profit > 0 a nie je aktívne veto
- `VYJEDNÁVAŤ`: score 62–77
- `SLEDOVAŤ`: score 50–61
- `PRESKOČIŤ`: score < 50 alebo net profit <= 0

## Bezpečnostné veto

Ponuka sa vyradí bez ohľadu na score pri:

- podozrení na kradnutý alebo účet-zamknutý produkt,
- nesúlade sériového čísla alebo vlastníctva,
- požiadavke na nevratnú platbu mimo bezpečného kanála bez dôveryhodnosti,
- poškodení, ktoré môže znamenať neúmerné bezpečnostné riziko,
- produktoch s nelegálnym obsahom alebo obchádzaním práv tretích strán.

## Kategóriové minimá

### De'Longhi kávovary

- cieľ net profit: >= 80 €
- preferovaný ROI: >= 60 %
- neznáma porucha: nákup spravidla max 30–35 % realistickej ceny funkčného kusu
- vysoké riziko: poškodená elektronika po prepätí, rozsiahla korózia, chýbajúca sparovacia jednotka, viacnásobná neznáma porucha

### Konzoly

- PS4 / Xbox One: cieľ net profit >= 35–50 €
- PS5 / Xbox Series / Switch: cieľ net profit >= 50–80 € podľa kapitálu a stavu
- preferovaný ROI >= 25–35 %
- vždy overiť HDMI, mechaniku, ovládač, Wi‑Fi, úložisko, sériové číslo a účet/zámky

### PC a notebooky

- cieľ net profit >= 60 € pri celom zariadení
- preferovaný ROI >= 35 %
- dobré opravy: SSD, RAM, batéria, klávesnica, ventilátor, čistenie, systém
- zlé opravy pre rýchly flip: kvapalina, BGA/GPU, zamknutý BIOS, nejasný motherboard fault

### Hry a bundle

- cieľ net profit >= 10–20 € na samostatnej hre alebo >= 30 % ROI
- silný model: kúpiť bundle, ponechať zberateľské/rýchle kusy, zvyšok rozdeliť a predať samostatne

## Prečo score nie je automatický nákup

Score je rozhodovací filter, nie garancia zisku. Pred nákupom musí človek overiť model, fyzický stav, kompletnosť, vlastníctvo a realistickú predajnú cenu.