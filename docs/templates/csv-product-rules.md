<!-- markdownlint-disable MD013 -->

# Pravidlá WooCommerce CSV KomArena.sk

## Povinné stĺpce

Každý WooCommerce CSV produktový riadok musí obsahovať minimálne:

- `Name`
- `Short description`
- `Description`
- `SKU`
- `Regular price`
- `Categories`
- `EAN`
- `Stock`
- `Status`
- `Tax status`

## Základné pravidlá

- CSV musí byť UTF-8.
- `Regular price` zapisuj bez `€`.
- Používaj desatinnú bodku.
- Ceny majú byť obchodne nastavené tak, aby končili na `.99`, napríklad `4.99`, `12.99`, `24.99`.
- SKU má formát `KOM-[SKRATKA]-[ČÍSLO]`.
- EAN začína `2998`.
- EAN je interný identifikátor, nie oficiálny EAN výrobcu.
- `Status = publish` iba pri hotových produktoch.
- `Status = draft` pri neistote alebo otvorených bodoch.
- `Tax status = taxable`.
- Bez obrázkov, pokiaľ nie je výslovne zadané inak.

## Kategórie

Používaj jednotne hlavné kategórie:

- `Elektronika`
- `Vývojové dosky`
- `Senzory`
- `Batérie`
- `Náradie`
- `Kity a sety`

## Práca s HTML v Description

- HTML používaj iba na štruktúru, ktorá je vhodná pre WooCommerce popis.
- Technické parametre zapisuj v HTML tabuľke.
- Nepoužívaj externé skripty, vložené štýly ani trackovacie prvky.
- Nepridávaj odkazy na neoverené externé zdroje bez zadania.

## Pravidlá pre technickú tabuľku

Použi štruktúru:

```html
<table>
  <tbody>
    <tr><th>Parameter</th><th>Hodnota</th></tr>
    <tr><td>Typ produktu</td><td>...</td></tr>
    <tr><td>Napájanie</td><td>...</td></tr>
    <tr><td>Rozhranie</td><td>...</td></tr>
    <tr><td>Rozmery</td><td>...</td></tr>
    <tr><td>Kompatibilita</td><td>...</td></tr>
  </tbody>
</table>
```

Ak údaj nie je overený, použi `Otvorený bod: údaj treba overiť.`

## Pravidlá pre záruku a vrátenie

Do dlhého popisu používaj jednotný text:

> Na produkt sa vzťahuje záruka 24 mesiacov. Pri nákupe cez e-shop má zákazník právo odstúpiť od zmluvy do 14 dní podľa platných podmienok predaja.

## Pravidlá pre bezpečnostné upozornenia

- Upozorni na správne napájanie a polaritu.
- Pri batériách upozorni na skrat, prehrievanie a nesprávne nabíjanie.
- Pri náradí upozorni na ochranu očí a rúk, ak je relevantná.
- Pri relé, napájaní a vyššom napätí upozorni na limity modulu.
- Pri 230 V uveď, že práca patrí odborne spôsobilej osobe.

## Pravidlá pre neoverené parametre

- Nevymýšľaj rozmery, napájanie, rozhranie, prúd, výkon, presnosť ani certifikácie.
- Ak chýba údaj, použi `Otvorený bod: údaj treba overiť.`
- Ak chýba kompatibilita, použi `Otvorený bod: kompatibilitu treba overiť.`
- Produkt so zásadnými otvorenými bodmi nastav ako `draft`.

## Pravidlá pre interné EAN

- Interný EAN začína na `2998`.
- Interný EAN musí byť jedinečný pre každý produkt.
- Interný EAN neprezentuj ako oficiálny EAN výrobcu.
- Otvorený bod: finálnu schému prideľovania interných EAN treba potvrdiť pred hromadným importom.

## Pravidlá pre SKU skratky

Odporúčané skratky:

- `ESP` pre ESP32 / ESP8266 vývojové dosky,
- `SEN` pre senzory,
- `REL` pre relé moduly,
- `NAP` pre napájanie a meniče,
- `KAB` pre káble a konektory,
- `BAT` pre batérie,
- `NAR` pre náradie,
- `KIT` pre kity a sety.

SKU musí byť stabilné a nesmie kolidovať s existujúcim SKU.
