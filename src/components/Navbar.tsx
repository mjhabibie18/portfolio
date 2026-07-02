'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Jika elemen tidak ada (misal sedang di halaman detail project), arahkan ke halaman utama
      window.location.href = `/${lang}/#${targetId}`;
    }
  };


  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link href={`/${lang}`} className="navbar-brand" onClick={(e) => {
          closeMenu();
          if (pathname === `/${lang}`) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          Habibie<span style={{ color: 'var(--color-primary)' }}>&#125;</span>
        </Link>

        {/* Desktop Navigation */}
        <div id="navbar-links" style={{ display: isMenuOpen ? 'flex' : undefined }} className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>{dict.Nav_About}</a>
          <a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')}>{dict.Nav_Experience}</a>
          <a href="#skills" onClick={(e) => handleScrollTo(e, 'skills')}>{dict.Nav_Skills}</a>
          <a href="#projects-preview" onClick={(e) => handleScrollTo(e, 'projects-preview')}>{dict.Nav_Projects}</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>{dict.Nav_Contact}</a>
          
          <div className="lang-switcher-container" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', background: 'var(--color-bg-tertiary)', padding: '0.25rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
            <a 
              href={pathname.replace(`/${lang}`, `/en`)} 
              onClick={() => { document.cookie = `.AspNetCore.Culture=c=en|uic=en; path=/; max-age=31536000`; closeMenu(); }} 
              style={{ 
                fontWeight: 600, 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                fontSize: '0.85rem',
                color: lang === 'en' ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                background: lang === 'en' ? 'var(--color-primary)' : 'transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}>
              EN
            </a>
            <a 
              href={pathname.replace(`/${lang}`, `/id`)} 
              onClick={() => { document.cookie = `.AspNetCore.Culture=c=id|uic=id; path=/; max-age=31536000`; closeMenu(); }} 
              style={{ 
                fontWeight: 600, 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                fontSize: '0.85rem',
                color: lang === 'id' ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                background: lang === 'id' ? 'var(--color-primary)' : 'transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}>
              ID
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle" 
          id="navbar-toggle" 
          aria-label="Toggle navigation" 
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
