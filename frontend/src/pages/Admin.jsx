import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Admin = () => {
    const [stats, setStats] = useState({ userCount: 0, resumeCount: 0, newUsersToday: 0 });
    const [users, setUsers] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout, user } = useAuth();
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
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div style={{ color: 'var(--text-main)', padding: '40px' }}>Loading Admin Panel...</div>;

    return (
        <div className="app-layout" style={{ flexDirection: 'column' }}>
            <header style={{
                height: '70px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                backgroundColor: '#1a1005', // Slightly darker header for Admin
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.25rem', color: '#f59e0b' }}>Resumex ADMIN</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Go to App</Link>
                    <button onClick={handleLogout} className="btn" style={{ color: 'var(--text-muted)', border: 'none', background: 'transparent' }}>Logout</button>
                </div>
            </header>

            <div className="main-content" style={{ padding: '48px', alignItems: 'flex-start', flexDirection: 'column', gap: '48px', overflowY: 'auto', height: 'calc(100vh - 70px)' }}>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Users</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', margin: '8px 0 0' }}>{stats.userCount}</p>
                    </div>
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Resumes</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', margin: '8px 0 0' }}>{stats.resumeCount}</p>
                    </div>
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>New Today</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981', margin: '8px 0 0' }}>{stats.newUsersToday}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 className="text-h2" style={{ marginBottom: '24px' }}>User Management</h2>
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>User Email</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Role</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Joined</th>
                                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '16px' }}>{u.email}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                backgroundColor: u.role === 'admin' ? '#f59e0b20' : 'rgba(255,255,255,0.05)',
                                                color: u.role === 'admin' ? '#f59e0b' : 'var(--text-muted)'
                                            }}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDeleteUser(u._id)}
                                                disabled={u.role === 'admin'}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #ef4444',
                                                    color: '#ef4444',
                                                    padding: '6px 12px',
                                                    borderRadius: '4px',
                                                    cursor: u.role === 'admin' ? 'not-allowed' : 'pointer',
                                                    opacity: u.role === 'admin' ? 0.3 : 1
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
                </div>

                {/* Resumes Table */}
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 className="text-h2" style={{ marginBottom: '24px' }}>Resume Inspector</h2>
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Created By (Email)</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Job Title</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Last Updated</th>
                                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumes.map(r => (
                                    <tr key={r._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '16px' }}>{r.user ? r.user.email : 'Unknown'}</td>
                                        <td style={{ padding: '16px' }}>{r.title || 'Untitled'}</td>
                                        <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{new Date(r.updatedAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <Link
                                                to={`/build/${r._id}`}
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'var(--accent-color)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 500
                                                }}
                                            >
                                                View / Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {resumes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            No resumes found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
