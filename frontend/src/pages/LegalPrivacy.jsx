import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';
import Seo from '../components/Seo';

const LegalPrivacy = () => {
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="landing-page">
            <Seo
                title="Privacy Policy | Resumex"
                description="Read how Resumex collects, stores, and protects your personal data when you use our resume builder."
                canonicalPath="/privacy-policy"
            />
            <div className="container legal-page-main">

                <header className="legal-doc-header">
                    <Link to="/" className="legal-doc-back">
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                    <div className="legal-doc-brand">
                        <img src="/resumex.svg" alt="Resumex logo" style={{ width: 20, height: 20 }} />
                        <span>Resumex</span>
                    </div>
                </header>

                <div className="legal-doc-body">
                    <div className="legal-doc-hero">
                        <div className="legal-doc-icon">
                            <ShieldCheck size={26} />
                        </div>
                        <h1 className="legal-doc-title">Privacy Policy</h1>
                    </div>
                    <p className="legal-doc-updated">Last updated: {lastUpdated}</p>

                    <section className="legal-doc-section" id="introduction">
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Resumex (“we”, “our”, or “us”). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and disclose your information when you use our website and services (the “Service”), and describes your privacy rights and how the law protects you.
                        </p>
                        <p>
                            Resumex is an open-source, web-based resume builder. By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use the Service.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="data-we-collect">
                        <h2>2. Data We Collect</h2>
                        <p>
                            We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped as follows:
                        </p>
                        <ul>
                            <li><strong>Identity Data</strong> — First name, last name, username, or similar identifier that you provide when registering or updating your profile.</li>
                            <li><strong>Contact Data</strong> — Email address and, if you choose to provide it, telephone number.</li>
                            <li><strong>Account Data</strong> — Login credentials (stored in hashed form), account preferences, and authentication tokens necessary to maintain your session.</li>
                            <li><strong>Professional Data (Resume Content)</strong> — Employment history, education, skills, projects, certifications, and any other information you enter into your resumes. This data is stored to provide the core functionality of the Service (creating, editing, and exporting resumes).</li>
                            <li><strong>Technical Data</strong> — Internet protocol (IP) address, browser type and version, time zone, device information, and how you interact with our Service (e.g., pages visited, actions taken). We may use this to improve the Service, debug issues, and ensure security.</li>
                            <li><strong>Usage Data</strong> — Information about how you use the Service, such as feature usage and session duration. We do not sell this data to third parties.</li>
                        </ul>
                        <p>
                            We do not collect special categories of personal data (e.g., race, political opinions, health data) unless you voluntarily include such information in your resume content. We encourage you not to include sensitive personal data in your resumes unless necessary.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="how-we-use">
                        <h2>3. How We Use Your Data</h2>
                        <p>
                            We use your personal data only when we have a lawful basis to do so. Most commonly, we use your data in the following ways:
                        </p>
                        <ul>
                            <li><strong>To provide and maintain the Service</strong> — Creating and managing your account, storing and syncing your resumes, enabling you to edit and export them (e.g., as PDF or JSON).</li>
                            <li><strong>To communicate with you</strong> — Sending you account-related notifications (e.g., password reset, security alerts) and, if you have opted in, product updates or support replies.</li>
                            <li><strong>To improve and secure the Service</strong> — Analyzing usage patterns, fixing bugs, preventing abuse, and protecting against unauthorized access.</li>
                            <li><strong>To comply with legal obligations</strong> — Where we are required to retain or disclose data by law (e.g., in response to a valid court order or regulatory request).</li>
                        </ul>
                        <p>
                            We do not use your resume content for advertising, profiling, or selling to third parties. Your professional data is used solely to deliver the resume-building and export features you expect.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="data-retention">
                        <h2>4. Data Retention</h2>
                        <p>
                            We retain your personal data only for as long as necessary to fulfill the purposes described in this policy. Specifically:
                        </p>
                        <ul>
                            <li><strong>Account and profile data</strong> — Retained until you delete your account. After account deletion, we remove or anonymize your data within a reasonable period, except where we must retain it for legal, regulatory, or security reasons.</li>
                            <li><strong>Resume content</strong> — Retained for as long as your account is active and the resume exists. If you delete a resume or your account, we delete the associated data from our systems in line with our retention schedule.</li>
                            <li><strong>Technical and usage data</strong> — May be retained in aggregated or anonymized form for analytics and improvement; raw logs are typically retained only for a limited period necessary for security and debugging.</li>
                        </ul>
                    </section>

                    <section className="legal-doc-section" id="cookies">
                        <h2>5. Cookies and Similar Technologies</h2>
                        <p>
                            We use cookies and similar technologies (e.g., local storage) to operate the Service. These are used for:
                        </p>
                        <ul>
                            <li><strong>Essential operation</strong> — Session management, authentication, and remembering your preferences (e.g., theme choice) so the Service works correctly.</li>
                            <li><strong>Security</strong> — Helping protect against cross-site request forgery (CSRF) and unauthorized access.</li>
                        </ul>
                        <p>
                            We do not use third-party advertising cookies or tracking for targeted ads. You can control cookies through your browser settings; disabling certain cookies may affect the functionality of the Service (e.g., you may need to log in again more often).
                        </p>
                    </section>

                    <section className="legal-doc-section" id="sharing">
                        <h2>6. Sharing and Disclosure</h2>
                        <p>
                            We do not sell your personal data. We may share your data only in the following circumstances:
                        </p>
                        <ul>
                            <li><strong>Service providers</strong> — With trusted third parties who assist us in operating the Service (e.g., hosting, database, email delivery). These providers are contractually bound to use your data only for the purposes we specify and to protect it in line with this policy.</li>
                            <li><strong>Legal requirements</strong> — When required by law, court order, or governmental authority, or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                            <li><strong>Business transfers</strong> — In connection with a merger, acquisition, or sale of assets, in which case you will be notified and your data may be transferred as part of that transaction, subject to the same privacy commitments.</li>
                        </ul>
                    </section>

                    <section className="legal-doc-section" id="security">
                        <h2>7. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include encryption in transit (e.g., TLS), secure authentication practices, and access controls. Your resume content and account data are treated with strict confidentiality.
                        </p>
                        <p>
                            No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. You are responsible for keeping your password confidential and for any activity under your account.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="your-rights">
                        <h2>8. Your Rights</h2>
                        <p>
                            Depending on your location, you may have certain rights regarding your personal data, including:
                        </p>
                        <ul>
                            <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
                            <li><strong>Correction</strong> — Request correction of inaccurate or incomplete data (you can also update much of this yourself in your account and resume editor).</li>
                            <li><strong>Deletion</strong> — Request deletion of your personal data, subject to legal or legitimate retention needs.</li>
                            <li><strong>Portability</strong> — Request a copy of your data in a structured, machine-readable format (e.g., we support JSON export of your resume data).</li>
                            <li><strong>Objection or restriction</strong> — Object to certain processing or request restriction of processing where applicable by law.</li>
                            <li><strong>Withdraw consent</strong> — Where we rely on consent, you may withdraw it at any time without affecting the lawfulness of processing before withdrawal.</li>
                        </ul>
                        <p>
                            To exercise these rights, contact us (see Section 11). You may also have the right to lodge a complaint with a supervisory authority in your country.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="international">
                        <h2>9. International Transfers</h2>
                        <p>
                            Your data may be processed and stored in countries other than your country of residence. We ensure that appropriate safeguards (e.g., standard contractual clauses or adequacy decisions) are in place where required by applicable law, so that your data receives an adequate level of protection.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="children">
                        <h2>10. Children’s Privacy</h2>
                        <p>
                            The Service is not intended for users under the age of 16. We do not knowingly collect personal data from children under 16. If you become aware that a child has provided us with personal data, please contact us and we will take steps to delete such information.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="changes">
                        <h2>11. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the “Last updated” date. We encourage you to review this policy periodically. Your continued use of the Service after changes become effective constitutes acceptance of the updated policy. If you do not agree, you should discontinue use of the Service.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="contact">
                        <h2>12. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy or our privacy practices, or wish to exercise your rights, please contact us:
                        </p>
                        <ul>
                            <li>Via our <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-accent)', textDecoration: 'none' }}>GitHub repository</a> (open an issue or discussion), or</li>
                            <li>By email at the contact address listed in the repository, if provided.</li>
                        </ul>
                        <p>
                            Resumex is an open-source project; we aim to respond to privacy-related inquiries in a timely manner.
                        </p>
                    </section>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
};

export default LegalPrivacy;
