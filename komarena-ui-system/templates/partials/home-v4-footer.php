<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="KomArena – domov"><span class="brand-mark" aria-hidden="true">K</span><span class="brand-copy">KomArena<small style="color:#86a7ab">Smart home studio</small></span></a>
        <p class="footer-about">Overené produkty, praktické návody a ReSmart servis pre Home Assistant, ESPHome a modernú smart domácnosť.</p>
      </div>
      <div><h4>Obchod</h4><nav class="footer-links" aria-label="Obchod"><a href="<?php echo esc_url(home_url('/home-assistant/')); ?>">Home Assistant</a><a href="<?php echo esc_url(home_url('/esp-esphome/')); ?>">ESPHome</a><a href="<?php echo esc_url(home_url('/senzory/')); ?>">Senzory</a><a href="<?php echo esc_url(home_url('/napajanie/')); ?>">Napájanie</a><a href="<?php echo esc_url($ka_shop_url); ?>">Všetky produkty</a></nav></div>
      <div><h4>Pomoc a servis</h4><nav class="footer-links" aria-label="Pomoc"><a href="<?php echo esc_url($ka_resmart_service_url); ?>">ReSmart servis</a><a href="<?php echo esc_url(home_url('/navody/')); ?>">Návody</a><a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Kontakt</a><a href="<?php echo esc_url(home_url('/reklamacie-a-vratenie/')); ?>">Reklamácie</a><a href="<?php echo esc_url(home_url('/doprava-a-platba/')); ?>">Doprava a platba</a></nav></div>
      <div><h4>Informácie</h4><nav class="footer-links" aria-label="Informácie"><a href="<?php echo esc_url(home_url('/o-nas/')); ?>">O nás</a><a href="<?php echo esc_url(home_url('/ochrana-osobnych-udajov/')); ?>">Ochrana údajov</a><a href="<?php echo esc_url(home_url('/obchodne-podmienky/')); ?>">Obchodné podmienky</a><a href="<?php echo esc_url(home_url('/cookies/')); ?>">Cookies</a></nav></div>
    </div>
    <div class="footer-bottom"><span>© <?php echo esc_html(wp_date('Y')); ?> KomArena.sk</span><span>KomArena UI System · SEO + výkon + predaj</span></div>
  </div>
</footer>

<div class="mobile-cta" aria-label="Rýchle akcie">
  <a class="btn btn-light" href="<?php echo esc_url($ka_shop_url); ?>">Obchod</a>
  <a class="btn btn-primary" href="<?php echo esc_url($ka_resmart_service_url); ?>">Potrebujem servis</a>
</div>
