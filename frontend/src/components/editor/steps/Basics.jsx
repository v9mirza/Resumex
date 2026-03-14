import React, { useRef } from 'react';

const Basics = ({ data, update, errors = {} }) => {
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const locationRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        update(name, value);
    };

    const handleLinkChange = (index, field, value) => {
        const next = Array.isArray(data.links) ? [...data.links] : [];
        next[index] = { ...(next[index] || { label: '', url: '' }), [field]: value };
        update('links', next);
    };

    const handleAddLink = () => {
        const next = Array.isArray(data.links) ? [...data.links] : [];
        next.push({ label: '', url: '' });
        update('links', next);
    };

    const handleRemoveLink = (index) => {
        const next = Array.isArray(data.links) ? [...data.links] : [];
        next.splice(index, 1);
        update('links', next);
    };

    // Basic styling for inputs is in global css

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Start with the essentials: who you are, how to contact you, and where you’re based.
            </p>
            <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (emailRef.current) {
                                emailRef.current.focus();
                            }
                        }
                    }}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                    data-error-id="basics.name"
                    style={errors['basics.name'] ? { borderColor: '#dc2626' } : undefined}
                />
                {errors['basics.name'] && (
                    <p style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '4px' }}>{errors['basics.name']}</p>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Job title / headline</label>
                <input
                    className="form-input"
                    type="text"
                    name="headline"
                    value={data.headline || ''}
                    onChange={handleChange}
                    placeholder="Computer Science Student, Junior Frontend Developer…"
                    autoComplete="off"
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                    A short line that appears under your name and matches the roles you’re targeting.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    ref={emailRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (phoneRef.current) {
                                phoneRef.current.focus();
                            }
                        }
                    }}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                    data-error-id="basics.email"
                    style={errors['basics.email'] ? { borderColor: '#dc2626' } : undefined}
                />
                {errors['basics.email'] && (
                    <p style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '4px' }}>{errors['basics.email']}</p>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    ref={phoneRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (locationRef.current) {
                                locationRef.current.focus();
                            }
                        }
                    }}
                    placeholder="(555) 123-4567"
                    pattern="[0-9+\-\. ]*"
                    autoComplete="tel"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Location</label>
                <input
                    className="form-input"
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    ref={locationRef}
                    placeholder="City, Country"
                    autoComplete="address-level2"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Portfolio URL (optional)</label>
                <input
                    className="form-input"
                    type="url"
                    name="portfolio"
                    value={data.portfolio || ''}
                    onChange={handleChange}
                    placeholder="https://yourname.dev"
                    autoComplete="url"
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                    Your primary portfolio or personal site. This will be shown prominently in the header.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Social & links (optional)</label>
                <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginBottom: '8px' }}>
                    Add links like LinkedIn, GitHub, portfolio, or personal site.
                </p>
                {(data.links || []).map((link, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            marginBottom: '8px',
                            flexWrap: 'wrap'
                        }}
                    >
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Label (e.g. LinkedIn)"
                            value={link.label || ''}
                            onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                            style={{ flex: '0 0 140px', minWidth: 0 }}
                        />
                        <input
                            className="form-input"
                            type="url"
                            placeholder="URL (e.g. https://linkedin.com/in/you)"
                            value={link.url || ''}
                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                            style={{ flex: '1 1 200px', minWidth: 0 }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveLink(index)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--lp-text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                padding: '4px 8px'
                            }}
                            aria-label="Remove link"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddLink}
                    style={{
                        marginTop: '4px',
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                        borderRadius: '999px',
                        border: '1px dashed var(--lp-border)',
                        background: 'transparent',
                        color: 'var(--lp-accent)',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    + Add link
                </button>
            </div>
        </div>
    );
};

export default Basics;
