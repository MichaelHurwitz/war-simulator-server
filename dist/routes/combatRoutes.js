"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const combatController_1 = require("../controllers/combatController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/launch", authMiddleware_1.authenticate, combatController_1.launchMissileController);
router.post("/intercept", authMiddleware_1.authenticate, combatController_1.interceptMissileController);
exports.default = router;
