/**
 * University Modules Portal Application
 * This file contains the main functionality for the portal.
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const programsContainer = document.getElementById('programs-container');
    const favoritesBody = document.getElementById('favorites-body');
    const programCount = document.getElementById('program-count');
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const noResults = document.getElementById('no-results');
    
    // Filter buttons
    const semAll = document.getElementById('sem-all');
    const sem1 = document.getElementById('sem-1');
    const sem2 = document.getElementById('sem-2');
    const viewAll = document.getElementById('view-all');
    const viewFavorites = document.getElementById('view-favorites');
    const toggleAllPrograms = document.getElementById('toggle-all-programs');
    
    // Custom module elements
    const customModuleToggle = document.getElementById('custom-module-toggle');
    const closeCustomModule = document.getElementById('close-custom-module');
    const addCustomModule = document.getElementById('add-custom-module');
    
    // State
    let currentFilter = {
        semester: 'all',
        view: 'all',
        search: ''
    };
    
    let pinnedModules = JSON.parse(localStorage.getItem('pinnedModules')) || [];
    let customModules = JSON.parse(localStorage.getItem('customModules')) || [];
    let customLinks = JSON.parse(localStorage.getItem('customLinks')) || {};
    let expandedPrograms = {};
    
    // Combine built-in modules with custom modules
    const getAllModules = () => {
        const allModules = { ...MODULES_DATA };
        customModules.forEach(module => {
            allModules[module.id] = module;
        });
        return allModules;
    };
    
    // Initialize
    initializeApp();
    
    function initializeApp() {
        // Update program count
        programCount.textContent = PROGRAMS_DATA.length;
        
        // Render programs and modules
        renderPrograms();
        renderPinnedModules();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function renderPrograms() {
        programsContainer.innerHTML = '';
        let visibleProgramCount = 0;
        
        PROGRAMS_DATA.forEach(program => {
            const programModules = getFilteredModulesForProgram(program);
            
            // Skip rendering if no modules match the filter
            if (programModules.length === 0 && currentFilter.search !== '') {
                return;
            }
            
            visibleProgramCount++;
            
            const programElement = createProgramElement(program, programModules);
            programsContainer.appendChild(programElement);
        });
        
        // Show/hide no results message
        noResults.classList.toggle('hidden', visibleProgramCount > 0);
    }
    
    function getFilteredModulesForProgram(program) {
        const allModules = getAllModules();
        return program.moduleIds
            .map(id => allModules[id])
            .filter(module => {
                // Filter by semester
                if (currentFilter.semester !== 'all' && module.semester !== parseInt(currentFilter.semester)) {
                    return false;
                }
                
                // Filter by search
                if (currentFilter.search !== '') {
                    const searchTerm = currentFilter.search.toLowerCase();
                    return (
                        module.code.toLowerCase().includes(searchTerm) ||
                        module.name.toLowerCase().includes(searchTerm) ||
                        module.leader.toLowerCase().includes(searchTerm)
                    );
                }
                
                return true;
            });
    }
    
    function createProgramElement(program, modules) {
        const programDiv = document.createElement('div');
        programDiv.className = 'program-card rounded-lg border border-border-color overflow-hidden';
        
        // Program header
        const header = document.createElement('div');
        header.className = 'program-header px-4 py-3 bg-bg-secondary cursor-pointer';
        header.innerHTML = `
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium">${program.name}</h3>
                <button class="program-toggle text-accent-color">
                    <i class="fas fa-angle-down transition-transform ${expandedPrograms[program.id] ? 'rotate-180' : ''}"></i>
                </button>
            </div>
            <div class="text-sm text-muted">${modules.length} module${modules.length !== 1 ? 's' : ''}</div>
        `;
        
        // Program modules container
        const modulesContainer = document.createElement('div');
        modulesContainer.className = `program-modules ${expandedPrograms[program.id] ? 'expanded' : ''}`;
        
        // Create module table
        const table = document.createElement('table');
        table.className = 'min-w-full divide-y';
        
        // Table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Leader</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Year</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Semester</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Links</th>
                <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
        `;
        
        // Table body
        const tbody = document.createElement('tbody');
        tbody.className = 'divide-y';
        
        // Add modules to table
        modules.forEach(module => {
            const row = createModuleRow(module);
            tbody.appendChild(row);
        });
        
        table.appendChild(thead);
        table.appendChild(tbody);
        modulesContainer.appendChild(table);
        
        // Add click handler to toggle program expansion
        header.addEventListener('click', () => {
            expandedPrograms[program.id] = !expandedPrograms[program.id];
            modulesContainer.classList.toggle('expanded');
            header.querySelector('.program-toggle i').classList.toggle('rotate-180');
        });
        
        programDiv.appendChild(header);
        programDiv.appendChild(modulesContainer);
        
        return programDiv;
    }
    
    function createModuleRow(module) {
        const isPinned = pinnedModules.includes(module.id);
        
        const row = document.createElement('tr');
        row.className = 'bg-bg-primary';
        if (module.isCustom) {
            row.classList.add('custom-module');
        }
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium">${highlightSearchTerm(module.code)}</div>
            </td>
            <td class="px-6 py-4">
                <div>${highlightSearchTerm(module.name)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${highlightSearchTerm(module.leader)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                Year ${module.year}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                Semester ${module.semester}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                    ${module.moodleLink ? `<a href="${module.moodleLink}" target="_blank" class="text-accent-color hover:text-accent-hover" title="Open Moodle">
                        <i class="fas fa-graduation-cap"></i>
                    </a>` : ''}
                    ${module.specLink ? `<a href="${module.specLink}" target="_blank" class="text-accent-color hover:text-accent-hover" title="View Specification">
                        <i class="fas fa-file-alt"></i>
                    </a>` : ''}
                    <button class="add-custom-link text-accent-color hover:text-accent-hover" data-module-id="${module.id}" title="Add Custom Link">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </div>
                <div class="custom-links-container mt-2" id="custom-links-${module.id}">
                    ${renderCustomLinks(module.id)}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
                <button class="pin-button ${isPinned ? 'pin-button-pinned' : 'pin-button-primary'}" data-module-id="${module.id}">
                    <i class="fas ${isPinned ? 'fa-thumbtack' : 'fa-thumbtack'} mr-1"></i>
                    ${isPinned ? 'Pinned' : 'Pin'}
                </button>
            </td>
        `;
        
        // Add event listener to pin/unpin button
        row.querySelector('.pin-button').addEventListener('click', (e) => {
            e.stopPropagation();
            togglePinModule(module.id);
        });
        
        // Add event listener to add custom link button
        row.querySelector('.add-custom-link').addEventListener('click', (e) => {
            e.stopPropagation();
            openCustomLinkModal(module.id);
        });
        
        return row;
    }
    
    function renderPinnedModules() {
        // Hide favorites container if no pinned modules
        const favoritesContainer = document.getElementById('favorites-container');
        favoritesContainer.style.display = pinnedModules.length > 0 ? 'block' : 'none';
        
        if (pinnedModules.length === 0) {
            return;
        }
        
        // Clear existing content
        favoritesBody.innerHTML = '';
        
        // Get all modules including custom ones
        const allModules = getAllModules();
        
        // Render each pinned module
        pinnedModules.forEach(moduleId => {
            const module = allModules[moduleId];
            if (!module) return; // Skip if module no longer exists
            
            const row = document.createElement('tr');
            row.className = 'bg-bg-primary';
            if (module.isCustom) {
                row.classList.add('custom-module');
            }
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium">${module.code}</div>
                </td>
                <td class="px-6 py-4">
                    <div>${module.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${module.leader}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    Year ${module.year}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    Semester ${module.semester}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex space-x-2">
                        ${module.moodleLink ? `<a href="${module.moodleLink}" target="_blank" class="text-accent-color hover:text-accent-hover" title="Open Moodle">
                            <i class="fas fa-graduation-cap"></i>
                        </a>` : ''}
                        ${module.specLink ? `<a href="${module.specLink}" target="_blank" class="text-accent-color hover:text-accent-hover" title="View Specification">
                            <i class="fas fa-file-alt"></i>
                        </a>` : ''}
                        <button class="add-custom-link text-accent-color hover:text-accent-hover" data-module-id="${module.id}" title="Add Custom Link">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                    <div class="custom-links-container mt-2" id="pinned-custom-links-${module.id}">
                        ${renderCustomLinks(module.id)}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button class="unpin-button" data-module-id="${module.id}">
                        <i class="fas fa-thumbtack mr-1"></i>
                        Unpin
                    </button>
                </td>
            `;
            
            // Add event listener to unpin button
            row.querySelector('.unpin-button').addEventListener('click', (e) => {
                e.stopPropagation();
                togglePinModule(module.id);
            });
            
            // Add event listener to add custom link button
            row.querySelector('.add-custom-link').addEventListener('click', (e) => {
                e.stopPropagation();
                openCustomLinkModal(module.id);
            });
            
            favoritesBody.appendChild(row);
        });
    }
    
    function renderCustomLinks(moduleId) {
        if (!customLinks[moduleId] || customLinks[moduleId].length === 0) {
            return '';
        }
        
        let linksHtml = '';
        customLinks[moduleId].forEach((link, index) => {
            linksHtml += `
                <div class="custom-link mt-1">
                    <a href="${link.url}" target="_blank" class="text-accent-color hover:text-accent-hover">
                        <i class="fas fa-link mr-1"></i>${link.name}
                    </a>
                    <button class="delete-link text-red-500 hover:text-red-700 ml-2" 
                            data-module-id="${moduleId}" 
                            data-link-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        return linksHtml;
    }
    
    function togglePinModule(moduleId) {
        const index = pinnedModules.indexOf(moduleId);
        
        if (index === -1) {
            // Add to pinned modules
            pinnedModules.push(moduleId);
        } else {
            // Remove from pinned modules
            pinnedModules.splice(index, 1);
        }
        
        // Save to localStorage
        localStorage.setItem('pinnedModules', JSON.stringify(pinnedModules));
        
        // Re-render the views
        renderPrograms();
        renderPinnedModules();
    }
    
    function highlightSearchTerm(text) {
        if (!currentFilter.search) {
            return text;
        }
        
        const searchTerm = currentFilter.search.toLowerCase();
        const index = text.toLowerCase().indexOf(searchTerm);
        
        if (index === -1) {
            return text;
        }
        
        const before = text.substring(0, index);
        const match = text.substring(index, index + searchTerm.length);
        const after = text.substring(index + searchTerm.length);
        
        return `${before}<span class="highlight">${match}</span>${after}`;
    }
    
    function setupEventListeners() {
        // Filter buttons
        semAll.addEventListener('click', () => updateFilter('semester', 'all'));
        sem1.addEventListener('click', () => updateFilter('semester', '1'));
        sem2.addEventListener('click', () => updateFilter('semester', '2'));
        viewAll.addEventListener('click', () => updateFilter('view', 'all'));
        viewFavorites.addEventListener('click', () => updateFilter('view', 'favorites'));
        
        // Custom module toggle
        customModuleToggle.addEventListener('click', () => {
            document.body.classList.add('custom-module-visible');
        });
        
        closeCustomModule.addEventListener('click', () => {
            document.body.classList.remove('custom-module-visible');
        });
        
        // Add custom module button
        addCustomModule.addEventListener('click', () => {
            addNewCustomModule();
        });
        
        // Toggle all programs
        toggleAllPrograms.addEventListener('click', () => {
            const isExpanding = toggleAllPrograms.querySelector('i').classList.contains('fa-angle-double-down');
            
            PROGRAMS_DATA.forEach(program => {
                expandedPrograms[program.id] = isExpanding;
            });
            
            const programModules = document.querySelectorAll('.program-modules');
            programModules.forEach(element => {
                if (isExpanding) {
                    element.classList.add('expanded');
                } else {
                    element.classList.remove('expanded');
                }
            });
            
            const toggleIcons = document.querySelectorAll('.program-toggle i');
            toggleIcons.forEach(icon => {
                if (isExpanding) {
                    icon.classList.add('rotate-180');
                } else {
                    icon.classList.remove('rotate-180');
                }
            });
            
            // Update button text and icon
            if (isExpanding) {
                toggleAllPrograms.innerHTML = '<i class="fas fa-angle-double-up mr-1"></i> Collapse All';
            } else {
                toggleAllPrograms.innerHTML = '<i class="fas fa-angle-double-down mr-1"></i> Expand All';
            }
        });
        
        // Search input
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            currentFilter.search = searchTerm;
            mobileSearchInput.value = searchTerm; // Keep mobile search in sync
            renderPrograms();
        });
        
        // Mobile search input
        mobileSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            currentFilter.search = searchTerm;
            searchInput.value = searchTerm; // Keep desktop search in sync
            renderPrograms();
        });
        
        // Custom link modal handlers
        setupModalHandlers();
        
        // Delete custom link handler (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.delete-link')) {
                const button = e.target.closest('.delete-link');
                const moduleId = button.dataset.moduleId;
                const linkIndex = parseInt(button.dataset.linkIndex);
                
                deleteCustomLink(moduleId, linkIndex);
            }
        });
        
        // Tab navigation
        const navTabs = document.querySelectorAll('.nav-tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs and contents
                navTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get the target content ID and activate it
                const targetId = tab.getAttribute('href').substring(1);
                const targetContent = document.getElementById(`${targetId}-tab-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Clear all data button
        const clearAllDataBtn = document.getElementById('clear-all-data');
        if (clearAllDataBtn) {
            clearAllDataBtn.addEventListener('click', () => {
                showConfirmationModal();
            });
        }
        
        // Confirmation modal handlers
        const confirmClear = document.getElementById('confirm-clear');
        const cancelClear = document.getElementById('cancel-clear');
        const confirmClearModal = document.getElementById('confirm-clear-modal');
        
        if (confirmClear && cancelClear && confirmClearModal) {
            confirmClear.addEventListener('click', () => {
                clearAllData();
                confirmClearModal.classList.remove('visible');
            });
            
            cancelClear.addEventListener('click', () => {
                confirmClearModal.classList.remove('visible');
            });
        }
        
        // Sidebar and mobile menu handlers
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        
        if (hamburgerMenu && sidebar) {
            hamburgerMenu.addEventListener('click', () => {
                sidebar.classList.toggle('sidebar-open');
            });
        }
        
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                const icon = themeToggle.querySelector('i');
                if (newTheme === 'dark') {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            });
        }
        
        // Right sidebar toggle
        const rightSidebarToggle = document.querySelector('.toggle-right-sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        
        if (rightSidebarToggle && rightSidebar) {
            rightSidebarToggle.addEventListener('click', () => {
                rightSidebar.classList.toggle('right-sidebar-open');
            });
        }
        
        // Font size controls
        const increaseFontBtn = document.getElementById('increase-font');
        const decreaseFontBtn = document.getElementById('decrease-font');
        
        if (increaseFontBtn && decreaseFontBtn) {
            // Get saved font size or use default
            let fontSize = parseInt(localStorage.getItem('fontSize')) || 100;
            
            // Apply saved font size
            document.documentElement.style.fontSize = `${fontSize}%`;
            
            increaseFontBtn.addEventListener('click', () => {
                if (fontSize < 150) {
                    fontSize += 10;
                    document.documentElement.style.fontSize = `${fontSize}%`;
                    localStorage.setItem('fontSize', fontSize.toString());
                }
            });
            
            decreaseFontBtn.addEventListener('click', () => {
                if (fontSize > 70) {
                    fontSize -= 10;
                    document.documentElement.style.fontSize = `${fontSize}%`;
                    localStorage.setItem('fontSize', fontSize.toString());
                }
            });
        }
    }
    
    function updateFilter(type, value) {
        // Update filter state
        currentFilter[type] = value;
        
        // Update active button styling
        if (type === 'semester') {
            semAll.classList.toggle('active', value === 'all');
            sem1.classList.toggle('active', value === '1');
            sem2.classList.toggle('active', value === '2');
        } else if (type === 'view') {
            viewAll.classList.toggle('active', value === 'all');
            viewFavorites.classList.toggle('active', value === 'favorites');
            
            // Show/hide main views based on selection
            const programsView = document.getElementById('programs-view');
            if (value === 'all') {
                programsView.style.display = 'block';
            } else {
                programsView.style.display = 'none';
            }
        }
        
        // Re-render with new filters
        renderPrograms();
    }
    
    function addNewCustomModule() {
        // Get form values
        const codeInput = document.getElementById('custom-code');
        const nameInput = document.getElementById('custom-name');
        const leaderInput = document.getElementById('custom-leader');
        const yearInput = document.getElementById('custom-year');
        const semesterInput = document.getElementById('custom-semester');
        const moodleInput = document.getElementById('custom-moodle');
        
        const code = codeInput.value.trim();
        const name = nameInput.value.trim();
        const leader = leaderInput.value.trim();
        const year = parseInt(yearInput.value);
        const semester = parseInt(semesterInput.value);
        const moodleLink = moodleInput.value.trim();
        
        // Validate required fields
        if (!code || !name || !leader) {
            showNotice('Missing Information', 'Please fill in all required fields.');
            return;
        }
        
        // Create new custom module
        const moduleId = `custom-${Date.now()}`;
        const newModule = {
            id: moduleId,
            code,
            name,
            leader,
            year,
            semester,
            moodleLink: moodleLink || null,
            specLink: null,
            isCustom: true
        };
        
        // Add to custom modules
        customModules.push(newModule);
        
        // Save to localStorage
        localStorage.setItem('customModules', JSON.stringify(customModules));
        
        // Pin this module by default
        pinnedModules.push(moduleId);
        localStorage.setItem('pinnedModules', JSON.stringify(pinnedModules));
        
        // Clear form
        codeInput.value = '';
        nameInput.value = '';
        leaderInput.value = '';
        yearInput.value = '1';
        semesterInput.value = '1';
        moodleInput.value = '';
        
        // Hide custom module section
        document.body.classList.remove('custom-module-visible');
        
        // Show success notice
        showNotice('Module Added', `${code} - ${name} has been added to your modules.`);
        
        // Re-render views
        renderPrograms();
        renderPinnedModules();
    }
    
    function setupModalHandlers() {
        const customLinkModal = document.getElementById('custom-link-modal');
        const closeModal = document.getElementById('close-modal');
        const saveLink = document.getElementById('save-link');
        const linkModuleId = document.getElementById('link-module-id');
        const linkName = document.getElementById('link-name');
        const linkUrl = document.getElementById('link-url');
        
        // Add custom link button (using event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-custom-link')) {
                const button = e.target.closest('.add-custom-link');
                const moduleId = button.dataset.moduleId;
                openCustomLinkModal(moduleId);
            }
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                customLinkModal.classList.remove('visible');
            });
        }
        
        // Save custom link
        if (saveLink) {
            saveLink.addEventListener('click', () => {
                const moduleId = linkModuleId.value;
                const name = linkName.value.trim();
                const url = linkUrl.value.trim();
                
                if (!name || !url) {
                    showNotice('Missing Information', 'Please provide both name and URL for your link.');
                    return;
                }
                
                // Add http:// prefix if missing
                let finalUrl = url;
                if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
                    finalUrl = 'https://' + finalUrl;
                }
                
                // Initialize custom links for this module if needed
                if (!customLinks[moduleId]) {
                    customLinks[moduleId] = [];
                }
                
                // Add new link
                customLinks[moduleId].push({
                    name,
                    url: finalUrl
                });
                
                // Save to localStorage
                localStorage.setItem('customLinks', JSON.stringify(customLinks));
                
                // Close modal and clear inputs
                customLinkModal.classList.remove('visible');
                linkName.value = '';
                linkUrl.value = '';
                
                // Re-render custom links
                updateCustomLinksDisplay(moduleId);
            });
        }
    }
    
    function openCustomLinkModal(moduleId) {
        const customLinkModal = document.getElementById('custom-link-modal');
        const linkModuleId = document.getElementById('link-module-id');
        
        // Set the module ID in the hidden input
        linkModuleId.value = moduleId;
        
        // Show the modal
        customLinkModal.classList.add('visible');
        
        // Focus the name input
        document.getElementById('link-name').focus();
    }
    
    function deleteCustomLink(moduleId, index) {
        if (customLinks[moduleId] && customLinks[moduleId][index]) {
            // Remove the link
            customLinks[moduleId].splice(index, 1);
            
            // If no more links for this module, remove the empty array
            if (customLinks[moduleId].length === 0) {
                delete customLinks[moduleId];
            }
            
            // Save to localStorage
            localStorage.setItem('customLinks', JSON.stringify(customLinks));
            
            // Update the display
            updateCustomLinksDisplay(moduleId);
        }
    }
    
    function updateCustomLinksDisplay(moduleId) {
        // Update in main modules list
        const mainLinksContainer = document.getElementById(`custom-links-${moduleId}`);
        if (mainLinksContainer) {
            mainLinksContainer.innerHTML = renderCustomLinks(moduleId);
        }
        
        // Update in pinned modules list
        const pinnedLinksContainer = document.getElementById(`pinned-custom-links-${moduleId}`);
        if (pinnedLinksContainer) {
            pinnedLinksContainer.innerHTML = renderCustomLinks(moduleId);
        }
    }
    
    function showNotice(title, message) {
        const noticeModal = document.getElementById('website-notice');
        const noticeTitle = document.getElementById('notice-title');
        const noticeMessage = document.getElementById('notice-message');
        const noticeOk = document.getElementById('notice-ok');
        
        // Set content
        noticeTitle.textContent = title;
        noticeMessage.textContent = message;
        
        // Show modal
        noticeModal.classList.add('visible');
        
        // Close on button click
        noticeOk.addEventListener('click', () => {
            noticeModal.classList.remove('visible');
        }, { once: true });
    }
    
    function showConfirmationModal() {
        const confirmModal = document.getElementById('confirm-clear-modal');
        confirmModal.classList.add('visible');
    }
    
    function clearAllData() {
        // Clear all localStorage data
        localStorage.removeItem('pinnedModules');
        localStorage.removeItem('customModules');
        localStorage.removeItem('customLinks');
        
        // Reset state
        pinnedModules = [];
        customModules = [];
        customLinks = {};
        
        // Re-render views
        renderPrograms();
        renderPinnedModules();
        
        // Show notice
        showNotice('Data Cleared', 'All your pinned modules and custom links have been removed.');
    }
    
    // Apply saved theme
    function applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // Update icon
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (savedTheme === 'dark') {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        }
    }
    
    // Apply theme on load
    applyTheme();
});
