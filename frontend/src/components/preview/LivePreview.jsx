import React, { Suspense, lazy } from 'react';

const Minimal = lazy(() => import('../../templates/Minimal'));
const Classic = lazy(() => import('../../templates/Classic'));
const Modern = lazy(() => import('../../templates/Modern'));

const isEmptyResume = (resume) => {
    const name = (resume.basics?.name || '').trim();
    const hasSections =
        (resume.experience && resume.experience.length > 0) ||
        (resume.education && resume.education.length > 0) ||
        (resume.skills && resume.skills.length > 0) ||
        (resume.projects && resume.projects.length > 0);
    return !name && !hasSections;
};

const LivePreview = ({ resume }) => {
    const templateId = resume.meta?.template || 'minimal';
    const empty = isEmptyResume(resume);

    const renderTemplate = () => {
        switch (templateId) {
            case 'classic': return <Classic resume={resume} />;
            case 'modern': return <Modern resume={resume} />;
            case 'minimal':
            default: return <Minimal resume={resume} />;
        }
    };

    if (empty) {
        return (
            <div
                id="resume-preview"
                className="resume-page"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}
            >
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', maxWidth: '240px' }}>
                    Your name and sections will appear here as you fill the form.
                </p>
            </div>
        );
    }

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
