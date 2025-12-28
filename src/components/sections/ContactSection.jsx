import React, { Suspense, lazy } from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaSnapchat, FaWhatsapp } from 'react-icons/fa';
import config from '../../data/config.json';
import branches from '../../data/branches.json';

const ContactForm = lazy(() => import('../../ContactForm.jsx'));

const socialIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
  snapchat: FaSnapchat,
  whatsapp: FaWhatsapp
};

function ContactSection() {
  const { company, social } = config;

  return (
    <section id="contact" className="wvdi-contact-section">
      <h2>Contact Us</h2>
      <p>
        Ready to start your journey to becoming a skilled and confident driver? Reach out to us
        today!
      </p>
      <p>
        <strong>Phones:</strong>
        <br />
        {branches.map((branch) => (
          <React.Fragment key={branch.id}>
            {branch.name}: {branch.phones.join(' / ')}
            <br />
          </React.Fragment>
        ))}
      </p>
      <p>
        <strong>Email:</strong>
        <br />
        {company.email}
      </p>
      <p>
        <strong>Opening Hours:</strong>
        <br />
        {company.hours}
      </p>
      <div className="wvdi-contact-buttons">
        <a href="tel:+63344355803" className="wvdi-cta">
          Call Us Now
        </a>
        <a
          href={`https://wa.me/${company.whatsapp}?text=Hi! I'm interested in driving lessons at WVDI.`}
          target="_blank"
          rel="noopener noreferrer"
          className="wvdi-cta wvdi-cta-whatsapp"
        >
          <FaWhatsapp style={{ marginRight: '0.5rem' }} />
          Chat on WhatsApp
        </a>
      </div>
      <div style={{ margin: '2.5rem auto', maxWidth: 500 }}>
        <Suspense fallback={<div>Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
      <div className="wvdi-socials">
        {social.map((item) => {
          const Icon = socialIcons[item.platform];
          return (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              {Icon ? <Icon size={24} /> : item.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default ContactSection;
