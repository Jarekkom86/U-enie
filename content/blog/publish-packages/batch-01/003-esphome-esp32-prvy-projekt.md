<!-- markdownlint-disable MD013 -->

# WordPress payload — 003

- **Status:** ready-for-review
- **Post title:** ESPHome + ESP32: prvý projekt krok za krokom
- **Slug:** `esphome-esp32-prvy-projekt-home-assistant`
- **Excerpt:** Začnite s ESPHome bez chaosu: ESP32, prvé USB nahratie, Wi‑Fi, Home Assistant a až potom prvý senzor.
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárna kategória:** Návody a projekty
- **Tags:** ESPHome; ESP32; Home Assistant
- **SEO title:** ESPHome + ESP32: prvý projekt krok za krokom
- **Meta description:** Ako začať s ESPHome a ESP32: Device Builder, prvé nahratie cez USB, Wi‑Fi, Home Assistant a bezpečný postup pre prvý projekt.
- **Focus keyword:** ESPHome ESP32 návod
- **Schema article type:** TechArticle
- **Canonical:** default vlastný permalink
- **Robots:** index, follow
- **Featured image brief:** `featured-images.md#003`

# ESPHome + ESP32: prvý projekt krok za krokom pre Home Assistant

ESP32 je praktický základ pre vlastné senzory a jednoduché smart-home zariadenia. ESPHome k nemu pridáva workflow, pri ktorom bežný projekt nemusíte programovať od nuly v C++: funkcie zariadenia popíšete v konfigurácii, ESPHome vytvorí firmware a výsledné entity sa následne môžu objaviť v Home Assistante.

Najlepšie je nezačať piatimi senzormi naraz. Prvý cieľ je jednoduchší: dostať samotnú ESP32 dosku spoľahlivo do ESPHome, pripojiť ju do siete a overiť komunikáciu s Home Assistantom. Až potom má zmysel pridávať ďalší hardvér.

## Čo budete potrebovať

- kompatibilnú ESP32 vývojovú dosku,
- dátový USB kábel,
- ESPHome Device Builder,
- Wi‑Fi sieť,
- Home Assistant, ak chcete zariadenie integrovať do smart domácnosti.

Pre prvý test nepotrebujete relé ani 230 V zariadenie. Začnite iba s nízkym napätím.

## 1. Otvorte ESPHome Device Builder

ESPHome Device Builder je rozhranie, v ktorom vytvárate konfigurácie, kompilujete firmware, inštalujete ho do zariadenia a sledujete logy.

V Home Assistant OS ho môžete používať ako aplikáciu. ESPHome ponúka aj desktopovú aplikáciu a ďalšie možnosti pre samostatné inštalácie.

## 2. Vytvorte nové zariadenie

V Device Builderi zvoľte vytvorenie nového zariadenia a správnu platformu/dosku.

Názov zariadenia voľte podľa funkcie, nie podľa poradového čísla. Napríklad `chodba-teplota` je užitočnejšie než `esp32-3`.

Dôležité je zvoliť presný alebo kompatibilný typ dosky. ESP32 existuje vo viacerých rodinách a revíziách a nemožno predpokladať, že všetky majú rovnaký pinout či bezdrôtové vlastnosti.

## 3. Prvé nahratie spravte cez USB

Aktuálna dokumentácia ESPHome uvádza, že prvé nahratie nového zariadenia sa robí cez USB. Ďalšie aktualizácie potom môžu prebiehať bezdrôtovo.

Ak počítač dosku nevidí:

- skúste iný dátový USB kábel,
- skúste iný USB port,
- overte ovládač USB-UART prevodníka,
- pri niektorých doskách môže pomôcť tlačidlo BOOT podľa dokumentácie konkrétnej revízie.

Veľmi častý problém je kábel, ktorý nabíja, ale neprenáša dáta.

## 4. Pripojte ESP32 do Wi‑Fi

Po nahratí firmvéru sa zariadenie pripojí do siete podľa konfigurácie.

Pre stabilný projekt má zmysel:

- používať dobré Wi‑Fi pokrytie,
- mať zrozumiteľné názvy zariadení,
- zálohovať konfigurácie,
- nedávať heslá ani secrets do verejných repozitárov alebo screenshotov.

## 5. Pridajte zariadenie do Home Assistanta

Keď je ESPHome zariadenie online, Home Assistant ho môže automaticky objaviť, ak sieť umožňuje lokálne objavenie.

Ak sa neobjaví automaticky, integráciu ESPHome môžete pridať manuálne v **Nastavenia → Zariadenia a služby → Pridať integráciu → ESPHome** a zadať hostname alebo IP adresu zariadenia.

## 6. Až potom pridávajte senzory

Keď samotná doska funguje stabilne, pridajte jeden komponent a znovu otestujte:

1. zariadenie bootuje,
2. drží Wi‑Fi,
3. komunikuje s Home Assistantom,
4. log nehlási reset alebo brownout,
5. až potom pridajte ďalší modul.

Týmto spôsobom odlíšite problém dosky alebo siete od problému konkrétneho senzora.

## Najčastejšie chyby

### USB kábel iba na nabíjanie

Doska svieti, ale Device Builder ju nevidí. Skúste overený dátový kábel.

### Nesprávny typ dosky

Nesprávna board konfigurácia môže spôsobiť problém pri kompilácii alebo nahrávaní.

### Nestabilné napájanie

Ak sa ESP32 reštartuje alebo vypadáva až po pridaní periférie, skontrolujte napájanie skôr než začnete meniť Wi‑Fi alebo automatizácie.

### Príliš veľa zmien naraz

Pri prvom projekte pridávajte funkcie po jednej. Diagnostika je potom výrazne jednoduchšia.

## Odporúčaný základ

Pre prvý projekt môžete začať s [ESP32 DevKit V1](https://komarena.sk/produkt/esp32-devkit-v1-wifi-bluetooth-vyvojova-doska/) a kvalitným dátovým USB káblom. Konkrétny senzor pridajte až v druhom kroku podľa toho, čo chcete merať.

Súvisiace rozcestníky:

- [ESP & ESPHome](https://komarena.sk/esp-esphome/)
- [Home Assistant](https://komarena.sk/home-assistant/)
- [Senzory](https://komarena.sk/senzory/)
- [Napájanie](https://komarena.sk/napajanie/)

## Bezpečnosť

ESP32 je nízkonapäťová platforma. Tento návod nie je návodom na zásah do 230 V elektroinštalácie. Ak projekt ovláda sieťové napätie alebo zasahuje do pevnej elektroinštalácie, návrh a montáž patria odborne spôsobilej osobe.

## Čo spraviť ďalej

Keď máte ESP32 stabilne online v ESPHome a Home Assistante, pridajte jeden overený senzor alebo displej. Až po úspešnom teste rozširujte projekt ďalej.

## Zdroje

- ESPHome — Getting Started
- ESPHome — Install ESPHome

Technické tvrdenia overené 11. 9. 2026.
