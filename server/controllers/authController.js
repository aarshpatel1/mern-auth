import User from "../models/User.js";

import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv({
	quiet: true,
});

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;

		if (!username) {
			return res.status(400).json({
				message: "Please enter the username..!!",
			});
		}

		if (!email) {
			return res.status(400).json({
				message: "Please enter the email..!!",
			});
		}

		if (!password) {
			return res.status(400).json({
				message: "Please enter the password..!!",
			});
		}

		if (!confirmPassword) {
			return res.status(400).json({
				message: "Please enter the confirmPassword..!!",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				message:
					"Password and the Confirm Password should be the same..!!",
			});
		}

		const checkExistingUser = await User.findOne({ email });
		if (checkExistingUser) {
			return res.status(400).json({
				message: "User already exists, login instead..!!",
			});
		}

		const user = {
			username,
			email,
			password,
		};

		const newUser = await User.create(user);

		// Generate token
		const token = jwt.sign(
			{
				id: newUser._id,
			},
			JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		return res.status(201).json({
			message: "Signed Up Successfully..!!",
			token,
			user: {
				id: newUser._id,
				username: newUser.username,
				email: newUser.email,
			},
		});
	} catch (err) {
		return res.status(500).json({
			message: "Signup failed due to Internal Server Error..!!",
			error: err.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({
				message: "Please enter the email..!!",
			});
		}

		if (!password) {
			return res.status(400).json({
				message: "Please enter the password..!!",
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "User not found, signup instead..!!" });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Please enter the correct password..!!" });
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		return res.status(200).json({
			message: "Logged In Successfully..!!",
			token,
			user: {
				id: user._id,
				username: user.username,
				email,
			},
		});
	} catch (err) {
		return res.status(500).json({
			message: "Login failed due to Internal Server Error..!!",
			error: err.message,
		});
	}
};

export const failedLogin = (req, res) => {
	return res.status(401).json({
		message: "Please login with Admin Credentials..!!",
	});
};
