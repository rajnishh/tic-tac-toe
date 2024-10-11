import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);  // Get the token from Redux state

  return token ? <Navigate to="/" /> : children;  // If token exists, redirect to Home, otherwise render the public component
};

export default PublicRoute;
