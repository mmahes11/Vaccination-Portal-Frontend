import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors for request/response handling
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here (e.g., 401, 500)
        console.error('API error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;
