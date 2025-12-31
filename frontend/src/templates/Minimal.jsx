import React from 'react';

const Minimal = ({ resume }) => {
    const { basics, education, experience, projects, skills } = resume;

    return (
        <div style={{ fontFamily: 'var(--font-main)', lineHeight: 1.5, color: '#000' }}>
            {/* Header */}
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32pt', fontWeight: 700, letterSpacing: '-1px', margin: '0 0 16px 0', lineHeight: 1 }}>
                    {basics.name}
                </h1>
                <div style={{ fontSize: '10pt', display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#444' }}>
                    {basics.email && <span>{basics.email}</span>}
                    {basics.phone && <span>{basics.phone}</span>}
                    {basics.location && <span>{basics.location}</span>}
                    {basics.links && basics.links.map(l => <span key={l.url}>{l.label}</span>)}
                </div>
            </header>

            {/* Summary */}
            {basics.summary && (
                <section style={{ marginBottom: '24px' }}>
                    <p style={{ margin: 0, fontSize: '10pt' }}>{basics.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
                        Experience
                    </h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <h4 style={{ margin: 0, fontSize: '11pt', fontWeight: 600 }}>{exp.company}</h4>
                                <span style={{ fontSize: '10pt', color: '#666' }}>{exp.start} – {exp.end}</span>
                            </div>
                            <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '8px' }}>{exp.role}</div>
                            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10pt' }}>
                                {Array.isArray(exp.description) && exp.description.map((line, li) => (
                                    <li key={li} style={{ marginBottom: '4px' }}>{line}</li>
                                ))}
                                {typeof exp.description === 'string' && <li>{exp.description}</li>}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
                        Projects
                    </h3>
                    {projects.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <h4 style={{ margin: 0, fontSize: '11pt', fontWeight: 600 }}>{proj.name}</h4>
                            </div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '10pt' }}>{proj.description}</p>
                            {proj.tech && <div style={{ fontSize: '9pt', color: '#666', fontFamily: 'monospace' }}>Tech: {proj.tech}</div>}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
                        Education
                    </h3>
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{edu.institution}</strong>
                                <span>{edu.start} – {edu.end}</span>
                            </div>
                            <div>{edu.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
                        Skills
                    </h3>
                    <div style={{ fontSize: '10pt', lineHeight: 1.6 }}>
                        {skills.map((skill, i) => (
                            <span key={i} style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>
                                {skill}{i < skills.length - 1 ? ' •' : ''}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Minimal;
