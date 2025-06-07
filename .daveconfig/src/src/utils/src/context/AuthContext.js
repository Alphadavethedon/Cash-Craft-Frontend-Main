import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const { data } = await login({ email, password });
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };

  const signUp = async (email, password, phone, nationalId) => {
    const { data } = await register({ email, password, phone, nationalId });
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};