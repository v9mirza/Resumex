import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FileText, PlusCircle } from 'lucide-react';
import LandingNav from '../components/LandingNav';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const { logout, user } = useAuth();
    const [loading, setLoading] = useState(true);

    const getTemplateLabel = (resume) => {
        const templateId = resume.data?.meta?.template || resume.meta?.template || 'minimal';
        switch (templateId) {
            case 'classic':
                return 'Classic';
            case 'modern':
                return 'Modern';
            case 'minimal':
            default:
                return 'Minimal';
        }
    };

    const formatUpdatedAt = (isoDate) => {
        if (!isoDate) return 'Unknown';
        const updated = new Date(isoDate);
        const now = new Date();
        const diffMs = now - updated;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return updated.toLocaleDateString();
    };

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const { data } = await api.getResumes();
                setResumes(data);
            } catch (error) {
                console.error("Failed to fetch resumes", error);
                toast.error("Failed to load resumes");
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const handleDelete = (id) => {
        toast((t) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>Delete Resume?</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>This cannot be undone.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-muted)',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            performDelete(id);
                        }}
                        style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'top-center',
            style: {
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '12px 16px',
                borderRadius: '8px',
            }
        });
    };

    const performDelete = async (id) => {
        const loadingToast = toast.loading('Deleting...');
        try {
            await api.deleteResume(id);
            setResumes(prev => prev.filter(r => r._id !== id));
            toast.success('Resume deleted', { id: loadingToast });
        } catch (error) {
            console.error("Failed to delete resume", error);
            toast.error('Failed to delete', { id: loadingToast });
        }
    };

    return (
        <div className="landing-page">
            <LandingNav
                rightContent={
                    <>
                        <span style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>{user?.email}</span>
                        <Link to="/profile" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Profile</Link>
                        <button
                            onClick={logout}
                            className="btn"
                            style={{ color: 'var(--lp-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                        >
                            Logout
                        </button>
                    </>
                }
            />

            <main className="container" style={{ padding: '72px 0 96px' }}>
                {/* Dashboard header */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--lp-accent)', marginBottom: '6px' }}>
                                Dashboard
                            </p>
                            <h1 style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: 'var(--lp-text)' }}>
                                Your resumes
                            </h1>
                            <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginTop: '6px', maxWidth: '520px' }}>
                                Create, update, and export clean, professional resumes from one place.
                            </p>
                        </div>
                        <Link
                            to="/build"
                            className="btn-lp-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', padding: '12px 24px', whiteSpace: 'nowrap' }}
                        >
                            <PlusCircle size={18} />
                            New resume
                        </Link>
                    </div>
                </section>

                {/* Content / grid */}
                <section
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.8fr)',
                        gap: '24px'
                    }}
                >
                    <div className="lp-minimal-card" style={{ padding: '32px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '999px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FileText size={16} color="#0369a1" />
                                </div>
                                <h2 className="lp-card-heading" style={{ marginBottom: 0 }}>Saved resumes</h2>
                            </div>
                            {!loading && (
                                <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                                    {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'}
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                            {loading ? (
                                <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>Loading your resumes…</p>
                            ) : resumes.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                                    <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--lp-text)' }}>No resumes yet</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '20px' }}>
                                        Start by creating your first resume. You can always duplicate and refine later.
                                    </p>
                                    <div
                                        style={{
                                            background: 'var(--lp-bg-alt)',
                                            border: '1px solid var(--lp-border)',
                                            borderRadius: '12px',
                                            padding: '20px 24px',
                                            marginBottom: '20px',
                                            textAlign: 'left',
                                            maxWidth: '320px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}
                                    >
                                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--lp-text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                            Get started
                                        </p>
                                        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--lp-text)', lineHeight: 1.8 }}>
                                            <li>
                                                <Link to="/build" style={{ color: 'var(--lp-accent)', fontWeight: 500 }}>Create your first resume</Link>
                                            </li>
                                            <li>
                                                <span style={{ color: 'var(--lp-text-muted)' }}>Export to PDF</span> (after saving, open Preview)
                                            </li>
                                        </ol>
                                    </div>
                                    <Link
                                        to="/build"
                                        className="btn-lp-primary"
                                        style={{ padding: '10px 20px', fontSize: '0.95rem' }}
                                    >
                                        Create a resume
                                    </Link>
                                </div>
                            ) : (
                                resumes.map(resume => (
                                    <article
                                        key={resume._id}
                                        className="lp-minimal-card"
                                        style={{
                                            padding: '20px 18px',
                                            boxShadow: 'none',
                                            borderRadius: '16px',
                                            gap: '12px'
                                        }}
                                    >
                                        <div>
                                            <h3 className="lp-card-heading" style={{ marginBottom: '4px' }}>{resume.title}</h3>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                                                {getTemplateLabel(resume)} • Updated {formatUpdatedAt(resume.updatedAt)}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <Link
                                                to={`/build/${resume._id}`}
                                                className="btn-lp-primary"
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    padding: '10px 0',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={async () => {
                                                    const loadingToast = toast.loading('Duplicating…');
                                                    try {
                                                        const { data } = await api.getResume(resume._id);
                                                        const source = data.data || {};
                                                        const baseTitle = resume.title || data.title || 'Untitled resume';
                                                        const { data: created } = await api.createResume({
                                                            title: `${baseTitle} (Copy)`,
                                                            data: source
                                                        });
                                                        setResumes(prev => [created, ...prev]);
                                                        toast.success('Resume duplicated', { id: loadingToast });
                                                    } catch (error) {
                                                        console.error('Failed to duplicate resume', error);
                                                        toast.error('Failed to duplicate resume', { id: loadingToast });
                                                    }
                                                }}
                                                className="btn-lp-secondary"
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '999px',
                                                    border: '1px solid var(--lp-border)',
                                                    background: 'var(--lp-bg-alt)',
                                                    color: 'var(--lp-text)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.15s ease, border-color 0.15s ease'
                                                }}
                                            >
                                                Duplicate
                                            </button>
                                            <button
                                                onClick={() => handleDelete(resume._id)}
                                                className="btn-lp-danger"
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '999px',
                                                    border: '1px solid rgba(239, 68, 68, 0.5)',
                                                    background: 'rgba(239, 68, 68, 0.12)',
                                                    color: '#ef4444',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.15s ease, border-color 0.15s ease'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
