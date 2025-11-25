import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputAnimation = () => {
	const [inputCount, setInputCount] = useState(1);

	const handleToggle = () => {
		setInputCount(inputCount === 1 ? 3 : 1);
	};

	const inputVariants = {
		hidden: { opacity: 0, width: 0, marginRight: 0 },
		visible: { opacity: 1, width: "auto", marginRight: "10px" },
		exit: { opacity: 0, width: 0, marginRight: 0 },
	};

	return (
		<div style={{ padding: "20px" }}>
			<button onClick={handleToggle}>
				{inputCount === 1 ? "Show 3 Inputs" : "Show 1 Input"}
			</button>
			<div style={{ display: "flex", marginTop: "20px" }}>
				{/* The main input always present */}
				<motion.input
					type="text"
					placeholder="Main Input"
					// The layout prop automatically animates position and size changes
					layout
					style={{ padding: "10px", minWidth: "150px" }}
				/>

				{/* Use AnimatePresence for animating the entry/exit of dynamic components */}
				<AnimatePresence>
					{inputCount === 3 && (
						<>
							<motion.input
								key="input-2"
								type="text"
								placeholder="Input 2"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								layout
								style={{ padding: "10px" }}
							/>
							<motion.input
								key="input-3"
								type="text"
								placeholder="Input 3"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								layout
								style={{ padding: "10px" }}
							/>
						</>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default InputAnimation;
