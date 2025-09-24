import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// roles is optional array of allowed roles
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // not logged in
    return <Navigate to="/signin" replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    // logged in but not authorized
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
