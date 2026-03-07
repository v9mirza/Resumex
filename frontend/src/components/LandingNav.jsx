import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const LandingNav = ({ rightContent }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="lp-glass-nav">
      <nav className="container lp-nav-bar">
        <div className="lp-nav-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/resumex.svg" alt="Resumex logo" style={{ width: 24, height: 24 }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--lp-text)',
                letterSpacing: '-0.01em',
              }}
            >
              Resumex
            </span>
          </Link>
        </div>
        <div className="lp-nav-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="lp-theme-toggle"
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--lp-border)',
              background: 'var(--lp-bg-alt)',
              color: 'var(--lp-text)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          </button>
          {rightContent}
        </div>
      </nav>
    </header>
  );
};

export default LandingNav;

