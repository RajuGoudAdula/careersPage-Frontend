// File: src/api/axiosInstance.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // ✅ Add your backend base URL
const BACKEND_URL = 'https://careerspage-backend.onrender.com';

const getToken = () => localStorage.getItem('adminToken');

// ✅ Create Axios Instance
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15s timeout
});

// ✅ Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle Unauthorized / Server Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject({ message: 'Network Error' });
    }

    if (error.response.status === 401) {
      console.warn('Unauthorized or token expired.');
      const token = getToken();
      localStorage.removeItem('adminToken');
      if(token){
        window.location.href = '/admin/login';
      }else{
        window.location.href = '/';
      }
    }

    return Promise.reject(error.response.data || error);
  }
);

export default axiosInstance;
