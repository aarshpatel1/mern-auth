import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
	const { user, logout, isAuthenticated, loading } = useContext(AuthContext);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					MERN Auth
				</Link>
				<button
					className="navbar-toggler border-0 shadow-none"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/dashboard" className="nav-link">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/testing" className="nav-link">
								Testing
							</Link>
						</li>
					</ul>
					<div className="d-flex align-items-center gap-2">
						{!isAuthenticated ? (
							<>
								<Link
									to="/signup"
									className="btn btn-outline-light border-light-subtle"
								>
									Signup
								</Link>
								<Link
									to="/login"
									className="btn btn-dark bg-secondary-subtle border border-1 border-light-subtle"
								>
									Login
								</Link>
							</>
						) : (
							<>
								<span className="me-2 small">
									{user?.username || user?.email || "User"}
								</span>
								<button
									type="button"
									onClick={logout}
									disabled={loading}
									className="btn btn-outline-secondary border-light-subtle"
								>
									{loading ? "..." : "Logout"}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
