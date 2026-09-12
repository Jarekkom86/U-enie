<!-- markdownlint-disable MD013 -->

# WordPress payload — 013

- **Status:** ready-for-review
- **Post title:** Napájanie ESP32: ako vybrať zdroj a step-down menič
- **Slug:** `napajanie-esp32-vyber-zdroja`
- **Excerpt:** Ako navrhnúť stabilné napájanie ESP32, správne čítať prúdový limit zdroja a bezpečne použiť step-down menič v DC projekte.
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárna kategória:** Návody a projekty
- **Tags:** ESP32; napájanie; LM2596; ESPHome
- **SEO title:** Napájanie ESP32: výber zdroja a brownout resety
- **Meta description:** Ako vybrať napájanie pre ESP32, rozlíšiť problém zdroja, USB kábla a periférií a bezpečne použiť step-down menič v DC projekte.
- **Focus keyword:** napájanie ESP32
- **Schema article type:** TechArticle
- **Canonical:** default vlastný permalink
- **Robots:** index, follow
- **Featured image brief:** `featured-images.md#013`

# Ako vybrať stabilné napájanie pre ESP32

Náhodné reštarty, výpadky Wi‑Fi alebo problém po pridaní displeja či senzora nemusia byť chyba firmvéru. Pri ESP32 treba posudzovať celý napájací reťazec — zdroj, kábel, konektor, regulátor na doske aj periférie.

## Začnite od presnej dosky

ESP32 je rodina čipov a vývojových dosiek. DevKit, ESP32-S3 alebo iná doska môžu mať odlišné napájacie vstupy a regulátory.

Pred zapojením zistite:

- aký presný model dosky máte,
- ktorý vstup výrobca/revízia určuje na napájanie,
- či rovnaký zdroj napája aj senzory, relé, displeje alebo LED,
- aké logické úrovne používajú pripojené moduly.

Jedna univerzálna schéma pre všetky ESP32 neexistuje.

## Prúdový limit zdroja nie je povinný odber

Zdroj musí mať správne napätie a dostatočnú rezervu. Údaj napríklad 2 A znamená maximálnu dostupnú kapacitu, nie to, že zdroj „natlačí“ 2 A do ESP32.

Stabilita však závisí aj od kvality zdroja, kábla a konektorov. Aj dostatočne dimenzovaný adaptér môže cez nevhodný kábel spôsobiť krátky pokles napätia.

## USB kábel je súčasť návrhu

Pri diagnostike meňte jednu vec naraz:

1. kvalitný zdroj,
2. krátky dátový USB kábel,
3. samotná ESP32 bez periférií,
4. potom moduly po jednom.

Ak problém vznikne až po pridaní periférie, najprv overte napájanie a až potom firmware.

## Brownout je stopa

Espressif dokumentuje, že brownout detektor resetuje čip, keď napájanie klesne pod bezpečnú úroveň.

Ak sa objaví brownout:

- skúste stabilný zdroj a kábel,
- zmerajte napätie pri doske,
- odstráňte zbytočne dlhé napájacie prepoje,
- skontrolujte konektory a spoločnú referenciu GND tam, kde ju rozhranie vyžaduje,
- pridávajte záťaž postupne.

## Keď potrebujete znížiť vyššie DC napätie

Ak projekt začína napríklad na vyššom jednosmernom napätí, buck/step-down menič môže vytvoriť nižšiu vetvu pre elektroniku.

Pri nastaviteľnom meniči postupujte konzervatívne:

1. pripojte vstup bez ESP32,
2. nastavte požadované výstupné napätie,
3. overte ho nezávislým multimetrom,
4. až potom pripojte záťaž,
5. po pripojení znovu skontrolujte napätie a zahrievanie.

[HW-319 LM2596 s LED voltmetrom](https://komarena.sk/produkt/hw-319-lm2596-step-down-menic-s-led-voltmetrom/) je príklad nastaviteľného step-down modulu. Maximálny prúd samotného čipu však nie je automaticky garantovaný trvalý prúd celej generickej dosky. Reálny limit ovplyvňuje návrh, cievka, dióda, PCB, chladenie a konkrétna revízia modulu.

## Pozor na 3,3 V pin

Napájanie cez 3,3 V pin môže obísť časť regulácie alebo ochrán dosky. Použite ho iba vtedy, keď presne viete, čo povoľuje konkrétna revízia a máte presne regulovanú vetvu.

Pre začiatočnícky projekt je bezpečnejšie použiť napájací vstup určený výrobcom konkrétnej dosky.

## Periférie menia celý rozpočet

Do odberu patria aj:

- displeje,
- senzory,
- relé moduly,
- servá a motory,
- LED a ďalšie rádiové moduly.

Výkonové zariadenia často potrebujú samostatnú vetvu. Neveďte ich odber cez pin, ktorý na to nie je určený.

## Diagnostický checklist

- odpojiť periférie,
- skúsiť iný USB kábel,
- skúsiť stabilný zdroj,
- skontrolovať log resetu,
- zmerať napätie pri doske,
- pridávať moduly po jednom,
- overiť 5 V vs. 3,3 V logiku,
- pri step-down meniči zmerať výstup pred aj po záťaži.

Pre samotnú vývojovú dosku môžete použiť [ESP32 DevKit V1](https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/).

Súvisiace rozcestníky:

- [Napájanie](https://komarena.sk/napajanie/)
- [ESP & ESPHome](https://komarena.sk/esp-esphome/)

## Bezpečnosť

Tento návod rieši iba nízkonapäťové DC projekty. Nevykonávajte podľa neho zásahy na 230 V strane zdroja alebo v pevnej elektroinštalácii.

## Zdroje

- Espressif — ESP32 brownout troubleshooting
- Texas Instruments — LM2596 datasheet

Technické tvrdenia overené 11. 9. 2026.
