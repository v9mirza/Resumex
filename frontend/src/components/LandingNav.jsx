import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

const LandingNav = ({ rightContent }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="lp-glass-nav">
      <nav className="container lp-nav-bar">
        {/* Left: Brand */}
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

        {/* Middle: intentionally empty for a cleaner nav */}
        <div className="lp-nav-links" />

        {/* Right: Auth / dashboard actions passed from page */}
        <div className="lp-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={toggleTheme}
            className="lp-nav-theme-btn"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid var(--lp-border)',
              background: 'var(--lp-bg-alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--lp-text)',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {rightContent}
        </div>
      </nav>
    </header>
  );
};

export default LandingNav;

