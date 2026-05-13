<!-- markdownlint-disable MD013 -->

# Produktový štandard KomArena.sk

Každý produkt musí byť pripravený tak, aby zákazník pochopil:

- čo produkt je,
- na čo slúži,
- kde ho použije,
- s čím ho môže kombinovať,
- aké má technické limity,
- či sa hodí do ESP / Home Assistant / ESPBuild / ESPHome projektu,
- čo si má k produktu dokúpiť,
- aký modelový projekt si z neho vie postaviť.

## 1. SEO názov produktu

SEO názov musí byť:

- jasný,
- technický,
- bez prehnaného marketingu,
- obsahovať typ produktu, model a hlavné použitie, ak je známe.

## 2. Short description

Short description musí mať 2 až 4 vety a vysvetliť:

- čo produkt je,
- na čo slúži,
- pre koho je vhodný,
- súvis s ESP / smart home / Home Assistant iba ak je relevantný a technicky správny.

Nepoužívaj neoverené tvrdenia ani všeobecné marketingové frázy bez obsahu.

## 3. Description

Dlhý popis musí obsahovať nasledujúce sekcie.

### Prečo si vybrať tento produkt

Uveď praktické výhody, typické použitie a dôvod, prečo je produkt vhodný pre daný typ zákazníka. Nepíš neoverené tvrdenia o výkone, kvalite alebo kompatibilite.

### Využitie v praxi

Uveď konkrétne príklady použitia, napríklad prototypovanie, meranie, senzoriku, nízkonapäťové ovládanie, napájanie, servis alebo smart home projekt.

### Použitie v ESP / smart home projekte

Uveď ESP, ESPBuild, ESPHome alebo Home Assistant kontext iba vtedy, keď dáva technický zmysel. Ak ide iba o všeobecný kábel, konektor alebo náradie, vysvetli praktickú úlohu bez predstierania priamej kompatibility.

### Kompatibilita

Uvádzaj iba overenú kompatibilitu. Pri neistote použi:

`Otvorený bod: kompatibilitu s Home Assistant / ESPBuild / ESPHome je potrebné overiť podľa konkrétnej konfigurácie.`

### Modelový príklad použitia

Každý vhodný produkt má mať modelový príklad:

- názov projektu,
- čo zákazník postaví,
- aké komponenty potrebuje,
- základný princíp použitia,
- bezpečnostné upozornenie,
- otvorené body.

Modelový príklad nie je certifikované riešenie. Neprezentuj ho ako finálne zapojenie, ak nebolo overené.

### Odporúčané príslušenstvo

Navrhni:

- potrebné príslušenstvo,
- odporúčané doplnky,
- alternatívy,
- vhodný kit alebo zostavu.

Odporúčania musia zvyšovať užitočnosť nákupu, nie len umelo navyšovať košík.

### Technické parametre

Technické parametre musia byť v HTML tabuľke:

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

Ak údaj nie je overený, nepíš vymyslenú hodnotu. Použi:

`Otvorený bod: údaj treba overiť.`

### Obsah balenia

Uvádzaj iba to, čo je jasné. Ak obsah balenia nie je jasný, použi:

`Obsah balenia je potrebné potvrdiť podľa dodávky.`

### Bezpečnostné odporúčania

Upozorni na:

- správne napájanie,
- polaritu,
- prácu s elektronikou,
- vhodnosť pre osoby so základnými znalosťami elektrotechniky,
- skrat, prehrievanie a nesprávne nabíjanie pri batériách,
- ochranu očí a rúk pri náradí, ak je relevantné,
- 230 V iba pre odborne spôsobilé osoby.

### Záruka a vrátenie

Použi jednotný text:

> Na produkt sa vzťahuje záruka 24 mesiacov. Pri nákupe cez e-shop má zákazník právo odstúpiť od zmluvy do 14 dní podľa platných podmienok predaja.

## CSV pravidlá

Každý WooCommerce CSV musí obsahovať minimálne:

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

Pravidlá:

- CSV musí byť UTF-8.
- `Regular price` zapisuj ako čisté číslo bez symbolu `€`, napríklad `4.99`, `12.99`, `24.99`.
- Používaj desatinnú bodku.
- Cena má byť obchodne nastavená tak, aby sa na e-shope zobrazovala ako cena zakončená na `,99 €`.
- SKU vo formáte `KOM-[SKRATKA]-[ČÍSLO]`.
- EAN interný začínajúci na `2998`, jedinečný pre každý produkt.
- Interný EAN neprezentovať ako oficiálny EAN výrobcu.
- `Status = publish` iba pri hotových produktoch.
- `Status = draft` pri neoverených parametroch, nejasnej cene alebo nejasnej kompatibilite.
- `Tax status = taxable`.
- `Stock` podľa zadania alebo overeného skladu.
- Bez obrázkov, pokiaľ zadanie výslovne neurčí inak.

## Kategórie

Používaj hlavné kategórie:

- `Elektronika`
- `Vývojové dosky`
- `Senzory`
- `Batérie`
- `Náradie`
- `Kity a sety`

Home Assistant nedávaj ako povinnú produktovú kategóriu pre každý produkt. Home Assistant používaj ako obsahový a integračný kontext.

## Zakázané pri produktoch

- nekopírovať cudzie texty,
- nevymýšľať technické parametre,
- nepoužívať obrázky s logom predajcu,
- nepísať „plne kompatibilné s Home Assistant“ bez overenia,
- nepísať „oficiálne Home Assistant príslušenstvo“ bez oprávnenia,
- nepoužívať zavádzajúce SEO tvrdenia,
- neprezentovať modul ako hotové riešenie, ak vyžaduje zapojenie alebo konfiguráciu.
