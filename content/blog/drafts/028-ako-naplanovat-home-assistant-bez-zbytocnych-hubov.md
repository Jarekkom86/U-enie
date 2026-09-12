<!-- markdownlint-disable MD013 -->

# Draft 028 — Ako naplánovať Home Assistant domácnosť bez zbytočných hubov

- **Status:** draft
- **Typ:** architektonický poradca / nákupný rámec
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ, ktorý začína alebo prerába smart domácnosť a chce minimalizovať duplicitu hubov, cloudov a rádií
- **Search intent:** informačný / komerčný
- **Focus keyword:** Home Assistant bez zbytočných hubov

## SEO title

Home Assistant bez zbytočných hubov: ako naplánovať smart domácnosť

## Meta description

Ako plánovať Home Assistant smart domácnosť bez zbierky vendor hubov. Rozdeľte funkcie, rádiá, cloudy a controllery skôr, než začnete nakupovať.

## H1

Ako naplánovať Home Assistant domácnosť bez zbytočných hubov

## Úvod

Najdrahšia chyba smart domácnosti často nie je nesprávny senzor. Je to architektúra, v ktorej každý nový produkt prinesie vlastný hub, vlastnú aplikáciu, vlastný cloud a ďalší zdroj problémov.

Home Assistant vie veľa týchto svetov spojiť, ale nie je rozumné automaticky odstraňovať každý bridge alebo hub. Niektoré majú technický zmysel, iné sú potrebné pre konkrétnu funkciu a ďalšie sú naozaj iba duplicita.

Cieľom preto nie je „mať nula hubov“. Cieľom je **mať iba tie vrstvy, ktoré majú jasnú úlohu**.

## Začnite funkciou, nie značkou

Pred prvým nákupom si rozdeľte domácnosť na funkcie:

- svetlá,
- pohyb a prítomnosť,
- teplota a vlhkosť,
- zásuvky a meranie energie,
- kúrenie,
- vstupy a zámky,
- kamery a zvonček,
- žalúzie a rolety,
- zavlažovanie,
- vlastné ESPHome projekty.

Až potom vyberajte technológiu.

Ak začnete opačne — najprv značkou a až potom hľadáte použitie — veľmi rýchlo vznikne zbierka izolovaných ekosystémov.

## Druhý krok: spíšte siete, ktoré už doma máte

Typická domácnosť môže mať:

- Ethernet LAN,
- Wi-Fi,
- Bluetooth,
- Zigbee,
- Thread,
- prípadne ďalšie rádiové protokoly podľa zariadení.

Home Assistant nepotrebuje vlastniť každé rádio fyzicky. Niekedy môže využiť existujúci bridge alebo border router, inokedy je priame rádio výhodnejšie.

## Tretí krok: oddeľte hub, rádio a controller

Tieto slová sa často zamieňajú.

### Rádio / adaptér

Fyzický hardvér, ktorý poskytuje napríklad Zigbee alebo Thread rádiové rozhranie.

### Coordinator

Pri Zigbee je to zariadenie, ktoré vytvára a riadi jednu Zigbee sieť.

### Thread border router

Prepája Thread mesh s bežnou IP sieťou.

### Controller

Softvérová alebo hardvérová vrstva, ktorá ovláda zariadenia podľa konkrétneho protokolu. Home Assistant napríklad pri Matter používa vlastný Matter controller cez Matter Server.

### Vendor hub

Môže v jednom zariadení kombinovať rádio, controller, cloud bridge, lokálne API a ďalšie funkcie.

Preto sa pri rozhodovaní nedá pozerať iba na krabičku. Treba vedieť, ktorú z týchto úloh reálne plní.

## Kedy má zmysel vendor hub ponechať

Nie každý bridge je nepriateľ.

Ponechanie môže dávať zmysel, ak:

- poskytuje funkciu, ktorú priame napojenie do Home Assistanta nemá,
- rieši OTA aktualizácie zariadení spoľahlivejšie,
- poskytuje certifikovanú bezpečnostnú alebo alarmovú funkciu,
- zariadenia sú na ňom stabilnejšie než cez alternatívnu integráciu,
- Home Assistant má pre bridge kvalitnú lokálnu integráciu,
- nechcete prepisovať fungujúcu časť domácnosti iba preto, že existuje „čistejšia“ architektúra.

Architektúra má znižovať riziko, nie vytvárať migráciu pre migráciu.

## Kedy je hub pravdepodobne zbytočný

Zbytočnosť je pravdepodobná, ak:

- jedinou úlohou hubu je preposielať štandardný protokol, ktorý už doma bezpečne pokrývate,
- máte tri rôzne Zigbee brány pre tri značky a zariadenia sa dajú spoľahlivo presunúť do jednej overenej siete,
- cloud bridge nepridáva funkciu, ktorú potrebujete,
- ďalší hub vzniká iba preto, že ste pred nákupom neoverili kompatibilitu zariadenia.

Aj tu však treba migráciu overiť pre konkrétny produkt. Nie každý Zigbee produkt sa správa identicky mimo originálneho bridge.

## Jedna Zigbee sieť je často lepší cieľ než viac náhodných sietí

ZHA vytvára jednu Zigbee sieť s jedným koordinátorom.

Dobre vybudovaná Zigbee sieť môže mať viac router zariadení a veľa end devices. Pri návrhu je preto často rozumnejšie najprv posilniť jednu mesh sieť než automaticky pridávať nový koordinátor pre každú značku.

To neznamená, že viac Zigbee sietí je vždy zlé. Môže existovať technický dôvod na oddelenie, ale nemalo by vzniknúť náhodou.

## Thread: skontrolujte, čo už doma máte

Pri Matter-over-Thread potrebujete Thread border router.

Pred nákupom ďalšieho rádia skontrolujte existujúce zariadenia. Home Assistant dokumentácia uvádza podporované border routery v zariadeniach Apple, Google a ďalších ekosystémov.

Dôležité je, že border router a Matter controller nie sú to isté.

Home Assistant môže byť Matter controller a využívať Thread sieť poskytovanú podporovaným border routerom.

## ZBT-2: nepokúšajte sa z jedného kusu spraviť všetko

Home Assistant Connect ZBT-2 vie Zigbee aj Thread, ale aktuálne odporúčanie je venovať jeden kus jednému protokolu.

Ak už ZBT-2 používate ako Zigbee koordinátor, plánovať ten istý kus zároveň ako Thread rádio nie je správny smer.

Ak potrebujete oba protokoly:

- nechajte existujúci ZBT-2 na Zigbee,
- pre Thread použite existujúci kompatibilný border router alebo samostatné Thread rádio,
- nevytvárajte multiprotocol architektúru, ktorú Home Assistant sám neodporúča.

## Wi-Fi zariadenia: obmedzte chaos v LAN

Wi-Fi zariadenie nepotrebuje Zigbee hub, ale stále potrebuje dobrú sieťovú architektúru.

Pred nákupom overte:

- či funguje lokálne alebo iba cez cloud,
- či potrebuje 2,4 GHz Wi-Fi,
- ako ho Home Assistant integruje,
- či je možné stabilizovať jeho IP cez DHCP rezerváciu,
- či výrobca nevyžaduje trvalý cloud pre základné funkcie.

Veľa problémov označených ako „Home Assistant problém“ je v skutočnosti problém Wi-Fi, DNS, multicastu alebo izolácie VLAN.

## Matter neznamená automaticky menej infraštruktúry

Matter zlepšuje interoperabilitu, ale fyzická sieť stále existuje.

Matter-over-Wi-Fi potrebuje funkčnú IP/Wi-Fi sieť.

Matter-over-Thread potrebuje Thread sieť a border router.

Home Assistant potrebuje Matter controller/Matter Server.

Preto „kúpim Matter a nepotrebujem nič ďalšie“ nie je univerzálne pravidlo.

## Navrhnite si minimálnu architektúru

Pre menšiu domácnosť môže vyzerať napríklad takto:

- **Home Assistant** ako centrálna automatizačná vrstva,
- **Ethernet/Wi-Fi** ako hlavná IP sieť,
- **jeden Zigbee koordinátor**, ak používate Zigbee,
- **jeden alebo viac Thread border routerov** iba ak máte Thread zariadenia,
- **ESPHome cez Wi-Fi/Ethernet** pre vlastné moduly,
- vendor hub iba tam, kde má jasnú technickú hodnotu.

To nie je univerzálny recept. Je to základ na rozmýšľanie.

## Príklad 1: nový byt od nuly

Používateľ chce:

- pohybové senzory,
- dverové kontakty,
- smart zásuvky,
- niekoľko svetiel,
- ESPHome senzory.

Praktický smer môže byť:

- Home Assistant,
- kvalitná Wi-Fi/LAN,
- jedna Zigbee sieť pre väčšinu batériových senzorov a niektoré zásuvky,
- ESPHome cez IP,
- Thread až vtedy, keď pribudne konkrétne Matter-over-Thread zariadenie.

Nie je dôvod kupovať Thread rádio iba preto, že Thread existuje.

## Príklad 2: domácnosť už má Apple/Google border router

Ak existujúce zariadenie vytvára podporovanú Thread sieť, najprv preskúmajte, či ju Home Assistant vie použiť pre vaše Matter-over-Thread zariadenia.

Možno nepotrebujete ďalší Thread adapter.

## Príklad 3: tri vendor Zigbee huby

Najprv inventarizujte zariadenia:

- ktoré sa dajú priamo presunúť do ZHA alebo Zigbee2MQTT,
- ktoré stratia funkciu,
- ktoré potrebujú originálny bridge pre firmware alebo špecifické funkcie.

Až potom migrujte.

„Zrušiť všetky huby cez víkend“ je zlý migračný plán.

## Nákupný checklist pred každým smart zariadením

Pred objednaním si odpovedzte:

1. Aký protokol/sieť používa?
2. Potrebujem nový hub, coordinator alebo border router?
3. Mám už túto funkciu doma?
4. Je Home Assistant integrácia lokálna alebo cloudová?
5. Ak internet vypadne, čo prestane fungovať?
6. Dostanem všetky funkcie aj bez originálneho hubu?
7. Ako sa riešia firmware aktualizácie?
8. Je zariadenie kompatibilné s mojím existujúcim Zigbee/Thread/Matter riešením?
9. Pridáva nový produkt reálnu hodnotu alebo iba ďalšiu aplikáciu?

## Migračný plán bez chaosu

Ak chcete znižovať počet hubov:

1. spíšte existujúce zariadenia a siete,
2. označte vendor cloudy,
3. označte lokálne integrácie,
4. identifikujte duplicitné rádiá,
5. vyberte jednu malú skupinu na pilotnú migráciu,
6. otestujte stabilitu a všetky funkcie,
7. až potom migrujte ďalšie zariadenia.

## FAIL CLOSED pri KomArena odporúčaniach

KomArena článok nesmie odporučiť Zigbee alebo Thread radio iba preto, aby mal produktový CTA.

Konkrétny koordinátor alebo border router sa má odporúčať až keď:

- je zalistovaný,
- je aktuálne kompatibilný,
- vieme, či je určený pre Zigbee alebo Thread,
- prešiel skladovým a obchodným gate,
- vieme popísať správnu topológiu bez multiprotocol skratiek.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 022 — Lokálna vs cloudová smart domácnosť
- Draft 023 — DHCP rezervácia vs statická IP
- Draft 027 — Wi-Fi vs Zigbee vs Thread vs Matter
- Draft 006 — Prvá Zigbee sieť
- Draft 009 — ZHA vs Zigbee2MQTT

## CTA

Najprv si nakreslite architektúru a až potom nakupujte. Každý nový hub, rádio alebo cloud musí mať konkrétnu úlohu. Ak ju neviete pomenovať, pravdepodobne ho ešte nepotrebujete.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — ZHA: https://www.home-assistant.io/integrations/zha/
- Home Assistant — Thread: https://www.home-assistant.io/integrations/thread/
- Home Assistant — Matter: https://www.home-assistant.io/integrations/matter/
- Home Assistant — Connect ZBT-2: https://www.home-assistant.io/connect/zbt-2/
- Home Assistant — Green: https://www.home-assistant.io/green/

## Open points

- Otvorený bod: doplniť vizuálnu schému minimálnej architektúry Home Assistant + LAN/Wi-Fi + Zigbee + voliteľný Thread.
- Otvorený bod: po zalistovaní konkrétneho Zigbee/Thread hardvéru doplniť kompatibilitnú tabuľku, nie univerzálny nákupný CTA.
- Otvorený bod: pripraviť nadväzujúci článok o zálohe a migračnom pláne pred výmenou coordinatora/hubu.

## Facebook post

Smart domácnosť nemusí znamenať poličku plnú hubov.

Ale ani opačný extrém — vyhadzovať fungujúce bridge iba preto, že Home Assistant vie veľa vecí priamo — nie je dobrý plán.

Pripravili sme rámec, ako oddeliť rádio, coordinator, border router, controller a vendor hub a nakupovať iba to, čo má jasnú úlohu.

Celý článok: [URL po publikovaní]

## Instagram caption

Cieľ nie je „nula hubov“. Cieľ je žiadny zbytočný hub. Najprv architektúra, potom nákup.

#komarena #homeassistant #smarthome #zigbee #thread #matter

## Reels / Shorts idea

**Hook:** „Máte doma 4 smart huby? Najprv zistite, čo každý z nich vlastne robí.“

Ukázať vrstvy:

1. Home Assistant,
2. Wi-Fi/LAN,
3. Zigbee coordinator,
4. Thread border router,
5. vendor hub — ponechať iba ak pridáva funkciu.

## Newsletter snippet

**Predmet:** Ako nemať doma zbytočnú zbierku smart hubov

Nový návod ukazuje, ako rozlíšiť rádio, coordinator, Thread border router, Matter controller a vendor bridge — a ako z toho poskladať jednoduchšiu Home Assistant architektúru.