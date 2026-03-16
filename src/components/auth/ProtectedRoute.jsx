import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * RBAC route guard: renders children if user has one of the allowed roles.
 */
const ProtectedRoute = ({ allowed, children }) => {
  const { roles } = useAuth();
  const isAllowed = !allowed || allowed.some((role) => roles.includes(role));
  return isAllowed ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
