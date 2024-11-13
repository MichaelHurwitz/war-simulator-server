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
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptMissileController = exports.launchMissileController = void 0;
const attackService_1 = require("../services/attackService");
const defenseService_1 = require("../services/defenseService");
const webSocket_1 = require("../sockets/webSocket");
const launchMissileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { region, missileName } = req.body;
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const userId = req.user.id;
        const io = (0, webSocket_1.getSocketInstance)();
        yield (0, attackService_1.launchMissile)(io, userId, region, missileName);
        res.status(200).json({ message: "Missile launched successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error occurred" });
    }
});
exports.launchMissileController = launchMissileController;
const interceptMissileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { region, missileName, interceptorName } = req.body;
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const userId = req.user.id;
        const io = (0, webSocket_1.getSocketInstance)();
        yield (0, defenseService_1.interceptMissile)(io, userId, region, missileName, interceptorName);
        res.status(200).json({ message: "Interception successful" });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error occurred" });
    }
});
exports.interceptMissileController = interceptMissileController;
