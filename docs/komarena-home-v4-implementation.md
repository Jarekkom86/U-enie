# KomArena Homepage v4 — implementation and validation plan

## Goal

Implement the approved light premium KomArena direction as an opt-in WordPress page template that is easy to index, fast to render and designed around two primary conversions:

1. buy a compatible smart-home product,
2. solve a problem through ReSmart.

## Current implementation

The repository implementation includes:

- a full-width plugin page template,
- a dedicated CSS bundle,
- one H1 and semantic heading order,
- crawlable HTML navigation and internal links,
- product search posted to the verified WooCommerce shop archive rather than the redirected root query endpoint,
- WooCommerce-backed product cards supplied only through explicit approved IDs,
- category fallbacks when product data is incomplete,
- dynamic cart count,
- structured data for OnlineStore, WebSite and ReSmart Service without an unverified SearchAction,
- no custom JavaScript,
- reduced-motion support,
- staging-only activation through a selectable page template.

## Deliberate production blockers

The implementation must not be enabled as the public homepage until all of the following are resolved:

- approved local hero and section photographs are uploaded in WebP or AVIF,
- remote image defaults are replaced through `komarena_home_v4_images`,
- one to four products are explicitly approved and supplied through `komarena_home_v4_product_ids`; the current audit validates only `2997`, `2984` and `2978`, with a fourth shop card used for a three-product set,
- product `2467` remains excluded until its price, main image and source-backed copy pass a new audit,
- incorrect or unverified WooCommerce prices are fixed or the affected products remain unpublished,
- every navigation target returns the intended canonical page and HTTP 200 without an unnecessary redirect,
- ReSmart form and privacy acceptance render correctly,
- staging Lighthouse and accessibility checks pass,
- a production backup and rollback path are confirmed.

## Staging acceptance criteria

### SEO and crawlability

- exactly one H1,
- no empty or JavaScript-only navigation links,
- title, meta description and canonical are supplied by the active SEO stack without duplication,
- robots allow indexing only on the intended production page,
- internal links lead to canonical category, guide, product and service URLs,
- structured data validates without critical errors,
- product schema remains owned by WooCommerce/SEO tooling on product pages.

### Performance targets

- no custom frontend JavaScript,
- locally hosted WebP/AVIF images before production,
- hero image preloaded once and sized responsively,
- below-the-fold images lazy loaded,
- no layout shift from missing image dimensions,
- staging target: LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms on representative mobile testing.

### Sales and trust

- hero presents one clear value proposition,
- primary CTA leads to the shop and secondary CTA leads to ReSmart,
- product cards show real WooCommerce prices and stock states only,
- category fallbacks remain useful when products are withheld,
- ReSmart language does not imply affiliation with manufacturers,
- no fabricated ratings, stock levels, customer counts or certifications.

### Safety and rollback

- template is assigned only on staging first,
- current public homepage remains unchanged during validation,
- no cache purge outside the tested URL unless explicitly approved,
- deactivating the plugin or changing the page template restores the previous rendering path,
- no checkout, payments, shipping, tax, account or order code is modified.

## Codex work packages after this PR

### W-001 — Staging content mapping

- map real WordPress pages and product-category slugs,
- identify one to four explicitly approved products; do not fall back to featured or latest products,
- verify price, stock, image rights and compatibility,
- supply IDs through the documented filter,
- do not publish or change product data without owner approval.

### W-002 — Local media replacement

- prepare approved hero and section images in AVIF/WebP,
- provide responsive variants and explicit dimensions,
- upload only to staging,
- replace all temporary remote image defaults,
- document source and usage rights.

### W-003 — ReSmart conversion flow

- repair the public ReSmart form and privacy acceptance,
- verify CF7 form ID and successful submission path,
- keep passwords and access data out of all fields and logs,
- validate `/resmart/` and the recovery query URL.

### W-004 — Staging QA

- test desktop, tablet and mobile breakpoints,
- validate keyboard navigation and visible focus,
- run HTML, structured-data, accessibility and Lighthouse checks,
- inspect WooCommerce cart/search links,
- record screenshots and results without changing production.

### W-005 — Controlled production release

- require current backup confirmation and owner approval,
- assign the validated page as the static homepage,
- purge only the necessary page cache,
- verify HTTP 200, canonical, analytics, search, products, ReSmart and rollback,
- revert immediately if acceptance criteria fail.
