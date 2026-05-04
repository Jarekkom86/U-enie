# Changelog

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
