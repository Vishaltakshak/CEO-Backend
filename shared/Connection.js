import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGODB_URI; 

export const createConnection = async () => {
  console.log("Connecting to MongoDB...");
  try {
    if (!DB_URL) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const connectionInfo = await mongoose.connect(DB_URL);
    console.log(`MongoDB connected successfully. Host: ${connectionInfo.connection.host}`);
    return connectionInfo;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // Re-throw the error so it can be caught by the calling function
  }
};