import User from "../models/User.js";

export const dashboard = async (req, res) => {
	try {
		if (!req.user || !req.user.id) {
			return res.status(401).json({ message: "Unauthorized." });
		}

		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		return res.status(200).json({
			message: `Welcome ${user.username} to Admin Dashboard.`,
			user,
		});
	} catch (error) {
		console.error("Dashboard error:", error);
		return res.status(500).json({
			message: "Internal Server Error.",
		});
	}
};
