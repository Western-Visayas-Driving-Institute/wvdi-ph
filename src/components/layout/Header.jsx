import React, { useState, useEffect } from 'react';
import config from '../../data/config.json';

function Header({ logo }) {
  const { company, navigation } = config;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking a nav link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="wvdi-header">
        <img src={logo} className="wvdi-logo" alt="WVDI Logo" />
        <div className="wvdi-header-text">
          <h1>{company.name}</h1>
          <h2>Driving Institute Corporation</h2>
          <p className="wvdi-contact">{company.phone}</p>
          <p className="wvdi-hours">Office Hours: {company.officeHours}</p>
        </div>
        <button
          className={`wvdi-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      <nav className={`wvdi-nav ${isMenuOpen ? 'open' : ''}`}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}

export default Header;
