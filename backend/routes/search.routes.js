import { Router } from "express";
import {
  searchPerson,
  movieSearch,
  TvSearch,
  HistorySearch,
  removeItemFromSearchHistory,
} from "../controllers/search.controllers.js";
const router = Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", movieSearch);
router.get("/tv/:query", TvSearch);
router.get("/history", HistorySearch);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
