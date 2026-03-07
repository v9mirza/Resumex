import React from 'react';

const Template = ({ current, select }) => {
    const templates = [
        { id: 'minimal', name: 'Minimal', description: 'Clean, left-aligned, whitespace heavy.' },
        { id: 'classic', name: 'Classic', description: 'Traditional centered header, serif fonts.' },
        { id: 'modern', name: 'Modern', description: 'Bold headers, grid layout.' }
    ];

    const renderPreview = (id) => {
        // Tiny visual thumbnails (use CSS vars so dark mode works)
        const baseStyle = {
            borderRadius: 8,
            border: '1px solid var(--lp-border)',
            backgroundColor: 'var(--lp-input-bg)',
            padding: 6,
            height: 52,
            display: 'flex',
            flexDirection: id === 'modern' ? 'row' : 'column',
            gap: 4,
        };

        const barDark = 'var(--lp-text)';
        const barMuted = 'var(--lp-text-muted)';
        if (id === 'modern') {
            return (
                <div style={baseStyle}>
                    <div style={{ width: '28%', borderRight: '1px solid var(--lp-border)', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ height: 8, backgroundColor: barDark, borderRadius: 4 }} />
                        <div style={{ height: 6, backgroundColor: barMuted, borderRadius: 4 }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ height: 8, backgroundColor: barDark, borderRadius: 4, width: '60%' }} />
                        <div style={{ height: 6, backgroundColor: barMuted, borderRadius: 4 }} />
                        <div style={{ height: 6, backgroundColor: barMuted, borderRadius: 4, width: '80%' }} />
                    </div>
                </div>
            );
        }

        if (id === 'classic') {
            return (
                <div style={baseStyle}>
                    <div style={{ height: 10, backgroundColor: barDark, borderRadius: 4, width: '70%', alignSelf: 'center' }} />
                    <div style={{ height: 6, backgroundColor: barMuted, borderRadius: 4, width: '85%', alignSelf: 'center' }} />
                    <div style={{ height: 1, backgroundColor: barDark, borderRadius: 1, width: '90%', alignSelf: 'center' }} />
                </div>
            );
        }

        // minimal
        return (
            <div style={baseStyle}>
                <div style={{ height: 9, backgroundColor: barDark, borderRadius: 4, width: '65%' }} />
                <div style={{ height: 5, backgroundColor: barMuted, borderRadius: 4, width: '55%' }} />
                <div style={{ height: 5, backgroundColor: barMuted, borderRadius: 4, width: '90%' }} />
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Pick a layout that matches your vibe – you can switch anytime while editing.
            </p>
            <h2 className="lp-card-heading" style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Select template</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '20px' }}>
                Choose how your resume is rendered. You can switch templates at any time.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {templates.map(t => {
                    const isActive = current === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => select(t.id)}
                            className="template-card-btn"
                            style={{
                                textAlign: 'left',
                                borderRadius: 16,
                                border: `1px solid ${isActive ? 'var(--lp-accent)' : 'var(--lp-border)'}`,
                                backgroundColor: isActive ? 'var(--lp-accent-subtle, rgba(0,130,201,0.08))' : 'var(--lp-bg-alt)',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                gap: 14,
                                alignItems: 'center',
                                boxShadow: isActive ? '0 0 0 1px var(--lp-accent)' : 'none',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease'
                            }}
                        >
                            <div style={{ width: 80, flexShrink: 0 }}>
                                {renderPreview(t.id)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            color: isActive ? 'var(--lp-accent)' : 'var(--lp-text)'
                                        }}
                                    >
                                        {t.name}
                                    </span>
                                    {isActive && (
                                        <span style={{ fontSize: '0.75rem', color: 'var(--lp-accent)', fontWeight: 600 }}>
                                            Selected
                                        </span>
                                    )}
                                </div>
                                <p style={{ margin: 0, color: 'var(--lp-text-muted)', fontSize: '0.85rem' }}>{t.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Template;
