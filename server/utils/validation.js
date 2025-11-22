import { body } from "express-validator";

export const signupValidator = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username is required")
		.matches(/^[^\s]+$/)
		.withMessage("Username must not contain spaces")
		.isLength({ min: 3, max: 30 })
		.withMessage("Username length must be 3-30"),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format")
		.matches(/^[^\s]+$/)
		.withMessage("Email must not contain spaces"),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters")
		.matches(/^[^\s]+$/)
		.withMessage("Password must not contain spaces"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
		return true;
	}),
];

export const loginValidator = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format")
		.matches(/^[^\s]+$/)
		.withMessage("Email must not contain spaces"),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.matches(/^[^\s]+$/)
		.withMessage("Password must not contain spaces"),
];
