import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  
  const authAction = async (type, formData) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/${type}`, formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'ஏதோ தவறு நடந்துள்ளது!' };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authAction, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};