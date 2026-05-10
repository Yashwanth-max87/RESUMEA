import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    if (stored === 'demo-token') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    return stored;
  });
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    async login(payload) {
      const { data } = await api.post('/auth/login', payload);
      localStorage.removeItem('activeResume');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    },
    async register(payload) {
      const { data } = await api.post('/auth/register', payload);
      localStorage.removeItem('activeResume');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
