	import { Link } from "react-router";

	export default function Login() {
		return (
			<>
				<main
					className="d-flex align-items-center justify-content-center"
					id="form-container"
				>
					<form className="border border-1 border-light-subtle p-4 rounded-3 shadow">
						<h1 className="text-center h3 mb-3">Login</h1>
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
						<div className="d-flex align-items-center justify-content-center gap-3">
							<button className="btn btn-outline-secondary mt-2">
								Reset
							</button>
							<button className="btn btn-dark bg-secondary-subtle border border-1 border-light-subtle mt-2">
								Login
							</button>
						</div>
						<p className="mt-3 mb-0">
							If you haven't signed up yet, then{" "}
							<Link to={"/signup"}>Signup</Link>
						</p>
					</form>
				</main>
			</>
		);
	}
