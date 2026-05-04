# KomArena UI System

WordPress plugin that unifies frontend design across homepage, header, search, menu, WooCommerce listing/category/product pages, sidebar widgets and footer for KomArena.sk.

## Version
1.0.0

## Install
1. Upload `komarena-ui-system` folder as ZIP in **WordPress Admin → Plugins → Add New → Upload Plugin**.
2. Activate **KomArena UI System**.
3. Clear cache/CDN.

## What it does
- Enqueues one frontend CSS file via `wp_enqueue_scripts`.
- Does not change admin UI.
- Does not change database.
- Does not call external services.
- Does not modify checkout/payment/shipping/order logic.
- Disabling plugin immediately disables design changes.

## Notes
- Covers native WooCommerce + AWS + DGWT/FiboSearch header search selectors.
- JavaScript file is present for future use and is intentionally **not enqueued** in v1.0.0.
- Status: **ready for test installation in WordPress**, not automatic production merge.

- Neve/WooCommerce strengthened selectors are included for safer theme override behavior.
