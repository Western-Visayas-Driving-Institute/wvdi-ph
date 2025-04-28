import React from 'react';
import './App.css';
import wvdiLogo from './assets/WVDI-logo.png';

export default function MinimalApp() {
  return (
    <div className="wvdi-root">
      <header className="wvdi-header">
        <img src={wvdiLogo} className="wvdi-logo" alt="WVDI Logo" />
        <div className="wvdi-header-text">
          <h1>Western Visayas Driving Institute</h1>
          <p>Your trusted partner for professional driving education</p>
        </div>
      </header>
      
      <main>
        <section className="hero-section">
          <h2>Welcome to Western Visayas Driving Institute</h2>
          <p>We're currently updating our website. Please check back soon for our full site.</p>
          <p>In the meantime, you can contact us directly at our branches:</p>
          
          <div className="branches">
            <div className="branch">
              <h3>Lacson Branch (Main)</h3>
              <p>Door 2, Hilado Extension, Bacolod City</p>
              <p>Contact: 0917-107-0000</p>
            </div>
            
            <div className="branch">
              <h3>Bacolod Shopping Branch</h3>
              <p>2nd Floor, Bacolod Shopping, Libertad Street, Bacolod City</p>
              <p>Contact: 0917-107-0001</p>
            </div>
            
            <div className="branch">
              <h3>Silay Branch</h3>
              <p>Rizal St. Silay City</p>
              <p>Contact: 0917-107-0002</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="wvdi-footer">
        <p>&copy; {new Date().getFullYear()} Western Visayas Driving Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
