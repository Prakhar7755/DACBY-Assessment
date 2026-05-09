import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_MODE === 'development' ? import.meta.env.VITE_API_BASE_URL : '/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;
