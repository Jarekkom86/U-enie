<!-- markdownlint-disable MD013 MD060 -->

# Decision Log

| Datum | Rozhodnutie | Dovod | Dopad | Kto rozhoduje | Stav |
|---|---|---|---|---|---|
| 2026-05-15 | Vytvorit KomArena Autopilot OS v3 core bez runtime zmien. | Treba pevny zaklad pre dalsie autonomne sprinty. | Buduce zmeny budu bezpecnejsie a sledovatelne cez PR. | Majitel pri merge PR | mergnute |
| 2026-05-15 | Checkout, platby, objednavky, databaza, dane a doprava su audit-only. | Ide o vysoko rizikove obchodne oblasti. | Znizuje riziko rozbitia nakupnej cesty. | Majitel pri kazdej zmene | aktivne pravidlo |
| 2026-05-15 | Zaviest Sprint Runner pred prvym produktovym clustrom. | Core OS uz existuje; treba prakticky mechanizmus pre dalsie sprinty. | Agent bude vediet vybrat ulohu, urobit scoring, vytvorit PR alebo issue a zapisat stav. | Majitel pri merge PR | mergnute |
| 2026-05-15 | Pripravit ESP32 ESPHome starter cluster ako LEVEL 2 draft bez CSV a bez publikovania. | Ide o prvy obchodny cluster s vysokym dopadom a nizsim rizikom, ak zostane v drafte. | Vytvara zaklad pre produkt, navod, projekt, interne odkazy a marketing. | Majitel pri merge PR | mergnute |
| 2026-05-15 | Pripravit ESP32 DevKit source document ako LEVEL 2 draft bez CSV a bez publikovania. | Cluster potrebuje samostatny produktovy zdrojovy dokument s otvorenymi bodmi a zdrojmi. | Vytvara zaklad pre buduci WooCommerce produktovy draft bez rizika neovereneho importu. | Majitel pri merge PR | pripravene |
| 2026-07-11 | STATUS RECONCILIATION: zosuladit `state.md` s potvrdenym stavom `main` na baseline `afe7619462dcdc8da09844f56ce5973b35655cac`; overene PR #12 az #16 su mergnute. | Aktualny stav nesmie oznacovat uz zlucenu pracu ako rozpracovanu. | `state.md` je zosuladene s `main`; backlog a WebOps report zostavaju pre T-002. Nebolo prijate rozhodnutie o PR #19, PR #1 ani historickych vetvach. | Technicka synchronizacia bez noveho owner rozhodnutia | zaznamenane |
| 2026-07-20 | STATUS RECONCILIATION: zaznamenat docs-only PR #45 a #46 a oznacit B-010 ako dokoncene. | Lokalny staging runbook a checklist publikovania odstranili opakovanie pripravy bez zmeny runtime alebo produkcie. | Dashboard #24 zostava live operacnym zdrojom; W-012 caka iba na overene zalohy. | Technicka synchronizacia po uspesnej CI | zaznamenane |
