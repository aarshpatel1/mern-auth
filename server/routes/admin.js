import express from "express";
import { dashboard } from "../controllers/adminController.js";
import { authenticateJWT } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticateJWT, (req, res) => {
	return res.status(200).json({
		message: "Admin Route..!!",
	});
});

router.use("/dashboard", authenticateJWT, dashboard);

export default router;
