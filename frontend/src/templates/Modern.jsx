import React from 'react';

const Modern = ({ resume }) => {
    const { basics, education, experience, projects, skills } = resume;

    return (
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: 1.4, color: '#000', display: 'flex', height: '100%', minHeight: '100vh' }}>

            {/* Sidebar */}
            <aside style={{ width: '30%', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                <header style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '20pt', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
                        {basics.name?.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                    </h1>
                    <div style={{ fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '8px', color: '#444' }}>
                        {basics.email && <span>{basics.email}</span>}
                        {basics.phone && <span>{basics.phone}</span>}
                        {basics.location && <span>{basics.location}</span>}
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
                                <div style={{ color: '#666' }}>{edu.start} – {edu.end}</div>
                            </div>
                        ))}
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <h4 style={{ fontSize: '10pt', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '12px' }}>
                            Skills
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {skills.map((skill, i) => (
                                <span key={i} style={{ fontSize: '9pt', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                                    {skill}
                                </span>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#444', marginBottom: '8px' }}>
                                    <span>{exp.company}</span>
                                    <span>{exp.start} – {exp.end}</span>
                                </div>
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
                                <div style={{ fontSize: '10pt', marginBottom: '4px' }}>{proj.description}</div>
                                {proj.tech && <div style={{ fontSize: '9pt', color: '#666' }}>{proj.tech}</div>}
                            </div>
                        ))}
                    </section>
                )}
            </main>

        </div>
    );
};

export default Modern;
