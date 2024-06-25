import { Schema, model } from "mongoose";
import { FormType } from "../utils/types";

export interface FormProperties {
  _id: string;
  title: string;
  description: string;
  questionIds: string[];
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
      default: FormType.TRAINEE,
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
