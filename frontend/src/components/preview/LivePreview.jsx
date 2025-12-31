import React from 'react';
import Minimal from '../../templates/Minimal';
import Classic from '../../templates/Classic';
import Modern from '../../templates/Modern';

const LivePreview = ({ resume }) => {
    // Use resume.meta.template to decide
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
            {renderTemplate()}
        </div>
    );
};

export default LivePreview;
