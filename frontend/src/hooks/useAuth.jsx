import { AUTH_TOKEN_KEY, AUTH_USERNAME_KEY } from '../constants';

export function useAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const username = localStorage.getItem(AUTH_USERNAME_KEY);

  return { token, username };
}
