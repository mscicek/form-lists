import React, { createContext, useState, useContext } from 'react';

// 1. Context'i oluşturuyoruz
const AuthContext = createContext(null);

// 2. Provider Bileşenini oluşturuyoruz. Bu, tüm uygulamayı saracak.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Başlangıçta kullanıcı yok

  // Giriş yapıldığında çağrılacak fonksiyon
  const login = (userData) => {
    setUser(userData);
  };

  // Çıkış yapıldığında çağrılacak fonksiyon
  const logout = () => {
    setUser(null);
  };

  // Paylaşılacak değerler
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Context'i kolayca kullanmak için özel bir hook oluşturuyoruz
export const useAuth = () => {
  return useContext(AuthContext);
};