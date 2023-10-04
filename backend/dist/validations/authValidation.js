"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.coachAssignSchema = exports.ProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email(),
    role: joi_1.default.string().valid("ADMIN", "COACH", "TRAINEE").required(),
    coach: joi_1.default.string(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.ProfileSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional()
});
exports.coachAssignSchema = joi_1.default.object({
    coachId: joi_1.default.string().required()
});
exports.resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
