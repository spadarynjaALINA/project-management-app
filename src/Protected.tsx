import React from 'react';
import { Navigate } from 'react-router-dom';

export const Protected = ({ page }: { page: JSX.Element }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace={true} />;
  }
  return page;
};
