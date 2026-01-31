import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const { logout, user } = useAuth();
    const [loading, setLoading] = useState(true);

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
        <div className="app-layout" style={{ flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                height: '70px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                backgroundColor: 'var(--bg-app)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.5rem', color: 'var(--text-main)' }}>Resumex</span>
                    </Link>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span className="text-body">{user?.email}</span>
                    <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginLeft: '16px' }}>Profile</Link>
                    <button onClick={logout} className="btn" style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
                </div>
            </header>

            <div className="main-content" style={{ padding: '48px', alignItems: 'flex-start', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 className="text-h1">My Resumes</h1>
                    <Link to="/build" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: '12px 24px', borderRadius: '6px' }}>
                        + Create New Resume
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    {loading ? (
                        <p className="text-body">Loading...</p>
                    ) : resumes.length === 0 ? (
                        <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '64px' }}>
                            <p className="text-h3">No resumes yet</p>
                            <p className="text-body" style={{ marginBottom: '24px' }}>Create your first professional resume now.</p>
                            <Link to="/build" className="btn" style={{ color: 'var(--accent-color)' }}>Start Building &rarr;</Link>
                        </div>
                    ) : (
                        resumes.map(resume => (
                            <div key={resume._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
                                <div>
                                    <h3 className="text-h3" style={{ marginBottom: '8px' }}>{resume.title}</h3>
                                    <p className="text-sm">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                </div>
                                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                                    <Link to={`/build/${resume._id}`} className="btn btn-primary" style={{ flex: 1, textAlign: 'center', backgroundColor: 'var(--bg-input)', color: 'var(--text-main)' }}>
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(resume._id)} className="btn" style={{ color: '#ef4444', background: 'transparent', border: 'none', padding: '0 12px', cursor: 'pointer' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
