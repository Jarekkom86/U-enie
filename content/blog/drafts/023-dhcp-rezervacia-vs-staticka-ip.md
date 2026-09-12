<!-- markdownlint-disable MD013 -->

# Draft 023 — DHCP rezervácia vs. statická IP v smart domácnosti

- **Status:** draft
- **Typ:** sieťový praktický návod
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ Home Assistanta, ktorému lokálne zariadenia menia IP adresu alebo vypadávajú z integrácie
- **Search intent:** informačný / troubleshooting
- **Focus keyword:** DHCP rezervácia Home Assistant

## SEO title

DHCP rezervácia vs statická IP: čo je lepšie pre Home Assistant

## Meta description

DHCP rezervácia alebo statická IP? Praktické vysvetlenie pre Home Assistant, ESPHome a lokálne smart zariadenia, vrátane chýb pri zmene adresy.

## H1

DHCP rezervácia vs. statická IP: ako udržať smart zariadenia na stabilnej adrese

## Úvod

Lokálne zariadenie môže fungovať celé týždne a potom zrazu prestať reagovať. Niekedy nie je problém v Home Assistante ani vo Wi-Fi signále — router jednoducho zariadeniu pridelil inú IP adresu.

Niektoré integrácie vedia novú adresu nájsť automaticky. Iné sú naviazané na hostname alebo konkrétnu IP a po zmene potrebujú reconfigure.

Pre smart domácnosť je preto dobré rozumieť rozdielu medzi:

- **bežným DHCP**,
- **DHCP rezerváciou v routeri**,
- **statickou IP nastavenou priamo v zariadení**.

## Rýchla odpoveď

Pre väčšinu domácich lokálnych smart zariadení je **DHCP rezervácia v routeri praktický prvý variant**, ak ju router podporuje.

Zariadenie ďalej používa DHCP, ale router mu podľa jeho sieťovej identity prideľuje stabilnú adresu. Správa adries zostáva na jednom mieste.

Statická IP priamo v zariadení je užitočná v špecifických prípadoch, ale musíte ručne správne nastaviť adresu, masku siete, gateway a DNS a zároveň zabrániť konfliktu s DHCP poolom.

## Čo robí DHCP

DHCP prideľuje zariadeniam sieťové nastavenia automaticky.

Typický domáci router zariadeniu pridelí:

- IP adresu,
- masku siete,
- predvolenú bránu,
- DNS servery,
- čas platnosti pridelenia.

IP adresa nemusí byť navždy rovnaká. Router sa môže po čase rozhodnúť prideliť inú voľnú adresu.

Pre telefón alebo notebook to zvyčajne nevadí. Pre integráciu, ktorá očakáva zariadenie na konkrétnej IP, to môže byť problém.

## Čo je DHCP rezervácia

DHCP rezervácia je pravidlo v routeri alebo DHCP serveri, ktoré hovorí:

**tomuto konkrétnemu zariadeniu prideľuj vždy túto adresu.**

Výhody:

- konfigurácia je centralizovaná v routeri,
- zariadenie môže zostať v režime DHCP,
- zmenu siete viete riešiť na jednom mieste,
- znižuje sa riziko, že rovnakú adresu omylom nastavíte dvom zariadeniam.

Home Assistant dokumentácia pri viacerých lokálnych integráciách priamo odporúča DHCP reservation alebo inú stabilnú adresu. Napríklad WLED troubleshooting upozorňuje, že opätovné použitie IP adresy pre iné zariadenie môže viesť k MAC mismatch. Ping integrácia odporúča pred pridaním hosta použiť stabilnú sieťovú adresu.

## Čo je statická IP priamo v zariadení

Pri statickej IP zariadenie nepýta adresu z DHCP, ale používa ručne nastavenú konfiguráciu.

Typicky musíte zadať:

- IP adresu,
- masku/prefix,
- gateway,
- DNS.

Pri Home Assistant OS je možné sieť hostiteľa nastaviť manuálne. Oficiálna vývojárska dokumentácia ukazuje aj postup cez NetworkManager/nmcli pre statické IPv4 nastavenie.

To však neznamená, že statická IP je automaticky lepšia pre každý ESP32 senzor alebo smart zariadenie.

## Kedy sa IP zmena prejaví ako chyba

### Integrácia používa IP ako host

Ak integrácia ukladá konkrétnu IP a nedokáže zariadenie znovu objaviť, po zmene adresy môže zariadenie zostať `unavailable`.

### IP dostane iné zariadenie

To je horší prípad. Home Assistant môže skúsiť komunikovať so starou adresou, ale na nej už je iný hardware.

WLED integrácia dnes takýto stav aktívne kontroluje cez MAC adresu a pri nesúlade setup zastaví namiesto ovládania nesprávneho zariadenia.

### Zariadenie je v inej VLAN alebo subnet-e

Niektoré discovery mechanizmy fungujú iba v rámci lokálnej broadcast/multicast domény. Ak zariadenie presuniete do inej siete, automatické objavenie nemusí fungovať rovnako.

Vtedy stabilná IP alebo DNS záznam často získava väčší význam.

## DHCP rezervácia: praktický workflow

Presné menu závisí od routera, ale princíp je rovnaký:

1. nájdite zariadenie v DHCP/client liste,
2. overte jeho MAC adresu alebo inú identitu, ktorú router používa,
3. vyberte voľnú adresu v správnej LAN,
4. vytvorte reservation/fixed lease,
5. nechajte zariadenie obnoviť DHCP lease alebo ho bezpečne reštartujte,
6. overte, že dostalo očakávanú adresu,
7. až potom prípadne reconfigure Home Assistant integráciu.

Názvy funkcie sa medzi výrobcami líšia: DHCP Reservation, Address Reservation, Static Lease, Fixed IP Assignment a podobne.

## Ako vybrať adresu

Najbezpečnejšie je používať systém, ktorému rozumiete aj po roku.

Príklad logiky:

- infraštruktúra: jedna časť rozsahu,
- smart home servery/bridge: druhá,
- bežní DHCP klienti: širší dynamický pool.

Konkrétne čísla závisia od vašej siete. Nekopírujte cudziu adresu `192.168.x.x` bez toho, aby ste vedeli, aký subnet používa váš router.

## Kedy môže byť statická IP vhodnejšia

Statická konfigurácia priamo v zariadení môže dávať zmysel, ak:

- zariadenie musí byť dostupné ešte pred DHCP serverom,
- ide o infraštruktúrny prvok,
- máte riadenú sieť a dokumentovaný adresný plán,
- konkrétny výrobca alebo deployment ju vyžaduje.

V bežnej domácej smart domácnosti je však dôležitejšia **stabilná adresa** než dogma, či vzniká rezerváciou alebo manuálnym nastavením.

## Hostname alebo IP?

Ak integrácia spoľahlivo podporuje hostname a lokálny DNS/mDNS funguje stabilne, hostname môže byť pohodlnejší.

Ale ani hostname nie je magická ochrana proti všetkým sieťovým problémom. Discovery cez mDNS alebo broadcast sa môže správať inak medzi VLAN-mi, subnetmi a firewallmi.

Pre kritickejšie lokálne zariadenia je preto dobré vedieť:

- akú IP momentálne majú,
- kto ju prideľuje,
- ako sa prekladajú hostname,
- či integrácia používa IP, hostname alebo discovery.

## ESPHome

ESPHome zariadenia môžu byť často pohodlne objavené cez lokálnu sieť a hostname. Ak však riešite zložitejšiu sieť, viac VLAN alebo problémy s mDNS, stabilná adresa vám diagnostiku výrazne zjednoduší.

Do evergreen článku nebudeme vkladať univerzálny YAML so statickou IP bez kontextu konkrétnej siete. Nesprávny gateway alebo DNS vie zariadenie úplne odrezať.

## Home Assistant hostiteľ

Samotný Home Assistant server je pre domácu sieť dôležitý infraštruktúrny bod.

Je rozumné, aby mal predvídateľnú adresu — či už cez DHCP rezerváciu, alebo správne nastavenú statickú konfiguráciu podľa použitého systému.

Oficiálna dokumentácia Home Assistanta umožňuje nastaviť Local Network URL a pri Home Assistant OS aj sieťové parametre. Konkrétny spôsob však závisí od typu inštalácie.

## Časté chyby

### Statická IP vo vnútri DHCP poolu bez rezervácie

Ak router nevie, že adresa je ručne obsadená, môže ju neskôr prideliť inému klientovi a vznikne konflikt.

### Zmena IP bez reconfigure integrácie

Nie každá integrácia novú adresu nájde automaticky.

### Fixovanie všetkého bez dokumentácie

Päťdesiat ručných statických adries bez zoznamu je horších než dobre spravovaný DHCP server.

### Zámena IP rezervácie a port forwardingu

DHCP reservation rieši **adresu zariadenia v LAN**. Port forwarding rieši dostupnosť služby z inej siete/internetu. Nie je to tá istá vec.

Kvôli stabilnej IP smart zariadenia **neotvárajte port na internet**.

## KomArena prepojenie

- Home Assistant: https://komarena.sk/home-assistant/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Draft 003 — Prvý ESPHome projekt s ESP32
- Draft 022 — Lokálna vs. cloudová smart domácnosť
- Draft 005 — Stabilné napájanie ESP32

Tento článok je primárne sieťový evergreen. Produktové CTA nie je potrebné.

## Záver

Cieľom nie je mať čo najviac statických IP. Cieľom je, aby zariadenia, na ktoré sa Home Assistant spolieha, mali **predvídateľnú a správne spravovanú adresu**.

Pre väčšinu domácností je DHCP rezervácia dobrý kompromis: zariadenia zostávajú jednoduché a adresný plán spravujete centrálne v routeri.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — WLED troubleshooting: https://www.home-assistant.io/integrations/wled/
- Home Assistant — Ping (ICMP): https://www.home-assistant.io/integrations/ping/
- Home Assistant — Lutron Caséta: https://www.home-assistant.io/integrations/lutron_caseta/
- Home Assistant — Remote access / network URLs: https://www.home-assistant.io/docs/configuration/remote/
- Home Assistant Developer Docs — Network configuration: https://developers.home-assistant.io/docs/operating-system/network/

## Open points

- Otvorený bod: pred publikovaním doplniť jednu generickú sieťovú schému router → DHCP → HA → zariadenia bez reálnych IP z domácej siete.
- Otvorený bod: pri screenshots použiť testovací router alebo anonymizované MAC/IP údaje.
- Otvorený bod: nevkladať konkrétny postup pre Ubiquiti/MikroTik/ISP router do evergreen článku; prípadne spraviť samostatné vendor návody.

## Facebook post

Smart zariadenie bolo včera online a dnes je `unavailable`? Niekedy sa nepokazilo nič — iba dostalo inú IP adresu.

Vysvetľujeme rozdiel medzi DHCP, DHCP rezerváciou a statickou IP a prečo stabilná adresa pomáha Home Assistant integráciám bez toho, aby ste museli ručne fixovať každé zariadenie.

Celý článok: [URL po publikovaní]

## Instagram caption

Stabilná smart domácnosť potrebuje stabilnú sieť. DHCP rezervácia často vyrieši viac než ručne nastavená statická IP na každom senzore.

#komarena #homeassistant #networking #smarthome #esphome #dhcp

## Reels / Shorts idea

**Hook:** „Zariadenie v Home Assistante zmizlo? Pozrite najprv IP adresu.“

Ukázať:

1. zariadenie unavailable,
2. router client list,
3. starú vs. novú IP,
4. DHCP reservation,
5. reconfigure integrácie,
6. zariadenie online.

## Newsletter snippet

**Predmet:** DHCP rezervácia vs statická IP v Home Assistante

Nový návod vysvetľuje, prečo sa lokálne zariadenia po zmene IP môžu stratiť z integrácie a ako udržať sieť predvídateľnú bez ručného chaosu.