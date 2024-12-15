// import express from "express";
// import authRoutes from "../backend/routes/auth.routes.js";
// import movieRoutes from "../backend/routes/movie.routes.js";
// import dotenv from "dotenv";
// import { ENV_VARS } from "./config/envVars.js";
// import { connectToMongDb } from "./config/connectToMongoDb.js";
// import TvRoutes from "../backend/routes/tv.routes.js";
// import cookieParser from "cookie-parser";
// import { protectRoute } from "./middleware/protectroute.js";
// import searchRoute from "../backend/routes/search.routes.js";
// import cors from "cors";
// import path from "path";
// const app = express();
// dotenv.config();
// // const PORT = process.env.PORT || 8000;

// const PORT = ENV_VARS.PORT;
// const __dirname = path.resolve();
// // const MONGO_URI = ENV_VARS.MONGO_URI;
// app.use(cors());
// app.use(express.json()); // it will allow you to parse the req.body
// app.use(cookieParser());
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/movie", protectRoute, movieRoutes);
// app.use("/api/v1/tv", protectRoute, TvRoutes);
// app.use("/api/v1/search", protectRoute, searchRoute);

// if (ENV_VARS.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname), "/frontend/dist"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//   );
// }

// // console.log("MONGO URI", MONGO_URI);

// app.listen(PORT, () => {
//   console.log(`App is Running on PORT http://localhost:${PORT}`);
//   connectToMongDb();
// });

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
import cors from "cors";
import path from "path";

// Initialize app
const app = express();
dotenv.config();

// Get environment variables
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON in request body
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, TvRoutes);
app.use("/api/v1/search", protectRoute, searchRoute);

// Serve frontend in production
if (ENV_VARS.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Handle SPA routing by serving `index.html`
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

// Start server
app.listen(PORT, () => {
  console.log(`App is Running on PORT http://localhost:${PORT}`);
  connectToMongDb();
});
