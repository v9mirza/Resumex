import React from 'react';

const Classic = ({ resume }) => {
    const { basics, education, experience, projects, skills } = resume;

    return (
        <div style={{ fontFamily: 'Georgia, Times New Roman, serif', lineHeight: 1.5, color: '#000' }}>

            {/* Header */}
            <header style={{ marginBottom: '32px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '24px' }}>
                <h1 style={{ fontSize: '28pt', fontWeight: 'bold', margin: '0 0 12px 0' }}>
                    {basics.name}
                </h1>
                <div style={{ fontSize: '10pt' }}>
                    {basics.email} • {basics.phone} • {basics.location}
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
                            <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>{exp.role}</div>
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
                            <div style={{ fontSize: '10pt', marginBottom: '4px' }}>{proj.description}</div>
                            {proj.tech && <div style={{ fontSize: '9pt', fontStyle: 'italic' }}>Stack: {proj.tech}</div>}
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
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '12px' }}>
                        Skills
                    </h3>
                    <div style={{ fontSize: '10pt' }}>
                        {skills.join(', ')}
                    </div>
                </section>
            )}

        </div>
    );
};

export default Classic;
