import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv({
	quiet: true,
});

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB is connected..!!");
	} catch (error) {
		console.error("Error connecting Database: ", error);
		process.exit(1);
	}
};

export default connectDB;
