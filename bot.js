lass PeterChatbot {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.messageCount = 0;
        this.conversationContext = [];
        this.init();
    }

    get knowledgeBase() {
        return {
            en: {
                greetings: {
                    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
                    responses: [
                        `👋 Hello! Welcome to Peter's assistant.
I can help with websites, designs, or business support.
What would you like to ask?`
                    ]
                },
                pricing: {
                    keywords: ['how much', 'price', 'cost', 'rate', 'budget', 'charge', 'quote', 'payment'],
                    responses: [
                        `💰 Here’s a quick guide:
• Website: ₦150k – ₦500k
• Logo/Graphics: ₦30k – ₦100k
• VA Services: From ₦10k/week

Message me with your project for a custom quote.`
                    ]
                },
                projects: {
                    keywords: ['project', 'portfolio', 'example', 'work', 'show me', 'samples'],
                    responses: [
                        `🛠️ Here are some sample works:
• Business websites
• Dashboards (Excel, Sheets)
• Logos, Flyers, Brands

View more: https://peterlight123.github.io/portfolio/index.html`
                    ]
                },
                contact: {
                    keywords: ['contact', 'reach', 'talk to you', 'get in touch', 'email', 'whatsapp', 'phone'],
                    responses: [
                        `📞 Contact Peter:
📧 Email: petereluwade55@gmail.com
📱 IG/Twitter: @peterlightspeed
🌐 Website: https://peterlight123.github.io/portfolio/`
                    ]
                },
                turnaround: {
                    keywords: ['how long', 'timeline', 'turnaround', 'deliver', 'delivery time'],
                    responses: [
                        `⏱️ Delivery time depends on the task:
• Logo: 2–3 days
• Website: 5–10 days
• Graphics Pack: 2–5 days
Let’s confirm based on your specific need.`
                    ]
                },
                revisions: {
                    keywords: ['edit', 'revisions', 'change', 'update', 'correction'],
                    responses: [
                        `🔁 No worries! All projects include revisions:
• 2–5 free edits (within agreed scope)
• Quick changes handled within 24 hours
Just let us know what needs fixing.`
                    ]
                }
            },
            pidgin: {
                greetings: {
                    keywords: ['how far', 'wetin dey', 'you dey', 'i hail', 'hi', 'oya'],
                    responses: [
                        `👋 How you dey? Na Peter smart chatbot be this!
I fit help you find info about design, coding or VA work.`
                    ]
                },
                pricing: {
                    keywords: ['how much', 'money', 'collect', 'cost', 'rate', 'budget', 'quote', 'payment'],
                    responses: [
                        `💰 See small estimate:
• Website: ₦150k – ₦500k
• Logo/Design: ₦30k – ₦100k
• VA work: From ₦10k/week

Talk your work make I run better quote.`
                    ]
                },
                projects: {
                    keywords: ['project', 'work wey you don do', 'sample', 'portfolio', 'example', 'show me'],
                    responses: [
                        `🛠️ Projects Peter don do:
• Business site
• Dashboards
• Logos/Flyers

Check am: https://peterlight123.github.io/portfolio/`
                    ]
                },
                contact: {
                    keywords: ['contact', 'reach', 'yarn you', 'talk to you', 'get you', 'email', 'phone'],
                    responses: [
                        `📞 You fit reach Peter:
📧 Email: petereluwade55@gmail.com
📱 IG/Twitter: @peterlightspeed
🌐 Website: https://peterlight123.github.io/portfolio/`
                    ]
                },
                turnaround: {
                    keywords: ['how long', 'deliver', 'fit ready', 'timeline', 'delivery time'],
                    responses: [
                        `⏱️ E dey depend on wetin you want:
• Logo: 2–3 days
• Website: 5–10 days
• Graphics: 2–5 days
Just talk wetin you need, make we run am.`
                    ]
                },
                revisions: {
                    keywords: ['edit', 'change am', 'correction', 'adjust', 'revise'],
                    responses: [
                        `🔁 No wahala, we dey allow corrections:
• Free revisions dey
• Small changes na quick run
Just talk wetin you wan make we change.`
                    ]
                }
            },
            default: {
                en: [`I'm not sure I understand. Try something like:
• "Show me your portfolio"
• "How much is a logo?"
• "Contact info"`],
                pidgin: [`I no understand wetin you talk. You fit ask:
• "Show me your works"
• "How much you dey collect?"
• "Your contact"`]
            }
        }
    }

    detectLanguage(msg) {
        const pidginWords = ['how far', 'wetin', 'dey', 'collect', 'oga', 'abeg', 'yarn', 'fit'];
        let pidginCount = 0;
        for (let word of pidginWords) {
            if (msg.toLowerCase().includes(word)) pidginCount++;
        }
        return pidginCount >= 2 ? 'pidgin' : 'en';
    }

    scrollToSection(query) {
        const keywordMap = {
            'testimonials': '#Testimonials',
            'services': '#Services',
            'contact': '#Contact',
            'about': '#About',
            'projects': '#Projects',
            'highlights': '#highlights',
            'sponsor': '#Sponsor',
            'cv': '#cv'
        };
        for (const keyword in keywordMap) {
            if (query.toLowerCase().includes(keyword)) {
                const section = document.querySelector(keywordMap[keyword]);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const sendBtn = document.getElementById('send-button-widget');
        const input = document.getElementById('user-input-widget');
        sendBtn?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const input = document.getElementById('user-input-widget');
        const message = input?.value.trim();
        if (!message) return;

        this.displayMessage(message, 'user');
        input.value = '';
        const response = this.getResponse(message);
        this.scrollToSection(message);
        this.displayMessage(response, 'bot');
    }

    getResponse(message) {
        const lang = this.detectLanguage(message);
        const kb = this.knowledgeBase[lang];

        for (const key in kb) {
            const block = kb[key];
            if (block.keywords.some(word => message.toLowerCase().includes(word))) {
                return block.responses[Math.floor(Math.random() * block.responses.length)];
            }
        }

        return this.knowledgeBase.default[lang][0];
    }

    displayMessage(text, sender) {
        const chatArea = document.getElementById('chat-area-widget');
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${sender === 'user' ? 'user-message' : 'bot-message'}`;
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        chatArea.appendChild(bubble);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.PeterBot = new PeterChatbot();
});
