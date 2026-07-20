<!-- markdownlint-disable MD013 -->

# KomArena Homepage v4 — izolovaný lokálny staging

## Účel a hranice

Tento postup pripravuje iba lokálny, opakovateľný WordPress klon pre preview PR #36. Nie je návodom na produkčné nasadenie.

Počas práce sa nesmie meniť produkčný WordPress, hosting, FTP obsah, DNS, root redirect, cache, verejná homepage #809, databáza, produkty, ceny, sklad, objednávky, platby ani e-mailové odosielanie. PR #36 zostáva draft a nesmie sa automaticky mergovať.

## Overený lokálny základ

Kontrola z 2026-07-20 potvrdila:

- WSL 2 je nainštalované a predvolené; dostupná je distribúcia Ubuntu aj `docker-desktop`, obe vo verzii 2.
- Docker Desktop a Docker Compose sú nainštalované, ale Docker engine nebol spustený a nebol vytvorený žiadny kontajner.
- V očakávaných staging adresároch neexistuje existujúci KomArena stack.
- Lokálny WebOps agent na `127.0.0.1:8787` nebol dostupný.
- Očakávaný export `komarena_sk3-20260716012500.sql.gz` sa nenašiel v lokálnom používateľskom priestore, Google Drive ani Gmaili.
- Nie je potvrdená kompletná lokálna kópia WordPress súborov ani konkrétny FTP snapshot.

Z toho vyplýva, že virtualizácia, WSL a Docker už nie sú inštalačným blokátorom. Blokátorom sú iba overené vstupné zálohy.

## Vstupná brána

Pred vytvorením ľubovoľného staging adresára musia byť dostupné obe položky:

| Vstup | Požiadavka | Stav |
| --- | --- | --- |
| Databáza | Originálny export `komarena_sk3-20260716012500.sql.gz` alebo novší výslovne potvrdený export | Otvorený bod |
| Súbory | Kompletný WordPress snapshot alebo konkrétny FTP snapshot vrátane `wp-content` | Otvorený bod |

Pred kopírovaním treba pri každom vstupe zaznamenať zdroj, veľkosť, čas poslednej zmeny a SHA-256 checksum. Originál sa po kontrole uloží read-only mimo pracovnej kópie. Do GitHubu sa nikdy nepridáva export databázy, `wp-config.php`, cookies, heslá ani iné tajné údaje.

Ak treba sťahovať veľký FTP snapshot, pred stiahnutím sa zastaví postup a vyžiada sa výslovné rozhodnutie vlastníka o konkrétnom zdroji a rozsahu. Neobnovuje sa nič na hostingu.

## Plánovaná štruktúra

Po splnení vstupnej brány sa vytvorí iba tento lokálny adresár:

```text
C:\KomArena-Staging\W-012\
├── backups-readonly\
├── database-working-copy\
├── wordpress-working-copy\
├── docker\
├── qa\
└── logs\
```

`backups-readonly` obsahuje iba overené originály. Každý import a úprava URL pracuje výhradne s kópiou v `database-working-copy` alebo `wordpress-working-copy`.

## Lokálny stack

Používa sa jeden Docker Compose stack s týmito službami:

- WordPress,
- MariaDB,
- Adminer alebo phpMyAdmin,
- Mailpit.

Všetky porty sa viažu iba na `127.0.0.1`. Odporúčané lokálne adresy sú WordPress na `http://127.0.0.1:8088`, databázový prehľad na `http://127.0.0.1:8089` a Mailpit na `http://127.0.0.1:8025`.

Compose konfigurácia nesmie obsahovať produkčné databázové údaje, API kľúče ani odkaz na produkčnú DB. Konfigurácia tiež nesmie publikovať porty na LAN alebo internet.

Po vytvorení a kontrole lokálneho compose súboru sú povolené iba tieto lokálne príkazy:

```powershell
docker compose config
docker compose up -d
docker compose ps
```

Pred ich vykonaním treba overiť, že Docker engine beží a že compose súbor viaže všetky služby len na localhost.

## Import a izolácia

1. Vytvoriť novú lokálnu MariaDB databázu; nikdy nepoužiť produkčný host, port ani prihlasovacie údaje.
2. Importovať iba pracovnú kópiu SQL exportu.
3. Obnoviť iba pracovnú kópiu WordPress súborov.
4. Zmeniť produkčnú URL na lokálnu URL WordPress-aware nástrojom, napríklad WP-CLI `search-replace`, aby zostali správne serializované hodnoty.
5. Pred prvým otvorením lokálnej stránky zablokovať odosielanie e-mailov, reálne platby, webhooky, externé publish akcie a externé cron úlohy.
6. Nastaviť `noindex` iba v lokálnom klone a odstrániť produkčné zapisovacie endpointy z pracovnej konfigurácie.

Nesmú sa spúšťať reálne formuláre, objednávky, platby ani e-maily. Mailpit je určený výhradne na zachytenie lokálnej pošty.

## PR #36 preview

Až po funkčnom izolovanom klone:

1. zálohovať lokálny adresár pluginu `komarena-ui-system` vo verzii 1.0.2,
2. použiť presný head PR #36 `bb6a2da5d5f164e857ece0703cf3fd95bc0a1836`,
3. vytvoriť iba lokálnu stránku `KomArena v4 Preview`,
4. nastaviť template `KomArena Homepage v4 (staging)` bez priradenia produkčnej homepage,
5. použiť iba produktové ID `2997`, `2984` a `2978`,
6. nepoužiť produkt `2467` Home Assistant Green,
7. ponechať štvrtú kartu `Všetky produkty`.

## QA brána

Pred akýmkoľvek návrhom produkčného kroku sa zaznamená:

- desktop 1440 px, tablet 768 px a mobil 390 px,
- jeden H1, poradie nadpisov, skip link a keyboard focus,
- shop, search, cart, ReSmart anchor, návody a footer,
- produktové dáta z lokálnej WooCommerce DB,
- konzolové a sieťové chyby bez externých vedľajších účinkov,
- Lighthouse pre mobil aj desktop vrátane LCP, CLS, accessibility a SEO,
- screenshoty a presný zoznam rozdielov alebo opráv pre PR #36.

Žiadny výsledok z lokálneho preview nie je schválením produkčného nasadenia.

## Rollback

Rollback sa týka iba lokálneho prostredia:

```powershell
docker compose down -v
```

Potom možno odstrániť iba pracovnú kópiu v `C:\KomArena-Staging\W-012\`. Originálne zálohy v `backups-readonly` sa nemažú. Produkcia zostáva nedotknutá.

## Otvorené body

- Overiť zdroj a integritu DB exportu.
- Overiť zdroj, rozsah a integritu WordPress/FTP snapshotu.
- Po dodaní vstupov vytvoriť konkrétny compose súbor bez tajných údajov a overiť jeho localhost väzby.
- Po lokálnom QA rozhodnúť samostatne o ďalšom osude draft PR #36; tento dokument neudeľuje povolenie na merge ani produkčné nasadenie.

## Čo sa týmto dokumentom nemení

Dokument nemení produkčný web, runtime PHP/CSS/JS, WordPress databázu, hosting, FTP, DNS, cache, checkout, platby, objednávky, produkty, ceny, sklad ani externé systémy.
