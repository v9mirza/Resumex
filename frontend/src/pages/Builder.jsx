import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../state/useResume.jsx';
import Editor from '../components/editor/Editor';
import LivePreview from '../components/preview/LivePreview';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as api from '../services/api';
import toast from 'react-hot-toast';
import LandingNav from '../components/LandingNav';
import { SAMPLE_RESUME } from '../data/sampleResume';

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
    const { resume, updateBasics, setSection, setTemplate, setResume, resetResume } = useResume();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error
    const [lastSavedAt, setLastSavedAt] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const resumeRef = useRef(resume);
    const initializedRef = useRef(false);
    const justResetRef = useRef(false);
    const autoSaveTimeout = useRef(null);

    useEffect(() => {
        if (id) {
            justResetRef.current = false;
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
        } else {
            /* New resume: start blank once when navigating to /build (omit resetResume from deps so we don't reset on every keystroke) */
            justResetRef.current = true;
            resetResume();
        }
    }, [id, setResume]); // eslint-disable-line react-hooks/exhaustive-deps -- resetResume would retrigger on every typing

    // Track dirty state when resume changes
    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;
            resumeRef.current = resume;
            justResetRef.current = false;
            return;
        }
        if (resumeRef.current !== resume) {
            if (justResetRef.current) {
                resumeRef.current = resume;
                justResetRef.current = false;
                return;
            }
            setIsDirty(true);
            setSaveStatus('idle');
            resumeRef.current = resume;
        }
    }, [resume]);

    // Keyboard shortcut: Ctrl/Cmd + Enter -> next step
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                nextStep();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [currentStepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const currentStep = STEPS[currentStepIndex].id;
    const PREVIEW_SCALE = 0.75;

    const countCompletedSections = () => {
        const basics = resume.basics || {};
        let completed = 0;
        if (basics.name || basics.email || basics.phone || basics.location) completed += 1; // Basics
        if (basics.summary && basics.summary.trim().length > 0) completed += 1; // About
        if ((resume.education || []).length > 0) completed += 1;
        if ((resume.experience || []).length > 0) completed += 1;
        if ((resume.projects || []).length > 0) completed += 1;
        if ((resume.skills || []).length > 0) completed += 1;
        if (resume.meta?.template) completed += 1;
        return completed;
    };

    const completedCount = countCompletedSections();
    const totalSections = 7;

    const goToStep = (index) => {
        if (index >= 0 && index < STEPS.length) {
            setErrors({});
            setCurrentStepIndex(index);
        }
    };

    const validateStep = () => {
        const newErrors = {};
        const basics = resume.basics || {};

        if (STEPS[currentStepIndex].id === 'basics') {
            if (!basics.name || !basics.name.trim()) {
                newErrors['basics.name'] = 'Name is required.';
            }
            const email = basics.email || '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors['basics.email'] = 'Enter a valid email address.';
            }
        }

        if (STEPS[currentStepIndex].id === 'experience') {
            const exp = resume.experience || [];
            const yearRegex = /^\d{4}$/;
            exp.forEach((item, idx) => {
                if (item.start && !yearRegex.test(item.start)) {
                    newErrors[`experience.${idx}.start`] = 'Use YYYY format.';
                }
                if (item.end && item.end.toLowerCase() !== 'present' && !yearRegex.test(item.end)) {
                    newErrors[`experience.${idx}.end`] = 'Use YYYY or "Present".';
                }
            });
        }

        setErrors(newErrors);

        const keys = Object.keys(newErrors);
        if (keys.length > 0) {
            const firstKey = keys[0];
            const el = document.querySelector(`[data-error-id="${firstKey}"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (el.focus) el.focus();
            }
            return false;
        }

        return true;
    };

    const nextStep = () => {
        if (!validateStep()) return;

        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            navigate('/preview');
        }
    };

    const handleSave = async () => {
        if (!isDirty || isSaving) return;
        const nameTrim = (resume.basics?.name || '').trim();
        const resumeTitle = nameTrim ? nameTrim + "'s Resume" : 'Untitled resume';
        setIsSaving(true);
        setSaveStatus('saving');
        try {
            // Determine if we are updating (id exists) or creating
            const saveCall = id
                ? api.updateResume(id, { data: resume, title: resumeTitle })
                : api.createResume({ title: resumeTitle, data: resume });

            const { data } = await saveCall;

            // If created new, we might get an ID back.
            if (!id && data._id) {
                navigate(`/build/${data._id}`, { replace: true });
            }
            setIsDirty(false);
            setSaveStatus('saved');
            setLastSavedAt(new Date());

        } catch (error) {
            console.error(error);
            setSaveStatus('error');
            toast.error('Failed to save resume');
        } finally {
            setIsSaving(false);
        }
    };

    // Auto-save shortly after changes
    useEffect(() => {
        if (!isDirty) return;
        if (autoSaveTimeout.current) {
            clearTimeout(autoSaveTimeout.current);
        }
        autoSaveTimeout.current = setTimeout(() => {
            handleSave();
        }, 2000);

        return () => {
            if (autoSaveTimeout.current) {
                clearTimeout(autoSaveTimeout.current);
            }
        };
    }, [resume, isDirty, handleSave]);


    return (
        <div className="landing-page">
            <LandingNav
                rightContent={
                    <>
                        <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
                    </>
                }
            />

            {/* Builder toolbar */}
            <div className="no-print" style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg)', padding: '12px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                    <div>
                        <span style={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--lp-text-muted)'
                        }}>
                            Step {currentStepIndex + 1} of {STEPS.length}
                        </span>
                        <h1 style={{ fontSize: '1.4rem', margin: '4px 0 0', letterSpacing: '-0.02em', color: 'var(--lp-text)' }}>
                            {STEPS[currentStepIndex].label}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            onClick={handleSave}
                                disabled={isSaving || !isDirty}
                            style={{
                                padding: '8px 18px',
                                fontSize: '0.9rem',
                                backgroundColor: 'transparent',
                                    color: isDirty ? 'var(--lp-text)' : 'var(--lp-text-muted)',
                                    border: '1px solid var(--lp-border)',
                                borderRadius: '999px',
                                boxShadow: 'none',
                                    cursor: (isSaving || !isDirty) ? 'default' : 'pointer',
                                    opacity: (isSaving || !isDirty) ? 0.7 : 1
                            }}
                        >
                            {isSaving ? 'Saving…' : 'Save progress'}
                        </button>
                        <Link
                            to="/preview"
                            className="btn-lp-primary"
                            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                        >
                            Preview & export
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Split View */}
            <main className="container builder-main">
                {/* Editor Panel */}
                <section className="builder-editor">
                    <div className="builder-editor-inner">
                        {/* Step pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                            {STEPS.map((s, idx) => {
                                const isActive = idx === currentStepIndex;
                                const isCompleted = idx < currentStepIndex;
                                return (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => goToStep(idx)}
                                        style={{
                                            borderRadius: 999,
                                            padding: '6px 12px',
                                            fontSize: '0.8rem',
                                            border: isActive ? '1px solid var(--lp-accent)' : '1px solid var(--lp-border)',
                                            backgroundColor: isActive ? 'rgba(0,130,201,0.06)' : '#ffffff',
                                            color: isActive ? 'var(--lp-accent)' : 'var(--lp-text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {isCompleted && <span style={{ fontSize: '0.75rem' }}>✓</span>}
                                        <span>{s.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {!id && (
                            <div style={{ marginBottom: 16 }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResume(JSON.parse(JSON.stringify(SAMPLE_RESUME)));
                                        toast.success('Example resume loaded. Edit any field to make it yours.');
                                    }}
                                    style={{
                                        padding: '8px 14px',
                                        fontSize: '0.85rem',
                                        borderRadius: '999px',
                                        border: '1px dashed var(--lp-border)',
                                        background: 'transparent',
                                        color: 'var(--lp-accent)',
                                        cursor: 'pointer',
                                        fontWeight: 500
                                    }}
                                >
                                    Load example data
                                </button>
                            </div>
                        )}

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Editor
                                step={currentStep}
                                resume={resume}
                                updateBasics={updateBasics}
                                setSection={setSection}
                                setTemplate={setTemplate}
                                errors={errors}
                            />
                            <div
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--lp-text-muted)',
                                    marginTop: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 8,
                                    flexWrap: 'wrap'
                                }}
                                role="status"
                                aria-live="polite"
                            >
                                <span>
                                    {saveStatus === 'saving' && 'Saving…'}
                                    {saveStatus === 'saved' && 'All changes saved'}
                                    {saveStatus === 'error' && 'Save failed – try again'}
                                    {saveStatus === 'idle' && !lastSavedAt && 'Not saved yet'}
                                    {saveStatus === 'idle' && lastSavedAt && 'Unsaved changes'}
                                </span>
                                <span>
                                    Profile {completedCount} / {totalSections} sections started
                                </span>
                            </div>
                        </div>

                        {/* Navigation Footer for Form */}
                        <div className="builder-editor-footer">
                            <button
                                onClick={() => goToStep(currentStepIndex - 1)}
                                disabled={currentStepIndex === 0}
                                style={{
                                    visibility: currentStepIndex === 0 ? 'hidden' : 'visible',
                                    background: 'transparent',
                                    border: '1px solid var(--lp-border)',
                                    color: 'var(--lp-text-muted)',
                                    borderRadius: '999px',
                                    padding: '8px 18px',
                                    fontSize: '0.9rem',
                                    cursor: currentStepIndex === 0 ? 'default' : 'pointer'
                                }}
                            >
                                ← Back
                            </button>

                            <button
                                className="btn-lp-primary"
                                onClick={nextStep}
                                style={{ borderRadius: '999px', padding: '10px 24px', fontSize: '0.95rem' }}
                            >
                                {currentStepIndex === STEPS.length - 1 ? 'Finish Review' : 'Next Step'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Live Preview Panel */}
                <aside className="builder-preview">
                    <div className="paper-preview" style={{ transform: `scale(${PREVIEW_SCALE})` }}>
                        <LivePreview resume={resume} />
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Builder;
