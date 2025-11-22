/**
 * Validation rules for form fields
 */
export const validationRules = {
	username: (value) => {
		const errors = [];
		if (!value.trim()) {
			errors.push("Username is required");
		} else if (/\s/.test(value)) {
			errors.push("Username must not contain spaces");
		} else if (value.length < 3 || value.length > 30) {
			errors.push("Username length must be 3-30");
		}
		return errors;
	},

	email: (value) => {
		const errors = [];
		if (!value.trim()) {
			errors.push("Email is required");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			errors.push("Invalid email format");
		} else if (/\s/.test(value)) {
			errors.push("Email must not contain spaces");
		}
		return errors;
	},

	password: (value) => {
		const errors = [];
		if (!value) {
			errors.push("Password is required");
		} else if (value.length < 8) {
			errors.push("Password must be at least 8 characters");
		} else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])/.test(value)) {
			errors.push(
				"Password must include uppercase, lowercase, number, and symbol"
			);
		} else if (/\s/.test(value)) {
			errors.push("Password must not contain spaces");
		}
		return errors;
	},

	confirmPassword: (value, password) => {
		const errors = [];
		if (!value) {
			errors.push("Confirm password is required");
		} else if (value !== password) {
			errors.push("Passwords do not match");
		}
		return errors;
	},

	// Simple password for login (less strict)
	loginPassword: (value) => {
		const errors = [];
		if (!value) {
			errors.push("Password is required");
		} else if (/\s/.test(value)) {
			errors.push("Password must not contain spaces");
		}
		return errors;
	},

	// Add more reusable validators
	required: (value, fieldName = "This field") => {
		return !value.trim() ? [`${fieldName} is required`] : [];
	},

	minLength: (value, min, fieldName = "This field") => {
		return value.length < min
			? [`${fieldName} must be at least ${min} characters`]
			: [];
	},

	maxLength: (value, max, fieldName = "This field") => {
		return value.length > max
			? [`${fieldName} must be at most ${max} characters`]
			: [];
	},

	pattern: (value, regex, message) => {
		return !regex.test(value) ? [message] : [];
	},
};

/**
 * Validate a single field based on rules
 * @param {string} fieldName - Name of the field
 * @param {any} value - Value to validate
 * @param {object} formValues - All form values (for dependent validations)
 * @returns {Array} - Array of error messages
 */
export const validateField = (fieldName, value, formValues = {}) => {
	if (validationRules[fieldName]) {
		// Handle special cases like confirmPassword that need other values
		if (fieldName === "confirmPassword") {
			return validationRules[fieldName](value, formValues.password);
		}
		return validationRules[fieldName](value);
	}
	return [];
};

/**
 * Validate all fields in a form
 * @param {object} fields - Object with field names as keys and values
 * @param {Array} fieldsToValidate - Array of field names to validate
 * @returns {object} - Object with field names as keys and error arrays as values
 */
export const validateAllFields = (fields, fieldsToValidate) => {
	const errors = {};

	fieldsToValidate.forEach((fieldName) => {
		errors[fieldName] = validateField(fieldName, fields[fieldName], fields);
	});

	return errors;
};

/**
 * Check if form has any errors
 * @param {object} errors - Errors object from validateAllFields
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
	return Object.values(errors).some((fieldErrors) => fieldErrors.length > 0);
};

/**
 * Create custom validator
 * @param {Function} validatorFn - Function that returns array of error messages
 * @returns {Function}
 */
export const createValidator = (validatorFn) => {
	return validatorFn;
};
