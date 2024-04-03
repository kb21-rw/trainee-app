import { Schema, model } from "mongoose";

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "dropdown"],
      required: true,
    },

    options: [String],

    responseIds: {
      type: [Schema.Types.ObjectId],
      ref: "Response",
      default: [],
    },
  },

  { timestamps: {} }
);

QuestionSchema.index({ title: "text" });

export default model("Question", QuestionSchema);
