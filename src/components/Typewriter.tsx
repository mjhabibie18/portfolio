'use client';

import React, { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 45, delay = 600 }: { text: string, speed?: number, delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Reset state if text changes (e.g. language switch)
    setDisplayedText('');
    setIsTyping(false);
    setShowCursor(false);

    let i = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      setShowCursor(true);
      typingInterval = setInterval(() => {
        if (i < text.length) {
          // Use functional state update to avoid stale closures
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Hide cursor after a few seconds
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, speed, delay]);

  return (
    <span style={{ 
        borderRight: showCursor ? '2px solid var(--color-accent-light)' : 'none',
        paddingRight: '4px',
        display: 'inline-block' 
      }}>
      {displayedText}
    </span>
  );
}
