import React, { useState, useRef, useEffect } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';

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
          fontSize: 28,
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
        {/* Using messenger icon with explicit styling to ensure visibility */}
        <FaFacebookMessenger style={{ 
          fontSize: '24px', 
          color: 'white',
          display: 'block'
        }} />
      </button>

      {/* Chat Window with improved design */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 92,
            right: 24,
            width: 340,
            maxWidth: '95vw',
            height: 420,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)', 
            color: '#fff', 
            padding: '12px 16px', 
            borderTopLeftRadius: 16, 
            borderTopRightRadius: 16, 
            fontWeight: 600, 
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
                  fill="white" 
                />
              </svg>
              DriveBot
            </div>
            <button
              aria-label="Close chat"
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                color: '#fff', 
                height: '24px',
                width: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >×</button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#f5f7fa' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                margin: '8px 0', 
                textAlign: msg.role === 'user' ? 'right' : 'left',
                animation: 'fadeIn 0.3s ease'
              }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: msg.role === 'user' ? '#0D47A1' : '#e3eafc',
                    color: msg.role === 'user' ? '#fff' : '#222',
                    borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    padding: '10px 14px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    fontSize: '15px',
                    lineHeight: '1.4'
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form onSubmit={sendMessage} style={{ 
            display: 'flex', 
            borderTop: '1px solid #eee', 
            padding: '12px',
            background: '#fff'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ 
                flex: 1, 
                border: '1px solid #e0e0e0', 
                outline: 'none', 
                borderRadius: 12, 
                padding: '10px 14px', 
                fontSize: 15, 
                background: '#f9f9f9',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #1976D2';
                e.target.style.background = '#fff';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #e0e0e0';
                e.target.style.background = '#f9f9f9';
              }}
              disabled={loading}
              aria-label="Type your message"
            />
            <button
              type="submit"
              style={{ 
                marginLeft: 8, 
                background: '#0D47A1', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 12, 
                padding: '0 18px', 
                fontSize: 15, 
                cursor: loading ? 'default' : 'pointer',
                opacity: loading || !input.trim() ? 0.7 : 1,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px'
              }}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.background = '#1565C0';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0D47A1';
              }}
            >
              {loading ? (
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #fff', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
                </svg>
              )}
            </button>
          </form>
          
          {/* Add animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
