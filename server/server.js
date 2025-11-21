import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import passportConfig from "./config/passport.js";
import router from "./routes/index.js";
import passport from "passport";
import { configDotenv } from "dotenv";

configDotenv({ quiet: true });
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Allow frontend origin (change to your front-end URL in production)
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT: enable CORS BEFORE your routes
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true, // if you ever use cookies
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

passportConfig(passport);
app.use(passport.initialize());

// simple healthcheck
app.get("/", (req, res) =>
	res.status(200).json({ message: "Server is running..!!" })
);

app.use("/api", router);

app.listen(port, () => {
	console.log("Server is running on http://127.0.0.1:" + port);
});
