import axios from 'axios';

// Ensure "export const api" is written exactly like this
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor to inject JWT into request headers on every call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})