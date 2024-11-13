import express from "express";
import {
    launchMissileController,
  interceptMissileController,
} from "../controllers/combatController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/launch", authenticate, launchMissileController);
router.post("/intercept", authenticate, interceptMissileController);

export default router;
