# Gmail Cleaner Control Center

Samostatný Google Apps Script projekt na bezpečné upratovanie Gmailu cez pravidlá, štítky, dry-run režim, logovanie a ovládanie cez dashboard alebo JSON príkazy.

Projekt je navrhnutý preto, aby sa Gmail triedil natívne v Google účte, nie cez nestabilné zápisové operácie externého konektora.

## Bezpečnostný model

- Predvolený režim je vždy `dryRun: true`.
- Dry-run iba vyhľadáva a loguje zhody. Gmail nemení.
- Mazanie e-mailov nie je implementované.
- Presun do koša nie je implementovaný.
- Live režim môže iba pridávať štítky.
- Archivácia je predvolene vypnutá.
- Archivácia sa môže vykonať iba vtedy, keď:
  - používateľ nastaví `archive: true`,
  - pravidlo má `allowArchive: true`,
  - režim nie je dry-run,
  - používateľ zadá presný potvrdzovací text.
- Faktúry, bezpečnostné e-maily, banky, platby, poistky a administratíva sa automaticky nearchivujú.

Povinný live confirmation text:

```text
I UNDERSTAND - LABEL ONLY
```

## Súbory

```text
gmail-cleaner-control-center/
├── Code.gs
├── Config.gs
├── GmailCleaner.gs
├── Logger.gs
├── Dashboard.html
└── README.md
```

### Code.gs
Vstupné funkcie pre Apps Script, dashboard, menu, testy a bezpečné spúšťanie pravidiel. Tento súbor priamo nepoužíva `GmailApp`.

### Config.gs
Bezpečná konfigurácia, zoznam štítkov a pravidlá. Obsahuje funkciu `getDefaultConfig()`.

### GmailCleaner.gs
Jadro spracovania Gmailu. Obsahuje `runRule()`, `processThreads()`, `runCommandJson()`, prácu so štítkami, retry/backoff a bezpečnostné validácie.

### Logger.gs
Logovanie do Google Sheet tabuľky a stav cez `PropertiesService`.

### Dashboard.html
Jednoduchý ovládací panel pre dry-run, live label-only režim, JSON command a zobrazenie posledného logu.

## Predvolené štítky

- `00_DNES_URGENT`
- `01_ZAKAZNICI_OBJEDNAVKY`
- `02_SERVIS_AQARA`
- `03_DODAVATELIA`
- `04_GP_WEBPAY_BANKA`
- `05_KOMARENA_WEB`
- `06_AUKRO_MARKETPLACE`
- `07_FAKTURY_ADMIN`
- `08_CAKAM`
- `99_ARCHIV`

## Predvolené pravidlá

### faktury_admin
Označuje faktúry, doklady, PDF prílohy a platobné potvrdenia štítkom `07_FAKTURY_ADMIN`.

Predvolené nastavenie:

```json
{
  "dryRun": true,
  "archive": false,
  "allowArchive": false
}
```

### urgent_security
Označuje bezpečnostné upozornenia a overenia štítkom `00_DNES_URGENT`.

### aukro_marketplace
Označuje Aukro správy štítkom `06_AUKRO_MARKETPLACE`.

### komarena_web
Označuje KomArena, WordPress a WooCommerce správy štítkom `05_KOMARENA_WEB`.

### promo_archiv_candidate
Kandidát na promo/newsletter archív štítkom `99_ARCHIV`. Aj tu je archivácia defaultne vypnutá.

## Ako nasadiť do Google Apps Script

1. Otvor Google Apps Script:
   ```text
   https://script.google.com/
   ```
2. Klikni na **New project**.
3. Pomenuj projekt napríklad:
   ```text
   Gmail Cleaner Control Center
   ```
4. Vytvor alebo premenuj súbory podľa priečinka:
   - `Code.gs`
   - `Config.gs`
   - `GmailCleaner.gs`
   - `Logger.gs`
   - `Dashboard.html`
5. Skopíruj obsah každého súboru z tohto priečinka do rovnomenného súboru v Apps Script editore.
6. Ulož projekt.

## Prvý bezpečný test

Najprv spusti iba konfiguráciu:

```javascript
testConfig()
```

Očakávaný výsledok:

```json
{
  "success": true,
  "labelsCount": 10,
  "rulesCount": 5,
  "dryRunDefault": true
}
```

Potom spusti bezpečný dry-run faktúr:

```javascript
testDryRunFaktury()
```

Tento krok môže čítať Gmail cez `GmailApp.search()`, ale nemení Gmail. Výsledok a detaily sa zapíšu do logu.

## Test bez vytvárania štítkov

```javascript
testLabelCreation()
```

Táto funkcia je iba dry-run kontrola konfigurácie. Nevytvára žiadne Gmail štítky.

## Search-only test pravidla

```javascript
testSearchOnly('faktury_admin')
```

Použije batch size 5 a dry-run režim.

## Dashboard

Dashboard môžeš otvoriť dvomi spôsobmi:

### Ako sidebar v kontajnerovom Apps Script projekte

Spusti:

```javascript
openDashboard()
```

### Ako Web App

1. V Apps Script klikni **Deploy**.
2. Vyber **New deployment**.
3. Typ vyber **Web app**.
4. Execute as: **Me**.
5. Who has access: podľa potreby, odporúčané iba ty.
6. Otvor Web App URL.

Dashboard obsahuje:

- výber pravidla,
- batch size,
- dry-run prepínač,
- archive prepínač,
- live confirmation text,
- JSON command textarea,
- výstup ako JSON.

## JSON command režim

Bezpečný dry-run príkaz:

```json
{
  "action": "runRule",
  "ruleId": "faktury_admin",
  "dryRun": true,
  "batchSize": 25,
  "archive": false
}
```

Live label-only príkaz:

```json
{
  "action": "runRule",
  "ruleId": "faktury_admin",
  "dryRun": false,
  "batchSize": 25,
  "archive": false,
  "confirmText": "I UNDERSTAND - LABEL ONLY"
}
```

Live režim bez presného potvrdenia zlyhá.

## Ako poslať výsledok späť do ChatGPT

Po každom behu skopíruj JSON výstup z dashboardu alebo výsledok funkcie a pošli ho do ChatGPT.

ChatGPT potom vie vyhodnotiť:

- koľko vlákien bolo nájdených,
- koľko by sa označilo,
- koľko bolo preskočených,
- či vznikli chyby,
- aké pravidlo pustiť ďalej.

## Logovanie

Pri prvom logovaní sa vytvorí Google Sheet:

```text
Gmail Cleaner Logs
```

Sheet:

```text
Logs
```

Stĺpce:

```text
timestamp, runId, ruleId, dryRun, query, label, threadId, subject, from, action, status, error
```

Ak vytvorenie Google Sheet zlyhá, systém uloží chybu aspoň do `PropertiesService` a `Logger.log()`.

## Odporúčaný pracovný postup

1. `testConfig()`
2. `testLabelCreation()`
3. `testSearchOnly('faktury_admin')`
4. `testDryRunFaktury()`
5. Skontrolovať log.
6. Až potom live label-only s potvrdením.
7. Archiváciu neriešiť, kým nie je schválená kategória a log.

## Troubleshooting

### Chýba povolenie Gmail
Pri prvom spustení dry-run testu Google požiada o autorizáciu. Je to očakávané, pretože script potrebuje čítať Gmail cez `GmailApp.search()`.

### Dashboard sa neotvorí ako sidebar
Standalone Apps Script nemusí mať Spreadsheet UI. Použi Web App nasadenie cez `doGet()`.

### Log sheet sa nevytvoril
Skontroluj Apps Script autorizácie pre Google Sheets. Funkcia `appendLogRow()` chybu uloží do `GMAIL_CLEANER_LAST_LOG_ERROR`.

### Live režim zlyhal
Skontroluj, či je `dryRun: false` a či `confirmText` presne sedí:

```text
I UNDERSTAND - LABEL ONLY
```

### Archivácia sa nespustila
Je to bezpečnostne zámerné. Archivácia funguje iba pri pravidlách s `allowArchive: true` a len po výslovnom nastavení `archive: true` v live režime.

## Bezpečnostná poznámka

Tento projekt je navrhnutý na triedenie a označovanie Gmailu. Nie je to mazací nástroj. Ak chceš neskôr pridať ďalšie pravidlá alebo automatizáciu, najprv ich testuj v dry-run režime a kontroluj logy.
