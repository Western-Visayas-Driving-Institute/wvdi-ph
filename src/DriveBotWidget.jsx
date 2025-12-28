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
  const [leadData, setLeadData] = useState(null);
  const [currentProvider, setCurrentProvider] = useState(null);
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
  }, [sessionId, leadCaptured, leadData]);

  const saveLead = async () => {
    // Save if we have a session and more than just the initial bot message
    if (!sessionId || messages.length <= 1) return;

    try {
      const conversationSummary = messages
        .slice(-5)
        .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
        .join('\n');

      // Use leadData if available, otherwise create empty lead structure
      const lead = leadData || { phones: [], emails: [], name: null, services: [] };

      console.log('Saving lead:', { lead, conversationSummary });

      const response = await fetch(LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          conversationSummary,
        }),
      });

      const result = await response.json();
      console.log('Lead save result:', result);
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
        // Update session ID, lead status, and lead data
        if (data.sessionId) {
          setSessionId(data.sessionId);
        }
        if (data.leadCaptured) {
          setLeadCaptured(true);
        }
        if (data.lead) {
          setLeadData(data.lead);
        }
        if (data.provider) {
          setCurrentProvider(data.provider);
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
    // Save conversation when closing if there was any interaction
    if (sessionId && messages.length > 1) {
      saveLead();
    }
    setOpen(false);
  };

  // Always show the widget - handle unavailability gracefully in chat
  // The health check only logs status, doesn't block rendering

  return (
    <div className="drivebot-container">
      {/* Chat toggle button with Messenger-style icon */}
      <button
        className={`drivebot-toggle ${pulseAnimation ? 'pulse' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
              className={`drivebot-send-btn ${currentProvider ? `provider-${currentProvider}` : ''}`}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
