import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const YEAR = new Date().getFullYear();

const LandingFooter = () => (
  <footer className="lp-footer">
    <div className="container">
      {/* Main row */}
      <div className="lp-footer-row">
        {/* Brand */}
        <Link to="/" className="lp-footer-brand-link">
          <img src="/resumex.svg" alt="Resumex" width={20} height={20} />
          <span>Resumex</span>
        </Link>

        {/* Nav links */}
        <nav className="lp-footer-nav">
          <Link to="/register">Get started</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">
            <Github size={14} /> GitHub
          </a>
        </nav>
      </div>

      {/* Bottom strip */}
        <div className="lp-footer-bottom">
          <span>© {YEAR} Resumex. Open-source under the MIT License.</span>
          <span>Built with React · No tracking · No ads</span>
        </div>
    </div>
  </footer>
);

export default LandingFooter;
