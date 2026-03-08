import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="lp-footer">
      <div className="container">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <img src="/resumex.svg" alt="Resumex logo" style={{ width: 24, height: 24 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--lp-text)', letterSpacing: '-0.01em' }}>Resumex</span>
            </div>
            <p className="lp-footer-tagline">
              The open-source, structured career history editor built for modern professionals.
            </p>
          </div>

          <div className="lp-footer-links">
            <div className="lp-footer-column">
              <p className="lp-footer-column-title">Product</p>
              <Link to="/dashboard">Dashboard</Link>
              <a href="#features">Features</a>
            </div>
            <div className="lp-footer-column">
              <p className="lp-footer-column-title">Legal</p>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
            <div className="lp-footer-column">
              <p className="lp-footer-column-title">Open Source</p>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">Report an Issue</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

