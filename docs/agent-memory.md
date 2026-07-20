<!-- markdownlint-disable MD013 -->

# KomArena Agent Memory

## Účel

Tento súbor je lokálna pracovná pamäť agenta KomArena.sk. Agent ju má čítať na začiatku každej novej práce a dopĺňať po zistení opakovanej chyby, bezpečného riešenia alebo schváleného dizajnového rozhodnutia.

## Schválené rozhodnutia

### 2026-05-29 - Fixný vizuálny smer

KomArena.sk má používať jednotný svetlý technický štýl:

- svetlé pozadie,
- tyrkysové akcenty,
- tmavý čitateľný text,
- zaoblené karty,
- jemné tiene,
- prehľadné tabuľky,
- výrazné bezpečnostné boxy,
- produktové karty prirodzene vložené do obsahu.

Referenčný vzor pre issue #18 je stránka Home Assistant. ESP & ESPHome stránka má používať rovnaký vizuálny jazyk, ale bez tvrdenia, že KomArena predáva Home Assistant ako produkt.

### 2026-05-29 - Scoped CSS pre nové stránky

Nové stránkové úpravy majú byť viazané na koreňovú triedu. Pre ESP & ESPHome je koreňová trieda `.ka-esp-page`. Tým sa znižuje riziko zásahu do checkoutu, košíka, účtu zákazníka a WooCommerce systémových stránok.

### 2026-05-29 - Bez externých brandovaných obrázkov

Nepoužívať cudzie obrázky, logá predajcov ani externé brandované grafiky. Technický diagram môže byť vytvorený v HTML/CSS bez log.

## Opakované chyby, ktoré treba kontrolovať

### Bledý text a slabý kontrast

Prejav: text pôsobí sivý, ťažko čitateľný alebo sa stráca na svetlom pozadí.

Riešenie: používať `#1F2933` pre nadpisy a hlavný text, `#52616B` iba pre pomocný text, nikdy nie extrémne bledú sivú pre obsahové odseky.

### Prázdne veľké sekcie

Prejav: stránka má veľké medzery, slabý hero alebo sekcie bez jasnej úlohy.

Riešenie: každá sekcia musí mať nadpis, krátky praktický text a jasnú informačnú alebo predajnú funkciu.

### Čierne rohové artefakty

Prejav: na kartách alebo blokoch sa objavia tmavé rohy, prechody alebo pozadia, ktoré nepatria do svetlého štýlu KomArena.

Riešenie: nahradiť tmavé dekorácie svetlým pozadím, tyrkysovým okrajom a jemným tieňom.

### Neoverené technické tvrdenia

Prejav: text tvrdí plnú kompatibilitu, presné parametre alebo bezpečné spínanie bez overenia konkrétneho produktu.

Riešenie: používať formulácie "vhodné pre projekty s...", "kompatibilita závisí od..." a "pred použitím odporúčame overiť...".

## Poznámky k WordPress implementácii

- Plugin `komarena-ui-system` je frontendový vizuálny plugin.
- Verzia 1.0.3 pridáva shortcode `[komarena_esp_esphome_page]`.
- Šablóna stránky je v `komarena-ui-system/templates/esp-esphome-page.html`.
- CSS pre stránku je v `komarena-ui-system/assets/css/komarena-web-polish.css` a je viazané na `.ka-esp-page`.
- Plugin nemení databázu, admin UI, checkout, platby, dopravu ani objednávky.

## Otvorené body

- Overiť finálne URL kategórií a produktov vo WordPress administrácii.
- Po nahratí pluginu do WordPressu skontrolovať verejný desktop a mobilný náhľad.
- Dopĺňať interné KomArena návody a Build Lab odkazy po ich publikovaní.
