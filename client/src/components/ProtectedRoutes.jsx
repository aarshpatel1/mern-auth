// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
	const { user, token } = useContext(AuthContext);

	// If no token or user, redirect to login
	if (!token || !user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
