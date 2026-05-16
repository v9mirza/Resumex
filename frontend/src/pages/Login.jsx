import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('session_expired') === '1') {
            toast.error('Session expired. Please sign in again.');
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login({ email, password });
        setLoading(false);
        if (result.success) {
            if (result.user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="landing-page">
            <Seo
                title="Log in to Resumex"
                description="Sign in to your Resumex account to manage and export your ATS‑friendly resumes."
                canonicalPath="/login"
            />
            <LandingNav
                rightContent={
                    <>
                        <span className="lp-nav-text">New here?</span>
                        <Link to="/register" className="btn-lp-primary lp-nav-cta">
                            Sign up
                        </Link>
                    </>
                }
            />

            <main className="container auth-page-main">
                <div className="lp-minimal-card auth-card">
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px', color: 'var(--lp-text)', textAlign: 'center' }}>
                        Welcome back
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginBottom: '24px', textAlign: 'center' }}>
                        Sign in to access your dashboard and resumes.
                    </p>

                    {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--lp-text)' }}>Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--lp-text)' }}>Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-lp-primary"
                            style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            disabled={loading}
                        >
                            {loading && (
                                <span style={{
                                    width: '16px', height: '16px', border: '2px solid currentColor',
                                    borderTopColor: 'transparent', borderRadius: '50%',
                                    display: 'inline-block', animation: 'spin 0.7s linear infinite', flexShrink: 0
                                }} />
                            )}
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: 'var(--lp-accent)', fontWeight: 500 }}>
                                Sign up
                            </Link>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
