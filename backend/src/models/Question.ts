import { Schema, model } from "mongoose";

export interface QuestionProperties {
  _id: string;
  title: string;
  type: "text" | "dropdown";
  options: string[];
  responseIds: string[];
}

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
