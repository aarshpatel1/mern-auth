import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) {
		return <div className="text-center mt-5">Loading...</div>;
	}
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return children ? children : <Outlet />;
}
