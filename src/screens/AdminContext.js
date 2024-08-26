// src/context/AdminContext.js
import React, { createContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Administrador Teste',
    email: 'admin@teste.com',
  });

  return (
    <AdminContext.Provider value={{ adminInfo, setAdminInfo }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
