<!-- markdownlint-disable MD013 -->

# Draft 032 — Home Assistant + ESPHome starter architektúra

- **Status:** draft
- **Typ:** modelová architektúra / beginner build guide
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Smart domácnosť
- **Cieľová skupina:** používateľ, ktorý chce postaviť prvé vlastné ESPHome zariadenie bez zbytočného hardvéru a chaosu v sieti
- **Search intent:** informačný / komerčný
- **Focus keyword:** Home Assistant ESPHome starter

## SEO title

Home Assistant + ESPHome starter: jednoduchá architektúra prvého projektu

## Meta description

Ako poskladať Home Assistant + ESPHome starter architektúru: host, sieť, ESP32, Device Builder, native API, prvý senzor a bezpečný rast projektu.

## H1

Home Assistant + ESPHome starter architektúra: čo naozaj potrebujete na prvý vlastný projekt

## Úvod

Prvý ESPHome projekt sa dá zbytočne skomplikovať už pri nákupe.

Začiatočník často kúpi:

- viac rôznych ESP32 dosiek,
- päť senzorov,
- displej,
- relé,
- DC menič,
- breadboard,
- ďalší hub,
- a až potom zisťuje, čo vlastne potreboval.

Pre prvý projekt je lepší opačný prístup:

**Home Assistant → stabilná IP sieť → jedna ESP32 → ESPHome firmware → native API → jeden senzor**

## Minimálna architektúra

Pre základný lokálny ESPHome projekt potrebujete štyri vrstvy:

1. **Home Assistant** — centrálna platforma,
2. **LAN/Wi-Fi** — sieť medzi Home Assistantom a ESPHome zariadením,
3. **ESPHome Device Builder** — nástroj na konfiguráciu a zostavenie firmvéru,
4. **ESP32/kompatibilný mikrokontrolér** — samotné fyzické zariadenie.

Senzor je až piata vrstva.

## Home Assistant nemusí bežať na rovnakom zariadení ako ESPHome build

ESPHome má dve časti:

- firmware, ktorý beží na mikrokontroléri,
- build/configuration nástroj, ktorý firmware pripraví a nahrá.

V praxi veľa používateľov používa ESPHome Device Builder ako Home Assistant app.

ESPHome však ponúka aj desktopovú aplikáciu a ďalšie spôsoby inštalácie.

Pre KomArena beginner workflow je Home Assistant OS + Device Builder najjednoduchšia cesta, ale článok nesmie tvrdiť, že je jediná.

## Sieť je súčasť projektu

ESPHome zariadenie nie je iba doska so senzorom. Je to sieťové zariadenie.

Pred pripojením senzora overte:

- Wi-Fi pokrytie,
- DHCP,
- mDNS/discovery,
- že Home Assistant a ESPHome zariadenie sa vedia navzájom dosiahnuť,
- že firewall/VLAN pravidlá neblokujú potrebnú lokálnu komunikáciu.

Ak toto nefunguje, pridanie ďalšieho senzora problém iba skryje pod ďalšiu vrstvu.

## Native API je preferovaná Home Assistant cesta

Aktuálna Home Assistant ESPHome integrácia komunikuje so zariadeniami cez **ESPHome native API**.

Home Assistant udržiava persistent connection a ESPHome zariadenie posiela zmeny stavov priamo, namiesto klasického periodického pollingu.

To umožňuje napríklad:

- rýchle zmeny binary sensorov,
- near-real-time senzorové hodnoty,
- rýchle ovládanie switch/light entít,
- automatické reconnecty po výpadku.

Integrácia je v Home Assistante klasifikovaná ako **Local Push**.

## MQTT na prvý projekt nepotrebujete

ESPHome podporuje aj ďalšie komunikačné možnosti, ale pri bežnom Home Assistant starter projekte nie je potrebné pridávať MQTT iba preto, že je populárne v IoT.

Ak native API rieši váš use case, ďalší broker znamená ďalšiu vrstvu:

- konfigurácie,
- autentifikácie,
- diagnostiky,
- maintenance.

MQTT má svoje miesto, ale nemá byť povinná súčasť prvého ESPHome projektu bez dôvodu.

## Krok 1: jedna presne identifikovaná ESP32

Vyberte jednu konkrétnu dosku a poznajte jej model.

ESP32 rodina nie je jeden univerzálny pinout.

Pred wiringom treba vedieť:

- presný board variant,
- USB-UART/USB spôsob programovania,
- označenie pinov,
- napájaciu cestu,
- ktoré GPIO sú vhodné pre danú perifériu.

KomArena starter články majú preto používať presný produkt, nie generické „ESP32“ bez identifikácie.

Pracovný produktový link:

https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/

Pred publish sa permalink a dostupnosť znovu načítajú z WooCommerce.

## Krok 2: dátový USB kábel

Na prvé flashovanie potrebujete kábel, ktorý prenáša dáta.

„Doska svieti“ neznamená „USB komunikácia funguje“.

Pri probléme s prvým flashom začnite:

1. iným overeným káblom,
2. iným USB portom,
3. kontrolou správneho board typu,
4. až potom riešte BOOT/flash špecifiká konkrétnej dosky.

## Krok 3: flash bez senzora

Prvé úspešné ESPHome zariadenie má dokazovať iba:

- že firmware ide zostaviť,
- že doska ide flashnúť,
- že sa pripojí do siete,
- že sa objaví v Home Assistante,
- že native API je stabilné.

Kým toto nie je hotové, nepridávajte ďalší hardware.

## Krok 4: pomenovanie a IP stratégia

Zariadenie pomenujte podľa funkcie alebo miesta.

Napríklad:

- `obyvacka-klima`,
- `technicka-voda`,
- `chodba-pohyb`.

Vyhnite sa:

- `esp32-1`,
- `test-final-new`,
- duplikovaným názvom.

Home Assistant ESPHome integrácia upozorňuje, že každé ESPHome zariadenie musí mať unikátny názov; ten sa používa aj pri discovery/reconnect mechanizmoch.

Ak chcete stabilnú sieťovú adresu, pre bežnú domácnosť je často vhodnejšia DHCP rezervácia na routeri než ručne nastavená statická IP v každom zariadení.

## Krok 5: až teraz jeden senzor

Dobrý prvý senzor má byť jednoduchý a nízkonapäťový.

Možnosti podľa dostupnosti a projektu:

- DHT22/AM2302,
- BME280 po obnovení dostupnosti,
- jednoduchý button/binary sensor,
- PIR po splnení produktového gate,
- OLED až ako ďalší krok, nie ako prvá diagnóza siete.

Pridávajte iba jeden nový problém naraz.

## Model A: ESP32 + DHT22

Architektúra:

**DHT22 → ESP32 → ESPHome native API → Home Assistant entity → dashboard/automation**

Výhoda:

- jednoduchý dátový model,
- jasné entity,
- vhodné na prvý end-to-end test.

Nevýhoda:

- treba overiť pinout a pull-up konkrétneho modulu.

Preto presný wiring patrí do samostatného Draftu 019.

## Model B: ESP32 + BME280

Architektúra:

**BME280 → I2C → ESP32 → ESPHome → Home Assistant**

Je to dobrý model na pochopenie I2C, ale KomArena BME280 je momentálne pod stock gate, takže beginner funnel na ňom nesmie byť obchodne závislý.

## Model C: ESP32 ako Bluetooth Proxy

Tu ESP32 nepripájate k jednému klasickému senzoru cez GPIO.

Namiesto toho:

- ESP32 počúva BLE zariadenia,
- cez sieť prenáša BLE informácie do Home Assistanta,
- Home Assistant kombinuje lokálne Bluetooth adaptéry a proxy podľa integrácie.

Toto patrí až po zvládnutí základného ESPHome workflow.

## Napájanie držte oddelené od logiky

Ak projekt začne resetovať po pridaní periférie, neprepisujte automaticky YAML.

Vráťte sa k napájacej architektúre:

- zdroj,
- kábel,
- konektor,
- regulátor,
- board,
- periférie.

Draft 005 a 013 riešia túto vrstvu samostatne.

## Bez 230 V v starter projekte

Prvý ESPHome projekt nemá byť relé do pevnej elektroinštalácie.

Začnite:

- senzorom,
- displejom,
- nízkonapäťovým LED/signálovým projektom.

Sieťové napätie a pevná elektroinštalácia patria odborne spôsobilej osobe.

## Backup konfigurácie skôr, než vznikne desať zariadení

Keď máte prvé zariadenie funkčné, vytvorte si proces pre:

- ukladanie YAML konfigurácie,
- Home Assistant backup,
- pomenovanie secrets,
- dokumentáciu board variantu,
- poznámku o napájaní a wiring revízii.

Čím viac ESPHome zariadení pribudne, tým drahšie je dodatočne zisťovať, čo je čo.

## Základný rastový plán

### Fáza 1

Home Assistant + jedna ESP32 bez periférií.

### Fáza 2

Jeden senzor.

### Fáza 3

Jedna automatizácia.

### Fáza 4

OLED alebo druhý senzor.

### Fáza 5

3D krabička a finálna montáž.

### Fáza 6

Ďalšie zariadenie podľa rovnakého štandardu.

## Starter nákupný princíp

Namiesto „maker boxu so 40 modulmi“ odporúčame začať malou zostavou:

- 1× presná ESP32 doska,
- 1× overený dátový USB kábel,
- breadboard/dupont podľa projektu,
- 1× overený senzor,
- vhodné nízkonapäťové napájanie podľa konkrétneho setupu.

Až keď toto funguje, rozširujte sortiment projektu.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 003 — Prvý ESPHome projekt
- Draft 005 — Stabilné napájanie ESP32
- Draft 013 — Ako vybrať napájanie pre ESP32
- Draft 019 — DHT22 + ESPHome
- Draft 024 — Naming zariadení a entít
- Draft 026 — Prvá automatizácia
- Draft 030 — Zálohy a obnova

## CTA

Prvý projekt držte malý. Jedna doska, jeden kábel, stabilná sieť a jeden senzor naučia viac než desať modulov zapojených naraz bez jasnej diagnostiky.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome — Getting Started: https://esphome.io/install/getting-started/
- ESPHome — Install: https://esphome.io/install/
- Home Assistant — ESPHome integration: https://www.home-assistant.io/integrations/esphome/

## Open points

- Otvorený bod: pred publikovaním overiť živý ESP32 permalink a sklad.
- Otvorený bod: vybrať jeden reálne skladom podporovaný starter senzor pre produktový CTA.
- Otvorený bod: pripraviť vizuálnu architektonickú schému `sensor → ESP32 → native API → Home Assistant → dashboard/automation`.
- Otvorený bod: samostatne pripraviť KomArena ESPHome Starter Kit bundle až po maržovom, skladovom a obsahovom gate.

## Facebook post

Prvý ESPHome projekt nepotrebuje krabicu plnú modulov.

Stačí Home Assistant, stabilná sieť, jedna presná ESP32, dátový USB kábel a jeden senzor. Nový starter návod ukazuje architektúru po vrstvách a vysvetľuje, prečo je native API najjednoduchšia HA cesta.

Celý článok: [URL po publikovaní]

## Instagram caption

Jedna doska. Jeden senzor. Jedna automatizácia. Tak sa stavia ESPHome projekt, ktorý sa dá aj diagnostikovať.

#komarena #esphome #esp32 #homeassistant #iot #maker

## Reels / Shorts idea

**Hook:** „Čo naozaj potrebujete na prvý ESPHome projekt?“

Ukázať:

1. Home Assistant,
2. ESPHome Device Builder,
3. ESP32,
4. USB kábel,
5. jeden senzor,
6. entity v Home Assistante.

## Newsletter snippet

**Predmet:** Home Assistant + ESPHome starter bez zbytočného hardvéru

Nový modelový návod rozkladá prvý ESPHome projekt na vrstvy: host, sieť, ESP32, native API a jeden senzor — bez MQTT a desiatich modulov navyše.