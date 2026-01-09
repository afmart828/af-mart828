import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shophub_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('shophub_user');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shophub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shophub_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('shophub_token', userData.token || 'dummy_token');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('shophub_user');
    localStorage.removeItem('shophub_token');
  };

  const updateUser = (updates) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updates
    }));
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('shophub_token', 'dummy_token');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};