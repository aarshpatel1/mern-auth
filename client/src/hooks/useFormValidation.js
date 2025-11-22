import { useState } from "react";
import {
	validateField,
	validateAllFields,
	hasErrors,
} from "../utils/formValidator";

/**
 * Custom hook for form validation
 * @param {object} initialValues - Initial form values
 * @param {Array} fieldsToValidate - Array of field names to validate
 * @returns {object} - Form state and handlers
 */
export const useFormValidation = (initialValues, fieldsToValidate) => {
	const [values, setValues] = useState(initialValues);
	const [fieldErrors, setFieldErrors] = useState({});
	const [touched, setTouched] = useState({});

	/**
	 * Handle field blur event
	 */
	const handleBlur = (fieldName) => {
		setTouched((prev) => ({ ...prev, [fieldName]: true }));

		// Map field name for validation
		const validationFieldName =
			fieldName === "loginPassword" ? "password" : fieldName;
		const validationValue =
			fieldName === "loginPassword" ? values.password : values[fieldName];

		const errors = validateField(
			validationFieldName,
			validationValue,
			values
		);
		setFieldErrors((prev) => ({ ...prev, [fieldName]: errors }));
	};

	/**
	 * Handle field change event
	 */
	const handleChange = (fieldName, value) => {
		setValues((prev) => ({ ...prev, [fieldName]: value }));

		// Re-validate confirmPassword if password changes
		if (
			fieldName === "password" &&
			touched.confirmPassword &&
			values.confirmPassword
		) {
			const confirmErrors = validateField(
				"confirmPassword",
				values.confirmPassword,
				{
					...values,
					password: value,
				}
			);
			setFieldErrors((prev) => ({
				...prev,
				confirmPassword: confirmErrors,
			}));
		}

		// Validate current field if already touched
		if (touched[fieldName]) {
			// Map field name for validation
			const validationFieldName =
				fieldName === "loginPassword" ? "password" : fieldName;
			const validationValue =
				fieldName === "loginPassword" ? value : value;

			const errors = validateField(validationFieldName, validationValue, {
				...values,
				[fieldName]: value,
			});
			setFieldErrors((prev) => ({ ...prev, [fieldName]: errors }));
		}
	};

	/**
	 * Validate all fields
	 * @returns {boolean} - true if form is valid
	 */
	const validateForm = () => {
		// Mark all fields as touched
		const allTouched = {};
		fieldsToValidate.forEach((field) => {
			allTouched[field] = true;
		});
		setTouched(allTouched);

		// Map field names for validation
		const mappedFields = {};
		const mappedFieldsToValidate = fieldsToValidate.map((field) => {
			if (field === "loginPassword") {
				mappedFields["password"] = values.password;
				return "loginPassword";
			}
			mappedFields[field] = values[field];
			return field;
		});

		// Validate all fields
		const allErrors = {};
		fieldsToValidate.forEach((fieldName) => {
			const validationFieldName =
				fieldName === "loginPassword" ? "loginPassword" : fieldName;
			const validationValue =
				fieldName === "loginPassword"
					? values.password
					: values[fieldName];

			allErrors[fieldName] = validateField(
				validationFieldName,
				validationValue,
				values
			);
		});

		setFieldErrors(allErrors);

		// Return true if no errors
		return !hasErrors(allErrors);
	};

	/**
	 * Reset form to initial values
	 */
	const resetForm = () => {
		setValues(initialValues);
		setFieldErrors({});
		setTouched({});
	};

	/**
	 * Set a specific field value
	 */
	const setFieldValue = (fieldName, value) => {
		setValues((prev) => ({ ...prev, [fieldName]: value }));
	};

	/**
	 * Set multiple field values
	 */
	const setFieldValues = (newValues) => {
		setValues((prev) => ({ ...prev, ...newValues }));
	};

	/**
	 * Set error for a specific field (useful for server-side errors)
	 */
	const setFieldError = (fieldName, errors) => {
		const errorArray = Array.isArray(errors) ? errors : [errors];
		setFieldErrors((prev) => ({ ...prev, [fieldName]: errorArray }));
		setTouched((prev) => ({ ...prev, [fieldName]: true }));
	};

	/**
	 * Get CSS class for field
	 */
	const getFieldClass = (fieldName, baseClass = "form-control") => {
		if (touched[fieldName] && fieldErrors[fieldName]?.length > 0) {
			return `${baseClass} is-invalid`;
		}
		if (touched[fieldName] && fieldErrors[fieldName]?.length === 0) {
			return `${baseClass} is-valid`;
		}
		return baseClass;
	};

	return {
		values,
		fieldErrors,
		touched,
		handleBlur,
		handleChange,
		validateForm,
		resetForm,
		setFieldValue,
		setFieldValues,
		setFieldError,
		getFieldClass,
	};
};
