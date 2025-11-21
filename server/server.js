import connectDB from "./config/db.js";
import passportConfig from "./config/passport.js";
import router from "./routes/index.js";

import express from "express";
import passport from "passport";
import { configDotenv } from "dotenv";

configDotenv({
	quiet: true,
});
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passportConfig(passport);
app.use(passport.initialize());

app.get("/", (req, res) => {
	return res.status(200).json({
		message: "Server is running..!!",
	});
});

app.use("/api", router);

app.listen(port, () => {
	console.log("Server is running on http://127.0.0.1:" + port);
});
