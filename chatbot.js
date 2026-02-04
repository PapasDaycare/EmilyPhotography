// Emily Photography AI Chatbot
class EmilyBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.addWelcomeMessage();
  }

  createChatWidget() {
    const chatHTML = `
      <!-- Chat Button -->
      <button class="chat-button" id="chatButton" aria-label="Open chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Chat Window -->
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="chat-avatar">EA</div>
            <div>
              <div class="chat-header-title">Emily Photography</div>
              <div class="chat-header-subtitle">Ask me anything!</div>
            </div>
          </div>
          <button class="chat-close" id="chatClose" aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <div class="chat-input-container">
          <input 
            type="text" 
            class="chat-input" 
            id="chatInput" 
            placeholder="Ask about pricing, availability, sessions..."
            aria-label="Chat message"
          />
          <button class="chat-send" id="chatSend" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const chatButton = document.getElementById('chatButton');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');

    chatButton.addEventListener('click', () => this.toggleChat());
    chatClose.addEventListener('click', () => this.toggleChat());
    chatSend.addEventListener('click', () => this.sendMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatButton');
    
    if (this.isOpen) {
      chatWindow.classList.add('open');
      chatButton.classList.add('hidden');
      document.getElementById('chatInput').focus();
    } else {
      chatWindow.classList.remove('open');
      chatButton.classList.remove('hidden');
    }
  }

  addWelcomeMessage() {
    const welcomeMsg = "Hi! I'm Emily's AI assistant. I can help answer questions about photography sessions, pricing, availability, and more. What would you like to know?";
    this.addMessage(welcomeMsg, 'bot');
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    this.messages.push({ role: sender === 'bot' ? 'assistant' : 'user', content: text });
  }

  async sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      const response = await this.getAIResponse(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
    } catch (error) {
      console.error('Chatbot error:', error);
      this.hideTypingIndicator();
      this.addMessage("I'm sorry, I'm having trouble connecting right now. Please try the booking form or email Emily directly at Emily.hopp316@gmail.com", 'bot');
    }
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="message-bubble"><span></span><span></span><span></span></div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  async getAIResponse(userMessage) {
    // System prompt to guide the AI's behavior
    const systemPrompt = `You are a helpful AI assistant for Emily Photography, a photographer based in Alpena, Michigan. 
    
Key information:
- Emily specializes in weddings, portraits, families, and events
- She serves Northern Michigan
- Photography style: modern, natural, timeless
- Email: Emily.hopp316@gmail.com
- Pricing packages available on the website
- Can book sessions through the website's booking form

Be friendly, helpful, and professional. Keep responses concise (2-3 sentences max). 
If asked about specific pricing, availability, or booking details, encourage them to check the Pricing page or fill out the booking form.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.messages.slice(-10) // Last 10 messages for context
    ];

    // Call our secure serverless function instead of OpenAI directly
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', response.status, errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new EmilyBot());
} else {
  new EmilyBot();
}
