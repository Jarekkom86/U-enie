<section class="section products" aria-labelledby="products-title">
  <div class="container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Odporúčané produkty</span>
        <h2 id="products-title">Technika, pri ktorej poznáte dôvod výberu.</h2>
      </div>
      <p>Produkty sa načítajú priamo z publikovaných WooCommerce dát. Cena, obrázok, dostupnosť aj odkaz preto zostávajú na jednom autoritatívnom mieste.</p>
    </div>
    <div class="product-toolbar">
      <div class="filters" aria-label="Kategórie produktov">
        <a class="chip active" href="<?php echo esc_url($ka_shop_url); ?>">Odporúčané</a>
        <a class="chip" href="<?php echo esc_url(home_url('/home-assistant/')); ?>">Home Assistant</a>
        <a class="chip" href="<?php echo esc_url(home_url('/protokoly-a-integracie/')); ?>">Zigbee</a>
        <a class="chip" href="<?php echo esc_url(home_url('/esp-esphome/')); ?>">ESPHome</a>
        <a class="chip" href="<?php echo esc_url(home_url('/napajanie/')); ?>">Napájanie</a>
      </div>
      <a class="text-link" href="<?php echo esc_url($ka_shop_url); ?>">Všetky produkty <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </div>
    <?php if (!empty($ka_products)) : ?>
      <div class="product-grid">
        <?php foreach ($ka_products as $ka_product) :
          $ka_product_url = get_permalink($ka_product->get_id());
          $ka_categories = wc_get_product_category_list($ka_product->get_id(), ', ');
          $ka_stock_text = $ka_product->is_in_stock() ? __('Skladom', 'komarena-ui-system') : __('Na objednávku', 'komarena-ui-system');
        ?>
          <article class="product-card">
            <a class="product-media" href="<?php echo esc_url($ka_product_url); ?>">
              <span class="product-badge"><?php echo esc_html($ka_stock_text); ?></span>
              <?php echo wp_kses_post($ka_product->get_image('woocommerce_thumbnail', array('loading' => 'lazy', 'decoding' => 'async'))); ?>
            </a>
            <div class="product-content">
              <span class="product-kicker"><?php echo wp_kses_post($ka_categories ?: __('KomArena výber', 'komarena-ui-system')); ?></span>
              <h3><a href="<?php echo esc_url($ka_product_url); ?>"><?php echo esc_html($ka_product->get_name()); ?></a></h3>
              <?php if ($ka_product->get_short_description()) : ?>
                <p><?php echo wp_kses_post(wp_trim_words(wp_strip_all_tags($ka_product->get_short_description()), 22)); ?></p>
              <?php endif; ?>
              <div class="product-footer">
                <strong class="product-price"><?php echo wp_kses_post($ka_product->get_price_html()); ?></strong>
                <a href="<?php echo esc_url($ka_product_url); ?>">Detail produktu →</a>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
        <?php if (3 === count($ka_products)) : ?>
          <article class="product-card product-fallback">
            <div class="product-content">
              <span class="product-kicker">Celý sortiment</span>
              <h3><a href="<?php echo esc_url($ka_shop_url); ?>">Všetky produkty</a></h3>
              <p>Prezrite si aktuálne publikovaný sortiment a vyberte si podľa svojho projektu.</p>
              <div class="product-footer"><a href="<?php echo esc_url($ka_shop_url); ?>">Otvoriť obchod →</a></div>
            </div>
          </article>
        <?php endif; ?>
      </div>
    <?php else : ?>
      <div class="product-grid product-grid-fallback">
        <a class="product-card product-fallback" href="<?php echo esc_url(home_url('/home-assistant/')); ?>"><div class="product-content"><span class="product-kicker">Lokálne centrum</span><h3>Home Assistant</h3><p>Huby, koordinátory a príslušenstvo pre stabilný základ smart domácnosti.</p><span class="text-link">Otvoriť kategóriu →</span></div></a>
        <a class="product-card product-fallback" href="<?php echo esc_url(home_url('/esp-esphome/')); ?>"><div class="product-content"><span class="product-kicker">Vlastné projekty</span><h3>ESPHome</h3><p>ESP32, senzory, relé a napájanie pre lokálne automatizácie.</p><span class="text-link">Otvoriť kategóriu →</span></div></a>
        <a class="product-card product-fallback" href="<?php echo esc_url(home_url('/protokoly-a-integracie/')); ?>"><div class="product-content"><span class="product-kicker">Bezdrôtová sieť</span><h3>Zigbee</h3><p>Koordinátory, senzory a zariadenia s vysvetlenou kompatibilitou.</p><span class="text-link">Otvoriť kategóriu →</span></div></a>
        <a class="product-card product-fallback" href="<?php echo esc_url($ka_resmart_service_url); ?>"><div class="product-content"><span class="product-kicker">Servis dostupný</span><h3>ReSmart</h3><p>Diagnostika a oprava, keď smart zariadenie nefunguje podľa očakávania.</p><span class="text-link">Otvoriť servis →</span></div></a>
      </div>
    <?php endif; ?>
  </div>
</section>

  <section class="section" aria-labelledby="difference-title">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Prečo KomArena</span>
          <h2 id="difference-title">Predaj nekončí tlačidlom „Pridať do košíka“.</h2>
        </div>
        <p>Najvyššiu dôveru vytvorí kombinácia správneho produktu, praktického návodu a dostupného servisu. To je hlavná konkurenčná výhoda KomArena.</p>
      </div>

      <div class="difference-grid">
        <div class="difference-visual">
          <img src="<?php echo esc_url($ka_images['diagnostics']); ?>" width="1000" height="1200" loading="lazy" decoding="async" alt="Technická diagnostika smart zariadenia na pracovnom stole">
          <div class="difference-caption"><span class="eyebrow" style="color:#8de9dc">Praktická skúsenosť</span><h3>Technológiu nielen predávame. Vieme ju aj diagnostikovať.</h3></div>
        </div>
        <div class="difference-list">
          <article class="difference-item"><span class="difference-number">01</span><div><h3>Kompatibilita pred nákupom</h3><p>Na produktovej stránke bude jasne uvedené, s čím zariadenie funguje, čo potrebuje a kde sú limity.</p></div></article>
          <article class="difference-item"><span class="difference-number">02</span><div><h3>Praktický blok „Čo s tým postavíte“</h3><p>Každá kategória a produkt ukáže konkrétne použitie, nie iba parametre skopírované od výrobcu.</p></div></article>
          <article class="difference-item"><span class="difference-number">03</span><div><h3>Návody priamo pri produkte</h3><p>Interné prepojenie medzi produktmi, kategóriami a návodmi pomáha zákazníkovi aj vyhľadávaču pochopiť súvislosti.</p></div></article>
          <article class="difference-item"><span class="difference-number">04</span><div><h3>ReSmart servis po nákupe</h3><p>Keď zariadenie nefunguje, zákazník nemusí začínať od nuly. Dostane diagnostiku a ďalší bezpečný krok.</p></div></article>
        </div>
      </div>
    </div>
  </section>

  <section class="resmart" aria-labelledby="resmart-title">
    <div class="container">
      <div class="resmart-shell">
        <div class="resmart-grid">
          <div class="resmart-image"><img src="<?php echo esc_url($ka_images['resmart']); ?>" width="1100" height="1100" loading="lazy" decoding="async" alt="ReSmart diagnostika smart zámku a elektroniky"></div>
          <div class="resmart-copy">
            <span class="eyebrow">ReSmart by KomArena</span>
            <h2 id="resmart-title">Keď smart domácnosť prestane byť smart.</h2>
            <p>Najprv zistíme príčinu. Potom odporučíme opravu, nastavenie, kompatibilnú náhradu alebo presný ďalší postup. Bez posielania hesiel a bez neoverených zásahov.</p>

            <div class="service-grid" aria-label="Servisné oblasti">
              <div class="service-item"><span>1</span>Aqara a smart zámky</div>
              <div class="service-item"><span>2</span>Home Assistant</div>
              <div class="service-item"><span>3</span>Huby a senzory</div>
              <div class="service-item"><span>4</span>Zigbee, Thread a Matter</div>
              <div class="service-item"><span>5</span>ESPHome a lokálne projekty</div>
              <div class="service-item"><span>6</span>Neznámy smart-home problém</div>
            </div>

            <div class="resmart-proof">
              <span><i class="check">✓</i> Najprv diagnostika</span>
              <span><i class="check">✓</i> Jasný návrh ďalšieho kroku</span>
              <span><i class="check">✓</i> Bez zdieľania hesiel</span>
            </div>

            <a class="btn btn-primary" href="<?php echo esc_url($ka_resmart_service_url); ?>">Odoslať servisný dopyt</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-tight" aria-labelledby="process-title">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Jednoduchý proces</span><h2 id="process-title">Od otázky k funkčnému riešeniu.</h2></div>
        <p>Každá cesta má jasný ďalší krok. Menej neistoty znamená vyššiu dôveru a jednoduchšie rozhodnutie.</p>
      </div>
      <div class="steps">
        <article class="step"><span class="step-number">KROK 01</span><h3>Popíšete cieľ alebo problém</h3><p>Čo chcete automatizovať, aké zariadenie máte a čo sa práve deje.</p></article>
        <article class="step"><span class="step-number">KROK 02</span><h3>Dostanete vhodnú cestu</h3><p>Produkt, kategóriu, návod alebo servisný postup podľa reálnej potreby.</p></article>
        <article class="step"><span class="step-number">KROK 03</span><h3>Riešenie zostáva rozšíriteľné</h3><p>Uprednostňujeme lokálne, bezpečné a servisovateľné riešenia bez slepých uličiek.</p></article>
      </div>
    </div>
  </section>

  <section class="section guides" aria-labelledby="guides-title">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Návody a porovnania</span><h2 id="guides-title">Obsah, ktorý privádza návštevníkov a pomáha im rozhodnúť sa.</h2></div>
        <p>Návody tvoria tematické SEO klastre. Každý článok odkazuje na súvisiacu kategóriu, produkty a servis, pričom zostáva užitočný aj bez nákupu.</p>
      </div>

      <div class="guide-grid">
        <article class="guide-card">
          <a class="guide-media" href="<?php echo esc_url(home_url('/ako-zacat-s-home-assistant/')); ?>"><img src="<?php echo esc_url($ka_images['guide_home_assistant']); ?>" width="1200" height="800" loading="lazy" decoding="async" alt="Začiatok s Home Assistant v modernej domácnosti"></a>
          <div class="guide-body"><span class="guide-label">Hlavný sprievodca</span><h3><a href="<?php echo esc_url(home_url('/ako-zacat-s-home-assistant/')); ?>">Ako začať s Home Assistant bez zbytočných chýb</a></h3><p>Hardvér, Zigbee koordinátor, zálohy, sieť a bezpečný vzdialený prístup krok za krokom.</p></div>
        </article>
        <article class="guide-card">
          <a class="guide-media" href="<?php echo esc_url(home_url('/ako-vybrat-smart-integraciu/')); ?>"><img src="<?php echo esc_url($ka_images['guide_protocols']); ?>" width="800" height="600" loading="lazy" decoding="async" alt="Porovnanie bezdrôtových protokolov smart domácnosti"></a>
          <div class="guide-body"><span class="guide-label">Kompatibilita</span><h3><a href="<?php echo esc_url(home_url('/ako-vybrat-smart-integraciu/')); ?>">Ako vybrať smart integráciu</a></h3><p>Ako vybrať protokol a integráciu podľa zariadenia, stability a budúceho rozšírenia.</p></div>
        </article>
        <article class="guide-card">
          <a class="guide-media" href="<?php echo esc_url(home_url('/esphome-od-zakladov/')); ?>"><img src="<?php echo esc_url($ka_images['guide_esphome']); ?>" width="800" height="600" loading="lazy" decoding="async" alt="Výber ESP32 dosky pre ESPHome"></a>
          <div class="guide-body"><span class="guide-label">ESPHome</span><h3><a href="<?php echo esc_url(home_url('/esphome-od-zakladov/')); ?>">ESPHome od základov</a></h3><p>Prvý bezpečný projekt, výber dosky, napájanie, senzor a integrácia do Home Assistantu.</p></div>
        </article>
      </div>
    </div>
  </section>

  <section class="contact" aria-labelledby="contact-title">
  <div class="container">
    <div class="contact-shell">
      <div class="contact-copy">
        <span class="eyebrow">Jedna otázka stačí</span>
        <h2 id="contact-title">Čo chcete vyriešiť?</h2>
        <p>Napíšte stručne svoj cieľ alebo problém. Nasmerujeme vás do obchodu, k vhodnému návodu alebo do ReSmart servisu.</p>
        <div class="contact-points">
          <span><i class="check" style="background:#fff;color:var(--teal-dark)">✓</i> Bez zbytočného technického slovníka</span>
          <span><i class="check" style="background:#fff;color:var(--teal-dark)">✓</i> Bez posielania hesiel alebo prístupov</span>
          <span><i class="check" style="background:#fff;color:var(--teal-dark)">✓</i> Jasný ďalší krok</span>
        </div>
      </div>
      <div class="contact-form contact-choice" aria-label="Možnosti kontaktu">
        <h3>Vyberte najbližšiu cestu</h3>
        <p class="muted">Každé tlačidlo vedie na samostatnú indexovateľnú stránku s jasným ďalším krokom.</p>
        <a class="btn btn-dark" href="<?php echo esc_url(home_url('/kontakt/')); ?>">Chcem odporúčanie produktu</a>
        <a class="btn btn-primary" href="<?php echo esc_url($ka_resmart_service_url); ?>">Potrebujem ReSmart servis</a>
        <a class="text-link" href="<?php echo esc_url(home_url('/navody/')); ?>">Najprv si pozriem návody →</a>
      </div>
    </div>
  </div>
</section>
</main>
