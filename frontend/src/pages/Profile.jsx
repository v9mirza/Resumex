import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await api.updateProfile({
                email,
                password: password || undefined
            });
            toast.success("Profile Updated Successfully");
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("ARE YOU SURE? This will permanently delete your account and ALL your resumes. This cannot be undone.")) {
            try {
                await api.deleteAccount();
                logout();
                navigate('/login');
                toast.success("Account Deleted");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete account");
            }
        }
    };

    return (
        <div className="app-layout" style={{ flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
            <header style={{
                height: '70px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                backgroundColor: 'var(--bg-app)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.25rem', color: '#f4f4f5' }}>Resumex</span>
                    </Link>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dashboard</Link>
                    <button onClick={logout} className="btn" style={{ color: 'var(--text-muted)', border: 'none', background: 'transparent' }}>Logout</button>
                </div>
            </header>

            <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h2 className="text-h2" style={{ marginBottom: '32px' }}>My Profile</h2>

                <div className="card" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 className="text-h3" style={{ marginBottom: '4px' }}>{user?.email}</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                                fontSize: '0.8rem',
                                padding: '4px 12px',
                                borderRadius: '100px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'var(--text-muted)'
                            }}>
                                {user?.role === 'admin' ? 'Administrator' : 'Free Plan'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="btn"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-color)',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Sign Out
                    </button>
                </div>

                <div className="card" style={{ marginBottom: '32px' }}>
                    <h3 className="text-h3" style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Security</h3>
                    <form onSubmit={handleUpdateProfile}>
                        <div style={{ marginBottom: '24px' }}>
                            <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Email Address</label>
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                disabled
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-muted)',
                                    cursor: 'not-allowed',
                                    width: '100%'
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                To change your email, please contact support.
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>Change Password</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min 6 characters"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                className="btn"
                                disabled={loading}
                                style={{
                                    backgroundColor: 'var(--accent-color)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: loading ? 'wait' : 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                {loading ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <h3 className="text-h3" style={{ color: '#ef4444', marginBottom: '8px' }}>Danger Zone</h3>
                    <p className="text-body" style={{ marginBottom: '24px', fontSize: '0.9rem' }}>
                        Permanently delete your account and all associated data.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
