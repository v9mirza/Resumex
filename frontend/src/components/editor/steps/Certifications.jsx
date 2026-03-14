import React from 'react';

const Certifications = ({ data, update }) => {
    const items = Array.isArray(data) ? data : [];

    const addItem = () => {
        update([
            ...items,
            { name: '', issuer: '', date: '', url: '' }
        ]);
    };

    const updateItem = (index, field, value) => {
        const next = [...items];
        next[index] = { ...(next[index] || { name: '', issuer: '', date: '', url: '' }), [field]: value };
        update(next);
    };

    const removeItem = (index) => {
        const next = [...items];
        next.splice(index, 1);
        update(next);
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Add certifications that are relevant to the roles you’re targeting.
            </p>
            {items.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                        <h3 className="text-h3" style={{ margin: 0, fontSize: '1rem' }}>Certification {index + 1}</h3>
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--lp-text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Remove
                        </button>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            value={item.name || ''}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            placeholder="AWS Certified Solutions Architect – Associate"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Issuer</label>
                        <input
                            className="form-input"
                            value={item.issuer || ''}
                            onChange={(e) => updateItem(index, 'issuer', e.target.value)}
                            placeholder="Amazon Web Services"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div className="form-group" style={{ flex: 1, minWidth: '140px' }}>
                            <label className="form-label">Date</label>
                            <input
                                className="form-input"
                                value={item.date || ''}
                                onChange={(e) => updateItem(index, 'date', e.target.value)}
                                placeholder="2024 or Jan 2024"
                            />
                        </div>
                        <div className="form-group" style={{ flex: 2, minWidth: '200px' }}>
                            <label className="form-label">Credential URL (optional)</label>
                            <input
                                className="form-input"
                                type="url"
                                value={item.url || ''}
                                onChange={(e) => updateItem(index, 'url', e.target.value)}
                                placeholder="https://www.credly.com/..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            {items.length > 0 && (
                <button
                    type="button"
                    onClick={() => update([])}
                    style={{
                        marginTop: '8px',
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                        borderRadius: '999px',
                        border: '1px solid var(--lp-border)',
                        background: 'transparent',
                        color: 'var(--lp-text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    Reset this section
                </button>
            )}

            <button
                type="button"
                onClick={addItem}
                style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px dashed var(--lp-border)',
                    background: 'transparent',
                    color: 'var(--lp-text-muted)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
            >
                + Add certification
            </button>
        </div>
    );
};

export default Certifications;

