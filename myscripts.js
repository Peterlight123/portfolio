// ===== CHATBOT FUNCTIONALITY =====
class PeterChatbot {
  constructor() {
    this.isOpen = false;
    this.responses = this.initializeResponses();
    this.init();
  }

  initializeResponses() {
    return {
      // Greetings
      greetings: [
        "Hello! I'm Peter's AI assistant. How can I help you learn about Peter today?",
        "Hi there! I'm here to answer questions about Peter's skills and experience.",
        "Welcome! I can tell you all about Peter's work and expertise. What interests you?"
      ],

      // Skills and Expertise
      skills: [
        "Peter is a skilled data analyst and Excel expert with expertise in:\n\n• Advanced Excel functions and VBA\n• Data visualization and dashboard creation\n• Financial analysis and reporting\n• Business intelligence and insights\n• PowerPoint presentations\n• Process optimization\n\nHe specializes in transforming complex data into actionable business insights!",
        
        "Peter's technical skills include:\n\n📊 **Data Analysis**: Advanced Excel, pivot tables, data modeling\n💹 **Financial Analysis**: Budgeting, forecasting, financial reporting\n📈 **Visualization**: Charts, dashboards, interactive reports\n🔧 **Tools**: Excel VBA, PowerPoint, business intelligence tools\n\nWould you like to know more about any specific skill?"
      ],

      // Projects and Experience
      projects: [
        "Peter has worked on various exciting projects including:\n\n🏢 **Financial Dashboards**: Interactive Excel dashboards for business tracking\n📊 **Sales Analysis**: Comprehensive sales performance analysis and forecasting\n📋 **Business Reports**: Professional presentations with data visualizations\n💼 **Process Optimization**: Streamlining business workflows through data insights\n\nEach project demonstrates his ability to turn raw data into valuable business intelligence!",
        
        "Some of Peter's notable work includes:\n\n• Creating automated financial reporting systems\n• Developing sales performance dashboards\n• Building data visualization tools for decision-making\n• Optimizing business processes through analysis\n\nHis work has helped businesses make better data-driven decisions!"
      ],

      // Background and Experience
      background: [
        "Peter (known as peterlight123, peterphonist, and peterlightspeed online) is a passionate data analyst with a strong background in:\n\n🎓 **Education**: Office Administration background\n💼 **Experience**: Years of hands-on experience with Microsoft Office suite\n🔍 **Specialization**: Data analysis, Excel mastery, and business intelligence\n📈 **Focus**: Helping businesses organize and visualize their data\n\nHe's committed to solving real-world problems through data insights!"
      ],

      // Contact Information
      contact: [
        "You can reach Peter through several ways:\n\n📧 **Email**: Available on his portfolio website\n🌐 **Portfolio**: https://peterlight123.github.io/portfolio/index.html\n💼 **LinkedIn**: Connect with him professionally\n📱 **Social Media**: Find him as peterlight123, peterphonist, or peterlightspeed\n\nHe's always open to discussing new projects and opportunities!",
        
        "To get in touch with Peter:\n\n• Visit his portfolio website for contact details\n• Use the contact form on his site\n• Connect through his social media profiles\n• Download his CV for complete contact information\n\nHe responds quickly to all professional inquiries!"
      ],

      // Services
      services: [
        "Peter offers comprehensive data analysis services:\n\n📊 **Data Analysis**: Clean, organize, and analyze your business data\n📈 **Excel Solutions**: Custom spreadsheets, dashboards, and automation\n💹 **Financial Analysis**: Budgeting, forecasting, and financial reporting\n📋 **Business Reports**: Professional presentations and visualizations\n🔧 **Process Optimization**: Streamline workflows through data insights\n\nHe helps businesses make better decisions through data!"
      ],

      // Default responses
      default: [
        "That's an interesting question! While I focus on Peter's professional work, I can tell you about his skills, projects, experience, or how to contact him. What would you like to know?",
        "I'm here to help you learn about Peter's expertise in data analysis and Excel. Feel free to ask about his skills, projects, or background!",
        "I'd be happy to help! I can share information about Peter's work, experience, or how to get in touch with him. What interests you most?"
      ],

      // Specific technical questions
      excel: [
        "Peter is an Excel expert with advanced skills in:\n\n🔧 **Advanced Functions**: VLOOKUP, INDEX/MATCH, array formulas\n📊 **Pivot Tables**: Complex data analysis and reporting\n🤖 **VBA Macros**: Automation and custom solutions\n📈 **Charts & Graphs**: Professional data visualization\n🎯 **Data Validation**: Ensuring data accuracy and consistency\n\nHe can handle any Excel challenge you have!"
      ],

      analysis: [
        "Peter's data analysis expertise includes:\n\n🔍 **Data Cleaning**: Organizing messy datasets\n📊 **Statistical Analysis**: Identifying trends and patterns\n📈 **Forecasting**: Predicting future trends\n💡 **Insights Generation**: Turning data into actionable recommendations\n📋 **Reporting**: Clear, professional data presentations\n\nHe transforms complex data into clear business insights!"
      ]
    };
  }

  init() {
    this.bindEvents();
    this.showWelcomeNotification();
  }

  bindEvents() {
    const toggle = document.getElementById('chatbotToggle');
    const close = document.getElementById('chatbotClose');
    const send = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');

    toggle?.addEventListener('click', () => this.toggleChatbot());
    close?.addEventListener('click', () => this.closeChatbot());
    send?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Quick reply buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-reply')) {
        const message = e.target.getAttribute('data-message');
        this.sendUserMessage(message);
      }
    });
  }

  showWelcomeNotification() {
    setTimeout(() => {
      const dot = document.getElementById('notificationDot');
      if (dot && !this.isOpen) {
        dot.classList.remove('hidden');
      }
    }, 3000);
  }

  toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    const dot = document.getElementById('notificationDot');
    
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      window?.classList.add('active');
      dot?.classList.add('hidden');
      this.isOpen = true;
      this.focusInput();
    }
  }

  closeChatbot() {
    const window = document.getElementById('chatbotWindow');
    window?.classList.remove('active');
    this.isOpen = false;
  }

  focusInput() {
    setTimeout(() => {
      const input = document.getElementById('chatbotInput');
      input?.focus();
    }, 300);
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input?.value.trim();
    
    if (message) {
      this.sendUserMessage(message);
      input.value = '';
    }
  }

  sendUserMessage(message) {
    this.addMessage(message, 'user');
    this.showTyping();
    
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 1500);
  }

  addMessage(content, type) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = type === 'bot' 
      ? '<img src="https://via.placeholder.com/30x30/0d6efd/ffffff?text=AI" alt="AI">'
      : '<img src="https://via.placeholder.com/30x30/28a745/ffffff?text=U" alt="User">';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <p>${content.replace(/\n/g, '<br>')}</p>
      </div>
    `;
    
    messagesContainer?.appendChild(messageDiv);
    this.scrollToBottom();
  }

  showTyping() {
    const typing = document.getElementById('typingIndicator');
    typing?.classList.add('active');
    this.scrollToBottom();
  }

  hideTyping() {
    const typing = document.getElementById('typingIndicator');
    typing?.classList.remove('active');
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (this.matchesPattern(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
      return this.getRandomResponse('greetings');
    }
    
    // Skills patterns
    if (this.matchesPattern(lowerMessage, ['skill', 'expertise', 'experience', 'what can peter do', 'abilities', 'capabilities'])) {
      return this.getRandomResponse('skills');
    }
    
    // Excel specific
    if (this.matchesPattern(lowerMessage, ['excel', 'spreadsheet', 'vba', 'macro', 'pivot table'])) {
      return this.getRandomResponse('excel');
    }
    
    // Data analysis specific
    if (this.matchesPattern(lowerMessage, ['data analysis', 'analyze', 'analysis', 'data', 'insights', 'visualization'])) {
      return this.getRandomResponse('analysis');
    }
    
    // Projects patterns
    if (this.matchesPattern(lowerMessage, ['project', 'work', 'portfolio', 'examples', 'what has peter done'])) {
      return this.getRandomResponse('projects');
    }
    
    // Background patterns
    if (this.matchesPattern(lowerMessage, ['background', 'about peter', 'who is peter', 'peterlight', 'peterphonist', 'peterlightspeed'])) {
      return this.getRandomResponse('background');
    }
    
    // Contact patterns
    if (this.matchesPattern(lowerMessage, ['contact', 'reach', 'email', 'phone', 'get in touch', 'hire'])) {
      return this.getRandomResponse('contact');
    }
    
    // Services patterns
    if (this.matchesPattern(lowerMessage, ['service', 'offer', 'help', 'do', 'provide', 'consulting'])) {
      return this.getRandomResponse('services');
    }
    
    // Default response
    return this.getRandomResponse('default');
  }

  matchesPattern(message, patterns) {
    return patterns.some(pattern => message.includes(pattern));
  }

  getRandomResponse(category) {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new PeterChatbot();
});

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
  // Konami code for special message
  if (e.code === 'KeyP' && e.ctrlKey && e.shiftKey) {
    const chatbot = new PeterChatbot();
    chatbot.addMessage("🎉 You found the secret! Peter is always ready for new challenges and exciting projects!", 'bot');
  }
});
// ===== ADVANCED CHATBOT FEATURES =====

// Add to the PeterChatbot class:

// Sentiment Analysis (basic)
analyzeSentiment(message) {
  const positiveWords = ['great', 'awesome', 'excellent', 'amazing', 'good', 'nice', 'love', 'like'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'worst'];
  
  const words = message.toLowerCase().split(' ');
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });
  
  return score;
}

// Context awareness
maintainContext(message, response) {
  // Store conversation context for better responses
  if (!this.context) this.context = [];
  
  this.context.push({
    user: message,
    bot: response,
    timestamp: new Date()
  });
  
  // Keep only last 5 exchanges
  if (this.context.length > 5) {
    this.context.shift();
  }
}

// Smart suggestions based on conversation
generateSuggestions(lastMessage) {
  const suggestions = {
    skills: ["Tell me about Excel expertise", "What about data visualization?", "Financial analysis skills?"],
    projects: ["Show me more examples", "Any recent work?", "Client testimonials?"],
    contact: ["How to hire Peter?", "Response time?", "Pricing information?"]
  };
  
  // Return relevant suggestions based on context
  for (let key in suggestions) {
    if (lastMessage.includes(key)) {
      return suggestions[key];
    }
  }
  
  return ["Tell me about skills", "Show me projects", "How to contact Peter?"];
}
// You can easily customize:

// 1. Change chatbot personality
const personality = {
  formal: "I'd be happy to assist you with information about Peter's professional background.",
  casual: "Hey! I'm here to chat about Peter's awesome work!",
  technical: "I can provide detailed technical specifications about Peter's expertise."
};

// 2. Add more response categories
this.responses.pricing = [
  "For pricing information, please contact Peter directly through his portfolio website. He offers competitive rates for data analysis projects!"
];

// 3. Integrate with external APIs
async generateAIResponse(message) {
  // Could integrate with OpenAI API for more dynamic responses
  // This is a placeholder for future enhancement
}
