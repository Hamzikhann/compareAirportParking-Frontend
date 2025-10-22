import React from "react";
import { Navigate } from "react-router-dom";
// import useUserStore from "../store/userStore";
import { getSessionUser } from "../services/AuthService";
const ProtectedRoute = ({ children }) => {
	let user = getSessionUser();
	if (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin") {
		return children;
	}

	return <Navigate to="/adminLogin" replace />;
};

export default ProtectedRoute;
