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
exports.interceptMissile = void 0;
const user_1 = __importDefault(require("../models/user"));
const launchEvent_1 = __importDefault(require("../models/launchEvent"));
const interceptMissile = (io, userId, region, missileName, interceptorName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    const interceptor = user.missiles.find((m) => m.name === interceptorName);
    if (!interceptor || interceptor.amount <= 0) {
        throw new Error("Insufficient interceptors available");
    }
    const launchEvent = yield launchEvent_1.default.findOne({ region, missileName, success: undefined });
    if (!launchEvent) {
        throw new Error("No active missile found for interception");
    }
    const currentTime = Date.now();
    const timeElapsed = currentTime - launchEvent.timestamp.getTime();
    const timeRemaining = launchEvent.impactTime - timeElapsed;
    if (timeRemaining <= 0) {
        io.to(region).emit("missile_impact", { region, missileName });
        throw new Error("Missile already impacted");
    }
    if (timeRemaining < interceptor.interceptionTime) {
        io.to(region).emit("interception_failed", { region, missileName });
        throw new Error("Interceptor failed: Not enough time");
    }
    interceptor.amount -= 1;
    yield user.save();
    launchEvent.interceptorName = interceptorName;
    launchEvent.interceptedBy = userId;
    launchEvent.success = true;
    launchEvent.remainingInterceptors = interceptor.amount;
    yield launchEvent.save();
    io.to(region).emit("interception_result", {
        missileName,
        region,
        result: "Interception successful",
        remainingInterceptors: interceptor.amount,
    });
});
exports.interceptMissile = interceptMissile;
