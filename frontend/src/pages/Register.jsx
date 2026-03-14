import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [acceptedLegal, setAcceptedLegal] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!acceptedLegal) {
            setError("You must agree to the Terms of Service and Privacy Policy to continue.");
            return;
        }

        const result = await register({ email, password });
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="landing-page">
            <Seo
                title="Create a free Resumex account"
                description="Create a free Resumex account to build ATS‑friendly resumes with live preview and PDF/JSON export."
                canonicalPath="/register"
            />
            <LandingNav
                rightContent={
                    <>
                        <span className="lp-nav-text">Already have an account?</span>
                        <Link to="/login" className="btn-lp-primary lp-nav-cta">
                            Log in
                        </Link>
                    </>
                }
            />

            <main className="container auth-page-main">
                <div className="lp-minimal-card auth-card">
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px', color: 'var(--lp-text)', textAlign: 'center' }}>
                        Create your account
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--lp-text-muted)', marginBottom: '24px', textAlign: 'center' }}>
                        Start building structured, ATS-friendly resumes in minutes.
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

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--lp-text)' }}>Confirm Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '-8px', marginBottom: '16px' }}>
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 8,
                                    fontSize: '0.85rem',
                                    color: 'var(--lp-text-muted)',
                                    cursor: 'pointer'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={acceptedLegal}
                                    onChange={(e) => setAcceptedLegal(e.target.checked)}
                                    required
                                    style={{ marginTop: 3 }}
                                />
                                <span>
                                    I agree to the{' '}
                                    <Link to="/terms-of-service" style={{ color: 'var(--lp-accent)', fontWeight: 500 }}>
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy-policy" style={{ color: 'var(--lp-accent)', fontWeight: 500 }}>
                                        Privacy Policy
                                    </Link>.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn-lp-primary"
                            style={{ width: '100%', marginTop: '8px' }}
                        >
                            Sign up
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: 'var(--lp-accent)', fontWeight: 500 }}>
                                Log in
                            </Link>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;
