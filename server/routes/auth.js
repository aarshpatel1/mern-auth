import { signup, login, failedLogin } from "../controllers/authController.js";
import { loginValidator, signupValidator } from "../utils/validator.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	return res.status(200).json({
		message: "Auth Routes..!!",
	});
});

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/failedLogin", failedLogin);

export default router;
