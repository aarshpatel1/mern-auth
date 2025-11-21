import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formErrors, setFormErrors] = useState([]);
	const navigate = useNavigate();
	const { signup, loading, error } = useContext(AuthContext);

	const validate = () => {
		const errs = [];
		if (!username.trim()) errs.push("Username is required.");
		if (username.trim().length < 3)
			errs.push("Username must be at least 3 characters.");
		if (!emailRegex.test(email)) errs.push("Invalid email.");
		if (password.length < 8)
			errs.push("Password must be at least 8 characters.");
		if (password !== confirmPassword) errs.push("Passwords do not match.");
		return errs;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors([]);
		const errs = validate();
		if (errs.length) {
			setFormErrors(errs);
			return;
		}
		try {
			await signup({
				username: username.trim(),
				email: email.trim().toLowerCase(),
				password,
				confirmPassword,
			});
			navigate("/dashboard");
		} catch {
			// error already set in context
		}
	};

	const handleReset = () => {
		setUsername("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setFormErrors([]);
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
				<h1 className="text-center h3 mb-3">Signup</h1>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={loading}
						required
					/>
				</div>
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
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
						{loading ? "Processing..." : "Signup"}
					</button>
				</div>
				<p className="mt-3 mb-0">
					If you have already signed up then{" "}
					<Link to="/login">Login</Link>
				</p>
				{(error || formErrors.length > 0) && (
					<div className="alert alert-danger mt-3 mb-0" role="alert">
						{error && <div>{error}</div>}
						{formErrors.length > 0 && (
							<ul className="mb-0">
								{formErrors.map((f, i) => (
									<li key={i}>{f}</li>
								))}
							</ul>
						)}
					</div>
				)}
			</form>
		</main>
	);
}
