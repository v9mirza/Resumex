import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, FileJson, CheckCircle, LayoutTemplate, Star, Copy, Eye, Github } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav';

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
        padding: '10px 20px',
        backgroundColor: 'var(--lp-accent)',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 600,
        fontSize: '0.95rem',
        boxShadow: '0 2px 4px rgba(0, 130, 201, 0.2)',
        transition: 'transform 0.2s, background-color 0.2s'
      }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--lp-accent-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--lp-accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >Sign up</Link>
    </>
  );
};

const Home = () => {
  return (
    <div className="landing-page">
      <LandingNav rightContent={<AuthButtons />} />

      {/* 
        1. Hero Section 
        Premium Split Layout with Floating Mock UI
      */}
      <section className="container lp-section-hero" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background gradient (primary accent orb) */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(0,130,201,0.06) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        {/* Secondary Purple/Indigo Orb for mesh gradient feel */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="hero-split-layout">
          {/* Left Side: Text and CTA */}
          <motion.div
            className="hero-text-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(0,130,201,0.08)', borderRadius: '50px', marginBottom: '24px', color: 'var(--lp-accent)', fontWeight: 600, fontSize: '0.9rem' }}>
              <Star size={16} /> Resumex 2.0 is Here
            </div>

            <h1 className="lp-hero-title">
              Build a clean, <span className="text-gradient-blue">professional</span> resume in minutes.
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--lp-text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
              Create a clean, standardized resume focused on structure, readability,
              and the experience that actually matters. No formatting fights, just content.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/dashboard" className="btn-lp-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                Start Building Free
              </Link>
              <a href="#features" className="btn-lp-secondary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                View Features
              </a>
            </div>
          </motion.div>

          {/* Right Side: Premium Floating Mock UI */}
          <motion.div
            className="hero-visual-content"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ perspective: '1000px' }}
            >
              <div className="mock-ui-container" style={{ height: '400px', display: 'flex', flexDirection: 'column', transform: 'rotateY(-4deg) rotateX(2deg)', boxShadow: '20px 30px 60px rgba(0,0,0,0.08)' }}>
                <div className="mock-ui-header">
                  <div className="mock-ui-dot" style={{ background: '#ff5f56' }}></div>
                  <div className="mock-ui-dot" style={{ background: '#ffbd2e' }}></div>
                  <div className="mock-ui-dot" style={{ background: '#27c93f' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '24px', flex: 1, padding: '8px' }}>
                  <div style={{ flex: 1, borderRight: '1px solid var(--lp-border)', paddingRight: '24px' }}>
                    <div style={{ width: '60%', height: '14px', background: 'var(--lp-border)', borderRadius: '6px', marginBottom: '24px' }}></div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--lp-bg-alt)', borderRadius: '4px', marginBottom: '12px' }}></div>
                    <div style={{ width: '90%', height: '10px', background: 'var(--lp-bg-alt)', borderRadius: '4px', marginBottom: '12px' }}></div>
                    <div style={{ width: '95%', height: '10px', background: 'var(--lp-bg-alt)', borderRadius: '4px', marginBottom: '32px' }}></div>

                    <div style={{ width: '40%', height: '14px', background: 'var(--lp-border)', borderRadius: '6px', marginBottom: '24px' }}></div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--lp-bg-alt)', borderRadius: '4px', marginBottom: '12px' }}></div>
                    <div style={{ width: '85%', height: '10px', background: 'var(--lp-bg-alt)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ flex: 1.2, background: 'var(--lp-bg-alt)', borderRadius: '12px', border: '1px solid var(--lp-border)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.06)' }}>
                    <LayoutTemplate size={56} color="var(--lp-text-muted)" />
                    <p style={{ marginTop: '20px', color: 'var(--lp-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Live PDF Output</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By (Social Proof) */}
      <section className="lp-section-trusted">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="lp-trusted-eyebrow">
            Trusted by professionals securing roles at top companies
          </p>
          <div className="lp-trusted-logos">
            {['Acme Corp', 'Global Tech', 'Nexus', 'Stark Ind', 'Umbrella'].map((name) => (
              <span key={name} className="lp-trusted-logo-item">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="lp-section-features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <p className="lp-section-eyebrow">Engineered Principles</p>
            <h2 className="lp-section-title">Designed for professionals.</h2>
            <p className="lp-section-subtitle">
              It ensures your content is the only thing standing out—not the layout, not the template, but the work itself.
            </p>
          </motion.div>

          <div className="lp-bento-grid">
            {/* Bento Large Feature */}
            <motion.div
              className="lp-minimal-card bento-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ background: 'rgba(0,130,201,0.08)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <Cloud size={28} color="var(--lp-accent)" />
              </div>
              <h3 className="lp-card-heading" style={{ fontSize: '1.5rem' }}>Secure Cloud Sync</h3>
              <p className="lp-card-body" style={{ fontSize: '1.05rem' }}>Your professional history is private. Resumex securely saves your data directly to the cloud, allowing you to access and update your resume from any device instantly without manual file transfers.</p>

              <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
                <div className="lp-saved-badge" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--lp-bg-alt)', borderRadius: '8px', border: '1px solid var(--lp-border)' }}>
                  <CheckCircle size={20} color="var(--lp-success, #10b981)" />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--lp-text)' }}>Changes saved automatically</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Small Top */}
            <motion.div
              className="lp-minimal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.1 }}
            >
              <div style={{ background: 'var(--lp-bg-alt)', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <ShieldCheck size={24} color="var(--lp-text-muted)" />
              </div>
              <h3 className="lp-card-heading">Data Ownership</h3>
              <p className="lp-card-body">We don't hold your data hostage. Export your entire career history as a standardized JSON structure anytime.</p>
            </motion.div>

            {/* Bento Small Bottom */}
            <motion.div
              className="lp-minimal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.2 }}
            >
              <div style={{ background: 'var(--lp-bg-alt)', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <LayoutTemplate size={24} color="var(--lp-text-muted)" />
              </div>
              <h3 className="lp-card-heading">ATS Standardized</h3>
              <p className="lp-card-body">Clean, minimal templates mathematically verified to parse correctly in Applicant Tracking Systems.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="container lp-section-capabilities">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p className="lp-section-eyebrow">Capabilities</p>
          <h2 className="lp-section-title">Everything you need. Nothing you don't.</h2>
        </motion.div>

        <div className="lp-grid-2">
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="lp-capability-icon"><Copy size={22} /></div>
            <h3 className="lp-card-heading">Multiple Versions</h3>
            <p className="lp-card-body">Maintain specific versions for different roles without duplicating your entire history.</p>
          </motion.div>
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.05 }}>
            <div className="lp-capability-icon"><Eye size={22} /></div>
            <h3 className="lp-card-heading">Real-time Preview</h3>
            <p className="lp-card-body">Instant rendering as you type. No loading screens or refresh cycles.</p>
          </motion.div>
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }}>
            <div className="lp-capability-icon"><FileJson size={22} /></div>
            <h3 className="lp-card-heading">JSON Export</h3>
            <p className="lp-card-body">Own your data. Export your resume as a standardized JSON structure.</p>
          </motion.div>
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.15 }}>
            <div className="lp-capability-icon"><Github size={22} /></div>
            <h3 className="lp-card-heading">Open Source</h3>
            <p className="lp-card-body">Transparency you can trust. Code is available for review on GitHub.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-section-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lp-cta-card"
          >
            <h2 className="lp-cta-title">
              Your best resume yet.
            </h2>
            <p className="lp-cta-subtitle">
              Join professionals who have accelerated their careers with cleaner, structured data that recruiters love.
            </p>
            <div className="lp-cta-actions">
              <Link to="/register" className="btn-lp-primary">
                Create Your Free Account
              </Link>
              <div className="lp-cta-trust">
                <span className="lp-cta-trust-item"><CheckCircle size={14} /> Free forever</span>
                <span className="lp-cta-trust-item"><CheckCircle size={14} /> No credit card</span>
                <span className="lp-cta-trust-item"><CheckCircle size={14} /> 30 second setup</span>
              </div>
              <p className="lp-cta-login">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Home;
