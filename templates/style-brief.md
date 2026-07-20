<!-- markdownlint-disable MD013 -->

# KomArena.sk Style Brief

## Stav

Tento brief je fixný pracovný základ pre lokálneho agenta KomArena.sk. Agent ho má čítať pred väčšími úpravami stránky, kategórie, produktu alebo obsahového bloku.

## Cieľ dizajnu

KomArena.sk má pôsobiť ako čistý technický e-shop a obsahový Build Lab pre Home Assistant, ESPHome, ESP32, senzory, relé, napájanie, meranie a bezpečné smart home projekty.

Stránky nemajú vyzerať ako generická marketingová landing page. Majú byť praktické, prehľadné, predajné a dôveryhodné.

## Vizuálny jazyk

- svetlé technické pozadie,
- biele alebo jemne tyrkysové sekcie,
- tmavý čitateľný text,
- tyrkysové CTA a odkazy,
- zaoblené karty s jemným okrajom,
- decentné tiene,
- technické tabuľky s jasným delením,
- bezpečnostné upozornenia v teplom warning štýle,
- bez dekoratívnych gradientových efektov, ktoré znižujú čitateľnosť,
- bez čiernych rohových artefaktov,
- bez prázdnych veľkých blokov.

## Základné tokeny

| Token | Hodnota | Použitie |
|---|---|---|
| Primary | `#00979D` | CTA, odkazy, hlavné akcenty |
| Primary hover | `#007C81` | hover stav, nadpisy kariet |
| Text | `#1F2933` | hlavný text a nadpisy |
| Muted text | `#52616B` | odseky a pomocné texty |
| Background | `#FFFFFF` | základné pozadie |
| Soft background | `#F7FCFC` | jemné technické pozadie |
| Card soft | `#E6F7F8` | technické bloky a zvýraznenia |
| Border | `#BFEAEC` | karty, tabuľky, diagramy |
| Warning background | `#FFF7E6` | bezpečnostné boxy |
| Warning heading | `#B35C00` | nadpis bezpečnostného boxu |

## Layout pravidlá

- Hero sekcia má byť vecná, nie prehnane vysoká.
- Každá stránka má mať jasné H1, krátky úvod a primárne CTA.
- Produktové bloky patria medzi obsah, nie až na koniec bez kontextu.
- Karty nesmú byť vložené do ďalších kariet.
- Tabuľky majú byť skenovateľné a použiteľné na mobile cez horizontálny overflow.
- Mobilný layout má prejsť na jeden stĺpec bez prekrytia textu.
- Text v tlačidlách musí byť krátky a akčný.

## Obsahový tón

Píš prakticky a technicky:

- "vhodné pre projekty s...",
- "často používané pri...",
- "kompatibilita závisí od...",
- "pred použitím odporúčame overiť...".

Nepíš prázdne frázy typu:

- "revolučné riešenie",
- "najlepšia budúcnosť smart domácnosti",
- "plne kompatibilné", ak to nie je overené.

## Bezpečnostné pravidlá

- Home Assistant je integračný a obsahový kontext, nie predávaný produkt.
- KomArena nie je oficiálny Home Assistant obchod.
- Kompatibilitu netvrď bez overenia konkrétnej dosky, firmvéru, senzora alebo modulu.
- Pri 230 V vždy uveď, že zapojenie patrí kvalifikovanej osobe.
- Relé, napájanie a batérie musia mať bezpečnostný box.

## WordPress implementácia

- Pri lokálnych stránkach preferuj scoped triedy, napríklad `.ka-esp-page`.
- Globálne CSS upravuj iba vtedy, keď ide o opakovaný systémový problém.
- Checkout, cart, account, platby, doprava, objednávky a databáza sú mimo rozsah dizajnových úprav bez výslovného schválenia.
- Po úprave vždy skontroluj desktop aj mobilný náhľad.

## Schválený vzor pre issue #18

Pre stránku ESP & ESPHome je vzorom stránka Home Assistant: svetlé technické pozadie, tyrkysové akcenty, čitateľný text, technický diagram, produktové karty, tabuľka, bezpečnostný box a FAQ.
