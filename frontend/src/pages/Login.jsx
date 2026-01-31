import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login({ email, password });
        if (result.success) {
            // Check role from the result (ensure AuthContext returns it)
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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-app)',
            position: 'relative' // Ensure relative positioning for absolute child
        }}>
            <Link to="/" style={{ position: 'absolute', top: '32px', left: '32px', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.5rem', color: '#f4f4f5' }}>Resumex</span>
            </Link>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 className="text-h1" style={{ textAlign: 'center', marginBottom: '32px' }}>Welcome Back</h2>

                {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        width: '100%',
                        padding: '12px',
                        marginTop: '16px',
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '6px'
                    }}>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <span className="text-body" style={{ fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)' }}>Sign up</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
