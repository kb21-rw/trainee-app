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
exports.editTrainee = exports.editUser = exports.deleteUser = exports.assignCoach = exports.get_my_trainees = exports.get_trainees = exports.get_users = exports.get_coaches = exports.reset_password = exports.updateUserProfile = exports.getUserProfile = exports.login = exports.register = void 0;
const authValidation_1 = require("../validations/authValidation");
const User_1 = __importDefault(require("../models/User"));
const helpers_1 = require("../utils/helpers");
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_KEY || "";
const ACCESS_TOKEN_EXPIRATION = "500m"; // 5 minutes
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
            newUser = Object.assign(Object.assign({}, result), { password: hashedPassword });
        }
        else {
            newUser = Object.assign({}, result);
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
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body;
        const validationResult = authValidation_1.ProfileSchema.validate({ name, email, password });
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
exports.updateUserProfile = updateUserProfile;
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
const get_coaches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.user;
        const searchString = req.query.searchString || "";
        const coachesPerPage = Number(req.query.coachesPerPage) || 10;
        const sortBy = req.query.sortBy || "entry";
        if (role !== "ADMIN") {
            return res.status(403).send("Not allowed to view coaches");
        }
        const coaches = yield User_1.default.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: new RegExp(searchString, "i") } },
                        { email: { $regex: new RegExp(searchString, "i") } },
                    ],
                    role: { $in: ["ADMIN", "COACH"] },
                },
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
            {
                $sort: { [sortBy]: 1 },
            },
            {
                $limit: coachesPerPage,
            },
        ]);
        return res.status(200).json(coaches);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.get_coaches = get_coaches;
const get_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.user;
        if (role !== "ADMIN") {
            return res.status(403).send("Not allowed to view coaches");
        }
        const coaches = yield User_1.default.aggregate([
            {
                $match: { $or: [
                        { role: "ADMIN" },
                        { role: "COACH" }
                    ] },
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
const get_trainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchString = req.query.searchString || "";
    const traineesPerPage = Number(req.query.coachesPerPage) || 10;
    const sortBy = req.query.sortBy || "entry";
    try {
        const trainees = yield User_1.default.aggregate([
            {
                $match: {
                    $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
                    role: "TRAINEE",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "coach",
                    foreignField: "_id",
                    as: "coach",
                },
            },
            {
                $addFields: {
                    coach: {
                        $cond: {
                            if: { $eq: [{ $size: "$coach" }, 0] },
                            then: [{}],
                            else: "$coach",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    coach: {
                        $cond: {
                            if: { $eq: [{ $size: "$coach" }, 0] },
                            then: {},
                            else: {
                                $arrayElemAt: ["$coach", 0],
                            },
                        },
                    },
                },
            },
            {
                $sort: { [sortBy]: 1 },
            },
            {
                $limit: traineesPerPage,
            },
        ]);
        return res.status(200).json(trainees);
    }
    catch (error) {
        res.status(400).send("failed to get trainees ");
    }
});
exports.get_trainees = get_trainees;
const get_my_trainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchString = req.query.searchString || "";
    const traineesPerPage = Number(req.query.coachesPerPage) || 10;
    const sortBy = req.query.sortBy || "entry";
    try {
        const { id } = req.user;
        const coach = yield User_1.default.findById(id);
        const trainees = yield User_1.default.aggregate([
            {
                $match: {
                    coach: coach === null || coach === void 0 ? void 0 : coach._id,
                    role: "TRAINEE",
                    $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "coach",
                    foreignField: "_id",
                    as: "coach",
                },
            },
            {
                $addFields: {
                    coach: {
                        $cond: {
                            if: { $eq: [{ $size: "$coach" }, 0] },
                            then: [{}],
                            else: "$coach",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    coach: {
                        $cond: {
                            if: { $eq: [{ $size: "$coach" }, 0] },
                            then: {},
                            else: {
                                $arrayElemAt: ["$coach", 0],
                            },
                        },
                    },
                },
            },
            {
                $sort: { [sortBy]: 1 },
            },
            {
                $limit: traineesPerPage,
            },
        ]);
        return res.status(200).json(trainees);
    }
    catch (error) {
        res.status(400).send("failed to get trainees ");
    }
});
exports.get_my_trainees = get_my_trainees;
const assignCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { role } = req.user;
        if (role !== "ADMIN") {
            return res.status(400).send("Only admins can assign coach to trainees");
        }
        const result = yield authValidation_1.coachAssignSchema.validateAsync(req.body);
        const user = yield User_1.default.findById(id);
        if (user.role !== "TRAINEE") {
            return res.status(403).send("coach is assigned only to trainee");
        }
        const coach = yield User_1.default.findById(result.coach);
        if (coach.role !== "COACH") {
            return res
                .status(403)
                .send("only user with coach role can be assigned to be a coach");
        }
        user.coach = coach._id;
        yield user.save();
        return res.status(200).send("coach was assigned succesfully");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.assignCoach = assignCoach;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteUser = deleteUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, email, role } = req.body;
        const validationResult = authValidation_1.editUserSchema.validate({ name, email, role });
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
exports.editUser = editUser;
const editTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, coach } = req.body;
        const validationResult = authValidation_1.editUserSchema.validate({ name, coach });
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
        if (coach) {
            user.coach = coach;
        }
        yield user.save();
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.editTrainee = editTrainee;
