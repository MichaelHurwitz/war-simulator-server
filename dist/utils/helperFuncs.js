"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissilesForOrganization = void 0;
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
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
