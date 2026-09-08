# KomArena Product Audit Checkpoint

Last updated: 2026-09-08 17:02 Europe/Bratislava

## Purpose
Persistent resume point for KomArena.sk WooCommerce product audit and MASTER normalization. Continue from this file before making the next product wave.

## Process rules
- Woo physical KomArena stock and supplier stock must never be mixed.
- Physical KomArena stock: normal `Skladom X ks` according to real local quantity.
- Supplier >20 pcs: customer-facing `U dodávateľa – 10+ ks` only when the numerical supplier quantity is actually verified.
- Supplier 1–20 pcs: customer-facing exact `U dodávateľa – X ks` only when the numerical supplier quantity is actually verified.
- Supplier currently available but no numerical count exposed: customer-facing `U dodávateľa – dostupné` + explicit note that the exact public quantity is unavailable. Never invent `10+`.
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
- PLA+ Black: MASTER 1.3, non-orderable due unsafe margin (Botland exact SUN-28257 was too expensive relative to KomArena 18.90 EUR at the checked price).
- PLA+ White: MASTER 1.3, supplier-backed, previously verified 1454 pcs.
- PLA+ Blue: MASTER 1.3, supplier-backed, previously verified 220 pcs.

## Wave completed 2026-09-08 — Olive / Red / Fire Engine Red
### eSUN PLA+ Olive Green
- Woo ID: 3780
- KomArena price: 18.90 EUR
- Botland: SUN-28255
- EAN: 6922572219250
- Botland observed price during exact-count check: 11.50 EUR
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
- Botland observed price during exact-count check: 11.50 EUR
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
- Botland observed price during exact-count check: 11.50 EUR
- Botland observed quantity: 298 pcs
- Result: MASTER 1.3
- Customer state: `U dodávateľa – 10+ ks`
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

## Wave completed 2026-09-08 — Yellow / Bone White / Brown
Fresh Botland PLA category check on 2026-09-08 showed these exact variants as `Available`, `Shipping in 24 hours`, current visible price 10.90 EUR. The fresh public category listing did not expose an exact numerical quantity, so no `10+` quantity was invented.

### eSUN PLA+ Yellow
- Woo ID: 3783
- KomArena price: 18.90 EUR
- Botland: SUN-28259
- EAN: 6922572219069
- Fresh Botland visible price: 10.90 EUR
- Fresh supplier state: Available / Shipping in 24 hours; exact numerical count not publicly exposed in the fresh listing
- Result: MASTER 1.3
- Customer state: `U dodávateľa – dostupné` + exact-count-unavailable note
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

### eSUN PLA+ Bone White
- Woo ID: 3784
- KomArena price: 18.90 EUR
- Botland: SUN-28256
- EAN: 6922572219335
- Fresh Botland visible price: 10.90 EUR
- Fresh supplier state: Available / Shipping in 24 hours; exact numerical count not publicly exposed in the fresh listing
- Result: MASTER 1.3
- Customer state: `U dodávateľa – dostupné` + exact-count-unavailable note
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

### eSUN PLA+ Brown
- Woo ID: 3785
- KomArena price: 18.90 EUR
- Botland: SUN-28281
- EAN: 6922572219199
- Fresh Botland visible price: 10.90 EUR
- Fresh supplier state: Available / Shipping in 24 hours; exact numerical count not publicly exposed in the fresh listing
- Result: MASTER 1.3
- Customer state: `U dodávateľa – dostupné` + exact-count-unavailable note
- Woo: stock 0 / onbackorder / notify
- Tags: eSUN + U dodávateľa

## Next queue — resume here
1. eSUN PLA+ RGB Red — Woo ID 3844; known Botland SUN-28284 / EAN 6922572216389; old MASTER 1.2 content contains stale 350 mm/s.
2. eSUN PLA+ Almond Yellow — Woo ID 3804; old MASTER 1.2, supplier tag/state needs exact-source revalidation before customer-facing availability.
3. Scan remaining published PLA+ items for `data-komarena-standard="1.2"` or stale supplier metadata and normalize only exact verified variants.

For each: exact Woo ID -> exact supplier SKU/EAN -> fresh price -> fresh availability / exact quantity if exposed -> 12% commercial gate -> MASTER 1.3 -> supplier/backorder or FAIL CLOSED -> read-back validation.

## Separate variants already normalized / do not confuse
- Light Brown Woo ID 3887 is separate from Brown 3785 and is already MASTER 1.3.
- Plain Red Woo ID 3781 is separate from RGB Red 3844.

## Tool routing
- Authoritative Woo operations for KomArena: MCP Server for WordPress (`mosmcp__list-products`, `mosmcp__update-product`).
- WP Agent connection currently points to TipTopKuchyne, not KomArena — do not use it for KomArena product writes.
- WordPress.com sees KomArena as Jetpack-connected but site-management MCP is not the Woo authority for this workflow.
- GitHub persistence: `Jarekkom86/komarena-webops-lab/ops/komarena/PRODUCT-AUDIT-CHECKPOINT.md` on branch `ops/komarena-product-audit-checkpoint`, draft PR #91 until repository validation/merge.
