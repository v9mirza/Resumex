import React from 'react';
import { useResume } from '../state/useResume';
import LivePreview from '../components/preview/LivePreview';
import { Link } from 'react-router-dom';

const Preview = () => {
  const { resume } = useResume();

  const handlePrint = () => {
    window.print();
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
          <button className="btn btn-primary" onClick={handlePrint}>
            Download PDF / Print
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
