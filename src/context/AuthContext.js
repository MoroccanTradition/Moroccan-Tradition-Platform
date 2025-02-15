import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get('/api/user');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const { data } = await axios.post('/api/login', credentials);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = async () => {
    await axios.post('/api/logout');
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    const { data } = await axios.post('/api/register', userData);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);