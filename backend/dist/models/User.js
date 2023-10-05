"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "COACH", "TRAINEE"]
    },
    coach: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: {} });
UserSchema.index({ name: 'text' });
exports.default = (0, mongoose_1.model)("User", UserSchema);
