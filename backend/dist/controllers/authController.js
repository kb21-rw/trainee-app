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
exports.reset_password = exports.login = exports.register = void 0;
const authValidation_1 = require("../validations/authValidation");
const User_1 = __importDefault(require("../models/User"));
const helpers_1 = require("../utils/helpers");
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_KEY || "";
const ACCESS_TOKEN_EXPIRATION = "30m"; // 30 minutes
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser;
    try {
        const { role } = req.user;
        if (role !== "ADMIN") {
            return res.status(400).send("Only admins can register users");
        }
        const result = yield authValidation_1.registerSchema.validateAsync(req.body);
        let password = "";
        if (result.role === "COACH" || result.role === "ADMIN") {
            password = (0, helpers_1.generateRandomPassword)(10);
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            newUser = Object.assign(Object.assign({}, result), { name: result.name.trim().replace(/\s+/g, " "), password: hashedPassword });
        }
        else {
            newUser = Object.assign(Object.assign({}, result), { name: result.name.trim().replace(/\s+/g, " ") });
        }
        const createdUser = yield User_1.default.create(newUser);
        (0, helpers_1.sendEmail)(createdUser.name, createdUser.email, "Welcome " + createdUser.name, (0, helpers_1.generateMessage)(createdUser.name, createdUser.email, createdUser.role, password)).catch((error) => console.error(error));
        return res.status(201).send(Object.assign(Object.assign({}, result), { password }));
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authValidation_1.loginSchema.validateAsync(req.body);
        const user = yield User_1.default.findOne({ email: result.email });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }
        if (user.role === "TRAINEE") {
            return res
                .status(403)
                .json({ message: "Trainees are not allowed to login" });
        }
        const match = yield (0, bcryptjs_1.compare)(result.password, user.password);
        if (!match) {
            return res.status(403).json({ message: "Invalid credential" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, secret, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
        return res
            .status(200)
            .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .json({ accessToken });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.login = login;
const reset_password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authValidation_1.resetPasswordSchema.validateAsync(req.body);
        const user = yield User_1.default.findOne({ email: result.email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const password = (0, helpers_1.generateRandomPassword)(10);
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        user.password = hashedPassword;
        yield user.save();
        (0, helpers_1.sendEmail)(user.name, user.email, "Hello " + user.name, (0, helpers_1.generateResetPasswordMessage)(user.name, password));
        return res.status(200).json({ password });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.reset_password = reset_password;
