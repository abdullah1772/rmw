// Handle sidebar navigation active states
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const menuIcon = menuToggle.querySelector('i');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    if (menuToggle && sidebar && menuIcon) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                // Mobile behavior
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
                menuIcon.className = sidebar.classList.contains('show') ? 'ri-menu-fold-fill' : 'ri-menu-unfold-fill';
            } else {
                // Desktop behavior
                sidebar.classList.toggle('collapsed');
                menuIcon.className = sidebar.classList.contains('collapsed') ? 'ri-menu-unfold-fill' : 'ri-menu-fold-fill';
            }
        });

        // Close sidebar when clicking overlay
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            menuIcon.className = 'ri-menu-unfold-fill';
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });
    }

    // Add search functionality
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            const table = document.querySelector('.subscriptions-table');
            if (!table) return;

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                let rowText = '';
                row.querySelectorAll('td').forEach(cell => {
                    // Skip the actions column
                    if (!cell.classList.contains('actions')) {
                        rowText += cell.textContent.toLowerCase() + ' ';
                    }
                });
                
                if (rowText.includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Update entries info
            updateEntriesInfo(rows);
        });
    }

    // Function to update entries info
    function updateEntriesInfo(rows) {
        const entriesInfo = document.querySelector('.entries-info');
        if (!entriesInfo) return;

        const totalRows = rows.length;
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none').length;
        entriesInfo.textContent = `Showing ${visibleRows} out of ${totalRows} entries`;
    }

    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().split('.')[0];
    
    // Map of page names to their corresponding nav items
    const pageMap = {
        'admindashboard': 'Dashboard',
        'admin-subscriptions': 'Subscriptions',
        'admin-users': 'Users',
        'admin-queries': 'Queries',
        'admin-payments': 'Payments'
    };

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkText = link.querySelector('span').textContent.trim();
        const icon = link.querySelector('i');
        
        // Check if this link matches the current page
        if (linkText === pageMap[currentPage]) {
            link.classList.add('active');
            // Convert icon to fill version for active item
            if (icon && icon.className.includes('-line')) {
                icon.className = icon.className.replace('-line', '-fill');
            }
        } else {
            link.classList.remove('active');
            // Convert icon to line version for inactive items
            if (icon && icon.className.includes('-fill')) {
                icon.className = icon.className.replace('-fill', '-line');
            }
        }

        // Update click handler
        link.addEventListener('click', (e) => {
            // Don't prevent default - allow normal navigation
            navLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
                const otherIcon = otherLink.querySelector('i');
                if (otherIcon && otherIcon.className.includes('-fill')) {
                    otherIcon.className = otherIcon.className.replace('-fill', '-line');
                }
            });

            link.classList.add('active');
            if (icon && icon.className.includes('-line')) {
                icon.className = icon.className.replace('-line', '-fill');
            }
        });
    });

    // Handle logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Add your logout logic here
            console.log('Logging out...');
        });
    }

    // Handle notifications
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', () => {
            // Add your notifications logic here
            console.log('Opening notifications...');
        });
    }

    
});