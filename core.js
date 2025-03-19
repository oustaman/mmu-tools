        // Application state
        let state = {
            fontSizeMultiplier: 1
        };

        // DOM elements cache
        let elements = {};

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM loaded, initializing application");
            
            // Cache important DOM elements
            cacheElements();
            
            // First, set up the theme
            initializeThemeToggle();
            
            // Apply font size from localStorage - only affects main content
            const storedFontSize = localStorage.getItem('fontSizeMultiplier');
            if (storedFontSize) {
                state.fontSizeMultiplier = parseFloat(storedFontSize);
                document.documentElement.style.setProperty('--font-size-multiplier', state.fontSizeMultiplier.toString());
                updateMainContentFontSize();
            }
            
            // Set up event listeners
            setupEventListeners();
            
            console.log("Application initialized successfully");
        });

        // Cache DOM elements for performance
        function cacheElements() {
            elements = {
                // Main containers
                
                // Search and controls
                searchInput: document.getElementById('search-input'),
                mobileSearchInput: document.getElementById('mobile-search-input'),
                fontSizeControls: {
                    increase: document.getElementById('increase-font'),
                    decrease: document.getElementById('decrease-font')
                },
                
                // Navigation
                tabs: document.querySelectorAll('.nav-tab'),
                tabContents: document.querySelectorAll('.tab-content'),
                
                // Sidebars
                sidebar: document.querySelector('.sidebar'),
                hamburgerMenu: document.querySelector('.hamburger-menu'),
                rightSidebar: document.querySelector('.right-sidebar'),
                toggleRightSidebar: document.querySelector('.toggle-right-sidebar')
            };
        }

        // Initialize theme toggle
        function initializeThemeToggle() {
            // Get theme toggle button and icon
            const themeToggle = document.querySelector('.theme-toggle');
            if (!themeToggle) return;
            
            const themeIcon = themeToggle.querySelector('i');
            if (!themeIcon) return;
            
            // Load theme from localStorage or use default light theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            
            // Apply the theme
            if (savedTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Theme toggle event listener
            themeToggle.addEventListener('click', function() {
                const html = document.documentElement;
                const icon = this.querySelector('i');
                
                if (html.getAttribute('data-theme') === 'light') {
                    // Switch to dark mode
                    html.setAttribute('data-theme', 'dark');
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'dark');
                } else {
                    // Switch to light mode
                    html.setAttribute('data-theme', 'light');
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'light');
                }
            });
        }

        // Toggle left sidebar
        function toggleSidebar() {
            elements.sidebar.classList.toggle('collapsed');
            updateMainContentClasses();
        }

        // Toggle right sidebar
        function toggleRightSidebar() {
            elements.rightSidebar.classList.toggle('collapsed');
            updateMainContentClasses();
        }

        // Update main content margins based on sidebar states
        function updateMainContentClasses() {
            const mainContent = document.querySelector('.main-content');
            const leftSidebar = document.querySelector('.sidebar');
            const rightSidebar = document.querySelector('.right-sidebar');
            
            if (!mainContent || !leftSidebar || !rightSidebar) return;
            
            mainContent.classList.remove('left-expanded', 'right-expanded', 'fully-expanded');
            
            const leftCollapsed = leftSidebar.classList.contains('collapsed');
            const rightCollapsed = rightSidebar.classList.contains('collapsed');
            
            if (leftCollapsed && rightCollapsed) {
                mainContent.classList.add('fully-expanded');
            } else if (leftCollapsed) {
                mainContent.classList.add('left-expanded');
            } else if (rightCollapsed) {
                mainContent.classList.add('right-expanded');
            }
        }

        // Font size controls - only affect main content
        function increaseFontSize() {
            if (state.fontSizeMultiplier < 1.5) {
                state.fontSizeMultiplier += 0.1;
                document.documentElement.style.setProperty('--font-size-multiplier', state.fontSizeMultiplier.toString());
                localStorage.setItem('fontSizeMultiplier', state.fontSizeMultiplier.toString());
                
                // Apply size change only to main content elements
                updateMainContentFontSize();
            }
        }

        function decreaseFontSize() {
            if (state.fontSizeMultiplier > 0.8) {
                state.fontSizeMultiplier -= 0.1;
                document.documentElement.style.setProperty('--font-size-multiplier', state.fontSizeMultiplier.toString());
                localStorage.setItem('fontSizeMultiplier', state.fontSizeMultiplier.toString());
                
                // Apply size change only to main content elements
                updateMainContentFontSize();
            }
        }
        
        // Helper function to apply font size changes only to main content
        function updateMainContentFontSize() {
            // This function isn't actually needed with our CSS approach,
            // but kept here in case we need to add specific JavaScript font size manipulations
            console.log("Main content font size updated: " + state.fontSizeMultiplier);
        }

        // Set up all event listeners
        function setupEventListeners() {
            // Hamburger menu toggle
            if (elements.hamburgerMenu) {
                elements.hamburgerMenu.addEventListener('click', toggleSidebar);
            }
            
            // Toggle right sidebar button
            if (elements.toggleRightSidebar) {
                elements.toggleRightSidebar.addEventListener('click', toggleRightSidebar);
            }
            
            // Font size controls
            if (elements.fontSizeControls.increase) {
                elements.fontSizeControls.increase.addEventListener('click', increaseFontSize);
            }
            
            if (elements.fontSizeControls.decrease) {
                elements.fontSizeControls.decrease.addEventListener('click', decreaseFontSize);
            }
            
            // Tab navigation
            if (elements.tabs) {
                elements.tabs.forEach(tab => {
                    tab.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Update active tab
                        elements.tabs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Get the tab id from the href
                        const tabId = this.getAttribute('href').substring(1);
                        
                        // Hide all tab content
                        elements.tabContents.forEach(content => {
                            content.classList.remove('active');
                        });
                        
                        // Show the selected tab content
                        document.getElementById(tabId + '-tab-content').classList.add('active');
                    });
                });
            }
            
            // Sync search inputs (optional functionality)
            if (elements.searchInput && elements.mobileSearchInput) {
                elements.searchInput.addEventListener('input', function() {
                    if (elements.mobileSearchInput) {
                        elements.mobileSearchInput.value = this.value;
                    }
                });
                
                elements.mobileSearchInput.addEventListener('input', function() {
                    if (elements.searchInput) {
                        elements.searchInput.value = this.value;
                    }
                });
            }
        }