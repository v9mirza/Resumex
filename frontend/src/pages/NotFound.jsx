import React from 'react';
import { Link } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';

const NotFound = () => {
  return (
    <div className="landing-page">
      <Seo
        title="Page not found | Resumex"
        description="The page you’re looking for doesn’t exist. Head back to the Resumex home page or sign in to your dashboard."
        canonicalPath="/404"
      />
      <LandingNav rightContent={null} />
      <main className="container" style={{ padding: '96px 0 120px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--lp-text-muted)', marginBottom: 12 }}>
          404 – Page not found
        </p>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.04em', margin: 0, color: 'var(--lp-text)' }}>
          We couldn’t find that page.
        </h1>
        <p style={{ marginTop: 12, fontSize: '0.95rem', color: 'var(--lp-text-muted)', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          The link may be broken, or the page may have been moved. You can go back to the home page or open your dashboard.
        </p>
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid var(--lp-border)',
              background: 'var(--lp-bg-alt)',
              color: 'var(--lp-text)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none'
            }}
          >
            Go to home
          </Link>
          <Link
            to="/dashboard"
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              border: 'none',
              background: 'var(--lp-accent)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Open dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

