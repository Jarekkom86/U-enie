<!-- markdownlint-disable MD013 -->

# KomArena.sk — Pricing & Break-even MASTER

**Status:** záväzný obchodný štandard pre launch fázu  
**Verzia:** 1.0  
**Platnosť vstupov:** 2026-09-09  
**Účel:** nastaviť ceny a proces tak, aby KomArena.sk na rozbehu nemusela maximalizovať zisk, ale aby objednávky ani celá prevádzka nevytvárali skrytú stratu.

## 1. Hlavné pravidlo

KomArena.sk v launch fáze nemusí maximalizovať zisk. Cena však nesmie byť nastavená tak, aby po započítaní všetkých relevantných nákladov vznikala plánovaná strata.

Rozlišujú sa dva povinné break-even pohľady:

1. **ORDER BREAK-EVEN** — konkrétna objednávka nesmie byť záporná po variabilných nákladoch a daňovej rezerve.
2. **BUSINESS BREAK-EVEN** — mesačný súčet objednávok musí byť porovnaný aj s fixnými nákladmi, daňami a odvodmi. Ak má KomArena sama financovať celú živnosť, musí byť mesačný výsledok po ich započítaní minimálne 0 EUR.

Produktová marža sama osebe nie je rozhodovací parameter. Staré pravidlo typu „12 % marža = automatický PASS“ sa nepoužíva ako finálny gate.

## 2. Povinné pojmy

### Produktová marža

```text
produktova_marza_EUR = predajna_cena - nakupna_cena
produktova_marza_pct = produktova_marza_EUR / predajna_cena * 100
```

Slúži iba na porovnanie produktu. Nehovorí, či na objednávke reálne zarábame alebo prerábame.

### Landed cost

```text
landed_cost = nakupna_cena
            + alokovana_vstupna_doprava_dodavatela
            + ine_priame_naklady_na_dodanie_tovaru_na_KomArena
```

Pri Botlande sa používa skutočná cena, ktorú KomArena zaplatí, nie teoretická netto cena bez potvrdeného daňového režimu.

### Order contribution

```text
order_contribution = prijem_za_tovar
                   + prijem_za_dopravu
                   + prijem_za_dobierku_a_male_objednavky
                   - nakup_tovaru
                   - vstupna_doprava_dodavatela
                   - skutocny_naklad_dopravy_zakaznikovi
                   - platobna_brana
                   - dobierkove_poplatky
                   - balenie
                   - ocakavana_strata_z_neprevzatych_dobierok
                   - ine_priame_variabilne_naklady
                   - danova_rezerva
```

**ORDER BREAK-EVEN PASS:** `order_contribution >= 0`.

### Fully loaded monthly result

```text
monthly_result = suma_order_contribution
               - zdravotne_odvody_alokovane_na_KomArena
               - socialne_odvody_alokovane_na_KomArena
               - fixny_poplatok_platobnej_brany
               - hosting
               - platene_pluginy
               - uctovnictvo
               - ine_fixne_naklady_KomArena
```

**BUSINESS BREAK-EVEN PASS:** `monthly_result >= 0`.

## 3. Launch cenová politika

### 3.1 Rozhodovacie stavy

| Stav | Výsledok po variabilných nákladoch a daňovej rezerve | Akcia |
| --- | ---: | --- |
| RED | `< 0 EUR` | nepublikovať cenu / zdražiť / znížiť náklad |
| YELLOW — BREAK-EVEN | `0 až 1 EUR` | povolené iba ako launch/traffic produkt |
| GREEN — SAFE LAUNCH | `>= 1 EUR` | povolené |
| HEALTHY | `>= 2 EUR` alebo `>= 5 %` | preferovaný stav |

Pri produktoch s veľmi nízkou absolútnou cenou sa rozhoduje podľa celej objednávky a cross-sellu, nie iba podľa jedného kusu.

### 3.2 Produktová marža ako orientačný filter

- približne **10 %** môže byť launch minimum iba vtedy, ak ORDER BREAK-EVEN zostane nezáporný,
- **12–15 %** je bežný orientačný cieľ,
- **8–10 %** je povolené iba pre traffic produkt, ak celá objednávka prejde ORDER BREAK-EVEN,
- **pod 8 %** vyžaduje explicitné zdôvodnenie a výpočet; nesmie sa automaticky publikovať.

Žiadne percento marže neprebíja break-even výpočet.

## 4. Doprava zákazníkovi — Packeta

### Základné pravidlo

**Dopravu Packetou platí zákazník.**

Cena dopravy účtovaná zákazníkovi musí minimálne pokryť:

- aktuálny reálny náklad Packety podľa zvoleného podania, hmotnosti a príplatkov,
- transakčný poplatok platobnej brány pripadajúci na dopravu,
- prípadný povinný dopravný príplatok.

Doprava sa nemá používať na umelé vytváranie marže, ale KomArena ju na launch nesmie pravidelne dotovať.

### Launch pracovná hodnota

- pracovný checkout cieľ pre Z-BOX: **približne 3,99 EUR**, kým aktuálny zmluvný/cenníkový výpočet nepotvrdí inú bezpečnú hodnotu,
- pri každej zmene cenníka Packety sa hodnota prepočíta,
- produkčné nastavenie checkoutu sa nemení iba na základe tohto dokumentu; vyžaduje samostatné schválenie a bezpečný deployment.

### Doprava zdarma

Na launch sa doprava zdarma nepovoľuje automaticky podľa samotnej hodnoty košíka.

Doprava zdarma je PASS iba vtedy, ak po jej plnej dotácii zostane:

```text
order_contribution >= 0
```

Preferované je ponechať aj bezpečnostný vankúš minimálne 1–2 EUR.

## 5. Dobierka a riziko neprevzatia

Nevyzdvihnutá dobierka je riziko platobnej metódy, nie náklad, ktorý majú platiaci zákazníci financovať v cene každého produktu.

### Launch pravidlá

- dobierka iba pri objednávke **10–100 EUR**,
- pracovný dobierkový príplatok zákazníkovi: **+2,49 EUR**,
- nový zákazník na dobierku: objednávka sa má potvrdiť pred expedíciou,
- jedna evidovaná neprevzatá dobierka: ďalšie objednávky iba platbou vopred, kým sa pravidlo manuálne neuvoľní,
- pred koncom úložnej lehoty má byť odoslaná pripomienka,
- objednávka nad 100 EUR: preferovať iba platbu vopred.

Dobierkový príplatok musí pokryť:

1. aktuálny poplatok dopravcu za dobierku,
2. prípadný poplatok za platbu kartou pri prevzatí,
3. štatistickú rezervu na neprevzaté zásielky,
4. primeranú časť baliaceho a manipulačného rizika.

### Výpočet rezervy na neprevzatie

```text
expected_unclaimed_loss_per_cod = pravdepodobnost_neprevzatia * strata_na_jednej_neprevzatej_zasielke
```

Reálna miera neprevzatých zásielok sa má počítať z vlastných dát KomArena. Do času dostatočnej vzorky sa používa konzervatívny modelový scenár.

## 6. Malé objednávky

Aktuálne launch pravidlo:

- minimálna objednávka: **10 EUR**,
- objednávka pod **15 EUR**: príplatok **+1,49 EUR**.

Príplatok má kryť disproporčne vysoké fixné náklady malej objednávky: balenie, platbu, manipuláciu a časť prevádzky.

## 7. Dodávateľská doprava — Botland a ďalší dodávatelia

Vstupná doprava sa nikdy nesmie ignorovať.

### Povinný postup

- pri každom nákupe použiť skutočnú cenu dopravy z košíka/faktúry,
- dopravu alokovať medzi produkty podľa rozumnej metódy — prednostne podľa hodnoty alebo hmotnosti,
- pri ľahkom homogénnom sortimente je prípustné orientačné percento,
- samostatná dodávateľská objednávka jedného nízkomaržového produktu sa nesmie vytvoriť, ak by landed cost prekročil bezpečný price floor.

### Launch cieľ konsolidácie

Pri dodávateľskej doprave okolo 6,50 EUR je pracovný cieľ konsolidovať nákup približne na **130–150 EUR a viac**, aby vstupná doprava bola približne do 5 % hodnoty nákupu.

Toto nie je pevný limit. Ak skutočná doprava podľa hmotnosti alebo košíka vyjde vyššie, používa sa skutočná hodnota.

## 8. Platobná brána

### GP webpay — pracovné vstupy k 2026-09-09

Podľa verejnej ponuky Global Payments pre menší e-shop:

- obrat do 4 000 EUR mesačne: **10 EUR mesačný poplatok**,
- bežné karty SR/EÚ: **1 %**, 
- podnikateľské a karty mimo EÚ: **2 %**,
- nad 4 000 EUR mesačne verejná ponuka uvádza bez mesačného paušálu a 1 % pre bežné karty SR/EÚ.

**Vždy má prednosť skutočná zmluva KomArena a reálny výpis poplatkov.**

Oficiálny zdroj: https://www.globalpayments.sk/online-platby/gp-webpay

Pri price floor sa pre štandardnú online platbu používa minimálne aktuálna skutočná percentuálna sadzba. Mesačný paušál sa sleduje vo FULLY LOADED MONTHLY RESULT.

## 9. Daň z príjmu — launch rezerva

### Overené vstupy 2026

Pre paušálne výdavky:

- paušálne výdavky: **60 % príjmov**,
- maximálne **20 000 EUR** za rok,
- zaplatené povinné poistné a príspevky sa pri § 6 ods. 1 a 2 môžu uplatniť navyše podľa zákonných pravidiel,
- pri zdaniteľných príjmoch z podnikania do 100 000 EUR je pre rok 2026 sadzba dane z príslušného základu dane **15 %**.

Oficiálne zdroje:

- https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-prijmov/fyzicke-osoby/zivnostnici
- https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-prijmov/fyzicke-osoby/informovanie-dan-prijem-fo

### Operatívna daňová rezerva

Kým je možné použiť plný 60 % paušál a ostatné predpoklady sa nemenia, používa sa pre bezpečný launch pricing **konzervatívna pracovná rezerva 6 % z relevantnej tržby**.

```text
orientacna_rezerva = 40 % * 15 % = 6 % tržby
```

Toto **nie je presný výpočet konečnej dane**. Reálna daň môže byť nižšia alebo vyššia podľa nezdaniteľných častí, zaplateného poistného, iných príjmov, stropu paušálu a ďalších zákonných faktorov.

Pravidlo je zámerne konzervatívne: rezerva sa nesmie minúť ako voľný cash-flow, kým nie je ročná daňová povinnosť známa.

### Kritický trigger

Pri približovaní sa k stropu 20 000 EUR paušálnych výdavkov alebo k príjmom 100 000 EUR sa 6 % model **prestáva automaticky používať** a musí sa vytvoriť nový daňový model.

## 10. Zdravotné a sociálne odvody

Odvody nie sú rovnomerný variabilný náklad každého produktu. Sú mesačná/ročná povinnosť živnosti a musia sa sledovať v BUSINESS BREAK-EVEN.

### Zdravotné — pracovný referenčný vstup 2026

Minimálny preddavok SZČO bez zdravotného postihnutia pre rok 2026 je **121,92 EUR mesačne**.

Oficiálny zdroj: https://www.vszp.sk/platitelia/platenie-poistneho/oznamenia-zmeny/zmeny-od-01-01-2026/

Skutočný osobný preddavok oznámený zdravotnou poisťovňou má vždy prednosť.

### Sociálne — pracovný referenčný vstup 2026

Minimálny vymeriavací základ štandardne povinne poistenej SZČO je v roku 2026 **914,40 EUR** a zodpovedajúce minimálne poistné je **303,11 EUR mesačne**.

Oficiálny zdroj: https://www.socpoist.sk/socialne-poistenie/platenie-poistneho/tabulky-platenia-poistneho/tabulky-platenia-poistneho-od-1-6

Skutočné osobné rozhodnutie/oznámenie Sociálnej poisťovne má vždy prednosť. Neaplikovať 303,11 EUR automaticky na osobu, ktorá je v inom zákonnom režime.

### Ako ich dostať do break-even

Ak má KomArena financovať 100 % odvodov živnosti:

```text
monthly_fixed_insurance = skutocny_mesacny_ZP + skutocny_mesacny_SP
```

Tento náklad sa porovnáva s mesačným order contribution.

Ak je potrebná fully-loaded cena na objednávku:

```text
odvody_na_objednavku = monthly_fixed_insurance / ocakavany_pocet_dokoncenych_objednavok
```

Tento výpočet sa nesmie mechanicky vkladať do každej produktovej ceny bez realistického odhadu počtu objednávok. Pri malom počte objednávok by skreslil cenotvorbu. Preto sa povinne sleduje aj na mesačnom dashboarde.

Ak je KomArena iba jedna z viacerých činností tej istej živnosti, musí byť jasne určené, aká časť fixných odvodov sa alokuje na KomArena. Bez tohto rozhodnutia sa reportujú dva scenáre: **100 % alokácia** a **inkrementálna alokácia**.

## 11. Cena produktu — povinný algoritmus

Pred publikovaním alebo zmenou ceny sa musí vyplniť:

1. aktuálna nákupná cena,
2. dodávateľ a jeho dostupnosť,
3. vstupná doprava alebo jej alokácia,
4. navrhovaná predajná cena,
5. percento platobnej brány,
6. balenie,
7. dotácia dopravy zákazníkovi — štandardne 0 EUR, pretože dopravu platí zákazník,
8. dobierkové riziko, ak relevantné,
9. daňová rezerva,
10. order contribution v EUR,
11. order contribution v %,
12. stav RED / YELLOW / GREEN / HEALTHY,
13. kontrola SK konkurencie,
14. kontrola CZ/PL konkurencie pri produktoch, kde je relevantná,
15. dátum a zdroj nákupnej/konkurenčnej ceny.

Produkt s nejasnou cenou alebo záporným ORDER BREAK-EVEN je `draft` alebo sa neobjedná.

## 12. Košík má prednosť pred izolovaným produktom

KomArena optimalizuje **celú objednávku**, nie iba izolovaný produkt.

Traffic produkt môže mať veľmi nízky contribution, ak:

- nie je sám o sebe záporný po povinných variabilných nákladoch a daňovej rezerve, alebo je jeho záporná hodnota explicitne schválená ako marketingový náklad,
- celý košík je minimálne break-even,
- cross-sell nie je zavádzajúci a odporúčané príslušenstvo je prakticky relevantné.

Bez explicitného marketingového rozhodnutia sa záporný produkt nesmie publikovať ako bežný launch produkt.

## 13. Mesačný no-loss dashboard

Minimálne raz mesačne sa eviduje:

- tržba za tovar,
- príjem za dopravu,
- príjem za dobierku,
- poplatky za malé objednávky,
- COGS / nákup tovaru,
- dodávateľská doprava,
- Packeta a iná outbound doprava,
- GP webpay variabilné poplatky,
- GP webpay mesačný paušál,
- obaly,
- refundácie a reklamácie,
- počet neprevzatých dobierok a ich strata,
- daňová rezerva,
- zdravotné odvody,
- sociálne odvody,
- hosting/pluginy/účtovníctvo,
- ORDER contribution spolu,
- FULLY LOADED monthly result.

Cieľ launch fázy:

```text
FULLY_LOADED_MONTHLY_RESULT >= 0 EUR
```

Ak výsledok klesne pod 0 EUR, ďalšia cenová vlna musí identifikovať, či problém spôsobuje produktová cena, dodávateľská doprava, doprava zdarma, dobierky, payment fee, nízka priemerná hodnota košíka alebo fixné náklady.

## 14. Pravidlo aktualizácie

Všetky finančné vstupy sú verziované.

Pred použitím v ďalšom kalendárnom roku alebo po zmene cenníka treba znovu overiť:

- daňové sadzby a limity,
- paušálne výdavky,
- zdravotné odvody,
- sociálne odvody,
- DPH režim KomArena,
- Packeta cenník a príplatky,
- GP webpay zmluvu/cenník,
- Botland a ďalších dodávateľov,
- skutočnú mieru neprevzatých dobierok.

Pri rozpore medzi týmto dokumentom a aktuálnou zmluvou, faktúrou, rozhodnutím poisťovne alebo zákonom má prednosť aktuálny overený údaj a dokument sa musí aktualizovať.

## 15. Záväzné použitie pre ďalšie úlohy

Tento dokument sa musí použiť pri:

- nastavovaní alebo kontrole ceny produktu,
- importe produktov od Botlandu alebo iného dodávateľa,
- hodnotení 12 % maržového pravidla,
- návrhu dopravy zdarma,
- nastavovaní dobierky,
- vyhodnotení SK/CZ/PL konkurencie,
- kalkulácii akcie alebo zľavy,
- rozhodnutí, či produkt publikovať, skryť alebo neobjednať,
- mesačnom vyhodnotení profitability KomArena.

Pri každej cenovej odpovedi sa má uviesť minimálne:

```text
Nákup:
Predaj:
Produktová marža EUR / %:
Landed cost:
Variabilné náklady:
Daňová rezerva:
Order contribution EUR / %:
Stav:
Minimálna no-loss cena:
Odporúčaná cena podľa konkurencie:
Otvorené body:
```

Tento formát je nový zdroj pravdy pre launch ekonomiku KomArena.sk.
