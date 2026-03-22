import axios from 'axios';

import { AUTH_TOKEN_KEY, AUTH_USERNAME_KEY } from '../hooks/useAuth';

const api = axios.create({
  baseURL: '/api/v1',
});

// Interceptor для автоматической установки токена в каждый запрос
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token, username) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USERNAME_KEY, username);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USERNAME_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
