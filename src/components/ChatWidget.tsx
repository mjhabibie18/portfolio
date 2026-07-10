'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatWidget({ placeholder, greeting }: { placeholder: string, greeting: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([
    { sender: 'ai', text: greeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'Maaf, terjadi kesalahan pada server AI.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Koneksi ke AI gagal. Coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
            width: '320px', 
            height: '400px', 
            background: 'var(--color-bg-card)', 
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}>
          
          <div style={{ padding: '1rem', background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-primary)' }}>AI Assistant</h3>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
          </div>

          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                color: msg.sender === 'user' ? '#fff' : 'var(--color-text-secondary)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                maxWidth: '85%',
                fontSize: '0.875rem',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid var(--color-border)' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: 'none', color: 'var(--color-text-primary)', outline: 'none' }}
            />
            <button type="submit" disabled={isLoading} style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0 1rem', cursor: 'pointer', fontWeight: 600 }}>
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={toggleChat} 
        style={{ 
          width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff',
          border: 'none', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)', cursor: 'pointer',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
}
