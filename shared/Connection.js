import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_URL = process.env.DB_URL;
export const CreatConnection = async()=>{
    console.log("connecting...")
    try {
        const connectionInfo = await mongoose.connect(DB_URL);
        return connectionInfo;
    } catch (error) {
        console.log("connection failed",error)  
    }
}
