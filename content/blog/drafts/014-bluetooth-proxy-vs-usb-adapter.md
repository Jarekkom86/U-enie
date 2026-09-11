<!-- markdownlint-disable MD013 -->

# Draft 014 — Bluetooth Proxy vs USB Bluetooth adaptér v Home Assistante

- **Status:** draft
- **Typ:** rozhodovací článok / porovnanie
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Produkty, testy a porovnania; Návody a projekty
- **Focus keyword:** Bluetooth Proxy vs USB adaptér Home Assistant

## SEO title

Bluetooth Proxy vs USB adaptér: čo zvoliť pre Home Assistant

## Meta description

Porovnanie ESPHome Bluetooth Proxy a lokálneho USB Bluetooth adaptéra v Home Assistante: dosah, virtualizácia, BLE, aktívne spojenia a použitie.

## H1

ESPHome Bluetooth Proxy alebo USB Bluetooth adaptér: čo je lepšie pre Home Assistant?

## Krátka odpoveď

USB adaptér je jednoduchý, keď je Home Assistant fyzicky blízko Bluetooth zariadení a hostiteľský systém má spoľahlivú Bluetooth podporu. Bluetooth Proxy je často lepšie riešenie, keď potrebujete rozšíriť dosah do ďalších miestností, používate virtualizáciu alebo nechcete viesť USB adaptér cez celý dom.

Home Assistant dokáže lokálne adaptéry a kompatibilné vzdialené proxy agregovať do jednej Bluetooth vrstvy; nejde teda vždy o voľbu „iba jedno alebo druhé“.

## Čo je USB Bluetooth adaptér

USB adaptér je rádio fyzicky pripojené k serveru Home Assistanta. Operačný systém ho sprístupní Home Assistantu, ktorý cezň prijíma Bluetooth reklamy a podľa schopností adaptéra vytvára aktívne spojenia.

### Výhody

- minimum ďalších sieťových zariadení,
- nízka latencia a priame pripojenie k hostiteľovi,
- dobrá voľba, ak je server centrálne umiestnený,
- Home Assistant dokumentuje zoznam známych funkčných adaptérov.

### Nevýhody

- dosah je viazaný na umiestnenie servera,
- USB 3.x zariadenia, kovová skrinka a Wi-Fi prostredie môžu zhoršiť RF podmienky,
- virtualizácia a USB passthrough pridávajú ďalšiu vrstvu problémov,
- kvalita ovládačov závisí od hostiteľského OS a chipsetu.

Home Assistant priamo uvádza, že Bluetooth Proxy je v mnohých prípadoch lepší prístup než priamo pripojený adaptér, najmä pri virtualizácii.

## Čo je ESPHome Bluetooth Proxy

Bluetooth Proxy je sieťové zariadenie — typicky ESP32 s ESPHome — ktoré prijíma Bluetooth signály vo svojom okolí a odovzdáva ich Home Assistantu cez IP sieť.

ESPHome dokumentuje, že Home Assistant automaticky agreguje ESPHome Bluetooth proxies spolu s USB Bluetooth adaptérmi.

### Dôležité obmedzenie

Napriek názvu `bluetooth_proxy` ESPHome podporuje v tejto funkcii **BLE zariadenia**, nie všeobecne všetky klasické Bluetooth profily.

### Výhody

- proxy môžete umiestniť blízko senzora alebo zariadenia,
- viac proxy môže pokryť viac miestností/podlaží,
- vhodné pri Home Assistante vo VM alebo na mieste so slabým RF dosahom,
- ESPHome uzol môže zároveň plniť ďalšie vhodné nízkonapäťové funkcie, ak návrh zostane stabilný.

### Limity

- potrebuje stabilnú Wi-Fi alebo Ethernet cestu podľa hardvéru,
- zdieľané Wi-Fi/BLE rádio môže mať praktické limity,
- aktívne spojenia nie sú neobmedzené,
- nie každá ESP32 varianta má rovnakú Bluetooth výbavu.

ESPHome aktuálne uvádza maximálne 3 simultánne aktívne spojenia na ESPHome Bluetooth Proxy. Zariadenie, ktoré drží spojenie trvalo, môže jeden slot obsadiť nepretržite.

## Kedy by som zvolil USB adaptér

- Home Assistant beží na fyzickom HAOS stroji,
- server je blízko Bluetooth zariadení,
- jeden kvalitný adaptér pokryje celý potrebný priestor,
- nechcete spravovať ďalší ESPHome uzol,
- konkrétna integrácia vyžaduje funkcie alebo režim, ktorý proxy nepokrýva.

Pri problémoch s dosahom môže pomôcť krátka USB predlžovačka, ktorá oddiali adaptér od rušenia a kovovej skrinky; Home Assistant to uvádza medzi praktickými odporúčaniami.

## Kedy by som zvolil Bluetooth Proxy

- HA server je v technickej miestnosti, racku alebo na jednom okraji domu,
- Bluetooth senzory sú na viacerých podlažiach,
- používate VM/virtualizáciu a USB passthrough je nespoľahlivý,
- chcete pokrytie rozšíriť viacerými lacnými vzdialenými skenermi,
- zariadenia sú BLE a ich HA integrácia vie používať Bluetooth vrstvu Home Assistanta.

## Môžem použiť oboje naraz?

Áno. Home Assistant Bluetooth integrácia pracuje s lokálnymi adaptérmi aj vzdialenými proxy ako so skenermi a vie využívať viac ciest. To je často lepšia architektúra než snaha nájsť jeden „najsilnejší“ adaptér pre celý dom.

## ESP32 DevKit V1 ako proxy

Klasická ESP32 s BLE je typický základ pre ESPHome Bluetooth Proxy. Pred nasadením však treba overiť presný čip/revíziu dosky a stabilné napájanie.

KomArena ESP32 DevKit V1 je vhodný kandidát pre obsahový projekt; pred publikovaním finálneho návodu sa musí overiť aktuálny skladový kus a ESPHome podpora.

ESP32-S3 je iná rodina: používa Bluetooth 5 LE a nepodporuje klasické BR/EDR. To pri BLE proxy nemusí byť problém, ale potvrdzuje to, že názov „ESP32“ sám nestačí na rozhodnutie o bezdrôtových schopnostiach.

## Rozhodovací strom

**1. Sú vaše zariadenia BLE a podporované Home Assistant integráciou?**

- nie → Bluetooth Proxy nemusí byť správna cesta,
- áno → pokračujte.

**2. Pokryje kvalitný USB adaptér pri serveri priestor?**

- áno → začnite jednoducho USB adaptérom,
- nie → pridajte proxy bližšie k zariadeniam.

**3. Beží HA vo virtualizácii?**

- ak USB passthrough komplikuje stabilitu, proxy je veľmi silný kandidát.

**4. Potrebujete viac aktívnych spojení?**

- skontrolujte limity konkrétneho proxy/adaptéra a správanie integrácií; nepočítajte s neobmedzeným počtom spojení.

## KomArena prepojenie

- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Home Assistant: https://komarena.sk/home-assistant/
- Draft 007 — ESPHome Bluetooth Proxy
- Draft 005 — stabilné napájanie ESP32
- Draft 013 — ako vybrať napájanie pre ESP32

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant Bluetooth integration: https://www.home-assistant.io/integrations/bluetooth/
- ESPHome Bluetooth Proxy: https://esphome.io/components/bluetooth_proxy/

## Open points

- pred publikovaním znovu skontrolovať limit aktívnych spojení v aktuálnej ESPHome dokumentácii,
- otestovať konkrétny KomArena ESP32 DevKit V1 ako proxy v reálnom HAOS prostredí,
- neskôr spraviť praktický článok „Kam v dome umiestniť Bluetooth Proxy“.

## Facebook post

USB Bluetooth adaptér pri Home Assistante alebo ESP32 Bluetooth Proxy?

Ak je server v technickej miestnosti alebo vo VM, proxy môže vyriešiť dosah aj USB passthrough. Ak je server centrálne a jeden kvalitný adaptér pokryje zariadenia, zbytočne komplikovať sieť netreba.

Porovnanie: [URL po publikovaní]

## Instagram caption

Bluetooth Proxy nie je „silnejší USB dongle“. Je to vzdialený BLE skener, ktorý viete položiť tam, kde Bluetooth reálne potrebujete.

#komarena #homeassistant #esphome #bluetooth #esp32 #smarthome

## Newsletter snippet

**Predmet:** Bluetooth v Home Assistante: USB adaptér alebo ESP32 Proxy?

Nové porovnanie vysvetľuje dosah, virtualizáciu, BLE obmedzenia a situácie, keď dáva zmysel použiť dokonca oboje naraz.
