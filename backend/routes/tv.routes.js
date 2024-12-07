import { Router } from "express";
import {
  getSimilarTv,
  getTrendingTv,
  getTvDetails,
  getTvsbyCategory,
  getTvTrailers,
} from "../controllers/tv.controllers.js";

const router = Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvsbyCategory);

export default router;
