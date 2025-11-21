import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localError, setLocalError] = useState("");
	const navigate = useNavigate();
	const { login, loading, error } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLocalError("");
		if (!email.trim() || !password) {
			setLocalError("Email and password are required.");
			return;
		}
		try {
			await login({
				email: email.trim().toLowerCase(),
				password,
			});
			navigate("/dashboard");
		} catch {
			// context error shown
		}
	};

	const handleReset = () => {
		setEmail("");
		setPassword("");
		setLocalError("");
	};

	return (
		<main
			className="d-flex align-items-center justify-content-center"
			id="form-container"
		>
			<form
				className="border border-1 border-light-subtle p-4 rounded-3 shadow"
				onSubmit={handleSubmit}
				onReset={handleReset}
				noValidate
			>
				<h1 className="text-center h3 mb-3">Login</h1>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={loading}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={loading}
						required
					/>
				</div>
				<div className="d-flex align-items-center justify-content-center gap-3">
					<button
						type="reset"
						className="btn btn-outline-secondary mt-2"
						disabled={loading}
					>
						Reset
					</button>
					<button
						type="submit"
						className="btn btn-dark bg-secondary-subtle border border-1 border-light-subtle mt-2"
						disabled={loading}
					>
						{loading ? "Authenticating..." : "Login"}
					</button>
				</div>
				<p className="mt-3 mb-0">
					If you haven't signed up yet then{" "}
					<Link to="/signup">Signup</Link>
				</p>
				{(error || localError) && (
					<div className="alert alert-danger mt-3 mb-0" role="alert">
						{localError && <div>{localError}</div>}
						{error && <div>{error}</div>}
					</div>
				)}
			</form>
		</main>
	);
}
