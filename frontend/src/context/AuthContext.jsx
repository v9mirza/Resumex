/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    // Loading is not needed for synchronous local storage check

    const login = async (formData) => {
        try {
            const { data } = await api.login(formData);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true, user: data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await api.register(formData);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true, user: data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
