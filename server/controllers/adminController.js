import User from "../models/User.js";

export const dashboard = async (req, res) => {
	try {
		const userId = req.user.id;
		console.log(userId);

		const user = await User.findById(userId).select("-password");

		return res.status(200).json({
			message: `Welcome ${user.username} to Admin Dashboard..!!`,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error..!!",
		});
	}
};
