# KomArena UI System

WordPress plugin that unifies frontend design across KomArena.sk and adds a staging-first homepage template focused on SEO, speed and sales.

## Version

`1.1.0-beta1`

## Existing frontend layer

- enqueues the base KomArena visual system,
- improves header, search, WooCommerce listings, product pages and footer,
- does not change database, checkout, payment, shipping or order logic,
- can be disabled instantly by deactivating the plugin.

## KomArena Homepage v4

Version `1.1.0-beta1` adds the page template **KomArena Homepage v4 (staging)**.

The template:

- uses one semantic H1 and indexable HTML links,
- keeps navigation and conversion CTAs usable without JavaScript,
- loads no custom JavaScript,
- reads product title, image, price, stock state and URL from published WooCommerce products,
- falls back to indexable category cards when suitable products are unavailable,
- includes structured data for the store, website and ReSmart service,
- supports keyboard navigation, reduced motion and responsive layouts,
- does not activate itself and does not replace the current homepage automatically.

## Safe staging activation

1. Upload the plugin ZIP to a staging WordPress instance.
2. Create a new unpublished page.
3. Select **KomArena Homepage v4 (staging)** in Page Attributes / Template.
4. Preview the page while logged out.
5. Validate links, product data, mobile layout, Lighthouse and the ReSmart destination.
6. Replace temporary remote image slots with approved local WebP/AVIF media before production activation.
7. Set the page as the static homepage only after explicit production approval and a confirmed backup.

## Product selection

By default the template shows up to four published, in-stock featured WooCommerce products. If no featured products exist, it uses the latest published, in-stock products.

A controlled product list can be provided without editing the template:

```php
add_filter('komarena_home_v4_product_ids', function () {
    return array(123, 456, 789, 1011);
});
```

Only verified published products should be passed to the filter.

## Image slots

The template currently uses temporary remote image defaults for staging preview. Override them with approved WordPress media URLs before production:

```php
add_filter('komarena_home_v4_images', function ($images) {
    $images['hero'] = wp_get_attachment_image_url(1200, 'full');
    $images['home_assistant'] = wp_get_attachment_image_url(1201, 'large');
    $images['guidance'] = wp_get_attachment_image_url(1202, 'large');
    $images['diagnostics'] = wp_get_attachment_image_url(1203, 'large');
    $images['resmart'] = wp_get_attachment_image_url(1204, 'large');
    return $images;
});
```

Do not use unlicensed images or production hotlinks.

## Guardrails

- no automatic production activation,
- no database migrations,
- no external publishing,
- no checkout, payment, shipping, tax or order changes,
- no product prices or availability hardcoded into the template,
- no merge or deployment before staging validation and owner approval.
