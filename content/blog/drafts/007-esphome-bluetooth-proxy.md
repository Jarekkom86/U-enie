<!-- markdownlint-disable MD013 -->

# Draft 007 — ESPHome Bluetooth Proxy

- **Status:** draft
- **Typ:** návod / vysvetlenie použitia
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty, Smart domácnosť
- **Cieľová skupina:** používateľ Home Assistant s BLE senzormi alebo zariadeniami mimo dosahu centrálneho Bluetooth adaptéra
- **Search intent:** informačný
- **Focus keyword:** ESPHome Bluetooth Proxy

## SEO title

ESPHome Bluetooth Proxy: rozšírte BLE dosah Home Assistanta

## Meta description

Ako funguje ESPHome Bluetooth Proxy, kedy dáva zmysel, aký hardvér použiť, kam proxy umiestniť a prečo proxy sama o sebe nezaručí podporu každého BLE zariadenia.

## H1

ESPHome Bluetooth Proxy: ako dostať BLE zariadenia bližšie k Home Assistantu

## Úvod

Bluetooth zariadenie môže fungovať perfektne pri Home Assistante a o dve miestnosti ďalej vypadávať. Namiesto presúvania servera alebo ťahania USB adaptéra cez celý dom môžete použiť ESPHome Bluetooth Proxy.

Myšlienka je jednoduchá: kompatibilná doska s Bluetooth sa umiestni bližšie k BLE zariadeniam a cez sieť odovzdáva ich Bluetooth dáta Home Assistantu.

Proxy však nie je univerzálny „Bluetooth prekladač“. Rozširuje rádiový dosah pre podporované BLE zariadenia a integrácie. Ak Home Assistant konkrétny protokol alebo zariadenie nepodporuje, samotná proxy z neho podporované zariadenie neurobí.

## Čo je ESPHome Bluetooth Proxy

Oficiálna dokumentácia ESPHome uvádza, že Home Assistant môže rozšíriť svoj Bluetooth dosah cez komponent `bluetooth_proxy`.

Home Assistant následne agreguje údaje z dostupných Bluetooth zdrojov, medzi ktoré môžu patriť ESPHome proxy aj lokálne Bluetooth adaptéry.

Dôležité obmedzenie: Bluetooth Proxy v ESPHome je určená pre **BLE — Bluetooth Low Energy** zariadenia a ich Home Assistant integrácie.

## Kedy Bluetooth Proxy dáva zmysel

Typické scenáre:

- BLE teplomer je v suteréne a Home Assistant je na poschodí,
- Bluetooth senzor je za hrubou stenou,
- viac BLE zariadení je rozmiestnených po dome,
- Home Assistant server je v technickej miestnosti s nevhodným rádiovým umiestnením,
- chcete rozšíriť pokrytie bez presunu centrálneho systému.

Proxy môže byť zaujímavá aj tam, kde už máte viac ESPHome uzlov a vhodný hardvér možno využiť na ďalšiu funkciu.

## Čo budete potrebovať

- Home Assistant s funkčnou Bluetooth integráciou,
- ESPHome,
- podporovanú dosku s Bluetooth / BLE,
- stabilné Wi-Fi alebo inú podporovanú sieťovú cestu podľa dosky,
- napájanie pre proxy uzol,
- BLE zariadenie podporované príslušnou Home Assistant integráciou.

Pre klasický maker setup sa často používa ESP32. Nie každý mikrokontrolér označený ako „ESP“ má Bluetooth, preto treba vybrať konkrétnu podporovanú platformu.

## Základná konfigurácia

Minimálna logika ESPHome konfigurácie obsahuje Bluetooth scanner a proxy komponent. Presná konfigurácia závisí od platformy a aktuálnej verzie ESPHome.

Princíp:

```yaml
esp32_ble_tracker:

bluetooth_proxy:
```

Tento úryvok je iba modelový princíp. Pred publikovaním sa musí skontrolovať proti aktuálnej dokumentácii ESPHome a konkrétnej doske.

## Passive vs. active Bluetooth komunikácia

Niektoré BLE zariadenia iba vysielajú advertising dáta. Iné vyžadujú aktívne spojenie.

ESPHome Bluetooth Proxy podporuje aj aktívne spojenia na podporovaných platformách. Aktívne spojenia však používajú ďalšie systémové zdroje a ich dostupnosť sa líši podľa hardvéru a konfigurácie.

Preto je dobré najprv vedieť, čo konkrétna Home Assistant integrácia potrebuje:

- iba príjem advertising dát,
- alebo obojsmerné aktívne BLE spojenie.

## Krok 1: overte podporu BLE zariadenia

Pred stavbou proxy skontrolujte, či Home Assistant podporuje konkrétne zariadenie alebo jeho protokol.

Príklady BLE ekosystémov môžu používať:

- BTHome,
- výrobné Bluetooth integrácie,
- generické BLE senzory s podporovaným formátom dát.

Ak zariadenie nie je podporované, proxy iba zlepší cestu rádiového signálu — nevytvorí chýbajúcu integráciu.

## Krok 2: vyberte vhodnú dosku

Pri výbere myslite na:

- podporu Bluetooth na konkrétnom čipe,
- podporu v ESPHome,
- stabilné napájanie,
- spôsob pripojenia do siete,
- fyzické umiestnenie a kryt,
- prípadné ďalšie úlohy dosky.

Ak má proxy bežať 24/7, dôležitejšia než „najlacnejšia doska“ je stabilita celého uzla.

## Krok 3: umiestnite proxy podľa rádiovej reality

Bluetooth Proxy má zmysel tam, kde je dobrý kompromis medzi:

- dosahom k BLE zariadeniam,
- Wi-Fi / sieťovým pokrytím,
- dostupným napájaním,
- vhodným prostredím pre elektroniku.

Neschovávajte proxy automaticky do kovovej rozvodnice alebo za veľký kovový predmet. Rádiové umiestnenie je súčasť návrhu.

## Krok 4: najprv otestujte jednu proxy

Pred montážou viacerých uzlov:

1. nakonfigurujte jednu dosku,
2. overte, že sa v Home Assistante objaví ako Bluetooth proxy,
3. sledujte problémové BLE zariadenie,
4. presuňte proxy na plánované miesto,
5. overte stabilitu niekoľko hodín alebo dní.

Až potom pridávajte ďalšie uzly.

## Krok 5: sledujte sieť aj napájanie

Proxy závisí od dvoch rádiových vrstiev naraz:

- BLE medzi proxy a koncovým zariadením,
- sieťové spojenie medzi proxy a Home Assistantom.

Ak proxy vypadáva z Wi-Fi alebo sa reštartuje kvôli napájaniu, Bluetooth pokrytie bude nestabilné aj pri dobrom BLE signále.

Preto tento článok prirodzene nadväzuje na návod o stabilnom napájaní ESP32.

## Koľko proxy potrebujem?

Neexistuje univerzálne číslo.

Závisí od:

- veľkosti domu,
- materiálu stien,
- polohy Home Assistant servera,
- počtu a polohy BLE zariadení,
- výkonu a antény konkrétneho hardvéru,
- miestneho 2,4 GHz prostredia.

Lepšie je začať jedným uzlom na problémovom mieste a pokrytie rozširovať podľa reálnych výsledkov.

## Časté chyby

### Proxy je vedľa Home Assistanta

Ak problémové BLE zariadenie je na opačnej strane domu, ďalšia proxy vedľa servera pravdepodobne veľa nevyrieši.

### Očakávanie podpory každého Bluetooth zariadenia

Proxy rozširuje BLE komunikáciu, ale podporu zariadenia zabezpečuje konkrétna Home Assistant integrácia.

### Nestabilná ESP32

Slabé napájanie alebo Wi-Fi sa môže prejaviť ako „Bluetooth problém“.

### Zbytočne zapnuté aktívne spojenia

Ak zariadenia potrebujú iba advertising dáta, konfiguráciu netreba komplikovať bez dôvodu. Funkcie zapínajte podľa požiadaviek konkrétnej integrácie.

### Zlé fyzické umiestnenie

Kovové skrinky, technické šachty alebo miesto bez stabilnej siete môžu znížiť prínos proxy.

## Modelový projekt

**ESP32 Bluetooth Proxy pre BLE senzory na vzdialenom poschodí**

Cieľ:

- umiestniť proxy na chodbu medzi Home Assistant server a vzdialené BLE senzory,
- zabezpečiť stabilné napájanie,
- overiť Wi-Fi,
- nakonfigurovať Bluetooth Proxy,
- sledovať, či Home Assistant prijíma údaje konzistentnejšie.

Bez konkrétnych senzorov tento projekt nepredstiera kompatibilitu. Každý BLE model treba overiť samostatne.

## Bezpečnostné upozornenie

Bluetooth Proxy je vhodná ako nízkonapäťový projekt. Ak má byť uzol trvalo zabudovaný, používajte vhodný kryt, bezpečný napájací zdroj a rešpektujte teplotné a environmentálne podmienky. Neumiestňujte maker dosku voľne k 230 V rozvodom.

## Odporúčané produkty — návrh

- kompatibilná ESP32 doska,
- kvalitný USB kábel,
- stabilný nízkonapäťový zdroj,
- kryt alebo 3D tlačená krabička vhodná pre konkrétnu dosku.

Presný produktový výber sa doplní pred publikovaním podľa aktuálneho KomArena skladu a overenej podpory Bluetooth na konkrétnom modeli.

## Interné odkazy — návrh

- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Home Assistant: https://komarena.sk/home-assistant/
- Napájanie: https://komarena.sk/napajanie/
- Stabilné napájanie ESP32: interný link na Draft 005 po publikovaní
- Prvý ESPHome projekt: interný link na Draft 003 po publikovaní

## CTA

Ak vám BLE senzor funguje iba pri Home Assistante, nepresúvajte hneď celý server. Najprv otestujte jednu ESPHome Bluetooth Proxy v mieste, kde má dobrý dosah k senzoru aj stabilnú sieť.

## Zdroje a overenie

Overené 11. 9. 2026:

- ESPHome — Bluetooth Proxy: https://esphome.io/components/bluetooth_proxy/
- KomArena — ESP & ESPHome: https://komarena.sk/esp-esphome/
- KomArena — Home Assistant: https://komarena.sk/home-assistant/

## Open points

- Otvorený bod: pred publikovaním vybrať konkrétnu ESP32 dosku z aktuálneho KomArena katalógu a overiť Bluetooth podporu presného čipu.
- Otvorený bod: pripraviť test s reálnym BLE senzorom podporovaným Home Assistantom.
- Otvorený bod: pred publikovaním znovu skontrolovať default správanie `active` v aktuálnej verzii ESPHome.
- Otvorený bod: pripraviť samostatný článok „Bluetooth Proxy vs. USB Bluetooth adaptér“.

## Facebook post

Bluetooth senzor v pivnici funguje iba občas, ale Home Assistant máte o poschodie vyššie?

ESPHome Bluetooth Proxy vie rozšíriť BLE dosah cez vhodne umiestnenú ESP32 dosku. Dôležité je však vedieť, že proxy rozširuje rádiový dosah — nenahrádza podporu konkrétneho zariadenia v Home Assistante.

Pripravujeme praktický návod na výber miesta, konfiguráciu a diagnostiku.

Celý návod: [URL po publikovaní]

## Instagram caption

BLE senzor ďaleko od Home Assistanta? ESPHome Bluetooth Proxy môže presunúť Bluetooth „bližšie“ k zariadeniu bez presúvania servera.

#komarena #esphome #bluetooth #ble #homeassistant #esp32 #smarthome

## Reels / Shorts idea

**Hook:** „Bluetooth senzor vypadáva? Server nemusíte presúvať.“

Ukázať:

1. Home Assistant v technickej miestnosti,
2. vzdialený BLE senzor,
3. ESP32 na chodbe,
4. Bluetooth Proxy v ESPHome,
5. stabilné dáta v Home Assistante.

## Newsletter snippet

**Predmet:** Rozšírte Bluetooth dosah Home Assistanta cez ESPHome

ESPHome Bluetooth Proxy vie preniesť BLE dáta z miest, kam centrálny Bluetooth adaptér spoľahlivo nedosiahne. V novom návode vysvetlíme, kedy proxy pomáha, kam ju umiestniť a čo od nej neočakávať.
