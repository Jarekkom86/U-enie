<!-- markdownlint-disable MD013 -->

# Draft 029 — Pohyb → podmienka → svetlo v Home Assistante

- **Status:** draft
- **Typ:** praktický Home Assistant návod / modelový projekt
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Návody a projekty; Smart domácnosť
- **Cieľová skupina:** začiatočník, ktorý chce vytvoriť prvú užitočnú automatizáciu so senzorom pohybu a svetlom
- **Search intent:** informačný / praktický
- **Focus keyword:** Home Assistant automatizácia pohyb svetlo

## SEO title

Home Assistant: svetlo podľa pohybu, tmy a času krok za krokom

## Meta description

Vytvorte automatizáciu pohyb → podmienka → svetlo v Home Assistante. Praktický príklad s tmou, časom, vypnutím po nečinnosti a testovaním.

## H1

Pohyb → podmienka → svetlo: prvá praktická automatizácia v Home Assistante

## Úvod

„Keď je pohyb, zapni svetlo“ funguje ako demo, ale v reálnej domácnosti je to často nepríjemná automatizácia.

Svetlo sa zapína aj cez deň, pri dostatku denného svetla alebo v čase, keď ho nechcete.

Lepší model je:

**pohyb → skontrolovať podmienku → zapnúť svetlo → po nečinnosti vypnúť**

Na tomto príklade sa dá veľmi dobre pochopiť rozdiel medzi triggerom, condition a action.

## Predpoklady

Potrebujete:

- pohybový senzor, ktorý v Home Assistante vytvára vhodnú entitu `binary_sensor`,
- svetlo alebo skupinu svetiel v doméne `light`,
- voliteľne senzor osvetlenia alebo podmienku podľa slnka/času.

Konkrétna značka senzora nie je dôležitá. Návod je postavený na Home Assistant entitách, nie na jednom produkte.

## Trigger, condition a action v jednej vete

Home Assistant automatizácia má minimálne trigger a action. Condition je voliteľná brána.

Pre tento projekt:

- **Trigger:** pohybový senzor sa zmení na `on`.
- **Condition:** napríklad je tma alebo nízka hodnota luxov.
- **Action:** zapnúť svetlo.

Home Assistant po triggeri skontroluje aktuálny stav podmienok. Ak všetky požadované podmienky prejdú, spustí actions.

## Najprv vytvorte jednoduchú verziu v UI

V Home Assistante otvorte:

**Settings → Automations & scenes → Create automation → Create new automation**

Aktuálny editor pracuje s tromi hlavnými blokmi:

- **When** — trigger,
- **And if** — condition,
- **Then do** — action.

Názvy sa môžu v budúcich verziách mierne meniť, preto sa pri publikovaní oplatí spraviť aktuálne screenshoty.

## Krok 1: Trigger — pohyb

V časti **When** vyberte pohybový senzor a trigger pre detekovaný pohyb.

Ak pracujete priamo so stavom entity, logika je:

`binary_sensor.chodba_pohyb` sa zmení na `on`.

Použite vlastné entity z vašej inštalácie. Názvy v tomto článku sú iba príklad.

## Krok 2: Condition — zapnúť iba keď má svetlo zmysel

Podmienku možno postaviť viacerými spôsobmi.

### Variant A: podľa slnka

Jednoduchá prvá verzia môže svetlo povoľovať až po západe slnka.

Výhoda:

- nepotrebujete lux senzor.

Nevýhoda:

- chodba môže byť tmavá aj cez deň,
- svetlá miestnosť môže byť dosť svetlá aj krátko po západe.

### Variant B: podľa luxov

Ak máte senzor osvetlenia, môžete použiť numeric-state condition, napríklad „pod 30 lx“.

Konkrétny limit nie je univerzálny. Treba ho odmerať v konkrétnej miestnosti.

### Variant C: podľa času

Môžete obmedziť automatizáciu napríklad na večer a noc.

Pozor: čas nerieši reálne svetelné podmienky. Je to iba plánovací filter.

### Variant D: kombinácia

Home Assistant podporuje AND/OR podmienky.

Napríklad:

- pohyb,
- a zároveň je buď po západe slnka **alebo** je lux pod nastaveným limitom.

Pri prvej automatizácii nezačínajte príliš zložitou logikou. Najprv overte základ a až potom pridávajte ďalšie podmienky.

## Krok 3: Action — zapnúť svetlo

V **Then do** vyberte svetlo a akciu zapnutia.

Môžete nastaviť napríklad:

- jas,
- teplotu bielej,
- scénu,
- viac svetiel v jednej area.

Pre prvý test je lepšie zapnúť jedno svetlo bez ďalších efektov.

## YAML príklad — pohyb a tma

Aktuálna Home Assistant YAML syntax používa `triggers`, `conditions` a `actions`.

Nasledujúci príklad je model. Entity si nahraďte vlastnými:

```yaml
alias: Chodba - svetlo pri pohybe a tme
triggers:
  - trigger: state
    entity_id: binary_sensor.chodba_pohyb
    to: "on"
conditions:
  - condition: numeric_state
    entity_id: sun.sun
    attribute: elevation
    below: 4
actions:
  - action: light.turn_on
    target:
      entity_id: light.chodba
mode: restart
```

Hodnota `below: 4` je iba príklad. Nie je to univerzálny „správny lux“ ani ideálna hranica pre každú domácnosť; ide o slnečnú eleváciu.

## Lepšia verzia s lux senzorom

Ak máte entitu reálneho osvetlenia:

```yaml
alias: Chodba - svetlo pri pohybe a nízkom osvetlení
triggers:
  - trigger: state
    entity_id: binary_sensor.chodba_pohyb
    to: "on"
conditions:
  - condition: numeric_state
    entity_id: sensor.chodba_osvetlenie
    below: 30
actions:
  - action: light.turn_on
    target:
      entity_id: light.chodba
mode: restart
```

`30` lx je ukážková hranica. Najprv sledujte vlastný senzor v rôznych denných podmienkach a nastavte limit podľa miestnosti.

## Vypnutie po nečinnosti

Zapnutie je iba polovica projektu.

Začiatočník často vloží pevný delay: „zapni → čakaj 2 minúty → vypni“.

To môže fungovať, ale má to slabinu: človek môže byť stále v miestnosti a svetlo sa vypne iba preto, že prvý timer dobehol.

Čitateľnejší prvý model je samostatný trigger „bez pohybu určitý čas“.

### Druhá automatizácia: vypnutie

```yaml
alias: Chodba - vypnúť po nečinnosti
triggers:
  - trigger: state
    entity_id: binary_sensor.chodba_pohyb
    to: "off"
    for: "00:02:00"
actions:
  - action: light.turn_off
    target:
      entity_id: light.chodba
mode: restart
```

Takto sa dvojminútový interval začne počítať až od momentu, keď senzor prestane hlásiť pohyb.

## Prečo je pri PIR senzore dôležitý jeho vlastný reset čas

PIR senzor nemusí meniť stav `on/off` okamžite podľa každého pohybu.

Niektoré zariadenia držia detekciu určitý čas, iné majú vlastný cooldown alebo occupancy logiku.

Preto „2 minúty bez pohybu“ v Home Assistante nezačne vždy v sekunde, keď človek fyzicky prestane hýbať rukou.

Pri ladení sledujte históriu entity senzora.

## Pohyb nie je prítomnosť

PIR pohybový senzor deteguje zmenu infračerveného žiarenia pri pohybe. Nie je to univerzálny senzor ľudskej prítomnosti.

Ak niekto sedí bez pohybu, automatizácia môže vyhodnotiť miestnosť ako prázdnu.

Pre chodbu je PIR často vhodný. Pre pracovňu alebo kúpeľňu môže byť potrebná iná logika alebo iný typ senzora.

## Ako riešiť manuálne zapnuté svetlo

Ďalší častý problém:

človek zapne svetlo ručne a automatizácia ho o dve minúty vypne.

Možnosti:

- vypínaciu automatizáciu používať iba pre svetlo, ktoré zapla automatizácia,
- pridať helper/flag,
- použiť trigger ID a zložitejšiu logiku,
- alebo pri jednoduchej chodbe akceptovať, že automatizácia má plnú kontrolu nad svetlom.

Pre prvý článok je dôležité tento konflikt pomenovať. Netreba hneď učiť komplikovaný helper systém.

## Testovanie bez čakania na večer

Home Assistant umožňuje testovať jednotlivé conditions aj actions.

Pri testovaní si dajte pozor na rozdiel medzi:

- **Run actions** — spustí actions bez triggerov a conditions,
- manuálnym triggerom automation — môže podľa nastavenia conditions preskočiť alebo kontrolovať,
- reálnym triggerom senzora — najlepšie overenie celého toku.

Ak „Run actions“ zapne svetlo, ešte to nedokazuje, že trigger a condition sú správne.

## Traces sú hlavný diagnostický nástroj

Keď automatizácia nefunguje podľa očakávania, pozrite trace.

Trace ukáže napríklad:

- či trigger nastal,
- či condition prešla,
- na ktorej condition sa tok zastavil,
- ktoré actions sa vykonali.

Toto je lepší spôsob diagnostiky než náhodne meniť tri podmienky naraz.

## Mode: single vs restart

Home Assistant automations majú run modes.

Pre jednoduché zapínanie svetla nie je vždy kritické, ale je dobré rozumieť rozdielu:

- `single` — nový beh sa nespustí, kým predchádzajúci ešte beží,
- `restart` — nový trigger zastaví predchádzajúci beh a začne odznova,
- `queued` — nové behy čakajú v rade,
- `parallel` — môžu bežať súčasne.

Pri dlhších delayoch alebo wait logike môže voľba mode zásadne meniť správanie.

## Odporúčaný beginner workflow

1. Overte, že pohybový senzor mení stav v Home Assistante.
2. Overte, že svetlo ide ručne ovládať z Home Assistanta.
3. Spravte trigger → action bez condition.
4. Otestujte reálnym pohybom.
5. Pridajte jednu condition.
6. Znovu otestujte.
7. Až potom pridajte vypínanie po nečinnosti.
8. Sledujte trace a históriu senzora.

## Modelový projekt bez závislosti od konkrétneho produktu

Tento článok zámerne neviaže automatizáciu na HC-SR501 alebo iný konkrétny senzor.

Použiť možno akýkoľvek overený `binary_sensor` pohybu a akékoľvek Home Assistant `light` entity.

To umožňuje článok publikovať aj vtedy, keď konkrétny KomArena PIR produkt nie je skladom.

## Interné odkazy — návrh

- Home Assistant: https://komarena.sk/home-assistant/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 024 — Ako pomenovať zariadenia a entity
- Draft 025 — Zariadenie sa neobjavilo automaticky
- Draft 026 — Prvá automatizácia v Home Assistante
- Draft 010 — ESP32 + HC-SR501 + ESPHome, iba ako technický projekt po splnení product gate
- legacy PIR článok po oprave postu 2426

## CTA

Najprv spravte automatizáciu, ktorú viete vysvetliť jednou vetou. Keď funguje trigger, jedna condition a action, až potom pridávajte lux, čas, prítomnosť, helpers a ďalšie vetvenie.

## Zdroje a overenie

Overené 11. 9. 2026 proti Home Assistant 2026.9 dokumentácii:

- Home Assistant — Understanding automations: https://www.home-assistant.io/docs/automation/basics/
- Home Assistant — Automation triggers: https://www.home-assistant.io/docs/automation/trigger/
- Home Assistant — Automation conditions: https://www.home-assistant.io/docs/automation/condition/
- Home Assistant — Automation actions: https://www.home-assistant.io/docs/automation/action/
- Home Assistant — Automations in YAML: https://www.home-assistant.io/docs/automation/yaml/
- Home Assistant — Testing and troubleshooting automations: https://www.home-assistant.io/docs/automation/troubleshooting/

## Open points

- Otvorený bod: pred publikovaním overiť YAML v aktuálnom Home Assistant configuration checker/editori.
- Otvorený bod: doplniť screenshoty aktuálneho automation editora `When / And if / Then do`.
- Otvorený bod: pripraviť druhú úroveň článku „manuálne ovládanie vs automatické vypnutie“ s helperom alebo explicitným ownership flagom.
- Otvorený bod: po dostupnosti vhodného PIR/motion produktu možno pridať produktový CTA, ale článok na ňom nesmie byť závislý.

## Facebook post

„Keď pohyb, zapni svetlo“ je dobré demo. Nie vždy dobrá automatizácia.

V praktickom návode pridávame podmienku tmy, správne vypnutie po nečinnosti a ukazujeme, prečo Run actions ešte netestuje celý trigger → condition → action tok.

Celý článok: [URL po publikovaní]

## Instagram caption

Trigger zobudí automatizáciu. Condition rozhodne, či môže pokračovať. Action niečo vykoná. Pohybové svetlo je najlepší prvý projekt na pochopenie tohto modelu.

#komarena #homeassistant #automatizacia #smarthome #pirsensor #smartlight

## Reels / Shorts idea

**Hook:** „Prečo sa vám svetlo zapína cez deň?“

Ukázať:

1. PIR trigger,
2. chýbajúcu condition,
3. pridanú podmienku podľa lux/slnka,
4. zapnutie svetla,
5. `off for 2 minutes`,
6. trace úspešnej automatizácie.

## Newsletter snippet

**Predmet:** Pohyb → podmienka → svetlo: prvá automatizácia, ktorá dáva zmysel

Praktický Home Assistant projekt ukazuje trigger, condition, action, vypnutie po nečinnosti a základné testovanie cez traces.