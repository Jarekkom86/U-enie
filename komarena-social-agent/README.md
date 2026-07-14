# KomArena Social Agent — ReSmart

Lokálny approval-first prototyp pre prípravu a bezpečné publikovanie príspevkov na Facebook stránku ReSmart.

## Funkcie

- koncept príspevku,
- náhľad,
- stav `draft -> approved -> published`,
- auditný log v SQLite,
- publikovanie cez Meta Graph API,
- bezpečné zastavenie, ak chýba Page Access Token,
- žiadne heslá ani tokeny v repozitári.

## Spustenie

```powershell
cd komarena-social-agent
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:SOCIAL_AGENT_SECRET="nahodny-lokalny-retazec"
python app.py
```

Otvorte `http://127.0.0.1:8791/`.

## Meta autorizácia

Aplikácia očakáva tieto lokálne premenné prostredia:

```powershell
$env:META_PAGE_ID="61583363625183"
$env:META_PAGE_ACCESS_TOKEN="PAGE_ACCESS_TOKEN"
$env:META_GRAPH_VERSION="v23.0"
```

Token nevkladajte do kódu, `.env` v repozitári ani do GitHub issue. Získajte ho cez oficiálnu Meta aplikáciu a oprávnenia pre správu stránky. Pred reálnym publikovaním skontrolujte aktuálne požiadavky Meta App Review a oprávnenia pre Pages API.

## Bezpečnostný model

- tlačidlo Publikovať funguje iba pre stav `approved`,
- bez `META_PAGE_ACCESS_TOKEN` sa publikovanie zastaví a zapíše do auditného logu,
- aplikácia neukladá facebookové heslo,
- 2FA sa neobchádza,
- prvý príspevok je iba návrh, kým ho vlastník výslovne neschváli.

## Ďalší krok vlastníka

Po lokálnom spustení vytvoriť Meta aplikáciu alebo pripojiť existujúcu, autorizovať správu stránky ReSmart a bezpečne nastaviť Page Access Token iba v lokálnom prostredí.
