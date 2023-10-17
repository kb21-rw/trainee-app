"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FormSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    questions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Question",
        }]
}, { timestamps: {} });
FormSchema.index({ title: "text", description: "text" });
exports.default = (0, mongoose_1.model)("Form", FormSchema);
