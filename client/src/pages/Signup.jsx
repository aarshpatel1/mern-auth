import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});
	const [touched, setTouched] = useState({});
	const navigate = useNavigate();
	const { signup, loading, error } = useContext(AuthContext);

	const validateField = (name, value) => {
		const errors = [];

		switch (name) {
			case "username":
				if (!value.trim()) {
					errors.push("Username is required");
				} else if (/\s/.test(value)) {
					errors.push("Username must not contain spaces");
				} else if (value.length < 3 || value.length > 30) {
					errors.push("Username length must be 3-30");
				}
				break;

			case "email":
				if (!value.trim()) {
					errors.push("Email is required");
				} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					errors.push("Invalid email format");
				} else if (/\s/.test(value)) {
					errors.push("Email must not contain spaces");
				}
				break;

			case "password":
				if (!value) {
					errors.push("Password is required");
				} else if (value.length < 8) {
					errors.push("Password must be at least 8 characters");
				} else if (
					!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(value)
				) {
					errors.push(
						"Password must include uppercase, lowercase, number, and symbol"
					);
				} else if (/\s/.test(value)) {
					errors.push("Password must not contain spaces");
				}
				break;

			case "confirmPassword":
				if (!value) {
					errors.push("Confirm password is required");
				} else if (value !== password) {
					errors.push("Passwords do not match");
				}
				break;
		}

		return errors;
	};

	const handleBlur = (field) => {
		setTouched({ ...touched, [field]: true });
		const errors = validateField(field, eval(field));
		setFieldErrors({ ...fieldErrors, [field]: errors });
	};

	const handleChange = (field, value) => {
		switch (field) {
			case "username":
				setUsername(value);
				break;
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				if (touched.confirmPassword && confirmPassword) {
					const confirmErrors = validateField(
						"confirmPassword",
						confirmPassword
					);
					setFieldErrors({
						...fieldErrors,
						confirmPassword: confirmErrors,
					});
				}
				break;
			case "confirmPassword":
				setConfirmPassword(value);
				break;
		}

		if (touched[field]) {
			const errors = validateField(field, value);
			setFieldErrors({ ...fieldErrors, [field]: errors });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Mark all fields as touched
		setTouched({
			username: true,
			email: true,
			password: true,
			confirmPassword: true,
		});

		// Validate all fields
		const usernameErrors = validateField("username", username);
		const emailErrors = validateField("email", email);
		const passwordErrors = validateField("password", password);
		const confirmPasswordErrors = validateField(
			"confirmPassword",
			confirmPassword
		);

		const allErrors = {
			username: usernameErrors,
			email: emailErrors,
			password: passwordErrors,
			confirmPassword: confirmPasswordErrors,
		};

		setFieldErrors(allErrors);

		// Check if any errors exist
		const hasErrors = Object.values(allErrors).some(
			(errors) => errors.length > 0
		);
		if (hasErrors) {
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
		setFieldErrors({});
		setTouched({});
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
						className={`form-control ${
							touched.username && fieldErrors.username?.length > 0
								? "is-invalid"
								: touched.username &&
								  fieldErrors.username?.length === 0
								? "is-valid"
								: ""
						}`}
						id="username"
						value={username}
						onChange={(e) =>
							handleChange("username", e.target.value)
						}
						onBlur={() => handleBlur("username")}
						disabled={loading}
						autoFocus
						required
					/>
					{touched.username &&
						fieldErrors.username?.map((error, index) => (
							<div
								key={index}
								className="invalid-feedback d-block"
							>
								{error}
							</div>
						))}
				</div>

				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className={`form-control ${
							touched.email && fieldErrors.email?.length > 0
								? "is-invalid"
								: touched.email &&
								  fieldErrors.email?.length === 0
								? "is-valid"
								: ""
						}`}
						id="email"
						value={email}
						onChange={(e) => handleChange("email", e.target.value)}
						onBlur={() => handleBlur("email")}
						disabled={loading}
						required
					/>
					{touched.email &&
						fieldErrors.email?.map((error, index) => (
							<div
								key={index}
								className="invalid-feedback d-block"
							>
								{error}
							</div>
						))}
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className={`form-control ${
							touched.password && fieldErrors.password?.length > 0
								? "is-invalid"
								: touched.password &&
								  fieldErrors.password?.length === 0
								? "is-valid"
								: ""
						}`}
						id="password"
						value={password}
						onChange={(e) =>
							handleChange("password", e.target.value)
						}
						onBlur={() => handleBlur("password")}
						disabled={loading}
						required
					/>
					{touched.password &&
						fieldErrors.password?.map((error, index) => (
							<div
								key={index}
								className="invalid-feedback d-block"
							>
								{error}
							</div>
						))}
				</div>

				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className={`form-control ${
							touched.confirmPassword &&
							fieldErrors.confirmPassword?.length > 0
								? "is-invalid"
								: touched.confirmPassword &&
								  fieldErrors.confirmPassword?.length === 0
								? "is-valid"
								: ""
						}`}
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) =>
							handleChange("confirmPassword", e.target.value)
						}
						onBlur={() => handleBlur("confirmPassword")}
						disabled={loading}
						required
					/>
					{touched.confirmPassword &&
						fieldErrors.confirmPassword?.map((error, index) => (
							<div
								key={index}
								className="invalid-feedback d-block"
							>
								{error}
							</div>
						))}
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
				{error && (
					<div className="alert alert-danger mt-3 mb-0" role="alert">
						{error}
					</div>
				)}
			</form>
		</main>
	);
}
