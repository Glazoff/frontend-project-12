import api from './index';

export const login = ({ name, password }) =>
  api.post('/login', { username: name, password }).then((response) => response.data);

export const signup = ({ name, password }) =>
  api.post('/signup', { username: name, password }).then((response) => response.data);
