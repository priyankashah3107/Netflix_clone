import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
const MONGO_URI = ENV_VARS.MONGO_URI;

export const connectToMongDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MongoDb Connected:" + conn.connection.host);
  } catch (error) {
    console.error("Error", error.message);
    process.exit(1); // this is shows the error
  }
};
