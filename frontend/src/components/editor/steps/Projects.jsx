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

    const fieldStyle = { marginBottom: '12px' };
    const inputStyle = { width: '100%', marginBottom: '8px' };

    return (
        <div className="animate-fade-in">
            {data.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                        <h3 className="text-h3" style={{ margin: 0, color: 'var(--text-main)' }}>Project {index + 1}</h3>
                        <button
                            onClick={() => removeProject(index)}
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
                        <label className="form-label">Project Name</label>
                        <input
                            className="form-input"
                            value={item.name}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            style={{ minHeight: '80px' }}
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
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
                    </div>
                </div>
            ))}

            <button
                onClick={addProject}
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
                + Add Project
            </button>
        </div>
    );
};

export default Projects;
