import axios from 'axios';
import profileStore from '../store/profileStore';
import { BASE_URL } from '../config/apiConfig';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
// Request interceptor for adding token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = profileStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;