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
- post template checked against production article 4289: both use the default post template and are not Elementor-controlled.

## Publish gate

Before any `post-publish` action:

- recheck live product permalink and stock/CTA gates,
- review desktop/mobile preview,
- verify featured-image crop and alt text in context,
- run final internal-link check after the first article permalinks exist,
- keep HW-319 CTA under day-of stock gate,
- keep ABS+ CTA under commercial/margin gate,
- obtain explicit publish approval.
