import mongoose from "mongoose";
import { envs } from "../config/envs";

export const dbConnection = async () => {
	try {
		await mongoose.connect(envs.DB_URL);

		console.log('Database connected');
	} catch (error) {
		console.log(error);
		throw new Error('Error in database connection');
	}
};