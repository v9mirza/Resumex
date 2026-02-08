import React, { createContext, useContext, useState } from 'react';

const INITIAL_STATE = {
    basics: {
        name: '',
        email: '',
        phone: '',
        location: '',
        links: []
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    meta: {
        template: 'minimal'
    }
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [resume, setResume] = useState(INITIAL_STATE);

    const updateBasics = (field, value) => {
        setResume(prev => ({
            ...prev,
            basics: { ...prev.basics, [field]: value }
        }));
    };

    const updateSection = (section, id, data) => {
        setResume(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === id ? { ...item, ...data } : item)
        }));
    };

    const setSection = (section, data) => {
        setResume(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const setTemplate = (templateId) => {
        setResume(prev => ({ ...prev, meta: { ...prev.meta, template: templateId } }));
    };

    const resetResume = () => {
        setResume(INITIAL_STATE);
    };

    const value = {
        resume,
        updateBasics,
        updateSection,
        setSection,
        setTemplate,
        resetResume,
        setResume
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
