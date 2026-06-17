// Highlight active page in navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find and highlight the corresponding nav link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === './') ||
            (currentPage === '' && href === './')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});

// Social Media Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const socialToggle = document.getElementById('socialToggle');
    const socialSidebar = document.querySelector('.social-sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (socialToggle && socialSidebar) {
        // Open sidebar
        socialToggle.addEventListener('click', function() {
            socialSidebar.classList.add('active');
            socialSidebar.classList.add('interacted');
        });
        
        // Close sidebar
        if (closeSidebar) {
            closeSidebar.addEventListener('click', function() {
                socialSidebar.classList.remove('active');
            });
        }
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(event) {
            if (!socialSidebar.contains(event.target) && socialSidebar.classList.contains('active')) {
                socialSidebar.classList.remove('active');
            }
        });
        
        // Close sidebar on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && socialSidebar.classList.contains('active')) {
                socialSidebar.classList.remove('active');
            }
        });
        
        // Track social media clicks (optional analytics)
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.classList[1]; // Gets the social platform class
                console.log(`Social link clicked: ${platform}`);
                
            });
        });
    }
});

// window.addEventListener("load", function () {
//   // Create a message box
//   const notice = document.createElement("div");
//   notice.innerText = "⚠️ You might have issues scrolling, but we are working on it.";
  
//   // Style the message box
//   notice.style.position = "fixed";
//   notice.style.bottom = "20px";
//   notice.style.right = "20px";
//   notice.style.background = "#ffcc00";
//   notice.style.color = "#000";
//   notice.style.padding = "10px 15px";
//   notice.style.borderRadius = "8px";
//   notice.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
//   notice.style.fontFamily = "Arial, sans-serif";
//   notice.style.zIndex = "9999";

//   // Add it to the page
//   document.body.appendChild(notice);

//   // Auto-hide after 10 seconds
//   setTimeout(() => {
//     notice.remove();
//   }, 10000);
// });






