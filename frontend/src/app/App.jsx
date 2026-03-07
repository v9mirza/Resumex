import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ResumeProvider } from '../state/useResume.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';

const Home = lazy(() => import('../pages/Home'));
const Builder = lazy(() => import('../pages/Builder'));
const Preview = lazy(() => import('../pages/Preview'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Admin = lazy(() => import('../pages/Admin'));
const Profile = lazy(() => import('../pages/Profile'));
const LegalPrivacy = lazy(() => import('../pages/LegalPrivacy'));
const LegalTerms = lazy(() => import('../pages/LegalTerms'));

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ResumeProvider>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: 'var(--bg-panel, #ffffff)',
                                color: 'var(--text-main, #0f172a)',
                                border: '1px solid var(--border-color, #e5e7eb)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                            },
                            className: 'lp-toast'
                        }}
                    />
                    <Router>
                        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--lp-bg)', color: 'var(--lp-text-muted)', fontSize: '0.95rem' }}>Loading…</div>}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/privacy-policy" element={<LegalPrivacy />} />
                                <Route path="/terms-of-service" element={<LegalTerms />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/build" element={
                                    <ProtectedRoute>
                                        <Builder />
                                    </ProtectedRoute>
                                } />
                                <Route path="/build/:id" element={
                                    <ProtectedRoute>
                                        <Builder />
                                    </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />
                                <Route path="/preview" element={
                                    <ProtectedRoute>
                                        <Preview />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin" element={
                                    <ProtectedRoute>
                                        <Admin />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </Suspense>
                    </Router>
                </ResumeProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
