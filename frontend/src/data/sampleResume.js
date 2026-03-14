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
        headline: 'Full Stack Engineer',
        portfolio: 'https://alexchen.dev',
        summary: 'Product-minded engineer with 5+ years building web apps and APIs. Focused on clarity, performance, and inclusive design. Previously at startups and scale-ups.',
        links: [
            { label: 'GitHub', url: 'https://github.com/alexchen' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/alexchen' }
        ]
    },
    education: [
        {
            institution: 'Stanford University',
            degree: 'B.S. Computer Science',
            start: '2015',
            end: '2019',
            gpa: '3.8/4.0',
            showGpa: true,
            coursework: 'Data Structures, Algorithms, Databases',
            status: 'Graduated'
        }
    ],
    experience: [
        {
            company: 'Tech Co',
            role: 'Senior Software Engineer',
            start: '2021',
            end: 'Present',
            location: 'San Francisco, CA',
            employmentType: 'Full-time',
            tech: 'React, Node.js, PostgreSQL',
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
            location: 'Remote',
            employmentType: 'Full-time',
            tech: 'TypeScript, GraphQL, AWS',
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
            role: 'Solo project',
            github: 'https://github.com/alexchen/cli-tool',
            demo: 'https://cli-tool.example.com',
            tech: 'Node.js, TypeScript'
        }
    ],
    skills: [
        { category: 'Languages', name: 'JavaScript', level: 'Advanced' },
        { category: 'Languages', name: 'TypeScript', level: 'Advanced' },
        { category: 'Frameworks', name: 'React', level: 'Advanced' },
        { category: 'Frameworks', name: 'Node.js', level: 'Advanced' },
        { category: 'Tools', name: 'PostgreSQL', level: 'Intermediate' },
        { category: 'Tools', name: 'AWS', level: 'Intermediate' }
    ],
    certifications: [
        {
            name: 'AWS Certified Solutions Architect – Associate',
            issuer: 'Amazon Web Services',
            date: '2023',
            url: ''
        }
    ],
    languages: [
        { name: 'English', level: 'Native' },
        { name: 'Mandarin', level: 'Professional' }
    ],
    achievements: [
        'Winner, XYZ Hackathon 2022',
        'Published blog series on scalable React architecture'
    ],
    meta: { template: 'minimal' }
};

export const STUDENT_SAMPLE = {
    basics: {
        name: 'Sara Mirza',
        email: 'sara.mirza@example.com',
        phone: '+1 (555) 987-6543',
        location: 'Toronto, ON',
        headline: 'Computer Science Student',
        portfolio: '',
        summary: 'Final-year CS student focused on web development and distributed systems. Looking for internships where I can ship real features and learn from senior engineers.',
        links: [
            { label: 'GitHub', url: 'https://github.com/saramirza' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/saramirza' }
        ]
    },
    education: [
        {
            institution: 'University of Toronto',
            degree: 'B.Sc. Computer Science',
            start: '2021',
            end: '2025',
            gpa: '3.7/4.0',
            showGpa: true,
            coursework: 'Data Structures, Algorithms, Databases, Operating Systems',
            status: 'In progress'
        }
    ],
    experience: [],
    projects: [
        {
            name: 'Course Planner Web App',
            description: 'Helps students plan degree requirements and avoid schedule conflicts. Used by 50+ classmates.',
            role: 'Team lead',
            github: '',
            demo: '',
            tech: 'React, TypeScript, Firebase'
        }
    ],
    skills: [
        { category: 'Languages', name: 'JavaScript', level: '' },
        { category: 'Languages', name: 'Python', level: '' },
        { category: 'Frameworks', name: 'React', level: '' },
        { category: 'Tools', name: 'Git', level: '' }
    ],
    certifications: [],
    languages: [
        { name: 'English', level: 'Fluent' },
        { name: 'Urdu', level: 'Native' }
    ],
    achievements: [
        'Dean’s List (top 10%) 2022–2024'
    ],
    meta: { template: 'minimal' }
};

export const JUNIOR_DEV_SAMPLE = {
    basics: {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+34 600 123 456',
        location: 'Madrid, Spain',
        headline: 'Junior Frontend Developer',
        portfolio: 'https://miguelsantos.dev',
        summary: 'Junior frontend developer with a focus on accessible, responsive UIs. Comfortable with React and TypeScript, and experienced working closely with designers.',
        links: [
            { label: 'GitHub', url: 'https://github.com/miguelsantos' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/miguelsantos' }
        ]
    },
    education: [
        {
            institution: 'Universidad Politécnica de Madrid',
            degree: 'B.Eng. Software Engineering',
            start: '2018',
            end: '2022',
            gpa: '',
            showGpa: false,
            coursework: 'Web Development, Human-Computer Interaction, Software Engineering',
            status: 'Graduated'
        }
    ],
    experience: [
        {
            company: 'Design Studio',
            role: 'Frontend Developer Intern',
            start: '2022',
            end: '2023',
            location: 'Remote',
            employmentType: 'Internship',
            tech: 'React, TypeScript, Tailwind CSS',
            description: [
                'Implemented responsive marketing pages and UI components for client projects.',
                'Collaborated with designers to refine interactions and accessibility states.'
            ]
        }
    ],
    projects: [
        {
            name: 'Personal Portfolio',
            description: 'Showcases projects and blog posts, with light/dark mode and i18n.',
            role: 'Solo project',
            github: '',
            demo: 'https://miguelsantos.dev',
            tech: 'Next.js, TypeScript, Tailwind CSS'
        }
    ],
    skills: [
        { category: 'Languages', name: 'JavaScript', level: '' },
        { category: 'Languages', name: 'TypeScript', level: '' },
        { category: 'Frameworks', name: 'React', level: '' },
        { category: 'Frameworks', name: 'Next.js', level: '' },
        { category: 'Tools', name: 'Git', level: '' },
        { category: 'Soft skills', name: 'Communication', level: '' }
    ],
    certifications: [],
    languages: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'Professional' }
    ],
    achievements: [],
    meta: { template: 'minimal' }
};
