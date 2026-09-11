<!-- markdownlint-disable MD013 -->

# Legacy rewrite — post 1971 — HC-SR04 s Arduino UNO

- **Status:** needs-review / do-not-publish
- **Existujúci post ID:** 1971
- **Existujúca URL:** https://komarena.sk/zapojenie-a-pouzitie-ultrazvukoveho-senzora-hc-%e2%80%91-sr04-s-arduinom/
- **Primárna kategória:** Návody a projekty
- **Focus keyword:** HC-SR04 Arduino návod

## Navrhovaný titulok

HC-SR04 s Arduino UNO: zapojenie, meranie vzdialenosti a časté chyby

## SEO title

HC-SR04 + Arduino UNO: zapojenie a meranie vzdialenosti

## Meta description

Praktický návod na HC-SR04 s Arduino UNO: zapojenie VCC/TRIG/ECHO/GND, ukážkový kód, limity merania a rozdiel oproti použitiu s ESP32.

## Čo opravujeme oproti publikovanej verzii

- jazykové chyby a poškodené slová,
- tvrdenie „presnosť na milimetre“ nahradiť opatrným vysvetlením datasheetovej/typickej presnosti a reálnych podmienok,
- výpočet vzdialenosti vysvetliť správne ako polovicu času letu × rýchlosť zvuku,
- oddeliť 5 V Arduino UNO zapojenie od 3,3 V ESP32 sveta,
- doplniť produktový a ESPHome most na aktuálny katalóg,
- neodporúčať meranie kvapaliny bez upozornenia na prostredie, kondenzáciu a nevodeodolnosť bežného HC-SR04.

## H1

HC-SR04 s Arduino UNO: jednoduché ultrazvukové meranie vzdialenosti

## Úvod

HC-SR04 je lacný ultrazvukový modul, ktorý meria čas letu zvukového impulzu k objektu a späť. Je vhodný na výučbu, robotiku, približovacie indikátory a ďalšie hobby projekty, pri ktorých netreba bezpečnostne certifikované meranie.

Bežná dokumentácia modulu uvádza približný rozsah 2 až 400 cm. Reálny výsledok však závisí od tvaru, uhla a materiálu cieľa, teploty, akustického prostredia aj konkrétneho kusu senzora.

## Čo budete potrebovať

- Arduino UNO alebo kompatibilnú 5 V dosku,
- HC-SR04,
- prepojovacie vodiče,
- dátový USB kábel,
- Arduino IDE alebo kompatibilné vývojové prostredie.

## Piny HC-SR04

- **VCC** — napájanie modulu,
- **TRIG** — vstup na spustenie merania,
- **ECHO** — výstupný impulz, ktorého dĺžka reprezentuje čas letu,
- **GND** — spoločná zem.

## Zapojenie s Arduino UNO

Pre klasické Arduino UNO Rev3 s 5 V logikou možno použiť napríklad:

```text
HC-SR04        Arduino UNO
VCC         -> 5V
TRIG        -> D9
ECHO        -> D10
GND         -> GND
```

D9 a D10 sú iba príklad. V programe možno zvoliť iné vhodné digitálne piny.

## Ukážkový kód

```cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000UL);

  if (duration == 0) {
    Serial.println("Bez platného odrazu");
  } else {
    float distanceCm = (duration * 0.0343f) / 2.0f;
    Serial.print("Vzdialenosť: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");
  }

  delay(500);
}
```

Timeout v `pulseIn()` zabraňuje tomu, aby program pri chýbajúcom odraze čakal neprimerane dlho.

## Prečo sa čas delí dvomi

Meraný interval zahŕňa cestu zvuku **od senzora k objektu aj späť**. Vzdialenosť k objektu je preto polovica celkovej dráhy.

Modelový výpočet používa približne 0,0343 cm/µs pri izbových podmienkach. Rýchlosť zvuku sa mení najmä s teplotou, takže presné meranie potrebuje viac než jednu konštantu v ukážkovom kóde.

## Čo ovplyvňuje výsledok

### Uhol povrchu

Šikmý povrch môže odraziť impulz mimo prijímača.

### Mäkký alebo porézny materiál

Textílie a materiály pohlcujúce zvuk môžu znižovať kvalitu odrazu.

### Veľmi malý cieľ

Úzky predmet nemusí vrátiť dostatok energie späť k senzoru.

### Teplota a prúdenie vzduchu

Menia rýchlosť zvuku a tým aj absolútnu presnosť výpočtu.

## Dôležitý rozdiel: Arduino UNO vs ESP32

Klasické Arduino UNO Rev3 používa 5 V prevádzkové napätie a digitálnu logiku. ESP32 používa 3,3 V GPIO.

Pri bežnom HC-SR04 môže byť signál ECHO približne 5 V. Preto ho pri ESP32/ESP8266 **neveďte priamo do 3,3 V GPIO**; použite vhodné prispôsobenie logickej úrovne, napríklad správne navrhnutý delič alebo level shifter.

Tento článok zostáva Arduino UNO návodom. Moderný ESPHome variant má byť samostatný článok s presným bezpečným zapojením.

## Projekty

- jednoduchý robot s detekciou prekážky,
- parkovací/približovací indikátor,
- meranie vzdialenosti k pevnému povrchu,
- orientačné sledovanie úrovne v suchej aplikácii, ak je elektronika chránená a materiál spoľahlivo odráža ultrazvuk.

Bežný HC-SR04 nie je vodotesný; nepoužívať ho bez ďalšieho návrhu v mokrom alebo kondenzačnom prostredí.

## KomArena prepojenie

- HC-SR04 produkt: https://komarena.sk/produkt/hc-sr04-ultrazvukovy-senzor-esphome/
- ESP32 DevKit V1: https://komarena.sk/produkt/esp32-devkit-v1-wi-fi-bluetooth-iot-vyvojova-doska/
- ESP & ESPHome: https://komarena.sk/esp-esphome/
- Senzory: https://komarena.sk/senzory/

K 11. 9. 2026 je HC-SR04 na KomArena skladom; pred publikovaním rewrite stav znovu overiť.

## Zdroje a overenie

- HC-SR04 technická referencia použitá aj na aktuálnej produktovej stránke: https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf
- Arduino UNO Rev3 official specs: https://store.arduino.cc/products/arduino-uno-rev3
- ESPHome Ultrasonic Sensor pre budúci ESP32 článok: https://esphome.io/components/sensor/ultrasonic/

## Migračný checklist

- [ ] zachovať URL alebo nastaviť redirect, ak sa slug niekedy zmení,
- [ ] opraviť všetky jazykové chyby,
- [ ] odstrániť nekvalifikované tvrdenie o milimetrovej presnosti,
- [ ] doplniť `pulseIn()` timeout,
- [ ] jasne oddeliť Arduino UNO 5 V od ESP32 3,3 V,
- [ ] doplniť interný odkaz na produkt HC-SR04 a ESPHome hub,
- [ ] nastaviť SEO title/meta/focus keyword,
- [ ] zachovať relevantné existujúce tagy,
- [ ] vizuálne overiť code blocks na mobile.
