<?php
/**
 * Plugin Name: KomArena UI System
 * Plugin URI: https://komarena.sk/
 * Description: Unified frontend visual system for KomArena.sk (header, sidebar, WooCommerce listings, product pages, and responsive polish).
 * Version: 1.0.2
 * Author: KomArena.sk + Assistant
 * License: GPL-2.0-or-later
 * Text Domain: komarena-ui-system
 */

if (!defined('ABSPATH')) {
    exit;
}

final class KomArena_Ui_System {
    const VERSION = '1.0.2';
    const HANDLE_STYLE = 'komarena-ui-system-style';
    const HANDLE_POLISH_STYLE = 'komarena-ui-system-polish-style';

    public static function init() {
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue_assets'));
    }

    public static function enqueue_assets() {
        if (is_admin()) {
            return;
        }

        $css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-unified-ui.css';
        $css_url  = plugin_dir_url(__FILE__) . 'assets/css/komarena-unified-ui.css';
        $version  = file_exists($css_file) ? (string) filemtime($css_file) : self::VERSION;

        wp_enqueue_style(self::HANDLE_STYLE, $css_url, array(), $version, 'all');

        $polish_css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-web-polish.css';
        $polish_css_url  = plugin_dir_url(__FILE__) . 'assets/css/komarena-web-polish.css';
        $polish_version  = file_exists($polish_css_file) ? (string) filemtime($polish_css_file) : self::VERSION;

        if (file_exists($polish_css_file)) {
            wp_enqueue_style(self::HANDLE_POLISH_STYLE, $polish_css_url, array(self::HANDLE_STYLE), $polish_version, 'all');
        }
    }
}

KomArena_Ui_System::init();
