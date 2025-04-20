import React, { useState, useRef, useEffect } from 'react';

const API_URL = 'https://wvdi-ph-vercel-lwzl3faln-philippe-barthelemys-projects.vercel.app/api/chat';

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
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.filter(m => m.role !== 'system'),
          language: getUserLanguage()
        })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: 'assistant', content: "Sorry, I'm having trouble answering right now." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open DriveBot Chat"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#0D47A1',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 1000,
          cursor: 'pointer',
          fontSize: 28
        }}
        onClick={() => setOpen(o => !o)}
      >
        💬
      </button>
      {/* Chat Window */}
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
            zIndex: 1000
          }}
        >
          <div style={{ background: '#0D47A1', color: '#fff', padding: '12px 16px', borderTopLeftRadius: 16, borderTopRightRadius: 16, fontWeight: 600, fontSize: 18 }}>
            DriveBot
            <button
              aria-label="Close chat"
              style={{ float: 'right', background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            >×</button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#f5f7fa' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: '8px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: msg.role === 'user' ? '#0D47A1' : '#e3eafc',
                    color: msg.role === 'user' ? '#fff' : '#222',
                    borderRadius: 16,
                    padding: '8px 14px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ flex: 1, border: 'none', outline: 'none', borderRadius: 12, padding: 10, fontSize: 16, background: '#f0f2f5' }}
              disabled={loading}
              aria-label="Type your message"
            />
            <button
              type="submit"
              style={{ marginLeft: 8, background: '#0D47A1', color: '#fff', border: 'none', borderRadius: 12, padding: '0 18px', fontSize: 16, cursor: 'pointer' }}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
