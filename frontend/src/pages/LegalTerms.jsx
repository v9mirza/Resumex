import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';

const LegalTerms = () => {
    return (
        <div className="landing-page">
            <div className="container legal-page-main" style={{ maxWidth: '800px' }}>

                {/* Header/Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px', borderBottom: '1px solid var(--lp-border)', paddingBottom: '24px' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lp-text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--lp-text)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--lp-text-muted)'}>
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="/resumex.svg" alt="Resumex logo" style={{ width: 20, height: 20 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>Resumex</span>
                    </div>
                </div>

                {/* Content */}
                <div style={{ paddingBottom: '80px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ background: '#f1f5f9', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={24} color="#334155" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Terms of Service</h1>
                    </div>
                    <p style={{ color: 'var(--lp-text-muted)', marginBottom: '48px' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>1. Agreement to Terms</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            By accessing or using Resumex, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>2. Description of Service</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            Resumex is an open-source, web-based platform that allows users to create, manage, export, and store professional resumes in digital formats (PDF, JSON). We provide the tools to build structure-focused, ATS-friendly resumes.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>3. User Accounts</h2>
                        <ul style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', paddingLeft: '24px', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '8px' }}>You are responsible for safeguarding the password that you use to access the Service.</li>
                            <li style={{ marginBottom: '8px' }}>You agree not to disclose your password to any third party.</li>
                            <li style={{ marginBottom: '8px' }}>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>4. Content Ownership</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            The content (the career history and personal information) you input into Resumex remains 100% yours. By using the Service, you grant us the technical right to store and process this data on our secure cloud servers exclusively for the purpose of rendering your resumes to you across your devices.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>5. Limitation of Liability</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            To the maximum extent permitted by law, Resumex shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. As an open-source project, the platform operates "AS-IS" without warranties of any kind regarding uninterrupted uptime or data preservation guarantees.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>6. Changes to Terms</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
};

export default LegalTerms;
