<!-- markdownlint-disable MD013 -->

# Draft 006 — Prvá Zigbee sieť v Home Assistante

- **Status:** draft
- **Typ:** návod pre začiatočníka
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť, Návody a projekty
- **Cieľová skupina:** používateľ Home Assistant, ktorý chce prejsť od Wi-Fi zariadení k vlastnej Zigbee sieti
- **Search intent:** informačný / nákupný poradca
- **Focus keyword:** Zigbee Home Assistant návod

## SEO title

Zigbee v Home Assistante: prvá sieť krok za krokom

## Meta description

Ako začať so Zigbee v Home Assistante: koordinátor, ZHA, routery, koncové zariadenia, párovanie, umiestnenie a najčastejšie chyby pri prvej sieti.

## H1

Prvá Zigbee sieť v Home Assistante: koordinátor, ZHA a správny štart

## Úvod

Zigbee vie byť veľmi spoľahlivý základ smart domácnosti, ale iba vtedy, keď sa od začiatku chápe ako sieť — nie ako zbierka samostatných senzorov.

Na rozdiel od typického Wi-Fi zariadenia sa Zigbee prvky pripájajú do jednej spoločnej mesh siete. Tá má koordinátor, routery a koncové zariadenia. Ak prvú sieť postavíte iba z jedného USB adaptéra a desiatich batériových senzorov, nemusí mať dostatočné pokrytie ani robustnosť.

Tento článok vysvetľuje správne poradie krokov pri prvom nasadení v Home Assistante cez ZHA.

## Čo budete potrebovať

- Home Assistant,
- kompatibilný Zigbee koordinátor,
- aspoň jedno Zigbee zariadenie,
- pri väčšom priestore aj sieťovo napájané Zigbee routery,
- rozumné umiestnenie koordinátora mimo zdrojov rušenia.

### Dôležité pre KomArena

Pri príprave tohto draftu nie je na KomArena.sk publikovaný produkt pod označením ZBDongle. Preto článok zatiaľ neodkazuje na konkrétny koordinátor v e-shope a necháva produktový výber ako otvorený bod.

To je zámerné: obsah nesmie vytvárať dojem, že predávame zariadenie, ktoré v katalógu aktuálne nie je.

## Ako funguje Zigbee sieť

Home Assistant dokumentácia pre ZHA rozlišuje tri dôležité roly.

### Koordinátor

Koordinátor vytvára a spravuje Zigbee sieť. V jednej Zigbee sieti je jeden koordinátor.

Pri Home Assistante ide často o USB alebo sieťový rádiový adaptér podporovaný ZHA.

### Router

Router je spravidla trvalo napájané Zigbee zariadenie, ktoré môže preposielať komunikáciu ďalším zariadeniam a rozširovať dosah siete.

Typickým routerom môže byť napríklad vhodná smart zásuvka alebo iné trvalo napájané Zigbee zariadenie. Nie každé sieťovo napájané zariadenie však musí mať rovnaké routing vlastnosti, preto treba overovať konkrétny model.

### End device

Koncové zariadenie je často batériový senzor, tlačidlo alebo ovládač. Kvôli úspore energie typicky neslúži ako router pre ostatné zariadenia.

Pre stabilnú sieť je preto dôležité nerátať iba počet senzorov, ale aj počet a rozmiestnenie routerov.

## ZHA alebo iné riešenie?

Home Assistant ponúka integráciu **Zigbee Home Automation (ZHA)**, ktorá používa kompatibilný koordinátor a vytvára Zigbee sieť priamo v Home Assistante.

Tento článok je zameraný na ZHA. Zigbee2MQTT je samostatná alternatíva s inou architektúrou a zaslúži si vlastné porovnanie.

Pre začiatočníka je dôležitejšie najprv pochopiť samotnú Zigbee sieť než riešiť spor „ZHA vs. Zigbee2MQTT“ podľa diskusií na fórach.

## Krok 1: vyberte kompatibilný koordinátor

Koordinátor musí byť podporovaný riešením, ktoré chcete používať.

Oficiálna dokumentácia ZHA uvádza viacero kompatibilných rádií a aktuálne odporúča oficiálny Home Assistant Connect ZBT-2 pre nový ZHA setup.

To však neznamená, že každý USB Zigbee adaptér je automaticky vhodný. Pred nákupom overte:

- podporu v ZHA,
- použitý rádiový čip a firmware,
- spôsob aktualizácie firmvéru,
- typ pripojenia,
- umiestnenie adaptéra vo vašej inštalácii.

## Krok 2: koordinátor neumiestňujte bezhlavo vedľa počítača

Zigbee pracuje v pásme 2,4 GHz a jeho kvalitu môže ovplyvniť okolie.

Pri USB koordinátore dáva často zmysel kvalitná USB predlžovačka, aby rádio nebolo nalepené priamo na počítači, USB 3.0 zariadeniach alebo ďalších zdrojoch rušenia.

Finálne umiestnenie treba vybrať podľa konkrétnej domácnosti, Wi-Fi siete a dispozície.

## Krok 3: pridajte ZHA

Po pripojení kompatibilného rádia môže Home Assistant ZHA automaticky objaviť.

Manuálna cesta je:

**Nastavenia → Zariadenia a služby → Pridať integráciu → Zigbee Home Automation**

Potom vyberiete detegovaný koordinátor a Home Assistant vytvorí Zigbee sieť.

Konkrétne obrazovky sa môžu medzi verziami Home Assistanta meniť, preto pred publikovaním treba screenshoty znovu overiť.

## Krok 4: nezačínajte desiatimi batériovými senzormi

Rozumnejší postup je:

1. nastaviť koordinátor,
2. overiť stabilitu,
3. pridať prvé blízke zariadenie,
4. pridať jeden alebo viac vhodných routerov,
5. až potom rozširovať sieť do vzdialenejších miestností.

Mesh sieť sa buduje postupne. Batériový senzor na opačnom konci domu nie je dobrý prvý test kvality Zigbee.

## Krok 5: párujte zariadenie tam, kde ho budete používať

Pri mnohých zariadeniach je vhodné párovanie vykonať v realistickej polohe alebo po vybudovaní routerovej infraštruktúry.

Ak zariadenie predtým patrilo do inej Zigbee siete alebo výrobného hubu, často ho treba najprv resetovať podľa návodu výrobcu.

Zigbee zariadenie môže patriť iba do jednej Zigbee siete naraz.

## Krok 6: budujte sieť routermi

Pri väčšej domácnosti nestačí silný koordinátor. Zigbee mesh profituje z vhodne rozmiestnených routerov.

Dobrý návrh siete myslí na:

- poschodia,
- hrubé steny,
- technické miestnosti,
- vzdialené časti domu,
- vonkajšie senzory,
- počet batériových end devices.

Sieť sa oplatí budovať od centra smerom von, nie opačne.

## Krok 7: myslite na 2,4 GHz prostredie

Zigbee a 2,4 GHz Wi-Fi zdieľajú rovnaké frekvenčné pásmo. Pri zlom rozložení kanálov a veľkom rušení môže byť výsledkom slabšia komunikácia.

Pred zmenou kanálov však nerobte náhodné zásahy. Najprv zmapujte aktuálnu Wi-Fi a Zigbee konfiguráciu a postupujte podľa oficiálnych odporúčaní pre koexistenciu.

Zmena Zigbee kanála v existujúcej sieti môže vyžadovať ďalšie kroky na zariadeniach, preto to nie je vhodný prvý experiment bez dôvodu.

## Najčastejšie chyby

### Lacný koordinátor bez overenia kompatibility

Cena adaptéra nie je dôležitejšia než jeho podpora, firmware a dlhodobá udržateľnosť.

### Všetky zariadenia sú batériové

Bez dostatočnej routerovej vrstvy môže sieť v rozsiahlejšom priestore trpieť pokrytím.

### Koordinátor je priamo v rušnom USB okolí

Rádiu môže pomôcť fyzický odstup od počítača a ďalších zdrojov rušenia.

### Zariadenie nebolo resetované

Zariadenie, ktoré stále patrí do starej Zigbee siete, sa nemusí pripojiť do novej.

### Očakávanie, že každý Zigbee produkt funguje identicky

Zigbee štandardizuje veľa funkcií, ale konkrétne zariadenia môžu mať výrobné odlišnosti. ZHA používa pri neštandardných zariadeniach aj device handlers / quirks.

Kompatibilitu konkrétneho produktu treba preto overovať individuálne.

## Modelový prvý setup

**Home Assistant + kompatibilný Zigbee koordinátor + jeden router + jeden batériový senzor**

Cieľ nie je zaplniť celý dom prvý deň. Cieľ je vytvoriť zdravý základ siete a overiť:

- stabilitu koordinátora,
- párovanie,
- komunikáciu cez router,
- kvalitu signálu v reálnej miestnosti,
- správanie po reštarte Home Assistanta.

## Home Assistant Green a Zigbee

Home Assistant Green nemá vstavané Zigbee rádio. Ak chcete používať ZHA s Green, potrebujete kompatibilný externý Zigbee adaptér.

To je vhodný bod pre budúce prelinkovanie článku o Home Assistant Green a pripravovaného produktového ekosystému.

## Bezpečnostné upozornenie

Pri Zigbee routeroch a zásuvkách pracujúcich so sieťovým napätím používajte hotové certifikované zariadenia podľa pokynov výrobcu. Tento návod nenavádza na rozoberanie 230 V zariadení ani zásah do elektroinštalácie.

## Odporúčané produkty — návrh

- kompatibilný Zigbee koordinátor — **Otvorený bod: aktuálne chýba publikovaný koordinátor KomArena**,
- Zigbee router / smart zásuvka — doplniť iba po overení sortimentu,
- Zigbee senzor — doplniť iba konkrétny overený model,
- Home Assistant Green, ak bude aktívny v ponuke a produktová stránka bude hotová.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- Protokoly a integrácie: https://komarena.sk/protokoly-a-integracie/
- Značky a kompatibilita: https://komarena.sk/smart-znacky/
- Home Assistant Green: interný link na Draft 002 po publikovaní
- Produkty: https://komarena.sk/produkty/

## CTA

Prvú Zigbee sieť nestavajte podľa počtu zariadení, ale podľa architektúry. Začnite kompatibilným koordinátorom, vytvorte stabilný základ routerov a až potom pridávajte vzdialené batériové senzory.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Zigbee Home Automation (ZHA): https://www.home-assistant.io/integrations/zha/
- KomArena — Home Assistant: https://komarena.sk/home-assistant/
- KomArena — Protokoly a integrácie: https://komarena.sk/protokoly-a-integracie/

## Open points

- Otvorený bod: vybrať a zalistovať vhodný Zigbee koordinátor do KomArena sortimentu pred komerčným CTA článku.
- Otvorený bod: overiť, ktoré publikované KomArena Zigbee zariadenia sú routery a ktoré end devices.
- Otvorený bod: pripraviť samostatné porovnanie ZHA vs. Zigbee2MQTT.
- Otvorený bod: pred publikovaním overiť aktuálnu odporúčanú koordinátorovú hardvérovú platformu v dokumentácii Home Assistant.

## Facebook post

Zigbee sieť nie je iba USB dongle + veľa senzorov.

Má koordinátor, routery a koncové zariadenia. Ak začnete desiatimi batériovými senzormi bez routerovej vrstvy, výsledok môže byť slabší, než očakávate.

Pripravujeme návod, ako postaviť prvú Zigbee sieť v Home Assistante cez ZHA od správneho základu.

Celý návod: [URL po publikovaní]

## Instagram caption

Zigbee = sieť, nie zbierka senzorov. Koordinátor vytvorí sieť, routery ju rozšíria a batériové end devices sa na ňu pripájajú.

#komarena #homeassistant #zigbee #smarthome #zha #automatizacia

## Reels / Shorts idea

**Hook:** „Prečo 10 Zigbee senzorov nemusí znamenať dobrú Zigbee sieť?“

Ukázať:

1. koordinátor,
2. router,
3. batériový senzor,
4. jednoduchú mapu bytu/domu,
5. rozširovanie siete od centra smerom von.

## Newsletter snippet

**Predmet:** Prvá Zigbee sieť: nezačínajte senzormi

Stabilná Zigbee sieť potrebuje viac než koordinátor. Nový návod vysvetlí úlohu routerov, párovanie, rozmiestnenie a základné chyby, ktoré sa oplatí vyriešiť ešte pred nákupom desiatok zariadení.
