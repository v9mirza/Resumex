import React from 'react';

const Classic = ({ resume }) => {
    const { basics, education, experience, projects, skills, certifications, languages, achievements } = resume;

    return (
        <div style={{ fontFamily: 'Georgia, Times New Roman, serif', lineHeight: 1.5, color: '#000', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>

            {/* Header */}
            <header style={{ marginBottom: '32px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '24px' }}>
                <h1 style={{ fontSize: '28pt', fontWeight: 'bold', margin: '0 0 4px 0', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {basics.name}
                </h1>
                {basics.headline && (
                    <div style={{ fontSize: '11pt', fontStyle: 'italic', marginBottom: '6px' }}>
                        {basics.headline}
                    </div>
                )}
                <div style={{ fontSize: '10pt' }}>
                    {[basics.email, basics.phone, basics.location]
                        .filter(Boolean)
                        .join(' • ')}
                </div>
                <div style={{ fontSize: '9pt', marginTop: '4px' }}>
                    {basics.portfolio && (
                        <span>
                            <a href={basics.portfolio} style={{ color: '#1d4ed8', textDecoration: 'none' }}>
                                Portfolio
                            </a>
                            {Array.isArray(basics.links) && basics.links.some(l => l && l.url) && ' • '}
                        </span>
                    )}
                    {Array.isArray(basics.links) && basics.links.length > 0 && basics.links
                        .filter(l => l && l.url)
                        .map((l, idx) => (
                            <span key={l.url || idx}>
                                {idx > 0 && ' • '}
                                <a
                                    href={l.url}
                                    style={{ color: '#1d4ed8', textDecoration: 'none' }}
                                >
                                    {l.label || l.url}
                                </a>
                            </span>
                        ))}
                </div>
            </header>

            {/* Summary */}
            {basics.summary && (
                <section style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11pt', fontStyle: 'italic', maxWidth: '80%', margin: '0 auto' }}>
                        {basics.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Professional Experience
                    </h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{exp.company}</span>
                                <span>{exp.start} – {exp.end}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', marginBottom: '2px' }}>
                                {exp.role}
                                {exp.location && ` • ${exp.location}`}
                                {exp.employmentType && ` • ${exp.employmentType}`}
                            </div>
                            {exp.tech && (
                                <div style={{ fontSize: '9pt', marginBottom: '4px' }}>
                                    Tech: {exp.tech}
                                </div>
                            )}
                            <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                                {Array.isArray(exp.description) && exp.description.map((line, li) => (
                                    <li key={li}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Key Projects
                    </h3>
                    {projects.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ fontWeight: 'bold' }}>{proj.name}</div>
                            {proj.role && (
                                <div style={{ fontSize: '9pt', fontStyle: 'italic' }}>
                                    {proj.role}
                                </div>
                            )}
                            <div style={{ fontSize: '10pt', marginBottom: '4px' }}>{proj.description}</div>
                            {proj.tech && <div style={{ fontSize: '9pt', fontStyle: 'italic' }}>Stack: {proj.tech}</div>}
                            {(proj.github || proj.demo) && (
                                <div style={{ fontSize: '9pt', marginTop: '2px' }}>
                                    {proj.github && (
                                        <a href={proj.github} style={{ color: '#1d4ed8', textDecoration: 'none' }}>
                                            GitHub
                                        </a>
                                    )}
                                    {proj.github && proj.demo && ' • '}
                                    {proj.demo && (
                                        <a href={proj.demo} style={{ color: '#1d4ed8', textDecoration: 'none' }}>
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
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
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
                                <div style={{ fontSize: '9pt' }}>GPA: {edu.gpa}</div>
                            )}
                            {edu.coursework && (
                                <div style={{ fontSize: '9pt', color: '#4b5563' }}>
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
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Skills
                    </h3>
                    <div style={{ fontSize: '10pt' }}>
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
                <section>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Certifications
                    </h3>
                    {certifications.map((c, i) => (
                        <div key={i} style={{ marginBottom: '8px', fontSize: '10pt' }}>
                            <div>
                                <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                            </div>
                            {(c.date || c.url) && (
                                <div style={{ fontSize: '9pt' }}>
                                    {c.date && <span>{c.date}</span>}
                                    {c.date && c.url && ' • '}
                                    {c.url && (
                                        <a href={c.url} style={{ color: '#1d4ed8', textDecoration: 'none' }}>
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
                <section>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
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
                <section>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Achievements & Awards
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '10pt' }}>
                        {achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    );
};

export default Classic;
