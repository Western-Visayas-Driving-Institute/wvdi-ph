import React, { useState, useRef, useEffect } from 'react';

// Make the API URL configurable via environment variables
const API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://wvdi-ph-vercel.vercel.app/api/chat';

function getUserLanguage() {
  return navigator.language || navigator.userLanguage || 'en';
}

const initialBotMessage = {
  role: 'assistant',
  content: 'Hi! I am DriveBot, your WVDI assistant. Ask me anything about our courses, branches, office hours, or requirements!'
};

export default function DriveBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Stop pulsing animation after initial attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseAnimation(false);
    }, 10000); // Stop pulsing after 10 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language: getUserLanguage()
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message || "I'm sorry, I couldn't process that. Please try again."
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm sorry, there was an error processing your request. Please try again later."
        }]);
        console.error('Error from chatbot API:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, there was a connection error. Please check your internet connection and try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="drivebot-container">
      {/* Chat toggle button with Messenger-style icon */}
      <button 
        className={`drivebot-toggle ${pulseAnimation ? 'pulse' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <span style={{ fontSize: '28px' }}>💬</span>
      </button>
      
      {/* Chat window */}
      {open && (
        <div className="drivebot-chat-window">
          {/* Chat header */}
          <div className="drivebot-header">
            <div className="drivebot-title">
              <span>DriveBot</span>
              <small>WVDI Assistant</small>
            </div>
            <button 
              className="drivebot-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <span style={{ fontSize: '18px' }}>✕</span>
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="drivebot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`drivebot-message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="drivebot-message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="drivebot-input-container">
            <textarea
              ref={inputRef}
              className="drivebot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
            />
            <button 
              className="drivebot-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <span style={{ fontSize: '18px' }}>📤</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
