# Stav KomArena Autopilot OS

## Datum poslednej aktualizacie

2026-07-20

## Baseline overenia

`dc3120f1fbae58f8baaa0d6c9321348ce7b12e26`

## Aktualna faza

Live operacny stav sa vedie v GitHub dashboarde issue #24; tento dokument je repozitorovy orientacny stav.

Do `main` boli po povinnej CI doplnene docs-only PR #45 (lokalny staging runbook pre W-012) a PR #46 (checklist publikovania produktu). Nezmenili runtime, produkciu ani externe systemy.

Otvorene PR #36 a #32 zostavaju draft. PR #19 a PR #1 zostavaju otvorene a maju vyslovny zakaz automatickeho merge.

## Historicky posledny potvrdeny miletnik

PR #16 — Create ESP32 DevKit source document — bol zlouceny do `main`.

## Aktualny posledny potvrdeny miletnik

PR #46 — docs: add product publishing checklist — bol zlouceny do `main` po uspesnej KomArena validation.

## Aktualne otvorene polozky

- W-012 / issue #41: izolovany lokalny WordPress staging pre draft PR #36 caka na overeny SQL export a kompletny WordPress/FTP snapshot.
- R-007 / issue #34: verejna ReSmart stranka je read-only overena; prihlaseny audit revizie a realny test odoslania formulara zostavaju mimo automatizacie.
- B-003 az B-009 zostavaju planovane podla backlogu.
- Rozhodnut o PR #19.
- Rozhodnut o PR #1.
- Rozhodnut o historickych vetvach.

## Co je povolene autonomne

Dokumentacia, backlog, checklisty, strategie, produktove a obsahove drafty cez samostatnu vetvu a Pull Request.

## Co je zakazane

Priame zmeny do `main`, produkcne nasadenie, checkout, platby, objednavky, databaza, dane, doprava, tajne udaje a runtime kod bez schvalenia.

## Otvorene rizika

- Lokalny staging este nema dostupne overene originalne zalohy; Docker engine ani kontajnery preto neboli spustene.
- ReSmart uz splna verejne overitelne kriterium, ale produkcny submit formulara sa bez prihlaseneho WordPress auditu netestuje.

Autopilot nema potvrdeny priamy pristup k analytike, Search Console, WooCommerce reportom ani staging checkout testom.

Home Assistant runtime, ESPHome YAML konfiguracia, produkcne nasadenie WordPress pluginu a produkcne nasadenie Gmail Cleaner nie su v tomto repozitari potvrdene.

ESP32 produktovy dokument zostava draft a vyzaduje overenie konkretneho modelu, parametrov, skladu, ceny, EAN, SKU, fotografii a obsahu balenia.

## Co caka na majitela

Spristupnit alebo jednorazovo schvalit read-only zdroj SQL exportu a WordPress/FTP snapshotu pre W-012. Rozhodnut o dalsom postupe pre PR #19, PR #1 a historicke vetvy. Produkcne ani externe nasadenie nebolo tymto zosuladenim potvrdene.

## Historicky odporucany dalsi krok

T-002 — zosuladit backlog a WebOps report s potvrdenym stavom `main` bez zmeny runtime kodu.

## Aktualny odporucany dalsi krok

Po dodani overenych zaloh vykonat vstupnu branu W-012 podla `docs/komarena-home-v4-local-staging.md`; dovtedy vybrat iba nizkorizikovy docs alebo produktovy draft z B-003 az B-009.

## Vyzaduje overenie

- realne nasadenie KomArena UI pluginu,
- realne nasadenie Gmail Cleaner,
- Home Assistant konfiguracia,
- ESPHome YAML konfiguracia,
- umiestnenie ReSmart a JARO OS Command Center.
