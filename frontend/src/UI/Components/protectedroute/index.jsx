import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userId");

  if (!user) {
    // Use Navigate component for navigation
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
