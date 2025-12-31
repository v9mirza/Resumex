
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
            <p className="text-muted" style={{ marginBottom: '16px' }}>Enter your skills separated by commas.</p>
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
