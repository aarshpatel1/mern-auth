# React: Smooth Animated Height Transition Between Login & Signup Forms Using React Router + Framer Motion

This is a complete, production-ready documentation for implementing a **beautiful smooth height-resizing animation** when switching between a **Login form (2 inputs)** and a **Signup form (4 inputs)** on different routes (`/login` → `/signup` and vice-versa) using **React Router v6** and **Framer Motion**.

---

### Final Result

When users click:

-   “Don’t have an account? Sign up” → container **smoothly grows** in height
-   “Already have an account? Login” → container **smoothly shrinks** in height  
    All with spring-based animation, no jank, no fixed heights.

---

## Project Structure (Relevant Files)

```
src/
├── pages/
│   ├── Login.jsx
│   └── Signup.jsx
├── components/
│   ├── FormWrapper.jsx
│   └── Navbar.jsx
├── App.jsx
└── index.js
```

---

## Step 1: Install Framer Motion

```bash
npm install framer-motion
# or
yarn add framer-motion
```

---

## File 1: `pages/Login.jsx`

```jsx
// pages/Login.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			layout // Enables layout animations (size/position)
			style={{ width: "100%" }}
		>
			<h3 style={{ margin: "0 0 20px", textAlign: "center" }}>Login</h3>
			<input
				type="text"
				placeholder="Username or Email"
				style={{
					display: "block",
					marginBottom: "12px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				style={{
					display: "block",
					marginBottom: "20px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<button
				style={{
					width: "100%",
					padding: "12px",
					background: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "4px",
					fontSize: "16px",
				}}
			>
				Login
			</button>

			<p
				style={{
					textAlign: "center",
					marginTop: "20px",
					fontSize: "14px",
				}}
			>
				Don't have an account?{" "}
				<Link
					to="/signup"
					style={{ color: "#007bff", textDecoration: "none" }}
				>
					Sign Up
				</Link>
			</p>
		</motion.div>
	);
};

export default Login;
```

---

## File 2: `pages/Signup.jsx`

```jsx
// pages/Signup.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			layout // Critical for smooth height animation
			style={{ width: "100%" }}
		>
			<h3 style={{ margin: "0 0 20px", textAlign: "center" }}>
				Create Account
			</h3>
			<input
				type="text"
				placeholder="First Name"
				style={{
					display: "block",
					marginBottom: "12px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<input
				type="text"
				placeholder="Last Name"
				style={{
					display: "block",
					marginBottom: "12px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<input
				type="email"
				placeholder="Email"
				style={{
					display: "block",
					marginBottom: "12px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				style={{
					display: "block",
					marginBottom: "20px",
					width: "100%",
					padding: "10px",
					fontSize: "16px",
				}}
			/>
			<button
				style={{
					width: "100%",
					padding: "12px",
					background: "#28a745",
					color: "white",
					border: "none",
					borderRadius: "4px",
					fontSize: "16px",
				}}
			>
				Sign Up
			</button>

			<p
				style={{
					textAlign: "center",
					marginTop: "20px",
					fontSize: "14px",
				}}
			>
				Already have an account?{" "}
				<Link
					to="/login"
					style={{ color: "#007bff", textDecoration: "none" }}
				>
					Login
				</Link>
			</p>
		</motion.div>
	);
};

export default Signup;
```

---

## File 3: `components/FormWrapper.jsx`

```jsx
// components/FormWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

const FormWrapper = ({ children }) => {
	return (
		<motion.div
			layout // This enables automatic height/width animation
			transition={{
				layout: {
					type: "spring",
					stiffness: 400,
					damping: 35,
					mass: 1,
				},
			}}
			style={{
				border: "1px solid #ddd",
				width: "380px",
				maxWidth: "95vw",
				borderRadius: "12px",
				backgroundColor: "#ffffff",
				overflow: "hidden",
				margin: "40px auto",
				boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
			}}
		>
			{children}
		</motion.div>
	);
};

export default FormWrapper;
```

---

## File 4: `App.jsx` (Main Routing + Animation Logic)

```jsx
// App.jsx
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";

import { AnimatePresence } from "framer-motion";
import FormWrapper from "./components/FormWrapper";

function App() {
	const location = useLocation();

	// Check if current route is /login or /signup
	const isAuthRoute =
		location.pathname === "/login" || location.pathname === "/signup";

	return (
		<>
			<Navbar />

			{/* Only apply animated wrapper on auth routes */}
			{isAuthRoute ? (
				<FormWrapper>
					<AnimatePresence mode="wait">
						<Routes location={location} key={location.pathname}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Routes>
					</AnimatePresence>
				</FormWrapper>
			) : (
				<Routes>
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
```

---

## How It Works – Key Concepts Explained

| Feature                                 | Why It’s Needed                                                           | How It’s Achieved                                  |
| --------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| `layout` prop                           | Automatically animates height/width when content changes                  | Added to both `FormWrapper` and inner `motion.div` |
| `AnimatePresence` + `mode="wait"`       | Ensures only one form exists at a time → correct height calculation       | Wraps auth routes inside `FormWrapper`             |
| `key={location.pathname}`               | Forces React to treat Login/Signup as different components for exit/enter | Critical for `AnimatePresence` to work             |
| `useLocation()` + conditional rendering | Applies animation only to auth pages, keeps other routes normal           | Clean separation of concerns                       |
| Spring transition                       | Feels natural and responsive                                              | `type: "spring", stiffness: 400, damping: 35`      |

---

## Benefits

-   No hardcoded heights
-   Fully responsive
-   Works with any number of fields
-   Smooth on mobile & desktop
-   Zero layout shift or jank
-   Clean separation of concerns
-   Works perfectly with `<Link>` navigation

---

## Optional Enhancements

-   Add background fade using `initial={{ opacity: 0 }}` on `FormWrapper`
-   Add horizontal slide using `x: ±100` instead of `y`
-   Add shared element animation (e.g., email field stays in place)

---

**You now have a professional, smooth-resizing animated auth flow** that works perfectly with React Router and separate page components.

Enjoy the buttery-smooth UX!
