<?php
/**
 * Plugin Name: JSON Content Processor
 * Plugin URI: https://example.com
 * Description: Import bulk JSON files into WordPress posts/pages/CPTs with custom mapping profiles. Includes results tracking and sample JSON generation.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: jcp
 * Requires at least: 6.2
 * Requires PHP: 8.0
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// ============================================================================
// SECURITY: Prevent direct access to this file
// ============================================================================
if (!defined('ABSPATH')) {
    exit;
}

// ============================================================================
// CONSTANTS: Define plugin paths and configuration
// ============================================================================
define('JCP_VERSION', '1.0.0');
define('JCP_PLUGIN_FILE', __FILE__);
define('JCP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('JCP_PLUGIN_URL', plugin_dir_url(__FILE__));
define('JCP_TEXT_DOMAIN', 'jcp');

// Default batch size for processing items (can be filtered)
define('JCP_DEFAULT_BATCH_SIZE', 50);

// Maximum file size for media downloads (5MB)
define('JCP_MAX_MEDIA_SIZE', 5 * 1024 * 1024);

// Maximum errors to store per run
define('JCP_MAX_ERRORS', 100);

// Maximum runs to keep in history
define('JCP_MAX_RUNS', 50);


// ============================================================================
// CLASS: JCP_Main - Main Plugin Controller
// ============================================================================
/**
 * Main plugin class that orchestrates all functionality
 * Handles initialization, hooks, and coordinates between different components
 */
class JCP_Main {
    
    /**
     * @var JCP_Main Singleton instance
     */
    private static $instance = null;
    
    /**
     * Get singleton instance
     */
    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor - Set up all WordPress hooks
     */
    private function __construct() {
        // Register custom post types and taxonomies from profiles
        add_action('plugins_loaded', [$this, 'register_content_types']);
        
        // Add admin menu pages
        add_action('admin_menu', [$this, 'add_admin_menu']);
        
        // Enqueue admin scripts and styles
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        
        // Register REST API endpoints
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        
        // AJAX handlers for non-REST operations
        add_action('wp_ajax_jcp_save_profile', [$this, 'ajax_save_profile']);
        add_action('wp_ajax_jcp_delete_profile', [$this, 'ajax_delete_profile']);
    }
    
    /**
     * Register custom post types and taxonomies from all saved profiles
     * Runs on every request to ensure CPTs/taxonomies are available
     */
    public function register_content_types() {
        $profiles = get_option('jcp_profiles', []);
        
        foreach ($profiles as $profile) {
            if (empty($profile['content_types'])) {
                continue;
            }
            
            foreach ($profile['content_types'] as $content_type) {
                $type = $content_type['type'] ?? '';
                $name = $content_type['name'] ?? '';
                $args = $content_type['args'] ?? [];
                
                // Register Custom Post Type if it doesn't exist
                if ($type === 'register_cpt' && !empty($name) && !post_type_exists($name)) {
                    register_post_type($name, $args);
                }
                
                // Register Taxonomy if it doesn't exist
                if ($type === 'register_taxonomy' && !empty($name) && !taxonomy_exists($name)) {
                    $object_type = $content_type['object_type'] ?? ['post'];
                    register_taxonomy($name, $object_type, $args);
                }
            }
        }
    }
    
    /**
     * Add admin menu pages
     * Creates top-level menu with subpages for Dashboard, Profiles, and Results
     */
    public function add_admin_menu() {
        // Main menu page (Dashboard/Import)
        add_menu_page(
            __('JSON Import', JCP_TEXT_DOMAIN),
            __('JSON Import', JCP_TEXT_DOMAIN),
            'manage_options',
            'jcp-dashboard',
            [$this, 'render_dashboard_page'],
            'dashicons-database-import',
            30
        );
        
        // Profiles (Setup) submenu
        add_submenu_page(
            'jcp-dashboard',
            __('Profiles', JCP_TEXT_DOMAIN),
            __('Profiles', JCP_TEXT_DOMAIN),
            'manage_options',
            'jcp-profiles',
            [$this, 'render_profiles_page']
        );
        
        // Results & Logs submenu
        add_submenu_page(
            'jcp-dashboard',
            __('Results & Logs', JCP_TEXT_DOMAIN),
            __('Results & Logs', JCP_TEXT_DOMAIN),
            'manage_options',
            'jcp-results',
            [$this, 'render_results_page']
        );
    }
    
    /**
     * Enqueue admin CSS and JavaScript
     */
    public function enqueue_admin_assets($hook) {
        // Only load on our plugin pages
        if (strpos($hook, 'jcp-') === false) {
            return;
        }
        
        // Inline CSS for admin UI
        wp_add_inline_style('wp-admin', $this->get_admin_css());
        
        // Enqueue WordPress media uploader scripts
        wp_enqueue_media();
        
        // Inline JavaScript for admin functionality
        wp_add_inline_script('jquery', $this->get_admin_js());
    }
    
    /**
     * Register REST API routes for import operations
     */
    public function register_rest_routes() {
        // Import endpoint - handles the actual import process
        register_rest_route('jcp/v1', '/import', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_import'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            }
        ]);
        
        // Sample JSON generator endpoint
        register_rest_route('jcp/v1', '/profile-sample', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_generate_sample'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            }
        ]);
    }
    
    /**
     * AJAX handler for saving profiles
     */
    public function ajax_save_profile() {
        check_ajax_referer('jcp_save_profile', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('Insufficient permissions', JCP_TEXT_DOMAIN)]);
        }
        
        $profile_data = $_POST['profile'] ?? '';
        
        if (empty($profile_data)) {
            wp_send_json_error(['message' => __('No profile data provided', JCP_TEXT_DOMAIN)]);
        }
        
        // Decode the JSON profile data
        try {
            $profile = json_decode(stripslashes($profile_data), true, 512, JSON_THROW_ON_ERROR);
        } catch (Exception $e) {
            wp_send_json_error(['message' => __('Invalid JSON format', JCP_TEXT_DOMAIN)]);
        }
        
        // Validate required fields
        if (empty($profile['profile_key'])) {
            wp_send_json_error(['message' => __('Profile key is required', JCP_TEXT_DOMAIN)]);
        }
        
        // Save profile to options
        $profiles = get_option('jcp_profiles', []);
        $profiles[$profile['profile_key']] = $profile;
        update_option('jcp_profiles', $profiles);
        
        wp_send_json_success([
            'message' => __('Profile saved successfully', JCP_TEXT_DOMAIN),
            'profile' => $profile
        ]);
    }
    
    /**
     * AJAX handler for deleting profiles
     */
    public function ajax_delete_profile() {
        check_ajax_referer('jcp_delete_profile', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('Insufficient permissions', JCP_TEXT_DOMAIN)]);
        }
        
        $profile_key = $_POST['profile_key'] ?? '';
        
        if (empty($profile_key)) {
            wp_send_json_error(['message' => __('Profile key is required', JCP_TEXT_DOMAIN)]);
        }
        
        $profiles = get_option('jcp_profiles', []);
        
        if (!isset($profiles[$profile_key])) {
            wp_send_json_error(['message' => __('Profile not found', JCP_TEXT_DOMAIN)]);
        }
        
        unset($profiles[$profile_key]);
        update_option('jcp_profiles', $profiles);
        
        wp_send_json_success(['message' => __('Profile deleted successfully', JCP_TEXT_DOMAIN)]);
    }
    
    /**
     * REST API callback for import operations
     * Handles both dry-run preview and actual import
     */
    public function rest_import($request) {
        $params = $request->get_params();
        $profile_key = $params['profile'] ?? '';
        $json_data = $params['json'] ?? '';
        $dry_run = !empty($params['dry_run']);
        $offset = intval($params['offset'] ?? 0);
        $limit = intval($params['limit'] ?? JCP_DEFAULT_BATCH_SIZE);
        
        // Load profile
        $profiles = get_option('jcp_profiles', []);
        if (!isset($profiles[$profile_key])) {
            return new WP_Error('invalid_profile', __('Profile not found', JCP_TEXT_DOMAIN), ['status' => 400]);
        }
        
        $profile = $profiles[$profile_key];
        
        // Decode JSON data
        try {
            $data = json_decode($json_data, true, 512, JSON_THROW_ON_ERROR);
        } catch (Exception $e) {
            return new WP_Error('invalid_json', __('Invalid JSON format', JCP_TEXT_DOMAIN), ['status' => 400]);
        }
        
        // Extract items using JSONPath
        $item_path = $profile['item_path'] ?? '$.items[*]';
        $items = JCP_JsonPath::extract($data, $item_path);
        
        if (empty($items)) {
            return new WP_Error('no_items', __('No items found at specified path', JCP_TEXT_DOMAIN), ['status' => 400]);
        }
        
        // For dry run, only process first 3 items
        if ($dry_run) {
            $preview_items = array_slice($items, 0, 3);
            $previews = [];
            
            foreach ($preview_items as $index => $item) {
                $mapped = $this->map_item($item, $profile);
                $previews[] = [
                    'index' => $index,
                    'original' => $item,
                    'mapped' => $mapped
                ];
            }
            
            return [
                'dry_run' => true,
                'total_items' => count($items),
                'previews' => $previews
            ];
        }
        
        // Process batch of items
        $batch_items = array_slice($items, $offset, $limit);
        $results = $this->process_items($batch_items, $profile, $offset);
        
        // Check if this is the final batch
        $is_complete = ($offset + $limit) >= count($items);
        
        $response = [
            'offset' => $offset,
            'processed' => count($batch_items),
            'total' => count($items),
            'is_complete' => $is_complete,
            'results' => $results
        ];
        
        // If complete, save run results
        if ($is_complete) {
            $this->save_run_result($profile_key, $params['file_name'] ?? 'import.json', $results);
        }
        
        return $response;
    }
    
    /**
     * Process a batch of items and return results
     */
    private function process_items($items, $profile, $offset = 0) {
        $results = [
            'total' => count($items),
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
            'failed' => 0,
            'errors' => []
        ];
        
        foreach ($items as $i => $raw_item) {
            $item_index = $offset + $i;
            
            try {
                // Apply transforms
                $transformed = $this->apply_transforms($raw_item, $profile['transforms'] ?? []);
                
                // Map fields
                $mapped = $this->map_item($transformed, $profile);
                
                // Find existing post
                $existing_id = $this->find_existing_post($mapped, $profile['update_policy'] ?? []);
                
                $on_match = $profile['update_policy']['on_match'] ?? 'update';
                $on_missing = $profile['update_policy']['on_missing'] ?? 'create';
                
                // Determine action
                if ($existing_id && $on_match === 'skip') {
                    $results['skipped']++;
                    continue;
                }
                
                if (!$existing_id && $on_missing === 'skip') {
                    $results['skipped']++;
                    continue;
                }
                
                // Build post array
                $postarr = $this->build_postarr($existing_id, $mapped);
                
                // Insert or update post
                if ($existing_id) {
                    $post_id = wp_update_post($postarr, true);
                    if (is_wp_error($post_id)) {
                        throw new Exception($post_id->get_error_message());
                    }
                    $results['updated']++;
                } else {
                    $post_id = wp_insert_post($postarr, true);
                    if (is_wp_error($post_id)) {
                        throw new Exception($post_id->get_error_message());
                    }
                    $results['created']++;
                }
                
                // Write meta fields
                $this->write_meta($post_id, $mapped['meta'] ?? []);
                
                // Set taxonomies
                $this->set_taxonomies($post_id, $mapped['taxonomies'] ?? []);
                
                // Handle media
                $this->handle_media($post_id, $transformed, $profile['mappings']['media'] ?? []);
                
                // Fire action hook for extensibility
                do_action('jcp_after_item_mapped', $mapped, $raw_item, $profile);
                
            } catch (Exception $e) {
                $results['failed']++;
                
                // Store error (up to max limit)
                if (count($results['errors']) < JCP_MAX_ERRORS) {
                    $results['errors'][] = [
                        'index' => $item_index,
                        'message' => $e->getMessage()
                    ];
                }
            }
        }
        
        return $results;
    }
    
    /**
     * Apply transforms to an item
     */
    private function apply_transforms($item, $transforms) {
        if (empty($transforms)) {
            return $item;
        }
        
        foreach ($transforms as $transform) {
            $when = $transform['when'] ?? '';
            $set = $transform['set'] ?? '';
            $fn = $transform['fn'] ?? '';
            
            if (empty($when) || empty($set) || empty($fn)) {
                continue;
            }
            
            // Get value using JSONPath
            $value = JCP_JsonPath::first($item, $when);
            
            if ($value === null) {
                continue;
            }
            
            // Apply transform function
            $transformed_value = JCP_Transforms::apply($fn, $value);
            
            // Set the transformed value
            $item = $this->set_nested_value($item, $set, $transformed_value);
        }
        
        return $item;
    }
    
    /**
     * Map item fields according to profile mappings
     */
    private function map_item($item, $profile) {
        $mappings = $profile['mappings'] ?? [];
        $mapped = [];
        
        // Map basic post fields
        $mapped['post_type'] = $this->resolve_value($item, $mappings['post_type'] ?? 'post');
        $mapped['post_status'] = $this->resolve_value($item, $mappings['post_status'] ?? 'publish');
        $mapped['post_title'] = $this->resolve_value($item, $mappings['post_title'] ?? '');
        $mapped['post_content'] = $this->resolve_value($item, $mappings['post_content'] ?? '');
        $mapped['post_excerpt'] = $this->resolve_value($item, $mappings['post_excerpt'] ?? '');
        
        // Map taxonomies
        $mapped['taxonomies'] = [];
        if (!empty($mappings['taxonomies'])) {
            foreach ($mappings['taxonomies'] as $taxonomy => $path) {
                $terms = JCP_JsonPath::all($item, $path);
                $mapped['taxonomies'][$taxonomy] = $terms;
            }
        }
        
        // Map meta fields
        $mapped['meta'] = [];
        if (!empty($mappings['meta'])) {
            foreach ($mappings['meta'] as $meta_key => $path) {
                $value = $this->resolve_value($item, $path);
                if ($value !== null && $value !== '') {
                    $mapped['meta'][$meta_key] = $value;
                }
            }
        }
        
        return $mapped;
    }
    
    /**
     * Resolve a value - either static string or JSONPath
     */
    private function resolve_value($item, $path_or_value) {
        // Check for OR operator (||)
        if (is_string($path_or_value) && strpos($path_or_value, '||') !== false) {
            $paths = array_map('trim', explode('||', $path_or_value));
            foreach ($paths as $path) {
                $value = $this->resolve_single_value($item, $path);
                if ($value !== null && $value !== '') {
                    return $value;
                }
            }
            return null;
        }
        
        return $this->resolve_single_value($item, $path_or_value);
    }
    
    /**
     * Resolve a single value (no OR operator)
     */
    private function resolve_single_value($item, $path_or_value) {
        // If it starts with $., it's a JSONPath
        if (is_string($path_or_value) && strpos($path_or_value, '$.') === 0) {
            return JCP_JsonPath::first($item, $path_or_value);
        }
        
        // Otherwise it's a static value
        return $path_or_value;
    }
    
    /**
     * Find existing post based on update policy
     */
    private function find_existing_post($mapped, $update_policy) {
        $match_by = $update_policy['match_by'] ?? '';
        
        if (empty($match_by)) {
            return null;
        }
        
        // Parse match_by (e.g., "meta.source_url")
        $parts = explode('.', $match_by, 2);
        
        if (count($parts) !== 2 || $parts[0] !== 'meta') {
            return null;
        }
        
        $meta_key = $parts[1];
        $meta_value = $mapped['meta'][$meta_key] ?? null;
        
        if (empty($meta_value)) {
            return null;
        }
        
        // Query for existing post with this meta value
        $query = new WP_Query([
            'post_type' => $mapped['post_type'],
            'post_status' => 'any',
            'posts_per_page' => 1,
            'meta_query' => [
                [
                    'key' => $meta_key,
                    'value' => $meta_value,
                    'compare' => '='
                ]
            ]
        ]);
        
        if ($query->have_posts()) {
            return $query->posts[0]->ID;
        }
        
        return null;
    }
    
    /**
     * Build WordPress post array for wp_insert_post or wp_update_post
     */
    private function build_postarr($post_id, $mapped) {
        $postarr = [
            'post_type' => $mapped['post_type'],
            'post_status' => $mapped['post_status'],
            'post_title' => $mapped['post_title'],
            'post_content' => $mapped['post_content'],
            'post_excerpt' => $mapped['post_excerpt']
        ];
        
        if ($post_id) {
            $postarr['ID'] = $post_id;
        }
        
        // Allow filtering of post array
        return apply_filters('jcp_postarr', $postarr, $mapped);
    }
    
    /**
     * Write meta fields to post
     */
    private function write_meta($post_id, $meta_fields) {
        foreach ($meta_fields as $key => $value) {
            update_post_meta($post_id, $key, $value);
        }
    }
    
    /**
     * Set taxonomies for post
     */
    private function set_taxonomies($post_id, $taxonomies) {
        foreach ($taxonomies as $taxonomy => $terms) {
            if (!taxonomy_exists($taxonomy)) {
                continue;
            }
            
            // Ensure terms is an array
            if (!is_array($terms)) {
                $terms = [$terms];
            }
            
            // Get or create term IDs
            $term_ids = [];
            foreach ($terms as $term_name) {
                if (empty($term_name)) {
                    continue;
                }
                
                $term = get_term_by('name', $term_name, $taxonomy);
                
                if (!$term) {
                    $result = wp_insert_term($term_name, $taxonomy);
                    if (!is_wp_error($result)) {
                        $term_ids[] = $result['term_id'];
                    }
                } else {
                    $term_ids[] = $term->term_id;
                }
            }
            
            if (!empty($term_ids)) {
                wp_set_object_terms($post_id, $term_ids, $taxonomy);
            }
        }
    }
    
    /**
     * Handle media downloads and attachments
     */
    private function handle_media($post_id, $item, $media_rules) {
        if (empty($media_rules)) {
            return;
        }
        
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        foreach ($media_rules as $rule) {
            $path = $rule['path'] ?? '';
            $as_featured = $rule['as_featured_image'] ?? false;
            
            if (empty($path)) {
                continue;
            }
            
            // Get URL from item
            $url = JCP_JsonPath::first($item, $path);
            
            if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
                continue;
            }
            
            try {
                // Download file
                $temp_file = download_url($url, 300);
                
                if (is_wp_error($temp_file)) {
                    throw new Exception($temp_file->get_error_message());
                }
                
                // Prepare file array
                $file_array = [
                    'name' => basename($url),
                    'tmp_name' => $temp_file
                ];
                
                // Sideload into media library
                $attachment_id = media_handle_sideload($file_array, $post_id);
                
                if (is_wp_error($attachment_id)) {
                    @unlink($temp_file);
                    throw new Exception($attachment_id->get_error_message());
                }
                
                // Set as featured image if requested
                if ($as_featured) {
                    set_post_thumbnail($post_id, $attachment_id);
                }
                
            } catch (Exception $e) {
                // Log error but continue processing
                error_log('JCP Media Error: ' . $e->getMessage());
            }
        }
    }
    
    /**
     * Set nested value in array using dot notation
     */
    private function set_nested_value($array, $path, $value) {
        $keys = explode('.', $path);
        $current = &$array;
        
        foreach ($keys as $key) {
            if (!isset($current[$key])) {
                $current[$key] = [];
            }
            $current = &$current[$key];
        }
        
        $current = $value;
        return $array;
    }
    
    /**
     * Save run result to options
     */
    private function save_run_result($profile_key, $file_name, $results) {
        $runs = get_option('jcp_runs', []);
        
        $run = [
            'run_id' => wp_generate_uuid4(),
            'ts' => current_time('mysql'),
            'profile_key' => $profile_key,
            'file_name' => $file_name,
            'counts' => [
                'total' => $results['total'],
                'created' => $results['created'],
                'updated' => $results['updated'],
                'skipped' => $results['skipped'],
                'failed' => $results['failed']
            ],
            'errors' => $results['errors']
        ];
        
        // Add to beginning of array
        array_unshift($runs, $run);
        
        // Keep only last N runs
        $runs = array_slice($runs, 0, JCP_MAX_RUNS);
        
        update_option('jcp_runs', $runs);
    }
    
    /**
     * REST API callback for generating sample JSON
     */
    public function rest_generate_sample($request) {
        $profile_key = $request->get_param('profile');
        
        $profiles = get_option('jcp_profiles', []);
        if (!isset($profiles[$profile_key])) {
            return new WP_Error('invalid_profile', __('Profile not found', JCP_TEXT_DOMAIN), ['status' => 400]);
        }
        
        $profile = $profiles[$profile_key];
        $sample = $this->generate_sample_json($profile);
        
        return $sample;
    }
    
    /**
     * Generate sample JSON from profile
     */
    private function generate_sample_json($profile) {
        $mappings = $profile['mappings'] ?? [];
        
        // Build sample item from mappings
        $sample_item = [
            'title' => 'Sample Item Title',
            'short' => 'Short summary here.',
            'description_html' => '<p>Example body content with HTML formatting.</p>',
            'description_text' => 'Plain text description as fallback.'
        ];
        
        // Add fields from meta mappings
        if (!empty($mappings['meta'])) {
            foreach ($mappings['meta'] as $meta_key => $path) {
                $field_name = $this->extract_field_from_path($path);
                $sample_value = $this->generate_sample_value($meta_key);
                $sample_item = $this->set_nested_value($sample_item, $field_name, $sample_value);
            }
        }
        
        // Add fields from taxonomy mappings
        if (!empty($mappings['taxonomies'])) {
            foreach ($mappings['taxonomies'] as $taxonomy => $path) {
                $field_name = $this->extract_field_from_path($path);
                $sample_item = $this->set_nested_value($sample_item, $field_name, ['Sample Term 1', 'Sample Term 2']);
            }
        }
        
        // Add media fields
        if (!empty($mappings['media'])) {
            foreach ($mappings['media'] as $media) {
                $field_name = $this->extract_field_from_path($media['path'] ?? '');
                $sample_item = $this->set_nested_value($sample_item, $field_name, 'https://via.placeholder.com/640x360.png');
            }
        }
        
        // Build complete sample JSON
        $sample = [
            'version' => $profile['profile_key'],
            'source' => 'sample',
            'fetched_at' => current_time('c'),
            'items' => [$sample_item]
        ];
        
        return $sample;
    }
    
    /**
     * Extract field name from JSONPath
     */
    private function extract_field_from_path($path) {
        // Remove $. prefix and [*] suffixes
        $field = preg_replace('/^\$\./', '', $path);
        $field = preg_replace('/\[\*\]$/', '', $field);
        return $field;
    }
    
    /**
     * Generate sample value based on field name
     */
    private function generate_sample_value($field_name) {
        $samples = [
            'deadline' => '2026-01-31T23:59:00Z',
            'event_start' => '2026-05-10',
            'event_end' => '2026-05-15',
            'venue_city' => 'Paris',
            'venue_country' => 'FR',
            'organizer' => 'Sample Organization',
            'submission_url' => 'https://example.org/submit',
            'source_url' => 'https://example.org/source'
        ];
        
        return $samples[$field_name] ?? 'Sample value for ' . $field_name;
    }
    
    /**
     * Render Dashboard/Import page
     */
    public function render_dashboard_page() {
        ?>
        <div class="wrap jcp-dashboard">
            <h1><?php _e('JSON Import', JCP_TEXT_DOMAIN); ?></h1>
            
            <div class="jcp-card">
                <h2><?php _e('Import JSON Data', JCP_TEXT_DOMAIN); ?></h2>
                
                <form id="jcp-import-form" method="post" enctype="multipart/form-data">
                    <?php wp_nonce_field('jcp_import', 'jcp_import_nonce'); ?>
                    
                    <!-- File Upload -->
                    <div class="jcp-form-group">
                        <label for="jcp-file-upload">
                            <?php _e('JSON File', JCP_TEXT_DOMAIN); ?>
                        </label>
                        <input type="file" id="jcp-file-upload" name="json_file" accept=".json" required>
                        <p class="description"><?php _e('Select a JSON file to import', JCP_TEXT_DOMAIN); ?></p>
                    </div>
                    
                    <!-- Profile Selector -->
                    <div class="jcp-form-group">
                        <label for="jcp-profile-select">
                            <?php _e('Import Profile', JCP_TEXT_DOMAIN); ?>
                        </label>
                        <select id="jcp-profile-select" name="profile" required>
                            <option value=""><?php _e('Select a profile...', JCP_TEXT_DOMAIN); ?></option>
                            <?php
                            $profiles = get_option('jcp_profiles', []);
                            foreach ($profiles as $key => $profile) {
                                echo '<option value="' . esc_attr($key) . '">' . esc_html($profile['label'] ?? $key) . '</option>';
                            }
                            ?>
                        </select>
                        <p class="description">
                            <?php _e('Choose which profile to use for mapping', JCP_TEXT_DOMAIN); ?>
                            <a href="<?php echo admin_url('admin.php?page=jcp-profiles'); ?>">
                                <?php _e('Manage Profiles', JCP_TEXT_DOMAIN); ?>
                            </a>
                        </p>
                    </div>
                    
                    <!-- Dry Run -->
                    <div class="jcp-form-group">
                        <label>
                            <input type="checkbox" id="jcp-dry-run" name="dry_run" checked>
                            <?php _e('Dry Run (Preview first 3 items)', JCP_TEXT_DOMAIN); ?>
                        </label>
                        <p class="description"><?php _e('Shows a preview without actually importing', JCP_TEXT_DOMAIN); ?></p>
                    </div>
                    
                    <!-- Submit Button -->
                    <div class="jcp-form-group">
                        <button type="submit" class="button button-primary button-large" id="jcp-import-btn">
                            <?php _e('Run Import', JCP_TEXT_DOMAIN); ?>
                        </button>
                    </div>
                </form>
                
                <!-- Progress Bar -->
                <div id="jcp-progress-container" style="display:none;">
                    <h3><?php _e('Import Progress', JCP_TEXT_DOMAIN); ?></h3>
                    <div class="jcp-progress-bar">
                        <div class="jcp-progress-fill" id="jcp-progress-fill"></div>
                    </div>
                    <p id="jcp-progress-text">0%</p>
                </div>
                
                <!-- Preview Results -->
                <div id="jcp-preview-results" style="display:none;">
                    <h3><?php _e('Preview Results', JCP_TEXT_DOMAIN); ?></h3>
                    <div id="jcp-preview-content"></div>
                    <button type="button" class="button" id="jcp-run-full-import">
                        <?php _e('Run Full Import', JCP_TEXT_DOMAIN); ?>
                    </button>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render Profiles (Setup) page
     */
    public function render_profiles_page() {
        $profiles = get_option('jcp_profiles', []);
        $editing = isset($_GET['edit']) ? $_GET['edit'] : null;
        $profile_to_edit = $editing && isset($profiles[$editing]) ? $profiles[$editing] : null;
        ?>
        <div class="wrap jcp-profiles">
            <h1><?php _e('Import Profiles', JCP_TEXT_DOMAIN); ?></h1>
            
            <?php if (!$profile_to_edit): ?>
                <!-- Profile List -->
                <div class="jcp-card">
                    <div class="jcp-card-header">
                        <h2><?php _e('Saved Profiles', JCP_TEXT_DOMAIN); ?></h2>
                        <a href="<?php echo admin_url('admin.php?page=jcp-profiles&edit=new'); ?>" class="button button-primary">
                            <?php _e('Add New Profile', JCP_TEXT_DOMAIN); ?>
                        </a>
                    </div>
                    
                    <?php if (empty($profiles)): ?>
                        <p><?php _e('No profiles found. Create your first profile to get started.', JCP_TEXT_DOMAIN); ?></p>
                    <?php else: ?>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php _e('Profile Key', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Label', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Post Type', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Actions', JCP_TEXT_DOMAIN); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($profiles as $key => $profile): ?>
                                    <tr>
                                        <td><code><?php echo esc_html($key); ?></code></td>
                                        <td><?php echo esc_html($profile['label'] ?? $key); ?></td>
                                        <td><?php echo esc_html($profile['mappings']['post_type'] ?? 'post'); ?></td>
                                        <td>
                                            <a href="<?php echo admin_url('admin.php?page=jcp-profiles&edit=' . urlencode($key)); ?>" class="button button-small">
                                                <?php _e('Edit', JCP_TEXT_DOMAIN); ?>
                                            </a>
                                            <a href="<?php echo rest_url('jcp/v1/profile-sample?profile=' . urlencode($key)); ?>" class="button button-small" target="_blank">
                                                <?php _e('Download Sample', JCP_TEXT_DOMAIN); ?>
                                            </a>
                                            <button type="button" class="button button-small jcp-delete-profile" data-profile="<?php echo esc_attr($key); ?>">
                                                <?php _e('Delete', JCP_TEXT_DOMAIN); ?>
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            <?php else: ?>
                <!-- Profile Editor -->
                <div class="jcp-card">
                    <h2><?php echo $editing === 'new' ? __('Create New Profile', JCP_TEXT_DOMAIN) : __('Edit Profile', JCP_TEXT_DOMAIN); ?></h2>
                    
                    <form id="jcp-profile-form">
                        <?php wp_nonce_field('jcp_save_profile', 'jcp_profile_nonce'); ?>
                        
                        <div class="jcp-form-group">
                            <label for="profile_key"><?php _e('Profile Key', JCP_TEXT_DOMAIN); ?> <span class="required">*</span></label>
                            <input type="text" id="profile_key" name="profile_key" required 
                                   value="<?php echo esc_attr($profile_to_edit['profile_key'] ?? ''); ?>"
                                   <?php echo $editing !== 'new' ? 'readonly' : ''; ?>>
                            <p class="description"><?php _e('Unique identifier (lowercase, no spaces)', JCP_TEXT_DOMAIN); ?></p>
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="label"><?php _e('Label', JCP_TEXT_DOMAIN); ?> <span class="required">*</span></label>
                            <input type="text" id="label" name="label" required 
                                   value="<?php echo esc_attr($profile_to_edit['label'] ?? ''); ?>">
                            <p class="description"><?php _e('Human-readable name', JCP_TEXT_DOMAIN); ?></p>
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="item_path"><?php _e('Item Path', JCP_TEXT_DOMAIN); ?> <span class="required">*</span></label>
                            <input type="text" id="item_path" name="item_path" required 
                                   value="<?php echo esc_attr($profile_to_edit['item_path'] ?? '$.items[*]'); ?>">
                            <p class="description"><?php _e('JSONPath to array of items (e.g., $.items[*])', JCP_TEXT_DOMAIN); ?></p>
                        </div>
                        
                        <h3><?php _e('Post Mappings', JCP_TEXT_DOMAIN); ?></h3>
                        
                        <div class="jcp-form-group">
                            <label for="post_type"><?php _e('Post Type', JCP_TEXT_DOMAIN); ?></label>
                            <input type="text" id="post_type" name="mappings[post_type]" 
                                   value="<?php echo esc_attr($profile_to_edit['mappings']['post_type'] ?? 'post'); ?>">
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="post_status"><?php _e('Post Status', JCP_TEXT_DOMAIN); ?></label>
                            <input type="text" id="post_status" name="mappings[post_status]" 
                                   value="<?php echo esc_attr($profile_to_edit['mappings']['post_status'] ?? 'publish'); ?>">
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="post_title"><?php _e('Post Title (JSONPath)', JCP_TEXT_DOMAIN); ?></label>
                            <input type="text" id="post_title" name="mappings[post_title]" 
                                   value="<?php echo esc_attr($profile_to_edit['mappings']['post_title'] ?? '$.title'); ?>">
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="post_content"><?php _e('Post Content (JSONPath)', JCP_TEXT_DOMAIN); ?></label>
                            <input type="text" id="post_content" name="mappings[post_content]" 
                                   value="<?php echo esc_attr($profile_to_edit['mappings']['post_content'] ?? '$.content'); ?>">
                        </div>
                        
                        <div class="jcp-form-group">
                            <label for="post_excerpt"><?php _e('Post Excerpt (JSONPath)', JCP_TEXT_DOMAIN); ?></label>
                            <input type="text" id="post_excerpt" name="mappings[post_excerpt]" 
                                   value="<?php echo esc_attr($profile_to_edit['mappings']['post_excerpt'] ?? ''); ?>">
                        </div>
                        
                        <h3><?php _e('Meta Fields & Taxonomies', JCP_TEXT_DOMAIN); ?></h3>
                        <p class="description"><?php _e('Define custom meta fields and taxonomies as JSON. See documentation for examples.', JCP_TEXT_DOMAIN); ?></p>
                        
                        <div class="jcp-form-group">
                            <label for="profile_json"><?php _e('Full Profile JSON', JCP_TEXT_DOMAIN); ?></label>
                            <textarea id="profile_json" name="profile_json" rows="20" style="font-family:monospace; width:100%;"><?php 
                                echo esc_textarea(json_encode($profile_to_edit ?: [
                                    'profile_key' => '',
                                    'label' => '',
                                    'item_path' => '$.items[*]',
                                    'mappings' => [
                                        'post_type' => 'post',
                                        'post_status' => 'publish',
                                        'post_title' => '$.title',
                                        'post_content' => '$.content',
                                        'taxonomies' => [],
                                        'meta' => []
                                    ],
                                    'update_policy' => [
                                        'match_by' => '',
                                        'on_match' => 'update',
                                        'on_missing' => 'create'
                                    ]
                                ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); 
                            ?></textarea>
                            <p class="description"><?php _e('Edit the complete profile configuration', JCP_TEXT_DOMAIN); ?></p>
                        </div>
                        
                        <div class="jcp-form-actions">
                            <button type="submit" class="button button-primary"><?php _e('Save Profile', JCP_TEXT_DOMAIN); ?></button>
                            <a href="<?php echo admin_url('admin.php?page=jcp-profiles'); ?>" class="button"><?php _e('Cancel', JCP_TEXT_DOMAIN); ?></a>
                        </div>
                    </form>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
    
    /**
     * Render Results & Logs page
     */
    public function render_results_page() {
        $runs = get_option('jcp_runs', []);
        $viewing = isset($_GET['run']) ? $_GET['run'] : null;
        $run_to_view = null;
        
        if ($viewing) {
            foreach ($runs as $run) {
                if ($run['run_id'] === $viewing) {
                    $run_to_view = $run;
                    break;
                }
            }
        }
        ?>
        <div class="wrap jcp-results">
            <h1><?php _e('Import Results & Logs', JCP_TEXT_DOMAIN); ?></h1>
            
            <?php if (!$run_to_view): ?>
                <!-- Results List -->
                <div class="jcp-card">
                    <h2><?php _e('Recent Imports', JCP_TEXT_DOMAIN); ?></h2>
                    
                    <?php if (empty($runs)): ?>
                        <p><?php _e('No import runs yet.', JCP_TEXT_DOMAIN); ?></p>
                    <?php else: ?>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php _e('Date', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Profile', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('File', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Results', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Success Rate', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Actions', JCP_TEXT_DOMAIN); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($runs as $run): ?>
                                    <?php
                                    $counts = $run['counts'];
                                    $success_count = $counts['created'] + $counts['updated'];
                                    $success_rate = $counts['total'] > 0 ? round(($success_count / $counts['total']) * 100) : 0;
                                    ?>
                                    <tr>
                                        <td><?php echo esc_html(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($run['ts']))); ?></td>
                                        <td><code><?php echo esc_html($run['profile_key']); ?></code></td>
                                        <td><?php echo esc_html($run['file_name']); ?></td>
                                        <td>
                                            <span class="jcp-badge jcp-badge-created"><?php echo $counts['created']; ?> created</span>
                                            <span class="jcp-badge jcp-badge-updated"><?php echo $counts['updated']; ?> updated</span>
                                            <span class="jcp-badge jcp-badge-failed"><?php echo $counts['failed']; ?> failed</span>
                                        </td>
                                        <td>
                                            <strong style="color: <?php echo $success_rate >= 90 ? '#46b450' : ($success_rate >= 70 ? '#ffb900' : '#dc3232'); ?>">
                                                <?php echo $success_rate; ?>%
                                            </strong>
                                        </td>
                                        <td>
                                            <a href="<?php echo admin_url('admin.php?page=jcp-results&run=' . urlencode($run['run_id'])); ?>" class="button button-small">
                                                <?php _e('View Details', JCP_TEXT_DOMAIN); ?>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            <?php else: ?>
                <!-- Run Details -->
                <?php
                $counts = $run_to_view['counts'];
                $success_count = $counts['created'] + $counts['updated'];
                $success_rate = $counts['total'] > 0 ? round(($success_count / $counts['total']) * 100) : 0;
                ?>
                <div class="jcp-card">
                    <a href="<?php echo admin_url('admin.php?page=jcp-results'); ?>" class="button">
                        &larr; <?php _e('Back to All Results', JCP_TEXT_DOMAIN); ?>
                    </a>
                    
                    <h2><?php _e('Import Details', JCP_TEXT_DOMAIN); ?></h2>
                    
                    <div class="jcp-summary-box">
                        <h3><?php printf(__('%d%% successful', JCP_TEXT_DOMAIN), $success_rate); ?></h3>
                        <p class="jcp-summary-stats">
                            <strong><?php echo $counts['created']; ?></strong> <?php _e('created', JCP_TEXT_DOMAIN); ?> • 
                            <strong><?php echo $counts['updated']; ?></strong> <?php _e('updated', JCP_TEXT_DOMAIN); ?> • 
                            <strong><?php echo $counts['skipped']; ?></strong> <?php _e('skipped', JCP_TEXT_DOMAIN); ?> • 
                            <strong><?php echo $counts['failed']; ?></strong> <?php _e('failed', JCP_TEXT_DOMAIN); ?> of 
                            <strong><?php echo $counts['total']; ?></strong> <?php _e('items', JCP_TEXT_DOMAIN); ?>
                        </p>
                    </div>
                    
                    <table class="jcp-details-table">
                        <tr>
                            <th><?php _e('Date', JCP_TEXT_DOMAIN); ?></th>
                            <td><?php echo esc_html(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($run_to_view['ts']))); ?></td>
                        </tr>
                        <tr>
                            <th><?php _e('Profile', JCP_TEXT_DOMAIN); ?></th>
                            <td><code><?php echo esc_html($run_to_view['profile_key']); ?></code></td>
                        </tr>
                        <tr>
                            <th><?php _e('File', JCP_TEXT_DOMAIN); ?></th>
                            <td><?php echo esc_html($run_to_view['file_name']); ?></td>
                        </tr>
                    </table>
                    
                    <?php if (!empty($run_to_view['errors'])): ?>
                        <h3><?php _e('Errors', JCP_TEXT_DOMAIN); ?></h3>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php _e('Item Index', JCP_TEXT_DOMAIN); ?></th>
                                    <th><?php _e('Error Message', JCP_TEXT_DOMAIN); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($run_to_view['errors'] as $error): ?>
                                    <tr>
                                        <td><?php echo esc_html($error['index']); ?></td>
                                        <td><code><?php echo esc_html($error['message']); ?></code></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php else: ?>
                        <p><em><?php _e('No errors recorded for this import.', JCP_TEXT_DOMAIN); ?></em></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
    
    /**
     * Get admin CSS
     */
    private function get_admin_css() {
        return '
        .jcp-card {
            background: #fff;
            border: 1px solid #ccd0d4;
            box-shadow: 0 1px 1px rgba(0,0,0,.04);
            margin: 20px 0;
            padding: 20px;
        }
        .jcp-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .jcp-card h2 {
            margin-top: 0;
        }
        .jcp-form-group {
            margin-bottom: 20px;
        }
        .jcp-form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
        }
        .jcp-form-group input[type="text"],
        .jcp-form-group input[type="file"],
        .jcp-form-group select,
        .jcp-form-group textarea {
            width: 100%;
            max-width: 600px;
        }
        .jcp-form-group .description {
            margin: 5px 0 0;
            color: #646970;
            font-size: 13px;
        }
        .jcp-form-actions {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dcdcde;
        }
        .jcp-progress-bar {
            width: 100%;
            height: 30px;
            background: #f0f0f1;
            border-radius: 3px;
            overflow: hidden;
            margin: 10px 0;
        }
        .jcp-progress-fill {
            height: 100%;
            background: #2271b1;
            transition: width 0.3s;
            width: 0;
        }
        #jcp-progress-text {
            text-align: center;
            font-weight: 600;
        }
        .jcp-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            margin-right: 5px;
        }
        .jcp-badge-created {
            background: #d5e8d4;
            color: #2d662d;
        }
        .jcp-badge-updated {
            background: #dae8fc;
            color: #1e4d7b;
        }
        .jcp-badge-failed {
            background: #f8d7da;
            color: #721c24;
        }
        .jcp-summary-box {
            background: #f6f7f7;
            border: 2px solid #2271b1;
            border-radius: 4px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .jcp-summary-box h3 {
            margin: 0 0 10px;
            font-size: 24px;
            color: #2271b1;
        }
        .jcp-summary-stats {
            margin: 0;
            font-size: 14px;
        }
        .jcp-details-table {
            width: 100%;
            margin: 20px 0;
        }
        .jcp-details-table th {
            text-align: left;
            padding: 10px;
            background: #f6f7f7;
            width: 150px;
            font-weight: 600;
        }
        .jcp-details-table td {
            padding: 10px;
        }
        .required {
            color: #dc3232;
        }
        ';
    }
    
    /**
     * Get admin JavaScript
     */
    private function get_admin_js() {
        return "
        jQuery(document).ready(function($) {
            
            // ===== DASHBOARD: Import Form Handler =====
            $('#jcp-import-form').on('submit', function(e) {
                e.preventDefault();
                
                var fileInput = $('#jcp-file-upload')[0];
                var profile = $('#jcp-profile-select').val();
                var dryRun = $('#jcp-dry-run').is(':checked');
                
                if (!fileInput.files[0]) {
                    alert('Please select a file');
                    return;
                }
                
                if (!profile) {
                    alert('Please select a profile');
                    return;
                }
                
                var reader = new FileReader();
                reader.onload = function(e) {
                    var jsonData = e.target.result;
                    
                    if (dryRun) {
                        runDryRun(profile, jsonData, fileInput.files[0].name);
                    } else {
                        runFullImport(profile, jsonData, fileInput.files[0].name);
                    }
                };
                reader.readAsText(fileInput.files[0]);
            });
            
            // Run dry run preview
            function runDryRun(profile, jsonData, fileName) {
                $('#jcp-import-btn').prop('disabled', true);
                $('#jcp-preview-results').hide();
                
                $.ajax({
                    url: '" . rest_url('jcp/v1/import') . "',
                    method: 'POST',
                    data: {
                        profile: profile,
                        json: jsonData,
                        dry_run: 1,
                        file_name: fileName
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', '" . wp_create_nonce('wp_rest') . "');
                    },
                    success: function(response) {
                        displayPreview(response);
                        $('#jcp-import-btn').prop('disabled', false);
                    },
                    error: function(xhr) {
                        alert('Error: ' + (xhr.responseJSON?.message || 'Unknown error'));
                        $('#jcp-import-btn').prop('disabled', false);
                    }
                });
            }
            
            // Display preview results
            function displayPreview(response) {
                var html = '<p><strong>Total items: ' + response.total_items + '</strong></p>';
                html += '<p>Preview of first ' + response.previews.length + ' items:</p>';
                
                response.previews.forEach(function(preview) {
                    html += '<div class=\"jcp-preview-item\" style=\"background:#f6f7f7; padding:15px; margin:10px 0; border-left:3px solid #2271b1;\">';
                    html += '<h4>Item ' + preview.index + '</h4>';
                    html += '<p><strong>Title:</strong> ' + (preview.mapped.post_title || '(empty)') + '</p>';
                    html += '<p><strong>Post Type:</strong> ' + preview.mapped.post_type + '</p>';
                    html += '<p><strong>Content:</strong> ' + (preview.mapped.post_content ? preview.mapped.post_content.substring(0, 100) + '...' : '(empty)') + '</p>';
                    html += '</div>';
                });
                
                $('#jcp-preview-content').html(html);
                $('#jcp-preview-results').show();
            }
            
            // Run full import button (after preview)
            $(document).on('click', '#jcp-run-full-import', function() {
                $('#jcp-dry-run').prop('checked', false);
                var fileInput = $('#jcp-file-upload')[0];
                var profile = $('#jcp-profile-select').val();
                
                var reader = new FileReader();
                reader.onload = function(e) {
                    runFullImport(profile, e.target.result, fileInput.files[0].name);
                };
                reader.readAsText(fileInput.files[0]);
            });
            
            // Run full import with progress tracking
            function runFullImport(profile, jsonData, fileName) {
                $('#jcp-import-btn').prop('disabled', true);
                $('#jcp-preview-results').hide();
                $('#jcp-progress-container').show();
                
                // Parse to get total count first
                var data = JSON.parse(jsonData);
                var totalItems = 0;
                
                // Simple estimation (actual extraction happens server-side)
                if (data.items) {
                    totalItems = data.items.length;
                }
                
                processNextBatch(profile, jsonData, fileName, 0, totalItems);
            }
            
            // Process batches recursively
            function processNextBatch(profile, jsonData, fileName, offset, total) {
                $.ajax({
                    url: '" . rest_url('jcp/v1/import') . "',
                    method: 'POST',
                    data: {
                        profile: profile,
                        json: jsonData,
                        file_name: fileName,
                        offset: offset,
                        limit: " . JCP_DEFAULT_BATCH_SIZE . "
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', '" . wp_create_nonce('wp_rest') . "');
                    },
                    success: function(response) {
                        var progress = Math.round((response.offset + response.processed) / response.total * 100);
                        $('#jcp-progress-fill').css('width', progress + '%');
                        $('#jcp-progress-text').text(progress + '% (' + (response.offset + response.processed) + '/' + response.total + ')');
                        
                        if (response.is_complete) {
                            // Import complete - redirect to results
                            alert('Import complete! ' + response.results.created + ' created, ' + response.results.updated + ' updated, ' + response.results.failed + ' failed.');
                            window.location.href = '" . admin_url('admin.php?page=jcp-results') . "';
                        } else {
                            // Process next batch
                            processNextBatch(profile, jsonData, fileName, response.offset + response.processed, response.total);
                        }
                    },
                    error: function(xhr) {
                        alert('Error: ' + (xhr.responseJSON?.message || 'Unknown error'));
                        $('#jcp-import-btn').prop('disabled', false);
                        $('#jcp-progress-container').hide();
                    }
                });
            }
            
            // ===== PROFILES: Save Profile Form =====
            $('#jcp-profile-form').on('submit', function(e) {
                e.preventDefault();
                
                // Get JSON from textarea
                var profileJson = $('#profile_json').val();
                
                // Validate JSON
                try {
                    var profile = JSON.parse(profileJson);
                } catch (err) {
                    alert('Invalid JSON: ' + err.message);
                    return;
                }
                
                // Ensure profile_key and label are set
                var profileKey = $('#profile_key').val();
                var label = $('#label').val();
                
                if (!profileKey || !label) {
                    alert('Profile Key and Label are required');
                    return;
                }
                
                profile.profile_key = profileKey;
                profile.label = label;
                
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'jcp_save_profile',
                        nonce: $('#jcp_profile_nonce').val(),
                        profile: JSON.stringify(profile)
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Profile saved successfully!');
                            window.location.href = '" . admin_url('admin.php?page=jcp-profiles') . "';
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Error saving profile');
                    }
                });
            });
            
            // ===== PROFILES: Delete Profile =====
            $('.jcp-delete-profile').on('click', function(e) {
                e.preventDefault();
                
                var profileKey = $(this).data('profile');
                
                if (!confirm('Are you sure you want to delete this profile?')) {
                    return;
                }
                
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'jcp_delete_profile',
                        nonce: '" . wp_create_nonce('jcp_delete_profile') . "',
                        profile_key: profileKey
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Profile deleted successfully!');
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Error deleting profile');
                    }
                });
            });
            
        });
        ";
    }
}


// ============================================================================
// CLASS: JCP_JsonPath - Mini JSONPath Implementation
// ============================================================================
/**
 * Lightweight JSONPath parser
 * Supports basic operations: $.path.to.field, $.array[*], $.array[0]
 */
class JCP_JsonPath {
    
    /**
     * Extract value(s) from object using JSONPath
     * Returns array of all matching values
     */
    public static function extract($obj, $path) {
        if (empty($path) || !is_string($path)) {
            return [];
        }
        
        // Remove leading $. if present
        $path = preg_replace('/^\$\.?/', '', $path);
        
        if (empty($path)) {
            return [$obj];
        }
        
        return self::traverse($obj, $path);
    }
    
    /**
     * Get first scalar value from path
     */
    public static function first($obj, $path) {
        $results = self::extract($obj, $path);
        
        if (empty($results)) {
            return null;
        }
        
        return $results[0];
    }
    
    /**
     * Get all values as flat array (deduplicated)
     */
    public static function all($obj, $path) {
        $results = self::extract($obj, $path);
        
        // Flatten nested arrays
        $flattened = [];
        array_walk_recursive($results, function($value) use (&$flattened) {
            $flattened[] = $value;
        });
        
        // Deduplicate
        return array_values(array_unique($flattened));
    }
    
    /**
     * Traverse object following path segments
     */
    private static function traverse($obj, $path) {
        $segments = explode('.', $path);
        $results = [$obj];
        
        foreach ($segments as $segment) {
            $newResults = [];
            
            foreach ($results as $current) {
                if (!is_array($current)) {
                    continue;
                }
                
                // Handle array wildcard: field[*]
                if (preg_match('/^(.+?)\[\*\]$/', $segment, $matches)) {
                    $field = $matches[1];
                    if (isset($current[$field]) && is_array($current[$field])) {
                        foreach ($current[$field] as $item) {
                            $newResults[] = $item;
                        }
                    }
                }
                // Handle array index: field[0]
                elseif (preg_match('/^(.+?)\[(\d+)\]$/', $segment, $matches)) {
                    $field = $matches[1];
                    $index = intval($matches[2]);
                    if (isset($current[$field]) && is_array($current[$field]) && isset($current[$field][$index])) {
                        $newResults[] = $current[$field][$index];
                    }
                }
                // Handle simple field
                else {
                    if (isset($current[$segment])) {
                        $newResults[] = $current[$segment];
                    }
                }
            }
            
            $results = $newResults;
        }
        
        return $results;
    }
}


// ============================================================================
// CLASS: JCP_Transforms - Transform Functions
// ============================================================================
/**
 * Built-in transform functions for data normalization
 */
class JCP_Transforms {
    
    /**
     * Apply transform function to value
     */
    public static function apply($fn, $value) {
        if (!method_exists(self::class, $fn)) {
            return $value;
        }
        
        return self::$fn($value);
    }
    
    /**
     * Parse date string to ISO 8601
     */
    public static function date_parse($value) {
        if (empty($value)) {
            return $value;
        }
        
        try {
            $date = new DateTime($value, new DateTimeZone('UTC'));
            return $date->format('c'); // ISO 8601
        } catch (Exception $e) {
            return $value;
        }
    }
    
    /**
     * Trim whitespace
     */
    public static function trim($value) {
        return is_string($value) ? trim($value) : $value;
    }
    
    /**
     * Convert to slug
     */
    public static function slug($value) {
        return sanitize_title($value);
    }
    
    /**
     * Convert to lowercase
     */
    public static function lower($value) {
        return is_string($value) ? strtolower($value) : $value;
    }
    
    /**
     * Convert to uppercase
     */
    public static function upper($value) {
        return is_string($value) ? strtoupper($value) : $value;
    }
    
    /**
     * Normalize country code to ISO 3166-1 alpha-2
     */
    public static function country_normalize($value) {
        if (!is_string($value)) {
            return $value;
        }
        
        // Common country mappings
        $countries = [
            'United States' => 'US',
            'USA' => 'US',
            'United Kingdom' => 'GB',
            'UK' => 'GB',
            'France' => 'FR',
            'Germany' => 'DE',
            'Canada' => 'CA',
            'Australia' => 'AU',
            'Japan' => 'JP',
            'China' => 'CN',
            'India' => 'IN',
            'Brazil' => 'BR',
            'Mexico' => 'MX',
            'Spain' => 'ES',
            'Italy' => 'IT',
            'Netherlands' => 'NL',
            'Switzerland' => 'CH',
            'Sweden' => 'SE',
            'Poland' => 'PL',
            'Belgium' => 'BE',
            'Austria' => 'AT'
        ];
        
        // If already 2-letter code, return as-is
        if (strlen($value) === 2) {
            return strtoupper($value);
        }
        
        // Try to map
        return $countries[$value] ?? $value;
    }
    
    /**
     * Normalize currency symbol to ISO code
     */
    public static function currency_normalize($value) {
        if (!is_string($value)) {
            return $value;
        }
        
        $currencies = [
            '$' => 'USD',
            '€' => 'EUR',
            '£' => 'GBP',
            '¥' => 'JPY',
            'USD' => 'USD',
            'EUR' => 'EUR',
            'GBP' => 'GBP',
            'JPY' => 'JPY'
        ];
        
        return $currencies[$value] ?? $value;
    }
}


// ============================================================================
// INITIALIZATION: Bootstrap the plugin
// ============================================================================
// Start the plugin
JCP_Main::instance();
