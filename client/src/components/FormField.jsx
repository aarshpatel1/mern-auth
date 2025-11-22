/**
 * Reusable form field component with validation
 */
export default function FormField({
	label,
	name,
	type = "text",
	value,
	onChange,
	onBlur,
	errors = [],
	touched = false,
	disabled = false,
	required = false,
	autoFocus = false,
	placeholder = "",
	className = "",
}) {
	const getFieldClass = () => {
		let classes = "form-control";
		if (className) classes += ` ${className}`;

		if (touched && errors.length > 0) {
			classes += " is-invalid";
		} else if (touched && errors.length === 0) {
			classes += " is-valid";
		}

		return classes;
	};

	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
				{required && <span className="text-danger ms-1">*</span>}
			</label>
			<input
				type={type}
				className={getFieldClass()}
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				onBlur={() => onBlur(name)}
				disabled={disabled}
				required={required}
				autoFocus={autoFocus}
				placeholder={placeholder}
			/>
			{touched &&
				errors.map((error, index) => (
					<div key={index} className="invalid-feedback d-block">
						{error}
					</div>
				))}
		</div>
	);
}
