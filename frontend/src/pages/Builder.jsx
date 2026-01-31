import React, { useState, useEffect } from 'react';
import { useResume } from '../state/useResume.jsx';
import Editor from '../components/editor/Editor';
import LivePreview from '../components/preview/LivePreview';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as api from '../services/api';
import toast from 'react-hot-toast';

const STEPS = [
    { id: 'basics', label: 'Basics' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'template', label: 'Template' }
];

const Builder = () => {
    const { resume, updateBasics, updateSection, setTemplate, setResume } = useResume();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const loadResume = async () => {
                try {
                    const { data } = await api.getResume(id);
                    if (data && data.data) {
                        setResume(data.data);
                    }
                } catch (e) {
                    console.error("Failed to load", e);
                    toast.error("Failed to load resume");
                }
            };
            loadResume();
        }
    }, [id]);

    const currentStep = STEPS[currentStepIndex].id;

    const goToStep = (index) => {
        setCurrentStepIndex(index);
    };

    const nextStep = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            navigate('/preview');
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Determine if we are updating (id exists) or creating
            const saveCall = id
                ? api.updateResume(id, { data: resume, title: resume.basics.name + "'s Resume" })
                : api.createResume({ title: resume.basics.name + "'s Resume", data: resume });

            const { data } = await toast.promise(saveCall, {
                loading: 'Saving...',
                success: 'Resume saved to cloud!',
                error: 'Failed to save resume'
            });

            // If created new, we might get an ID back.
            if (!id && data._id) {
                navigate(`/build/${data._id}`, { replace: true });
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div className="app-layout" style={{ flexDirection: 'column' }}>
            {/* Header (Minimal) */}
            <header style={{
                height: '70px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                backgroundColor: 'var(--bg-app)',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.5rem', color: 'var(--text-main)' }}>Resumex</span>
                    </Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '16px' }}>
                        Dashboard
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={handleSave}
                        className="btn"
                        disabled={isSaving}
                        style={{
                            padding: '8px 20px',
                            fontSize: '0.9rem',
                            backgroundColor: 'transparent',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer'
                        }}
                    >
                        {isSaving ? 'Saving...' : 'Save Progress'}
                    </button>
                    <Link to="/preview" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', backgroundColor: 'var(--accent-color)', color: 'white' }}>
                        Preview & Export
                    </Link>
                </div>
            </header>

            {/* Main Content Area - Split View */}
            <div className="main-content">
                {/* Editor Panel */}
                <div className="editor-panel">
                    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 32px 120px' }}>

                        <div style={{ marginBottom: '40px' }}>
                            <span style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: 'var(--text-dim)'
                            }}>
                                Step {currentStepIndex + 1} of {STEPS.length}
                            </span>
                            <h1 className="text-h1" style={{ margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '2.5rem' }}>
                                {STEPS[currentStepIndex].label}
                            </h1>
                        </div>

                        <Editor
                            step={currentStep}
                            resume={resume}
                            updateBasics={updateBasics}
                            updateSection={updateSection}
                            setTemplate={setTemplate}
                        />

                        {/* Navigation Footer for Form */}
                        <div style={{
                            marginTop: '64px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '32px',
                            borderTop: '1px solid var(--border-color)'
                        }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => goToStep(currentStepIndex - 1)}
                                disabled={currentStepIndex === 0}
                                style={{
                                    visibility: currentStepIndex === 0 ? 'hidden' : 'visible',
                                    background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                ← Back
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={nextStep}
                                style={{ backgroundColor: 'var(--accent-color)', color: 'white', border: 'none' }}
                            >
                                {currentStepIndex === STEPS.length - 1 ? 'Finish Review' : 'Next Step'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Preview Panel - Darker Contrast */}
                <div className="preview-panel">
                    <div className="paper-preview">
                        <LivePreview resume={resume} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
