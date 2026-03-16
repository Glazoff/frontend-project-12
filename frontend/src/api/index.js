import axios from 'axios';

import { AUTH_TOKEN_KEY } from '../hooks/useAuth';

const api = axios.create({
  baseURL: '/api/v1',
});

// Устанавливаем токен при инициализации приложения
const token = localStorage.getItem(AUTH_TOKEN_KEY);
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
