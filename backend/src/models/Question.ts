import { Schema, model } from "mongoose";

const QuestionSchema = new Schema(
    {
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
    },

    {timestamps: {}}
)

QuestionSchema.index({title: "text"});

export default model("Question", QuestionSchema);
