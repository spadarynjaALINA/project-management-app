import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace={true} />;
  }
  return page;
};
