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
exports.updateUserMissiles = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const helperFuncs_1 = require("../utils/helperFuncs");
const registerUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password, organization, region }) {
    const orgData = organizations_json_1.default.find((org) => org.name === organization);
    if (!orgData) {
        throw new Error("Invalid organization");
    }
    if (organization.startsWith("IDF") && !region) {
        throw new Error("Region is required for IDF organizations");
    }
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        throw new Error("Username already taken");
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const allowedMissiles = (0, helperFuncs_1.getMissilesForOrganization)(organization);
    const missiles = allowedMissiles.map((missileName) => ({
        name: missileName,
        amount: 0,
    }));
    const newUser = new user_1.default({
        username,
        password: hashedPassword,
        organization,
        region,
        missiles,
    });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    const user = yield user_1.default.findOne({ username });
    if (!user) {
        throw new Error("Invalid username or password");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid username or password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token);
    return user;
});
exports.loginUser = loginUser;
const updateUserMissiles = (userId, missileName, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const allowedMissiles = (0, helperFuncs_1.getMissilesForOrganization)(user.organization);
        if (!allowedMissiles.includes(missileName)) {
            throw new Error(`Missile ${missileName} is not allowed for organization ${user.organization}`);
        }
        const missile = user.missiles.find((m) => m.name === missileName);
        if (missile) {
            missile.amount += amount;
            if (missile.amount < 0) {
                throw new Error("Missile count cannot be negative");
            }
        }
        else {
            user.missiles.push({ name: missileName, amount });
        }
        yield user.save();
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("An unknown error occurred");
        }
    }
});
exports.updateUserMissiles = updateUserMissiles;
