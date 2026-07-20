<?php
/**
 * Plugin Name: KomArena UI System
 * Plugin URI: https://komarena.sk/
 * Description: Unified frontend visual system for KomArena.sk with a staging-first SEO and sales homepage template.
 * Version: 1.1.0-beta1
 * Author: KomArena.sk + Assistant
 * License: GPL-2.0-or-later
 * Text Domain: komarena-ui-system
 */

if (!defined('ABSPATH')) {
    exit;
}

final class KomArena_Ui_System {
    const VERSION = '1.1.0-beta1';
    const HANDLE_STYLE = 'komarena-ui-system-style';
    const HANDLE_POLISH_STYLE = 'komarena-ui-system-polish-style';
    const HOME_V4_TEMPLATE = 'komarena-home-v4';

    public static function init() {
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue_assets'));
        add_filter('theme_page_templates', array(__CLASS__, 'register_page_templates'));
        add_filter('template_include', array(__CLASS__, 'load_page_template'), 99);
        add_filter('document_title_parts', array(__CLASS__, 'filter_document_title'));
    }

    public static function is_home_v4_template() {
        return is_page() && self::HOME_V4_TEMPLATE === get_page_template_slug(get_queried_object_id());
    }

    public static function enqueue_assets() {
        if (is_admin()) {
            return;
        }

        if (self::is_home_v4_template()) {
            self::enqueue_home_v4_styles();
            return;
        }

        $css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-unified-ui.css';
        $css_url = plugin_dir_url(__FILE__) . 'assets/css/komarena-unified-ui.css';
        $version = file_exists($css_file) ? (string) filemtime($css_file) : self::VERSION;

        wp_enqueue_style(self::HANDLE_STYLE, $css_url, array(), $version, 'all');

        $polish_css_file = plugin_dir_path(__FILE__) . 'assets/css/komarena-web-polish.css';
        $polish_css_url = plugin_dir_url(__FILE__) . 'assets/css/komarena-web-polish.css';
        $polish_version = file_exists($polish_css_file) ? (string) filemtime($polish_css_file) : self::VERSION;

        if (file_exists($polish_css_file)) {
            wp_enqueue_style(self::HANDLE_POLISH_STYLE, $polish_css_url, array(self::HANDLE_STYLE), $polish_version, 'all');
        }
    }

    private static function enqueue_home_v4_styles() {
        $dependencies = array();

        for ($index = 1; $index <= 4; $index++) {
            $handle = 'komarena-home-v4-' . $index;
            $relative_path = 'assets/css/komarena-home-v4-' . $index . '.css';
            $file = plugin_dir_path(__FILE__) . $relative_path;
            $url = plugin_dir_url(__FILE__) . $relative_path;
            $version = file_exists($file) ? (string) filemtime($file) : self::VERSION;

            if (!file_exists($file)) {
                continue;
            }

            wp_enqueue_style($handle, $url, $dependencies, $version, 'all');
            $dependencies = array($handle);
        }
    }

    public static function register_page_templates($templates) {
        $templates[self::HOME_V4_TEMPLATE] = __('KomArena Homepage v4 (staging)', 'komarena-ui-system');
        return $templates;
    }

    public static function load_page_template($template) {
        if (!self::is_home_v4_template()) {
            return $template;
        }

        $plugin_template = plugin_dir_path(__FILE__) . 'templates/page-komarena-home-v4.php';
        return file_exists($plugin_template) ? $plugin_template : $template;
    }

    public static function filter_document_title($title) {
        if (!self::is_home_v4_template()) {
            return $title;
        }

        $title['title'] = __('Smart domácnosť, Home Assistant a ReSmart servis', 'komarena-ui-system');
        $title['site'] = get_bloginfo('name') ?: 'KomArena';
        return $title;
    }
}

KomArena_Ui_System::init();
