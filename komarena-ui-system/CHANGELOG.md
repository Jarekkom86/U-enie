# Changelog

## 1.0.1 - 2026-05-04
- Reduced header/search/menu vertical sizing for a more compact professional top bar.
- Reduced top spacing between header/menu and homepage hero/content.
- Enforced white search icon rendering for SVG/path/pseudo/icon variants while keeping teal search button `#00979D`.
- No PHP logic changes beyond version bump; DB/checkout/payment/shipping/order behavior unchanged.

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
