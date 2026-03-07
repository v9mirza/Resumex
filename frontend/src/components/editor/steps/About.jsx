import React from 'react';

const About = ({ data, update }) => {
    const handleChange = (e) => {
        update('summary', e.target.value);
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                2–4 sentences that summarize your background, focus, and what you’re best at.
            </p>
            <div className="form-group">
                <label className="form-label">Professional Summary</label>
                <textarea
                    className="form-textarea"
                    rows="8"
                    value={data.summary || ''}
                    onChange={handleChange}
                    placeholder="Briefly describe your professional background and key achievements..."
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                    Tip: Mention who you help, how you help them, and include 1–2 concrete results.
                </p>
            </div>
        </div>
    );
};

export default About;
