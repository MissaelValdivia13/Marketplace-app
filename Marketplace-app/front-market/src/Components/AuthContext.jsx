import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario

  const login = (userData) => {
    setUser(userData); // Establecer el usuario autenticado
    console.log('Usuario autenticado:', userData);
  };

  const logout = () => {
    setUser(null); // Limpiar el usuario al cerrar sesión
    console.log('Usuario desautenticado.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
