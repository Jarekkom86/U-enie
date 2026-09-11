<!-- markdownlint-disable MD013 -->

# Draft 001 — BleBox wLightBox v3 a Home Assistant

- **Status:** draft
- **Typ:** produkt v praxi + návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Produkty, testy a porovnania; Smart domácnosť
- **Cieľová skupina:** používateľ Home Assistant, ktorý chce lokálne ovládať nízkonapäťové LED pásy
- **Search intent:** informačný + komerčný
- **Focus keyword:** BleBox wLightBox v3 Home Assistant

## SEO title

BleBox wLightBox v3 + Home Assistant: lokálne LED ovládanie

## Meta description

Ako pridať BleBox wLightBox v3 do Home Assistanta, ktoré LED režimy podporuje, ako funguje lokálne ovládanie a čo skontrolovať pred montážou.

## H1

BleBox wLightBox v3 a Home Assistant: lokálne ovládanie RGBW a RGBCCT LED

## Úvod

Chcete ovládať LED pás z Home Assistanta, ale nechcete stavať celé riešenie od nuly na ESP32? BleBox wLightBox v3 je hotový Wi-Fi LED kontrolér pre nízkonapäťové LED pásy, ktorý Home Assistant podporuje cez integráciu **BleBox devices**.

Dôležitá výhoda je, že bežné ovládanie v Home Assistante prebieha lokálne v sieti. Zariadenie teda nemusí pri každom poveli komunikovať cez vzdialený cloud.

Na KomArena.sk je wLightBox v3 zaujímavý najmä pre používateľov, ktorí chcú spojiť hotový LED kontrolér s otvoreným smart home systémom bez toho, aby museli programovať vlastný firmware.

## Čo wLightBox v3 reálne ovláda

Podľa výrobcu má wLightBox v3 päť PWM výstupných kanálov. Podporuje viac konfigurácií LED pásov, napríklad:

- RGB,
- RGBW,
- RGBCCT / RGBWW,
- CCT,
- 2× CCT,
- 5× samostatný jednofarebný kanál.

Výrobca uvádza napájanie **12–24 V DC**, maximálne **3 A na jeden kanál** a **15 A celkovo**. Pri návrhu osvetlenia preto nestačí sledovať iba výkon LED pásu — treba správne dimenzovať aj zdroj, vodiče a zaťaženie jednotlivých kanálov.

## Ako funguje integrácia s Home Assistant

Oficiálna integrácia Home Assistant podporuje BleBox zariadenia a wLightBox pridáva ako svetelné entity podľa režimu nastaveného v zariadení.

Home Assistant môže zariadenie objaviť automaticky, ak je wLightBox pripojený do Wi-Fi a sieť umožňuje potrebnú lokálnu komunikáciu. Ak automatické objavenie nefunguje, integráciu možno pridať manuálne cez IP adresu alebo hostname zariadenia.

Integrácia používa **local polling**. Pri svetlách Home Assistant podľa svojej dokumentácie načítava stav v krátkom intervale a zariadenie ovláda cez lokálnu sieť.

Podľa zvoleného režimu môžu byť dostupné funkcie ako:

- zapnutie a vypnutie,
- jas,
- farba,
- teplota bielej,
- efekty.

Presný rozsah funkcií závisí od režimu nastaveného vo wBox aplikácii a od konkrétnej konfigurácie LED pásu.

## Praktický postup integrácie

### 1. Najprv nastavte wLightBox

Zariadenie pripojte do domácej Wi-Fi podľa oficiálneho postupu BleBox a aplikácie wBox. Pred integráciou je vhodné skontrolovať aj dostupnosť aktuálneho firmvéru.

### 2. Skontrolujte sieť

Home Assistant a wLightBox musia mať vzájomnú IP konektivitu. Pri bežnej domácej sieti býva automatické objavenie najjednoduchšie, no pri VLAN alebo oddelených subnetoch môže byť potrebná manuálna konfigurácia.

### 3. Pridajte integráciu

V Home Assistante otvorte:

**Nastavenia → Zariadenia a služby → Pridať integráciu → BleBox devices**

Ak sa zariadenie zobrazí ako objavené, stačí ho pridať. Pri manuálnom nastavení zadajte lokálnu IP adresu alebo hostname.

### 4. Skontrolujte vytvorené entity

Po pridaní integrácie skontrolujte, či Home Assistant vytvoril správny typ svetelnej entity. Ak neskôr zmeníte farebný režim vo wBox, môže byť potrebné zariadenie v Home Assistante znovu načítať.

## Modelové použitie: LED pod kuchynskou linkou

Modelový príklad:

- wLightBox v3,
- zodpovedajúci 12 V alebo 24 V LED pás,
- vhodne dimenzovaný DC zdroj,
- Home Assistant,
- voliteľne senzor pohybu alebo prítomnosti.

V Home Assistante môže automatizácia napríklad zapnúť jemné biele svetlo pri pohybe večer a cez deň používať inú úroveň jasu.

Toto je model použitia, nie univerzálna schéma zapojenia. Konkrétny LED pás, zdroj, prierez vodičov a istenie musia zodpovedať reálnemu odberu.

## Časté chyby

### Zariadenie sa neobjaví automaticky

Skontrolujte, či je wLightBox v rovnakej dostupnej sieti ako Home Assistant. Pri oddelených sieťach ho skúste pridať cez IP adresu.

### Po zmene režimu nesedia entity

Ak zmeníte režim RGB / CCT / RGBCCT vo wBox aplikácii, zariadenie v Home Assistante znovu načítajte.

### Podcenený napájací zdroj

LED pás môže mať výrazne vyšší odber než samotný kontrolér. Zdroj musí mať zodpovedajúce napätie, výkonovú rezervu a bezpečnú kabeláž.

### Prekročenie prúdu na kanál

Celkový limit 15 A neznamená, že možno ľubovoľne zaťažiť jeden výstup. Výrobca uvádza maximálne 3 A na kanál.

## Bezpečnostné upozornenie

wLightBox v3 pracuje na nízkom DC napätí, ale napájací zdroj môže byť na vstupnej strane pripojený na 230 V. Tento článok neposkytuje návod na prácu so sieťovým napätím. Zapojenie alebo úpravu 230 V časti musí vykonať odborne spôsobilá osoba.

Pri DC časti vždy skontrolujte polaritu, napätie LED pásu, maximálny prúd, prierez vodičov a odporúčania výrobcu.

## Odporúčaný produkt na KomArena.sk

- BleBox wLightBox v3 Wi-Fi LED ovládač RGB/RGBW/RGBCCT – Home Assistant
- Produkčná URL pri príprave draftu: https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/

Pred publikovaním overiť aktuálnu dostupnosť produktu a neuvádzať sklad alebo cenu napevno v článku.

## Interné odkazy — návrh

- hlavný produkt: https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/
- Home Assistant rozcestník: https://komarena.sk/home-assistant/
- protokoly a integrácie: https://komarena.sk/protokoly-a-integracie/
- smart home kategória / rozcestník: `Otvorený bod: overiť finálnu živú URL pri publikovaní.`

## CTA

Ak chcete hotový Wi-Fi kontrolér LED pásov s lokálnou integráciou do Home Assistanta, pozrite si BleBox wLightBox v3 na KomArena.sk. Pred nákupom si overte typ LED pásu, napätie a maximálny odber zostavy.

## Zdroje a overenie

Overené 11. 9. 2026:

- BleBox — wLightBox: https://blebox.eu/en/product/wlightbox/
- Home Assistant — BleBox devices: https://www.home-assistant.io/integrations/blebox/
- BleBox — wLightBox v3 manual: https://blebox.eu/wp-content/uploads/wLightBox_v3_Manual_EN.pdf
- KomArena produktová stránka: https://komarena.sk/produkt/blebox-wlightbox-v3-smart-led-home-assistant/

## Open points

- Otvorený bod: pred publikovaním skontrolovať aktuálnu dostupnosť a produktovú URL.
- Otvorený bod: doplniť finálny featured image z vlastnej KomArena galérie produktu.
- Otvorený bod: po publikovaní doplniť produkčnú URL článku.

## Facebook post

Chcete dostať RGBW alebo RGBCCT LED pás do Home Assistanta bez vlastného programovania ESP32? BleBox wLightBox v3 má oficiálnu integráciu v Home Assistante a bežné ovládanie prebieha lokálne v sieti.

V novom návode ukážeme, aké LED režimy podporuje, ako ho Home Assistant objaví a na čo si dať pozor pri napájaní a zaťažení jednotlivých kanálov.

Celý návod: [URL článku po publikovaní]

## Instagram caption

LED pás + Home Assistant bez vlastného firmvéru? BleBox wLightBox v3 podporuje viac LED režimov a Home Assistant ho vie ovládať cez lokálnu integráciu BleBox devices. V návode vysvetľujeme nastavenie aj najčastejšie chyby.

#komarena #homeassistant #blebox #smarthome #led #automatizacia

## Reels / Shorts idea

**Hook:** „LED pás v Home Assistante za pár krokov — bez vlastného ESP32 firmvéru.“

Ukázať:

1. wLightBox v3,
2. LED pás,
3. pridanie BleBox integrácie v Home Assistante,
4. ovládanie jasu / farby,
5. bezpečnostnú poznámku o správnom zdroji.

## Newsletter snippet

**Predmet:** LED pás v Home Assistante bez vlastného firmvéru

BleBox wLightBox v3 je hotový Wi-Fi kontrolér pre viac typov LED pásov a Home Assistant ho podporuje cez lokálnu integráciu. V novom návode vysvetľujeme, čo dokáže, ako ho pridať a na čo si dať pozor pri návrhu napájania.
