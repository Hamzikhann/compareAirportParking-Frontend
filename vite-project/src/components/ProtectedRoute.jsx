import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoute = ({ children }) => {
  const { user, token, isLoggedIn } = useUserStore();

  if (
    isLoggedIn &&
    (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin")
  ) {
    return children;
  }

  return <Navigate to="/adminLogin" replace />;
};

export default ProtectedRoute;
