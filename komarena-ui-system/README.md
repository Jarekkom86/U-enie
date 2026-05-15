# KomArena UI System

WordPress plugin that unifies frontend design across homepage, header, search, menu, WooCommerce listing/category/product pages, sidebar widgets and footer for KomArena.sk.

## Version
1.0.2

## Install
1. Upload `komarena-ui-system` folder as ZIP in **WordPress Admin → Plugins → Add New → Upload Plugin**.
2. Activate **KomArena UI System**.
3. Clear cache/CDN.

## What it does
- Enqueues frontend CSS files via `wp_enqueue_scripts`.
- Adds `komarena-unified-ui.css` as the base visual system.
- Adds `komarena-web-polish.css` as the 1.0.2 frontend polish layer.
- Improves homepage rhythm, product cards, category/shop listings, product detail readability, CTA consistency and focus states.
- Does not change admin UI.
- Does not change database.
- Does not call external services.
- Does not modify checkout/payment/shipping/order logic.
- Disabling plugin immediately disables design changes.

## Notes
- Covers native WooCommerce + AWS + DGWT/FiboSearch header search selectors.
- JavaScript file is present for future use and is intentionally **not enqueued** in v1.0.2.
- Status: **ready for test installation in WordPress**, not automatic production merge.
- Transaction pages such as checkout, cart and account stay guarded from aggressive layout restyling.
