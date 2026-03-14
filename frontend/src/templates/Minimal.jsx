import React from 'react';

const Minimal = ({ resume }) => {
    const { basics, education, experience, projects, skills, certifications, languages, achievements } = resume;
    const name = basics.name || '';
    const isLongName = name.length > 28;

    return (
        <div style={{ fontFamily: 'var(--font-main)', lineHeight: 1.5, color: '#000', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            {/* Header */}
            <header style={{ marginBottom: '32px' }}>
                <h1
                    style={{
                        fontSize: isLongName ? '26pt' : '32pt',
                        fontWeight: 700,
                        letterSpacing: '-1px',
                        margin: '0 0 16px 0',
                        lineHeight: 1.05,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                >
                    {name}
                </h1>
                {basics.headline && (
                    <div style={{ fontSize: '11pt', color: '#374151', marginBottom: '4px' }}>
                        {basics.headline}
                    </div>
                )}
                <div style={{ fontSize: '10pt', display: 'flex', flexWrap: 'wrap', gap: '12px', color: '#444' }}>
                    {basics.email && <span>{basics.email}</span>}
                    {basics.phone && <span>{basics.phone}</span>}
                    {basics.location && <span>{basics.location}</span>}
                    {basics.portfolio && (
                        <a href={basics.portfolio} style={{ color: '#2563eb', textDecoration: 'none' }}>
                            Portfolio
                        </a>
                    )}
                    {Array.isArray(basics.links) && basics.links
                        .filter(l => l && l.url)
                        .map((l, idx) => (
                            <a
                                key={l.url || idx}
                                href={l.url}
                                style={{ color: '#2563eb', textDecoration: 'none' }}
                            >
                                {l.label || l.url}
                            </a>
                        ))}
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                <h4 style={{ margin: 0, fontSize: '11pt', fontWeight: 600 }}>{exp.company}</h4>
                                <span style={{ fontSize: '10pt', color: '#666' }}>{exp.start} – {exp.end}</span>
                            </div>
                            <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '2px' }}>
                                {exp.role}
                                {exp.location && ` • ${exp.location}`}
                                {exp.employmentType && ` • ${exp.employmentType}`}
                            </div>
                            {exp.tech && (
                                <div style={{ fontSize: '9pt', color: '#4b5563', marginBottom: '4px' }}>
                                    Tech: {exp.tech}
                                </div>
                            )}
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                <h4 style={{ margin: 0, fontSize: '11pt', fontWeight: 600 }}>{proj.name}</h4>
                            </div>
                            {proj.role && (
                                <div style={{ fontSize: '9pt', color: '#4b5563', marginBottom: '2px' }}>
                                    {proj.role}
                                </div>
                            )}
                            <p style={{ margin: '0 0 4px 0', fontSize: '10pt' }}>{proj.description}</p>
                            {proj.tech && <div style={{ fontSize: '9pt', color: '#666' }}>Tech: {proj.tech}</div>}
                            {(proj.github || proj.demo) && (
                                <div style={{ fontSize: '9pt', marginTop: '2px' }}>
                                    {proj.github && (
                                        <a href={proj.github} style={{ color: '#2563eb', textDecoration: 'none' }}>
                                            GitHub
                                        </a>
                                    )}
                                    {proj.github && proj.demo && ' • '}
                                    {proj.demo && (
                                        <a href={proj.demo} style={{ color: '#2563eb', textDecoration: 'none' }}>
                                            Live demo
                                        </a>
                                    )}
                                </div>
                            )}
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
                                <span>
                                    {edu.start} – {edu.end}
                                    {edu.status && ` • ${edu.status}`}
                                </span>
                            </div>
                            <div>{edu.degree}</div>
                            {(edu.gpa && edu.showGpa !== false) && (
                                <div style={{ fontSize: '9pt', color: '#4b5563' }}>GPA: {edu.gpa}</div>
                            )}
                            {edu.coursework && (
                                <div style={{ fontSize: '9pt', color: '#4b5563', marginTop: '2px' }}>
                                    Coursework: {edu.coursework}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {Array.isArray(skills) && skills.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
                        Skills
                    </h3>
                    <div style={{ fontSize: '10pt', lineHeight: 1.6 }}>
                        {skills.map((skill, i) => (
                            <div key={i}>
                                <strong>{skill.category || 'Other'}: </strong>
                                {skill.name}
                                {skill.level && ` (${skill.level})`}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {Array.isArray(certifications) && certifications.length > 0 && (
                <section style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>
                        Certifications
                    </h3>
                    {certifications.map((c, i) => (
                        <div key={i} style={{ marginBottom: '6px', fontSize: '10pt' }}>
                            <div>
                                <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                            </div>
                            {(c.date || c.url) && (
                                <div style={{ fontSize: '9pt', color: '#4b5563' }}>
                                    {c.date && <span>{c.date}</span>}
                                    {c.date && c.url && ' • '}
                                    {c.url && (
                                        <a href={c.url} style={{ color: '#2563eb', textDecoration: 'none' }}>
                                            Credential
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Languages */}
            {Array.isArray(languages) && languages.length > 0 && (
                <section style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>
                        Languages
                    </h3>
                    <div style={{ fontSize: '10pt' }}>
                        {languages.map((lang, i) => (
                            <div key={i}>
                                {lang.name}{lang.level && ` — ${lang.level}`}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {Array.isArray(achievements) && achievements.length > 0 && (
                <section style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>
                        Achievements & Awards
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10pt' }}>
                        {achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default Minimal;
