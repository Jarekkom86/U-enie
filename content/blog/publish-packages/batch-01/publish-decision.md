<!-- markdownlint-disable MD013 -->

# Batch 01 — publish decision matrix

Preflight: 2026-09-12
Publish executed: 2026-09-12 10:42–10:44 CEST

Batch 01 was published only after explicit user approval. This document now records the final publication outcome and retained rollback rules.

## Final status

| WP ID | Source | Preflight | Product gate | Publish smoke test | Final status |
| ---: | --- | --- | --- | --- | --- |
| 4296 | 003 | PASS | ESP32 PASS | PASS | PUBLISHED |
| 4297 | 005 | PASS | no critical low-stock CTA | PASS | PUBLISHED |
| 4299 | 014 | PASS | ESP32 PASS | PASS | PUBLISHED |
| 4300 | 008 | PASS | no stock-sensitive CTA | PASS | PUBLISHED |
| 4298 | 013 | PASS | HW-319 immediate gate PASS | PASS | PUBLISHED |

## Public URLs

- 4296 — `https://komarena.sk/esphome-esp32-prvy-projekt-home-assistant/`
- 4297 — `https://komarena.sk/esp32-restart-brownout-napajanie/`
- 4299 — `https://komarena.sk/bluetooth-proxy-vs-usb-adapter-home-assistant/`
- 4300 — `https://komarena.sk/pla-vs-pla-plus-vs-abs-plus/`
- 4298 — `https://komarena.sk/napajanie-esp32-vyber-zdroja/`

## Preflight gates that passed

Across the batch:

- article body/SEO/taxonomy/internal-link audit passed,
- no duplicate H1 in article bodies,
- custom excerpts were confirmed in revisions before publish,
- default non-Elementor post template retained,
- Yoast SEO title/meta/focus keyword and schema were present,
- robots were index/follow,
- internal hub targets were live,
- no supplier/sourcing/purchase-price/internal SKU notes were present,
- low-voltage / 230 V safety boundaries were retained.

Post 4300 had its original four-column comparison table removed before publication and replaced with mobile-safer PLA / PLA+ / ABS+ sections and lists.

## Product gates used

ESP32 DevKit V1 ID 2159 immediately before publication:

- `status=publish`,
- `purchasable=true`,
- `stock_status=instock`,
- `stock_quantity=19`,
- `backorders=no`,
- permalink unchanged.

HW-319 ID 2997 was rechecked again immediately before publishing post 4298:

- `status=publish`,
- `purchasable=true`,
- `stock_status=instock`,
- `stock_quantity=2`,
- `backorders=no`,
- permalink unchanged.

Stock counts are not evergreen public copy and remain operational evidence only.

## Post-publish smoke test

Each post was published individually in the controlled order:

`4296 → 4297 → 4299 → 4300 → 4298`

After each publish, WordPress `post-get` confirmed:

- `status=publish`,
- expected public permalink,
- expected categories/tags,
- body content retained.

The final `post-list-published` check returned all five new posts and 9 published posts total on the site at that checkpoint.

No `post-unpublish` rollback was required.

## Remaining operational rule

A browser/computer-use visual render check is still useful as a non-blocking post-publish QA step. If such a check finds a critical defect in an individual article, unpublish only that article, correct it as draft, and republish after verification.
