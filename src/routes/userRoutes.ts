import express from "express";
import { register, login, updateUserMissilesController, getUserProfile } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login);       
router.put("/missiles", authenticate, updateUserMissilesController); 
router.get("/profile", authenticate, getUserProfile);

  

export default router;
