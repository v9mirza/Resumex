import React from 'react';

const About = ({ data, update }) => {
    const handleChange = (e) => {
        update('summary', e.target.value);
    };

    return (
        <div className="animate-fade-in">
            <div className="form-group">
                <label className="form-label">Professional Summary</label>
                <textarea
                    className="form-textarea"
                    rows="8"
                    value={data.summary || ''}
                    onChange={handleChange}
                    placeholder="Briefly describe your professional background and key achievements..."
                />
            </div>
        </div>
    );
};

export default About;
