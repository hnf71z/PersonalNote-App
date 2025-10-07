import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { authUser, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <p>Loading...</p>;
  }

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
