
// =====================================================================
// PROFESSIONAL LOADING SCREEN
// =====================================================================
class ProfessionalLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressPercentage = document.querySelector('.progress-percentage');
        this.loadingText = document.querySelector('.loading-text');
        
        this.progress = 0;
        this.targetProgress = 0;
        this.isComplete = false;
        
        this.messages = [
            'Initializing...',
            'Loading assets...',
            'Preparing interface...',
            'Almost ready...',
            'Welcome!'
        ];
        
        this.init();
    }
    
    init() {
        // Prevent scrolling during loading
        document.body.style.overflow = 'hidden';
        
        // Start progress simulation
        this.simulateProgress();
        
        // Track actual page load
        this.trackPageLoad();
        
        // Fallback timer
        setTimeout(() => {
            if (!this.isComplete) {
                this.completeLoading();
            }
        }, 5000);
    }
    
    simulateProgress() {
        const progressInterval = setInterval(() => {
            if (this.progress < this.targetProgress) {
                this.progress += Math.random() * 3;
                if (this.progress > this.targetProgress) {
                    this.progress = this.targetProgress;
                }
                this.updateProgress();
            }
            
            if (this.progress >= 100 && this.isComplete) {
                clearInterval(progressInterval);
                setTimeout(() => this.hideLoading(), 800);
            }
        }, 50);
        
        // Gradually increase target progress
        setTimeout(() => this.targetProgress = 30, 300);
        setTimeout(() => this.targetProgress = 60, 800);
        setTimeout(() => this.targetProgress = 85, 1500);
    }
    
    trackPageLoad() {
        // Check if page is already loaded
        if (document.readyState === 'complete') {
            this.completeLoading();
            return;
        }
        
        // Wait for page load
        window.addEventListener('load', () => {
            setTimeout(() => this.completeLoading(), 500);
        });
        
        // Track DOM content loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.targetProgress = Math.max(this.targetProgress, 70);
            });
        }
    }
    
    completeLoading() {
        this.isComplete = true;
        this.targetProgress = 100;
        
        // Update message to final state
        if (this.loadingText) {
            this.loadingText.textContent = this.messages[4];
        }
    }
    
    updateProgress() {
        const roundedProgress = Math.round(this.progress);
        
        // Update progress bar
        if (this.progressFill) {
            this.progressFill.style.width = roundedProgress + '%';
        }
        
        // Update percentage text
        if (this.progressPercentage) {
            this.progressPercentage.textContent = roundedProgress + '%';
        }
        
        // Update loading message based on progress
        if (this.loadingText) {
            const messageIndex = Math.min(
                Math.floor((roundedProgress / 100) * (this.messages.length - 1)),
                this.messages.length - 2
            );
            this.loadingText.textContent = this.messages[messageIndex];
        }
    }
    
    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            // Re-enable scrolling
            document.body.style.overflow = 'auto';
            
            // Remove loading screen from DOM
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 600);
        }
    }
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', function() {
    new ProfessionalLoader();
});

// Preload logo image to prevent loading delay
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = new Image();
    logoImg.src = 'images/logos/peter-logo.png'; // Preload your logo
});
