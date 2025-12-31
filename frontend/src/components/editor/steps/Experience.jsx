import React from 'react';

const Experience = ({ data, update }) => {
    const addExperience = () => {
        update([
            ...data,
            { company: '', role: '', start: '', end: '', description: [] }
        ]);
    };

    const removeExperience = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        update(newData);
    };

    const updateItem = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        update(newData);
    };

    // Helper to handle text area -> array conversion
    const handleDescriptionChange = (index, text) => {
        // Split by newline and filter empty lines if desired, or keep them to preserve spacing
        // For minimal clean data, let's filter empty strings unless user wants gaps.
        // User might want gaps. Let's just split.
        const lines = text.split('\n');
        updateItem(index, 'description', lines);
    };

    const fieldStyle = { marginBottom: '12px' };
    const inputStyle = { width: '100%', marginBottom: '8px' };
    return (
        <div className="animate-fade-in">
            {data.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                        <h3 className="text-h3" style={{ margin: 0, color: 'var(--text-main)' }}>Role {index + 1}</h3>
                        <button
                            onClick={() => removeExperience(index)}
                            style={{
                                color: '#ff4444',
                                fontSize: '0.85rem',
                                background: 'transparent',
                                border: '1px solid #ff4444',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            Remove
                        </button>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                            className="form-input"
                            value={item.company}
                            onChange={(e) => updateItem(index, 'company', e.target.value)}
                            autoComplete="organization"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role / Title</label>
                        <input
                            className="form-input"
                            value={item.role}
                            onChange={(e) => updateItem(index, 'role', e.target.value)}
                            autoComplete="organization-title"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.start}
                                onChange={(e) => updateItem(index, 'start', e.target.value)}
                                placeholder="YYYY"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.end}
                                onChange={(e) => updateItem(index, 'end', e.target.value)}
                                placeholder="YYYY or Present"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Bullet Points (One per line)
                        </label>
                        <textarea
                            className="form-textarea"
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            placeholder="- Achieved X...&#10;- Built Y..."
                            value={Array.isArray(item.description) ? item.description.join('\n') : item.description}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addExperience}
                className="btn"
                style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px dashed var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.color = 'var(--text-main)' }}
                onMouseOut={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-muted)' }}
            >
                + Add Experience
            </button>
        </div>
    );
};

export default Experience;
