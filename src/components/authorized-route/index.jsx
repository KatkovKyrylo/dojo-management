import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthorizedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export { AuthorizedRoute };
