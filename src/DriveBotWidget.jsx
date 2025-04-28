import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { BsMessenger } from 'react-icons/bs';

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

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    
    // Format conversation history for OpenAI API
    const conversationHistory = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }));
    
    try {
      // Include credentials: 'omit' to handle CORS when calling from GitHub Pages to Vercel
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit', // Important for cross-origin requests
        body: JSON.stringify({
          message: input.trim(),       // the text the user just typed
          history: conversationHistory, // prior { role, content } tuples
          language: getUserLanguage()  // keep if you want, server will ignore otherwise
        })
      });
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      
      // Handle response from OpenAI API format
      if (data.response) {
        setMessages((msgs) => [...msgs, { role: 'assistant', content: data.response }]);
      } else if (data.choices && data.choices.length > 0) {
        setMessages((msgs) => [...msgs, { role: 'assistant', content: data.choices[0].message.content }]);
      } else if (data.reply) {
        setMessages((msgs) => [...msgs, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((msgs) => [...msgs, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly at info@wvdi-ph.com." 
      }]);
    }
    setLoading(false);
  };

  // Define keyframes for the pulse animation
  const pulseKeyframes = `
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 4px 16px rgba(20, 31, 84, 0.3);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 4px 20px rgba(20, 31, 84, 0.5);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 4px 16px rgba(20, 31, 84, 0.3);
      }
    }
  `;

  return (
    <>
      {/* Add keyframes to document */}
      <style>{pulseKeyframes}</style>

      {/* Floating Button with improved design */}
      <button
        aria-label="Open DriveBot Chat"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'var(--wvdi-navy)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          boxShadow: '0 4px 16px rgba(20, 31, 84, 0.4)',
          zIndex: 1000,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'all 0.3s ease',
          animation: pulseAnimation ? 'pulse 2s infinite' : 'none',
          overflow: 'hidden'
        }}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(20, 31, 84, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 31, 84, 0.4)';
        }}
      >
        {/* Using a single messenger icon */}
        <BsMessenger size={28} color="#ffffff" />
      </button>

      {/* Chat Window with improved design */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 92,
            right: 24,
            width: 320,
            height: 450,
            backgroundColor: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            border: '1px solid #e0e0e0'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--wvdi-navy)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10
                }}
              >
                <span style={{ fontSize: 18, color: 'var(--wvdi-navy)' }}>🚗</span>
              </div>
              DriveBot
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 20,
                padding: 0
              }}
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: message.role === 'user' ? 'var(--wvdi-navy)' : '#f1f1f1',
                  color: message.role === 'user' ? '#fff' : '#333',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '18px 18px 18px 4px',
                  backgroundColor: '#f1f1f1',
                  color: '#333',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ animation: 'pulse 1s infinite' }}>•</div>
                  <div style={{ animation: 'pulse 1s infinite 0.2s' }}>•</div>
                  <div style={{ animation: 'pulse 1s infinite 0.4s' }}>•</div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Input */}
          <form
            onSubmit={sendMessage}
            style={{
              display: 'flex',
              padding: '12px 16px',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#f9f9f9'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: 20,
                outline: 'none',
                fontSize: 14
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--wvdi-navy)',
                color: '#fff',
                border: 'none',
                width: 36,
                height: 36,
                borderRadius: '50%',
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              disabled={loading || !input.trim()}
            >
              <FaPaperPlane style={{ fontSize: '14px', display: 'block' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
