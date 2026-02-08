import React from 'react';

const Education = ({ data, update }) => {
    const addEducation = () => {
        update([
            ...data,
            { institution: '', degree: '', start: '', end: '' }
        ]);
    };

    const removeEducation = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        update(newData);
    };

    const updateItem = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        update(newData);
    };

    return (
        <div className="animate-fade-in">
            {data.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                        <h3 className="text-h3" style={{ margin: 0, color: 'var(--text-main)' }}>Entry {index + 1}</h3>
                        <button
                            onClick={() => removeEducation(index)}
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
                        <label className="form-label">Institution</label>
                        <input
                            className="form-input"
                            placeholder="University of Design"
                            value={item.institution}
                            onChange={(e) => updateItem(index, 'institution', e.target.value)}
                            autoComplete="organization"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Degree</label>
                        <input
                            className="form-input"
                            placeholder="Bachelor of Arts"
                            value={item.degree}
                            onChange={(e) => updateItem(index, 'degree', e.target.value)}
                            autoComplete="off"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
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
                </div>
            ))}

            <button
                onClick={addEducation}
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
                + Add Education
            </button>
        </div>
    );
};

export default Education;
