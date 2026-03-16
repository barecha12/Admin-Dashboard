import React from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Conditional render based on allowed roles.
 */
const Can = ({ allowed, children }) => {
  const { roles } = useAuth();
  if (!allowed || allowed.some((role) => roles.includes(role))) return children;
  return null;
};

export default Can;
