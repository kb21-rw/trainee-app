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
exports.get_coaches = void 0;
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
