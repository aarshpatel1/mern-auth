import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});
	const [touched, setTouched] = useState({});
	const navigate = useNavigate();
	const { login, loading, error } = useContext(AuthContext);

	const validateField = (name, value) => {
		const errors = [];

		switch (name) {
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
				} else if (/\s/.test(value)) {
					errors.push("Password must not contain spaces");
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
		if (field === "email") {
			setEmail(value);
		} else if (field === "password") {
			setPassword(value);
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
			email: true,
			password: true,
		});

		// Validate all fields
		const emailErrors = validateField("email", email);
		const passwordErrors = validateField("password", password);

		const allErrors = {
			email: emailErrors,
			password: passwordErrors,
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
				<h1 className="text-center h3 mb-3">Login</h1>

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
				{error && (
					<div className="alert alert-danger mt-3 mb-0" role="alert">
						{error}
					</div>
				)}
			</form>
		</main>
	);
}
