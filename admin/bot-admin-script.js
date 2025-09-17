/**
 * Chatbot Admin Script
 * This script is loaded dynamically after authentication
 */

// Current knowledge base
let currentKnowledgeBase = {};

// DOM Elements
const knowledgeBaseContainer = document.getElementById('knowledge-base-container');
const addResponseBtn = document.getElementById('add-response-btn');
const saveKnowledgeBaseBtn = document.getElementById('save-knowledge-base-btn');
const saveSuccessAlert = document.getElementById('save-success');
const chatHistoryContainer = document.getElementById('chat-history-container');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const settingsForm = document.getElementById('settings-form');
const botNameInput = document.getElementById('bot-name');
const initialMessageInput = document.getElementById('initial-message');
const typingSpeedInput = document.getElementById('typing-speed');
const responseDelayInput = document.getElementById('response-delay');
const accessLogsContainer = document.getElementById('access-logs-container');
const logoutBtn = document.getElementById('logout-btn');

// Modal elements
const addResponseModal = new bootstrap.Modal(document.getElementById('addResponseModal'));
const editResponseModal = new bootstrap.Modal(document.getElementById('editResponseModal'));
const saveNewResponseBtn = document.getElementById('save-new-response-btn');
const updateResponseBtn = document.getElementById('update-response-btn');

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    addResponseBtn.addEventListener('click', showAddResponseModal);
    saveKnowledgeBaseBtn.addEventListener('click', saveKnowledgeBase);
    saveNewResponseBtn.addEventListener('click', addNewResponse);
    updateResponseBtn.addEventListener('click', updateResponse);
    clearHistoryBtn.addEventListener('click', clearChatHistory);
    settingsForm.addEventListener('submit', saveSettings);
    logoutBtn.addEventListener('click', handleLogout);
    
    // Load data
    loadKnowledgeBase();
    loadChatHistory();
    loadSettings();
    loadAccessLogs();
});

// Handle logout
function handleLogout() {
    sessionStorage.removeItem('resourceAuthToken');
    window.location.href = '/';
}

// Load knowledge base from localStorage
function loadKnowledgeBase() {
    // Try to get from localStorage first
    const storedKnowledgeBase = localStorage.getItem('botKnowledgeBase');
    
    if (storedKnowledgeBase) {
        try {
            currentKnowledgeBase = JSON.parse(storedKnowledgeBase);
        } catch (error) {
            console.error('Error parsing knowledge base:', error);
            // Fall back to default
            loadDefaultKnowledgeBase();
        }
    } else {
        // If not in localStorage, load default
        loadDefaultKnowledgeBase();
    }
    
    // Display knowledge base
    displayKnowledgeBase();
}

// Load default knowledge base
function loadDefaultKnowledgeBase() {
    // This would be the same as in bot.js
    currentKnowledgeBase = {
        "who is peter": "Peter Lightspeed (Eluwade Peter Toluwanimi) is a professional virtual assistant and web developer offering services including web development, graphic design, social media management, data entry, content creation, and digital marketing.",
        "what services": "Peter offers a range of services including: 1) Web Development, 2) Graphic Design, 3) Social Media Management, 4) Data Entry & Typing, 5) Content Creation, and 6) Digital Marketing. You can learn more on the Services page.",
        "contact": "You can contact Peter via email at petereluwade55@gmail.com or through WhatsApp at +234 810 882 1809. Alternatively, you can use the contact form on the Contact page.",
        "location": "Peter is based in Nigeria but provides remote services to clients worldwide.",
        "experience": "Peter has extensive experience in web development, graphic design, and virtual assistance, having worked on over 50 projects for various clients across different industries.",
        "web development": "Peter offers professional web development services including responsive website design, e-commerce solutions, website maintenance, and custom web applications. His websites are mobile-friendly, SEO-optimized, and built with modern technologies.",
        "graphic design": "Peter provides graphic design services including logo design, branding materials, social media graphics, banners, flyers, and digital illustrations. He creates visually appealing designs that help businesses stand out.",
        "social media": "Peter offers comprehensive social media management services including content creation, scheduling, community engagement, and analytics reporting. He helps businesses build their online presence and engage with their audience effectively.",
        "data entry": "Peter provides accurate and efficient data entry services, including spreadsheet management, database updates, and document processing. He ensures data accuracy and timely delivery.",
        "content creation": "Peter creates engaging content for websites, blogs, and social media. His content writing services include SEO-optimized articles, product descriptions, and marketing copy that resonates with target audiences.",
        "digital marketing": "Peter offers digital marketing services including SEO, social media marketing, email campaigns, and content marketing strategies to help businesses increase their online visibility and attract more customers.",
        "projects": "Peter has worked on various projects including e-commerce websites, business portfolios, blogs, and social media campaigns. You can view his portfolio on the Projects page to see examples of his work.",
        "portfolio": "You can view Peter's portfolio on the Projects page. It showcases his best work across web development, graphic design, and digital marketing projects.",
        "pricing": "Pricing varies depending on project requirements and scope. Peter offers competitive rates and flexible packages. Please contact him directly for a personalized quote based on your specific needs.",
        "rates": "Peter's rates are competitive and based on project complexity, timeline, and specific requirements. Contact him for a custom quote tailored to your project.",
        "availability": "Peter is available 24/7 for client communication. Project timelines are discussed and agreed upon before starting any work.",
        "turnaround time": "Turnaround time depends on the project scope and complexity. Peter always provides estimated completion times before starting work and strives to deliver on or before deadlines.",
        "about": "Peter Lightspeed is a dedicated virtual assistant and web developer with a passion for creating digital solutions that help businesses grow. With expertise in web development, graphic design, and digital marketing, he provides comprehensive services to clients worldwide.",
        "education": "Peter holds a Bachelor of Science in Computer Science from the University of Lagos, Nigeria. He has also completed various certifications in web development, digital marketing, and graphic design.",
        "skills": "Peter's key skills include web development (HTML, CSS, JavaScript), graphic design (Adobe Creative Suite), content creation, social media management, data entry, and digital marketing.",
        "default": "I'm not sure I understand. Could you please rephrase your question? I can help with information about Peter's services, projects, or how to contact him.",
        "greeting": "Hello! How can I assist you today? I'm here to answer questions about Peter's services and expertise.",
        "goodbye": "Thank you for chatting! If you need any further assistance, feel free to contact Peter directly at petereluwade55@gmail.com or through the Contact page.",
        "thanks": "You're welcome! Is there anything else I can help you with?",
        "hire": "Great! To discuss working with Peter, please send an email to petereluwade55@gmail.com or use the Contact form on the website. Please include details about your project for a prompt response."
    };
}

// Display knowledge base in the admin panel
function displayKnowledgeBase() {
    knowledgeBaseContainer.innerHTML = '';
    
    // Sort keys alphabetically
    const sortedKeys = Object.keys(currentKnowledgeBase).sort();
    
    sortedKeys.forEach(key => {
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        
        const responseContent = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="mb-1">${key}</h5>
                    <p class="mb-0">${currentKnowledgeBase[key]}</p>
                </div>
                <div class="response-actions">
                    <button class="btn btn-sm btn-outline-primary edit-response-btn" data-key="${key}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-response-btn" data-key="${key}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        responseItem.innerHTML = responseContent;
        knowledgeBaseContainer.appendChild(responseItem);
        
        // Add event listeners to buttons
        responseItem.querySelector('.edit-response-btn').addEventListener('click', () => {
            showEditResponseModal(key);
        });
        
        responseItem.querySelector('.delete-response-btn').addEventListener('click', () => {
            deleteResponse(key);
        });
    });
}

// Show add response modal
function showAddResponseModal() {
    document.getElementById('response-key').value = '';
    document.getElementById('response-value').value = '';
    addResponseModal.show();
}

// Show edit response modal
function showEditResponseModal(key) {
    document.getElementById('edit-response-original-key').value = key;
    document.getElementById('edit-response-key').value = key;
    document.getElementById('edit-response-value').value = currentKnowledgeBase[key];
    editResponseModal.show();
}

// Add new response
function addNewResponse() {
    const key = document.getElementById('response-key').value.trim().toLowerCase();
    const value = document.getElementById('response-value').value.trim();
    
    if (!key || !value) {
        alert('Both fields are required');
        return;
    }
    
    // Add to knowledge base
    currentKnowledgeBase[key] = value;
    
    // Update display
    displayKnowledgeBase();
    
    // Close modal
    addResponseModal.hide();
    
    // Show success message
    showSuccessMessage();
}

// Update existing response
function updateResponse() {
    const originalKey = document.getElementById('edit-response-original-key').value;
    const newKey = document.getElementById('edit-response-key').value.trim().toLowerCase();
    const value = document.getElementById('edit-response-value').value.trim();
    
    if (!newKey || !value) {
        alert('Both fields are required');
        return;
    }
    
    // Remove old key if changed
    if (originalKey !== newKey) {
        delete currentKnowledgeBase[originalKey];
    }
    
    // Add updated response
    currentKnowledgeBase[newKey] = value;
    
    // Update display
    displayKnowledgeBase();
    
    // Close modal
    editResponseModal.hide();
    
    // Show success message
    showSuccessMessage();
}

// Delete response
function deleteResponse(key) {
    if (confirm(`Are you sure you want to delete the response for "${key}"?`)) {
        delete currentKnowledgeBase[key];
        displayKnowledgeBase();
        showSuccessMessage();
    }
}

// Save knowledge base
function saveKnowledgeBase() {
    localStorage.setItem('botKnowledgeBase', JSON.stringify(currentKnowledgeBase));
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    saveSuccessAlert.style.display = 'block';
    setTimeout(() => {
        saveSuccessAlert.style.display = 'none';
    }, 3000);
}

// Load chat history
function loadChatHistory() {
    const chatHistory = localStorage.getItem('chatHistory');
    
    if (chatHistory) {
        try {
            const history = JSON.parse(chatHistory);
            displayChatHistory(history);
        } catch (error) {
            console.error('Error parsing chat history:', error);
            chatHistoryContainer.innerHTML = '<div class="alert alert-warning">Error loading chat history.</div>';
        }
    } else {
        chatHistoryContainer.innerHTML = '<div class="alert alert-info">No chat history found.</div>';
    }
}

// Display chat history
function displayChatHistory(history) {
    if (history.length === 0) {
        chatHistoryContainer.innerHTML = '<div class="alert alert-info">No chat history found.</div>';
        return;
    }
    
    // Group messages by date
    const messagesByDate = {};
    
    history.forEach(msg => {
        const date = new Date(msg.timestamp);
        const dateString = date.toLocaleDateString();
        
        if (!messagesByDate[dateString]) {
            messagesByDate[dateString] = [];
        }
        messagesByDate[dateString].push(msg);
    });
    
    // Create HTML
    let historyHTML = '';
    
    Object.keys(messagesByDate).sort().reverse().forEach(date => {
        historyHTML += `
            <div class="chat-date mb-3">
                <h5>${date}</h5>
                <div class="chat-messages">
        `;
        
        messagesByDate[date].forEach(msg => {
            const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const role = msg.role === 'user' ? 'User' : 'Bot';
            const bgColor = msg.role === 'user' ? 'bg-light' : 'bg-info bg-opacity-10';
            
            historyHTML += `
                <div class="card mb-2 ${bgColor}">
                    <div class="card-body py-2">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <small class="text-muted">${role}</small>
                            <small class="text-muted">${time}</small>
                        </div>
                        <p class="card-text mb-0">${msg.content}</p>
                    </div>
                </div>
            `;
        });
        
        historyHTML += `
                </div>
            </div>
        `;
    });
    
    chatHistoryContainer.innerHTML = historyHTML;
}

// Clear chat history
function clearChatHistory() {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
        localStorage.removeItem('chatHistory');
        chatHistoryContainer.innerHTML = '<div class="alert alert-info">No chat history found.</div>';
    }
}

// Load settings
function loadSettings() {
    const botConfig = localStorage.getItem('botConfig');
    
    if (botConfig) {
        try {
            const config = JSON.parse(botConfig);
            botNameInput.value = config.name || 'Peter Assistant';
            initialMessageInput.value = config.initialMessage || 'Hello! How can I help you today?';
            typingSpeedInput.value = config.typingSpeed || 50;
            responseDelayInput.value = config.responseDelay || 500;
        } catch (error) {
            console.error('Error parsing bot config:', error);
        }
    } else {
        // Default values
        botNameInput.value = 'Peter Assistant';
        initialMessageInput.value = '👋 Hello! I\'m Peter\'s virtual assistant. How can I help you today? I can provide information about Peter\'s services, projects, or answer any questions you might have.';
        typingSpeedInput.value = 50;
        responseDelayInput.value = 500;
    }
}

// Save settings
function saveSettings(e) {
    e.preventDefault();
    
    const config = {
        name: botNameInput.value,
        initialMessage: initialMessageInput.value,
        typingSpeed: parseInt(typingSpeedInput.value),
        responseDelay: parseInt(responseDelayInput.value)
    };
    
    localStorage.setItem('botConfig', JSON.stringify(config));
    alert('Settings saved successfully!');
}

// Load access logs
function loadAccessLogs() {
    const accessAttempts = localStorage.getItem('accessAttempts');
    
    if (accessAttempts) {
        try {
            const attempts = JSON.parse(accessAttempts);
            displayAccessLogs(attempts);
        } catch (error) {
            console.error('Error parsing access logs:', error);
            accessLogsContainer.innerHTML = '<div class="alert alert-warning">Error loading access logs.</div>';
        }
    } else {
        accessLogsContainer.innerHTML = '<div class="alert alert-info">No access logs found.</div>';
    }
}

// Display access logs
function displayAccessLogs(logs) {
    if (logs.length === 0) {
        accessLogsContainer.innerHTML = '<div class="alert alert-info">No access logs found.</div>';
        return;
    }
    
    let logsHTML = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Status</th>
                        <th>User Agent</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    logs.forEach(log => {
        const date = new Date(log.timestamp);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        const status = log.success ? 
            '<span class="badge bg-success">Success</span>' : 
            '<span class="badge bg-danger">Failed</span>';
        
        logsHTML += `
            <tr>
                <td>${formattedDate}</td>
                <td>${status}</td>
                <td><small>${log.userAgent}</small></td>
            </tr>
        `;
    });
    
    logsHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    accessLogsContainer.innerHTML = logsHTML;
}

// Additional security measures
(function() {
    // Check for valid session
    const authToken = sessionStorage.getItem('resourceAuthToken');
    if (!authToken) {
        window.location.href = '/';
        return;
    }
    
    // Prevent inspection
    setInterval(() => {
        const devToolsOpen = window.outerHeight - window.innerHeight > 100 || 
                            window.outerWidth - window.innerWidth > 100;
        
        if (devToolsOpen) {
            sessionStorage.removeItem('resourceAuthToken');
            window.location.href = '/';
        }
    }, 1000); 
})();
