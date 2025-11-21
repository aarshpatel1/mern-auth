import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/api";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await api.post("/auth/signup", {
				username,
				email,
				password,
				confirmPassword,
			});

			console.log(response);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", response.data.user.id);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error while signing up: ", error);
			setError(error);
		}
	};

	return (
		<>
			<main
				className="d-flex align-items-center justify-content-center"
				id="form-container"
			>
				<form
					className="border border-1 border-light-subtle p-4 rounded-3 shadow"
					onSubmit={handleSubmit}
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
						/>
					</div>
					<div className="d-flex align-items-center justify-content-center gap-3">
						<button className="btn btn-outline-secondary mt-2">
							Reset
						</button>
						<button className="btn btn-dark bg-secondary-subtle border border-1 border-light-subtle mt-2">
							Signup
						</button>
					</div>
					<p className="mt-3 mb-0">
						If you have already signed up, than{" "}
						<Link to={"/login"}>Login</Link>
					</p>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
				</form>
			</main>
		</>
	);
}
