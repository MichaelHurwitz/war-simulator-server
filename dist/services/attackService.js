"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchMissile = void 0;
const launchEvent_1 = __importDefault(require("../models/launchEvent"));
const user_1 = __importDefault(require("../models/user"));
const launchMissile = (io, userId, region, missileName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    const missile = user.missiles.find((m) => m.name === missileName);
    if (!missile || missile.amount <= 0) {
        throw new Error("Insufficient missiles available");
    }
    missile.amount -= 1;
    yield user.save();
    const launchEvent = new launchEvent_1.default({
        region,
        missileName,
        launchedBy: userId,
        remainingMissiles: missile.amount,
    });
    yield launchEvent.save();
    io.to(region).emit("missile_launched", {
        missileName,
        region,
        remainingMissiles: missile.amount,
    });
});
exports.launchMissile = launchMissile;
