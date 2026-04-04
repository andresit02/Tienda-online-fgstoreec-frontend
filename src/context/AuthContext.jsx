import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem('fgstore_token');
    const storedUser = localStorage.getItem('fgstore_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, authToken, rememberMe = false) => {
    setUser(userData);
    setToken(authToken);

    if (rememberMe) {
      localStorage.setItem('fgstore_token', authToken);
      localStorage.setItem('fgstore_user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('fgstore_token', authToken);
      sessionStorage.setItem('fgstore_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fgstore_token');
    localStorage.removeItem('fgstore_user');
    sessionStorage.removeItem('fgstore_token');
    sessionStorage.removeItem('fgstore_user');
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
