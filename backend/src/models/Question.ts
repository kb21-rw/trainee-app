import { Document, Schema, model } from "mongoose";
import { IResponse } from "./Response";
import { QuestionType } from "../utils/types";

export interface IQuestion extends Document {
  id: string;
  title: string;
  type: QuestionType;
  options: string[];
  responseIds: IResponse["_id"][];
}

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: QuestionType,
      required: true,
    },

    required: {
      type: Boolean,
      default: true,
    },

    options: {
      type: [String],
      default: [],
    },

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
