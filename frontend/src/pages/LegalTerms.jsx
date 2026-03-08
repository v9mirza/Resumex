import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import LandingFooter from '../components/LandingFooter';

const LegalTerms = () => {
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="landing-page">
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
                            <FileText size={26} />
                        </div>
                        <h1 className="legal-doc-title">Terms of Service</h1>
                    </div>
                    <p className="legal-doc-updated">Last updated: {lastUpdated}</p>

                    <section className="legal-doc-section" id="agreement">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            By accessing or using Resumex (“Service”), you agree to be bound by these Terms of Service (“Terms”). If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. If you do not agree to these Terms in their entirety, you must not access or use the Service.
                        </p>
                        <p>
                            We may update these Terms from time to time. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="description">
                        <h2>2. Description of Service</h2>
                        <p>
                            Resumex is an open-source, web-based platform that enables users to create, edit, store, and export professional resumes. The Service includes:
                        </p>
                        <ul>
                            <li>Account creation and secure authentication</li>
                            <li>Creation and management of multiple resumes with structured data (e.g., experience, education, skills)</li>
                            <li>Real-time preview and ATS-friendly templates</li>
                            <li>Export in PDF and JSON formats</li>
                            <li>Cloud storage and sync of your resume data across devices</li>
                        </ul>
                        <p>
                            We strive to keep the Service available and secure but do not guarantee uninterrupted access or that the Service will be error-free. The Service is provided “as is” and “as available” (see Section 8).
                        </p>
                    </section>

                    <section className="legal-doc-section" id="accounts">
                        <h2>3. User Accounts</h2>
                        <p>
                            To use certain features (e.g., saving and syncing resumes), you must register for an account. You agree to:
                        </p>
                        <ul>
                            <li>Provide accurate, current, and complete information during registration and keep it updated</li>
                            <li>Maintain the security of your password and accept responsibility for all activity under your account</li>
                            <li>Notify us immediately of any unauthorized use of your account or any other breach of security</li>
                            <li>Not share your account credentials with any third party or use another user’s account</li>
                        </ul>
                        <p>
                            We reserve the right to suspend or terminate your account if we reasonably believe you have violated these Terms or engaged in fraudulent or abusive conduct.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="acceptable-use">
                        <h2>4. Acceptable Use</h2>
                        <p>
                            You agree to use the Service only for lawful purposes and in accordance with these Terms. You must not:
                        </p>
                        <ul>
                            <li>Use the Service in any way that violates applicable laws, regulations, or third-party rights</li>
                            <li>Attempt to gain unauthorized access to the Service, other accounts, or any systems or networks connected to the Service</li>
                            <li>Use the Service to distribute malware, spam, or any harmful or offensive content</li>
                            <li>Scrape, crawl, or use automated means to access the Service without our prior written permission (except for standard search engines indexing publicly available pages, if applicable)</li>
                            <li>Reverse engineer, decompile, or attempt to extract the source code of the Service (except to the extent permitted by applicable law for the open-source components we use)</li>
                            <li>Resell, sublicense, or commercially exploit the Service or any content obtained through it in a manner that competes with or undermines Resumex</li>
                        </ul>
                        <p>
                            We may remove content or suspend/terminate accounts that we determine, in our sole discretion, violate these rules or are harmful to other users or the Service.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="content-ownership">
                        <h2>5. Content Ownership and License</h2>
                        <p>
                            <strong>Your content.</strong> You retain full ownership of the content you create and upload to the Service (e.g., resume text, employment history, education, skills). We do not claim ownership of your content.
                        </p>
                        <p>
                            <strong>License to us.</strong> To operate the Service, we need the right to store, process, display, and transmit your content. Accordingly, you grant us a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce, modify, and create derivative works (e.g., for formatting or rendering) of your content solely for the purpose of providing, improving, and securing the Service. This includes generating PDFs and making your resumes available to you across your devices.
                        </p>
                        <p>
                            <strong>Export and portability.</strong> You may export your resume data (e.g., as JSON) at any time. We do not lock your data in; you can take it with you.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="ip">
                        <h2>6. Our Intellectual Property</h2>
                        <p>
                            The Service (including its design, code, templates, logos, and branding) is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works of our proprietary materials without our prior written consent, except as permitted by the open-source licenses that apply to parts of our codebase (e.g., on GitHub). Use of our name or logos must comply with any usage guidelines we publish.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="termination">
                        <h2>7. Termination</h2>
                        <p>
                            You may stop using the Service and, where applicable, delete your account at any time. We may suspend or terminate your access to the Service, with or without notice, if we believe you have breached these Terms or for any other reason we deem necessary (e.g., to protect the Service or other users).
                        </p>
                        <p>
                            Upon termination, your right to use the Service ceases. We may retain your data for a limited period as required by law or for legitimate business purposes (e.g., backup, dispute resolution), after which we will delete or anonymize it in accordance with our Privacy Policy.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="disclaimers">
                        <h2>8. Disclaimers</h2>
                        <p>
                            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                        </p>
                        <p>
                            As an open-source project, Resumex may be run by maintainers or third parties. We do not guarantee continuous availability, data preservation, or that the Service will meet your specific requirements. You use the Service at your own risk.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="limitation">
                        <h2>9. Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL RESUMEX, ITS AUTHORS, CONTRIBUTORS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITY) ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                        <p>
                            OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (USD $100). THE SERVICE IS OFFERED FREE OF CHARGE FOR PERSONAL USE; THEREFORE, IN SUCH CASES OUR LIABILITY MAY BE LIMITED TO $100 OR THE MINIMUM AMOUNT PERMITTED BY LAW.
                        </p>
                        <p>
                            Some jurisdictions do not allow the exclusion or limitation of certain damages; in those jurisdictions, our liability will be limited to the maximum extent permitted by law.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="indemnification">
                        <h2>10. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Resumex and its contributors, licensors, and service providers from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to (a) your use of the Service, (b) your content, (c) your violation of these Terms or any applicable law, or (d) your violation of any third-party rights. We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, at your expense.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="governing-law">
                        <h2>11. Governing Law and Disputes</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Resumex project maintainers are based, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms or the Service shall be resolved in the courts of that jurisdiction, and you consent to the personal jurisdiction of such courts.
                        </p>
                        <p>
                            If you are a consumer in the European Union or another jurisdiction with mandatory consumer protection laws, nothing in these Terms affects your statutory rights.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="changes">
                        <h2>12. Changes to the Terms</h2>
                        <p>
                            We may modify or replace these Terms at any time at our sole discretion. We will indicate changes by updating the “Last updated” date at the top of this page. Material changes may be communicated via the Service or the project’s repository. By continuing to access or use the Service after the revised Terms become effective, you agree to be bound by the new Terms. If you do not agree, you must stop using the Service.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="misc">
                        <h2>13. General</h2>
                        <p>
                            <strong>Entire agreement.</strong> These Terms, together with our Privacy Policy and any other policies we reference, constitute the entire agreement between you and Resumex regarding the Service.
                        </p>
                        <p>
                            <strong>Severability.</strong> If any provision of these Terms is held invalid or unenforceable, the remaining provisions will remain in full force and effect.
                        </p>
                        <p>
                            <strong>Waiver.</strong> Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                        </p>
                    </section>

                    <section className="legal-doc-section" id="contact">
                        <h2>14. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <ul>
                            <li>Via our <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">GitHub repository</a> (open an issue or discussion), or</li>
                            <li>By email at the contact address listed in the repository, if provided.</li>
                        </ul>
                        <p>
                            Thank you for using Resumex.
                        </p>
                    </section>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
};

export default LegalTerms;
