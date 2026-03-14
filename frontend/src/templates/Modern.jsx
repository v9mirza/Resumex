import React from 'react';

const Modern = ({ resume }) => {
    const { basics, education, experience, projects, skills, certifications, languages, achievements } = resume;

    return (
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: 1.4, color: '#000', display: 'flex', height: '100%', minHeight: '100vh', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>

            {/* Sidebar */}
            <aside style={{ width: '32%', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                <header style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '20pt', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
                        {basics.name?.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                    </h1>
                    {basics.headline && (
                        <div style={{ fontSize: '9pt', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {basics.headline}
                        </div>
                    )}
                    <div style={{ fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '8px', color: '#444' }}>
                        {basics.email && <span>{basics.email}</span>}
                        {basics.phone && <span>{basics.phone}</span>}
                        {basics.location && <span>{basics.location}</span>}
                        {basics.portfolio && (
                            <a href={basics.portfolio} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '9pt' }}>
                                Portfolio
                            </a>
                        )}
                        {Array.isArray(basics.links) && basics.links.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                                {basics.links
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
                        )}
                    </div>
                </header>

                {education.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <h4 style={{ fontSize: '10pt', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '12px' }}>
                            Education
                        </h4>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '16px', fontSize: '9pt' }}>
                                <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
                                <div>{edu.degree}</div>
                                <div style={{ color: '#666' }}>
                                    {edu.start} – {edu.end}
                                    {edu.status && ` • ${edu.status}`}
                                </div>
                                {(edu.gpa && edu.showGpa !== false) && (
                                    <div style={{ color: '#4b5563' }}>GPA: {edu.gpa}</div>
                                )}
                                {edu.coursework && (
                                    <div style={{ color: '#4b5563' }}>Coursework: {edu.coursework}</div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {Array.isArray(skills) && skills.length > 0 && (
                    <section style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '10pt', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '12px' }}>
                            Skills
                        </h4>
                        <div style={{ fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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

                {Array.isArray(certifications) && certifications.length > 0 && (
                    <section style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '10pt', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '12px' }}>
                            Certifications
                        </h4>
                        <div style={{ fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {certifications.map((c, i) => (
                                <div key={i}>
                                    <div>
                                        <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                                    </div>
                                    {(c.date || c.url) && (
                                        <div style={{ color: '#4b5563' }}>
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
                        </div>
                    </section>
                )}

                {Array.isArray(languages) && languages.length > 0 && (
                    <section>
                        <h4 style={{ fontSize: '10pt', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '12px' }}>
                            Languages
                        </h4>
                        <div style={{ fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {languages.map((lang, i) => (
                                <div key={i}>
                                    {lang.name}{lang.level && ` — ${lang.level}`}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, paddingLeft: '24px' }}>
                {basics.summary && (
                    <section style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '14pt', fontWeight: 900, marginBottom: '12px', letterSpacing: '1px' }}>
                            SUMMARY
                        </h3>
                        <p style={{ margin: 0, fontSize: '10pt', lineHeight: 1.5 }}>{basics.summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '14pt', fontWeight: 900, marginBottom: '20px', letterSpacing: '1px' }}>
                            EXPERIENCE
                        </h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '2px' }}>{exp.role}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#444', marginBottom: '4px' }}>
                                    <span>
                                        {exp.company}
                                        {exp.location && ` • ${exp.location}`}
                                        {exp.employmentType && ` • ${exp.employmentType}`}
                                    </span>
                                    <span>{exp.start} – {exp.end}</span>
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
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {projects.length > 0 && (
                    <section>
                        <h3 style={{ fontSize: '14pt', fontWeight: 900, marginBottom: '16px', letterSpacing: '1px' }}>
                            PROJECTS
                        </h3>
                        {projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>{proj.name}</div>
                                {proj.role && (
                                    <div style={{ fontSize: '9pt', color: '#4b5563', marginBottom: '2px' }}>
                                        {proj.role}
                                    </div>
                                )}
                                <div style={{ fontSize: '10pt', marginBottom: '4px' }}>{proj.description}</div>
                                {proj.tech && <div style={{ fontSize: '9pt', color: '#666' }}>{proj.tech}</div>}
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

                {Array.isArray(achievements) && achievements.length > 0 && (
                    <section>
                        <h3 style={{ fontSize: '14pt', fontWeight: 900, marginBottom: '16px', letterSpacing: '1px' }}>
                            ACHIEVEMENTS & AWARDS
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10pt' }}>
                            {achievements.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>

        </div>
    );
};

export default Modern;
