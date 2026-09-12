<!-- markdownlint-disable MD013 -->

# Draft 033 — Smart zariadenie je offline: bezpečná diagnostika bez resetovania

- **Status:** draft
- **Typ:** troubleshooting / ReSmart poradca
- **Primárna kategória:** ReSmart servis
- **Sekundárne kategórie:** Home Assistant & ESPHome; Návody a projekty
- **Cieľová skupina:** používateľ, ktorému zariadenie v Home Assistante zrazu ukazuje unavailable/offline
- **Search intent:** troubleshooting
- **Focus keyword:** Home Assistant zariadenie offline

## SEO title

Zariadenie je offline v Home Assistante? 7 kontrol pred resetom

## Meta description

Smart zariadenie je v Home Assistante unavailable? Skontrolujte napájanie, LAN/Wi-Fi, IP, cloud, integráciu, logy a až potom riešte reset.

## H1

Smart zariadenie je offline: 7 bezpečných kontrol skôr, než ho resetujete

## Úvod

Keď Home Assistant ukáže zariadenie ako `unavailable`, najhorší prvý krok je často factory reset.

Reset môže zmazať funkčnú konfiguráciu a pridať nový problém k pôvodnému problému so sieťou, napájaním alebo službou.

Lepší postup je ísť od najnižšej vrstvy nahor:

**napájanie → sieť → adresa → zariadenie/služba → integrácia → logy/Repairs → reset až ako posledná možnosť**

## 1. Je zariadenie fyzicky zapnuté?

Začnite tým najjednoduchším.

Skontrolujte:

- napájací zdroj,
- USB/DC kábel,
- zásuvku,
- LED/stavový indikátor,
- či zariadenie nereštartuje do slučky,
- či nevypadlo po manipulácii alebo výpadku elektriny.

Pri ESP32/ESPHome zariadení môže nestabilné napájanie vyzerať ako Wi-Fi problém. Ak sa zariadenie opakovane bootuje, pokračujte diagnostikou napájania, nie factory resetom.

## 2. Je zariadenie dosiahnuteľné v sieti?

Home Assistant FAQ pri connection erroroch odporúča najprv overiť, či je zariadenie alebo služba zapnutá a sieťovo dostupná.

Skontrolujte napríklad:

- či zariadenie vidí router/DHCP server,
- či dostalo IP adresu,
- či je pripojené do správnej Wi-Fi siete,
- či Home Assistant a zariadenie nie sú oddelené firewallom/VLAN pravidlom,
- či nie je problém s DNS, DHCP alebo routerom.

Ak vypadlo naraz viac lokálnych zariadení, je menej pravdepodobné, že sa pokazili všetky súčasne. Hľadajte spoločnú sieťovú príčinu.

## 3. Nezmenila sa IP adresa?

Niektoré lokálne integrácie si zariadenie nájdu cez discovery/hostname. Iné môžu byť citlivejšie na adresu alebo sieťové zmeny.

Ak zariadenie po reštarte routera dostalo inú IP:

- overte aktuálnu DHCP lease,
- skontrolujte konfiguráciu integrácie,
- pri stabilných lokálnych zariadeniach zvážte DHCP rezerváciu.

Nemeňte zároveň hostname, IP, VLAN aj integráciu. Zmeny robte po jednej.

## 4. Funguje zariadenie mimo Home Assistanta?

Táto kontrola pomáha oddeliť problém zariadenia od problému integrácie.

Podľa typu produktu skúste:

- lokálne webové rozhranie,
- výrobcom podporovanú aplikáciu,
- ping/hostname iba ak ho zariadenie podporuje,
- sériový/ESPHome log pri vlastnom zariadení.

Ak zariadenie nefunguje ani mimo Home Assistanta, problém pravdepodobne nie je iba v HA integrácii.

Ak zariadenie funguje lokálne, ale v HA je unavailable, zamerajte sa na integráciu a sieťovú cestu medzi nimi.

## 5. Je integrácia lokálna alebo cloudová?

Pri cloudovej integrácii môže byť zariadenie fyzicky doma úplne v poriadku, ale Home Assistant čaká na službu výrobcu.

Pri cloudovej chybe skontrolujte:

- internetové pripojenie,
- status page výrobcu, ak ju má,
- expirované prihlásenie/token,
- či integrácia nehlási reauth.

Pri lokálnej integrácii sa sústreďte na LAN, IP a lokálne API.

To je ďalší dôvod, prečo je užitočné vedieť, či konkrétne zariadenie v HA funguje cez Local Push, Local Polling alebo Cloud.

## 6. Pozrite Logs a Repairs

Home Assistant ukladá problémy integrácií do logov a Repairs systém upozorňuje na známe problémy, ktoré vyžadujú zásah.

Skontrolujte:

**Settings → System → Repairs**

A podľa situácie aj systémové/integration logy.

Hľadajte konkrétnu stopu:

- connection refused,
- timeout,
- authentication/reauth,
- invalid config,
- unavailable host,
- deprecated alebo odstránenú konfiguráciu.

Neriešte päť nesúvisiacich warningov. Začnite tým, ktorý časovo a názvom zodpovedá offline zariadeniu.

## 7. Až teraz riešte reload, reconfigure alebo reset

Ak je:

- napájanie stabilné,
- sieť zdravá,
- IP/hostname správne,
- zariadenie dostupné,
- problém jasne lokalizovaný na integráciu,

potom má zmysel použiť podporovaný postup konkrétnej integrácie — napríklad reconfigure, reauth, reload alebo opätovné pridanie.

Factory reset nechajte ako posledný krok, keď dokumentácia konkrétneho zariadenia alebo integrácie hovorí, že je potrebný.

## Prečo reset naslepo škodí diagnostike

Reset môže zmeniť:

- IP/hostname,
- pairing credentials,
- Zigbee/Thread sieťové členstvo,
- entity/device identity,
- lokálne API nastavenia,
- cloud association.

Pôvodný jednoduchý sieťový problém sa tak môže zmeniť na kompletné znovupárovanie.

## Keď je offline ESPHome zariadenie

Pri ESPHome postupujte zvlášť po vrstvách:

1. je doska napájaná a stabilná,
2. je vo Wi-Fi/LAN,
3. má IP/hostname,
4. odpovedá ESPHome native API,
5. Home Assistant integrácia sa vie reconnectnúť,
6. log neukazuje brownout alebo boot loop.

Ak je problém po pridaní nového senzora, vráťte hardware na posledný funkčný stav.

## Keď je offline Zigbee zariadenie

Pri Zigbee nepredpokladajte automaticky problém Home Assistanta.

Skontrolujte:

- batériu/napájanie,
- stav koordinátora,
- či nevypadlo viac zariadení naraz,
- mesh/router zariadenia,
- či sa nemenil Zigbee coordinator alebo sieť.

Batériové end devices sa môžu správať inak než trvalo napájané router zariadenia.

Neodstraňujte zariadenie zo Zigbee siete ako prvý krok, ak ešte neviete príčinu.

## Keď je offline cloudové zariadenie

Ak naraz vypadnú všetky zariadenia jednej cloudovej značky, overte:

- internet,
- status služby,
- účet/reauth,
- zmenu API na strane výrobcu.

Resetovať fyzické zariadenia v celej domácnosti by v takom prípade nevyriešilo výpadok cloudu.

## Rýchly rozhodovací strom

**Jedno zariadenie offline:**

napájanie → IP/sieť → zariadenie → integrácia/log.

**Viac zariadení jednej značky offline:**

spoločná integrácia/cloud/bridge → až potom jednotlivé kusy.

**Viac rôznych LAN zariadení offline:**

router/DHCP/DNS/VLAN/Wi-Fi → až potom integrácie.

**ESPHome sa reštartuje:**

napájanie/log/brownout → až potom Wi-Fi/YAML.

## Čo pripraviť pre ReSmart diagnostiku

Ak problém nevyriešite bezpečným základným postupom, pripravte:

- typ a model zariadenia,
- odkedy je offline,
- čo sa zmenilo tesne pred problémom,
- screenshot chyby bez tokenov/hesiel,
- relevantný výrez logu,
- informáciu, či zariadenie funguje vo vendor app/lokálne,
- či problém postihuje jedno alebo viac zariadení.

Tým sa výrazne skráti diagnostika.

## Interné odkazy — návrh

- ReSmart: https://komarena.sk/resmart/
- Home Assistant: https://komarena.sk/home-assistant/
- Draft 005 — Stabilné napájanie ESP32
- Draft 023 — DHCP rezervácia vs statická IP
- Draft 025 — Zariadenie sa neobjavilo automaticky
- Draft 030 — Zálohy a obnova
- Draft 034 — Bezpečný update a troubleshooting po aktualizácii
- Draft 035 — Maintenance dashboard

## CTA

Keď je zariadenie offline, nezačínajte resetom. Najprv dokážte, na ktorej vrstve problém vznikol. Až potom robte zmenu, ktorú viete vrátiť alebo vysvetliť.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Connection error FAQ: https://www.home-assistant.io/faq/connection-error/
- Home Assistant — Troubleshooting configuration: https://www.home-assistant.io/docs/configuration/troubleshooting/
- Home Assistant — Repairs: https://www.home-assistant.io/integrations/repairs/
- Home Assistant — ESPHome: https://www.home-assistant.io/integrations/esphome/

## Open points

- Otvorený bod: pred publikovaním doplniť screenshot Repairs/Logs bez identifikujúcich údajov.
- Otvorený bod: ReSmart CTA aktivovať iba podľa reálne definovanej služby a objednávkového procesu.
- Otvorený bod: pripraviť samostatný checklist pre Zigbee mesh diagnostiku bez unáhleného re-pairingu.

## Facebook post

Zariadenie v Home Assistante ukazuje unavailable? Factory reset nie je dobrý prvý diagnostický nástroj.

Pripravili sme sedem kontrol od napájania cez DHCP a cloud až po Logs/Repairs, ktoré pomôžu zistiť príčinu bez zbytočného zmazania funkčnej konfigurácie.

Celý článok: [URL po publikovaní]

## Instagram caption

Offline zariadenie? Najprv napájanie, sieť a log. Reset až vtedy, keď viete prečo.

#komarena #homeassistant #resmart #smarthome #troubleshooting

## Reels / Shorts idea

**Hook:** „Zariadenie offline? Toto nerobte ako prvé.“

Ukázať:

1. unavailable entity,
2. napájanie,
3. DHCP lease,
4. vendor/local kontrolu,
5. Repairs/log,
6. reset ako posledný krok.

## Newsletter snippet

**Predmet:** Smart zariadenie offline? 7 kontrol pred resetom

Nový diagnostický postup pomáha oddeliť napájanie, sieť, cloud a integráciu skôr, než factory reset vytvorí ďalší problém.