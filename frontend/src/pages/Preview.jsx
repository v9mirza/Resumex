import React from 'react';
import { useResume } from '../state/useResume.jsx';
import LivePreview from '../components/preview/LivePreview';
import { Link, useLocation } from 'react-router-dom';
import LandingNav from '../components/LandingNav';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
  const location = useLocation();

  const empty = isEmptyResume(resume);
  const templateId = resume.meta?.template || 'minimal';
  const templateLabel =
    templateId === 'classic' ? 'Classic' : templateId === 'modern' ? 'Modern' : 'Minimal';

  const resumeName = resume.basics?.name || resume.title || 'Untitled resume';
  const fromId = location.state?.fromId;
  const backToEditorPath = fromId ? `/build/${fromId}` : '/build';

  const handleDownloadJson = () => {
    try {
      const json = JSON.stringify(resume, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeName = (resume.basics?.name || 'resume').trim() || 'resume';
      link.href = url;
      link.download = `${safeName.replace(/\s+/g, '_').toLowerCase()}_data.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export JSON', err);
      toast.error('Could not export JSON');
    }
  };

  const handleDownload = async () => {
    const element = document.querySelector('.print-container');
    const resumePage = element?.querySelector('.resume-page');
    if (!element) return;

    const toastId = toast.loading('Generating PDF...');
    try {
      /* On mobile we scale the preview with CSS transform; remove it so we capture 1:1 for a clean PDF */
      const prevTransform = element.style.transform;
      const prevTransformOrigin = element.style.transformOrigin;
      element.style.transform = 'none';
      element.style.transformOrigin = '';

      await new Promise((r) => requestAnimationFrame(r));

      const target = resumePage || element;
      const fullHeightPx = Math.max(target.scrollHeight, target.offsetHeight, 1122);
      const prevHeight = target.style.height;
      const prevMinHeight = target.style.minHeight;
      const prevOverflow = target.style.overflow;
      const prevElementHeight = element.style.height;
      const prevElementOverflow = element.style.overflow;

      target.style.height = `${fullHeightPx}px`;
      target.style.minHeight = `${fullHeightPx}px`;
      target.style.overflow = 'visible';
      element.style.height = `${fullHeightPx}px`;
      element.style.overflow = 'visible';

      await new Promise((r) => requestAnimationFrame(r));
      const measuredHeight = Math.max(target.scrollHeight, target.offsetHeight, fullHeightPx);
      if (measuredHeight > fullHeightPx) {
        target.style.height = `${measuredHeight}px`;
        target.style.minHeight = `${measuredHeight}px`;
        element.style.height = `${measuredHeight}px`;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0
      });

      target.style.height = prevHeight;
      target.style.minHeight = prevMinHeight;
      target.style.overflow = prevOverflow;
      element.style.height = prevElementHeight;
      element.style.overflow = prevElementOverflow;
      element.style.transform = prevTransform;
      element.style.transformOrigin = prevTransformOrigin;

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgW = canvas.width;
      const imgH = canvas.height;
      const pxPerMm = 96 / 25.4;
      const imgWidthMm = imgW / pxPerMm;
      const imgHeightMm = imgH / pxPerMm;

      const scale = Math.min(pageWidth / imgWidthMm, pageHeight / imgHeightMm, 1);
      const w = imgWidthMm * scale;
      const h = imgHeightMm * scale;
      const x = (pageWidth - w) / 2;
      const y = (pageHeight - h) / 2;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', x, y, w, h);
      pdf.save(`${resume.basics?.name || 'Resume'}.pdf`);

      toast.success('PDF Downloaded!', { id: toastId });
    } catch (err) {
      console.error('PDF export failed', err);
      toast.error('Could not generate PDF', { id: toastId });
    }
  };

  if (empty) {
    return (
      <div className="landing-page">
        <LandingNav
          rightContent={
            <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
          }
        />
        <div className="preview-container preview-empty">
          <div className="lp-minimal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--lp-text)', marginBottom: '12px' }}>
              No resume to preview
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginBottom: '24px' }}>
              Create a new resume or open one from your dashboard to preview and export.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                to={backToEditorPath}
                state={{ fromPreview: true, fromId }}
                className="btn-lp-primary"
                style={{ padding: '12px 24px' }}
              >
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
        <div className="preview-toolbar no-print">
          <Link
            to={backToEditorPath}
            state={{ fromPreview: true, fromId }}
            className="preview-toolbar-back"
            style={{ textDecoration: 'none', color: 'var(--lp-text-muted)', fontWeight: 500 }}
          >
            ← Back to editor
          </Link>
          <div className="preview-toolbar-right">
            <div className="preview-toolbar-meta">
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--lp-text)' }}>{resumeName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{templateLabel} template</div>
            </div>
            <div className="preview-toolbar-actions">
              <button
                type="button"
                onClick={handleDownloadJson}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  borderRadius: '999px',
                  border: '1px solid var(--lp-border)',
                  background: 'var(--lp-bg-alt)',
                  color: 'var(--lp-text)'
                }}
                aria-label="Download this resume as JSON data"
              >
                Download JSON
              </button>
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
