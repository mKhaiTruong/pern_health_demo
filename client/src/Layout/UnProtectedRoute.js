import React from "react";
import { Navigate } from "react-router-dom";

const UnprotectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <Navigate to="/health/add-health-check" /> : children;
};

export default UnprotectedRoute;
