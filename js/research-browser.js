// Create a namespace for the Research Browser to avoid conflicts with core.js
window.ResearchBrowser = {
    // State
    filteredGroups: [],
    allGroups: [],
    currentView: 'cards',
    currentGroupId: null,
    currentSearchTerm: '',
    activeFilters: {
        departments: [],
        statuses: [],
        tags: []
    },
    
    // Initialize the application
    init: function() {
        console.log("Initializing ResearchBrowser");
        
        // Load data
        this.loadGroups();
        
        // Set up search handlers
        this.setupSearchHandlers();
        
        // Initial view
        this.renderGroups();
    },
    
    // Load groups data from the external file
    loadGroups: function() {
        if (window.researchGroupsData && Array.isArray(window.researchGroupsData)) {
            console.log(`Found ${window.researchGroupsData.length} research groups`);
            this.allGroups = window.researchGroupsData;
            this.filteredGroups = [...this.allGroups];
        } else {
            console.error('Research groups data not available');
            // Show error message to user
            const mainContent = document.getElementById('main-tab-content');
            if (mainContent) {
                mainContent.innerHTML = `
                    <div class="info-box">
                        <div class="info-box-title">
                            <i class="fas fa-exclamation-circle"></i> Error
                        </div>
                        <div class="info-content">
                            <p>Could not load research groups data. Please check that research-groups.js is properly included.</p>
                        </div>
                    </div>
                `;
            }
        }
    },
    
    // Set up search handlers
    setupSearchHandlers: function() {
        const self = this;
        const searchInput = document.getElementById('search-input');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                self.handleSearch(e.target.value);
            });
        }
        
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', function(e) {
                self.handleSearch(e.target.value);
            });
        }
    },
    
    // Handle search input
    handleSearch: function(value) {
        const searchTerm = value.toLowerCase().trim();
        this.currentSearchTerm = searchTerm;
        
        // Sync search boxes
        const searchInput = document.getElementById('search-input');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        
        if (searchInput) searchInput.value = value;
        if (mobileSearchInput) mobileSearchInput.value = value;
        
        // Apply filters
        this.applyFilters();
        
        // Update UI
        if (this.currentView === 'cards') {
            this.renderGroups();
        } else {
            // If in detail view, go back to card view with filtered results
            this.showAllGroups();
        }
    },
    
    // Filter by department - called directly from HTML
    filterByDepartment: function(department) {
        console.log("Filtering by department:", department);
        
        // Toggle the department in active filters
        const index = this.activeFilters.departments.indexOf(department);
        if (index > -1) {
            this.activeFilters.departments.splice(index, 1);
        } else {
            this.activeFilters.departments.push(department);
        }
        
        // Apply filters and update UI
        this.applyFilters();
        this.renderGroups();
    },
    
    // Filter by status - called directly from HTML
    filterByStatus: function(status) {
        console.log("Filtering by status:", status);
        
        // Toggle the status
        const index = this.activeFilters.statuses.indexOf(status);
        if (index > -1) {
            this.activeFilters.statuses.splice(index, 1);
        } else {
            this.activeFilters.statuses.push(status);
        }
        
        // Apply filters and update UI
        this.applyFilters();
        this.renderGroups();
    },
    
    // Filter by tag (research area or keyword) - called directly from HTML
    filterByTag: function(tag) {
        console.log("Filtering by tag:", tag);
        
        // Toggle the tag
        const index = this.activeFilters.tags.indexOf(tag);
        if (index > -1) {
            this.activeFilters.tags.splice(index, 1);
        } else {
            this.activeFilters.tags.push(tag);
        }
        
        // Apply filters and update UI
        this.applyFilters();
        this.renderGroups();
    },
    
    // Apply all active filters
    applyFilters: function() {
        // Start with all groups
        let filteredResult = [...this.allGroups];
        
        // Apply search filter
        if (this.currentSearchTerm) {
            filteredResult = filteredResult.filter(group => {
                // Check for search term in primary members
                let primaryMembersMatch = false;
                if (group.primaryMembers) {
                    for (const dept in group.primaryMembers) {
                        if (group.primaryMembers[dept].some(member => 
                            member.toLowerCase().includes(this.currentSearchTerm)
                        )) {
                            primaryMembersMatch = true;
                            break;
                        }
                    }
                }
                
                // Check for search term in affiliate members
                let affiliateMembersMatch = false;
                if (group.affiliateMembers) {
                    for (const dept in group.affiliateMembers) {
                        if (group.affiliateMembers[dept].some(member => 
                            member.toLowerCase().includes(this.currentSearchTerm)
                        )) {
                            affiliateMembersMatch = true;
                            break;
                        }
                    }
                }
                
                return (
                    group.name.toLowerCase().includes(this.currentSearchTerm) ||
                    group.description.toLowerCase().includes(this.currentSearchTerm) ||
                    group.department.toLowerCase().includes(this.currentSearchTerm) ||
                    group.leads.some(lead => lead.toLowerCase().includes(this.currentSearchTerm)) ||
                    primaryMembersMatch ||
                    affiliateMembersMatch ||
                    (group.keywords && group.keywords.some(keyword => keyword.toLowerCase().includes(this.currentSearchTerm))) ||
                    (group.researchAreas && group.researchAreas.some(area => area.toLowerCase().includes(this.currentSearchTerm)))
                );
            });
        }
        
        // Apply department filters
        if (this.activeFilters.departments.length > 0) {
            filteredResult = filteredResult.filter(group => 
                this.activeFilters.departments.includes(group.department)
            );
        }
        
        // Apply status filters
        if (this.activeFilters.statuses.length > 0) {
            filteredResult = filteredResult.filter(group => 
                this.activeFilters.statuses.includes(group.status)
            );
        }
        
        // Apply tag filters (research areas and keywords)
        if (this.activeFilters.tags.length > 0) {
            filteredResult = filteredResult.filter(group => {
                // Check if any of the group's research areas or keywords match any active tag filter
                const groupTags = [
                    ...(group.researchAreas || []),
                    ...(group.keywords || [])
                ];
                
                return this.activeFilters.tags.some(tag => groupTags.includes(tag));
            });
        }
        
        // Update the filtered groups
        this.filteredGroups = filteredResult;
    },
    
    // Clear all filters - called directly from HTML
    clearFilters: function() {
        console.log("Clearing all filters");
        
        // Clear search inputs
        const searchInput = document.getElementById('search-input');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        
        if (searchInput) searchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
        
        // Reset filters
        this.activeFilters = {
            departments: [],
            statuses: [],
            tags: []
        };
        
        this.currentSearchTerm = '';
        
        // Reset to all groups
        this.filteredGroups = [...this.allGroups];
        
        // Update UI
        this.renderGroups();
    },
    
    // Clear department filters - called directly from HTML
    clearDepartmentFilters: function() {
        console.log("Clearing department filters");
        this.activeFilters.departments = [];
        this.applyFilters();
        this.renderGroups();
    },
    
    // Clear status filters - called directly from HTML
    clearStatusFilters: function() {
        console.log("Clearing status filters");
        this.activeFilters.statuses = [];
        this.applyFilters();
        this.renderGroups();
    },
    
    // Remove a specific filter - called directly from HTML
    removeFilter: function(type, value) {
        console.log("Removing filter:", type, value);
        
        if (type === 'department') {
            const index = this.activeFilters.departments.indexOf(value);
            if (index > -1) {
                this.activeFilters.departments.splice(index, 1);
            }
        } else if (type === 'status') {
            const index = this.activeFilters.statuses.indexOf(value);
            if (index > -1) {
                this.activeFilters.statuses.splice(index, 1);
            }
        } else if (type === 'tag') {
            const index = this.activeFilters.tags.indexOf(value);
            if (index > -1) {
                this.activeFilters.tags.splice(index, 1);
            }
        } else if (type === 'search') {
            this.currentSearchTerm = '';
            const searchInput = document.getElementById('search-input');
            const mobileSearchInput = document.getElementById('mobile-search-input');
            
            if (searchInput) searchInput.value = '';
            if (mobileSearchInput) mobileSearchInput.value = '';
        }
        
        // Apply filters and update UI
        this.applyFilters();
        this.renderGroups();
    },
    
    // Show all groups in card view - called directly from HTML
    showAllGroups: function() {
        console.log("Showing all groups");
        this.currentView = 'cards';
        this.currentGroupId = null;
        
        this.renderGroups();
        
        // Update right sidebar
        this.updateRightSidebar();
    },
    
// Show detail view for a specific group - called directly from HTML
showGroupDetail: function(groupId) {
    console.log("Showing group detail for:", groupId);
    this.currentView = 'detail';
    this.currentGroupId = groupId;
    
    const group = this.allGroups.find(g => g.id === groupId);
    if (!group) {
        console.error(`Group with ID ${groupId} not found`);
        return;
    }
    
    const mainContent = document.getElementById('main-tab-content');
    if (!mainContent) return;
    
    // Update page title
    document.title = `${group.name} - University Research Groups`;
    
    // Generate focus areas HTML if available
    let focusAreasHTML = '';
    if (group.focusAreas && group.focusAreas.items && group.focusAreas.items.length > 0) {
        focusAreasHTML = `
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-3">${group.focusAreas.title || 'Focus Areas'}</h2>
                <ul class="list-disc pl-5">
                    ${group.focusAreas.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Handle members differently based on their structure (array vs object)
    let primaryMembersHTML = '';
    let affiliateMembersHTML = '';
    
    if (group.primaryMembers) {
        // Check if primaryMembers is an object with department keys
        if (typeof group.primaryMembers === 'object' && !Array.isArray(group.primaryMembers)) {
            // Handle as department-organized object
            primaryMembersHTML = `
                <div>
                    <h2 class="text-xl font-semibold mb-3">Primary Members</h2>
                    <div class="space-y-3">
            `;
            
            for (const dept in group.primaryMembers) {
                const members = group.primaryMembers[dept];
                if (members && members.length > 0) {
                    primaryMembersHTML += `
                        <div>
                            <h3 class="font-medium mb-1">${dept}</h3>
                            <ul class="list-disc pl-5">
                                ${members.map(member => `<li>${member}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
            }
            
            primaryMembersHTML += `
                    </div>
                </div>
            `;
        } else if (Array.isArray(group.primaryMembers)) {
            // Handle as simple array (backward compatibility)
            primaryMembersHTML = `
                <div>
                    <h2 class="text-xl font-semibold mb-3">Primary Members</h2>
                    <ul class="list-disc pl-5">
                        ${group.primaryMembers.map(member => `<li>${member}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    if (group.affiliateMembers) {
        // Check if affiliateMembers is an object with department keys
        if (typeof group.affiliateMembers === 'object' && !Array.isArray(group.affiliateMembers)) {
            // Handle as department-organized object
            affiliateMembersHTML = `
                <div>
                    <h2 class="text-xl font-semibold mb-3">Affiliate Members</h2>
                    <div class="space-y-3">
            `;
            
            for (const dept in group.affiliateMembers) {
                const members = group.affiliateMembers[dept];
                if (members && members.length > 0) {
                    affiliateMembersHTML += `
                        <div>
                            <h3 class="font-medium mb-1">${dept}</h3>
                            <ul class="list-disc pl-5">
                                ${members.map(member => `<li>${member}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
            }
            
            affiliateMembersHTML += `
                    </div>
                </div>
            `;
        } else if (Array.isArray(group.affiliateMembers)) {
            // Handle as simple array (backward compatibility)
            affiliateMembersHTML = `
                <div>
                    <h2 class="text-xl font-semibold mb-3">Affiliate Members</h2>
                    <ul class="list-disc pl-5">
                        ${group.affiliateMembers.length > 0 ? 
                            group.affiliateMembers.map(member => `<li>${member}</li>`).join('') : 
                            '<li class="text-muted">No affiliate members</li>'}
                    </ul>
                </div>
            `;
        }
    }
    
    // Generate detail view HTML
    mainContent.innerHTML = `
        <div class="mb-4">
            <a href="#" class="text-accent-color" onclick="ResearchBrowser.showAllGroups(); return false;">
                <i class="fas fa-arrow-left mr-2"></i> Back to all research groups
            </a>
        </div>
        
        <div class="research-group-detail">
            <div class="mb-2">
                <span class="taxonomy-badge px-2 py-1 rounded text-xs font-semibold" 
                      style="background-color: ${this.getStatusColor(group.status)}; color: #ffffff;">
                    ${group.status}
                </span>
            </div>

            <h1 class="text-2xl font-bold mb-2">${group.name}</h1>
            
            <div class="mb-4">
                <strong>Leads:</strong> ${group.leads.join(', ')}
            </div>
            
            <div class="mb-6">
                ${group.description}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 class="text-xl font-semibold mb-3">Department</h2>
                    <p>${group.department}</p>
                    ${group.subdepartment ? `<p class="text-sm text-muted">${group.subdepartment}</p>` : ''}
                </div>
                
                <div>
                    <h2 class="text-xl font-semibold mb-3">Research Areas</h2>
                    <div class="flex flex-wrap gap-2">
                        ${group.researchAreas ? group.researchAreas.map(area => 
                            `<a href="#" class="tag-filter bg-bg-tertiary px-2 py-1 rounded text-sm" 
                              onclick="ResearchBrowser.filterByTag('${area}'); ResearchBrowser.showAllGroups(); return false;">${area}</a>`
                        ).join('') : 'Not specified'}
                    </div>
                </div>
            </div>
            
            ${focusAreasHTML}
            
            <div class="mt-6 mb-6">
                <h2 class="text-xl font-semibold mb-3">Keywords</h2>
                <div class="flex flex-wrap gap-2">
                    ${group.keywords ? group.keywords.map(keyword => 
                        `<a href="#" class="tag-filter bg-bg-tertiary px-2 py-1 rounded text-sm" 
                          onclick="ResearchBrowser.filterByTag('${keyword}'); ResearchBrowser.showAllGroups(); return false;">${keyword}</a>`
                    ).join('') : 'Not specified'}
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                ${primaryMembersHTML}
                ${affiliateMembersHTML}
            </div>
        </div>
    `;
    
    // Update right sidebar
    this.updateRightSidebar(group);
    
    // Scroll to top
    window.scrollTo(0, 0);
},
    
    // Render the groups as cards
    renderGroups: function() {
        const mainContent = document.getElementById('main-tab-content');
        if (!mainContent) return;
        
        // Update page title
        document.title = 'Research Groups - University Portal';
        
        // Create filter section
        const filterSection = this.createFilterSection();
        
        // Create filter info section (active filters and count)
        const filterInfoSection = `
            <div id="filter-info" class="mb-4">
                ${this.createFilterInfo()}
            </div>
        `;
        
        // Create cards
        let cardsHTML = '';
        
        if (this.filteredGroups.length === 0) {
            cardsHTML = `
                <div class="info-box">
                    <div class="info-box-title">
                        <i class="fas fa-info-circle"></i> No Results
                    </div>
                    <div class="info-content">
                        <p>No research groups match your current filters.</p>
                        <p><a href="#" onclick="ResearchBrowser.clearFilters(); return false;" class="text-accent-color">Clear filters</a> to see all research groups.</p>
                    </div>
                </div>
            `;
        } else {
            // Create search match notification if searching
            let searchNotification = '';
            if (this.currentSearchTerm) {
                searchNotification = `
                    <div class="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
                        <i class="fas fa-search mr-1"></i> 
                        Showing groups containing "<strong>${this.currentSearchTerm}</strong>" in their details
                    </div>
                `;
            }
            
            cardsHTML = `
                ${searchNotification}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${this.filteredGroups.map(group => this.createGroupCard(group)).join('')}
                </div>
            `;
        }
        
        // Combine all sections
        mainContent.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">University Research Groups</h1>
            ${filterSection}
            ${filterInfoSection}
            ${cardsHTML}
        `;
        
        // Add search term highlight for cards if there's a search term
        if (this.currentSearchTerm) {
            this.highlightSearchTermsInCards();
        }
    },
    
    // Create HTML for the filter section
    createFilterSection: function() {
        // Get unique departments and statuses for filters
        const departments = [...new Set(this.allGroups.map(group => group.department))].sort();
        const statuses = [...new Set(this.allGroups.map(group => group.status))].sort();
        
        return `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-lg font-semibold">Filter by Department</h2>
                    ${this.activeFilters.departments.length > 0 ? 
                        `<button class="text-sm text-accent-color" onclick="ResearchBrowser.clearDepartmentFilters(); return false;">Clear</button>` : ''}
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${departments.map(dept => 
                        `<a href="#" class="department-filter px-3 py-1 border rounded text-sm hover:bg-bg-tertiary ${this.activeFilters.departments.includes(dept) ? 'active' : ''}" 
                          onclick="ResearchBrowser.filterByDepartment('${dept}'); return false;">${dept}</a>`
                    ).join('')}
                </div>
                
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-lg font-semibold">Filter by Status</h2>
                    ${this.activeFilters.statuses.length > 0 ? 
                        `<button class="text-sm text-accent-color" onclick="ResearchBrowser.clearStatusFilters(); return false;">Clear</button>` : ''}
                </div>
                <div class="flex flex-wrap gap-2">
                    ${statuses.map(status => 
                        `<a href="#" class="status-filter px-3 py-1 border rounded text-sm hover:bg-bg-tertiary ${this.activeFilters.statuses.includes(status) ? 'active' : ''}" 
                         onclick="ResearchBrowser.filterByStatus('${status}'); return false;"
                         style="border-color: ${this.getStatusColor(status)}; color: ${this.getStatusColor(status)}">${status}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    },
    
    // Create filter info HTML
    createFilterInfo: function() {
        const totalGroups = this.allGroups.length;
        const filteredCount = this.filteredGroups.length;
        
        // Only show filter info if there are active filters
        const hasActiveFilters = this.activeFilters.departments.length > 0 || 
                                 this.activeFilters.statuses.length > 0 || 
                                 this.activeFilters.tags.length > 0 || 
                                 this.currentSearchTerm;
        
        if (!hasActiveFilters) {
            return '';
        }
        
        // Build the active filters display with removable badges
        let activeFiltersHTML = '';
        
        // Add department filters
        this.activeFilters.departments.forEach(dept => {
            activeFiltersHTML += `
                <span class="filter-badge">
                    <span class="filter-badge-text">Department: ${dept}</span>
                    <button class="remove-filter" onclick="ResearchBrowser.removeFilter('department', '${dept}'); return false;" aria-label="Remove department filter">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `;
        });
        
        // Add status filters
        this.activeFilters.statuses.forEach(status => {
            activeFiltersHTML += `
                <span class="filter-badge">
                    <span class="filter-badge-text">Status: ${status}</span>
                    <button class="remove-filter" onclick="ResearchBrowser.removeFilter('status', '${status}'); return false;" aria-label="Remove status filter">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `;
        });
        
        // Add tag filters
        this.activeFilters.tags.forEach(tag => {
            activeFiltersHTML += `
                <span class="filter-badge">
                    <span class="filter-badge-text">Tag: ${tag}</span>
                    <button class="remove-filter" onclick="ResearchBrowser.removeFilter('tag', '${tag}'); return false;" aria-label="Remove tag filter">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `;
        });
        
        // Add search term if present
        if (this.currentSearchTerm) {
            activeFiltersHTML += `
                <span class="filter-badge">
                    <span class="filter-badge-text">Search: "${this.currentSearchTerm}"</span>
                    <button class="remove-filter" onclick="ResearchBrowser.removeFilter('search', '${this.currentSearchTerm}'); return false;" aria-label="Clear search">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `;
        }
        
        // Create the filter info HTML with the count and clear all button
        return `
            <div class="mb-2 text-sm">
                <span class="font-medium">Showing ${filteredCount} of ${totalGroups} research groups</span>
                <button onclick="ResearchBrowser.clearFilters(); return false;" class="ml-2 text-accent-color">Clear all filters</button>
            </div>
            <div class="flex flex-wrap gap-2">
                ${activeFiltersHTML}
            </div>
        `;
    },
    
    // Create HTML for a single research group card
createGroupCard: function(group) {
    // Get tags (research areas and possibly keywords)
    const tags = group.researchAreas || [];
    
    // Get focus areas preview (show all items)
    let focusAreasPreview = '';
    if (group.focusAreas && group.focusAreas.items && group.focusAreas.items.length > 0) {
        focusAreasPreview = `
            <div class="mt-2 mb-1">
                <div class="text-xs text-muted font-medium">${group.focusAreas.title || 'Focus Areas'}:</div>
                <ul class="text-xs pl-4 list-disc">
                    ${group.focusAreas.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Generate departments preview
    let departmentsPreview = '';
    if (group.primaryMembers) {
        const departments = Object.keys(group.primaryMembers)
            .filter(dept => group.primaryMembers[dept].length > 0)
            .sort();
        
        if (departments.length > 0) {
            departmentsPreview = `
                <div class="text-xs text-gray-500 mt-1">
                    <span class="font-medium">Departments:</span> ${departments.join(', ')}
                </div>
            `;
        }
    }
    
    return `
        <div class="research-group-card cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300" 
             data-group-id="${group.id}"
             onclick="ResearchBrowser.showGroupDetail('${group.id}'); return false;">
            <div class="p-4">
                <div class="mb-2 flex justify-between">
                    <span class="taxonomy-badge px-2 py-1 rounded text-xs font-semibold" 
                          style="background-color: ${this.getStatusColor(group.status)}; color: #ffffff;">
                        ${group.status}
                    </span>
                    <span class="text-sm text-muted">${group.department}</span>
                </div>
                <h3 class="text-lg font-semibold mb-2">${group.name}</h3>
                <p class="text-sm mb-1">Leads: ${group.leads.join(', ')}</p>
                ${departmentsPreview}
                ${focusAreasPreview}
            </div>
            <div class="p-3 bg-bg-tertiary border-t">
                <div class="flex flex-wrap gap-1">
                    ${tags.map(tag => 
                        `<a href="#" class="tag-filter bg-bg-secondary px-2 py-0.5 rounded text-xs hover:bg-accent-color hover:text-white transition-colors duration-200" 
                          onclick="event.stopPropagation(); ResearchBrowser.filterByTag('${tag}'); return false;">${tag}</a>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
},
    
    // Highlight search terms in the cards
    highlightSearchTermsInCards: function() {
        if (!this.currentSearchTerm) return;
        
        const self = this;
        
        // Add a CSS class to highlight matching cards
        document.querySelectorAll('.research-group-card').forEach(card => {
            const groupId = card.getAttribute('data-group-id');
            const group = self.allGroups.find(g => g.id === groupId);
            
            if (group && self.groupContainsSearchTerm(group, self.currentSearchTerm)) {
                card.classList.add('search-match');
                
                // Add a subtle indicator at the top of the card
                const indicator = document.createElement('div');
                indicator.className = 'search-match-indicator px-2 py-1 bg-yellow-100 text-xs rounded-t text-yellow-800';
                indicator.innerHTML = `<i class="fas fa-search mr-1"></i> Contains "${self.currentSearchTerm}"`;
                
                // Insert at the top of the card
                card.insertBefore(indicator, card.firstChild);
            }
        });
    },
    
    // Check if a group contains the search term
    groupContainsSearchTerm: function(group, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') return false;
        
        const term = searchTerm.toLowerCase();
        
        return (
            group.name.toLowerCase().includes(term) ||
            group.description.toLowerCase().includes(term) ||
            group.department.toLowerCase().includes(term) ||
            group.leads.some(lead => lead.toLowerCase().includes(term)) ||
            group.primaryMembers.some(member => member.toLowerCase().includes(term)) ||
            group.affiliateMembers.some(member => member.toLowerCase().includes(term)) ||
            (group.keywords && group.keywords.some(keyword => keyword.toLowerCase().includes(term))) ||
            (group.researchAreas && group.researchAreas.some(area => area.toLowerCase().includes(term)))
        );
    },
    
    // Update the right sidebar based on current view
    updateRightSidebar: function(group = null) {
        // Set current page in right sidebar
        if (window.sidebarLinks && window.sidebarLinks.setCurrentRightSidebarPage) {
            window.sidebarLinks.setCurrentRightSidebarPage('Research Groups');
        }
        
        // If needed, add research group specific links to right sidebar
        const rightSidebar = document.querySelector('.right-sidebar');
        if (!rightSidebar) return;
        
        // Keep the header that's already in the DOM
        const header = rightSidebar.querySelector('.right-sidebar-header');
        
        // Update links based on view
        let additionalHTML = '';
        
        if (this.currentView === 'detail' && group) {
            // Add group-specific links
            additionalHTML = `
                <div class="mt-4 mb-6">
                    <h3 class="text-sm font-semibold mb-2 text-muted">Current Group</h3>
                    <a href="#" class="right-sidebar-link current">
                        <strong>${group.name}</strong>
                    </a>
                </div>
                
                <div class="mb-6">
                    <h3 class="text-sm font-semibold mb-2 text-muted">Quick Actions</h3>
                    <a href="#" class="right-sidebar-link" onclick="ResearchBrowser.showAllGroups(); return false;">
                        <i class="fas fa-arrow-left mr-2"></i> Back to all groups
                    </a>
                    <a href="mailto:${group.leads[0].split(' ').join('.')}@university.edu" class="right-sidebar-link">
                        <i class="fas fa-envelope mr-2"></i> Contact Group Lead
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-file-alt mr-2"></i> View Publications
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-users mr-2"></i> Join Research Group
                    </a>
                </div>
                
                <div>
                    <h3 class="text-sm font-semibold mb-2 text-muted">Related Groups</h3>
                    ${this.getRelatedGroups(group).map(relatedGroup => `
                        <a href="#" class="right-sidebar-link" 
                           onclick="ResearchBrowser.showGroupDetail('${relatedGroup.id}'); return false;">
                            ${relatedGroup.name}
                        </a>
                    `).join('')}
                </div>
            `;
        } else {
            // Default links for the groups listing page
            additionalHTML = `
                <div class="mb-6">
                    <h3 class="text-sm font-semibold mb-2 text-muted">Research Tools</h3>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-search mr-2"></i> Advanced Search
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-filter mr-2"></i> Filter by Keywords
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-user-graduate mr-2"></i> Find Researchers
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-chart-bar mr-2"></i> Research Metrics
                    </a>
                </div>
                
                <div>
                    <h3 class="text-sm font-semibold mb-2 text-muted">Help & Resources</h3>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-question-circle mr-2"></i> How to Join a Group
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-book mr-2"></i> Research Handbook
                    </a>
                    <a href="#" class="right-sidebar-link">
                        <i class="fas fa-calendar-alt mr-2"></i> Upcoming Events
                    </a>
                </div>
            `;
        }
        
        // Complete the right sidebar HTML
        if (header) {
            rightSidebar.innerHTML = '';
            rightSidebar.appendChild(header);
            rightSidebar.insertAdjacentHTML('beforeend', additionalHTML);
        }
    },
    
    // Get related research groups based on keywords and research areas
    getRelatedGroups: function(currentGroup) {
        if (!currentGroup || !currentGroup.id) return [];
        
        const self = this;
        
        // Calculate relevance score for each group
        const groupsWithScore = this.allGroups
            .filter(group => group.id !== currentGroup.id) // Exclude current group
            .map(group => {
                let score = 0;
                
                // Check department matches
                if (group.department === currentGroup.department) {
                    score += 3;
                }
                
                // Check for matching research areas
                if (currentGroup.researchAreas && group.researchAreas) {
                    currentGroup.researchAreas.forEach(area => {
                        if (group.researchAreas.includes(area)) {
                            score += 2;
                        }
                    });
                }
                
                // Check for matching keywords
                if (currentGroup.keywords && group.keywords) {
                    currentGroup.keywords.forEach(keyword => {
                        if (group.keywords.includes(keyword)) {
                            score += 1;
                        }
                    });
                }
                
                return { ...group, relevanceScore: score };
            })
            .filter(group => group.relevanceScore > 0) // Only include groups with some relevance
            .sort((a, b) => b.relevanceScore - a.relevanceScore); // Sort by relevance
        
        // Return top 3 related groups
        return groupsWithScore.slice(0, 3);
    },
    
    // Get color for status badges
    getStatusColor: function(status) {
        switch (status) {
            case 'Established':
                return '#2563eb'; // Blue
            case 'Emerging':
                return '#059669'; // Green
            case 'Emergent':
                return '#059669'; // Green
            default:
                return '#6b7280'; // Gray
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ResearchBrowser.init();
});