# JSON Content Processor - Comprehensive Testing Plan

## Test Environment Setup

### Prerequisites
- [ ] Fresh WordPress installation (6.2+)
- [ ] PHP 8.0 or higher
- [ ] Admin user account
- [ ] Browser DevTools open (for console errors)
- [ ] Test JSON files prepared (small, medium, large)

### Environment Checklist
- [ ] WordPress version: ______
- [ ] PHP version: ______
- [ ] MySQL version: ______
- [ ] Active theme: ______
- [ ] Other active plugins: ______

---

## Phase 1: Installation & Activation

### 1.1 Plugin Installation
**Test Case ID:** INST-001  
**Priority:** Critical

**Steps:**
1. Upload `json-content-processor.php` to `/wp-content/plugins/`
2. Navigate to WordPress Admin → Plugins
3. Look for "JSON Content Processor" in plugin list
4. Click "Activate"

**Expected Results:**
- [ ] Plugin appears in plugin list
- [ ] No PHP errors on activation
- [ ] New menu item "JSON Import" appears in admin sidebar
- [ ] Menu icon (database import) displays correctly

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 1.2 Menu Structure
**Test Case ID:** INST-002  
**Priority:** High

**Steps:**
1. Click "JSON Import" in admin menu
2. Verify submenu items

**Expected Results:**
- [ ] Main menu: "JSON Import"
- [ ] Submenu 1: "Dashboard" (auto-selected)
- [ ] Submenu 2: "Profiles"
- [ ] Submenu 3: "Results & Logs"
- [ ] All pages load without errors

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 2: Profile Management

### 2.1 Create New Profile (Basic)
**Test Case ID:** PROF-001  
**Priority:** Critical

**Steps:**
1. Navigate to JSON Import → Profiles
2. Click "Add New Profile"
3. Fill in basic fields:
   - Profile Key: `test_posts`
   - Label: `Test Posts Import`
   - Item Path: `$.items[*]`
4. In the JSON editor, verify default structure loads
5. Click "Save Profile"

**Expected Results:**
- [ ] Profile editor form loads
- [ ] All fields are present and editable
- [ ] JSON textarea contains valid JSON
- [ ] Success message appears
- [ ] Redirects to profile list
- [ ] New profile appears in list

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 2.2 Create Profile with Custom Post Type
**Test Case ID:** PROF-002  
**Priority:** Critical

**Steps:**
1. Create new profile: `cfp_import`
2. Edit the JSON to include:
```json
{
  "profile_key": "cfp_import",
  "label": "Call for Papers Import",
  "item_path": "$.items[*]",
  "content_types": [
    {
      "type": "register_cpt",
      "name": "cfp",
      "args": {
        "label": "Calls for Papers",
        "public": true,
        "show_in_rest": true,
        "supports": ["title", "editor", "excerpt", "custom-fields"]
      }
    }
  ],
  "mappings": {
    "post_type": "cfp",
    "post_status": "publish",
    "post_title": "$.title",
    "post_content": "$.description",
    "meta": {
      "deadline": "$.deadline",
      "source_url": "$.url"
    }
  },
  "update_policy": {
    "match_by": "meta.source_url",
    "on_match": "update",
    "on_missing": "create"
  }
}
```
3. Save profile
4. Navigate to Posts menu area

**Expected Results:**
- [ ] Profile saves successfully
- [ ] New "Calls for Papers" menu item appears in admin
- [ ] CPT is accessible
- [ ] CPT has correct supports (title, editor, etc.)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 2.3 Create Profile with Taxonomy
**Test Case ID:** PROF-003  
**Priority:** High

**Steps:**
1. Edit `cfp_import` profile
2. Add taxonomy to content_types:
```json
{
  "type": "register_taxonomy",
  "name": "discipline",
  "object_type": ["cfp"],
  "args": {
    "label": "Discipline",
    "hierarchical": true,
    "show_in_rest": true
  }
}
```
3. Add to mappings:
```json
"taxonomies": {
  "discipline": "$.discipline[*]"
}
```
4. Save profile

**Expected Results:**
- [ ] Profile saves successfully
- [ ] "Discipline" taxonomy appears under CFP post type menu
- [ ] Taxonomy is hierarchical (like categories)
- [ ] No PHP errors

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 2.4 Edit Existing Profile
**Test Case ID:** PROF-004  
**Priority:** High

**Steps:**
1. From Profiles list, click "Edit" on `cfp_import`
2. Change label to "CFP Import v2"
3. Modify item_path to `$.data.items[*]`
4. Save profile
5. Return to profile list

**Expected Results:**
- [ ] Profile editor loads with existing data
- [ ] Profile Key field is read-only
- [ ] Changes are saved
- [ ] Updated label shows in list
- [ ] No duplicate profiles created

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 2.5 Delete Profile
**Test Case ID:** PROF-005  
**Priority:** High

**Steps:**
1. Create test profile: `delete_me`
2. From profile list, click "Delete"
3. Confirm deletion dialog
4. Verify profile is removed

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] Profile is removed from list
- [ ] Success message displays
- [ ] No PHP errors
- [ ] Option is removed from database

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 2.6 Download Sample JSON
**Test Case ID:** PROF-006  
**Priority:** High

**Steps:**
1. From profile list, click "Download Sample" for `cfp_import`
2. Check downloaded file

**Expected Results:**
- [ ] JSON file downloads
- [ ] File name is descriptive
- [ ] JSON is valid (check with validator)
- [ ] Contains `version`, `source`, `fetched_at`, `items` keys
- [ ] Items array has sample data
- [ ] Sample data matches profile mappings
- [ ] All mapped fields are present in sample

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 3: Import Functionality

### 3.1 Dry Run - Valid JSON (Small File)
**Test Case ID:** IMP-001  
**Priority:** Critical

**Preparation:**
Create `test-small.json`:
```json
{
  "version": "cfp_import",
  "source": "test",
  "fetched_at": "2025-10-15T12:00:00Z",
  "items": [
    {
      "title": "Test CFP 1",
      "description": "This is test description 1",
      "deadline": "2026-01-31T23:59:00Z",
      "url": "https://example.com/cfp1",
      "discipline": ["Computer Science", "AI"]
    },
    {
      "title": "Test CFP 2",
      "description": "This is test description 2",
      "deadline": "2026-02-28T23:59:00Z",
      "url": "https://example.com/cfp2",
      "discipline": ["Design"]
    }
  ]
}
```

**Steps:**
1. Go to JSON Import → Dashboard
2. Upload `test-small.json`
3. Select profile: `cfp_import`
4. Ensure "Dry Run" is checked
5. Click "Run Import"

**Expected Results:**
- [ ] Preview section appears
- [ ] Shows "Total items: 2"
- [ ] Displays preview of first 2 items
- [ ] Preview shows correct mapping:
  - Title mapped correctly
  - Content mapped correctly
  - Meta fields visible
- [ ] No actual posts created
- [ ] "Run Full Import" button appears

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 3.2 Full Import - Create New Posts
**Test Case ID:** IMP-002  
**Priority:** Critical

**Steps:**
1. Use same `test-small.json` from IMP-001
2. After dry run, click "Run Full Import"
3. Wait for progress bar to complete
4. Check alert message
5. Navigate to Calls for Papers

**Expected Results:**
- [ ] Progress bar shows 0% → 100%
- [ ] Progress text updates (e.g., "2/2")
- [ ] Success alert shows: "2 created, 0 updated, 0 failed"
- [ ] Redirects to Results & Logs page
- [ ] 2 new CFP posts exist with:
  - Correct titles
  - Correct content
  - Correct meta fields (deadline, source_url)
  - Correct taxonomy terms (discipline)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 3.3 Update Existing Posts
**Test Case ID:** IMP-003  
**Priority:** High

**Preparation:**
Modify `test-small.json`:
```json
{
  "items": [
    {
      "title": "Test CFP 1 - UPDATED",
      "description": "Updated description",
      "deadline": "2026-03-31T23:59:00Z",
      "url": "https://example.com/cfp1",
      "discipline": ["Computer Science", "Machine Learning"]
    }
  ]
}
```

**Steps:**
1. Import the modified JSON
2. Uncheck "Dry Run"
3. Run import
4. Check existing "Test CFP 1" post

**Expected Results:**
- [ ] Alert shows: "0 created, 1 updated, 0 failed"
- [ ] Post title updated to "Test CFP 1 - UPDATED"
- [ ] Post content updated
- [ ] Meta field `deadline` updated
- [ ] Taxonomy terms updated (Computer Science, Machine Learning)
- [ ] Post ID remains the same (not duplicate)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 3.4 Batch Processing (Large File)
**Test Case ID:** IMP-004  
**Priority:** High

**Preparation:**
Create `test-large.json` with 150 items (use script or manually).

**Steps:**
1. Upload large JSON file
2. Select profile
3. Uncheck dry run
4. Run import
5. Watch progress bar

**Expected Results:**
- [ ] Progress bar updates multiple times (batch processing)
- [ ] Progress text shows incremental updates (50/150, 100/150, 150/150)
- [ ] No timeouts
- [ ] All 150 items processed
- [ ] Success alert at completion
- [ ] All posts created successfully

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 3.5 Import with Media
**Test Case ID:** IMP-005  
**Priority:** High

**Preparation:**
Create profile with media mapping:
```json
"mappings": {
  "media": [
    {
      "field": "thumbnail",
      "path": "$.image_url",
      "as_featured_image": true
    }
  ]
}
```

Test JSON:
```json
{
  "items": [
    {
      "title": "Post with Image",
      "description": "Test",
      "url": "https://example.com/img-test",
      "image_url": "https://via.placeholder.com/640x360.png"
    }
  ]
}
```

**Steps:**
1. Import JSON with image URL
2. Check created post

**Expected Results:**
- [ ] Image downloads successfully
- [ ] Image appears in Media Library
- [ ] Image is attached to post
- [ ] Featured image is set
- [ ] Thumbnail displays on post

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 3.6 Import with Transforms
**Test Case ID:** IMP-006  
**Priority:** Medium

**Preparation:**
Add transforms to profile:
```json
"transforms": [
  {
    "when": "$.deadline",
    "set": "deadline_iso",
    "fn": "date_parse"
  },
  {
    "when": "$.country",
    "set": "country_code",
    "fn": "country_normalize"
  }
]
```

Test JSON:
```json
{
  "items": [
    {
      "title": "Transform Test",
      "description": "Test",
      "url": "https://example.com/transform",
      "deadline": "January 31, 2026",
      "country": "United States"
    }
  ]
}
```

**Steps:**
1. Import JSON
2. Check post meta fields

**Expected Results:**
- [ ] `deadline_iso` meta = "2026-01-31T00:00:00+00:00" (ISO format)
- [ ] `country_code` meta = "US"
- [ ] Transforms executed before mapping

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 4: Error Handling

### 4.1 Invalid JSON Format
**Test Case ID:** ERR-001  
**Priority:** High

**Steps:**
1. Upload file with invalid JSON:
```
{ "items": [ invalid json }
```
2. Try to import

**Expected Results:**
- [ ] Error message: "Invalid JSON format"
- [ ] No PHP errors
- [ ] No posts created
- [ ] User remains on dashboard

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 4.2 Missing Required Fields
**Test Case ID:** ERR-002  
**Priority:** High

**Steps:**
1. Upload JSON with items missing title:
```json
{
  "items": [
    {
      "description": "No title here",
      "url": "https://example.com/no-title"
    }
  ]
}
```
2. Import

**Expected Results:**
- [ ] Import completes
- [ ] Result shows "1 failed"
- [ ] Error logged: "Missing required title" or similar
- [ ] No post created for failed item
- [ ] Error appears in Results page

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 4.3 Invalid Item Path
**Test Case ID:** ERR-003  
**Priority:** Medium

**Steps:**
1. Create profile with item_path: `$.wrong.path[*]`
2. Upload valid JSON with items at `$.items[*]`
3. Run import

**Expected Results:**
- [ ] Error message: "No items found at specified path"
- [ ] No posts created
- [ ] Clear error message to user

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 4.4 Media Download Failure
**Test Case ID:** ERR-004  
**Priority:** Medium

**Steps:**
1. Import JSON with invalid image URL:
```json
"image_url": "https://invalid-domain-12345.com/image.jpg"
```
2. Check import results

**Expected Results:**
- [ ] Post still created (media failure doesn't block post creation)
- [ ] Error logged for media download
- [ ] No featured image set
- [ ] Error visible in Results page

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 4.5 Duplicate Meta Keys (No Match)
**Test Case ID:** ERR-005  
**Priority:** Low

**Steps:**
1. Import item without `source_url` meta (used for matching)
2. Import again
3. Check for duplicates

**Expected Results:**
- [ ] Two separate posts created
- [ ] No match found (no source_url to match on)
- [ ] Both posts exist independently

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 5: Results & Logging

### 5.1 View Results List
**Test Case ID:** RES-001  
**Priority:** High

**Steps:**
1. Navigate to JSON Import → Results & Logs
2. After several imports, check the list

**Expected Results:**
- [ ] All runs displayed in reverse chronological order
- [ ] Each run shows:
  - Date/time
  - Profile used
  - File name
  - Badge counts (created/updated/failed)
  - Success rate percentage
- [ ] Success rate color-coded:
  - Green ≥90%
  - Yellow 70-89%
  - Red <70%

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 5.2 View Run Details
**Test Case ID:** RES-002  
**Priority:** High

**Steps:**
1. Click "View Details" on a run with errors
2. Review details page

**Expected Results:**
- [ ] Summary box shows success rate prominently
- [ ] Detailed stats: X created, Y updated, Z skipped, W failed of N total
- [ ] Errors table displays:
  - Item index
  - Error message
- [ ] "Back to All Results" button works
- [ ] Maximum 100 errors shown (per spec)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 5.3 Results Persistence
**Test Case ID:** RES-003  
**Priority:** Medium

**Steps:**
1. Run 60 different imports (more than max 50)
2. Check Results page

**Expected Results:**
- [ ] Only last 50 runs are stored
- [ ] Oldest runs are automatically removed
- [ ] No database bloat

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 6: Security Testing

### 6.1 Non-Admin Access
**Test Case ID:** SEC-001  
**Priority:** Critical

**Steps:**
1. Log out
2. Create new user with "Subscriber" role
3. Log in as subscriber
4. Try to access plugin pages

**Expected Results:**
- [ ] "JSON Import" menu not visible to subscriber
- [ ] Direct URL access blocked (e.g., `/wp-admin/admin.php?page=jcp-dashboard`)
- [ ] 403 or redirect to dashboard
- [ ] REST endpoints return permission error

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 6.2 Nonce Verification
**Test Case ID:** SEC-002  
**Priority:** Critical

**Steps:**
1. Open DevTools → Network tab
2. Start creating a profile
3. Intercept the AJAX request
4. Modify or remove the nonce parameter
5. Replay request

**Expected Results:**
- [ ] Request fails
- [ ] Error: "Invalid nonce" or similar
- [ ] No data saved
- [ ] No SQL injection possible

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 6.3 File Type Restriction
**Test Case ID:** SEC-003  
**Priority:** High

**Steps:**
1. Try to upload `.php` file instead of `.json`
2. Rename `.php` to `.json` and try

**Expected Results:**
- [ ] File input only accepts `.json` files
- [ ] Server validates JSON content
- [ ] Malicious PHP doesn't execute

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 6.4 SQL Injection Attempts
**Test Case ID:** SEC-004  
**Priority:** Critical

**Steps:**
1. Create profile with SQL injection in mappings:
```json
"post_title": "'; DROP TABLE wp_posts; --"
```
2. Import JSON with injection attempts

**Expected Results:**
- [ ] No SQL executed
- [ ] Values properly escaped
- [ ] Database unchanged
- [ ] Post created with literal text (not executed)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 7: Performance Testing

### 7.1 Large File Handling (500+ items)
**Test Case ID:** PERF-001  
**Priority:** Medium

**Steps:**
1. Create JSON with 500 items
2. Import
3. Monitor server resources

**Expected Results:**
- [ ] Import completes without timeout
- [ ] Memory usage stays reasonable (<256MB)
- [ ] Progress bar updates smoothly
- [ ] No browser freezing
- [ ] Process completes in reasonable time (<5 min)

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 7.2 Concurrent Imports
**Test Case ID:** PERF-002  
**Priority:** Low

**Steps:**
1. Open two browser tabs
2. Start import in both simultaneously

**Expected Results:**
- [ ] Both imports process
- [ ] No conflicts
- [ ] Both complete successfully
- [ ] Results tracked separately

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 8: Edge Cases

### 8.1 Empty JSON Array
**Test Case ID:** EDGE-001  
**Priority:** Medium

**Steps:**
1. Import JSON with empty items array:
```json
{
  "items": []
}
```

**Expected Results:**
- [ ] Error or message: "No items found"
- [ ] No crash
- [ ] No posts created

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 8.2 Deeply Nested JSON
**Test Case ID:** EDGE-002  
**Priority:** Medium

**Steps:**
1. Import JSON with deeply nested structure:
```json
{
  "items": [{
    "data": {
      "content": {
        "body": {
          "text": {
            "value": "Deep value"
          }
        }
      }
    }
  }]
}
```
2. Map using: `$.data.content.body.text.value`

**Expected Results:**
- [ ] JSONPath correctly traverses
- [ ] Value extracted properly
- [ ] Post created with correct content

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 8.3 Special Characters in Content
**Test Case ID:** EDGE-003  
**Priority:** Medium

**Steps:**
1. Import JSON with special characters:
```json
{
  "items": [{
    "title": "Test <script>alert('xss')</script> & 'quotes' \"double\"",
    "description": "Content with émojis 🎉 and üñíçödé"
  }]
}
```

**Expected Results:**
- [ ] HTML entities properly escaped
- [ ] No XSS execution
- [ ] Unicode characters display correctly
- [ ] Quotes handled properly

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 8.4 Taxonomy Auto-Creation
**Test Case ID:** EDGE-004  
**Priority:** High

**Steps:**
1. Import items with new taxonomy terms:
```json
"discipline": ["Brand New Category", "Another New One"]
```
2. Check taxonomy

**Expected Results:**
- [ ] New terms created automatically
- [ ] Terms assigned to post
- [ ] Terms visible in admin
- [ ] No duplicate terms created

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 8.5 JSONPath OR Operator
**Test Case ID:** EDGE-005  
**Priority:** Medium

**Steps:**
1. Create mapping with OR:
```json
"post_content": "$.description_html || $.description_text || $.body"
```
2. Import items with only `$.body` present

**Expected Results:**
- [ ] Falls through to third option
- [ ] Correct content extracted
- [ ] First non-empty value used

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 9: UI/UX Testing

### 9.1 Responsive Design
**Test Case ID:** UX-001  
**Priority:** Low

**Steps:**
1. Resize browser window
2. Test on tablet viewport (768px)
3. Test on mobile viewport (375px)

**Expected Results:**
- [ ] Forms remain usable
- [ ] Tables scroll horizontally if needed
- [ ] Buttons remain accessible
- [ ] No overlapping elements

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 9.2 Accessibility
**Test Case ID:** UX-002  
**Priority:** Medium

**Steps:**
1. Navigate plugin using only keyboard (Tab key)
2. Use screen reader (NVDA/JAWS)

**Expected Results:**
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Labels properly associated
- [ ] ARIA live regions for progress updates

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 9.3 Browser Compatibility
**Test Case ID:** UX-003  
**Priority:** Medium

**Test in multiple browsers:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

**Expected Results:**
- [ ] Consistent appearance
- [ ] All functionality works
- [ ] No console errors
- [ ] File upload works

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Phase 10: Integration Testing

### 10.1 Plugin Conflicts
**Test Case ID:** INT-001  
**Priority:** Medium

**Steps:**
1. Activate popular plugins:
   - Yoast SEO
   - WooCommerce
   - Contact Form 7
2. Test basic import functionality

**Expected Results:**
- [ ] No JavaScript conflicts
- [ ] No CSS conflicts
- [ ] Import still works
- [ ] No admin page issues

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 10.2 Theme Compatibility
**Test Case ID:** INT-002  
**Priority:** Medium

**Steps:**
1. Switch to different themes:
   - Twenty Twenty-Four
   - Astra
   - GeneratePress
2. View imported posts on frontend

**Expected Results:**
- [ ] Plugin admin pages unaffected
- [ ] Posts display correctly
- [ ] Featured images show
- [ ] Meta fields accessible

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

### 10.3 Multisite Compatibility
**Test Case ID:** INT-003  
**Priority:** Low

**Steps:**
1. Install on WordPress Multisite
2. Network activate
3. Test on different subsites

**Expected Results:**
- [ ] Plugin works on each subsite independently
- [ ] Profiles don't cross between sites
- [ ] No network-wide conflicts

**Pass/Fail:** ____  
**Notes:** ____________________________________________

---

## Test Summary Template

### Overall Results
- **Total Test Cases:** 60
- **Passed:** ______
- **Failed:** ______
- **Skipped:** ______
- **Pass Rate:** ______%

### Critical Issues Found
1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

### Recommended Actions
- [ ] Issue #1: ________________________________________
- [ ] Issue #2: ________________________________________
- [ ] Issue #3: ________________________________________

### Sign-off
- **Tester Name:** ______________________
- **Date:** ______________________
- **Status:** ☐ Ready for Production  ☐ Needs Fixes  ☐ Major Issues

---

## Automated Testing Script (Optional)

For repetitive tests, you can use this WP-CLI script:

```bash
#!/bin/bash
# basic-smoke-test.sh

echo "=== JCP Plugin Smoke Test ==="

# Check if plugin is active
wp plugin is-active json-content-processor
if [ $? -eq 0 ]; then
    echo "✓ Plugin is active"
else
    echo "✗ Plugin is not active"
    exit 1
fi

# Check if menu exists (by checking for options)
wp option get jcp_profiles
if [ $? -eq 0 ]; then
    echo "✓ Plugin options exist"
else
    echo "✓ Plugin options initialized (empty is ok)"
fi

# Check if CPT exists
wp post-type list --format=csv | grep "cfp"
if [ $? -eq 0 ]; then
    echo "✓ Custom post types registered"
fi

echo "=== Smoke test complete ==="
```

---

## Notes for Testers

### Tips
- Test one feature at a time
- Document actual vs expected results
- Take screenshots of errors
- Note browser/environment for each issue
- Check PHP error logs: `/wp-content/debug.log`

### Common Issues to Watch For
- White screen of death (PHP fatal error)
- JavaScript console errors
- Database query failures
- Memory exhaustion on large imports
- Timeout on batch processing
- Encoding issues with special characters

### Useful Tools
- **Browser DevTools:** Network tab, Console
- **Query Monitor plugin:** For database queries
- **Debug Bar plugin:** For PHP errors
- **JSON Validator:** jsonlint.com
- **Postman:** For REST API testing