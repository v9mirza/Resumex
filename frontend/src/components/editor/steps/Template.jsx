import React from 'react';

const Template = ({ current, select }) => {
    const templates = [
        { id: 'minimal', name: 'Minimal', description: 'Clean, left-aligned, whitespace heavy.' },
        { id: 'classic', name: 'Classic', description: 'Traditional centered header, serif fonts.' },
        { id: 'modern', name: 'Modern', description: 'Bold headers, grid layout.' }
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-h2" style={{ marginBottom: '24px' }}>Select Template</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {templates.map(t => (
                    <div
                        key={t.id}
                        onClick={() => select(t.id)}
                        className="card"
                        style={{
                            padding: '24px',
                            cursor: 'pointer',
                            borderColor: current === t.id ? 'var(--accent-color)' : 'var(--border-color)',
                            backgroundColor: current === t.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-card)',
                            boxShadow: current === t.id ? '0 0 0 1px var(--accent-color)' : 'none',
                        }}
                    >
                        <h3 className="text-h3" style={{ margin: '0 0 4px 0', color: current === t.id ? 'var(--accent-color)' : 'var(--text-main)' }}>{t.name}</h3>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Template;
