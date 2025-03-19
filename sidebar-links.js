// Define sidebar links data
const universityLinks = [
    {
        text: "Home",
        icon: "fas fa-home",
        url: "index.html"
    },
    {
        text: "University Portal",
        icon: "fas fa-home",
        url: "https://my.mmu.ac.uk/"
    },
    {
        text: "Moodle",
        icon: "fas fa-graduation-cap",
        url: "https://moodle.mmu.ac.uk/"
    },
    {
        text: "Library",
        icon: "fas fa-book",
        url: "https://www.mmu.ac.uk/library"
    },
    {
        text: "Email",
        icon: "fas fa-envelope",
        url: "https://outlook.office.com/mail/"
    },
    {
        text: "Academic Calendar",
        icon: "fas fa-calendar-alt",
        url: "https://mmuintranet.mmu.ac.uk/page/10275?SearchId=7567945"
    },
    {
        text: "Timetables",
        icon: "fas fa-clock",
        url: "https://mytimetable.mmu.ac.uk/schedule"
    },
    {
        text: "Attendance Register",
        icon: "fas fa-users",
        url: "https://staffregisters.mmu.ac.uk/"
    },
    {
        text: "Staff Directory",
        icon: "fas fa-address-book",
        url: "https://mmuintranet.mmu.ac.uk/person?"
    },
    {
        text: "Digital Support",
        icon: "fas fa-question-circle",
        url: "https://mmuintranet.mmu.ac.uk/Interact/Pages/Content/Document.aspx?id=2247&SearchId=8621605"
    },
    {
        text: "IT Support",
        icon: "fas fa-question-circle",
        url: "https://mmuintranet.mmu.ac.uk/Interact/Pages/Section/Default.aspx?Section=4487"
    }
];

// Define right sidebar links
const rightSidebarLinks = [
    {
        text: "Home",
        url: "index.html",
        isCurrent: false
    },
        {
        text: "Module Specs",
        url: "modules.html",
        isCurrent: false
    },
    {
        text: "Personalised Student List",
        url: "student-list.html",
        isCurrent: false
    },
    {
        text: "Rubric Feedback Generator",
        url: "feedback-generator.html",
        isCurrent: false
    },
    {
        text: "Moderation Statistics",
        url: "moderator.html",
        isCurrent: false
    },
    {
        text: "Rubric Descriptors",
        url: "rubric.html",
        isCurrent: false
    },
    {
        text: "Marking Tracker",
        url: "marking-dashboard.html",
        isCurrent: false
    },
    {
        text: "Mark ConsistencyChecker",
        url: "consistency-checker.html",
        isCurrent: false
    },
    {
        text: "Grade Inflation Checker",
        url: "grade-inflation.html",
        isCurrent: false
    },
    {
        text: "Deadlines",
        url: "deadlines.html",
        isCurrent: false
    },
    {
        text: "Activity Generator",
        url: "bloom.html",
        isCurrent: false
    },
    {
        text: "Research Groups",
        url: "research.html",
        isCurrent: false
    },

    {
        text: "Academic Sources Database",
        url: "sources.html",
        isCurrent: false
    },
    {
        text: "UK Jargon",
        url: "jargon.html",
        isCurrent: false
    }
    
];

// Function to populate the left sidebar
function populateUniversityLinks() {
    const container = document.getElementById('university-content');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Get current page URL for checking active links
    const currentUrl = window.location.href;

    // Populate with links
    universityLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'sidebar-link';
        
        // Check if this is the current page
        if (currentUrl.includes(link.url)) {
            linkElement.classList.add('active');
        }
        
        // Create icon
        const iconElement = document.createElement('i');
        iconElement.className = link.icon;
        
        // Append icon and text
        linkElement.appendChild(iconElement);
        linkElement.appendChild(document.createTextNode(' ' + link.text));
        
        // Add to container
        container.appendChild(linkElement);
    });
}

// Function to populate the right sidebar
function populateRightSidebar() {
    const rightSidebar = document.querySelector('.right-sidebar');
    if (!rightSidebar) return;

    // Get the header that's already in the DOM
    const header = rightSidebar.querySelector('.right-sidebar-header');
    
    // Clear existing links but keep the header
    rightSidebar.innerHTML = '';
    if (header) {
        rightSidebar.appendChild(header);
    } else {
        // Create header if it doesn't exist
        const headerElement = document.createElement('div');
        headerElement.className = 'right-sidebar-header';
        headerElement.textContent = 'Quick Tools';
        rightSidebar.appendChild(headerElement);
    }

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Populate with links
    rightSidebarLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'right-sidebar-link';
        
        // Check if this is the current page
        const isCurrentPage = link.url === currentPage;
        
        // Set current class based on either the data or the current URL
        if (link.isCurrent || isCurrentPage) {
            linkElement.classList.add('current');
            // Add strong element for current link
            const strongElement = document.createElement('strong');
            strongElement.textContent = link.text;
            linkElement.appendChild(strongElement);
        } else {
            linkElement.textContent = link.text;
        }
        
        // Add to container
        rightSidebar.appendChild(linkElement);
    });
}

// Function to set the current page in right sidebar
function setCurrentRightSidebarPage(pageName) {
    // Reset all current flags
    rightSidebarLinks.forEach(link => {
        link.isCurrent = false;
    });
    
    // Find and set the matching link to current
    const linkToActivate = rightSidebarLinks.find(link => 
        link.text === pageName || link.url.includes(pageName)
    );
    
    if (linkToActivate) {
        linkToActivate.isCurrent = true;
    }
    
    // Repopulate the sidebar with updated current state
    populateRightSidebar();
}

// Export functions to be used in main.js or directly in HTML
window.sidebarLinks = {
    populateUniversityLinks,
    populateRightSidebar,
    setCurrentRightSidebarPage
};

// Initialize both sidebars when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    populateUniversityLinks();
    populateRightSidebar();
});
