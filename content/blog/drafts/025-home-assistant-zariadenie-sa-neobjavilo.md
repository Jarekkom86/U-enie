<!-- markdownlint-disable MD013 -->

# Draft 025 — Home Assistant zariadenie neobjavil automaticky

- **Status:** draft
- **Typ:** troubleshooting návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; ReSmart servis
- **Cieľová skupina:** používateľ, ktorý pripojil zariadenie do siete, ale Home Assistant ho neponúkol v Discovered
- **Search intent:** troubleshooting / informačný
- **Focus keyword:** Home Assistant neobjaví zariadenie

## SEO title

Home Assistant neobjavil zariadenie? Diagnostika krok za krokom

## Meta description

Zariadenie sa v Home Assistante neobjavilo automaticky? Skontrolujte integráciu, sieť, IP adresu, discovery, logy a manuálne pridanie bez resetovania naslepo.

## H1

Home Assistant zariadenie neobjavil automaticky: čo skontrolovať skôr než začnete resetovať

## Úvod

Pripojíte smart zariadenie do Wi-Fi, otvoríte **Settings → Devices & services** a očakávate, že sa objaví v časti Discovered. Niekedy sa to stane okamžite. Niekedy nie.

To ešte neznamená, že zariadenie nie je kompatibilné alebo je pokazené.

Automatické objavenie závisí od konkrétnej integrácie, spôsobu komunikácie, siete a toho, či Home Assistant vôbec dokáže zariadenie v danej topológii nájsť.

Najhorší prvý krok je resetovať všetko naraz. Lepší je krátky diagnostický postup, ktorý oddelí problém zariadenia, siete a integrácie.

## Rýchla odpoveď

Ak zariadenie nie je v Discovered:

1. overte, že preň existuje správna Home Assistant integrácia,
2. skontrolujte, či je zariadenie online v rovnakej sieti alebo v sieti, ktorú integrácia dokáže dosiahnuť,
3. zistite jeho aktuálnu IP/hostname,
4. skúste integráciu pridať manuálne cez **Add integration**,
5. pozrite logy a Repairs,
6. až potom riešte reset zariadenia.

Nie každá integrácia podporuje automatické discovery a nie každá discovery technika funguje cez oddelené VLAN/subnety.

## Krok 1: overte presnú integráciu

Najprv nehľadajte podľa marketingového názvu aplikácie, ale podľa výrobcu, protokolu alebo oficiálnej integrácie.

V Home Assistante choďte na:

**Settings → Devices & services → Add integration**

Oficiálna dokumentácia uvádza, že veľká časť integrácií sa pridáva priamo cez používateľské rozhranie. Ak sa zariadenie neobjavilo automaticky, často ho stále možno pridať manuálne.

Pred ďalším krokom si v dokumentácii integrácie overte:

- podporované modely,
- minimálnu verziu firmvéru,
- či potrebuje IP/hostname,
- či potrebuje účet výrobcu,
- či je integrácia lokálna alebo cloudová,
- známe obmedzenia discovery.

## Krok 2: overte, že zariadenie je reálne online

„Je pripojené do Wi-Fi“ nie je dostatočný dôkaz.

Skontrolujte v routeri alebo DHCP serveri:

- či zariadenie dostalo IP adresu,
- či je stále pripojené,
- či IP nezískalo iné zariadenie,
- či sa zariadenie nepresunulo na inú sieť alebo guest Wi-Fi.

Ak výrobok ponúka vlastné lokálne webové rozhranie, skúste ho otvoriť z rovnakej LAN.

Pri zariadení, ktoré nie je dostupné ani z lokálnej siete, nemá zmysel riešiť najprv Home Assistant.

## Krok 3: skontrolujte sieťovú topológiu

Discovery často používa lokálne broadcast, multicast, mDNS alebo DHCP informácie. Presný mechanizmus závisí od integrácie.

Problém môže vzniknúť, ak:

- Home Assistant je v inej VLAN,
- IoT zariadenia sú oddelené firewallom,
- guest Wi-Fi blokuje komunikáciu klient medzi klientmi,
- multicast/mDNS sa medzi sieťami nepreposiela,
- zariadenie je na inom subnete a integrácia očakáva lokálne discovery.

Neotvárajte firewall naslepo. Najprv zistite, **aký protokol integrácia používa** a ktoré spojenia reálne potrebuje.

## Krok 4: skúste manuálne pridanie

Mnohé integrácie majú fallback:

**Add integration → vybrať integráciu → zadať hostname alebo IP**

To je užitočné najmä vtedy, keď automatické discovery neprešlo, ale Home Assistant zariadenie sieťovo dosiahne.

Príkladom je WLED, kde oficiálna integrácia podporuje automatické objavenie aj manuálne zadanie hosta.

Ak manuálne pridanie funguje, problém bol pravdepodobne v discovery vrstve, nie v samotnej kompatibilite zariadenia.

## Krok 5: stabilizujte adresu, ak integrácia používa host/IP

Ak integrácia komunikuje s konkrétnou IP a tá sa mení, zariadenie môže po čase vypadnúť.

Home Assistant dokumentácia pri viacerých lokálnych integráciách odporúča stabilnú adresu cez:

- DHCP reservation,
- alebo vhodne nastavenú statickú IP.

Súvisiaci staging článok:

- Draft 023 — DHCP rezervácia vs. statická IP

Do tohto článku nevkladáme konkrétne cudzie IP adresy ani univerzálny sieťový rozsah.

## Krok 6: pozrite Logs a Repairs

Ak integrácia zlyhá pri načítaní alebo konfigurácii, Home Assistant môže zapísať detailnejšiu chybu do logu.

Pri diagnostike kontrolujte:

- **Settings → System → Logs**,
- **Settings → System → Repairs**,
- detail konkrétnej integrácie v **Devices & services**.

Log často prezradí viac než opakované odoberanie a pridávanie zariadenia.

Hľadajte napríklad:

- timeout,
- authentication error,
- host unreachable,
- unsupported firmware,
- MAC/address mismatch,
- chybu konfigurácie.

## Krok 7: cloudové zariadenie diagnostikujte inak než lokálne

Pri cloudovej integrácii nemusí byť lokálna IP vôbec rozhodujúca.

Skontrolujte skôr:

- dostupnosť internetu,
- prihlásenie do účtu výrobcu,
- stav autorizácie,
- API alebo cloudovú službu,
- prípadné opätovné prihlásenie integrácie.

Preto je dôležité vedieť, či integrácia používa Local Push/Polling alebo Cloud Push/Polling.

Súvisiaci článok:

- Draft 022 — Lokálna vs. cloudová smart domácnosť

## Krok 8: až teraz riešte reset zariadenia

Factory reset môže byť správny krok, ale často vymaže:

- Wi-Fi nastavenie,
- párovanie,
- lokálnu konfiguráciu,
- názvy alebo scény,
- väzby na pôvodnú aplikáciu.

Ak neviete, čo reset odstráni, najprv si prečítajte dokumentáciu výrobcu.

Reset nie je diagnostika. Je to zásah do konfigurácie.

## Praktický decision tree

### Zariadenie nie je ani v routeri

Riešte napájanie, Wi-Fi onboarding alebo zariadenie samotné.

### Zariadenie je v routeri, ale nie v Home Assistante

Overte integráciu, discovery a manuálne pridanie cez IP/hostname.

### Manuálne pridanie funguje

Stabilizujte adresu a preskúmajte, prečo discovery neprechádza.

### Manuálne pridanie nefunguje

Pozrite integráciu, model, firmware, logy a sieťovú dostupnosť.

### Fungovalo to predtým a teraz nie

Overte zmenu IP, firmware, Home Assistant update, credentials a Repairs.

## ESPHome špecificky

Pri ESPHome zariadení skontrolujte:

- či je node online v ESPHome Device Builderi,
- či dostal IP,
- či funguje hostname/mDNS,
- či Home Assistant dosiahne API zariadenia,
- či sa nezmenil encryption/API key alebo konfigurácia.

Ak je node nový, najprv overte samotnú dosku bez ďalších periférií podľa Draftu 003.

## BleBox ako lokálny príklad

Pri BleBox integrácii Home Assistant podporuje lokálnu komunikáciu. Ak auto-discovery nefunguje, oficiálna integrácia umožňuje manuálne zadanie IP adresy alebo hostname.

Súvisiaci produkčný článok:

https://komarena.sk/blebox-wlightbox-v3-home-assistant-lokalne-led/

Produktový CTA sa pred publikovaním znovu overí podľa živého WooCommerce permalinku a dostupnosti.

## Čo nerobiť

### Neotvárajte porty na routeri kvôli discovery

Lokálne discovery zariadenia nie je dôvod vystavovať službu internetu.

### Nerobte factory reset ako prvý krok

Môžete si zmazať jedinú fungujúcu časť konfigurácie.

### Nemeňte naraz VLAN, Wi-Fi, firmware aj integráciu

Potom neviete, ktorá zmena problém vyriešila alebo vytvorila.

### Nezamieňajte kompatibilitu s discovery

Zariadenie môže byť podporované, aj keď sa samo v Discovered neukázalo.

## KomArena prepojenie

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 022 — Lokálna vs. cloudová smart domácnosť
- Draft 023 — DHCP rezervácia vs. statická IP
- Draft 003 — Prvý ESPHome projekt s ESP32
- ReSmart: https://komarena.sk/resmart/

ReSmart CTA má zmysel až na konci diagnostiky: ak používateľ nevie identifikovať sieťový alebo integračný problém, môže požiadať o diagnostiku. Článok nesmie vytvárať umelý servisný problém tam, kde stačí manuálne pridanie integrácie.

## Záver

Keď sa zariadenie neobjaví automaticky, nerozbíjajte fungujúce časti systému.

Postupujte v poradí:

**integrácia → zariadenie online → sieť → IP/hostname → manuálne pridanie → logy/Repairs → reset až nakoniec.**

Takto rýchlo rozlíšite problém discovery od skutočnej nekompatibility alebo poruchy zariadenia.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Adding integrations: https://www.home-assistant.io/getting-started/integration/
- Home Assistant — Configuration troubleshooting: https://www.home-assistant.io/docs/configuration/troubleshooting/
- Home Assistant — WLED: https://www.home-assistant.io/integrations/wled/
- Home Assistant — BleBox: https://www.home-assistant.io/integrations/blebox/
- Home Assistant — Ping: https://www.home-assistant.io/integrations/ping/

## Open points

- Otvorený bod: pripraviť jednoduchý decision-tree obrázok 1600 × 900 bez reálnych interných IP/MAC údajov.
- Otvorený bod: ReSmart CTA zapojiť až po finálnom schválení servisnej funnel logiky.
- Otvorený bod: pri WordPress preview overiť, či dlhší troubleshooting checklist ostáva dobre čitateľný na mobile.

## Facebook post

Zariadenie sa v Home Assistante neobjavilo automaticky? Factory reset ešte nerobte.

Najprv overte, či je zariadenie online, akú integráciu používa, či sa dá pridať manuálne cez IP/hostname a čo hovoria Logs a Repairs.

Pripravili sme diagnostický postup, ktorý oddeľuje problém discovery od skutočnej nekompatibility.

Celý návod: [URL po publikovaní]

## Instagram caption

Home Assistant nič neobjavil? Integrácia → sieť → IP → manuálne pridanie → logy. Reset až nakoniec.

#komarena #homeassistant #smarthome #troubleshooting #esphome #resmart

## Reels / Shorts idea

**Hook:** „Home Assistant nenašiel zariadenie? Nerobte reset ako prvú vec.“

Ukázať:

1. prázdne Discovered,
2. router client list,
3. Add integration,
4. IP/hostname,
5. Logs/Repairs,
6. úspešne pridané zariadenie.

## Newsletter snippet

**Predmet:** Home Assistant zariadenie neobjavil? Reset až ako posledný krok

Nový troubleshooting návod ukazuje, ako overiť integráciu, sieť, IP adresu, manuálne pridanie a logy skôr, než zmažete konfiguráciu zariadenia.