import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthButtons = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
        <Link to="/profile" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Profile</Link>
      </div>
    );
  }
  return (
    <>
      <Link to="/login" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Log in</Link>
      <Link to="/register" style={{
        padding: '8px 16px',
        backgroundColor: 'var(--lp-text)',
        color: 'var(--bg-app)',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 600,
        fontSize: '0.9rem'
      }}>Sign up</Link>
    </>
  );
};

const Home = () => {
  return (
    <div className="landing-page">
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '1.25rem', color: 'var(--lp-text)' }}>Resumex</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Check if user is logged in, if so show Dashboard, else Login/Register */}
          <AuthButtons />
        </div>
      </nav>

      {/* 
        1. Hero Section 
        Establish authority immediately.
      */}
      <section className="container" style={{ padding: '160px 0 120px', textAlign: 'center' }}>
        {/* Large Serif Title */}
        <h1 className="lp-brand-title">Resumex</h1>

        <h2 className="lp-hero-title" style={{ maxWidth: '800px', margin: '0 auto 32px' }}>
          Build a clear, professional resume.
        </h2>

        <p style={{ fontSize: '1.25rem', color: 'var(--lp-text-muted)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 64px' }}>
          Create a clear, professional resume focused on structure, readability,
          and the experience that actually matters.        </p>

        <Link to="/dashboard" className="btn-lp-primary">
          Manage Resumes
        </Link>
      </section>

      {/* 
        2. Value Clarification
        Answer: "What is this?" clearly.
      */}
      <section className="container" style={{ padding: '80px 0 120px', textAlign: 'center' }}>
        <p className="lp-section-text" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Resumex is a structured, professional resume editor. It ensures your content is the only thing standing out—not the layout, not the template, but the work itself.
        </p>
      </section>

      {/* 
        3. Engineered Principles (Formerly Philosophy)
        Horizontal Grid of 3 Cards
      */}
      <section className="container" style={{ padding: '80px 0', borderTop: '1px solid var(--lp-border)' }}>
        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--lp-text-muted)', marginBottom: '24px' }}>Engineered Principles</p>

        <div className="lp-grid-3">
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Focused</h3>
            <p className="lp-card-body">No distractions. No complex drag-and-drop. Just you and your career history.</p>
          </div>
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Secure Cloud</h3>
            <p className="lp-card-body">Your resumes are encrypted and saved to the cloud. Access them from any device.</p>
          </div>
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Standard</h3>
            <p className="lp-card-body">Clean, ATS-friendly PDF export that looks professional in any industry.</p>
          </div>
        </div>
      </section>

      {/* 
        4. Capabilities (2x2 Grid)
        Reassure usefulness.
      */}
      <section className="container" style={{ padding: '80px 0', borderTop: '1px solid var(--lp-border)', marginBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--lp-text-muted)' }}>Capabilities</p>
        </div>

        <div className="lp-grid-2">
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Multiple Versions</h3>
            <p className="lp-card-body">Maintain specific versions for different roles without duplicating your entire history.</p>
          </div>
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Real-time Preview</h3>
            <p className="lp-card-body">Instant rendering as you type. No loading screens or refresh cycles.</p>
          </div>
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">JSON Export</h3>
            <p className="lp-card-body">Own your data. Export your resume as a standardized JSON structure.</p>
          </div>
          <div className="lp-minimal-card">
            <h3 className="lp-card-heading">Open Source</h3>
            <p className="lp-card-body">Transparency you can trust. Code is available for review on GitHub.</p>
          </div>
        </div>
      </section>

      {/* 
        Footer (Minimal)
        Closure. No Final CTA.
      */}
      <footer style={{ padding: '64px 0', borderTop: '1px solid var(--lp-border)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.25rem', color: 'var(--lp-text)' }}>Resumex</span>
              <p style={{ marginTop: '8px', color: 'var(--lp-text-muted)', fontSize: '0.9rem' }}>
                Quietly professional.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>

          <p style={{ color: 'var(--lp-text-muted)', fontSize: '0.8rem', opacity: 0.6 }}>
            © {new Date().getFullYear()} Resumex
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
