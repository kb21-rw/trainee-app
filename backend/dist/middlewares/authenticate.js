"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessKey = process.env.ACCESS_TOKEN_KEY || "";
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        return res.status(401).send("User not logged in");
    }
    const token = authHeader.split(" ")[1];
    (0, jsonwebtoken_1.verify)(token, accessKey, (err, decoded) => {
        if (err) {
            return res.status(403).send("access token not valid");
        }
        req.user = decoded;
        next();
    });
};
exports.verifyJWT = verifyJWT;
