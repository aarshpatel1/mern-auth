import authRoutes from "./auth.js";
import adminRoutes from "./admin.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	return res.status(200).json({
		message: "API is running..!!",
	});
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
