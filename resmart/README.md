# ReSmart — production + growth source of truth

Status date: 2026-09-09

## Production state

- Brand: **ReSmart by KomArena.sk**
- Live landing: `https://komarena.sk/resmart/`
- WordPress page ID: `3409`
- Layout: KomArena Full Width + Elementor HTML widget (`22ad46a`)
- Main CTA: service request + WhatsApp
- Contact Form 7: `3420` — **ReSmart servisný dopyt**
- CF7 mail delivery: active, replies route to customer email
- Flamingo captured leads as of 2026-09-09: **0**
- Service scope: Home Assistant, ESPHome, ESP32/ESP8266, sensors, Zigbee/Thread/Matter/MQTT, low-voltage diagnostics and smart-device troubleshooting
- Safety boundary: no unqualified 230 V installation work

## Current commercial diagnosis

The service is technically implemented and can receive enquiries, but the funnel is still **lead-only**. The visitor does not see a simple paid entry product, a clear starting price, or a reason to buy now. This makes ReSmart easy to understand as support, but harder to buy as a service.

Legacy naming is also still visible in old/cached paths and drafts (`Servis AQARA`, `/servis-aqara/`). New promotion must use **ReSmart** and canonical `/resmart/` only.

## ReSmart Launch Offer v1

Prices below are the initial commercial proposal for validation, not a promise of universal repair success. Hardware/parts and travel are separate when applicable.

### 1. ReSmart Online diagnostika — 39 €

- up to 60 minutes remote session
- Home Assistant / ESPHome / Zigbee / MQTT / smart-device diagnosis
- review of symptoms, relevant logs and configuration shared safely by the customer
- concrete next-step summary
- no request for passwords, tokens or private keys

**Goal:** lowest-friction paid entry service.

### 2. ReSmart Diagnostika zariadenia — 29 €

- initial bench/technical diagnosis of an accepted device
- assessment of fault, repairability and sensible next step
- repair/parts quoted only after diagnosis
- if a repair is accepted, the diagnostic fee can be credited into labour when commercially appropriate

**Goal:** turn vague repair enquiries into a paid process instead of free troubleshooting.

### 3. Home Assistant Start — from 99 € labour

- initial Home Assistant setup or stabilisation of an existing basic installation
- backup-first workflow
- core configuration and one useful scenario/integration
- handover with a short explanation of what was changed
- hardware and any on-site travel are separate

**Goal:** higher-value service that naturally cross-sells KomArena hardware.

## Market anchor checked 2026-09-09

Current public competitors show that paid Home Assistant support is viable: Czech providers advertise roughly 890–1,000 CZK/hour for consultation and a Slovak provider lists initial Home Assistant configuration at 89.90 € and a starter package at 159.80 €. ReSmart Launch v1 is therefore positioned as an accessible specialist entry offer, not free support.

## Funnel v1

`KomArena content / social / search` → `/resmart/` → **choose paid entry service** → WooCommerce checkout or service request → diagnosis → approved repair/setup → hardware cross-sell → review/reference

## Conversion changes required before paid traffic

1. Add a visible **Cenník / Vyberte si službu** section near the top of `/resmart/`.
2. Add three buyable WooCommerce service products matching Launch Offer v1.
3. Keep `Servisný dopyt` for complex/unknown cases, but do not make it the only conversion route.
4. Add CTA labels with price: `Online diagnostika 39 €`, `Diagnostika zariadenia 29 €`, `Home Assistant Start od 99 €`.
5. Use `/resmart/` as the only promoted landing URL; remove/redirect legacy `/servis-aqara/` references.
6. Add GA4/analytics events for ReSmart CTA, WhatsApp, form submit and purchase if available.
7. Ask completed customers for a short review and permission for anonymised before/after case studies.

## Promotion sprint — first 7 days

- Day 1: launch post — “Home Assistant nefunguje stabilne? ReSmart najprv nájde príčinu.”
- Day 2: educational post — 5 common HA/ESPHome stability mistakes + CTA to online diagnosis.
- Day 3: local post — Miloslavov / Bratislava device diagnostics and personal handover.
- Day 4: case-study format — symptom → diagnosis → solution → what the customer avoided replacing.
- Day 5: ESPHome post — unstable sensor / Wi-Fi / power / logs troubleshooting.
- Day 6: comparison post — repair/integration vs. replacing the whole smart setup.
- Day 7: launch-offer reminder with three service cards and direct CTA.

Primary channels: KomArena.sk, Facebook local/smart-home groups where promotion is allowed, Facebook page, relevant Slovak/Czech smart-home communities, organic Google/SEO. Paid ads should wait until the buyable service products and conversion tracking are live.

## KPIs for first validation cycle

- landing visits
- CTA click rate
- WhatsApp starts
- CF7 submissions
- paid service orders
- enquiry → paid conversion
- average service revenue
- hours spent per job
- attached hardware/parts revenue
- refund/rework rate

### Initial decision rule

Do not optimise for reach first. Optimise for **first 5 paid ReSmart jobs**. After 5 completed jobs, review actual time/job, margin, recurring fault types and customer objections, then adjust pricing and packages using evidence.
