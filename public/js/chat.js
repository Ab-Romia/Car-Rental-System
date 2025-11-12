// Chat Widget

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.loadWelcomeMessage();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <button class="chat-button" id="chatToggle" aria-label="Toggle chat">
                <i class="fas fa-comments"></i>
            </button>
            <div class="chat-container" id="chatContainer">
                <div class="chat-header">
                    <div class="chat-header-content">
                        <div class="chat-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chat-header-text">
                            <h3>CarRental Assistant</h3>
                            <p>We're here to help</p>
                        </div>
                    </div>
                    <button class="chat-close" id="chatClose" aria-label="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <textarea
                            class="chat-input"
                            id="chatInput"
                            placeholder="Type your message..."
                            rows="1"
                        ></textarea>
                        <button class="chat-send-button" id="chatSend" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatToggle');
        const closeBtn = document.getElementById('chatClose');
        const sendBtn = document.getElementById('chatSend');
        const input = document.getElementById('chatInput');

        toggleBtn.addEventListener('click', () => this.toggle());
        closeBtn.addEventListener('click', () => this.close());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        input.addEventListener('input', () => {
            this.autoResize(input);
        });
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatContainer');
        const button = document.getElementById('chatToggle');

        if (this.isOpen) {
            container.classList.add('active');
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-times"></i>';
            document.getElementById('chatInput').focus();
        } else {
            container.classList.remove('active');
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-comments"></i>';
        }
    }

    close() {
        this.isOpen = false;
        document.getElementById('chatContainer').classList.remove('active');
        document.getElementById('chatToggle').classList.remove('active');
        document.getElementById('chatToggle').innerHTML = '<i class="fas fa-comments"></i>';
    }

    loadWelcomeMessage() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = `
            <div class="chat-welcome">
                <div class="chat-welcome-icon">
                    <i class="fas fa-car"></i>
                </div>
                <h4>Welcome to CarRental Pro!</h4>
                <p>How can I help you today?</p>
                <div class="chat-suggestions">
                    <button class="suggestion-button" onclick="chatWidget.sendSuggestion('What cars are available?')">
                        <i class="fas fa-car"></i> What cars are available?
                    </button>
                    <button class="suggestion-button" onclick="chatWidget.sendSuggestion('How do I rent a car?')">
                        <i class="fas fa-question-circle"></i> How do I rent a car?
                    </button>
                    <button class="suggestion-button" onclick="chatWidget.sendSuggestion('Where are your offices?')">
                        <i class="fas fa-map-marker-alt"></i> Where are your offices?
                    </button>
                </div>
            </div>
        `;
    }

    sendSuggestion(message) {
        document.getElementById('chatInput').value = message;
        this.sendMessage();
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        input.value = '';
        input.style.height = 'auto';

        this.addMessage('user', message);
        this.showTypingIndicator();

        try {
            const response = await fetch('/chat/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            this.hideTypingIndicator();

            if (data.success) {
                this.addMessage('assistant', data.response);
            } else {
                this.showError(data.error || 'Failed to get response');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.showError('Network error. Please check your connection.');
        }

        document.getElementById('chatInput').focus();
    }

    addMessage(role, content) {
        const messagesContainer = document.getElementById('chatMessages');

        // Remove welcome message if present
        const welcome = messagesContainer.querySelector('.chat-welcome');
        if (welcome) {
            welcome.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div>
                <div class="message-content">${this.escapeHtml(content)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatMessages');

        const indicator = document.createElement('div');
        indicator.className = 'chat-message assistant';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(indicator);
        this.scrollToBottom();

        document.getElementById('chatSend').disabled = true;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
        document.getElementById('chatSend').disabled = false;
    }

    showError(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'chat-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${this.escapeHtml(message)}`;
        messagesContainer.appendChild(errorDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat widget when DOM is ready
let chatWidget;
document.addEventListener('DOMContentLoaded', () => {
    chatWidget = new ChatWidget();
});
