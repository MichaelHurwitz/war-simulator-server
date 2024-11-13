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
exports.getMissileCount = exports.updateMissileCount = exports.getMissilesForOrganization = void 0;
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const user_1 = __importDefault(require("../models/user"));
const getMissilesForOrganization = (organizationName) => {
    const organization = organizations_json_1.default.find((org) => org.name === organizationName);
    if (!organization) {
        throw new Error(`Organization ${organizationName} not found`);
    }
    const missileNames = organization.resources.map((resource) => {
        return typeof resource === "string" ? resource : resource.name;
    });
    return missileNames;
};
exports.getMissilesForOrganization = getMissilesForOrganization;
const updateMissileCount = (userId, missileName, change) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const missile = user.missiles.find((m) => m.name === missileName);
    if (!missile) {
        throw new Error(`Missile ${missileName} not found in user's inventory`);
    }
    if (missile.amount + change < 0) {
        throw new Error(`Not enough missiles of type ${missileName}`);
    }
    missile.amount += change;
    yield user.save();
});
exports.updateMissileCount = updateMissileCount;
const getMissileCount = (userId, missileName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const missile = user.missiles.find((m) => m.name === missileName);
    return missile ? missile.amount : 0;
});
exports.getMissileCount = getMissileCount;
