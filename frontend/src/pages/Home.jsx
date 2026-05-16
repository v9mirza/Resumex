import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, FileJson, CheckCircle, LayoutTemplate, Github, ChevronDown, ArrowRight, ShieldCheck, UserPlus, PenLine, Eye, Copy } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';
import Minimal from '../templates/Minimal';
import Classic from '../templates/Classic';
import Modern from '../templates/Modern';
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
      <Link to="/register" className="lp-nav-signup" style={{
        padding: '10px 20px',
        backgroundColor: 'var(--lp-accent)',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: 8,
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

const FAQ_ITEMS = [
  { q: 'Is Resumex free?', a: 'Yes. You can create an account, build multiple resumes, and export PDFs and JSON without entering a credit card.' },
  { q: 'Can I export my resume as PDF and JSON?', a: 'From the preview screen you can download a ready‑to‑send PDF or export your full resume data as JSON at any time.' },
  { q: 'Are the templates ATS‑friendly?', a: 'The Minimal, Classic, and Modern templates use clean structure and typography so Applicant Tracking Systems can parse your content reliably.' },
  { q: 'What happens to my data?', a: 'Your resumes are stored securely in your account and can be deleted at any time from your profile. The project is open‑source for full transparency.' },
  { q: 'Can I create multiple versions of my resume?', a: 'Yes. Use the dashboard to keep separate versions for different roles or companies, and duplicate any resume to iterate quickly.' },
  { q: 'Does Resumex write or change my content?', a: 'No. Resumex focuses on structure, clarity, and exports—you stay in full control of the words on your resume.' },
];

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="lp-section-faq">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 className="lp-section-title">Frequently asked questions</h2>
        </motion.div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={item.q}
                style={{ borderBottom: '1px solid var(--lp-border)' }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 0', gap: 12, textAlign: 'left'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--lp-text)' }}>{item.q}</span>
                  <ChevronDown
                    size={18}
                    color="var(--lp-text-muted)"
                    style={{ flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', lineHeight: 1.65, paddingBottom: 18, margin: 0 }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GALLERY_RESUME = {
  ...SAMPLE_RESUME,
  experience: SAMPLE_RESUME.experience?.slice(0, 2) ?? [],
  education: SAMPLE_RESUME.education?.slice(0, 1) ?? [],
  projects: SAMPLE_RESUME.projects?.slice(0, 1) ?? [],
  certifications: [],
  languages: [],
  achievements: [],
};

const TEMPLATES = [
  { id: 'minimal', label: 'Minimal', Component: Minimal },
  { id: 'classic', label: 'Classic', Component: Classic },
  { id: 'modern',  label: 'Modern',  Component: Modern  },
];

const TemplateGallery = () => {
  const [active, setActive] = useState('minimal');
  const { Component } = TEMPLATES.find(t => t.id === active);

  return (
    <section className="lp-section-templates">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p className="lp-section-eyebrow">Templates</p>
          <h2 className="lp-section-title">Pick a style. Keep your data.</h2>
          <p className="lp-section-subtitle" style={{ maxWidth: 480, margin: '12px auto 0' }}>
            Switch between templates instantly — your content stays exactly the same.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="lp-template-tabs">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`lp-template-tab${active === t.id ? ' lp-template-tab--active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Preview window */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lp-template-preview-window"
        >
          {/* Browser chrome */}
          <div className="mock-ui-header" style={{ flexShrink: 0, borderRadius: '14px 14px 0 0' }}>
            <div className="mock-ui-dot" style={{ background: '#ff5f56' }} />
            <div className="mock-ui-dot" style={{ background: '#ffbd2e' }} />
            <div className="mock-ui-dot" style={{ background: '#27c93f' }} />
            <span className="lp-template-preview-label">{TEMPLATES.find(t => t.id === active)?.label} template</span>
          </div>
          {/* Scaled resume */}
          <div className="lp-template-preview-body">
            <div className="lp-template-preview-scaler">
              <Component resume={GALLERY_RESUME} />
            </div>
            <div className="lp-template-preview-fade" />
          </div>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/register" className="btn-lp-primary">
            Try all templates free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
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
      <section className="container lp-section-hero lp-hero-section" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Blue orb — top left */}
        <div className="hero-orb hero-orb--blue" />
        {/* Purple orb — bottom right */}
        <div className="hero-orb hero-orb--purple" />

        <div className="hero-split-layout">
          {/* Left Side: Text and CTA */}
          <motion.div
            className="hero-text-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge pill */}
            <div className="hero-badge">
              <CheckCircle size={13} />
              Free forever · Open‑source · No credit card
            </div>

            <h1 className="lp-hero-title">
              Build a resume<br />
              that gets you <span className="text-gradient-blue">hired.</span>
            </h1>

            <p className="lp-hero-subtitle">
              Guided steps, live preview, and instant PDF export — no Word templates, no blank pages.
            </p>

            <div className="lp-hero-actions">
              <Link to="/dashboard" className="btn-lp-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                Build my resume <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="btn-lp-secondary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
                See how it works
              </a>
            </div>

            <div className="lp-hero-trust">
              <span><CheckCircle size={13} /> Autosave</span>
              <span><FileJson size={13} /> PDF & JSON</span>
              <span><LayoutTemplate size={13} /> 3 templates</span>
              <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">
                <Github size={13} /> GitHub
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

      {/* How it works */}
      <section id="how-it-works" className="lp-section-how">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p className="lp-section-eyebrow" style={{ color: 'var(--lp-accent)' }}>How it works</p>
            <h2 className="lp-section-title">From blank page to PDF in four steps.</h2>
          </motion.div>

          <div className="lp-how-cards">
            {[
              { icon: <UserPlus size={22} />, step: '01', title: 'Create your account', text: 'Sign up free — no credit card, no trial. Just a working email.', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
              { icon: <PenLine size={22} />, step: '02', title: 'Fill the guided builder', text: 'Work through basics, experience, education, skills, and projects — one section at a time.', color: '#0082c9', bg: 'rgba(0,130,201,0.1)' },
              { icon: <Eye size={22} />,     step: '03', title: 'Preview & export', text: 'Switch templates live and download a polished PDF or clean JSON the moment you\'re ready.', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { icon: <Copy size={22} />,    step: '04', title: 'Manage versions', text: 'Duplicate any resume and tailor it per role. Your dashboard keeps every version safe.', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="lp-how-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="lp-how-card-top">
                  <div className="lp-how-card-icon" style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="lp-how-card-step">{item.step}</span>
                </div>
                <h3 className="lp-how-card-title">{item.title}</h3>
                <p className="lp-how-card-text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="lp-stats-bar">
        <div className="container">
          <div className="lp-stats-grid">
            {[
              { value: '3', label: 'Resume templates' },
              { value: '100%', label: 'Free forever' },
              { value: 'PDF + JSON', label: 'Export formats' },
              { value: 'Open‑source', label: 'On GitHub' },
            ].map((stat, i) => (
              <div key={i} className="lp-stat-item">
                <span className="lp-stat-value">{stat.value}</span>
                <span className="lp-stat-label">{stat.label}</span>
              </div>
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
            <p className="lp-section-eyebrow">Features</p>
            <h2 className="lp-section-title">Everything you need to land the interview.</h2>
            <p className="lp-section-subtitle">
              A calm, repeatable workflow — guided steps, live preview, and autosave so your resume is always one click away from ready.
            </p>
          </motion.div>

          <div className="lp-bento-grid">
            {/* Bento Large — Guided Builder */}
            <motion.div
              className="lp-minimal-card bento-large lp-bento-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="lp-bento-icon lp-bento-icon--blue">
                <Cloud size={26} />
              </div>
              <h3 className="lp-card-heading lp-bento-heading">Guided builder with autosave</h3>
              <p className="lp-card-body">
                Move step‑by‑step through every section of your resume. Nothing gets skipped, nothing gets lost — every change saves itself.
              </p>

              {/* Mini builder steps visual */}
              <div className="lp-builder-steps">
                {['Basics', 'Experience', 'Education', 'Skills', 'Projects'].map((step, i) => (
                  <span key={step} className="lp-builder-step-pill">
                    <span className="lp-builder-step-num">{i + 1}</span>
                    {step}
                  </span>
                ))}
              </div>

              {/* Saved badge */}
              <div className="lp-autosave-badge">
                <CheckCircle size={16} color="#10b981" />
                <span>Changes saved automatically</span>
              </div>
            </motion.div>

            {/* Bento Small — PDF & JSON export */}
            <motion.div
              className="lp-minimal-card lp-bento-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="lp-bento-icon lp-bento-icon--green">
                <FileJson size={22} />
              </div>
              <h3 className="lp-card-heading lp-bento-heading">PDF & JSON export</h3>
              <p className="lp-card-body">
                Download a polished PDF or export clean JSON — your career data is never locked to one format.
              </p>

              {/* Decorative export pills */}
              <div className="lp-export-pills">
                <div className="lp-export-pill lp-export-pill--pdf">
                  <ShieldCheck size={13} /> Download PDF
                </div>
                <div className="lp-export-pill lp-export-pill--json">
                  <FileJson size={13} /> Export JSON
                </div>
              </div>
            </motion.div>

            {/* Bento Small — ATS Templates */}
            <motion.div
              className="lp-minimal-card lp-bento-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="lp-bento-icon lp-bento-icon--purple">
                <LayoutTemplate size={22} />
              </div>
              <h3 className="lp-card-heading lp-bento-heading">ATS‑friendly templates</h3>
              <p className="lp-card-body">
                Switch between Minimal, Classic, and Modern instantly — same data, different look, always scanner-ready.
              </p>

              {/* Template name pills */}
              <div className="lp-template-name-pills">
                {['Minimal', 'Classic', 'Modern'].map(name => (
                  <span key={name} className="lp-template-name-pill">{name}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <TemplateGallery />

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
              Your resume, ready in<br />10 minutes.
            </h2>
            <p className="lp-cta-subtitle">
              Guided steps, live preview, instant PDF. Free forever — no credit card needed.
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
      <FaqSection />

      <LandingFooter />
    </div>
  );
};

export default Home;
