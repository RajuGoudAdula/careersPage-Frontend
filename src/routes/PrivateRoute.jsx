// File: src/pages/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { token, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Checking access...</div>;
  }

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
