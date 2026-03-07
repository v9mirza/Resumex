
import React from 'react';


// Refined Skills component with local state
const Skills = ({ data, update }) => {
    const [localValue, setLocalValue] = React.useState(Array.isArray(data) ? data.join(', ') : '');

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        const skills = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
        update(skills);
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Group your tools and strengths into short, scannable lists – avoid long paragraphs.
            </p>
            <p className="text-muted" style={{ marginBottom: '16px' }}>
                Enter your skills separated by commas. Group related tools together (e.g. “Frontend: React, TypeScript”).
            </p>
            <textarea
                className="form-textarea"
                style={{ minHeight: '150px' }}
                placeholder="JavaScript, React, Node.js, Design Systems..."
                value={localValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default Skills;
