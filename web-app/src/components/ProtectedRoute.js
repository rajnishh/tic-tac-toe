import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);  // Get the token from the Redux state

  return token ? children : <Navigate to="/login" />;  // If token exists, render the protected component, otherwise redirect to login
};

export default ProtectedRoute;
