import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Trash2, Lock } from 'lucide-react';
import * as api from '../services/api';
import toast from 'react-hot-toast';
import LandingNav from '../components/LandingNav';

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
        <div className="landing-page">
            <LandingNav
                rightContent={
                    <>
                        <Link to="/dashboard" className="lp-nav-text">
                            Dashboard
                        </Link>
                        <button
                            onClick={logout}
                            type="button"
                            className="btn-lp-secondary lp-nav-cta"
                            style={{ padding: '8px 18px', fontSize: '0.9rem' }}
                        >
                            Log out
                        </button>
                    </>
                }
            />

            <main className="container" style={{ padding: '80px 0', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
                <header style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--lp-accent)', marginBottom: '8px' }}>
                        Account
                    </p>
                    <h2 style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: 'var(--lp-text)' }}>
                        Account settings
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginTop: '8px', maxWidth: '520px' }}>
                        Manage your sign-in details, security, and account ownership in one place.
                    </p>
                </header>

                {/* Account overview (lightweight, no big card) */}
                <section
                    style={{
                        marginBottom: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        paddingBottom: '16px',
                        borderBottom: '1px solid var(--lp-border)'
                    }}
                >
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--lp-accent) 0%, #00b4ff 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: '220px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: 'var(--lp-text)' }}>
                            {user?.email}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', marginBottom: '4px' }}>
                            Signed in to Resumex
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <span
                                style={{
                                    fontSize: '0.78rem',
                                    padding: '3px 10px',
                                    borderRadius: '999px',
                                    backgroundColor: 'rgba(15,23,42,0.02)',
                                    color: 'var(--lp-text-muted)',
                                    border: '1px solid var(--lp-border)'
                                }}
                            >
                                {user?.role === 'admin' ? 'Administrator' : 'Free plan'}
                            </span>
                        </div>
                    </div>
                </section>

                <div className="profile-grid">
                    {/* Account & security */}
                    <section className="lp-minimal-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '999px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={16} color="#0369a1" />
                            </div>
                            <h3 className="lp-card-heading" style={{ marginBottom: 0 }}>Account & security</h3>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '20px' }}>
                            Keep your contact email up to date and use a strong, unique password so your data stays private.
                        </p>
                        <form onSubmit={handleUpdateProfile}>
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ marginBottom: '8px', display: 'block', color: 'var(--lp-text)' }}>Email address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '6px' }}>
                                    To change your email, please contact support.
                                </p>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ fontSize: '0.95rem', color: 'var(--lp-text)', marginBottom: '12px', fontWeight: 600 }}>Change password</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginBottom: '12px' }}>
                                    Leave these fields blank if you do not want to change your password.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label className="form-label" style={{ color: 'var(--lp-text)' }}>New password</label>
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
                                        <label className="form-label" style={{ color: 'var(--lp-text)' }}>Confirm password</label>
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
                                    className="btn-lp-primary"
                                    disabled={loading}
                                    style={{
                                        padding: '12px 28px',
                                        cursor: loading ? 'wait' : 'pointer',
                                        fontWeight: 500
                                    }}
                                >
                                    {loading ? 'Saving changes…' : 'Save changes'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Sessions & danger zone */}
                    <section className="lp-minimal-card" style={{ borderColor: 'rgba(239, 68, 68, 0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '999px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Lock size={16} color="#1d4ed8" />
                            </div>
                            <h3 className="lp-card-heading" style={{ marginBottom: 0 }}>Sessions & safety</h3>
                        </div>
                        <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>
                            Control where you’re signed in and permanently remove your data if you ever need to leave.
                        </p>

                        <div style={{ padding: '12px 0 20px', borderBottom: '1px solid var(--lp-border)', marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', color: 'var(--lp-text)' }}>Log out of all devices</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', marginBottom: '12px' }}>
                                Immediately revoke active sessions on other browsers and devices. You’ll be asked to sign in again.
                            </p>
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await api.revokeAllSessions();
                                        logout();
                                        navigate('/login');
                                        toast.success('All sessions revoked. Sign in again on this device.');
                                    } catch (err) {
                                        toast.error(err.response?.data?.message || 'Failed to revoke sessions');
                                    }
                                }}
                                className="btn-lp-secondary"
                                style={{
                                    padding: '8px 18px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Log out everywhere
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '999px', backgroundColor: 'rgba(248, 113, 113, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Trash2 size={16} color="#ef4444" />
                            </div>
                            <h3 className="lp-card-heading" style={{ color: '#ef4444', marginBottom: 0 }}>Danger zone</h3>
                        </div>
                        <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>
                            Deleting your account will remove all resumes and data associated with it. This action cannot be undone.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                color: '#ef4444',
                                border: '1px solid #ef4444',
                                padding: '10px 20px',
                                borderRadius: '999px',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s'
                            }}
                        >
                            Delete my account
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Profile;
