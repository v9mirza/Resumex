import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';

const LegalPrivacy = () => {
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
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Privacy Policy</h1>
                    </div>
                    <p style={{ color: 'var(--lp-text-muted)', marginBottom: '48px' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>1. Introduction</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            Welcome to Resumex. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>2. Data We Collect</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', paddingLeft: '24px', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '8px' }}><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Professional Data</strong> includes employment history, education records, skills, and any other information you chose to input into your generated resumes.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>3. How We Use Your Data</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', paddingLeft: '24px', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '8px' }}>Where we need to perform the contract we are about to enter into or have entered into with you (providing the resume building service).</li>
                            <li style={{ marginBottom: '8px' }}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li style={{ marginBottom: '8px' }}>To manage your account, securely store your resumes in the cloud, and enable you to export them as PDF or JSON.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>4. Data Security</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. Your professional histories are treated with the utmost confidentiality.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>5. Contact Us</h2>
                        <p style={{ color: 'var(--lp-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                            If you have any questions about this privacy policy or our privacy practices, please contact us via our GitHub repository.
                        </p>
                    </section>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
};

export default LegalPrivacy;
