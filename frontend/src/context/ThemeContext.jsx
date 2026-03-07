import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        const stored = window.localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored;
        // Prefer OS setting on first load
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return ctx;
};

