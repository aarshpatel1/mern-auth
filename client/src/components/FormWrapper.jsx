import { motion } from "framer-motion";

const FormWrapper = ({ children }) => {
	return (
		<motion.div
			layout
			transition={{ type: "spring", stiffness: 400, damping: 30 }}
		>
			{children}
		</motion.div>
	);
};

export default FormWrapper;
