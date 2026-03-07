import React, { Suspense, lazy } from 'react';

const Minimal = lazy(() => import('../../templates/Minimal'));
const Classic = lazy(() => import('../../templates/Classic'));
const Modern = lazy(() => import('../../templates/Modern'));

const LivePreview = ({ resume }) => {
    const templateId = resume.meta?.template || 'minimal';

    const renderTemplate = () => {
        switch (templateId) {
            case 'classic': return <Classic resume={resume} />;
            case 'modern': return <Modern resume={resume} />;
            case 'minimal':
            default: return <Minimal resume={resume} />;
        }
    };

    return (
        <div
            id="resume-preview"
            className="resume-page"
        >
            <Suspense fallback={<div className="resume-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.9rem' }}>Loading…</div>}>
                {renderTemplate()}
            </Suspense>
        </div>
    );
};

export default LivePreview;
