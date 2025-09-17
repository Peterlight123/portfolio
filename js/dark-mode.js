// Dark Mode Functionality
class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        // Create toggle button
        this.createToggleButton();
        
        // Load saved theme
        this.loadTheme();
        
        // Add event listeners
        this.addEventListeners();
        
        // Check system preference
        this.checkSystemPreference();
    }

    createToggleButton() {
    if (document.querySelector('.dark-mode-toggle')) {
        return;
    }

    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.innerHTML = `
        <div class="toggle-slider">
            <div class="toggle-circle">
                <span class="sun-icon">☀️</span>
                <span class="moon-icon">🌙</span>
            </div>
        </div>
    `;
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(toggleButton);
    this.toggleButton = toggleButton;
}


    addEventListeners() {
        // Toggle button click
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener(() => {
                if (!this.hasUserPreference()) {
                    this.checkSystemPreference();
                }
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        this.saveTheme(newTheme);
        
        // Trigger custom event
        const event = new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        });
        document.dispatchEvent(event);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleButton(theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
    }

    updateToggleButton(theme) {
        const icon = this.toggleButton.querySelector('.icon');
        const text = this.toggleButton.querySelector('.text');
        
        if (theme === 'dark') {
            icon.textContent = '☀️';
            text.textContent = 'Light';
            this.toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            icon.textContent = '🌙';
            text.textContent = 'Dark';
            this.toggleButton.setAttribute('title', 'Switch to dark mode');
        }
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    }

    saveTheme(theme) {
        try {
            localStorage.setItem('preferred-theme', theme);
        } catch (error) {
            console.warn('Could not save theme preference:', error);
        }
    }

    loadTheme() {
        try {
            const savedTheme = localStorage.getItem('preferred-theme');
            if (savedTheme) {
                this.setTheme(savedTheme);
                return;
            }
        } catch (error) {
            console.warn('Could not load theme preference:', error);
        }
        
        // If no saved preference, check system preference
        this.checkSystemPreference();
    }

    checkSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    hasUserPreference() {
        try {
            return localStorage.getItem('preferred-theme') !== null;
        } catch (error) {
            return false;
        }
    }

    // Public methods for external use
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    setDarkMode() {
        this.setTheme('dark');
        this.saveTheme('dark');
    }

    setLightMode() {
        this.setTheme('light');
        this.saveTheme('light');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkModeManager();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.darkModeManager) {
            window.darkModeManager = new DarkModeManager();
        }
    });
} else {
    if (!window.darkModeManager) {
        window.darkModeManager = new DarkModeManager();
    }
}

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
}
