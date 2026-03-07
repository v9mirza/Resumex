import React from 'react';
import Basics from './steps/Basics';
import About from './steps/About';
import Education from './steps/Education';
import Experience from './steps/Experience';
import Projects from './steps/Projects';
import Skills from './steps/Skills';
import Template from './steps/Template';

const Editor = ({ step, resume, updateBasics, setSection, setTemplate, errors = {} }) => {
    switch (step) {
        case 'basics':
            return <Basics data={resume.basics} update={updateBasics} errors={errors} />;
        case 'about':
            return <About data={resume.basics} update={updateBasics} />;
        case 'education':
            return <Education data={resume.education} update={(data) => setSection('education', data)} />;
        case 'experience':
            return <Experience data={resume.experience} update={(data) => setSection('experience', data)} errors={errors} />;
        case 'projects':
            return <Projects data={resume.projects} update={(data) => setSection('projects', data)} />;
        case 'skills':
            return <Skills data={resume.skills} update={(data) => setSection('skills', data)} />;
        case 'template':
            return <Template current={resume.meta.template} select={setTemplate} />;
        default:
            return <div>Unknown step</div>;
    }
};

export default Editor;

