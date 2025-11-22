import { createContext, useState, useEffect } from "react";
import { authService } from "../api/authConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const storedUser = authService.getUser();
		if (storedUser) {
			setUser(storedUser);
		}
	}, []);

	const signup = async (userData) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.signup(userData);
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser(data.user);
			return data;
		} catch (err) {
			const errorMessage = err.response?.data?.message || "Signup failed";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.login(credentials);
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser(data.user);
			return data;
		} catch (err) {
			const errorMessage = err.response?.data?.message || "Login failed";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		authService.logout();
		setUser(null);
		setError(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				signup,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
