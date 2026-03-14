
import React from 'react';

const CATEGORIES = ['Languages', 'Frameworks', 'Tools', 'Soft skills'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const Skills = ({ data, update }) => {
    const skills = Array.isArray(data) ? data : [];

    const updateSkill = (index, field, value) => {
        const next = [...skills];
        next[index] = { ...(next[index] || { category: '', name: '', level: '' }), [field]: value };
        update(next);
    };

    const addSkill = () => {
        update([
            ...skills,
            { category: '', name: '', level: '' }
        ]);
    };

    const removeSkill = (index) => {
        const next = [...skills];
        next.splice(index, 1);
        update(next);
    };

    return (
        <div className="animate-fade-in">
            <p style={{ fontSize: '0.9rem', color: 'var(--lp-text-muted)', marginBottom: '16px' }}>
                Add skills in short, scannable lines with a clear category. Level is optional.
            </p>

            {skills.map((skill, index) => (
                <div
                    key={index}
                    className="card"
                    style={{ marginBottom: '12px', padding: '12px 12px' }}
                >
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <select
                            className="form-input"
                            style={{ flex: '0 0 160px', minWidth: '140px' }}
                            value={skill.category || ''}
                            onChange={(e) => updateSkill(index, 'category', e.target.value)}
                        >
                            <option value="">Category</option>
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <input
                            className="form-input"
                            style={{ flex: '1 1 180px', minWidth: '160px' }}
                            placeholder="Skill name (e.g. React)"
                            value={skill.name || ''}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        />
                        <select
                            className="form-input"
                            style={{ flex: '0 0 150px', minWidth: '130px' }}
                            value={skill.level || ''}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                        >
                            <option value="">No level (optional)</option>
                            {LEVELS.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
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

            <button
                type="button"
                onClick={addSkill}
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
                + Add skill
            </button>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                Quick add:{' '}
                {[
                    { category: 'Languages', name: 'JavaScript' },
                    { category: 'Frameworks', name: 'React' },
                    { category: 'Tools', name: 'Git' },
                    { category: 'Soft skills', name: 'Communication' }
                ].map((s, idx) => (
                    <button
                        key={`${s.category}-${s.name}-${idx}`}
                        type="button"
                        onClick={() => {
                            update([
                                ...skills,
                                { category: s.category, name: s.name, level: '' }
                            ]);
                        }}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--lp-accent)',
                            cursor: 'pointer',
                            marginRight: '8px'
                        }}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Skills;
