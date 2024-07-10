import { Schema, model } from "mongoose";
import { QuestionType } from "../utils/types";
export interface QuestionProperties {
  _id: string;
  title: string;
  type: QuestionType.TEXT | QuestionType.SINGLESELECT | QuestionType.MULTIPLE_CHOICE;
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
      enum: [QuestionType.TEXT, QuestionType.SINGLESELECT,QuestionType.MULTIPLE_CHOICE],
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
