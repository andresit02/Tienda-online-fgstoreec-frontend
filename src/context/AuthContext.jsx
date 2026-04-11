import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Importante para cerrar sesión completamente

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al montar el componente
  useEffect(() => {
    // Busca en ambos almacenamientos
    const storedToken = localStorage.getItem('fgstore_token') || sessionStorage.getItem('fgstore_token');
    const storedUser = localStorage.getItem('fgstore_user') || sessionStorage.getItem('fgstore_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, authToken, rememberMe = true) => {
    setUser(userData);
    setToken(authToken);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('fgstore_token', authToken);
    storage.setItem('fgstore_user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fgstore_token');
    localStorage.removeItem('fgstore_user');
    sessionStorage.removeItem('fgstore_token');
    sessionStorage.removeItem('fgstore_user');
    await supabase.auth.signOut(); // Cerramos sesión en la bóveda de Supabase también
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};