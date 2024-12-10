import express from "express";
import authRoutes from "../backend/routes/auth.routes.js";
import movieRoutes from "../backend/routes/movie.routes.js";
import dotenv from "dotenv";
import { ENV_VARS } from "./config/envVars.js";
import { connectToMongDb } from "./config/connectToMongoDb.js";
import TvRoutes from "../backend/routes/tv.routes.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectroute.js";
import searchRoute from "../backend/routes/search.routes.js";
const app = express();
dotenv.config();
// const PORT = process.env.PORT || 8000;

const PORT = ENV_VARS.PORT;
const MONGO_URI = ENV_VARS.MONGO_URI;
app.use(express.json()); // it will allow you to parse the req.body
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, TvRoutes);
app.use("/api/v1/search", protectRoute, searchRoute);


// console.log("MONGO URI", MONGO_URI);

app.listen(PORT, () => {
  console.log(`App is Running on PORT http://localhost:${PORT}`);
  connectToMongDb();
});
