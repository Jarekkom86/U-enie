# KomArena Resale Radar

KomArena Resale Radar je rozhodovacie centrum pre vyhľadávanie podhodnoteného použitého tovaru, darovaných vecí a opraviteľných zariadení s cieľom rýchleho a kontrolovaného ďalšieho predaja.

## Cieľ MVP

MVP odpovedá na štyri otázky pri každej ponuke:

1. Je cena reálne pod trhom?
2. Vieme stav overiť alebo opravu rozumne odhadnúť?
3. Ako rýchlo sa produkt pravdepodobne predá?
4. Aký je čistý zisk po doprave, dieloch, poplatkoch a rizikovej rezerve?

Výsledkom je verdikt `KÚPIŤ`, `VYJEDNÁVAŤ`, `SLEDOVAŤ` alebo `PRESKOČIŤ`.

## Prioritné segmenty v1

1. De'Longhi kávovary a vybrané malé spotrebiče
2. PlayStation / Xbox / Nintendo konzoly a ovládače
3. PC, notebooky a ľahko vymeniteľné komponenty
4. Hry a výhodné bundle balíky
5. Darované alebo symbolicky nacenené zariadenia vhodné na repas

Geografická priorita pre osobné prevzatie: Bratislava – Senec – Šamorín – Dunajská Streda. Druhá vrstva je zvyšok Slovenska; následne Česko a Poľsko pri dostatočnom cenovom rozdiele.

## Hlavné obrazovky

- `Deal Inbox` – nové ponuky zoradené podľa skóre
- `Quick Analyzer` – manuálny prepočet konkrétnej ponuky
- `Watchlist` – uložené ponuky a lokálne poznámky
- `Source Registry` – portály, spôsob monitoringu a stav integrácie
- `Category Playbooks` – nákupné pravidlá, typické vady a minimálny profit
- `KPIs` – počet príležitostí, kapitál v nákupe, očakávaný profit a rýchlosť obratu

## Bezpečnostné pravidlá

- Žiadny automatický nákup ani kontaktovanie predávajúceho v MVP.
- Žiadne heslá, cookies, session tokeny alebo osobné údaje sa neukladajú do GitHubu.
- Scraping sa nesmie nasadiť bez kontroly podmienok konkrétneho portálu a technickej šetrnosti.
- Ponuka označená ako podozrivá, účet-zamknutá, nelegálna alebo s nejasným vlastníctvom sa automaticky vyradí.
- Pri elektronike s nebezpečnou sieťovou časťou sa oprava realizuje len bezpečným odborným postupom.
- Pred profesionálnym predajom použitého tovaru sa započítava rezerva na reklamácie, testovanie a spotrebiteľské povinnosti.

## Verziovanie

Aktuálna verzia: `0.1.0-mvp`

MASTER pravidlo: schválený vizuálny jazyk KomArena sa pri funkčných aktualizáciách nemení bez výslovného pokynu. Každá ďalšia verzia musí mať changelog a priniesť aspoň tri reálne funkčné zlepšenia pri pravidelnom rozvoji.

## Súbory

- `index.html` – statický dashboard
- `styles.css` – izolovaný vizuálny systém
- `app.js` – scoring, filtre, lokálny watchlist a quick analyzer
- `data/sources.json` – register zdrojov
- `data/categories.json` – nákupné playbooky
- `docs/BUSINESS-PLAN.md` – podnikateľský model
- `docs/SCORING.md` – pravidlá skórovania
- `CHANGELOG.md` – história verzií

## Ďalšia fáza

Po overení MVP sa zber dát presunie na konektory/API/RSS a iba tam, kde je to dovolené, na šetrné crawlery. AI vrstva bude slúžiť na normalizáciu názvov modelov, odhad typu poruchy a porovnanie s historickými predajmi; nebude sama vykonávať nákup.