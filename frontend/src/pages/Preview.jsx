import React from 'react';
import { useResume } from '../state/useResume.jsx';
import LivePreview from '../components/preview/LivePreview';
import { Link } from 'react-router-dom';

import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

const Preview = () => {
  const { resume } = useResume();

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

  return (
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
        <Link to="/build" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>
          ← Back to Editor
        </Link>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary" onClick={handleDownload}>
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
  );
};

export default Preview;
