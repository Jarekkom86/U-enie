# Stav KomArena Autopilot OS

## Datum poslednej aktualizacie

2026-07-11

## Baseline overenia

`afe7619462dcdc8da09844f56ce5973b35655cac`

## Aktualna faza

Autopilot OS v3 core, Sprint Runner, WebOps report, ESP32 ESPHome starter product cluster a ESP32 DevKit source document su zloucene v `main` cez PR #12 az #16.

Otvoreny PR #19 nie je sucastou `main` a predstavuje samostatnu rozpracovanu UI/ESPHome zmenu.

## Posledny potvrdeny miletnik

PR #16 — Create ESP32 DevKit source document — bol zlouceny do `main`.

## Aktualne otvorene polozky

- Zosuladit `docs/autopilot/backlog.md` a `docs/komarena-webops-os-report.md` v samostatnej ulohe T-002.
- Rozhodnut o PR #19.
- Rozhodnut o PR #1.
- Rozhodnut o historickych vetvach.

## Co je povolene autonomne

Dokumentacia, backlog, checklisty, strategie, produktove a obsahove drafty cez samostatnu vetvu a Pull Request.

## Co je zakazane

Priame zmeny do `main`, produkcne nasadenie, checkout, platby, objednavky, databaza, dane, doprava, tajne udaje a runtime kod bez schvalenia.

## Otvorene rizika

Autopilot nema potvrdeny priamy pristup k analytike, Search Console, WooCommerce reportom ani staging checkout testom.

Home Assistant runtime, ESPHome YAML konfiguracia, produkcne nasadenie WordPress pluginu a produkcne nasadenie Gmail Cleaner nie su v tomto repozitari potvrdene.

ESP32 produktovy dokument zostava draft a vyzaduje overenie konkretneho modelu, parametrov, skladu, ceny, EAN, SKU, fotografii a obsahu balenia.

## Co caka na majitela

Rozhodnut o dalsom postupe pre PR #19, PR #1 a historicke vetvy. Produkcne ani externe nasadenie nebolo tymto zosuladenim potvrdene.

## Odporucany dalsi krok

T-002 — zosuladit backlog a WebOps report s potvrdenym stavom `main` bez zmeny runtime kodu.

## Vyzaduje overenie

- realne nasadenie KomArena UI pluginu,
- realne nasadenie Gmail Cleaner,
- Home Assistant konfiguracia,
- ESPHome YAML konfiguracia,
- umiestnenie ReSmart a JARO OS Command Center.
