# KomArena UI System

WordPress plugin that unifies frontend design across homepage, header, search, menu, WooCommerce listing/category/product pages, sidebar widgets and footer for KomArena.sk.

## Version
1.0.3

## Install
1. Upload `komarena-ui-system` folder as ZIP in **WordPress Admin → Plugins → Add New → Upload Plugin**.
2. Activate **KomArena UI System**.
3. Clear cache/CDN.

## What it does
- Enqueues frontend CSS files via `wp_enqueue_scripts`.
- Adds `komarena-unified-ui.css` as the base visual system.
- Adds `komarena-web-polish.css` as the frontend polish layer.
- Improves homepage rhythm, product cards, category/shop listings, product detail readability, CTA consistency and focus states.
- Adds the `[komarena_esp_esphome_page]` shortcode for a scoped ESP & ESPHome landing page template.
- Adds ESP & ESPHome page styles scoped to `.ka-esp-page`, so the page can be installed or removed safely from one WordPress page.
- Does not change admin UI.
- Does not change database.
- Does not call external services.
- Does not modify checkout/payment/shipping/order logic.
- Disabling plugin immediately disables design changes.

## Notes
- Covers native WooCommerce + AWS + DGWT/FiboSearch header search selectors.
- JavaScript file is present for future use and is intentionally **not enqueued** in v1.0.3.
- Status: **ready for test installation in WordPress**, not automatic production merge.
- Transaction pages such as checkout, cart and account stay guarded from aggressive layout restyling.

## ESP & ESPHome page usage
1. Create or edit the WordPress page for ESP & ESPHome.
2. Add one shortcode block with:
   `[komarena_esp_esphome_page]`
3. Publish only after previewing desktop and mobile.
4. Keep product/category links updated in WordPress if final category URLs differ from the fallback search URLs.
