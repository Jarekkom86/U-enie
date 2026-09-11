<!-- markdownlint-disable MD013 -->

# Batch 01 — publish decision matrix

Dátum posledného preflightu: 2026-09-11

Tento dokument rozlišuje **obsahovú pripravenosť** od samotného publish súhlasu. Žiadny post sa týmto dokumentom automaticky nepublikuje ani neplánuje.

## Súhrn

| WP ID | Source | Obsah/SEO | Taxonómia | Linky | Produktový gate | Vizuálny gate | Verdict |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 4296 | 003 | PASS | PASS | PASS | ESP32 live/instock | preview neoverený browserom | READY FOR APPROVAL |
| 4297 | 005 | PASS | PASS | PASS | bez kritického low-stock CTA | preview neoverený browserom | READY FOR APPROVAL |
| 4298 | 013 | PASS | PASS | PASS | HW-319 low stock; day-of recheck | preview neoverený browserom | CONDITIONAL READY |
| 4299 | 014 | PASS | PASS | PASS | ESP32 live/instock | preview neoverený browserom | READY FOR APPROVAL |
| 4300 | 008 | PASS | PASS | PASS | bez priameho produktového CTA | 4-stĺpcová tabuľka potrebuje mobilný vizuálny check | HOLD — VISUAL CHECK |

## 4296 — ESPHome + ESP32: prvý projekt krok za krokom

**Verdict: READY FOR APPROVAL**

Prešlo:

- čisté HTML bez duplicitného H1,
- custom excerpt uložený v revízii,
- kategórie 583 + 322,
- Yoast title/meta/focus keyword,
- `WebPage / TechArticle`,
- robots index/follow,
- default non-Elementor post template,
- interné huby existujú a sú publikované,
- ESP32 produktový permalink je živý a produkt je objednateľný.

Zostáva iba vizuálny desktop/mobile preview alebo explicitné rozhodnutie tento vizuálny gate akceptovať podľa existujúcej default šablóny.

## 4297 — ESP32 sa reštartuje? Ako odhaliť problém s napájaním

**Verdict: READY FOR APPROVAL**

Prešlo:

- čistá H2/H3 štruktúra,
- custom excerpt uložený v revízii,
- kategórie 583 + 322,
- TechArticle schema,
- bezpečnostné low-voltage ohraničenie,
- brownout tvrdenia majú oficiálne Espressif zdroje,
- interné huby a ESP32 permalink sú živé.

Zostáva iba vizuálny desktop/mobile preview alebo explicitné akceptovanie vizuálneho gate.

## 4298 — Napájanie ESP32: ako vybrať zdroj a step-down menič

**Verdict: CONDITIONAL READY**

Prešlo všetky obsahové, SEO, schema, interné-link a bezpečnostné kontroly.

Komerčný gate:

- HW-319 permalink je živý,
- produkt bol pri poslednom live checku objednateľný,
- ide o low-stock položku,
- **bezprostredne pred publish treba znovu overiť sklad**,
- ak nebude objednateľný, odstrániť alebo zmeniť produktový CTA na informačný odkaz podľa FAIL CLOSED pravidla.

Vizuálny gate ostáva rovnaký ako pri ostatných default-template článkoch.

## 4299 — Bluetooth Proxy vs USB adaptér pre Home Assistant

**Verdict: READY FOR APPROVAL**

Prešlo:

- aktuálny ESPHome model connection slots,
- BLE-only scope formulovaný správne,
- žiadne tvrdenie o vlastnom fyzickom teste,
- TechArticle schema,
- HA / ESPHome / napájanie huby živé,
- ESP32 produktový link živý.

Praktický vlastný proxy test je vhodný ako budúce rozšírenie článku, ale súčasný text ho nepredstiera a nie je na ňom technicky závislý.

## 4300 — PLA vs PLA+ vs ABS+

**Verdict: HOLD — VISUAL CHECK**

Obsahové a SEO gate sú PASS:

- eSUN parametre zosúladené s aktuálnymi podkladmi,
- Article schema,
- interný link na 3D tlač hub je živý,
- bez priameho stock-sensitive produktového CTA,
- bezpečnostné poznámky sú prítomné.

Bloker:

- článok obsahuje 4-stĺpcovú HTML tabuľku,
- bez reálneho mobilného browser preview nie je možné poctivo potvrdiť wrap/overflow/crop,
- pred publish treba vizuálne overiť najmä šírku tabuľky na mobilnom viewporte.

## WordPress read/API audit

Overené na draftoch 4296–4300:

- všetky ostávajú `draft`,
- default WordPress post template,
- Elementor layout sa nepoužíva,
- pripravené custom excerpt-y sú potvrdené najnovšími revíziami,
- Yoast SEO title/meta/focus keyword sú uložené,
- schema: 4× TechArticle, 1× Article,
- noindex=false,
- nofollow=false,
- canonical override je prázdny = použije sa vlastný permalink.

## Live link/product reality

Posledný live check:

- ESP32 DevKit V1: permalink živý, objednateľný, 19 ks skladom,
- HW-319 LM2596: permalink živý, objednateľný, 2 ks skladom,
- huby ESP & ESPHome, Home Assistant, Senzory, Napájanie a 3D tlač sú publikované.

Tieto počty nie sú evergreen obsah a nesmú sa kopírovať do verejného článku. Pred publish sa stav produktu vždy overuje znovu.

## Publish policy

Publish action je povolený až keď:

1. je post explicitne schválený na publish,
2. prebehne day-of WooCommerce permalink/stock gate pri produktových CTA,
3. vizuálny gate je uzavretý alebo výslovne akceptovaný,
4. post zostáva bez dodávateľských/sourcing interných poznámok,
5. nič neporušuje low-voltage / 230 V safety pravidlá.
