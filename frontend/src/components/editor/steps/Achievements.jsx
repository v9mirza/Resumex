import React from 'react';

const Achievements = ({ data, update }) => {
    const items = Array.isArray(data) ? data : [];

    const handleChange = (e) => {
        const lines = e.target.value.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        update(lines);
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                List a few standout awards, achievements, or recognitions. One per line.
            </p>
            <textarea
                className="form-textarea"
                style={{ minHeight: '150px' }}
                value={items.join('\n')}
                onChange={handleChange}
                placeholder={'Winner, XYZ Hackathon 2024\nDean\'s List, 2022–2024'}
            />
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
        </div>
    );
};

export default Achievements;

