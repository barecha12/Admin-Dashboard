import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

const defaultUser = {
  name: 'Alex Rivers',
  roles: ['admin', 'manager', 'support'], // seed roles for demo; adjust per real auth
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const value = useMemo(() => ({
    user,
    roles: user.roles || [],
    setRoles: (roles) => setUser((u) => ({ ...u, roles })),
    setUser,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
