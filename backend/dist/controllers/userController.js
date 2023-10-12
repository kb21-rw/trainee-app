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
exports.update_user = exports.delete_user = exports.get_users = exports.update_profile = exports.get_profile = void 0;
const userValidation_1 = require("../validations/userValidation");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const get_profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield User_1.default.findById(userId, { password: 0 });
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.get_profile = get_profile;
const update_profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body;
        const validationResult = userValidation_1.ProfileSchema.validate({ name, email, password });
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            user.password = hashedPassword;
        }
        yield user.save();
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.update_profile = update_profile;
const get_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.user;
        if (role !== "ADMIN") {
            return res.status(403).send("Not allowed to view coaches");
        }
        const coaches = yield User_1.default.aggregate([
            {
                $match: { $or: [{ role: "ADMIN" }, { role: "COACH" }] },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "coach",
                    as: "trainees",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    trainees: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        role: 1,
                    },
                },
            },
        ]);
        return res.status(200).json(coaches);
    }
    catch (error) {
        res.status(400).send(400);
    }
});
exports.get_users = get_users;
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).send("User deleted successfully");
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.delete_user = delete_user;
const update_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, email, role } = req.body;
        const validationResult = userValidation_1.editUserSchema.validate({ name, email, role });
        if (validationResult.error) {
            console.log(validationResult);
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (role) {
            user.role = role;
        }
        yield user.save();
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.update_user = update_user;
