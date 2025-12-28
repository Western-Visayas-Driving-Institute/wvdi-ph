import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaTimes } from 'react-icons/fa';
import config from '../../data/config.json';

function MobileStickyCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = config.company.phone.replace(/[^0-9]/g, '');
  const whatsappNumber = config.company.whatsapp || '639178100009';

  if (!isVisible) return null;

  return (
    <div className={`wvdi-sticky-cta ${isExpanded ? 'expanded' : ''}`}>
      {isExpanded ? (
        <div className="wvdi-sticky-cta-options">
          <a
            href={`tel:+${phoneNumber}`}
            className="wvdi-sticky-cta-btn phone"
            aria-label="Call us"
          >
            <FaPhone />
            <span>Call Now</span>
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in driving lessons at WVDI.`}
            target="_blank"
            rel="noopener noreferrer"
            className="wvdi-sticky-cta-btn whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
          <button
            className="wvdi-sticky-cta-close"
            onClick={() => setIsExpanded(false)}
            aria-label="Close contact options"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <button
          className="wvdi-sticky-cta-trigger"
          onClick={() => setIsExpanded(true)}
          aria-label="Contact us"
        >
          <FaPhone />
          <span>Contact Us</span>
        </button>
      )}
    </div>
  );
}

export default MobileStickyCTA;
