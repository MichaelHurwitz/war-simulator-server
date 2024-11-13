"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organizationEnum_1 = require("./organizationEnum");
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        enum: Object.values(organizationEnum_1.OrganizationEnum),
        required: true,
    },
    region: {
        type: String,
        required: function () {
            return this.organization.startsWith("IDF");
        },
    },
    missiles: [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
