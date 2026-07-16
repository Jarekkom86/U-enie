<?php
/**
 * Template Name: KomArena Homepage v4
 * Template Post Type: page
 *
 * Staging-first full-width homepage template.
 *
 * @package KomArena_UI_System
 */

if (!defined('ABSPATH')) {
    exit;
}

$ka_cart_count = 0;
$ka_cart_url = home_url('/kosik/');
if (function_exists('WC') && WC()->cart) {
    $ka_cart_count = (int) WC()->cart->get_cart_contents_count();
}
if (function_exists('wc_get_cart_url')) {
    $ka_cart_url = wc_get_cart_url();
}

$ka_products = array();
if (function_exists('wc_get_products')) {
    $ka_product_ids = array_filter(array_map('absint', (array) apply_filters('komarena_home_v4_product_ids', array())));
    if ($ka_product_ids) {
        foreach ($ka_product_ids as $ka_product_id) {
            $ka_product = wc_get_product($ka_product_id);
            if ($ka_product && 'publish' === get_post_status($ka_product_id)) {
                $ka_products[] = $ka_product;
            }
            if (4 <= count($ka_products)) {
                break;
            }
        }
    } else {
        $ka_products = wc_get_products(array(
            'status' => 'publish',
            'limit' => 4,
            'featured' => true,
            'stock_status' => 'instock',
            'orderby' => 'date',
            'order' => 'DESC',
        ));
        if (!$ka_products) {
            $ka_products = wc_get_products(array(
                'status' => 'publish',
                'limit' => 4,
                'stock_status' => 'instock',
                'orderby' => 'date',
                'order' => 'DESC',
            ));
        }
    }
}

$ka_image_defaults = array(
    'hero' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=82',
    'home_assistant' => 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=78',
    'guidance' => 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=76',
    'diagnostics' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=78',
    'resmart' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1100&q=78',
    'guide_home_assistant' => 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=76',
    'guide_protocols' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=74',
    'guide_esphome' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=74',
);
$ka_images = (array) apply_filters('komarena_home_v4_images', $ka_image_defaults);

$ka_schema = array(
    '@context' => 'https://schema.org',
    '@graph' => array(
        array(
            '@type' => 'OnlineStore',
            '@id' => home_url('/#organization'),
            'name' => get_bloginfo('name') ?: 'KomArena',
            'url' => home_url('/'),
            'description' => 'Overené produkty, návody a servis pre smart domácnosť, Home Assistant a ESPHome.',
            'areaServed' => array('@type' => 'Country', 'name' => 'Slovensko'),
        ),
        array(
            '@type' => 'WebSite',
            '@id' => home_url('/#website'),
            'url' => home_url('/'),
            'name' => get_bloginfo('name') ?: 'KomArena',
            'inLanguage' => 'sk-SK',
            'publisher' => array('@id' => home_url('/#organization')),
            'potentialAction' => array(
                '@type' => 'SearchAction',
                'target' => home_url('/?s={search_term_string}&post_type=product'),
                'query-input' => 'required name=search_term_string',
            ),
        ),
        array(
            '@type' => 'Service',
            '@id' => home_url('/resmart/#service'),
            'name' => 'ReSmart servis smart domácnosti',
            'url' => home_url('/resmart/'),
            'provider' => array('@id' => home_url('/#organization')),
            'areaServed' => array('@type' => 'Country', 'name' => 'Slovensko'),
            'serviceType' => array('Diagnostika smart domácnosti', 'Servis Aqara a smart zámkov', 'Home Assistant servis', 'Zigbee, Thread a Matter diagnostika', 'ESPHome servis'),
        ),
    ),
);
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="description" content="Overené smart-home produkty, Home Assistant, ESPHome, Zigbee a Matter na jednom mieste. KomArena poradí s výberom a ReSmart vyrieši diagnostiku aj servis.">
  <meta name="theme-color" content="#f6faf9">
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="preload" as="image" fetchpriority="high" href="<?php echo esc_url($ka_images['hero']); ?>">
  <script type="application/ld+json"><?php echo wp_json_encode($ka_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?></script>
  <?php wp_head(); ?>
</head>
<body <?php body_class('ka-home-v4'); ?>>
<?php wp_body_open(); ?>
<?php
include plugin_dir_path(__DIR__) . 'templates/partials/home-v4-header.php';
include plugin_dir_path(__DIR__) . 'templates/partials/home-v4-main-1.php';
include plugin_dir_path(__DIR__) . 'templates/partials/home-v4-main-2.php';
include plugin_dir_path(__DIR__) . 'templates/partials/home-v4-footer.php';
?>
<?php wp_footer(); ?>
</body>
</html>
