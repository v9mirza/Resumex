import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ResumeProvider } from '../state/useResume.jsx';
import Home from '../pages/Home';
import Builder from '../pages/Builder';
import Preview from '../pages/Preview';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Admin from '../pages/Admin';
import Profile from '../pages/Profile';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <ResumeProvider>
                <Toaster position="bottom-right" />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
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
                </Router>
            </ResumeProvider>
        </AuthProvider>
    );
}

export default App;
