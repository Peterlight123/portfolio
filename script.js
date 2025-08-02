// ===== INITIALIZATION =====
        
// Initialize AOS animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Show welcome message
    showWelcomeMessage();
    
    // Initialize form validation
    initializeFormValidation();
});

// ===== WELCOME MESSAGE =====

/**
 * Display a professional welcome message
 * Replaced intrusive alert with a better UX approach
 */
function showWelcomeMessage() {
    // Create a toast notification instead of alert
    const toastHTML = `
        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="welcomeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-primary text-white">
                    <strong class="me-auto">Welcome!</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Welcome to Eluwade Peter's Portfolio! Explore my services and get in touch.
                </div>
            </div>
        </div>
    `;
    
    // Add toast to body
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    
    // Show toast
    const toastElement = document.getElementById('welcomeToast');
    if (toastElement && typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
    }
}

// ===== FORM HANDLING =====

/**
 * Initialize form validation and submission handling
 */
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

/**
 * Handle form submission with validation and user feedback
 * @param {Event} event - Form submission event
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const spinner = submitButton.querySelector('.spinner-border');
    const statusDiv = document.getElementById('form-status');
    
    // Validate form
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    if (spinner) spinner.classList.remove('d-none');
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    // Prepare form data
    const formData = new FormData(form);
    
    // Submit form
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or contact me directly via email.');
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        if (spinner) spinner.classList.add('d-none');
        submitButton.innerHTML = 'Send Message';
    });
}

/**
 * Display form submission status message
 * @param {string} type - Status type ('success' or 'error')
 * @param {string} message - Status message to display
 */
function showFormStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    if (!statusDiv) return;
    
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    
    statusDiv.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <i class="bi ${iconClass} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success' && typeof bootstrap !== 'undefined') {
        setTimeout(() => {
            const alert = statusDiv.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }
}

// ===== SMOOTH SCROLLING =====

/**
 * Enhanced smooth scrolling for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip processing for dropdown toggles
        if (this.getAttribute('data-bs-toggle') === 'dropdown') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Lazy load images for better performance
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Keyboard navigation support for custom elements
 */
document.addEventListener('keydown', function(e) {
    // Add keyboard support for social buttons
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('social-btn')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// ===== ERROR HANDLING =====

/**
 * Global error handler for better user experience
 */
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could implement error reporting here
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could implement error reporting here
});

// Add loading animation for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon) {
            const originalClass = icon.className;
            icon.className = 'bi bi-hourglass-split me-2';
            setTimeout(() => {
                icon.className = originalClass;
            }, 2000);
        }
    });
});
