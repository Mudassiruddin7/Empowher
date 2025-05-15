class Chatbot {
    constructor() {
        this.messages = [];
        this.initializeUI();
        this.bindEvents();
        this.knowledgeBase = {
            'login': {
                patterns: ['login', 'sign in', 'cannot login', 'login problem', 'how to login'],
                responses: [
                    "To login, click the 'Sign In' button in the top navigation bar. You can login using:",
                    "1. Email and password\n2. Phone number (OTP)\n3. Social login (Google/Facebook)",
                    "Are you having trouble with a specific login method?"
                ],
                quickReplies: ['Email login help', 'Phone login help', 'Social login help']
            },
            'register': {
                patterns: ['register', 'sign up', 'create account', 'how to register', 'join'],
                responses: [
                    "To register, click 'Sign up' in the login modal or 'Register' in the navigation bar.",
                    "The registration process has 3 simple steps:",
                    "1. Basic Information\n2. Choose your role\n3. Role-specific details",
                    "Would you like to know more about the different roles?"
                ],
                quickReplies: ['Tell me about roles', 'Registration help', 'Role benefits']
            },
            'roles': {
                patterns: ['roles', 'what roles', 'different roles', 'types of roles'],
                responses: [
                    "We offer four different roles:",
                    "1. Entrepreneur: For business owners and startups\n2. Supplier: For product/service providers\n3. Mentor: For experienced professionals\n4. Funder: For investors",
                    "Each role has unique features and benefits. Which role interests you?"
                ],
                quickReplies: ['Entrepreneur benefits', 'Supplier benefits', 'Mentor benefits', 'Funder benefits']
            },
            'forgot_password': {
                patterns: ['forgot password', 'reset password', 'password reset', 'cannot remember password'],
                responses: [
                    "Don't worry! You can reset your password easily:",
                    "1. Click 'Sign In'\n2. Click 'Forgot Password'\n3. Enter your email\n4. Follow the reset link in your email",
                    "Would you like me to guide you through the process?"
                ],
                quickReplies: ['Reset password', 'Other login options', 'Contact support']
            }
        };
    }

    initializeUI() {
        // Add chatbot toggle button to the page
        const toggleButton = document.createElement('div');
        toggleButton.className = 'chatbot-toggle';
        toggleButton.innerHTML = '💬';
        document.body.appendChild(toggleButton);

        // Add chatbot container
        const chatbotHTML = `
            <div class="chatbot-container">
                <div class="chatbot-header">
                    <h3>AI Assistant</h3>
                    <button class="chatbot-close">×</button>
                </div>
                <div class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Type your message...">
                    <button>Send</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // Cache DOM elements
        this.container = document.querySelector('.chatbot-container');
        this.messagesContainer = document.querySelector('.chatbot-messages');
        this.input = document.querySelector('.chatbot-input input');
        this.sendButton = document.querySelector('.chatbot-input button');
        this.toggleButton = toggleButton;
        this.closeButton = document.querySelector('.chatbot-close');
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.toggleChat());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput();
            }
        });
        this.sendButton.addEventListener('click', () => this.handleUserInput());
    }

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active') && this.messages.length === 0) {
            this.addMessage("Hello! 👋 I'm your AI assistant. How can I help you today?", 'bot');
            this.showQuickReplies(['Login help', 'Registration help', 'Learn about roles']);
        }
    }

    handleUserInput() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.input.value = '';
            this.processUserMessage(message);
        }
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        this.messages.push({ sender, message });
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div>'.repeat(3);
        this.messagesContainer.appendChild(indicator);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return indicator;
    }

    showQuickReplies(replies) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        
        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = reply;
            button.addEventListener('click', () => {
                this.addMessage(reply, 'user');
                this.processUserMessage(reply);
                quickRepliesDiv.remove();
            });
            quickRepliesDiv.appendChild(button);
        });

        this.messagesContainer.appendChild(quickRepliesDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    processUserMessage(message) {
        const indicator = this.showTypingIndicator();
        
        setTimeout(() => {
            indicator.remove();
            let response = this.findResponse(message.toLowerCase());
            response.responses.forEach((text, index) => {
                setTimeout(() => {
                    this.addMessage(text, 'bot');
                    if (index === response.responses.length - 1 && response.quickReplies) {
                        this.showQuickReplies(response.quickReplies);
                    }
                }, index * 500);
            });
        }, 1000);
    }

    findResponse(message) {
        for (const [intent, data] of Object.entries(this.knowledgeBase)) {
            if (data.patterns.some(pattern => message.includes(pattern))) {
                return data;
            }
        }
        
        return {
            responses: [
                "I'm not sure I understand. Could you please rephrase that?",
                "Here are some topics I can help you with:"
            ],
            quickReplies: ['Login help', 'Registration help', 'Learn about roles', 'Contact support']
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new Chatbot();
});
