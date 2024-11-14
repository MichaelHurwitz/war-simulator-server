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
exports.getUserProfile = exports.updateUserMissilesController = exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, organization, region } = req.body;
    try {
        const newUser = yield (0, userService_1.registerUser)({ username, password, organization, region });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: "An unknown error occurred during registration" });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login request body:", req.body); // בדוק אם הבקשה תקינה
    const { username, password } = req.body;
    try {
        const { token, user } = yield (0, userService_1.loginUser)({ username, password });
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Login error:", error.message);
            res.status(401).json({ message: error.message });
        }
        else {
            res.status(401).json({ message: "An unknown error occurred during login" });
        }
    }
});
exports.login = login;
const updateUserMissilesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { missileName, amount } = req.body;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const updatedUser = yield (0, userService_1.updateUserMissiles)(userId, missileName, amount);
        res.status(200).json({ message: "Missiles updated successfully", user: updatedUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: "An unknown error occurred while updating missiles" });
        }
    }
});
exports.updateUserMissilesController = updateUserMissilesController;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const userProfile = yield (0, userService_1.getUserProfileService)(userId);
        res.status(200).json(userProfile);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: "An unknown error occurred while fetching the profile" });
        }
    }
});
exports.getUserProfile = getUserProfile;
