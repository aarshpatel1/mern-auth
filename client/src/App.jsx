import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
// import Testing from "./pages/Testing"; // Assuming you don't need this
// import AuthContainer from "./components/AuthContainer"; // Not needed if doing route transitions

import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import FormWrapper from "./components/FormWrapper"; // Import the wrapper

function App() {
	const location = useLocation(); // Get the current location object

	return (
		<>
			<Navbar />

			{/* We center the animation logic around the specific authentication routes */}
			{/* Check if we are on the login or signup page */}
			{location.pathname === "/login" ||
			location.pathname === "/signup" ? (
				<FormWrapper>
					<AnimatePresence mode="wait">
						{/* The key is essential for AnimatePresence to track route changes */}
						<Routes location={location} key={location.pathname}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Routes>
					</AnimatePresence>
				</FormWrapper>
			) : (
				// Render other routes normally outside the animated wrapper
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			)}
		</>
	);
}

export default App;
