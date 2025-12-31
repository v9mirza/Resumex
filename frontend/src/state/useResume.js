import { useState, useEffect } from 'react';

const INITIAL_STATE = {
    basics: {
        name: '',
        email: '',
        phone: '',
        location: '',
        links: [] // { label, url }
    },
    education: [], // { institution, degree, start, end }
    experience: [], // { company, role, start, end, description }
    projects: [], // { name, description, tech }
    skills: [], // strings
    meta: {
        template: 'minimal' // 'minimal', 'classic', 'modern'
    }
};

const STORAGE_KEY = 'resumex_v1_data';

export const useResume = () => {
    const [resume, setResume] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : INITIAL_STATE;
        } catch (e) {
            console.error('Failed to load resume data', e);
            return INITIAL_STATE;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
        } catch (e) {
            console.error('Failed to save resume data', e);
        }
    }, [resume]);

    const updateBasics = (field, value) => {
        setResume(prev => ({
            ...prev,
            basics: { ...prev.basics, [field]: value }
        }));
    };

    const updateSection = (section, data) => {
        setResume(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const setTemplate = (templateId) => {
        setResume(prev => ({
            ...prev,
            meta: { ...prev.meta, template: templateId }
        }));
    };

    const resetResume = () => {
        setResume(INITIAL_STATE);
    };

    return {
        resume,
        updateBasics,
        updateSection,
        setTemplate,
        resetResume,
        setResume // Allow full replace if needed
    };
};
