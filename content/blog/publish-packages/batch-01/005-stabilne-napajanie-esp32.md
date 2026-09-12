<!-- markdownlint-disable MD013 -->

# WordPress payload — 005

- **Status:** ready-for-review
- **Post title:** ESP32 sa reštartuje? Ako odhaliť problém s napájaním
- **Slug:** `esp32-restart-brownout-napajanie`
- **Excerpt:** ESP32 sa odpája alebo reštartuje? Skontrolujte kábel, zdroj, napájaciu cestu a periférie skôr než začnete meniť firmware.
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárna kategória:** Návody a projekty
- **Tags:** ESP32; ESPHome; brownout; napájanie
- **SEO title:** ESP32 sa reštartuje? Ako odhaliť problém s napájaním
- **Meta description:** ESP32 sa odpája, reštartuje alebo hlási brownout? Praktický postup na kontrolu USB kábla, zdroja, napájacej cesty a periférií.
- **Focus keyword:** ESP32 stabilné napájanie
- **Schema article type:** TechArticle
- **Canonical:** default vlastný permalink
- **Robots:** index, follow
- **Featured image brief:** `featured-images.md#005`

# Stabilné napájanie ESP32: prečo sa doska reštartuje a ako problém diagnostikovať

ESP32 môže na stole fungovať bez problémov a po pridaní senzora, displeja alebo dlhšieho kábla sa zrazu začne reštartovať. V Home Assistante to môže vyzerať ako problém s Wi‑Fi alebo ESPHome, hoci skutočnou príčinou je napájanie.

Cieľom nie je naslepo kúpiť „silnejší zdroj“, ale zistiť, v ktorej časti napájacej cesty vzniká problém.

## Brownout je dôležitá diagnostická stopa

ESP32 má brownout detektor. Espressif dokumentuje, že pri poklese napájania pod bezpečnú úroveň môže čip resetovať, aby sa predišlo nepredvídateľnému správaniu.

Ak log obsahuje hlášku `Brownout detector was triggered`, nezačínajte vypínaním ochrany. Najprv overte napájanie.

## Typické príznaky nestabilného napájania

- náhodné reštarty,
- výpadky ESPHome zariadenia,
- problém sa objaví až po pridaní periférie,
- zariadenie funguje s krátkym káblom a zlyháva s dlhším,
- reset pri štarte Wi‑Fi alebo pri väčšom odbere,
- brownout správa v logu.

Nie každý reset je brownout. Podobný symptóm môže mať watchdog, chybný firmware, skrat alebo nesprávne zapojenie. Preto postupujte po vrstvách.

## 1. Vráťte projekt na minimum

Odpojte všetky nepovinné periférie a nechajte iba ESP32.

Ak je samotná doska stabilná, pridávajte moduly jeden po druhom. Ak sa reštartuje aj bez nich, pokračujte kontrolou USB kábla, zdroja a konektorov.

## 2. Vymeňte USB kábel

USB kábel je súčasť napájania. Dlhý, poškodený alebo veľmi tenký kábel môže vytvárať úbytok napätia.

Pri diagnostike použite krátky overený dátový kábel. Ak sa problém stratí, pôvodný kábel je silný kandidát na príčinu.

## 3. Overte zdroj

Skúste iný spoľahlivý USB port alebo kvalitný USB zdroj. Pri externom DC napájaní posudzujte celý reťazec:

**zdroj → kábel → konektor → regulátor → ESP32 → periférie**

Dobrý adaptér nepomôže, ak je problém v konektore, tenkom vodiči alebo nevhodnom regulátore.

## 4. Rešpektujte konkrétnu dosku

„ESP32“ nie je jedna univerzálna vývojová doska. Rôzne revízie používajú odlišné regulátory, USB-UART prevodníky a napájacie vstupy.

Pred priamym napájaním overte dokumentáciu presného modelu a označenie pinov. Nepripájajte napätie podľa obrázka inej dosky iba preto, že vyzerá podobne.

## 5. Periférie pridávajte po jednej

Pri každom pridanom module sledujte:

- napájacie napätie,
- logické úrovne,
- zmenu stability,
- zahrievanie,
- log ESPHome alebo sériový výstup.

Zariadenia s premenlivým odberom, napríklad displeje, servá, relé alebo väčšie LED záťaže, môžu odhaliť slabé miesto, ktoré pri samotnej ESP32 nebolo viditeľné.

## 6. Sledujte log

Log môže pomôcť rozlíšiť:

- brownout,
- watchdog,
- bežný softvérový reštart,
- stratu Wi‑Fi bez reštartu,
- problém pri bootovaní.

To je výrazne lepšie než meniť konfiguráciu naslepo.

## Čo nerobiť

### Nevypínajte brownout ochranu ako prvé riešenie

Ak ochrana hlási pokles napájania, jej vypnutie odstráni varovanie, nie príčinu.

### Nekupujte automaticky silnejší adaptér

Ak je problém v kábli alebo regulátore, vyšší prúdový limit zdroja nemusí nič vyriešiť.

### Nenapájajte výkonové záťaže cez GPIO

GPIO sú riadiace signály. Nie sú univerzálny napájací výstup pre motory, relé alebo LED pásy.

## Praktický checklist

Ak sa ESP32 reštartuje:

1. odpojte periférie,
2. vymeňte USB kábel,
3. skúste iný stabilný zdroj,
4. skontrolujte log,
5. pridávajte moduly po jednom,
6. overte napájanie a logické úrovne každého modulu,
7. pri vyššej záťaži navrhnite samostatnú napájaciu vetvu.

Pre prvé testy môžete použiť [ESP32 DevKit V1](https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/) a následne projekt rozširovať po malých krokoch.

Súvisiace rozcestníky:

- [Napájanie](https://komarena.sk/napajanie/)
- [ESP & ESPHome](https://komarena.sk/esp-esphome/)
- [Senzory](https://komarena.sk/senzory/)

## Bezpečnosť

Tento článok sa týka nízkonapäťových projektov. Ak projekt pracuje so sieťovým napätím 230 V alebo pevnou elektroinštaláciou, návrh a montáž patria odborne spôsobilej osobe.

## Zdroje

- Espressif — ESP-FAQ / brownout troubleshooting
- Espressif — ESP-IDF fatal errors / brownout

Technické tvrdenia overené 11. 9. 2026.
