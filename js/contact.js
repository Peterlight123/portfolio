/**
 * Contact page specific JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- CONSTANTS ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterMessage = document.getElementById('newsletterMessage');
    const backToTopBtn = document.getElementById('backToTop');
    const serviceSelect = document.getElementById('service');

    // --- INITIALIZATIONS ---
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- URL PARAMETER HANDLING ---
    // Check if there's a service parameter in the URL and select that service
    function setServiceFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam && serviceSelect) {
            // Find the option that matches the service parameter
            const options = Array.from(serviceSelect.options);
            const matchingOption = options.find(option => 
                option.text.toLowerCase() === serviceParam.toLowerCase() ||
                option.value.toLowerCase() === serviceParam.toLowerCase()
            );
            
            if (matchingOption) {
                serviceSelect.value = matchingOption.value;
            } else {
                // If no exact match, try to find a partial match
                const partialMatch = options.find(option => 
                    option.text.toLowerCase().includes(serviceParam.toLowerCase()) ||
                    option.value.toLowerCase().includes(serviceParam.toLowerCase())
                );
                
                if (partialMatch) {
                    serviceSelect.value = partialMatch.value;
                }
            }
        }
    }
    
    // Execute on page load
    setServiceFromURL();

    // --- CONTACT FORM SUBMISSION ---
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Update button state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    // Success message
                    formMessage.className = 'alert alert-success';
                    formMessage.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                            <div>
                                <h5 class="mb-1">Message Sent Successfully!</h5>
                                <p class="mb-0">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            </div>
                        </div>
                    `;
                    contactForm.reset();
                    
                    // Track form submission
                    if (typeof gtag !== 'undefined' && localStorage.getItem('cookiesAccepted') === 'true') {
                        gtag('event', 'form_submission', {
                            'event_category': 'contact',
                            'event_label': document.getElementById('service').value
                        });
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Error message
                formMessage.className = 'alert alert-danger';
                formMessage.innerHTML = `
                    <div class="d-flex align-items-center">
                        <i class="bi bi-exclamation-triangle-fill text-danger fs-4 me-3"></i>
                        <div>
                            <h5 class="mb-1">Oops! Something went wrong.</h5>
                            <p class="mb-0">Please try again or contact me directly at petereluwade55@gmail.com</p>
                        </div>
                    </div>
                `;
            } finally {
                // Reset button state and show message
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formMessage.style.display = 'block';
                
                // Scroll to the message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide message after 10 seconds if it's a success message
                if (formMessage.classList.contains('alert-success')) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 10000);
                }
            }
        });
    }

    // --- SOCIAL MEDIA TRACKING ---
    // Track social media link clicks
    document.querySelectorAll('.social-grid-item').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            if (typeof gtag !== 'undefined' && localStorage.getItem('cookiesAccepted') === 'true') {
                gtag('event', 'social_click', {
                    'event_category': 'engagement',
                    'event_label': platform
                });
            }
        });
    });

    // --- BACK TO TOP BUTTON ---
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- NEWSLETTER FORM ---
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const originalText = newsletterBtn.innerHTML;
            newsletterBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Subscribing...';
            newsletterBtn.disabled = true;
            
            try {
                const response = await fetch(newsletterForm.action, {
                    method: 'POST',
                    body: new FormData(newsletterForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    newsletterMessage.className = 'alert alert-success mt-2';
                    newsletterMessage.innerHTML = `<i class="bi bi-check-circle me-2"></i><strong>Success!</strong> Thank you for subscribing!`;
                    newsletterForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                newsletterMessage.className = 'alert alert-danger mt-2';
                newsletterMessage.innerHTML = `<i class="bi bi-exclamation-triangle me-2"></i><strong>Oops!</strong> Something went wrong. Please try again.`;
            } finally {
                newsletterMessage.style.display = 'block';
                newsletterBtn.innerHTML = originalText;
                newsletterBtn.disabled = false;
                setTimeout(() => { newsletterMessage.style.display = 'none'; }, 5000);
            }
        });
    }

    // --- FORM FIELD VALIDATION ---
    // Add custom validation styles
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else if (this.value !== '') {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            }
        });
    });
});

// --- GLOBAL FUNCTIONS ---
// Cookie consent functions
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieConsent').classList.remove('show');
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-9NKNYWDH33');
    }
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookieConsent').classList.remove('show');
    window['ga-disable-G-9NKNYWDH33'] = true;
}
// Enhanced form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Dynamic form behavior
    const projectType = document.getElementById('projectType');
    const logoStatus = document.getElementById('logoStatus');
    
    // Show/hide logo upload based on selection
    logoStatus.addEventListener('change', function() {
        const logoUploadSection = document.querySelector('#logoUpload').closest('.mb-3');
        if (this.value === 'I have a logo') {
            logoUploadSection.style.display = 'block';
            document.getElementById('logoUpload').required = true;
        } else {
            logoUploadSection.style.display = 'none';
            document.getElementById('logoUpload').required = false;
        }
    });
    
    // Form submission with file handling
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            // Add additional info
            formData.append('submission_time', new Date().toISOString());
            formData.append('user_agent', navigator.userAgent);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showMessage('success', '🎉 Amazing! Your project inquiry has been sent successfully. I\'ll get back to you within 24 hours with a detailed quote and next steps!');
                form.reset();
                
                // Track successful submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'Contact',
                        'event_label': 'Project Inquiry'
                    });
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            showMessage('error', '❌ Oops! Something went wrong. Please try again or contact me directly via WhatsApp: +234 810 882 1809');
        } finally {
            submitBtn.innerHTML = '<i class="bi bi-rocket-takeoff me-2"></i>Launch My Project';
            submitBtn.disabled = false;
        }
    });
    
    function showMessage(type, message) {
        formMessage.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
        formMessage.innerHTML = message;
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth' });
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    }
    
    // File size validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const maxSize = 5 * 1024 * 1024; // 5MB
            const files = Array.from(this.files);
            
            files.forEach(file => {
                if (file.size > maxSize) {
                    alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
                    this.value = '';
                }
            });
        });
    });
});

