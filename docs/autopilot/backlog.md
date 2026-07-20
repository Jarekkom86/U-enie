<!-- markdownlint-disable MD013 MD060 -->

# Autopilot Backlog

## Datum posledneho overenia

2026-07-20

## Baseline overenia

`c9e0f9f9fe10467206c5539ca9db1b7b0ee047f9`

| ID | Nazov | Typ | Obchodny dopad | Riziko | Vetva | Vystup | Uroven | Stav |
|---|---|---|---|---|---|---|---|---|
| B-001 | Create Autopilot Sprint Runner | Core OS | vysoky | nizke | autopilot-sprint-runner | dokumenty a sablony | LEVEL 1 | done — PR #14 merged |
| B-002 | Create ESP32 ESPHome starter cluster | Produktovy cluster | vysoky | stredne | product-esp32-esphome-starter-cluster | cluster draft | LEVEL 2 | done — PR #15 merged |
| B-003 | Create ESPHome start CSV draft | CSV | vysoky | stredne | csv-esphome-start-draft | CSV draft | LEVEL 2 | todo |
| B-004 | Create ESPHome thermometer project | Projekt | vysoky | stredne | project-esphome-thermometer | modelovy projekt | LEVEL 2 | todo |
| B-005 | Create internal linking register | SEO | vysoky | nizke | seo-internal-linking-register | linking register | LEVEL 2 | done — PR #48 merged |
| B-006 | Create QA automation workflow draft | QA | vysoky | stredne | qa-automation-workflow-draft | workflow navrh | LEVEL 2 | done — PR #49 merged |
| B-007 | Create Design visual QA workflow | Dizajn | stredny | stredne | design-visual-qa-workflow | workflow navrh | LEVEL 2 | todo |
| B-008 | Create homepage growth audit | UX CRO | vysoky | stredne | ux-homepage-growth-audit | audit | LEVEL 2 | todo |
| B-009 | Create category landing page draft | Kategorie | vysoky | stredne | category-landing-page-draft | draft | LEVEL 2 | todo |
| B-010 | Create publishing checklist | Publishing | vysoky | nizke | publishing-checklist | checklist | LEVEL 1 | done — PR #46 merged |
| B-011 | Create ESP32 DevKit source document | Produktovy zdroj | vysoky | stredne | product-esp32-devkit-source-doc | source document draft | LEVEL 2 | done — PR #16 merged |

## Stav po zosuladeni

- PR #12 vytvoril WebOps report a PR #13 vytvoril Autopilot OS v3 core; ide o potvrdene zakladne artefakty, nie o povodne backlog polozky.
- B-001, B-002 a B-011 su potvrdene ako dokoncene v `main` cez PR #14, #15 a #16.
- B-003, B-004 a B-007 az B-009 zostavaju planovane a nedokoncene.
- B-005 je dokoncene cez docs-only PR #48; register zaznamenava iba planovane interne vazby a ich brany bez zivych URL.
- B-006 je dokoncene cez docs-only PR #49; rozsiruje existujuci QA Autopilot o bezpecne testovacie urovne Q0 az Q3 bez spustenia stagingu alebo produkcnych testov.
- B-010 je dokoncene cez docs-only PR #46; checklist nepublikoval ziaden produkt ani nemenil WooCommerce data.
- Otvoreny PR #19 nie je sucastou `main` ani dokonceneho backlogu.

## Pravidlo vyberu

Uprednostni ulohu s vysokym obchodnym dopadom, nizkym rizikom, jasnymi povolenymi subormi a prinosom pre buduce autonomne sprinty.
