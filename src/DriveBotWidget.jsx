import React, { useState, useRef, useEffect } from 'react';

// Make the API URL configurable via environment variables
const API_BASE = import.meta.env.VITE_CHAT_API_URL || 'https://wvdi-ph.vercel.app';
const CHAT_URL = `${API_BASE}/api/chat`;
const HEALTH_URL = `${API_BASE}/api/health`;
const LEADS_URL = `${API_BASE}/api/leads`;

function getUserLanguage() {
  return navigator.language || navigator.userLanguage || 'en';
}

const initialBotMessage = {
  role: 'assistant',
  content: 'Hi! I am DriveBot, your WVDI assistant. Ask me anything about our courses, branches, office hours, or requirements!'
};

export default function DriveBotWidget() {
  const [available, setAvailable] = useState(null); // null = checking, true/false = result
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check AI availability on mount
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const response = await fetch(HEALTH_URL, {
          method: 'GET',
          signal: AbortSignal.timeout(5000),
        });

        if (response.ok) {
          const data = await response.json();
          setAvailable(data.status === 'ok');
        } else {
          setAvailable(false);
        }
      } catch (error) {
        console.log('DriveBot unavailable:', error.message);
        setAvailable(false);
      }
    };

    checkAvailability();

    // Recheck every 5 minutes
    const interval = setInterval(checkAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Stop pulsing animation after initial attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseAnimation(false);
    }, 10000);

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

  // Save lead when conversation ends (user closes chat after providing info)
  useEffect(() => {
    return () => {
      if (sessionId && leadCaptured) {
        // Send lead data when widget unmounts
        saveLead();
      }
    };
  }, [sessionId, leadCaptured]);

  const saveLead = async () => {
    if (!sessionId) return;

    try {
      await fetch(LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          conversationSummary: messages
            .slice(-5)
            .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
            .join('\n'),
        }),
      });
    } catch (error) {
      console.error('Failed to save lead:', error);
    }
  };

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
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language: getUserLanguage(),
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update session ID and lead status
        if (data.sessionId) {
          setSessionId(data.sessionId);
        }
        if (data.leadCaptured) {
          setLeadCaptured(true);
        }

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response || "I'm sorry, I couldn't process that. Please try again."
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.error === 'AI service temporarily unavailable'
            ? "I'm sorry, our AI assistant is temporarily unavailable. Please contact us directly via phone or WhatsApp."
            : "I'm sorry, there was an error processing your request. Please try again later."
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

  const handleClose = () => {
    // Save lead before closing if we have captured data
    if (sessionId && leadCaptured) {
      saveLead();
    }
    setOpen(false);
  };

  // Don't render if AI is not available or still checking
  if (available === null || available === false) {
    return null;
  }

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
              onClick={handleClose}
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
