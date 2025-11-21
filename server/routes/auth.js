import { signup, login, failedLogin } from "../controllers/authController.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	return res.status(200).json({
		message: "Auth Routes..!!",
	});
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/failedLogin", failedLogin);

export default router;
