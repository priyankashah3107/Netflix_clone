import { Router } from "express";
import {
  getMoviebyCategory,
  getMovieDetails,
  getMovieTrailers,
  getSimilarMovie,
  getTrendingMovie,
} from "../controllers/movie.controllers.js";

const router = Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);

router.get("/:id/similar", getSimilarMovie);
router.get("/:category", getMoviebyCategory);
export default router;
