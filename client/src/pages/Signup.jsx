import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import FormField from "../components/FormField";

export default function Signup() {
	const navigate = useNavigate();
	const { signup, loading, error } = useContext(AuthContext);

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
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		["username", "email", "password", "confirmPassword"]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await signup({
				username: values.username.trim(),
				email: values.email.trim().toLowerCase(),
				password: values.password,
				confirmPassword: values.confirmPassword,
			});
			navigate("/dashboard");
		} catch (err) {
			// Handle server-side validation errors
			if (err.response?.data?.errors) {
				err.response.data.errors.forEach((error) => {
					setFieldError(
						error.field,
						error.messages || [error.message]
					);
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
			<form
				className="border border-1 border-light-subtle p-4 rounded-3 shadow"
				onSubmit={handleSubmit}
				onReset={handleReset}
				noValidate
			>
				<h1 className="text-center h3 mb-3">Signup</h1>

				<FormField
					label="Username"
					name="username"
					type="text"
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={fieldErrors.username || []}
					touched={touched.username}
					disabled={loading}
					required
					autoFocus
				/>

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
				/>

				<FormField
					label="Password"
					name="password"
					type="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={fieldErrors.password || []}
					touched={touched.password}
					disabled={loading}
					required
				/>

				<FormField
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={fieldErrors.confirmPassword || []}
					touched={touched.confirmPassword}
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
