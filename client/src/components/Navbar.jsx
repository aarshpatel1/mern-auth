import { Link } from "react-router";

function Navbar() {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						MERN Auth
					</a>
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
								<Link to={"/"} className="nav-link">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/dashboard"} className="nav-link">
									Dashboard
								</Link>
							</li>
						</ul>
						<div className="d-flex align-items-center gap-2">
							<Link
								to={"/signup"}
								className="btn btn-outline-light border-light-subtle"
							>
								Signup
							</Link>
							<Link
								to={"/login"}
								className="btn btn-dark bg-secondary-subtle border border-1 border-light-subtle"
							>
								Login
							</Link>
							<button className="btn btn-outline-secondary border-light-subtle">
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
