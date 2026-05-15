<!-- markdownlint-disable MD013 MD060 -->

# KomArena Autopilot Sprint Runner

## Ucel

Sprint Runner meni Autopilot OS z dokumentacie na opakovatelny pracovny mechanizmus.

## Kedy sa pouziva

Pouzi ho pri kazdom dalsom sprinte, ked ma agent vybrat ulohu, pripravit navrh, audit, issue alebo PR.

## Vstupy

- AGENTS.md
- docs/autopilot/state.md
- docs/autopilot/backlog.md
- docs/autopilot/decision-matrix.md
- docs/autopilot/approval-gates.md
- relevantny engine dokument

## Povinne kroky

1. Precitaj vstupy.
2. Vyber bezpecnu ulohu.
3. Ohodnot ju podla decision matrix.
4. Urci approval level.
5. Rozhodni, ci ide o PR, issue, audit alebo owner decision.
6. Vytvor vetvu mimo main.
7. Uprav iba povolene subory.
8. Spusti kontroly.
9. Aktualizuj state a decision log.
10. Priprav PR report.
11. Navrhni jeden dalsi sprint.

## Stop pravidla

Zastav sa a vytvor owner decision, ak uloha zasahuje checkout, platby, objednavky, databazu, dane, dopravu, produkcne nasadenie, API kluce, tokeny, certifikaty alebo vyzaduje publikovanie produktu bez overenia.
