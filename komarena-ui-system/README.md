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
- Disabling plugin immediately disables design changes.

## Notes
- Assign menu class `cta` to important items (Home Assistant / Produkty / Servis).
- Keep checkout/payment/shipping logic untouched.

- JavaScript file is present for future use and is intentionally **not enqueued** in v1.0.0.
