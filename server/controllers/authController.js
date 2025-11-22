import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { validationResult } from "express-validator";

configDotenv({
	quiet: true,
});

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let grouped = {};

			errors.array().forEach((err) => {
				if (!grouped[err.path]) {
					grouped[err.path] = {
						field: err.path,
						messages: [],
						value: req.body[err.path] || "",
					};
				}
				grouped[err.path].messages.push(err.msg);
			});

			// convert grouped object → array format you want
			const finalErrors = Object.values(grouped);

			return res.status(400).json({ errors: finalErrors });
		}

		const { username, email, password } = req.body;

		const checkExistingUser = await User.findOne({ email });
		if (checkExistingUser) {
			return res.status(400).json({
				errors: [
					{
						field: "email",
						message: "User already exists, login instead..!!",
						value: email,
					},
				],
			});
		}

		const newUser = await User.create({ username, email, password });

		const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let grouped = {};

			errors.array().forEach((err) => {
				if (!grouped[err.path]) {
					grouped[err.path] = {
						field: err.path,
						messages: [],
						value: req.body[err.path] || "",
					};
				}
				grouped[err.path].messages.push(err.msg);
			});

			// convert grouped object → array format you want
			const finalErrors = Object.values(grouped);

			return res.status(400).json({ errors: finalErrors });
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				errors: [
					{
						field: "email",
						message: "User not found, signup instead..!!",
						value: email,
					},
				],
			});
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({
				errors: [
					{
						field: "password",
						message: "Please enter the correct password..!!",
						value: password,
					},
				],
			});
		}

		const token = jwt.sign({ id: user._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

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
