import React from 'react';

const Languages = ({ data, update }) => {
    const items = Array.isArray(data) ? data : [];

    const addItem = () => {
        update([
            ...items,
            { name: '', level: '' }
        ]);
    };

    const updateItem = (index, field, value) => {
        const next = [...items];
        next[index] = { ...(next[index] || { name: '', level: '' }), [field]: value };
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
                Add languages and your proficiency level.
            </p>
            {items.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '12px', padding: '10px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input
                            className="form-input"
                            style={{ flex: '1 1 180px', minWidth: '160px' }}
                            value={item.name || ''}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            placeholder="Language (e.g. English)"
                        />
                        <input
                            className="form-input"
                            style={{ flex: '1 1 160px', minWidth: '150px' }}
                            value={item.level || ''}
                            onChange={(e) => updateItem(index, 'level', e.target.value)}
                            placeholder="Level (e.g. Fluent, Native)"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--lp-text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                padding: '4px 6px'
                            }}
                        >
                            Remove
                        </button>
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
                + Add language
            </button>
        </div>
    );
};

export default Languages;

