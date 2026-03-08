import React from 'react';
import { useResume } from '../state/useResume.jsx';
import LivePreview from '../components/preview/LivePreview';
import { Link } from 'react-router-dom';
import LandingNav from '../components/LandingNav';

import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

const isEmptyResume = (resume) => {
  const name = (resume.basics?.name || '').trim();
  const hasSections =
    (resume.experience && resume.experience.length > 0) ||
    (resume.education && resume.education.length > 0) ||
    (resume.skills && resume.skills.length > 0) ||
    (resume.projects && resume.projects.length > 0);
  return !name && !hasSections;
};

const Preview = () => {
  const { resume } = useResume();

  const empty = isEmptyResume(resume);
  const templateId = resume.meta?.template || 'minimal';
  const templateLabel =
    templateId === 'classic' ? 'Classic' : templateId === 'modern' ? 'Modern' : 'Minimal';

  const resumeName = resume.basics?.name || resume.title || 'Untitled resume';

  const handleDownload = async () => {
    const element = document.querySelector('.print-container');
    const opt = {
      margin: 0,
      filename: `${resume.basics.name || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const promise = html2pdf().set(opt).from(element).save();

    await toast.promise(promise, {
      loading: 'Generating PDF...',
      success: 'PDF Downloaded!',
      error: 'Could not generate PDF'
    });
  };

  if (empty) {
    return (
      <div className="landing-page">
        <LandingNav
          rightContent={
            <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
          }
        />
        <div className="preview-container" style={{ justifyContent: 'center', alignItems: 'center', padding: '48px 24px' }}>
          <div className="lp-minimal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--lp-text)', marginBottom: '12px' }}>
              No resume to preview
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginBottom: '24px' }}>
              Create a new resume or open one from your dashboard to preview and export.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/build" className="btn-lp-primary" style={{ padding: '12px 24px' }}>
                Create a resume
              </Link>
              <Link
                to="/dashboard"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  color: 'var(--lp-accent)',
                  fontWeight: 500
                }}
              >
                Open from dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <LandingNav
        rightContent={
          <>
            <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
          </>
        }
      />

      <div className="preview-container">

        {/* Toolbar - Hidden on Print */}
        <div
          className="no-print"
          style={{
            marginBottom: '32px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            width: '210mm',
            justifyContent: 'space-between'
          }}
        >
          <Link to="/build" style={{ textDecoration: 'none', color: 'var(--lp-text-muted)', fontWeight: 500 }}>
            ← Back to editor
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--lp-text)' }}>{resumeName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{templateLabel} template</div>
            </div>
            <button
              type="button"
              className="btn-lp-primary"
              onClick={handleDownload}
              style={{ padding: '8px 18px', fontSize: '0.9rem' }}
              aria-label="Download this resume as a PDF"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Resume Container */}
        <div className="print-container paper-preview">
          <LivePreview resume={resume} />
        </div>

        {/* Styles for Hide on Print handled globally in index.css now */}
      </div>
    </div>
  );
};

export default Preview;
