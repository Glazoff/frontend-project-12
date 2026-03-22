export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USERNAME_KEY = 'username';

export function useAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const username = localStorage.getItem(AUTH_USERNAME_KEY);

  return { token, username };
}
