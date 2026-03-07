import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer style={{ padding: '64px 0 32px', backgroundColor: 'var(--lp-bg)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <img src="/resumex.svg" alt="Resumex logo" style={{ width: 24, height: 24 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--lp-text)', letterSpacing: '-0.01em' }}>Resumex</span>
              </div>
            <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              The open-source, structured career history editor built for modern professionals.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--lp-text)' }}>Product</p>
              <Link to="/dashboard" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Dashboard</Link>
              <a href="#features" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Features</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--lp-text)' }}>Legal</p>
              <Link to="/privacy-policy" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--lp-text)' }}>Open Source</p>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>GitHub Repo</a>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Report an Issue</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

