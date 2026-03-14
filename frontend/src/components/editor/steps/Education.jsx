import React from 'react';

const Education = ({ data, update }) => {
    const addEducation = () => {
        update([
            ...data,
            {
                institution: '',
                degree: '',
                start: '',
                end: '',
                gpa: '',
                showGpa: true,
                coursework: '',
                status: ''
            }
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
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                List your most recent degrees, certifications, or courses that matter for this role.
            </p>
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

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.start}
                                onChange={(e) => updateItem(index, 'start', e.target.value)}
                                placeholder="YYYY"
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.end}
                                onChange={(e) => updateItem(index, 'end', e.target.value)}
                                placeholder="YYYY or Present"
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '160px' }}>
                            <label className="form-label">Status</label>
                            <select
                                className="form-input"
                                value={item.status || ''}
                                onChange={(e) => updateItem(index, 'status', e.target.value)}
                            >
                                <option value="">Select status</option>
                                <option value="Graduated">Graduated</option>
                                <option value="Expected">Expected</option>
                                <option value="In progress">In progress</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                            <label className="form-label">GPA (optional)</label>
                            <input
                                type="text"
                                className="form-input"
                                value={item.gpa || ''}
                                onChange={(e) => updateItem(index, 'gpa', e.target.value)}
                                placeholder="3.8 / 4.0"
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                            <input
                                id={`edu-${index}-showGpa`}
                                type="checkbox"
                                checked={item.showGpa !== false}
                                onChange={(e) => updateItem(index, 'showGpa', e.target.checked)}
                            />
                            <label htmlFor={`edu-${index}-showGpa`} style={{ fontSize: '0.85rem', color: 'var(--lp-text-muted)', cursor: 'pointer' }}>
                                Show GPA on resume
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Relevant coursework (optional)</label>
                        <input
                            className="form-input"
                            value={item.coursework || ''}
                            onChange={(e) => updateItem(index, 'coursework', e.target.value)}
                            placeholder="Data Structures, Algorithms, Databases"
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                            Short list of courses that match the roles you’re applying for.
                        </p>
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
            {data.length === 0 && (
                <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                    Tip: Include your current degree, bootcamps, and any shorter courses that are relevant.
                </p>
            )}
        </div>
    );
};

export default Education;
