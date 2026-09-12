<!-- markdownlint-disable MD013 -->

# KomArena Blog Workspace

Tento priečinok je pracovný zdroj pravdy pre budúci obsah KomArena.sk. Nič z tohto priečinka sa samo nepublikuje na produkčný web ani sociálne siete.

## Cieľ

Budovať jeden prepojený obsahový systém:

Produkt → Blog / návod → Modelový projekt → Odporúčané produkty → Interné odkazy → Sociálne siete → Newsletter

Obsah má zákazníkovi pomôcť:

- pochopiť problém,
- vybrať správny produkt,
- vedieť, čo si musí dokúpiť,
- vyhnúť sa typickým chybám,
- bezpečne použiť produkt alebo technológiu,
- nájsť všetko potrebné na KomArena.sk.

## Stav priečinkov a kľúčové súbory

- `drafts/` — hotové alebo rozpracované články pripravené na kontrolu.
- `legacy-rewrites/` — opravené verzie starších produkčných článkov; nič sa z nich neprepíše na produkciu bez samostatného review.
- `editorial-plan.md` — systém tém, rotácia a publikačné pravidlá.
- `backlog.md` — zásobník budúcich článkov, návodov, porovnaní a aktualít.
- `publish-readiness.md` — poradie draftov, prvý bezpečný publish batch a FAIL CLOSED gate.
- `article-template.md` — jednotná štruktúra článku, blog card a featured-image štandard.
- `internal-link-matrix.md` — jediný staging source-of-truth pre interné linkovanie draftov 001–020.
- `product-content-opportunities.md` — mapa produkt → obsah podľa reálneho katalógu.
- `legacy-post-audit.md` — audit starých článkov pred rewrite.

## Záväzné pravidlá

Pri tvorbe obsahu platí poradie pravidiel z koreňového `AGENTS.md` a dokumentov v `docs/`.

Najmä:

1. Nevymýšľať technické parametre ani kompatibilitu.
2. Používať primárne a oficiálne zdroje, ak sú dostupné.
3. Home Assistant používať ako integračný kontext, nie ako marketingovú nálepku.
4. Pri 230 V neposkytovať návod laikovi; zásah patrí odborne spôsobilej osobe.
5. Každý dôležitý článok má mať obchodne užitočné interné odkazy.
6. Ceny a skladové stavy sa do evergreen článkov nezapisujú napevno, pokiaľ nie sú predmetom aktuálneho porovnania a nie sú overené tesne pred publikovaním.
7. Pred publikovaním sa musí skontrolovať, či produkt, kategória a URL stále existujú a sú vhodné na prelinkovanie.
8. Verejný obsah nesmie obsahovať dodávateľa, sourcing poznámky, nákupné ceny, interné dodávateľské SKU ani dátumy interného overenia skladu.

## Stav draftu

Každý draft používa jeden z týchto stavov:

- `idea` — iba téma.
- `outline` — hotová osnova, nie celý text.
- `draft` — celý text, ešte potrebuje kontrolu.
- `ready-for-review` — technicky a obsahovo skontrolovaný draft.
- `approved-for-publish` — schválený na presun do WordPressu.
- `published` — publikovaný; doplniť produkčnú URL a dátum.

## Minimálna kontrola pred publikovaním

Použiť úplný checklist v `publish-readiness.md`. Minimálne:

- overiť technické tvrdenia,
- skontrolovať H1 / SEO title / meta description,
- skontrolovať interné odkazy,
- overiť súvisiace produkty na KomArena.sk,
- doplniť featured image podľa `article-template.md`,
- skontrolovať bezpečnostné formulácie,
- odstrániť neaktuálne ceny a sklad,
- odstrániť všetky interné dodávateľské/sourcing údaje,
- pripraviť Facebook text a ďalší sociálny balík,
- preveriť, či sa téma neduplikuje s už publikovaným článkom.

## Aktuálny publikačný zámer

Po spustení redakčného systému je cieľ približne jeden kvalitný článok denne, ale kvalita a pravdivosť majú prednosť pred frekvenciou. Ak nie je dostatok overených podkladov, článok sa nepublikuje len kvôli kadencii.

Aktuálne poradie review určuje `publish-readiness.md`; nič sa automaticky neplánuje ani nepublikuje.
