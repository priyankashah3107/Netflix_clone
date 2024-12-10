import { Router } from "express";
import {
  authCheck,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectroute.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authcheck", protectRoute, authCheck);

export default router;
