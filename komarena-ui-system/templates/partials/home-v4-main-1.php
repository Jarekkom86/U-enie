<main id="main-content">
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-shell">
        <picture class="hero-media">
          <img src="<?php echo esc_url($ka_images['hero']); ?>" width="1600" height="1067" alt="Moderná obývačka s inteligentným osvetlením a smart domácnosťou" fetchpriority="high" decoding="async">
        </picture>

        <div class="hero-content">
          <span class="eyebrow">Produkty · návody · odborný servis</span>
          <h1 id="hero-title">Smart domácnosť, ktorá <span>funguje aj bez hádania.</span></h1>
          <p class="lead">Vyberieme kompatibilné zariadenia pre Home Assistant, ESPHome, Zigbee, Thread a Matter. Keď už niečo nefunguje, ReSmart nájde príčinu a navrhne riešenie.</p>

          <div class="hero-actions">
            <a class="btn btn-primary" href="<?php echo esc_url($ka_shop_url); ?>">Prezrieť overené produkty</a>
            <a class="btn btn-ghost" href="<?php echo esc_url($ka_resmart_service_url); ?>">Vyriešiť problém cez ReSmart</a>
          </div>

          <form class="hero-search" role="search" action="<?php echo esc_url($ka_shop_url); ?>" method="get">
            <label for="product-search">Vyhľadať produkt alebo riešenie</label>
            <input id="product-search" name="s" type="search" placeholder="Napríklad Home Assistant Green, ESP32, Zigbee…" autocomplete="off">
            <input type="hidden" name="post_type" value="product">
            <button type="submit">Vyhľadať</button>
          </form>

          <div class="hero-proof" aria-label="Hlavné výhody">
            <span><i class="check">✓</i> Kompatibilita vysvetlená ľudsky</span>
            <span><i class="check">✓</i> Lokálne a bezpečné riešenia</span>
            <span><i class="check">✓</i> Servis dostupný aj po nákupe</span>
          </div>
        </div>

        <aside class="hero-card" aria-label="Ukážka smart domácnosti">
          <div class="hero-card-top">
            <strong>Domácnosť pod kontrolou</strong>
            <span class="status">Lokálne</span>
          </div>
          <div class="scenario-list">
            <div class="scenario"><span><i></i> Večerné osvetlenie</span><b>Zapnuté</b></div>
            <div class="scenario"><span><i></i> Vstupné dvere</span><b>Zamknuté</b></div>
            <div class="scenario"><span><i></i> Spotreba energie</span><b>Meraná</b></div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="trust" aria-label="Prečo nakupovať v KomArena">
    <div class="container trust-grid">
      <div class="trust-item">
        <span class="trust-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3 7 3v5c0 5-3.5 8.2-7 10-3.5-1.8-7-5-7-10V6l7-3Z"></path><path d="m9 12 2 2 4-4"></path></svg></span>
        <div><strong>Overená kompatibilita</strong><small>Pred nákupom viete, čo s čím funguje.</small></div>
      </div>
      <div class="trust-item">
        <span class="trust-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path><path d="M8 21h8M12 17v4"></path></svg></span>
        <div><strong>Home Assistant prax</strong><small>Produkty posudzujeme v reálnych scenároch.</small></div>
      </div>
      <div class="trust-item">
        <span class="trust-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6l-5.4 5.4 3 3 5.4-5.4a4 4 0 0 0 5.6-5.6l-2.3 2.3-3-3 2.3-2.3Z"></path></svg></span>
        <div><strong>ReSmart servis</strong><small>Diagnostika a oprava, keď technika zlyhá.</small></div>
      </div>
      <div class="trust-item">
        <span class="trust-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h16M12 4v16"></path><circle cx="12" cy="12" r="9"></circle></svg></span>
        <div><strong>Návody bez marketingovej hmly</strong><small>Praktické vysvetlenia pre začiatočníkov aj pokročilých.</small></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="paths-title">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Vyberte si podľa cieľa</span>
          <h2 id="paths-title">Začnite riešením, nie zoznamom produktov.</h2>
        </div>
        <p>Každá oblasť spája vhodné zariadenia, kompatibilitu, návody a servis. Zákazník sa dostane k výsledku bez zbytočného blúdenia.</p>
      </div>

      <div class="path-grid">
        <a class="path-card large" href="<?php echo esc_url(home_url('/home-assistant/')); ?>">
          <span class="card-media"><img src="<?php echo esc_url($ka_images['home_assistant']); ?>" width="1200" height="900" loading="lazy" decoding="async" alt="Moderná domácnosť ovládaná cez Home Assistant"></span>
          <div class="card-bottom">
            <span class="tag">Centrum smart domácnosti</span>
            <h3>Home Assistant</h3>
            <p>Lokálne riadenie, automatizácie, Zigbee, Thread, Matter a prehľadná cesta od prvého hubu po pokročilý systém.</p>
          </div>
        </a>

        <a class="path-card medium" href="<?php echo esc_url(home_url('/esp-esphome/')); ?>">
          <span class="path-symbol"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"></rect><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"></path></svg></span>
          <div><h3>ESPHome a ESP32</h3><p>Vlastné senzory, meranie, relé a lokálne projekty s jasným zapojením.</p></div>
          <span class="text-link">Prejsť do ESPHome <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
        </a>

        <a class="path-card medium" href="<?php echo esc_url(home_url('/protokoly-a-integracie/')); ?>">
          <span class="path-symbol"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01"></path></svg></span>
          <div><h3>Zigbee, Thread a Matter</h3><p>Rozdiely, kompatibilita a výber protokolu bez zbytočného chaosu.</p></div>
          <span class="text-link">Porovnať protokoly <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
        </a>

        <a class="path-card medium" href="<?php echo esc_url($ka_shop_url); ?>">
          <span class="path-symbol"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9h18l-1 11H4L3 9Z"></path><path d="M8 9a4 4 0 0 1 8 0"></path></svg></span>
          <div><h3>Overený obchod</h3><p>Huby, senzory, napájanie, ESP moduly a príslušenstvo so servisným kontextom.</p></div>
          <span class="text-link">Otvoriť obchod <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
        </a>

        <article class="path-card wide">
          <div class="wide-copy">
            <span class="eyebrow" style="color:#7fe4d7">Neviete, kde začať?</span>
            <h3>Popíšte byt, dom alebo problém. Nasmerujeme vás.</h3>
            <p>Krátke zadanie stačí na to, aby sme odporučili produkt, návod alebo ReSmart servis.</p>
            <a class="btn btn-primary" href="<?php echo esc_url(home_url('/kontakt/')); ?>">Chcem odporúčanie</a>
          </div>
          <div class="wide-visual"><img src="<?php echo esc_url($ka_images['guidance']); ?>" width="900" height="600" loading="lazy" decoding="async" alt="Smart home zariadenia a senzory v modernej domácnosti"></div>
        </article>
      </div>
    </div>
  </section>
