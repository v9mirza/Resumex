import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LandingNav from '../components/LandingNav';

const PER_PAGE = 10;

const TableSkeleton = ({ rows = 6, cols = 5 }) => (
    <div className="lp-minimal-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg-alt)' }}>
                    {Array.from({ length: cols }).map((_, i) => (
                        <th key={i} style={{ padding: '12px 16px', textAlign: 'left' }}>
                            <div style={{ height: 14, width: i === cols - 1 ? 60 : 80 + (i * 20), borderRadius: 4, background: 'var(--lp-border)', opacity: 0.6 }} />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rows }).map((_, rowIdx) => (
                    <tr key={rowIdx} style={{ borderBottom: '1px solid var(--lp-border)' }}>
                        {Array.from({ length: cols }).map((_, colIdx) => (
                            <td key={colIdx} style={{ padding: '12px 16px' }}>
                                <div
                                    style={{
                                        height: 16,
                                        width: colIdx === 0 ? 140 : colIdx === cols - 1 ? 70 : 60 + (colIdx * 15),
                                        borderRadius: 4,
                                        background: 'var(--lp-border)',
                                        opacity: 0.4,
                                        animation: 'admin-skeleton-pulse 1.2s ease-in-out infinite'
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Admin = () => {
    const [stats, setStats] = useState({ userCount: 0, resumeCount: 0, newUsersToday: 0 });
    const [users, setUsers] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [resumeSearch, setResumeSearch] = useState('');
    const [templateFilter, setTemplateFilter] = useState('all');
    const [userSort, setUserSort] = useState({ key: 'createdAt', dir: 'desc' });
    const [resumeSort, setResumeSort] = useState({ key: 'updatedAt', dir: 'desc' });
    const [userPage, setUserPage] = useState(1);
    const [resumePage, setResumePage] = useState(1);
    const [deletingResumeId, setDeletingResumeId] = useState(null);
    const [updatingRoleId, setUpdatingRoleId] = useState(null);
    const { user: currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const fetchData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const [statsRes, usersRes, resumesRes] = await Promise.all([
                api.getAdminStats(),
                api.getAdminUsers(),
                api.getAdminResumes()
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setResumes(resumesRes.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = (id) => {
        const target = users.find(u => u._id === id);
        if (id === currentUser?._id) {
            toast.error('You cannot delete your own account');
            return;
        }
        toast.dismiss();
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--lp-text)' }}>
                    Permanently delete {target?.email || 'this user'}?
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                    This will remove their account and all associated resumes. This action cannot be undone.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button
                        type="button"
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: '4px 10px',
                            fontSize: '0.8rem',
                            borderRadius: 999,
                            border: '1px solid var(--lp-border)',
                            background: 'transparent',
                            color: 'var(--lp-text-muted)',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.deleteUser(id);
                                setUsers(prev => prev.filter(u => u._id !== id));
                                setResumes(prev => prev.filter(r => (r.user?._id || r.user) !== id));
                                toast.success('User deleted');
                            } catch (e) {
                                const msg = e.response?.data?.message || e.message || 'Failed to delete user';
                                toast.error(msg);
                            }
                        }}
                        style={{
                            padding: '4px 12px',
                            fontSize: '0.8rem',
                            borderRadius: 999,
                            border: 'none',
                            background: '#ef4444',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                        autoFocus
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { duration: 7000, position: 'top-center' });
    };

    const getResumeTemplate = (r) => (r.data?.meta?.template || r.meta?.template || 'minimal').toLowerCase();
    const resumeCountByUserId = resumes.reduce((acc, r) => {
        const uid = r.user?._id || r.user;
        if (uid) acc[uid] = (acc[uid] || 0) + 1;
        return acc;
    }, {});

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredUsers = users.filter(u => {
        const email = (u.email || '').toLowerCase();
        const q = userSearch.toLowerCase().trim();
        if (q && !email.includes(q)) return false;
        if (roleFilter === 'all') return true;
        return u.role === roleFilter;
    });

    const filteredResumes = resumes.filter(r => {
        const title = (r.title || '').toLowerCase();
        const email = (r.user?.email || '').toLowerCase();
        const q = resumeSearch.toLowerCase().trim();
        if (q && !title.includes(q) && !email.includes(q)) return false;
        if (templateFilter !== 'all' && getResumeTemplate(r) !== templateFilter) return false;
        return true;
    });

    const sortedUsers = useMemo(() => {
        const list = [...filteredUsers];
        const { key, dir } = userSort;
        list.sort((a, b) => {
            let va = key === 'email' ? (a.email || '').toLowerCase() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
            let vb = key === 'email' ? (b.email || '').toLowerCase() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
            if (key === 'resumes') {
                va = resumeCountByUserId[a._id] ?? 0;
                vb = resumeCountByUserId[b._id] ?? 0;
            }
            if (va < vb) return dir === 'asc' ? -1 : 1;
            if (va > vb) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return list;
    }, [filteredUsers, userSort, resumeCountByUserId]);

    const sortedResumes = useMemo(() => {
        const list = [...filteredResumes];
        const { key, dir } = resumeSort;
        list.sort((a, b) => {
            let va, vb;
            if (key === 'title') {
                va = (a.title || '').toLowerCase();
                vb = (b.title || '').toLowerCase();
            } else if (key === 'email') {
                va = (a.user?.email || '').toLowerCase();
                vb = (b.user?.email || '').toLowerCase();
            } else if (key === 'template') {
                va = getResumeTemplate(a);
                vb = getResumeTemplate(b);
            } else {
                va = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                vb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            }
            if (va < vb) return dir === 'asc' ? -1 : 1;
            if (va > vb) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return list;
    }, [filteredResumes, resumeSort]);

    const userPageCount = Math.max(1, Math.ceil(sortedUsers.length / PER_PAGE));
    const resumePageCount = Math.max(1, Math.ceil(sortedResumes.length / PER_PAGE));
    const paginatedUsers = sortedUsers.slice((userPage - 1) * PER_PAGE, userPage * PER_PAGE);
    const paginatedResumes = sortedResumes.slice((resumePage - 1) * PER_PAGE, resumePage * PER_PAGE);

    useEffect(() => {
        setUserPage(p => (p > userPageCount ? userPageCount : p));
    }, [userPageCount]);
    useEffect(() => {
        setResumePage(p => (p > resumePageCount ? resumePageCount : p));
    }, [resumePageCount]);

    const toggleUserSort = (key) => {
        setUserPage(1);
        setUserSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
    };
    const toggleResumeSort = (key) => {
        setResumePage(1);
        setResumeSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
    };

    const escapeCsv = (s) => {
        const str = String(s ?? '');
        if (/[,"\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
        return str;
    };
    const exportUsersCsv = () => {
        const headers = ['Email', 'Role', 'Resumes', 'Joined'];
        const rows = sortedUsers.map(u => [
            u.email,
            u.role,
            resumeCountByUserId[u._id] ?? 0,
            u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : ''
        ]);
        const csv = [headers.join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `resumex-users-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
        toast.success('Users exported');
    };
    const exportResumesCsv = () => {
        const headers = ['Title', 'Owner email', 'Template', 'Last updated'];
        const rows = sortedResumes.map(r => [
            r.title || 'Untitled',
            r.user?.email || '',
            getResumeTemplate(r),
            r.updatedAt ? new Date(r.updatedAt).toISOString().slice(0, 10) : ''
        ]);
        const csv = [headers.join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `resumex-resumes-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
        toast.success('Resumes exported');
    };

    const handleRoleChange = async (userId, newRole) => {
        if (userId === currentUser?._id && newRole !== 'admin') {
            toast.error('You cannot demote yourself');
            return;
        }
        setUpdatingRoleId(userId);
        try {
            const { data } = await api.updateUserRole(userId, newRole);
            setUsers(prev => prev.map(u => (u._id === data._id ? data : u)));
            toast.success(`Role set to ${newRole}`);
        } catch (e) {
            const msg = e.response?.data?.message || e.message || 'Failed to update role';
            toast.error(msg);
        } finally {
            setUpdatingRoleId(null);
        }
    };

    if (loading) {
        return (
            <div className="landing-page">
                <style>{`@keyframes admin-skeleton-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }`}</style>
                <LandingNav rightContent={null} />
                <main className="container" style={{ padding: '72px 0 96px' }}>
                    <section style={{ marginBottom: 24 }}>
                        <div style={{ height: 28, width: 200, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.5, marginBottom: 8 }} />
                        <div style={{ height: 36, width: 320, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.3, marginBottom: 8 }} />
                    </section>
                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="lp-minimal-card" style={{ padding: '24px 20px' }}>
                                <div style={{ height: 12, width: 100, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.5, marginBottom: 12 }} />
                                <div style={{ height: 32, width: 60, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.3 }} />
                            </div>
                        ))}
                    </section>
                    <section style={{ marginBottom: 24 }}>
                        <div style={{ height: 24, width: 180, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.5, marginBottom: 12 }} />
                        <TableSkeleton rows={6} cols={5} />
                    </section>
                    <section>
                        <div style={{ height: 24, width: 160, borderRadius: 4, background: 'var(--lp-border)', opacity: 0.5, marginBottom: 12 }} />
                        <TableSkeleton rows={6} cols={5} />
                    </section>
                </main>
            </div>
        );
    }

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
                <section style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--lp-accent)', marginBottom: '8px' }}>
                            Admin dashboard
                        </p>
                        <h1 style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: 'var(--lp-text)' }}>
                            Workspace overview
                        </h1>
                        <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginTop: '8px', maxWidth: '540px' }}>
                            See usage at a glance, manage accounts, and review resumes in one place.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => fetchData(true)}
                        disabled={refreshing}
                        style={{
                            padding: '8px 16px',
                            fontSize: '0.85rem',
                            borderRadius: 999,
                            border: '1px solid var(--lp-border)',
                            background: 'var(--lp-bg-alt)',
                            color: 'var(--lp-text)',
                            cursor: refreshing ? 'wait' : 'pointer',
                            opacity: refreshing ? 0.7 : 1,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {refreshing ? 'Refreshing…' : 'Refresh data'}
                    </button>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                        <div>
                            <h2 className="lp-card-heading" style={{ fontSize: '1.3rem', marginBottom: 4 }}>User management</h2>
                            <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{users.length} accounts total</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={exportUsersCsv}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '0.8rem',
                                    borderRadius: 999,
                                    border: '1px solid var(--lp-border)',
                                    background: 'var(--lp-bg-alt)',
                                    color: 'var(--lp-text)',
                                    cursor: 'pointer'
                                }}
                            >
                                Export CSV
                            </button>
                            <input
                                type="text"
                                placeholder="Search by email…"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: 999,
                                    border: '1px solid var(--lp-border)',
                                    fontSize: '0.85rem',
                                    minWidth: 180
                                }}
                            />
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'user', label: 'Users' },
                                { id: 'admin', label: 'Admins' }
                            ].map(f => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setRoleFilter(f.id)}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '0.8rem',
                                        borderRadius: 999,
                                        border: roleFilter === f.id ? '1px solid var(--lp-accent)' : '1px solid var(--lp-border)',
                                        background: roleFilter === f.id ? 'rgba(0,130,201,0.06)' : 'transparent',
                                        color: roleFilter === f.id ? 'var(--lp-accent)' : 'var(--lp-text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="lp-minimal-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--lp-text)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg-alt)' }}>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleUserSort('email')}
                                    >
                                        User email {userSort.key === 'email' && (userSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Role</th>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleUserSort('resumes')}
                                    >
                                        Resumes {userSort.key === 'resumes' && (userSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleUserSort('createdAt')}
                                    >
                                        Joined {userSort.key === 'createdAt' && (userSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUsers.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid var(--lp-border)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{u.email}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            {u._id === currentUser?._id ? (
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
                                                    {u.role.toUpperCase()} (you)
                                                </span>
                                            ) : (
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                    disabled={updatingRoleId === u._id}
                                                    style={{
                                                        padding: '4px 8px',
                                                        fontSize: '0.75rem',
                                                        borderRadius: 999,
                                                        border: '1px solid var(--lp-border)',
                                                        background: 'var(--lp-bg)',
                                                        color: 'var(--lp-text)',
                                                        cursor: updatingRoleId === u._id ? 'wait' : 'pointer',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>
                                            {resumeCountByUserId[u._id] ?? 0}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteUser(u._id)}
                                                disabled={u.role === 'admin' || u._id === currentUser?._id}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #fee2e2',
                                                    color: '#b91c1c',
                                                    padding: '6px 12px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    cursor: u.role === 'admin' || u._id === currentUser?._id ? 'not-allowed' : 'pointer',
                                                    opacity: u.role === 'admin' || u._id === currentUser?._id ? 0.4 : 1,
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>
                                            No users match the current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {userPageCount > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--lp-border)', flexWrap: 'wrap', gap: 8 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                                    Page {userPage} of {userPageCount} ({sortedUsers.length} users)
                                </span>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    <button
                                        type="button"
                                        onClick={() => setUserPage(p => Math.max(1, p - 1))}
                                        disabled={userPage <= 1}
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--lp-border)', background: 'var(--lp-bg-alt)', color: 'var(--lp-text)', cursor: userPage <= 1 ? 'not-allowed' : 'pointer', opacity: userPage <= 1 ? 0.5 : 1 }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUserPage(p => Math.min(userPageCount, p + 1))}
                                        disabled={userPage >= userPageCount}
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--lp-border)', background: 'var(--lp-bg-alt)', color: 'var(--lp-text)', cursor: userPage >= userPageCount ? 'not-allowed' : 'pointer', opacity: userPage >= userPageCount ? 0.5 : 1 }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Resumes Table */}
                <section style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                        <div>
                            <h2 className="lp-card-heading" style={{ fontSize: '1.3rem', marginBottom: 4 }}>Resume inspector</h2>
                            <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>{resumes.length} resumes total</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={exportResumesCsv}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '0.8rem',
                                    borderRadius: 999,
                                    border: '1px solid var(--lp-border)',
                                    background: 'var(--lp-bg-alt)',
                                    color: 'var(--lp-text)',
                                    cursor: 'pointer'
                                }}
                            >
                                Export CSV
                            </button>
                            <input
                                type="text"
                                placeholder="Search by title or email…"
                                value={resumeSearch}
                                onChange={(e) => setResumeSearch(e.target.value)}
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: 999,
                                    border: '1px solid var(--lp-border)',
                                    fontSize: '0.85rem',
                                    minWidth: 220
                                }}
                            />
                            {[
                                { id: 'all', label: 'All templates' },
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
                    <div className="lp-minimal-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--lp-text)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--lp-border)', backgroundColor: 'var(--lp-bg-alt)' }}>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleResumeSort('email')}
                                    >
                                        Created by (email) {resumeSort.key === 'email' && (resumeSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleResumeSort('title')}
                                    >
                                        Title {resumeSort.key === 'title' && (resumeSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleResumeSort('template')}
                                    >
                                        Template {resumeSort.key === 'template' && (resumeSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleResumeSort('updatedAt')}
                                    >
                                        Last updated {resumeSort.key === 'updatedAt' && (resumeSort.dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--lp-text-muted)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedResumes.map(r => (
                                    <tr key={r._id} style={{ borderBottom: '1px solid var(--lp-border)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{r.user ? r.user.email : 'Unknown'}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{r.title || 'Untitled'}</td>
                                        <td style={{ padding: '12px 16px', color: 'var(--lp-text-muted)', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                                            {getResumeTemplate(r)}
                                        </td>
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
                                                    marginRight: 8,
                                                }}
                                            >
                                                View / Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    toast.dismiss();
                                                    toast((t) => (
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
                                                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--lp-text)' }}>
                                                                Delete this resume?
                                                            </p>
                                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                                                                This will remove &quot;{r.title || 'Untitled'}&quot; for {r.user?.email || 'this user'}. This action cannot be undone.
                                                            </p>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toast.dismiss(t.id)}
                                                                    style={{
                                                                        padding: '4px 10px',
                                                                        fontSize: '0.8rem',
                                                                        borderRadius: 999,
                                                                        border: '1px solid var(--lp-border)',
                                                                        background: 'transparent',
                                                                        color: 'var(--lp-text-muted)',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={async () => {
                                                                        toast.dismiss(t.id);
                                                                        setDeletingResumeId(r._id);
                                                                        try {
                                                                            const resumeId = r._id;
                                                                            await api.deleteAdminResume(resumeId);
                                                                            setResumes(prev => prev.filter(x => x._id !== resumeId));
                                                                            toast.success('Resume deleted');
                                                                        } catch (e) {
                                                                            const msg = e.response?.data?.message || e.message || 'Failed to delete resume';
                                                                            toast.error(msg);
                                                                        } finally {
                                                                            setDeletingResumeId(null);
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        padding: '4px 12px',
                                                                        fontSize: '0.8rem',
                                                                        borderRadius: 999,
                                                                        border: 'none',
                                                                        background: '#ef4444',
                                                                        color: '#fff',
                                                                        cursor: 'pointer',
                                                                        fontWeight: 500
                                                                    }}
                                                                    autoFocus
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ), { duration: 7000, position: 'top-center' });
                                                }}
                                                disabled={deletingResumeId === r._id}
                                                style={{
                                                    marginLeft: 8,
                                                    background: 'transparent',
                                                    border: '1px solid #fee2e2',
                                                    color: '#b91c1c',
                                                    padding: '6px 10px',
                                                    borderRadius: 999,
                                                    fontSize: '0.8rem',
                                                    cursor: deletingResumeId === r._id ? 'wait' : 'pointer',
                                                    opacity: deletingResumeId === r._id ? 0.6 : 1
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredResumes.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: 'var(--lp-text-muted)', fontSize: '0.9rem' }}>
                                            No resumes match the current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {resumePageCount > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--lp-border)', flexWrap: 'wrap', gap: 8 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                                    Page {resumePage} of {resumePageCount} ({sortedResumes.length} resumes)
                                </span>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    <button
                                        type="button"
                                        onClick={() => setResumePage(p => Math.max(1, p - 1))}
                                        disabled={resumePage <= 1}
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--lp-border)', background: 'var(--lp-bg-alt)', color: 'var(--lp-text)', cursor: resumePage <= 1 ? 'not-allowed' : 'pointer', opacity: resumePage <= 1 ? 0.5 : 1 }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setResumePage(p => Math.min(resumePageCount, p + 1))}
                                        disabled={resumePage >= resumePageCount}
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 6, border: '1px solid var(--lp-border)', background: 'var(--lp-bg-alt)', color: 'var(--lp-text)', cursor: resumePage >= resumePageCount ? 'not-allowed' : 'pointer', opacity: resumePage >= resumePageCount ? 0.5 : 1 }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Admin;
