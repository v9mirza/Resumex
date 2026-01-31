import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Make sure this matches your backend port
});

// Add a request interceptor to attach the Token
API.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const updateProfile = (data) => API.put('/auth/profile', data);
export const deleteAccount = () => API.delete('/auth/profile');
export const getResumes = () => API.get('/resumes');
export const getResume = (id) => API.get(`/resumes/${id}`);
export const createResume = (resumeData) => API.post('/resumes', resumeData);
export const updateResume = (id, resumeData) => API.put(`/resumes/${id}`, resumeData);
export const deleteResume = (id) => API.delete(`/resumes/${id}`);

// Admin Routes
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminUsers = () => API.get('/admin/users');
export const getAdminResumes = () => API.get('/admin/resumes');
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export default API;
