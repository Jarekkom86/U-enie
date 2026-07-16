
<a class="skip-link" href="#main-content">Preskočiť na hlavný obsah</a>

<div class="utility" aria-label="Rýchle informácie">
  <div class="container">
    <div class="utility-list">
      <span><strong>KomArena</strong> smart domácnosť bez chaosu</span>
      <span>Overená kompatibilita pred nákupom</span>
      <span>ReSmart servis po celom Slovensku</span>
    </div>
    <a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Potrebujete poradiť? Kontaktujte nás →</a>
  </div>
</div>

<header class="site-header" id="top">
  <div class="container nav">
    <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="KomArena – domov">
      <span class="brand-mark" aria-hidden="true">K</span>
      <span class="brand-copy">KomArena<small>Smart home studio</small></span>
    </a>

    <nav class="desktop-nav" aria-label="Hlavná navigácia">
      <a href="<?php echo esc_url($ka_shop_url); ?>">Obchod</a>
      <a href="<?php echo esc_url(home_url('/home-assistant/')); ?>">Home Assistant</a>
      <a href="<?php echo esc_url(home_url('/esp-esphome/')); ?>">ESPHome</a>
      <a href="<?php echo esc_url(home_url('/resmart/')); ?>">ReSmart servis</a>
      <a href="<?php echo esc_url(home_url('/navody/')); ?>">Návody</a>
      <a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Kontakt</a>
    </nav>

    <div class="nav-actions">
      <a class="icon-btn" href="<?php echo esc_url($ka_shop_url); ?>" aria-label="Vyhľadať produkt">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.4-3.4"></path></svg>
      </a>
      <a class="icon-btn cart-btn" href="<?php echo esc_url($ka_cart_url); ?>" aria-label="<?php echo esc_attr(sprintf(__('Košík, %d položiek', 'komarena-ui-system'), $ka_cart_count)); ?>">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3h2l2.3 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>
        <span class="cart-count"><?php echo esc_html((string) $ka_cart_count); ?></span>
      </a>
      <a class="btn btn-primary" href="<?php echo esc_url($ka_resmart_service_url); ?>">Potrebujem servis</a>
    </div>

    <details class="mobile-menu">
      <summary class="icon-btn" aria-label="Otvoriť menu">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
      </summary>
      <nav class="mobile-panel" aria-label="Mobilná navigácia">
        <a href="<?php echo esc_url($ka_shop_url); ?>">Obchod</a>
        <a href="<?php echo esc_url(home_url('/home-assistant/')); ?>">Home Assistant</a>
        <a href="<?php echo esc_url(home_url('/esp-esphome/')); ?>">ESPHome</a>
        <a href="<?php echo esc_url(home_url('/resmart/')); ?>">ReSmart servis</a>
        <a href="<?php echo esc_url(home_url('/navody/')); ?>">Návody</a>
        <a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Kontakt</a>
      </nav>
    </details>
  </div>
</header>
