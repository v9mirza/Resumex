import React from 'react';

const Experience = ({ data, update, errors = {} }) => {
    const [expandedIndex, setExpandedIndex] = React.useState(0);
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

    const insertExampleBullets = (index) => {
        const current = data[index] || {};
        const existing = Array.isArray(current.description)
            ? current.description
            : current.description
                ? [current.description]
                : [];
        const examples = [
            'Delivered X% improvement in key metric by doing Y.',
            'Collaborated with cross-functional team to ship feature Z on time.',
        ];
        updateItem(index, 'description', [...existing, ...examples]);
    };

    React.useEffect(() => {
        if (data.length === 0) return;
        if (expandedIndex > data.length - 1) {
            setExpandedIndex(data.length - 1);
        }
    }, [data.length, expandedIndex]);

    return (
        <div className="animate-fade-in">
            {data.map((item, index) => {
                const isExpanded = expandedIndex === index;
                return (
                    <div
                        key={index}
                        className="card"
                        style={{
                            marginBottom: '16px',
                            borderRadius: '16px',
                            borderColor: isExpanded ? 'var(--lp-accent)' : undefined,
                            cursor: 'default',
                        }}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: isExpanded ? '16px' : 0, alignItems: 'center' }}
                            onClick={() => setExpandedIndex(index)}
                        >
                            <div>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                                    Role {index + 1}
                                </span>
                                <h3
                                    className="text-h3"
                                    style={{ margin: '4px 0 0', color: 'var(--text-main)', fontSize: '1rem' }}
                                >
                                    {item.role || 'Add role / title'}
                                </h3>
                                {!isExpanded && (
                                    <p style={{ margin: '4px 0 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {item.company || 'Company'}, {item.start || 'Start'} – {item.end || 'End'}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeExperience(index);
                                }}
                                style={{
                                    color: '#b91c1c',
                                    fontSize: '0.8rem',
                                    background: 'rgba(248,113,113,0.06)',
                                    border: '1px solid #fecaca',
                                    borderRadius: '999px',
                                    padding: '4px 10px',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        </div>

                        {isExpanded && (
                            <>
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
                                            data-error-id={`experience.${index}.start`}
                                            style={errors[`experience.${index}.start`] ? { borderColor: '#dc2626' } : undefined}
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
                                            data-error-id={`experience.${index}.end`}
                                            style={errors[`experience.${index}.end`] ? { borderColor: '#dc2626' } : undefined}
                                        />
                                    </div>
                                </div>

                                {(errors[`experience.${index}.start`] || errors[`experience.${index}.end`]) && (
                                    <p style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '-4px', marginBottom: '12px' }}>
                                        {errors[`experience.${index}.start`] || errors[`experience.${index}.end`]}
                                    </p>
                                )}

                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label className="form-label">
                                            Bullet Points (One per line)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => insertExampleBullets(index)}
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                fontSize: '0.8rem',
                                                color: 'var(--lp-accent)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Insert example
                                        </button>
                                    </div>
                                    <textarea
                                        className="form-textarea"
                                        style={{ minHeight: '120px', resize: 'vertical' }}
                                        placeholder="- Led X...&#10;- Improved Y by Z%..."
                                        value={Array.isArray(item.description) ? item.description.join('\n') : item.description}
                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                                        Aim for 3–5 bullets. Each should have an action + metric or outcome.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <button
                type="button"
                onClick={addExperience}
                style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px dashed var(--lp-border)',
                    background: 'transparent',
                    color: 'var(--lp-text-muted)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s ease-out'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,130,201,0.04)';
                    e.currentTarget.style.borderColor = 'var(--lp-accent)';
                    e.currentTarget.style.color = 'var(--lp-accent)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--lp-border)';
                    e.currentTarget.style.color = 'var(--lp-text-muted)';
                }}
            >
                + Add experience
            </button>
        </div>
    );
};

export default Experience;
