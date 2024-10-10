import { Document, Schema, model } from "mongoose";
import { FormType } from "../utils/types";
import { IQuestion } from "./Question";

export interface IForm extends Document {
  name: string;
  description: string;
  type: FormType;
  questionIds: IQuestion["_id"][];
}

const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      required: true,
    },
  },
  { timestamps: {} }
);
FormSchema.index({ name: "text", description: "text", type: "text" });

export default model("Form", FormSchema);
