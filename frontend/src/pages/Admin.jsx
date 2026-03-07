import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LandingNav from '../components/LandingNav';

const Admin = () => {
    const [stats, setStats] = useState({ userCount: 0, resumeCount: 0, newUsersToday: 0 });
    const [users, setUsers] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.getAdminStats();
                const usersRes = await api.getAdminUsers();
                const resumesRes = await api.getAdminResumes();
                setStats(statsRes.data);
                setUsers(usersRes.data);
                setResumes(resumesRes.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('PERMANENTLY deleting this user and all their data. Are you sure?')) return;

        try {
            await api.deleteUser(id);
            setUsers(prev => prev.filter(u => u._id !== id));
            // Remove resumes belonging to this user from the view immediately
            setResumes(prev => prev.filter(r => r.user?._id !== id));
            toast.success('User deleted');
        } catch {
            toast.error('Failed to delete user');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div style={{ color: 'var(--lp-text)', padding: '40px' }}>Loading Admin Panel...</div>;

    return (
        <div className="landing-page">
            <LandingNav
                rightContent={
                    <>
                        <span style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Admin
                        </span>
                        <Link to="/dashboard" style={{ color: 'var(--lp-text)', textDecoration: 'none', fontWeight: 500 }}>Go to app</Link>
                        <button
                            onClick={handleLogout}
                            className="btn"
                            style={{ color: 'var(--lp-text-muted)', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
                        >
                            Logout
                        </button>
                    </>
                }
            />

            <main className="container" style={{ padding: '72px 0 96px' }}>
                {/* Admin header */}
                <section style={{ marginBottom: '40px' }}>
                    <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--lp-accent)', marginBottom: '8px' }}>
                        Admin dashboard
                    </p>
                    <h1 style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: 'var(--lp-text)' }}>
                        Workspace overview
                    </h1>
                    <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginTop: '8px', maxWidth: '540px' }}>
                        See usage at a glance, manage accounts, and review resumes in one place.
                    </p>
                </section>

                {/* Stats Grid */}
                <section
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px',
                        marginBottom: '40px',
                    }}
                >
                    <div className="lp-minimal-card" style={{ padding: '24px 20px' }}>
                        <h3 className="lp-card-heading" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lp-text-muted)' }}>
                            Total users
                        </h3>
                        <p style={{ fontSize: '2.1rem', fontWeight: 700, margin: '10px 0 0', color: 'var(--lp-text)' }}>{stats.userCount}</p>
                    </div>
                    <div className="lp-minimal-card" style={{ padding: '24px 20px' }}>
                        <h3 className="lp-card-heading" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lp-text-muted)' }}>
                            Total resumes
                        </h3>
                        <p style={{ fontSize: '2.1rem', fontWeight: 700, margin: '10px 0 0', color: 'var(--lp-text)' }}>{stats.resumeCount}</p>
                    </div>
                    <div className="lp-minimal-card" style={{ padding: '24px 20px' }}>
                        <h3 className="lp-card-heading" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lp-text-muted)' }}>
                            New users today
                        </h3>
                        <p style={{ fontSize: '2.1rem', fontWeight: 700, margin: '10px 0 0', color: '#10b981' }}>{stats.newUsersToday}</p>
                    </div>
                </section>

                {/* Users Table */}
                <section style={{ width: '100%', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', gap: '12px' }}>
                        <h2 className="lp-card-heading" style={{ fontSize: '1.3rem' }}>User management</h2>
                        <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{users.length} accounts</span>
                    </div>
                    <div className="lp-minimal-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--lp-text)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg-alt)' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>User email</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Role</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Joined</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid var(--lp-border)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{u.email}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span
                                                style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: u.role === 'admin' ? '#fef3c7' : '#e5e7eb',
                                                    color: u.role === 'admin' ? '#92400e' : '#4b5563',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDeleteUser(u._id)}
                                                disabled={u.role === 'admin'}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #fee2e2',
                                                    color: '#b91c1c',
                                                    padding: '6px 12px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    cursor: u.role === 'admin' ? 'not-allowed' : 'pointer',
                                                    opacity: u.role === 'admin' ? 0.4 : 1,
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Resumes Table */}
                <section style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', gap: '12px' }}>
                        <h2 className="lp-card-heading" style={{ fontSize: '1.3rem' }}>Resume inspector</h2>
                        <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{resumes.length} resumes</span>
                    </div>
                    <div className="lp-minimal-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--lp-text)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg-alt)' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Created by (email)</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Title</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Last updated</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumes.map(r => (
                                    <tr key={r._id} style={{ borderBottom: '1px solid var(--lp-border)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{r.user ? r.user.email : 'Unknown'}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{r.title || 'Untitled'}</td>
                                        <td style={{ padding: '12px 16px', color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>
                                            {new Date(r.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                            <Link
                                                to={`/build/${r._id}`}
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'var(--lp-accent)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                View / Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {resumes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: 'var(--lp-text-muted)', fontSize: '0.9rem' }}>
                                            No resumes found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Admin;
