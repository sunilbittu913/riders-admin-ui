import axios from 'axios';

// In development, use relative URLs so CRA proxy can avoid CORS.
// In production builds, use the configured absolute base URL.
const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_BASE_URL || '');

// Simple token storage (localStorage key)
const TOKEN_KEY = 'auth_token';
export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t || ''),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach Authorization header if token present
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally (optional: clear token)
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      tokenStore.clear();
    }
    return Promise.reject(error);
  }
);

export default api;
