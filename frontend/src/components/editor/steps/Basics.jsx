import React from 'react';

const Basics = ({ data, update }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        update(name, value);
    };

    // Basic styling for inputs is in global css
    // Basic styling for inputs is in global css

    return (
        <div className="animate-fade-in">

            <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
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
