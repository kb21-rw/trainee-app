import { Document, Schema, model } from "mongoose";
import { FormType } from "../utils/types";
import { IQuestion } from "./Question";

export interface IForm extends Document {
  title: string;
  description: string;
  questionIds: IQuestion["_id"][];
}

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    questionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    type: {
      type: String,
      enum: FormType,
      default: FormType.Trainee,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: {} }
);
FormSchema.index({ title: "text", description: "text", type: "text" });

export default model("Form", FormSchema);
