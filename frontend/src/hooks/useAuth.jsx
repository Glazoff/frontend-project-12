export const AUTH_TOKEN_KEY = 'token';

export function useAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  return { token };
}
