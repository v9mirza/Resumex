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

  /* A4 at 96dpi so capture size is consistent on all devices (avoids mobile viewport squashing) */
  const A4_WIDTH_PX = Math.round((210 * 96) / 25.4);
  const A4_MIN_HEIGHT_PX = Math.round((297 * 96) / 25.4);

  const handleDownload = async () => {
    const element = document.querySelector('.print-container');
    const resumePage = element?.querySelector('.resume-page');
    if (!element) return;

    const toastId = toast.loading('Generating PDF...');
    try {
      const container = element.parentElement;
      const prevContainerMinWidth = container?.style.minWidth;
      const prevContainerOverflow = container?.style.overflow;
      if (container) {
        container.style.setProperty('min-width', `${A4_WIDTH_PX + 48}px`, 'important');
        container.style.setProperty('overflow', 'visible', 'important');
      }

      /* On mobile: remove scale and force full A4 pixel size; override any !important in CSS */
      element.style.setProperty('transform', 'none', 'important');
      element.style.setProperty('transform-origin', 'top center', 'important');
      element.style.setProperty('width', `${A4_WIDTH_PX}px`, 'important');
      element.style.setProperty('min-height', `${A4_MIN_HEIGHT_PX}px`, 'important');
      element.style.setProperty('max-width', `${A4_WIDTH_PX}px`, 'important');
      if (resumePage) {
        resumePage.style.setProperty('width', `${A4_WIDTH_PX}px`, 'important');
        resumePage.style.setProperty('max-width', `${A4_WIDTH_PX}px`, 'important');
      }

      await new Promise((r) => requestAnimationFrame(r));

      const target = resumePage || element;
      const fullHeightPx = Math.max(target.scrollHeight, target.offsetHeight, A4_MIN_HEIGHT_PX);

      target.style.setProperty('height', `${fullHeightPx}px`, 'important');
      target.style.setProperty('min-height', `${fullHeightPx}px`, 'important');
      target.style.setProperty('overflow', 'visible', 'important');
      element.style.setProperty('height', `${fullHeightPx}px`, 'important');
      element.style.setProperty('overflow', 'visible', 'important');

      await new Promise((r) => requestAnimationFrame(r));
      const measuredHeight = Math.max(target.scrollHeight, target.offsetHeight, fullHeightPx);
      const finalHeightPx = measuredHeight > fullHeightPx ? measuredHeight : fullHeightPx;
      if (measuredHeight > fullHeightPx) {
        target.style.setProperty('height', `${measuredHeight}px`, 'important');
        target.style.setProperty('min-height', `${measuredHeight}px`, 'important');
        element.style.setProperty('height', `${measuredHeight}px`, 'important');
      }

      /* Simulate desktop viewport and force clone layout so mobile captures full A4 width */
      const captureWidth = A4_WIDTH_PX;
      const captureHeight = finalHeightPx;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: captureWidth + 100,
        windowHeight: Math.max(captureHeight + 200, 1200),
        onclone: (_doc, clonedEl) => {
          clonedEl.style.setProperty('width', `${captureWidth}px`, 'important');
          clonedEl.style.setProperty('min-height', `${captureHeight}px`, 'important');
          clonedEl.style.setProperty('max-width', `${captureWidth}px`, 'important');
          clonedEl.style.setProperty('transform', 'none', 'important');
          const clonePage = _doc.querySelector('.resume-page');
          if (clonePage) {
            clonePage.style.setProperty('width', `${captureWidth}px`, 'important');
            clonePage.style.setProperty('max-width', `${captureWidth}px`, 'important');
          }
          const root = _doc.documentElement;
          root.style.setProperty('width', `${captureWidth + 100}px`, 'important');
          _doc.body.style.setProperty('min-width', `${captureWidth + 100}px`, 'important');
        }
      });

      target.style.removeProperty('height');
      target.style.removeProperty('min-height');
      target.style.removeProperty('overflow');
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transform');
      element.style.removeProperty('transform-origin');
      element.style.removeProperty('width');
      element.style.removeProperty('min-height');
      element.style.removeProperty('max-width');
      if (resumePage) {
        resumePage.style.removeProperty('width');
        resumePage.style.removeProperty('max-width');
      }
      if (container) {
        container.style.minWidth = prevContainerMinWidth ?? '';
        container.style.overflow = prevContainerOverflow ?? '';
      }

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgW = canvas.width;
      const imgH = canvas.height;
      const pxPerMm = 96 / 25.4;
      const imgWidthMm = imgW / (2 * pxPerMm);
      const imgHeightMm = imgH / (2 * pxPerMm);

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
