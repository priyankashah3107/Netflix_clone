import { Router } from "express";
import {
  getMovieTrailers,
  getTrendingMovie,
} from "../controllers/movie.controllers.js";

const router = Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);

export default router;
