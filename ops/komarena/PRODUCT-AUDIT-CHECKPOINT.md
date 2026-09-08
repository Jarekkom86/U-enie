# KomArena Product Audit Checkpoint

Last updated: 2026-09-08 16:57 Europe/Bratislava

## Purpose
Persistent resume point for KomArena.sk WooCommerce product audit and MASTER normalization. Continue from this file before making the next product wave.

## Process rules
- Woo physical KomArena stock and supplier stock must never be mixed.
- Physical KomArena stock: normal `Skladom X ks` according to real local quantity.
- Supplier >20 pcs: customer-facing `U dodávateľa – 10+ ks`.
- Supplier 1–20 pcs: customer-facing exact `U dodávateľa – X ks`.
- Supplier 0 / unavailable / unsafe margin: FAIL CLOSED, no ordering.
- Supplier-backed products: Woo stock_quantity=0, stock_status=onbackorder, backorders=notify, tag `U dodávateľa`.
- FAIL CLOSED: Woo stock_quantity=0, stock_status=outofstock, backorders=no, remove supplier tag when supplier purchase is not commercially safe.
- eSUN PLA+ MASTER 1.3 technical data: nozzle 210–230 °C; bed 45–60 °C; high-speed parameter <300 mm/s. Do not copy Botland blanket 350 mm/s.
- Commercial gate: preserve minimum safe margin rule (target 12% after relevant costs/fees); if uncertain, FAIL CLOSED.
- Never invent SKU/EAN/stock. Match exact variant first.

## Completed before this checkpoint
- P0 audit: 84/84 published products reviewed.
- 18650 Woo ID 4213 regression fixed: stock 0 / outofstock / no backorder.
- Commercially unsafe ABS+, eVacuum/eCure/eEnclosure/eSpool variants fail-closed where margin/availability was unsafe.
- PLA+ Black: MASTER 1.3, non-orderable due unsafe margin (Botland exact SUN-28257 was too expensive relative to KomArena 18.90 EUR).
- PLA+ White: MASTER 1.3, supplier-backed, previously verified 1454 pcs.
- PLA+ Blue: MASTER 1.3, supplier-backed, previously verified 220 pcs.

## Wave completed 2026-09-08
### eSUN PLA+ Olive Green
- Woo ID: 3780
- KomArena price: 18.90 EUR
- Botland: SUN-28255
- EAN: 6922572219250
- Botland observed price: 11.50 EUR
- Botland observed quantity: 1 pc
- Result: MASTER 1.3
- Customer state: `U dodávateľa – 1 ks`
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

### eSUN PLA+ Red
- Woo ID: 3781
- KomArena price: 18.90 EUR
- Botland: SUN-28258
- EAN: 6922572219052
- Botland observed price: 11.50 EUR
- Botland observed quantity: 138 pcs
- Result: MASTER 1.3
- Customer state: `U dodávateľa – 10+ ks`
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

### eSUN PLA+ Fire Engine Red
- Woo ID: 3782
- KomArena price: 18.90 EUR
- Botland: SUN-28275
- EAN: 6922572219236
- Botland observed price: 11.50 EUR
- Botland observed quantity: 298 pcs
- Result: MASTER 1.3
- Customer state: `U dodávateľa – 10+ ks`
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

## Next queue — resume here
1. eSUN PLA+ Yellow
2. eSUN PLA+ Bone White
3. eSUN PLA+ Brown

For each: exact Woo ID -> exact Botland SKU/EAN -> current price -> exact quantity -> 12% commercial gate -> MASTER 1.3 -> supplier/backorder or FAIL CLOSED -> read-back validation.

## Deferred PLA+ cleanup
- RGB Red Woo ID 3844 is a separate variant, not the plain Red above. Known Botland match SUN-28284 / EAN 6922572216389. Its old MASTER 1.2 content still contains stale 350 mm/s and should be normalized in a later cleanup wave.

## Tool routing
- Authoritative Woo operations for KomArena: MCP Server for WordPress (`mosmcp__list-products`, `mosmcp__update-product`).
- WP Agent connection currently points to TipTopKuchyne, not KomArena — do not use it for KomArena product writes.
- WordPress.com sees KomArena as Jetpack-connected but site-management MCP is not the Woo authority for this workflow.
- GitHub persistence: `Jarekkom86/komarena-webops-lab/ops/komarena/PRODUCT-AUDIT-CHECKPOINT.md`.
