import { Document, Schema, model } from "mongoose";
import { IResponse } from "./Response";
import { QuestionType } from "../utils/types";

export interface IQuestion extends Document {
  id: string;
  prompt: string;
  type: QuestionType;
  isRequired: boolean;
  options: string[];
  responseIds: IResponse["_id"][];
}

const QuestionSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: QuestionType,
      required: true,
    },

    isRequired: {
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
