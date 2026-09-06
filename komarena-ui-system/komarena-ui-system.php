<?php
/**
 * Plugin Name: KomArena UI System
 * Plugin URI: https://komarena.sk/
 * Description: Unified frontend visual system for KomArena.sk (header, sidebar, WooCommerce listings, product pages, and responsive polish).
 * Version: 1.0.3
 * Author: KomArena.sk + Assistant
 * License: GPL-2.0-or-later
 * Text Domain: komarena-ui-system
 */

if (!defined('ABSPATH')) {
    exit;
}

final class KomArena_Ui_System {
    const VERSION = '1.0.3';
    const HANDLE_STYLE = 'komarena-ui-system-style';
    const HANDLE_POLISH_STYLE = 'komarena-ui-system-polish-style';
    const HANDLE_HEADER_SEARCH_STYLE = 'komarena-ui-system-header-search-style';

    public static function init() {
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue_assets'));
    }

    private static function asset_version($path) {
        return file_exists($path) ? (string) filemtime($path) : self::VERSION;
    }

    public static function enqueue_assets() {
        if (is_admin()) {
            return;
        }

        $css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-unified-ui.css';
        $css_url  = plugin_dir_url(__FILE__) . 'assets/css/komarena-unified-ui.css';

        wp_enqueue_style(self::HANDLE_STYLE, $css_url, array(), self::asset_version($css_file), 'all');

        $polish_css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-web-polish.css';
        $polish_css_url  = plugin_dir_url(__FILE__) . 'assets/css/komarena-web-polish.css';

        if (file_exists($polish_css_file)) {
            wp_enqueue_style(
                self::HANDLE_POLISH_STYLE,
                $polish_css_url,
                array(self::HANDLE_STYLE),
                self::asset_version($polish_css_file),
                'all'
            );
        }

        $header_search_css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-header-search.css';
        $header_search_css_url  = plugin_dir_url(__FILE__) . 'assets/css/komarena-header-search.css';

        if (file_exists($header_search_css_file)) {
            $dependencies = array(self::HANDLE_STYLE);
            if (file_exists($polish_css_file)) {
                $dependencies[] = self::HANDLE_POLISH_STYLE;
            }

            wp_enqueue_style(
                self::HANDLE_HEADER_SEARCH_STYLE,
                $header_search_css_url,
                $dependencies,
                self::asset_version($header_search_css_file),
                'all'
            );
        }
    }
}

KomArena_Ui_System::init();
