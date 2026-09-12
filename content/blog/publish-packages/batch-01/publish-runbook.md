<!-- markdownlint-disable MD013 -->

# Batch 01 — publish runbook

Dátum prípravy: 2026-09-12

Tento runbook je operačný postup pre kontrolované publikovanie Batch 01. Sám o sebe nič nepublikuje ani neplánuje.

## Odporúčané poradie

1. **4296 / 003 — ESPHome + ESP32: prvý projekt krok za krokom**
2. **4297 / 005 — ESP32 sa reštartuje? Ako odhaliť problém s napájaním**
3. **4299 / 014 — Bluetooth Proxy vs USB adaptér pre Home Assistant**
4. **4300 / 008 — PLA vs PLA+ vs ABS+: ktorý filament vybrať**
5. **4298 / 013 — Napájanie ESP32: ako vybrať zdroj a step-down menič**

4298 ide posledný zámerne, pretože obsahuje stock-sensitive CTA na HW-319. Tesne pred jeho publish sa musí znovu načítať živý WooCommerce produkt.

## Pre-publish gate pre každý post

Pred `post-publish`:

- post je stále `draft`,
- názov a slug sa nezmenili,
- featured image zostáva priradený,
- kategórie a tagy sedia,
- Yoast title/meta/focus keyword sú uložené,
- schema je správna,
- canonical override je prázdny,
- robots sú index/follow,
- verejná kópia neobsahuje supplier/sourcing/purchase-price/internal SKU poznámky,
- produktové URL sa čítajú zo živého WooCommerce permalink-u,
- stock-sensitive CTA prejde live gate.

## Špeciálny gate 4298

Bezprostredne pred publish načítať produkt 2997 a vyžadovať:

- status `publish`,
- catalog visibility `visible`,
- `purchasable=true`,
- `stock_status=instock`,
- `stock_quantity > 0`,
- `backorders=no`,
- permalink zodpovedá odkazu v článku.

Ak ktorýkoľvek bod zlyhá, FAIL CLOSED:

- nepublikovať 4298 s aktívnym predajným CTA,
- CTA odstrániť alebo zmeniť na informačný odkaz,
- znovu skontrolovať výsledný draft.

## Post-publish smoke test

Po publikovaní každého článku okamžite overiť:

1. status `publish`,
2. finálny verejný permalink,
3. verejná URL vracia HTTP 200,
4. title/H1 sa nezduplikoval,
5. featured image je prítomný,
6. kategórie a tagy sedia,
7. interné odkazy smerujú na živé ciele,
8. produktové odkazy smerujú na živé WooCommerce permalink-y,
9. Yoast title/meta/schema ostali zachované,
10. článok sa objavuje v správnom blog/category flow.

Ak smoke test odhalí kritický problém, `post-unpublish` späť na draft a opraviť pred ďalším publish.

## Po zverejnení prvého clustra

Keď sú 4296, 4297, 4299 a 4298 verejné, doplniť medzi nimi kontextové interné odkazy tam, kde prirodzene pomáhajú čitateľovi:

- 4296 → diagnostika napájania 4297,
- 4297 → výber zdroja/step-down 4298,
- 4298 → diagnostika brownout 4297,
- 4299 → prvý ESPHome projekt 4296.

Tieto odkazy nepridávať pred publish, ak by smerovali na verejne nedostupné draft URL.

4300 zostáva samostatný 3D-printing entry point a má primárne smerovať na 3D tlač hub; netreba doň nasilu miešať ESPHome cluster.

## Rollback

Ak sa po publish objaví chyba, ktorú nemožno bezpečne opraviť okamžite:

- použiť `post-unpublish` na návrat do `draft`,
- nechať slug bez zbytočnej zmeny,
- opraviť obsah/metadáta,
- zopakovať pre-publish gate,
- až potom znovu publikovať.

## Stav pri vytvorení runbooku

Day-of kontrola 2026-09-12 02:00 CEST:

- 4296–4300 sú stále `draft`,
- ESP32 DevKit V1 ID 2159: publish / visible / purchasable / instock / 19 ks / backorders off,
- HW-319 ID 2997: publish / visible / purchasable / instock / 2 ks / backorders off,
- žiadny článok Batch 01 nie je publikovaný ani naplánovaný.
