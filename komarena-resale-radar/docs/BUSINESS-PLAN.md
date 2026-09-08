# KomArena Resale Radar — podnikateľský plán v0.1

## 1. Zámer

Vybudovať malý, dátovo riadený resale/repas biznis, ktorý nekupuje „lacné veci všeobecne“, ale iba ponuky s merateľnou výhodou: podhodnotená cena, jasný dopyt, zvládnuteľná oprava a krátka doba obratu kapitálu.

KomArena Resale Radar má byť rozhodovacie centrum, nie obyčajný zoznam inzerátov. Každý nákup musí mať pred nákupom odhad nákladov, predajnej ceny, rizika, času a čistého zisku.

## 2. Strategická výhoda

Výhoda nevzniká tým, že budeme sledovať najviac portálov. Vzniká kombináciou:

- rýchle zachytenie novej ponuky,
- znalosť modelov a typických porúch,
- lokálne osobné prevzatie a okamžité otestovanie,
- schopnosť vykonať lacný servis/repas,
- databáza reálnych nákupných a predajných cien,
- disciplína nekúpiť zlú ponuku.

## 3. Geografická stratégia

### Tier A — okamžitý zásah

Bratislava, Senec, Šamorín, Dunajská Streda a rozumné okolie. Priorita je osobné prevzatie, test a možnosť vyjednávať na mieste.

### Tier B — Slovensko

Zásielka iba pri dostatočnej cenovej rezerve a dôveryhodnom stave/predávajúcom.

### Tier C — Česko a Poľsko

Použiť pri:

- výrazne nižšej obstarávacej cene,
- zaujímavom modeli s nedostatkom na SK trhu,
- nákupe viacerých kusov alebo dielov,
- príležitosti s profitom, ktorý absorbuje dopravu, kurz a reklamácie.

## 4. Segmenty

### A. De'Longhi a kávovary — priorita 1

Prečo:

- vysoká cena funkčného kusu oproti cene poškodeného,
- veľa porúch je mechanických/hydraulických a opakovateľných,
- možnosť postupne budovať servisné know-how a zásobu dielov,
- predaj aj servis sa môžu navzájom podporovať.

Prvé playbooky:

- Magnifica / Magnifica S
- ECAM platformy s dostupnými dielmi
- vybrané Dinamica modely až po vytvorení servisnej istoty

Neberieme automaticky každý „pokazený De'Longhi“. Najcennejšie sú kusy s dobre popísanou a pravdepodobne lokalizovanou chybou.

### B. Konzoly — priorita 1

Fokus:

- PS4 Slim / Pro
- PS5 Disc / Slim
- Xbox One S/X, Series S/X
- Nintendo Switch/OLED pri jasnom stave
- originálne ovládače

Výhody: vysoký dopyt, jednoduché porovnanie trhu, rýchly predaj. Riziká: HDMI porty, prehrievanie, mechaniky, drift, účet/zámky, nejasné sériové čísla.

### C. PC a notebooky — priorita 1

Preferujeme business rady a štandardizované modely, pri ktorých je ľahký servis a dostupné diely.

Dobré poruchy:

- SSD/HDD
- RAM
- batéria
- klávesnica
- ventilátor/čistenie
- chýbajúci OS alebo zanedbaný systém

Zlé poruchy pre rýchly flip:

- kvapalina
- nejasný motherboard fault
- BGA/GPU
- zamknutý BIOS bez legitímneho riešenia
- výrazne poškodené šasi pri nízkej hodnote modelu

### D. Hry a bundle — priorita 1

Hry majú nižší absolútny zisk, ale často veľmi rýchly obrat. Najlepší model je kúpiť výhodný balík, oceniť jednotlivé položky, predať žiadané kusy samostatne a slabšie kusy znovu spojiť do bundle.

### E. Darované / za odvoz — priorita 2

Nulová nákupná cena neznamená nulové náklady. Radar musí započítať cestu, čas, odvoz, čistenie, likvidáciu nepoužiteľného zvyšku a skladovanie.

Prioritou sú malé a stredné zariadenia s vysokou hodnotou na kilogram a krátkym testom. Veľké spotrebiče bez jasnej predajnej cesty majú nízku prioritu.

## 5. Zdrojová stratégia

### Slovensko

- Bazoš.sk — vysoká frekvencia, vhodné uložené vyhľadávania/RSS/e-mail
- Bazar.sk — sekundárny všeobecný zdroj
- Facebook Marketplace a lokálne skupiny — vysoká hodnota, ale manuálne/cez oficiálne povolené rozhrania
- darovacie a „za odvoz“ zdroje

### Česko

- Bazoš.cz
- Sbazar.cz
- Aukro.cz
- Daruji za odvoz / za-odvoz ekosystém
- Facebook Marketplace

### Poľsko

- OLX.pl
- Allegro Lokalnie
- kategória Oddam za darmo
- lokálne marketplace zdroje podľa dostupnosti a podmienok

## 6. Nákupný funnel

`Zdroj → Normalizácia → Deduplikácia → Odhad trhovej ceny → Odhad poruchy → Deal Score → Alert → Manuálne overenie → Kúpa → Test → Oprava/čistenie → Predaj → Reálny výsledok → učenie modelu`

Každý dokončený obchod musí vrátiť späť:

- nákupnú cenu,
- všetky vedľajšie náklady,
- reálny čas práce,
- reálnu predajnú cenu,
- počet dní do predaja,
- reklamáciu/vrátenie,
- čistý zisk.

Toto je dôležitejšie než teoretické cenové odhady.

## 7. Kapitálová disciplína

Nekupovať preto, že je niečo „lacné“. Kapitál má prednosť pre dealy s najlepším pomerom:

`očakávaný čistý zisk × pravdepodobnosť úspechu / viazaný kapitál / čas do predaja`

Pravidlá MVP:

- jeden vysoko rizikový projekt nesmie zablokovať väčšinu dostupného nákupného kapitálu,
- poškodený kus bez diagnostiky musí mať výrazne vyššiu rezervu než otestovaný kus,
- starý sklad sa každý týždeň preceňuje a zlacňuje,
- po 30/60/90 dňoch sa automaticky mení stratégia ceny alebo likvidácie.

## 8. Predajná stratégia

Predajný kanál sa vyberá podľa produktu:

- Bazoš / Marketplace: rýchly lokálny predaj a nižšie poplatky
- Aukro / Allegro / platformy s ochranou: vhodné pre zberateľské a ľahko posielateľné položky
- vlastný KomArena kanál až pri jasnom procese testovania, fakturácie a spotrebiteľských povinností

Každý repasovaný produkt má mať:

- pravdivý stav,
- vykonané testy,
- zoznam vymenených dielov,
- fotografie konkrétneho kusu,
- sériové číslo interne zaznamenané,
- jasne uvedené známe kozmetické vady.

## 9. KPI

Týždenne:

- počet nových zachytených dealov
- počet dealov score >= 78
- počet oslovení/nákupov
- priemerná nákupná cena
- kapitál viazaný v zásobe
- očakávaný a realizovaný čistý zisk
- priemerný ROI
- medián dní do predaja
- úspešnosť opráv
- reklamácie/vrátenia
- false-positive rate radaru

Cieľ prvého obdobia nie je maximalizovať obrat. Cieľ je vybudovať dátový základ a zistiť, ktoré 2–3 segmenty majú najlepší reálny zisk na hodinu a kapitál.

## 10. Prevádzkový režim

### Každé ráno

- nové ponuky za poslednú noc
- top 10 podľa score
- nové bezplatné/za odvoz položky v lokálnom okruhu

### Priebežne

- urgent alert pri score >= 85 a čerstvosti <= 1 h
- alert pri kľúčovom modeli pod nastavenou nákupnou cenou

### Večer

- stav otvorených nákupov
- zmeny cien vo watchliste
- ponuky staršie ako 24 h vhodné na vyjednávanie

### Týždenne

- realized profit report
- úprava cenových benchmarkov
- vyradenie kategórií s nízkou úspešnosťou
- minimálne tri funkčné zlepšenia systému a changelog

## 11. Compliance a účtovná stopa

Pri opakovanom profesionálnom predaji nejde o náhodný súkromný predaj. Systém preto musí od začiatku uchovávať obchodnú stopu: doklad/identifikáciu nákupu v primeranom rozsahu, náklady, servisný protokol a predajný doklad podľa platných povinností.

Pri použitom tovare treba osobitne overovať spotrebiteľskú zodpovednosť za vady a daňový režim. Pre platiteľov DPH existuje za splnenia podmienok osobitná úprava zdaňovania použitého tovaru založená na marži; aplikácia závisí od statusu predávajúceho a konkrétneho nákupu. Pred ostrým spustením predaja sa nastavenie overí s účtovníkom/daňovým poradcom.

## 12. Roadmap

### v0.1 — MVP

- statický dashboard
- scoring
- quick analyzer
- watchlist v localStorage
- source registry
- category playbooks

### v0.2 — Data intake

- RSS/e-mail ingest tam, kde je dostupný
- normalizácia URL a deduplikácia
- historické snapshoty cien
- alerty

### v0.3 — Market intelligence

- modelové benchmarky
- price history
- opravy a diely
- realized-profit learning

### v0.4 — AI triage

- rozpoznanie modelu z názvu/popisu
- klasifikácia poruchy
- sumarizácia rizík
- návrh otázok pre predávajúceho

### v1.0 — Operational center

- stabilný multi-source ingest
- používateľské schvaľovanie
- nákupný a servisný pipeline
- sklad
- reporting
- audit log
- bezpečné integrácie s ďalšími KomArena systémami
