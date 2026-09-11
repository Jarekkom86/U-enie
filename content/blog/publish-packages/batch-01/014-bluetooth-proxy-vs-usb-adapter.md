<!-- markdownlint-disable MD013 -->

# WordPress payload — 014

- **Status:** ready-for-review
- **Post title:** Bluetooth Proxy vs USB adaptér pre Home Assistant
- **Slug:** `bluetooth-proxy-vs-usb-adapter-home-assistant`
- **Excerpt:** USB Bluetooth adaptér alebo ESP32 Bluetooth Proxy? Porovnanie dosahu, virtualizácie, BLE a aktívnych spojení v Home Assistante.
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárna kategória:** Produkty, testy a porovnania
- **Tags:** Home Assistant; ESPHome; Bluetooth Proxy; ESP32; BLE
- **SEO title:** Bluetooth Proxy vs USB adaptér: čo zvoliť pre Home Assistant
- **Meta description:** Porovnanie ESPHome Bluetooth Proxy a USB Bluetooth adaptéra v Home Assistante: dosah, BLE, virtualizácia, aktívne spojenia a kombinovanie oboch ciest.
- **Focus keyword:** Bluetooth Proxy vs USB adaptér Home Assistant
- **Schema article type:** TechArticle
- **Canonical:** default vlastný permalink
- **Robots:** index, follow
- **Featured image brief:** `featured-images.md#014`

# ESPHome Bluetooth Proxy alebo USB adaptér: čo zvoliť pre Home Assistant?

USB Bluetooth adaptér je jednoduchý, keď je Home Assistant fyzicky blízko zariadení a hostiteľský systém má spoľahlivú Bluetooth podporu. ESPHome Bluetooth Proxy je silná voľba vtedy, keď potrebujete pokrytie rozšíriť do ďalších miestností alebo sa chcete vyhnúť problémom s USB passthrough vo virtualizácii.

Dôležité je, že Home Assistant nemusí používať iba jednu z týchto ciest. Lokálne adaptéry a kompatibilné vzdialené proxy dokáže agregovať do jednej Bluetooth vrstvy.

## Čo je USB Bluetooth adaptér

USB adaptér je rádio fyzicky pripojené k serveru Home Assistanta.

### Výhody

- minimum ďalších sieťových zariadení,
- jednoduchá architektúra,
- nízka latencia,
- dobrá voľba pri centrálne umiestnenom serveri.

### Nevýhody

- dosah je viazaný na polohu servera,
- kovová skrinka a okolité USB/Wi‑Fi zariadenia môžu zhoršiť RF podmienky,
- vo virtualizácii pribúda USB passthrough,
- kvalita podpory závisí od konkrétneho chipsetu a hostiteľského systému.

## Čo je ESPHome Bluetooth Proxy

Bluetooth Proxy je sieťové zariadenie — typicky ESP32 s ESPHome — ktoré prijíma BLE signály vo svojom okolí a odovzdáva ich Home Assistantu cez IP sieť.

Proxy teda môžete umiestniť bližšie k Bluetooth senzorom alebo zariadeniam, aj keď Home Assistant server stojí inde.

### Dôležité: ide o BLE

ESPHome Bluetooth Proxy slúži pre **Bluetooth Low Energy**. Nie je to univerzálny proxy pre všetky klasické Bluetooth profily.

## Aktívne spojenia a connection slots

Aktuálna ESPHome dokumentácia uvádza pri ESP32 predvolene **3 connection slots** pre aktívne BLE spojenia. Pri ESP-IDF je možné nastaviť až **9**, ale dokumentácia odporúča neprekračovať **5**, pretože každý slot spotrebúva RAM a vyšší počet môže zhoršiť stabilitu.

Zariadenie, ktoré drží aktívne spojenie trvalo, obsadí jeden slot počas celého spojenia. Pasívne BLE reklamy sa týmto počtom aktívnych slotov neobmedzujú.

## Kedy zvoliť USB adaptér

USB dáva zmysel, ak:

- Home Assistant beží na fyzickom stroji,
- server je blízko BLE zariadení,
- jeden kvalitný adaptér pokrýva potrebný priestor,
- nechcete spravovať ďalší ESPHome uzol.

Pri RF problémoch môže pomôcť USB predlžovačka, ktorá adaptér oddiali od kovovej skrinky a zdrojov rušenia.

## Kedy zvoliť Bluetooth Proxy

Proxy je vhodná, ak:

- server je v technickej miestnosti alebo na okraji domu,
- BLE zariadenia sú na viacerých podlažiach,
- používate VM a USB passthrough je komplikácia,
- potrebujete pokrytie rozšíriť do konkrétnej miestnosti,
- daná Home Assistant integrácia podporuje Bluetooth vrstvu Home Assistanta.

## Môžete použiť oboje naraz

Áno. V mnohých domácnostiach dáva zmysel nechať kvalitný USB adaptér pri serveri a pridať jednu alebo viac proxy tam, kde je slabé pokrytie.

To je často lepšie než hľadať jeden „najsilnejší“ adaptér pre celý dom.

## ESP32 ako proxy

Klasická ESP32 s BLE je typický základ pre ESPHome Bluetooth Proxy. Pred nasadením však overte presnú rodinu čipu, stabilné napájanie a aktuálnu podporu v ESPHome.

Ako kandidáta na vlastný proxy uzol môžete použiť [ESP32 DevKit V1](https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/).

Súvisiace rozcestníky:

- [Home Assistant](https://komarena.sk/home-assistant/)
- [ESP & ESPHome](https://komarena.sk/esp-esphome/)
- [Napájanie](https://komarena.sk/napajanie/)

## Rozhodovací postup

1. Overte, že vaše zariadenie je BLE a podporované príslušnou Home Assistant integráciou.
2. Ak server stojí blízko zariadení, začnite kvalitným USB adaptérom.
3. Ak je dosah slabý alebo Home Assistant beží vo VM, zvážte proxy.
4. Pri viacerých aktívnych zariadeniach sledujte connection slots a stabilitu.
5. Nebojte sa kombinovať lokálny adaptér a vzdialené proxy.

## Zdroje

- Home Assistant — Bluetooth integration
- ESPHome — Bluetooth Proxy

Technické tvrdenia overené 11. 9. 2026.
