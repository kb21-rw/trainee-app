"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSchema = exports.ProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ProfileSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional(),
});
exports.editUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).optional(),
    email: joi_1.default.string().email().optional(),
    role: joi_1.default.string().valid("ADMIN", "COACH").optional(),
    coach: joi_1.default.string().optional(),
});
