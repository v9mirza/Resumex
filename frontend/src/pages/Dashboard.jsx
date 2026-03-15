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
    const [duplicatingId, setDuplicatingId] = useState(null);
    const [exportingId, setExportingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [templateFilter, setTemplateFilter] = useState('all'); // all | minimal | classic | modern

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

    const handleExportJson = (resume) => {
        try {
            setExportingId(resume._id);
            const payload = resume.data || {};
            const json = JSON.stringify(payload, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const baseTitle = (resume.title || 'resume').trim() || 'resume';
            const safeName = baseTitle.replace(/\s+/g, '_').toLowerCase();
            const link = document.createElement('a');
            link.href = url;
            link.download = `${safeName}_data.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to export JSON', err);
            toast.error('Could not export JSON');
        } finally {
            setExportingId(null);
        }
    };

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const { data } = await api.getResumes();
                const sorted = [...data].sort((a, b) => {
                    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                    return bTime - aTime; // newest first
                });
                setResumes(sorted);
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
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>Permanently delete this resume?</p>
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
                        autoFocus
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

    const filteredResumes = resumes.filter(resume => {
        const title = (resume.title || '').toLowerCase();
        const q = searchTerm.toLowerCase().trim();
        if (q && !title.includes(q)) return false;
        if (templateFilter === 'all') return true;
        const templateId = resume.data?.meta?.template || resume.meta?.template || 'minimal';
        return templateId === templateFilter;
    });

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

            <main className="container dashboard-page-main">
                {/* Dashboard header */}
                <section className="dashboard-header">
                    <div className="dashboard-header-top">
                        <div>
                            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--lp-accent)', marginBottom: '6px' }}>
                                Dashboard
                            </p>
                            <h1 style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: 'var(--lp-text)' }}>
                                Your resumes
                            </h1>
                            <p className="dashboard-subtitle" style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginTop: '6px', maxWidth: '520px' }}>
                                Resumes auto‑save as you edit. You can safely close the tab and continue later from here.
                            </p>
                        </div>
                        <Link
                            to="/build"
                            className="btn-lp-primary dashboard-new-resume"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', padding: '12px 24px', whiteSpace: 'nowrap' }}
                        >
                            <PlusCircle size={18} />
                            New resume
                        </Link>
                    </div>

                    <div className="dashboard-toolbar">
                        <input
                            type="text"
                            placeholder="Search by title…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="dashboard-search-input"
                            style={{
                                flex: '1 1 220px',
                                minWidth: 0,
                                padding: '8px 10px',
                                borderRadius: 999,
                                border: '1px solid var(--lp-border)',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'minimal', label: 'Minimal' },
                                { id: 'classic', label: 'Classic' },
                                { id: 'modern', label: 'Modern' }
                            ].map(f => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setTemplateFilter(f.id)}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '0.8rem',
                                        borderRadius: 999,
                                        border: templateFilter === f.id ? '1px solid var(--lp-accent)' : '1px solid var(--lp-border)',
                                        background: templateFilter === f.id ? 'rgba(0,130,201,0.06)' : 'transparent',
                                        color: templateFilter === f.id ? 'var(--lp-accent)' : 'var(--lp-text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content / grid */}
                <section className="dashboard-content">
                    <div className="lp-minimal-card dashboard-card-inner" style={{ padding: '32px 28px' }}>
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

                        <div className="dashboard-resume-grid">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="lp-minimal-card"
                                        style={{
                                            padding: '20px 18px',
                                            borderRadius: '16px',
                                            background: 'var(--lp-bg-alt)',
                                            border: '1px solid var(--lp-border)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10,
                                            opacity: 0.7
                                        }}
                                    >
                                        <div style={{ height: 12, width: '60%', borderRadius: 999, background: 'rgba(148,163,184,0.4)' }} />
                                        <div style={{ height: 10, width: '40%', borderRadius: 999, background: 'rgba(148,163,184,0.3)' }} />
                                        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                                            <div style={{ height: 28, flex: 1, borderRadius: 999, background: 'rgba(148,163,184,0.3)' }} />
                                            <div style={{ height: 28, width: 60, borderRadius: 999, background: 'rgba(148,163,184,0.25)' }} />
                                        </div>
                                    </div>
                                ))
                            ) : filteredResumes.length === 0 ? (
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
                                filteredResumes.map(resume => (
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
                                            <h3 className="lp-card-heading" style={{ marginBottom: '4px', fontSize: '1rem' }}>{resume.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--lp-text-muted)' }}>
                                                <span
                                                    style={{
                                                        padding: '2px 8px',
                                                        borderRadius: 999,
                                                        border: '1px solid var(--lp-border)',
                                                        fontSize: '0.7rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.08em'
                                                    }}
                                                >
                                                    {getTemplateLabel(resume)}
                                                </span>
                                                <span>Updated {formatUpdatedAt(resume.updatedAt)}</span>
                                            </div>
                                        </div>
                                        <div className="dashboard-card-actions">
                                            <div className="dashboard-card-actions-primary">
                                                <Link
                                                    to={`/build/${resume._id}`}
                                                    className="dashboard-card-btn dashboard-card-btn-edit"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    to="/preview"
                                                    state={{ fromId: resume._id }}
                                                    className="dashboard-card-btn dashboard-card-btn-preview"
                                                >
                                                    Preview / export
                                                </Link>
                                            </div>
                                            <div className="dashboard-card-actions-secondary">
                                                <button
                                                    type="button"
                                                    onClick={() => handleExportJson(resume)}
                                                    disabled={exportingId === resume._id}
                                                    className="dashboard-card-btn dashboard-card-btn-json"
                                                    aria-label="Download as JSON"
                                                >
                                                    {exportingId === resume._id ? 'Preparing…' : 'JSON'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        setDuplicatingId(resume._id);
                                                        try {
                                                            const { data } = await api.getResume(resume._id);
                                                            const source = data.data || {};
                                                            const baseTitle = resume.title || data.title || 'Untitled resume';
                                                            const { data: created } = await api.createResume({
                                                                title: `${baseTitle} (Copy)`,
                                                                data: source
                                                            });
                                                            setResumes(prev => [created, ...prev]);
                                                            toast.success('Resume duplicated');
                                                        } catch (error) {
                                                            console.error('Failed to duplicate resume', error);
                                                            toast.error('Failed to duplicate resume');
                                                        } finally {
                                                            setDuplicatingId(null);
                                                        }
                                                    }}
                                                    disabled={duplicatingId === resume._id}
                                                    className="dashboard-card-btn dashboard-card-btn-duplicate"
                                                    aria-label="Duplicate this resume"
                                                >
                                                    {duplicatingId === resume._id ? 'Duplicating…' : 'Duplicate'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(resume._id)}
                                                    className="dashboard-card-btn dashboard-card-btn-delete"
                                                    aria-label="Delete this resume"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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
