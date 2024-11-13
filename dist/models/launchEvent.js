"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LaunchEventSchema = new mongoose_1.default.Schema({
    region: {
        type: String,
        required: true,
    },
    missileName: {
        type: String,
        required: true,
    },
    launchedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    interceptorName: {
        type: String,
    },
    interceptedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    success: {
        type: Boolean,
    },
    remainingMissiles: {
        type: Number,
        default: null,
    },
    remainingInterceptors: {
        type: Number,
        default: null,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const LaunchEvent = mongoose_1.default.model("LaunchEvent", LaunchEventSchema);
exports.default = LaunchEvent;
