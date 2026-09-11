<!-- markdownlint-disable MD013 -->

# Batch 01 — WordPress draft manifest

Dátum vytvorenia draftov: 2026-09-11

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
- prepared excerpts explicitly applied after WordPress initially generated automatic excerpts,
- Yoast SEO title, meta description and focus keyword applied,
- schema applied as listed above,
- featured image assigned from existing KomArena media library,
- all five posts use the default WordPress post template and are not Elementor-controlled.

## Final API audit — 2026-09-11

### PASS

- all five posts remain `draft`; none is scheduled or published,
- body content does not contain a second H1; the post title supplies the page H1 and article sections begin at H2/H3,
- prepared custom excerpts are stored correctly in the latest revisions:
  - 4296 → revision 4301,
  - 4297 → revision 4302,
  - 4298 → revision 4303,
  - 4299 → revision 4304,
  - 4300 → revision 4305,
- `post-get` renders an automatic excerpt preview even when the stored custom excerpt is correct; revision data is the reliable verification source,
- all five posts use the same default non-Elementor template model as production article 4289,
- Yoast metadata verified after write: SEO title, meta description and focus keyword are present,
- robots verified: `noindex=false`, `nofollow=false`, `noimageindex=false`, `noarchive=false`, `nosnippet=false`,
- canonical override is empty, so each article falls back to its own WordPress permalink,
- schema verified: 003/005/013/014 = `WebPage / TechArticle`; 008 = `WebPage / Article`,
- internal live hub targets resolve to published WordPress pages:
  - ESP & ESPHome → page 2562,
  - Home Assistant → page 2561,
  - Senzory → page 2564,
  - Napájanie → page 3668,
  - 3D tlač → page 3977,
- product link source of truth remains the live WooCommerce permalink; ESP32 ID 2159 and HW-319 ID 2997 were verified during Batch 01 preflight.

### Remaining visual gate

A true desktop/mobile browser preview was **not executed** because browser/computer-use handoff was declined. Do not mark the visual layer as PASS without that check.

Specific remaining visual risk:

- post 4300 contains a four-column comparison `<table>`; its actual mobile overflow/wrapping must be checked in a browser before publish.

No automatic styling rewrite was applied to that table without a rendered preview, to avoid introducing an unverified visual regression.

## Publish gate

Before any `post-publish` action:

- recheck live product permalink and stock/CTA gates,
- complete real desktop/mobile preview,
- verify featured-image crop and alt text in context,
- specifically verify mobile behavior of the comparison table in post 4300,
- run final internal-link check after the first article permalinks exist,
- keep HW-319 CTA under day-of stock gate,
- keep ABS+ CTA under commercial/margin gate,
- obtain explicit publish approval.
