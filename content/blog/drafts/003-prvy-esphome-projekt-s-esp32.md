<!-- markdownlint-disable MD013 -->

# Draft 003 — Prvý ESPHome projekt s ESP32

- **Status:** draft
- **Typ:** návod pre začiatočníka
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty
- **Cieľová skupina:** používateľ Home Assistant, ktorý chce vytvoriť prvé vlastné ESP32 zariadenie
- **Search intent:** informačný
- **Focus keyword:** ESPHome ESP32 návod

## SEO title

ESPHome + ESP32: prvý projekt krok za krokom pre Home Assistant

## Meta description

Ako začať s ESPHome a ESP32: Device Builder, prvé nahratie cez USB, Wi-Fi, automatické objavenie v Home Assistante a bezpečný prvý projekt.

## H1

Prvý ESPHome projekt s ESP32: od prázdnej dosky po zariadenie v Home Assistante

## Úvod

ESP32 je jedna z najpraktickejších ciest k vlastným senzorom a jednoduchým smart home zariadeniam. ESPHome k tomu pridáva vrstvu, vďaka ktorej nemusíte pri bežnom projekte písať vlastný C++ firmware od nuly.

Namiesto toho vytvoríte čitateľnú konfiguráciu, ESPHome z nej zostaví firmware a výsledné senzory, prepínače alebo svetlá sa môžu objaviť priamo v Home Assistante.

Tento návod zámerne nezačína komplikovaným zapojením. Prvým cieľom je dostať samotnú ESP32 dosku spoľahlivo do ESPHome a Home Assistanta. Až potom má zmysel pridávať senzory.

## Čo budete potrebovať

- kompatibilnú ESP32 vývojovú dosku,
- dátový USB kábel,
- počítač alebo Home Assistant s ESPHome Device Builderom,
- Wi-Fi sieť,
- Home Assistant, ak chcete zariadenie integrovať do smart domácnosti.

Pre prvý test nepotrebujete relé ani 230 V zariadenie. Najbezpečnejší začiatok je samotná doska alebo jednoduchý nízkonapäťový senzor.

## Čo je ESPHome

ESPHome vytvára vlastný firmware pre podporované mikrokontroléry na základe YAML konfigurácie. V konfigurácii popíšete, akú dosku používate a aké komponenty k nej pripájate.

Oficiálna dokumentácia ESPHome uvádza, že prvé nahratie firmvéru na novú dosku typicky prebieha cez USB. Neskoršie aktualizácie možno po správnom nastavení posielať bezdrôtovo cez sieť.

## Krok 1: nainštalujte alebo otvorte ESPHome Device Builder

Ak používate Home Assistant OS, jednou z najjednoduchších ciest je ESPHome Device Builder dostupný ako Home Assistant aplikácia.

Ak používate inú platformu, ESPHome poskytuje aj ďalšie možnosti vrátane desktopovej aplikácie, Dockeru a príkazového riadka.

Pre začiatočníka je Device Builder najprehľadnejší, pretože vytváranie, editovanie, kompiláciu aj inštaláciu rieši v jednom rozhraní.

## Krok 2: vytvorte nové zariadenie

V Device Builderi vytvorte nový device a zvoľte správnu platformu / typ dosky.

Názov zariadenia zvoľte tak, aby dával zmysel aj o rok. Namiesto `esp32-1` je lepší názov podľa funkcie, napríklad:

- `obyvacka-teplota`,
- `technicka-voda`,
- `chodba-pohyb`.

Pri prvom zariadení však pokojne použite jednoduchý testovací názov a neskôr si vytvorte vlastný systém pomenovania.

## Krok 3: prvé nahratie cez USB

Prvé nahratie je najcitlivejší krok. Použite dátový USB kábel — nie každý kábel, ktorý nabíja telefón, prenáša aj dáta.

Ak počítač dosku nevidí:

- skúste iný USB kábel,
- skúste iný USB port,
- skontrolujte ovládač USB-UART prevodníka,
- pri niektorých doskách môže byť pri nahrávaní potrebné tlačidlo BOOT.

Konkrétny postup sa môže líšiť podľa dosky, preto pri problémoch kontrolujte dokumentáciu konkrétneho modelu.

## Krok 4: pripojenie do Wi-Fi

Po nahratí firmvéru sa ESP32 pripojí do siete podľa konfigurácie.

V produkčnom zariadení si dajte záležať na:

- stabilnom Wi-Fi pokrytí,
- rozumnom názve zariadenia,
- zálohe konfigurácie,
- bezpečnej správe prístupových údajov.

Citlivé Wi-Fi heslá nepatria do verejného GitHub repozitára ani do článku.

## Krok 5: pridanie do Home Assistanta

Keď je ESPHome zariadenie online, Home Assistant ho môže automaticky objaviť, ak sieť umožňuje potrebné lokálne objavenie.

Ak sa automaticky nezobrazí, možno integráciu pridať manuálne cez:

**Nastavenia → Zariadenia a služby → Pridať integráciu → ESPHome**

Následne zadajte hostname alebo IP adresu zariadenia.

## Krok 6: až teraz pridajte prvý senzor

Keď samotná doska funguje stabilne, pridajte jeden jednoduchý komponent. Dobrým prvým projektom môže byť napríklad:

- teplotný a vlhkostný senzor,
- PIR pohybový senzor,
- tlačidlo,
- jednoduchý stavový vstup,
- OLED displej.

Týmto spôsobom viete oddeliť problém s doskou a sieťou od problému so samotným senzorom.

## Modelový prvý projekt

**ESP32 + BME280 + Home Assistant**

Cieľ:

- merať teplotu, vlhkosť a tlak,
- zobraziť hodnoty ako entity v Home Assistante,
- neskôr ich použiť v automatizácii.

Tento článok zámerne neuvádza konkrétne GPIO zapojenie bez naviazania na presnú dosku a konkrétny modul. Pri publikovaní samostatného BME280 návodu sa musí overiť pinout aj napájanie použitého modulu.

## Časté chyby

### USB kábel iba na nabíjanie

Doska svieti, ale počítač ju nevidí. Toto je jedna z najjednoduchších chýb na prehliadnutie.

### Nesprávne zvolená doska

ESP32 existuje v mnohých variantoch. Nesprávna board konfigurácia môže spôsobiť problém pri kompilácii alebo nahrávaní.

### Slabé napájanie

Nestabilné napájanie môže vyzerať ako chyba Wi-Fi alebo firmvéru. Pri rozširovaní projektu počítajte aj so spotrebou pripojených senzorov a periférií.

### Príliš veľa komponentov naraz

Ak pri prvom pokuse pripojíte päť senzorov, displej a relé, diagnostika je zbytočne zložitá. Pridávajte funkcie po jednej.

## Bezpečnostné upozornenie

ESP32 je nízkonapäťová vývojová platforma. Nepoužívajte ju ako zámienku na experimentovanie so sieťovým napätím. Ak projekt ovláda 230 V zariadenie alebo zasahuje do pevnej elektroinštalácie, návrh a montáž patria odborne spôsobilej osobe.

## Odporúčané produkty — návrh

- ESP32 DevKit V1
- vhodný dátový USB kábel
- breadboard a Dupont vodiče
- neskôr jeden podporovaný senzor

Produkčná URL ESP32 pri príprave draftu:

https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/

## Interné odkazy — návrh

- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Home Assistant: https://komarena.sk/home-assistant/
- Senzory: https://komarena.sk/senzory/
- Napájanie: https://komarena.sk/napajanie/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/

## CTA

Začnite samotnou ESP32 doskou a prvým stabilným ESPHome zariadením. Keď funguje sieť, aktualizácia aj Home Assistant integrácia, pridajte jeden senzor a projekt rozširujte po malých krokoch.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome — Getting Started: https://esphome.io/install/getting-started/
- ESPHome — Install ESPHome: https://esphome.io/install/
- ESPHome — Guides: https://esphome.io/guides/
- KomArena ESP & ESPHome: https://komarena.sk/esp-esphome/

## Open points

- Otvorený bod: pred publikovaním overiť aktuálnu dostupnosť ESP32 DevKit V1.
- Otvorený bod: vytvoriť samostatný overený BME280 návod s konkrétnym modulom a GPIO zapojením.
- Otvorený bod: doplniť screenshoty z aktuálneho ESPHome Device Buildera iba s neidentifikujúcimi testovacími údajmi.

## Facebook post

Prvý ESPHome projekt nemusí začínať desiatimi senzormi a komplikovaným YAML súborom.

Najprv dostaňte ESP32 cez USB do ESPHome, pripojte ju do Wi-Fi a overte, že ju Home Assistant vidí. Až potom pridajte prvý senzor.

Pripravili sme postup, ktorý oddeľuje problémy s doskou, sieťou a zapojením, aby sa prvý projekt dal normálne diagnostikovať.

Celý návod: [URL po publikovaní]

## Instagram caption

ESP32 + ESPHome + Home Assistant. Najlepší prvý projekt je ten, ktorý pridávate po jednom kroku. Najprv doska, potom sieť, potom Home Assistant a až potom senzor.

#komarena #esphome #esp32 #homeassistant #iot #diyprojekty

## Reels / Shorts idea

**Hook:** „ESP32 sa vám v ESPHome nechce pripojiť? Začnite bez senzora.“

Ukázať:

1. ESP32 + dátový USB kábel,
2. nový device v ESPHome,
3. prvé nahratie,
4. zariadenie online,
5. objavenie v Home Assistante,
6. až potom pripojenie senzora.

## Newsletter snippet

**Predmet:** Prvý ESPHome projekt bez zbytočného chaosu

Začnite samotnou ESP32 doskou a overte USB, Wi-Fi a Home Assistant integráciu skôr, než pridáte senzory. Nový návod vysvetľuje workflow, ktorý výrazne uľahčuje diagnostiku prvého projektu.
