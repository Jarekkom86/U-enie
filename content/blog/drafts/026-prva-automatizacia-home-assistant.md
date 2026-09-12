<!-- markdownlint-disable MD013 -->

# Draft 026 — Prvá automatizácia v Home Assistante

- **Status:** draft
- **Typ:** návod pre začiatočníka
- **Primárna kategória:** Home Assistant & ESPHome
- **Sekundárne kategórie:** Smart domácnosť; Návody a projekty
- **Cieľová skupina:** používateľ Home Assistanta, ktorý má prvé zariadenia a chce vytvoriť jednoduchú automatizáciu bez YAML
- **Search intent:** informačný / praktický
- **Focus keyword:** Home Assistant automatizácia

## SEO title

Prvá Home Assistant automatizácia: trigger, condition a action

## Meta description

Ako vytvoriť prvú automatizáciu v Home Assistante bez YAML. Pochopte trigger, condition a action a otestujte jednoduché svetlo podľa pohybu alebo času.

## H1

Prvá automatizácia v Home Assistante: pochopte trigger, condition a action skôr než začnete komplikovať

## Úvod

Home Assistant začne byť skutočne užitočný vtedy, keď prestanete všetko ovládať ručne z dashboardu.

Automatizácia môže byť veľmi jednoduchá:

**keď sa niečo stane → ak platí podmienka → urob akciu.**

V Home Assistante sú tieto tri časti základom automatizácií. Oficiálna dokumentácia ich označuje ako trigger, condition a action. Condition je voliteľná, trigger a action potrebuje každá automatizácia.

V aktuálnom vizuálnom editore môžete väčšinu bežných automatizácií vytvoriť bez písania YAML.

## Rýchla odpoveď

Zapamätajte si tri otázky:

1. **When / Trigger — čo má automatizáciu spustiť?**
2. **And if / Condition — za akých okolností má pokračovať?**
3. **Then do / Action — čo sa má vykonať?**

Príklad:

- **Trigger:** v chodbe sa zistí pohyb,
- **Condition:** je po západe slnka,
- **Action:** zapni chodové svetlo.

To je celá logika prvej automatizácie.

## Trigger: udalosť, ktorá automatizáciu zobudí

Trigger je moment, ktorý automatizáciu spustí.

Oficiálna dokumentácia Home Assistant uvádza napríklad:

- otvorenie dverí,
- detekciu pohybu,
- prekročenie teploty,
- konkrétny čas,
- západ slnka,
- príchod osoby domov,
- stlačenie tlačidla.

V novších verziách Home Assistanta editor ponúka aj purpose-specific triggers — teda voľby pomenované podľa reálneho deja, napríklad `Door opened` alebo `Temperature crossed threshold`, namiesto nutnosti vždy pracovať s technickým stavom entity.

Pre začiatočníka je dobré zvoliť trigger, ktorému rozumie aj bez YAML.

## Condition: filter, nie druhý trigger

Condition je voliteľná kontrola, ktorá sa vyhodnotí **po spustení triggera**.

Príklad:

- pohyb spustí automatizáciu,
- condition skontroluje, či je večer,
- ak nie je večer, akcia sa nevykoná.

Dôležitý rozdiel:

- trigger sleduje, **čo sa stalo**,
- condition kontroluje, **aký je aktuálny stav v momente vykonania**.

Home Assistant dokumentácia upozorňuje, že conditions nie sú to isté ako triggers. Pri rýchlo sa meniacom stave môže byť hodnota v čase condition už iná než v momente triggera.

## Action: čo má Home Assistant urobiť

Action je výsledok automatizácie.

Príklady:

- zapnúť svetlo,
- vypnúť zásuvku,
- nastaviť jas,
- aktivovať scénu,
- poslať notifikáciu,
- nastaviť termostat,
- spustiť skript.

Action môže cieliť na:

- konkrétnu entitu,
- device,
- area,
- viac cieľov naraz.

Ak máte zariadenia správne priradené do Areas, často je praktickejšie cieliť na celú oblasť než ručne vyberať každú žiarovku.

## Prvý modelový projekt: svetlo podľa času

Ak zatiaľ nemáte pohybový senzor, začnite ešte jednoduchšie.

### Cieľ

Zapnúť vybrané svetlo pri západe slnka.

### Trigger

Sunset.

### Condition

Žiadna — pri prvom teste ju nepotrebujete.

### Action

Light turn on.

Postup v UI:

1. otvorte **Settings → Automations & scenes**,
2. vyberte **Create automation → Create new automation**,
3. v časti **When** pridajte trigger,
4. zvoľte západ slnka,
5. v časti **Then do** pridajte akciu,
6. zvoľte zapnutie svetla,
7. vyberte cieľ,
8. automatizáciu pomenujte a uložte.

Oficiálny Getting Started používa podobný model so svetlom pri západe slnka.

## Druhý projekt: pohyb iba večer

Keď prvá automatizácia funguje, pridajte condition.

### Trigger

Pohybový senzor deteguje pohyb.

### Condition

Je po západe slnka alebo je intenzita svetla pod zvoleným limitom.

### Action

Zapni svetlo.

Tento model už ukazuje, prečo samotný PIR často nestačí. Pohyb nehovorí, či svetlo reálne potrebujete.

Súvisiaci staging článok:

- budúci článok — Smart svetlo podľa pohybu: prečo samotný PIR nestačí

## Ako automatizáciu otestovať

Nečakajte vždy do večera.

V editore môžete testovať jednotlivé akcie a Home Assistant umožňuje automatizáciu spustiť manuálne.

Pozor: pri ručnom `Trigger automation` sa podmienky môžu podľa spôsobu spustenia štandardne preskočiť. Pri testovaní preto vedzte, či testujete iba actions alebo celý trigger/condition flow.

Praktický postup:

1. otestujte samostatnú action,
2. overte, že cieľ reaguje,
3. skontrolujte condition,
4. potom vyvolajte reálny trigger,
5. pozrite Trace automatizácie, ak výsledok nie je podľa očakávania.

## Trace: najlepší priateľ pri diagnostike

Keď automatizácia nefunguje, nepíšte ju hneď od nuly.

Home Assistant uchováva traces, ktoré pomáhajú zistiť:

- či sa trigger spustil,
- ktoré conditions prešli alebo zlyhali,
- ktorá action sa vykonala,
- kde sa vykonávanie zastavilo.

To je oveľa presnejšie než hádať podľa toho, či svetlo zostalo zhasnuté.

## Názov automatizácie

Používajte názov, ktorý opisuje výsledok.

Dobré:

- `Chodba — zapnúť svetlo pri pohybe večer`
- `Obývačka — zapnúť lampu pri západe slnka`
- `Práčka — upozorniť po skončení`

Slabé:

- `Automation 4`
- `Test`
- `PIR final`

Súvisiaci článok:

- Draft 024 — Ako pomenovať zariadenia a entity v Home Assistante

## Jedna automatizácia alebo viac?

Pre prvý projekt používajte jednoduché pravidlá.

Ak máte dva úplne rozdielne účely, dve menšie automatizácie bývajú prehľadnejšie než jedna obrovská s desiatimi vetvami.

Naopak, súvisiace triggers môžu byť v jednej automatizácii, ak používate Trigger IDs a `Choose` blok a logika zostáva čitateľná.

Najprv optimalizujte čitateľnosť. Nie počet automatizácií.

## Viac conditions

Conditions sú štandardne kombinované logikou AND — všetky musia prejsť, ak nevytvoríte inú logickú skupinu.

Príklad:

svetlo zapni iba ak:

- je pohyb,
- je večer,
- nikto manuálne nezakázal automatické svetlo.

Pri zložitejšej logike môžete použiť OR, NOT alebo vnorené podmienky.

Začiatočník by mal najprv overiť jednoduchú jednu condition a až potom skladať zložitejšie bloky.

## Čo nerobiť v prvej automatizácii

### Desať zariadení naraz

Ak sa niečo pokazí, neviete kde.

### Komplikovaný template bez potreby

Vizuálny editor dnes pokrýva veľa bežných situácií.

### Použiť device trigger bez pochopenia entity

Device-oriented voľby sú pohodlné, ale stále je dobré vedieť, ktorá entita reprezentuje reálny stav.

### Vypínať svetlo rovnakou automatizáciou bez premysleného timeru

Pri PIR automatizáciách môže naivné „po 30 sekundách vypni“ viesť k blikaniu alebo vypnutiu počas prítomnosti.

Vypínacia logika si zaslúži vlastný test.

## Bezpečnostná poznámka

Home Assistant automatizácia môže spínať reálne zariadenia.

Pri svetle alebo zásuvke používajte certifikovaný smart prvok určený na dané napätie a záťaž. Článok nepredpokladá vlastné 230 V relé zapojenie s ESP32.

Pri kúrení, bráne, zámku alebo inom bezpečnostne dôležitom systéme nepoužívajte neotestovanú automatizáciu ako jedinú bezpečnostnú vrstvu.

## KomArena prepojenie

- Home Assistant: https://komarena.sk/home-assistant/
- Draft 021 — Čo je Home Assistant a čo nie je
- Draft 024 — Naming zariadení a entít
- Draft 025 — Keď Home Assistant zariadenie neobjaví
- Draft 003 — Prvý ESPHome projekt s ESP32

Produktové CTA nie je pre prvý všeobecný automation článok potrebné. Neskoršie projektové návody môžu odporučiť konkrétny senzor alebo svetelný modul iba po overení kompatibility a skladu.

## Záver

Prvá automatizácia nemusí byť „inteligentná“ v marketingovom zmysle.

Stačí, ak je predvídateľná:

**trigger → voliteľná condition → action.**

Keď rozumiete tomuto toku a viete použiť Trace, môžete neskôr bezpečne pridávať viac podmienok, viaceré triggers, Choose bloky, skripty a templating.

## Zdroje a overenie

Overené 11. 9. 2026:

- Home Assistant — Understanding automations: https://www.home-assistant.io/docs/automation/basics/
- Home Assistant — Automation triggers: https://www.home-assistant.io/docs/automation/trigger/
- Home Assistant — Automation conditions: https://www.home-assistant.io/docs/automation/condition/
- Home Assistant — Automation actions: https://www.home-assistant.io/docs/automation/action/
- Home Assistant — Getting started with automations: https://www.home-assistant.io/getting-started/automation/
- Home Assistant 2026.7 — purpose-specific triggers and conditions: https://www.home-assistant.io/blog/2026/07/01/release-20267/

## Open points

- Otvorený bod: pred publikovaním vytvoriť screenshoty aktuálneho automation editora s anonymizovanými testovacími entitami.
- Otvorený bod: doplniť screenshot jedného Trace po reálnom testovacom spustení.
- Otvorený bod: následný článok spracovať ako konkrétny projekt PIR + svetlo + lux/time condition.

## Facebook post

Prvá Home Assistant automatizácia nepotrebuje YAML ani desať podmienok.

Stačí pochopiť tri veci:

- čo ju spustí,
- za akých podmienok má pokračovať,
- čo má vykonať.

V novom návode vysvetľujeme trigger, condition a action na jednoduchom svetle a ukazujeme aj správny postup testovania.

Celý článok: [URL po publikovaní]

## Instagram caption

Trigger = čo sa stalo. Condition = či teraz môžeme pokračovať. Action = čo Home Assistant urobí. To je základ každej automatizácie.

#komarena #homeassistant #automation #smarthome #navod

## Reels / Shorts idea

**Hook:** „Home Assistant automatizácie za 30 sekúnd: Trigger, Condition, Action.“

Ukázať:

1. pohybový senzor,
2. When trigger,
3. And if condition,
4. Then do light action,
5. test,
6. Trace.

## Newsletter snippet

**Predmet:** Prvá Home Assistant automatizácia bez YAML

Nový návod vysvetľuje trigger, condition a action na jednoduchom príklade a ukazuje, ako automatizáciu testovať bez čakania na večer.