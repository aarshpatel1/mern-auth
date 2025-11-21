import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../api/authConfig";

export const AuthContext = createContext(null);

const decodeJwt = (token) => {
	if (!token) return null;
	try {
		const payload = token.split(".")[1];
		if (!payload) return null;
		return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
	} catch {
		return null;
	}
};

const isExpired = (token) => {
	const payload = decodeJwt(token);
	if (!payload?.exp) return false;
	return Date.now() >= payload.exp * 1000;
};

export function AuthProvider({ children }) {
	const [token, setToken] = useState(authService.getToken());
	const [user, setUser] = useState(authService.getUser());
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const persist = (t, u) => {
		if (t) localStorage.setItem("token", t);
		if (u) localStorage.setItem("user", JSON.stringify(u));
	};

	const clearPersisted = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	const logout = useCallback(() => {
		clearPersisted();
		setToken(null);
		setUser(null);
		setError("");
	}, []);

	const signup = async (formData) => {
		setLoading(true);
		setError("");
		try {
			const data = await authService.signup(formData);
			if (!data?.token || !data?.user)
				throw new Error("Invalid signup response.");
			setToken(data.token);
			setUser(data.user);
			persist(data.token, data.user);
			return data;
		} catch (e) {
			setError(e.message || "Signup failed.");
			throw e;
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials) => {
		setLoading(true);
		setError("");
		try {
			const data = await authService.login(credentials);
			if (!data?.token || !data?.user)
				throw new Error("Invalid login response.");
			setToken(data.token);
			setUser(data.user);
			persist(data.token, data.user);
			return data;
		} catch (e) {
			setError(e.message || "Login failed.");
			throw e;
		} finally {
			setLoading(false);
		}
	};

	const refreshProfile = useCallback(async () => {
		if (!token) return;
		if (isExpired(token)) {
			logout();
			return;
		}
		setLoading(true);
		try {
			const data = await authService.getProfile();
			if (data?.user) {
				setUser(data.user);
				persist(token, data.user);
			}
		} catch (e) {
			if (e?.response?.status === 401) {
				logout();
			}
		} finally {
			setLoading(false);
		}
	}, [token, logout]);

	// Initial load
	useEffect(() => {
		if (token && !user) {
			refreshProfile();
		} else if (token && isExpired(token)) {
			logout();
		}
	}, [token, user, refreshProfile, logout]);

	// Cross-tab sync
	useEffect(() => {
		const handleStorage = () => {
			const newToken = authService.getToken();
			const newUser = authService.getUser();
			setToken(newToken);
			setUser(newUser);
			if (newToken && isExpired(newToken)) logout();
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, [logout]);

	const value = {
		token,
		user,
		loading,
		error,
		login,
		signup,
		logout,
		refreshProfile,
		isAuthenticated: !!token && !!user && !isExpired(token),
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
