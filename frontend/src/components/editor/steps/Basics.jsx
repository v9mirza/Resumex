import React, { useRef } from 'react';

const Basics = ({ data, update, errors = {} }) => {
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const locationRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        update(name, value);
    };

    // Basic styling for inputs is in global css
    // Basic styling for inputs is in global css

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Start with the essentials: how recruiters can contact you and where you’re based.
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

            {/* Links could be an array editor, keeping it simple for now or adding specific fields */}
            {/* For V1, maybe just dynamic links? The prompt says "Optional links (GitHub, LinkedIn, Portfolio)" */}
            {/* Let's simplify and just add slots for them or a generic link adder. */}
            {/* Starting with simple text inputs for common ones is safer for v1 MVP. */}
        </div>
    );
};

export default Basics;
