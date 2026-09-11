<!-- markdownlint-disable MD013 -->

# Batch 01 — featured image briefs

Všetky obrázky: 1600×900, 16:9, KomArena tech/art-deco charakter, čisté pozadie, vysoká čitateľnosť v mobile, bez ceny/skladu/dodávateľa.

## 003 — Prvý ESPHome projekt s ESP32

**Koncept:** čistý pracovný stôl, ESP32 DevKit V1 v strede, dátový USB kábel smerujúci k notebooku, v pozadí jemná schematická línia Home Assistant → ESPHome → ESP32.

**Existujúci produktový asset:** media ID 3512 — hlavný KomArena ESP32 produktový obrázok.

**Text v obrázku:** žiadny; voliteľne malý label `ESPHome START`.

**Alt:** `ESP32 DevKit V1 pripojený cez USB pri prvom ESPHome projekte`.

## 005 — Stabilné napájanie ESP32

**Koncept:** ESP32 na stole, vedľa krátky kvalitný USB kábel a multimeter; jemný vizuálny kontrast medzi stabilnou napájacou vetvou a prerušovanou/brownout vetvou. Žiadne 230 V prvky.

**Existujúci produktový asset:** media ID 3512 pre ESP32.

**Text:** voliteľne `BROWNOUT?`.

**Alt:** `ESP32 DevKit V1 s USB káblom a multimetrom pri diagnostike napájania`.

## 013 — Ako vybrať napájanie pre ESP32

**Koncept:** ESP32 + HW-319 LM2596 + multimeter v jednej nízkonapäťovej zostave. Šípky iba medzi DC vstupom, step-down meničom a ESP32, bez sieťovej strany adaptéra.

**Existujúce assety:** ESP32 media ID 3512; HW-319 media ID 3510 alebo detail ID 2993.

**Text:** voliteľne `STABILNÉ DC`.

**Alt:** `ESP32 DevKit V1 a HW-319 LM2596 pri nastavovaní nízkonapäťového napájania`.

## 014 — Bluetooth Proxy vs USB adaptér

**Koncept:** split-screen. Vľavo Home Assistant server + USB Bluetooth adaptér. Vpravo ESP32 Bluetooth Proxy v inej miestnosti, medzi nimi IP/Wi-Fi sieť. BLE zariadenia sú pri oboch stranách. Vizualizovať, že obe cesty sa môžu kombinovať.

**Existujúci asset:** ESP32 media ID 3512.

**Text:** `USB vs PROXY` maximálne 3 slová.

**Alt:** `Porovnanie USB Bluetooth adaptéra a ESP32 Bluetooth Proxy pre Home Assistant`.

## 008 — PLA vs PLA+ vs ABS+

**Koncept:** tri neutrálne cievky alebo tri rovnaké testovacie diely vedľa seba označené PLA, PLA+ a ABS+. Zobraziť rozdiel použitia cez malé ikony: model, funkčný držiak, technický diel. Bez tvrdenia, že jeden materiál je univerzálne najlepší.

**Text:** `PLA / PLA+ / ABS+`.

**Alt:** `Porovnanie PLA, PLA+ a ABS+ filamentov pre 3D tlač`.

## Export gate

Pred použitím vo WordPress:

- skontrolovať orez 16:9 aj blog-card crop,
- odstrániť EXIF/metadata, ak obsahujú pracovné údaje,
- WebP export,
- alt text vložiť do WordPress media library,
- obrázok nesmie zobrazovať neoverený variant produktu ako presný predávaný kus.
