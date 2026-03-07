/**
 * Sample resume data for "Load example" in Builder.
 * Users can overwrite any field.
 */
export const SAMPLE_RESUME = {
    basics: {
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        summary: 'Product-minded engineer with 5+ years building web apps and APIs. Focused on clarity, performance, and inclusive design. Previously at startups and scale-ups.',
        links: []
    },
    education: [
        { institution: 'Stanford University', degree: 'B.S. Computer Science', start: '2015', end: '2019' }
    ],
    experience: [
        {
            company: 'Tech Co',
            role: 'Senior Software Engineer',
            start: '2021',
            end: 'Present',
            description: [
                'Led migration of core product to a new stack, improving load time by 40%.',
                'Shipped real-time collaboration features used by 10k+ teams.',
                'Mentored 3 engineers and established front-end standards.'
            ]
        },
        {
            company: 'Startup Inc',
            role: 'Full Stack Developer',
            start: '2019',
            end: '2021',
            description: [
                'Built and maintained customer dashboard and public API.',
                'Reduced API error rate by 25% through better validation and monitoring.'
            ]
        }
    ],
    projects: [
        {
            name: 'Open Source CLI Tool',
            description: 'Developer tool for local workflows. 2k+ GitHub stars, used by several companies.',
            tech: 'Node.js, TypeScript'
        }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'System design'],
    meta: { template: 'minimal' }
};
