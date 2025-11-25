import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import FormField from "../components/FormField";
import { motion } from "framer-motion";

export default function Login() {
	const navigate = useNavigate();
	const { login, loading, error } = useContext(AuthContext);

	const {
		values,
		fieldErrors,
		touched,
		handleBlur,
		handleChange,
		validateForm,
		resetForm,
		setFieldError,
	} = useFormValidation(
		{
			email: "",
			password: "",
		},
		["email", "loginPassword"]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await login({
				email: values.email.trim().toLowerCase(),
				password: values.password,
			});
			navigate("/dashboard");
		} catch (err) {
			// Handle server-side validation errors
			if (err.response?.data?.errors) {
				err.response.data.errors.forEach((error) => {
					const fieldName =
						error.field === "password"
							? "loginPassword"
							: error.field;
					setFieldError(fieldName, error.messages || [error.message]);
				});
			}
		}
	};

	const handleReset = () => {
		resetForm();
	};

	return (
		<main
			className="d-flex align-items-center justify-content-center"
			id="form-container"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3 }}
				layout
				style={{ padding: "20px" }}
			>
				<form
					className="border border-1 border-light-subtle p-4 rounded-3 shadow"
					onSubmit={handleSubmit}
					onReset={handleReset}
					noValidate
				>
					<h1 className="text-center h3 mb-3">Login</h1>

					<FormField
						label="Email"
						name="email"
						type="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={fieldErrors.email || []}
						touched={touched.email}
						disabled={loading}
						required
						autoFocus
					/>

					<FormField
						label="Password"
						name="loginPassword"
						type="password"
						value={values.password}
						onChange={(name, value) =>
							handleChange("password", value)
						}
						onBlur={() => handleBlur("loginPassword")}
						errors={fieldErrors.loginPassword || []}
						touched={touched.loginPassword}
						disabled={loading}
						required
					/>

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
						<div
							className="alert alert-danger mt-3 mb-0"
							role="alert"
						>
							{error}
						</div>
					)}
				</form>
			</motion.div>
		</main>
	);
}
