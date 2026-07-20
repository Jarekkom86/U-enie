<!-- markdownlint-disable MD013 MD060 -->

# QA Autopilot

## Účel a rozsah

QA Autopilot pripravuje opakovateľnú kontrolu webu a obsahu. Nájde problém, určí severity, uloží dôkaz, navrhne bezpečný ďalší krok a podľa schvaľovacej úrovne vytvorí iba povolený dokumentačný PR alebo issue.

Tento workflow nemení produkčný WordPress, hosting, DNS, redirecty, cache, WooCommerce dáta, platby, checkout, objednávky, databázu ani externé systémy. Zdrojom aktuálnej priority a blokátorov je GitHub dashboard issue #24.

## Testovacie úrovne

| Úroveň | Povolené prostredie | Povolené kontroly | Zakázané alebo blokované kontroly |
|---|---|---|---|
| Q0 — repozitár | Lokálna pracovná vetva a GitHub CI | `git diff --check`, Markdown lint, rozsah zmien, stav PR, review thready a CI. | Runtime, workflow, produkčné alebo externé zmeny bez samostatného zadania. |
| Q1 — verejný read-only web | Verejná URL bez prihlásenia | HTTP stav, presmerovanie, viditeľný obsah, H1, formulár bez odoslania, základný mobilný layout, konzola a neúspešné requesty. | Prihlásenie, odoslanie formulára, košík, checkout, zápis, test platby, upload a zmena cookies alebo nastavení. |
| Q2 — izolovaný lokálny staging | Docker/WSL lokálne na `127.0.0.1` až po vstupnej bráne W-012 | Funkčný test šablóny, menu, vyhľadávanie, košík, linky, lokálne screenshoty, Lighthouse, accessibility, SEO a lokálne sieťové chyby. | Produkčná DB, verejné porty, reálne e-maily, platobné brány, webhooky, externý cron a produkčné API kľúče. |
| Q3 — schválený produkčný audit | Len po výslovnom rozhodnutí vlastníka a s primeraným prístupom | Prihlásený read-first audit revízie, audit konfigurácie a jednotlivé explicitne schválené testy. | Akýkoľvek krok nad udelené oprávnenie; automatický submit formulára, test objednávky alebo platba bez samostatného schválenia. |

## Vstupné brány

### Pred každým QA behom

1. Načítať issue #24, aktuálny `main`, otvorené PR, ich draft stav, head SHA, CI a review thready.
2. Určiť, či ide o Q0, Q1, Q2 alebo Q3. Pri neistote použiť nižšiu úroveň.
3. Skontrolovať, že cieľ nie je duplicitou už zdokumentovaného testu, issue alebo PR.
4. Stanoviť očakávaný výsledok, rozsah a dôkaz, ktorý sa má uložiť.
5. Pri runtime, produkčnej, produktovej alebo externej zmene zastaviť a vyžiadať rozhodnutie vlastníka.

### Dodatočná brána pre Q2

Q2 sa nesmie spustiť, kým W-012 nemá overený originálny SQL export, kompletný WordPress/FTP snapshot, read-only uložené originály a lokálnu izoláciu podľa `docs/komarena-home-v4-local-staging.md`.

### Dodatočná brána pre Q3

Q3 vyžaduje výslovne udelený prístup a presný rozsah. Aktuálne samotné verejné overenie ReSmartu nenahrádza prihlásený audit ani skutočné odoslanie formulára.

## Kontrolné oblasti

- homepage, menu, kategórie, produktové stránky a interné odkazy,
- košík a checkout iba auditne bez reálnej platby,
- rozbité odkazy, 404, presmerovania a neúspešné requesty,
- konzolové chyby, mobilný layout a vizuálna konzistencia,
- SEO základy: jeden H1, nadpisová hierarchia, indexovateľnosť iba v povolenom prostredí,
- výkon a accessibility iba read-only alebo lokálne,
- bezpečnostné upozornenia a pravidlá `draft` → `publish`.

## Postup QA behu

1. **Zachytiť baseline.** Zapísať URL alebo commit, čas, úroveň testu, viewport a požadovaný výsledok.
2. **Vykonať primerané kontroly.** Q0 používa repozitárové kontroly; Q1 iba pasívne webové kontroly; Q2 lokálny stack; Q3 len schválený audit.
3. **Klasifikovať výsledok.** Každý nález má mať severity podľa `docs/qa/severity-system.md`, presný dôkaz, dopad a reprodukčný krok.
4. **Vyhodnotiť riziko.** S1/S2 nikdy automaticky neopravovať. S3/S4 možno pripraviť iba ako povolený docs-only PR; runtime alebo produkčná oprava vždy čaká na rozhodnutie vlastníka.
5. **Zverejniť výsledok.** Aktualizovať issue #24 pri významnej zmene. Komentár pridať iba pre nový blokátor, potvrdenú regresiu, uzatvorený míľnik alebo zmenu produkčného stavu.
6. **Overiť opravu.** Po docs-only PR znova overiť diff, CI, nezmenený head SHA a nulové review thready. PR #1 ani PR #19 sa nikdy automaticky nemergujú.

## Minimálny dôkazný záznam

| Pole | Povinný obsah |
|---|---|
| Identifikátor | Issue, PR alebo QA nález. |
| Úroveň | Q0, Q1, Q2 alebo Q3. |
| Cieľ | Commit, verejná URL alebo localhost URL. |
| Čas a prostredie | Čas kontroly, viewport a použité prostredie. |
| Výsledok | Očakávaný a skutočný stav. |
| Dôkaz | HTTP stav, screenshot, log, CI run alebo presný reprodukčný krok. |
| Severity a dopad | S1 až S4 a používateľský alebo obchodný dopad. |
| Ďalší krok | Bezpečná oprava, blokátor alebo rozhodnutie vlastníka. |

## Aktuálne známe hranice

- ReSmart verejné URL možno overovať iba Q1; formulár sa bez samostatného súhlasu neodosiela.
- W-012 je vstupná brána pre všetky Q2 testy KomArena homepage v4 a PR #36 zostáva draft.
- Docker engine sa nespúšťa iba kvôli QA, ak nie sú vstupy W-012 overené a izolované.
- Checkout, platby, objednávky, dane, doprava a databáza sú vždy audit-only.
- PR #1 a PR #19 majú výslovný zákaz automatického merge; runtime PR sa týmto workflow nespúšťajú ani nenasadzujú.

## Kritériá dokončenia QA behu

- Úroveň testu bola zvolená a zdôvodnená.
- Kontroly neprekročili povolené prostredie ani oprávnenia.
- Každý nález má dôkaz, severity a ďalší krok.
- Produkčný alebo externý stav sa nemenil, ak to nebolo osobitne schválené.
- Dashboard a relevantný issue alebo PR sú aktualizované iba pri významnej zmene.

## Odporúčaný ďalší krok

Pre W-012 zostať pri Q0/Q1, kým nebudú dostupné a overené vstupné zálohy. Po ich dodaní vykonať Q2 vstupnú bránu podľa staging runbooku; až následne plánovať vizuálnu QA alebo test PR #36.
