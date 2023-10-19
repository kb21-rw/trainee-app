"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'dropdown'],
        required: true,
    },
    options: [String],
}, { timestamps: {} });
QuestionSchema.index({ title: "text" });
exports.default = (0, mongoose_1.model)("Question", QuestionSchema);
