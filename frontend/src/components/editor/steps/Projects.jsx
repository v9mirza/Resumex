import React from 'react';

const Projects = ({ data, update }) => {
    const addProject = () => {
        update([
            ...data,
            { name: '', description: '', tech: '' }
        ]);
    };

    const removeProject = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        update(newData);
    };

    const updateItem = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        update(newData);
    };

    const [expandedIndex, setExpandedIndex] = React.useState(0);

    const insertExampleDescription = (index) => {
        const current = data[index] || {};
        const base = current.description || '';
        const example = 'Built a full-stack web app used by X+ users, improving Y by Z%.';
        updateItem(index, 'description', base ? `${base}\n${example}` : example);
    };

    React.useEffect(() => {
        if (data.length === 0) return;
        if (expandedIndex > data.length - 1) {
            setExpandedIndex(data.length - 1);
        }
    }, [data.length, expandedIndex]);

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Highlight 2–4 projects that show real impact: metrics, users, or problems solved.
            </p>
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
                                    Project {index + 1}
                                </span>
                                <h3 className="text-h3" style={{ margin: '4px 0 0', color: 'var(--text-main)', fontSize: '1rem' }}>
                                    {item.name || 'Add project name'}
                                </h3>
                                {!isExpanded && (
                                    <p style={{ margin: '4px 0 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {item.tech || 'Tech stack'}{item.description ? ' • description added' : ''}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeProject(index);
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
                                    <label className="form-label">Project Name</label>
                                    <input
                                        className="form-input"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label className="form-label">Description</label>
                                        <button
                                            type="button"
                                            onClick={() => insertExampleDescription(index)}
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
                                        style={{ minHeight: '80px' }}
                                        value={item.description}
                                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                                        placeholder="What you built, who used it, and what changed (ideally with 1–2 numbers)…"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tech Stack</label>
                                    <input
                                        className="form-input"
                                        placeholder="React, Node.js, etc."
                                        value={item.tech}
                                        onChange={(e) => updateItem(index, 'tech', e.target.value)}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)', marginTop: '4px' }}>
                                        Keep this short – 3–6 key tools separated by commas.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <button
                type="button"
                onClick={addProject}
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
                + Add project
            </button>
        </div>
    );
};

export default Projects;
