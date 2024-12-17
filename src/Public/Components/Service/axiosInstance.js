import axios from 'axios';
import { BASE_URL_SERVER } from '../config/server';

const axiosInstance = axios.create({
    baseURL: BASE_URL_SERVER,
    headers: {
        'content-type': 'application/json'
    }
});

// Thêm token vào request header nếu tồn tại
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
