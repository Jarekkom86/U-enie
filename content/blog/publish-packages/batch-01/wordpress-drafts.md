<!-- markdownlint-disable MD013 -->

# Batch 01 — WordPress publication manifest

Dátum vytvorenia draftov: 2026-09-11
Dátum publikovania Batch 01: 2026-09-12
Publikačné okno: 10:42–10:44 CEST

Tento súbor zaznamenáva reálny stav Batch 01 na KomArena.sk po explicitnom publish súhlase. Všetkých päť postov bolo publikovaných jednotlivo podľa `publish-runbook.md` a po každom publish prešiel okamžitý WordPress smoke test.

| Source | WordPress ID | Status | Verejný permalink | Kategórie | Featured media | Schema | Publish time |
| --- | ---: | --- | --- | --- | ---: | --- | --- |
| 003 | 4296 | `publish` | `https://komarena.sk/esphome-esp32-prvy-projekt-home-assistant/` | 583 + 322 | 3512 | WebPage / TechArticle | 10:42:53 |
| 005 | 4297 | `publish` | `https://komarena.sk/esp32-restart-brownout-napajanie/` | 583 + 322 | 2162 | WebPage / TechArticle | 10:43:35 |
| 014 | 4299 | `publish` | `https://komarena.sk/bluetooth-proxy-vs-usb-adapter-home-assistant/` | 583 + 586 | 1989 | WebPage / TechArticle | 10:43:52 |
| 008 | 4300 | `publish` | `https://komarena.sk/pla-vs-pla-plus-vs-abs-plus/` | 585 + 586 | 4017 | WebPage / Article | 10:44:07 |
| 013 | 4298 | `publish` | `https://komarena.sk/napajanie-esp32-vyber-zdroja/` | 583 + 322 | 3510 | WebPage / TechArticle | 10:44:30 |

## Publication result

PASS:

- all five posts report `status=publish` after publication,
- all five expected public permalinks were returned by WordPress,
- target categories and tags remained attached after publish,
- default non-Elementor template remained unchanged,
- prepared bodies remained intact,
- post 4300 stayed on the mobile-safe PLA / PLA+ / ABS+ section layout with no wide comparison table,
- WordPress `post-list-published` immediately after the batch returned all five new posts; the site reported 9 published posts total at that checkpoint,
- no rollback via `post-unpublish` was required.

The smoke test was performed through the authoritative WordPress API/read path. A separate browser/computer-use visual HTTP/render test was not performed in this session.

## Product gate used for publication

Immediately before the batch:

ESP32 DevKit V1 ID 2159:

- `status=publish`,
- `purchasable=true`,
- `stock_quantity=19`,
- `stock_status=instock`,
- `backorders=no`,
- permalink unchanged: `https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/`.

Immediately before publishing post 4298, HW-319 ID 2997 was rechecked again:

- `status=publish`,
- `purchasable=true`,
- `stock_quantity=2`,
- `stock_status=instock`,
- `backorders=no`,
- permalink unchanged: `https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/`.

Stock counts are operational evidence only and are not copied into evergreen public article copy.

## Applied configuration retained

- target categories assigned; default `Nezaradené` removed,
- tags retained; `PLA+` / `ABS+` use WordPress tag names `PLA Plus` / `ABS Plus`,
- prepared excerpts confirmed in revisions before publish,
- Yoast SEO title, meta description and focus keyword applied,
- schema retained as listed above,
- featured images retained from the KomArena media library,
- public copy contains no supplier/sourcing/purchase-price/internal SKU notes,
- low-voltage / 230 V safety boundaries remain in technical articles.

## Rollback rule

If a critical production defect is later confirmed in one of these posts, use `post-unpublish` on that individual post and correct it as a draft before republishing. Do not roll back the whole batch for an isolated article issue.
