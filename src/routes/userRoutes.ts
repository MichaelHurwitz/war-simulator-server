import express from "express";
import { register, login, updateUserMissilesController } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login);       
router.put("/missiles", authenticate, updateUserMissilesController); 

export default router;
