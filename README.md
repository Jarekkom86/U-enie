# KomArena WebOps & Automation Lab

Praktické laboratórium pre WordPress/WooCommerce, e-commerce operatívu,
automatizáciu a technickú dokumentáciu. Repozitár ukazuje, ako prepájam
používateľské rozhranie, obsahové procesy, bezpečné automatizácie a kontrolu
kvality do opakovateľného workflow.

## Najzaujímavejšie časti

### [KomArena UI System](komarena-ui-system/)

WordPress plugin pre jednotný frontend KomArena.sk. Obsahuje PHP integráciu,
responzívne CSS, oddelenú vrstvu vizuálneho systému a jasné bezpečnostné hranice
pre checkout, platby a objednávky.

### [Gmail Cleaner Control Center](gmail-cleaner-control-center/)

Google Apps Script projekt na pravidlové triedenie Gmailu. Má dry-run režim,
audit log, dashboard a ochranu pred automatickým mazaním správ.

### [KomArena Resale Radar](komarena-resale-radar/)

Rozhodovacie centrum pre bazárové, darované a opraviteľné produkty. Spája Deal
Score, Quick Analyzer, lokálny watchlist, zdrojový register a kategóriové
playbooky pre rýchloobrátkový resale/repas bez automatických nákupov.

### [WebOps dokumentácia](docs/komarena-webops-os-report.md)

Mapa e-commerce procesov, produktových dát, obsahových štandardov, SEO,
interného prelinkovania a postupov pre malé kontrolovateľné zmeny.

### [Produktové CSV workflow](docs/product-csv/)

Pracovné a overené importné dáta pre WooCommerce spolu s validačnými reportmi.
Ukazujú dôraz na kvalitu dát, stav `draft` a overovanie pred publikovaním.

### [Autopilot OS](docs/autopilot/)

Dokumentovaný systém backlogu, rozhodnutí, schvaľovacích brán, sprintov a
kontrolných zoznamov pre bezpečnú spoluprácu s AI agentmi.

## Čo projekt demonštruje

- správu WordPress a WooCommerce riešení,
- HTML, CSS, JavaScript a PHP v praktickom webovom projekte,
- e-commerce obsah, produktové dáta a SEO procesy,
- Google Apps Script automatizáciu,
- GitHub Actions, Pull Request workflow a kontrolu zmien,
- technickú dokumentáciu, bezpečné predvolené nastavenia a rollback plán.

## Mapa repozitára

| Cesta | Obsah |
| --- | --- |
| `komarena-ui-system/` | WordPress UI plugin |
| `gmail-cleaner-control-center/` | Gmail automatizácia |
| `komarena-resale-radar/` | Deal intelligence pre bazárový resale/repas |
| `docs/` | WebOps, e-commerce, SEO a procesná dokumentácia |
| `docs/product-csv/` | WooCommerce CSV a validačné reporty |
| `.github/workflows/` | Automatické kontroly |
| `AGENTS.md` | Pravidlá bezpečnej práce v repozitári |

## Poznámky z učenia

Repozitár pôvodne vznikol ako zbierka Python príkladov. Pôvodný obsah zostáva
zachovaný v [archive/python-learning-notes.md](archive/python-learning-notes.md), aby
hlavný README zostal pre návštevníka stručný a profesionálny.

## Stav a bezpečnosť

Ide o aktívne pracovné laboratórium, nie hotový balík na produkčné nasadenie.
Produkčné zmeny, platby, databáza a objednávky sú mimo automatických zásahov.
Citlivé údaje a API kľúče do repozitára nepatria.
