<!-- markdownlint-disable MD013 -->

# Batch 01 — WordPress draft manifest

Dátum vytvorenia draftov: 2026-09-11
Posledný day-of prepublish check: 2026-09-12 02:00 CEST

Tento súbor zaznamenáva reálne WordPress drafty vytvorené z `publish-packages/batch-01/`. Všetky ostávajú v stave `draft`; nič nebolo publikované ani naplánované.

| Source | WordPress ID | Slug | Kategórie | Featured media | Schema |
| --- | ---: | --- | --- | ---: | --- |
| 003 | 4296 | `esphome-esp32-prvy-projekt-home-assistant` | 583 + 322 | 3512 | WebPage / TechArticle |
| 005 | 4297 | `esp32-restart-brownout-napajanie` | 583 + 322 | 2162 | WebPage / TechArticle |
| 013 | 4298 | `napajanie-esp32-vyber-zdroja` | 583 + 322 | 3510 | WebPage / TechArticle |
| 014 | 4299 | `bluetooth-proxy-vs-usb-adapter-home-assistant` | 583 + 586 | 1989 | WebPage / TechArticle |
| 008 | 4300 | `pla-vs-pla-plus-vs-abs-plus` | 585 + 586 | 4017 | WebPage / Article |

## WordPress edit URLs

- 4296: `https://komarena.sk/wp-admin/post.php?post=4296&action=edit`
- 4297: `https://komarena.sk/wp-admin/post.php?post=4297&action=edit`
- 4298: `https://komarena.sk/wp-admin/post.php?post=4298&action=edit`
- 4299: `https://komarena.sk/wp-admin/post.php?post=4299&action=edit`
- 4300: `https://komarena.sk/wp-admin/post.php?post=4300&action=edit`

## Applied configuration

- target categories assigned and default category `Nezaradené` removed,
- tags assigned from the payloads; `PLA+` / `ABS+` use non-colliding WordPress tag names `PLA Plus` / `ABS Plus`,
- prepared excerpts explicitly applied and confirmed in revisions,
- Yoast SEO title, meta description and focus keyword applied,
- schema applied as listed above,
- featured image assigned from existing KomArena media library,
- all five posts use the default WordPress post template and are not Elementor-controlled,
- post 4300 mobile-risk table removed and replaced with PLA / PLA+ / ABS+ sections and lists; revision 4306 confirms the update.

## Final API audit

### PASS

- all five posts remain `draft`; none is scheduled or published,
- body content does not contain a second H1; the post title supplies the page H1 and article sections begin at H2/H3,
- prepared custom excerpts are stored correctly in revisions,
- Yoast metadata verified after write: SEO title, meta description and focus keyword are present,
- robots verified: `noindex=false`, `nofollow=false`, `noimageindex=false`, `noarchive=false`, `nosnippet=false`,
- canonical override is empty, so each article falls back to its own WordPress permalink,
- schema verified: 003/005/013/014 = `WebPage / TechArticle`; 008 = `WebPage / Article`,
- internal live hub targets resolve to published WordPress pages,
- product link source of truth remains the live WooCommerce permalink.

Browser preview zostáva odporúčaná ľudská kontrola, ale po odstránení širokej tabuľky nie je evidovaný konkrétny technický layout blokér v Batch 01.

## Day-of WooCommerce gate — 2026-09-12 02:00 CEST

ESP32 DevKit V1 ID 2159:

- `status=publish`,
- `catalog_visibility=visible`,
- `purchasable=true`,
- `stock_quantity=19`,
- `stock_status=instock`,
- `backorders=no`,
- permalink: `https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/`.

HW-319 ID 2997:

- `status=publish`,
- `catalog_visibility=visible`,
- `purchasable=true`,
- `stock_quantity=2`,
- `stock_status=instock`,
- `backorders=no`,
- permalink: `https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/`.

HW-319 zostáva low-stock CTA, preto sa jeho stav načíta ešte raz bezprostredne pred samotným publish postu 4298.

## Publish gate

Pred akýmkoľvek `post-publish`:

- vyžadovať explicitný publish súhlas,
- recheck živého WooCommerce permalink/stock gate pri produktových CTA,
- verify featured-image assignment, taxonomy, Yoast/schema a robots,
- zachovať verejnú kópiu bez dodávateľských/sourcing/purchase-price/internal SKU poznámok,
- pri 4298 FAIL CLOSED, ak HW-319 prestane byť objednateľný,
- po publish vykonať smoke test verejného permalink-u a pri kritickom probléme použiť `post-unpublish`.

Presný operačný postup je v `publish-runbook.md`.
