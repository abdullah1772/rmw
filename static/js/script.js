document.addEventListener('DOMContentLoaded', function() {
    // Desktop sidebar toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuBtn && window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

