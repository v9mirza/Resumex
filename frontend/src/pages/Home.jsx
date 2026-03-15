import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, FileJson, CheckCircle, LayoutTemplate, Star, Copy, Eye, Github } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';
import Minimal from '../templates/Minimal';
import { SAMPLE_RESUME } from '../data/sampleResume';

// Trimmed resume for hero preview: name, headline, one role, one education, skills
const HERO_PREVIEW_RESUME = {
  ...SAMPLE_RESUME,
  experience: SAMPLE_RESUME.experience?.slice(0, 1) ?? [],
  education: SAMPLE_RESUME.education?.slice(0, 1) ?? [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: []
};

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
      <Seo
        title="Resumex — Build ATS-friendly resumes in minutes"
        description="Resumex is an online resume builder for students, developers, and job‑seekers. Create ATS‑friendly resumes with guided steps, live preview, and PDF/JSON export."
        canonicalPath="/"
      />
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
            <h1 className="lp-hero-title">
              Build <span className="text-gradient-blue">ATS-friendly resumes</span> in minutes.
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              For students, developers, and job-seekers. Guided builder, live preview, and instant PDF export—without wrestling with Word templates.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/dashboard" className="btn-lp-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                Create your resume
              </Link>
              <a href="#features" className="btn-lp-secondary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
                See how it works
              </a>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} /> Autosave & dashboard history
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FileJson size={14} /> PDF & JSON export
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <LayoutTemplate size={14} /> Live template switching
              </span>
              <a
                href="https://github.com/v9mirza/resumex"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--lp-accent)', fontWeight: 500 }}
              >
                <Github size={14} /> Open‑source on GitHub
              </a>
            </div>
          </motion.div>

          {/* Right Side: Real resume preview */}
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
              <div
                className="mock-ui-container"
                style={{
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: 'rotateY(-4deg) rotateX(2deg)',
                  boxShadow: '20px 30px 60px rgba(0,0,0,0.12)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff'
                }}
              >
                <div className="mock-ui-header" style={{ flexShrink: 0 }}>
                  <div className="mock-ui-dot" style={{ background: '#ff5f56' }}></div>
                  <div className="mock-ui-dot" style={{ background: '#ffbd2e' }}></div>
                  <div className="mock-ui-dot" style={{ background: '#27c93f' }}></div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#fff' }}>
                  <div style={{ padding: '16px 20px', transform: 'scale(0.72)', transformOrigin: 'top left', width: '139%', minHeight: '100%' }}>
                    <Minimal resume={HERO_PREVIEW_RESUME} />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: 'linear-gradient(to top, rgba(255,255,255,0.95), transparent)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By (Social Proof) */}
      {/* How it works strip */}
      <section id="how-it-works" className="lp-section-trusted">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
              padding: '18px 20px',
              borderRadius: 999,
              border: '1px solid var(--lp-border)',
              background: 'var(--lp-bg-alt)',
              alignItems: 'center'
            }}
          >
            {[
              { step: '1', title: 'Create your account', text: 'Sign up free—no credit card required.' },
              { step: '2', title: 'Fill the guided builder', text: 'Basics, education, experience, projects, skills, and more.' },
              { step: '3', title: 'Preview & export', text: 'Switch templates, download PDF, or export JSON.' },
              { step: '4', title: 'Manage versions', text: 'Use the dashboard to duplicate and tweak for each role.' }
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: 'var(--lp-accent)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--lp-text)' }}>{item.title}</div>
                  <div style={{ color: 'var(--lp-text-muted)' }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / use cases */}
      <section className="lp-section-trusted">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="lp-trusted-eyebrow">
            Helping people at different stages of their career
          </p>
          <div className="lp-trusted-logos">
            {[
              'Students landing internships faster',
              'Bootcamp grads shipping their first portfolio resume',
              'Junior devs keeping versions for each job description',
              'Experienced hires standardizing years of experience'
            ].map((label) => (
              <span key={label} className="lp-trusted-logo-item">{label}</span>
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
            <h2 className="lp-section-title">Designed for real‑world applications.</h2>
            <p className="lp-section-subtitle">
              Your experience should be the only thing that stands out—not a noisy template. Resumex gives you a guided builder,
              autosave, live preview, and structured data so updating your resume becomes a calm, repeatable workflow.
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
              <h3 className="lp-card-heading" style={{ fontSize: '1.5rem' }}>Guided builder with autosave</h3>
              <p className="lp-card-body" style={{ fontSize: '1.05rem' }}>
                Move step‑by‑step through basics, education, experience, projects, skills, certifications, and more. Quick‑start presets
                for students, junior devs, and experienced hires help you get started fast, while autosave and the dashboard keep every version safely stored.
              </p>

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
              <h3 className="lp-card-heading">PDF & JSON export</h3>
              <p className="lp-card-body">
                Download polished PDFs directly from the preview screen, or export your complete resume data as clean JSON for backups,
                integrations, or future tools. Your career history is never locked into a single format.
              </p>
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
              <h3 className="lp-card-heading">ATS‑friendly templates</h3>
              <p className="lp-card-body">
                Switch instantly between Minimal, Classic, and Modern templates while keeping the same structured data underneath.
                Each layout is optimized for scanners and for humans reading on screen or as a PDF.
              </p>
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
            <h3 className="lp-card-heading">Multiple versions</h3>
            <p className="lp-card-body">Keep tailored versions for internships, junior roles, and senior positions without losing your core history.</p>
          </motion.div>
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.05 }}>
            <div className="lp-capability-icon"><Eye size={22} /></div>
            <h3 className="lp-card-heading">Real‑time preview</h3>
            <p className="lp-card-body">See exactly what recruiters will see as you type, with live template switching built into the editor.</p>
          </motion.div>
          <motion.div className="lp-minimal-card lp-capability-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }}>
            <div className="lp-capability-icon"><FileJson size={22} /></div>
            <h3 className="lp-card-heading">JSON export</h3>
            <p className="lp-card-body">Export your resume data as clean JSON—perfect for backups, integrations, or feeding into other tools.</p>
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

      {/* FAQ */}
      <section className="lp-section-faq">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            <p className="lp-section-eyebrow"></p>
            <h2 className="lp-section-title">FAQs</h2>
          </motion.div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {[
              {
                q: 'Is Resumex free?',
                a: 'Yes. You can create an account, build multiple resumes, and export PDFs and JSON without entering a credit card.'
              },
              {
                q: 'Can I export my resume as PDF and JSON?',
                a: 'From the preview screen you can download a ready‑to‑send PDF or export your full resume data as JSON at any time.'
              },
              {
                q: 'Are the templates ATS‑friendly?',
                a: 'The Minimal, Classic, and Modern templates use clean structure and typography so Applicant Tracking Systems can parse your content reliably.'
              },
              {
                q: 'What happens to my data?',
                a: 'Your resumes are stored securely in your account and can be deleted at any time from your profile. The project is open‑source for full transparency.'
              },
              {
                q: 'Can I create multiple versions of my resume?',
                a: 'Yes. Use the dashboard to keep separate versions for different roles or companies, and duplicate any resume to iterate quickly.'
              },
              {
                q: 'Does Resumex write or change my content?',
                a: 'No. Resumex focuses on structure, clarity, and exports—you stay in full control of the words on your resume.'
              }
            ].map((item) => (
              <details
                key={item.q}
                style={{
                  padding: '10px 0',
                  marginBottom: 4,
                  borderBottom: '1px solid var(--lp-border)',
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--lp-text)'
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--lp-text-muted)', marginLeft: 12 }}>+</span>
                </summary>
                <p className="lp-card-body" style={{ fontSize: '0.88rem', color: 'var(--lp-text-muted)', marginTop: 6 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Home;
