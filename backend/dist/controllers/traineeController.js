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
exports.update_trainee = exports.get_my_trainees = exports.get_trainees = void 0;
const userValidation_1 = require("../validations/userValidation");
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const update_trainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, coach, email } = req.body;
        const validationResult = userValidation_1.editUserSchema.validate({ name, coach, email });
        if (validationResult.error) {
            console.log(validationResult);
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (name) {
            user.name = name.trim().replace(/\s+/g, " ");
        }
        if (coach) {
            user.coach = coach;
        }
        if (email) {
            user.email = email;
        }
        yield user.save();
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});
exports.update_trainee = update_trainee;
