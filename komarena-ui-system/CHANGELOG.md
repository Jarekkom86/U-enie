# Changelog

## 1.0.3 - 2026-05-29
- Added scoped ESP & ESPHome landing page shortcode `[komarena_esp_esphome_page]`.
- Added a reusable HTML template for the ESP & ESPHome page with hero, technical diagram, product cards, ESP32 table, safety box, FAQ and source section.
- Added `.ka-esp-page` CSS rules for a light Home Assistant-style KomArena visual language: teal accents, readable dark text, rounded cards, restrained shadows, technical tables and mobile layout.
- Kept checkout, cart, account, payment, shipping, orders and database untouched.
- No JavaScript enqueue and no external image or vendor logo usage.

## 1.0.2 - 2026-05-15
- Added `komarena-web-polish.css` as a frontend polish layer.
- Improved homepage rhythm, product cards, category/shop listings, product detail readability, CTA consistency, reusable content cards, warning blocks and focus states.
- Kept transaction pages guarded from aggressive layout restyling.

## 1.0.1 - 2026-05-04
- Reduced header top-row visual height for a tighter modern look.
- Reduced main menu spacing and link padding.
- Reduced spacing between sticky header/menu and homepage hero section.
- Kept header search compact (about 46px) and refined paddings.
- Enforced white search icon rendering on teal submit buttons for AWS/Woo/native selectors, including svg/path/icon wrappers and pseudo-elements.
- No PHP logic changes except version bump; no DB/admin/checkout/payment/shipping/order changes.

## 1.0.0 - 2026-05-04
- Initial release of KomArena UI System plugin.
- Hardened frontend-only visual system for Neve/WooCommerce contexts.
- Added stronger header search support for WooCommerce native selectors, AWS and DGWT/FiboSearch selectors.
- Added fixed modern product grids for shop/category/tag/search pages and removed disruptive listing sidebars.
- Refined product detail styles without aggressive wrapper overrides.
- Added modern product sidebar cards (58x58 thumbs) and optional cart-widget hide in single product sidebar.
- Switched footer to light technical palette (#F7FCFC + teal accents).
- Kept plugin safe: no DB updates, no admin styling, no JS enqueue, no checkout/payment/shipping/order logic changes.
- Release marked ready for **test installation**, not automatic production merge.

- Added additional Neve wrapper hardening and transaction-page guardrails for grid rules.
