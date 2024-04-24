import { Schema, model } from "mongoose";
import { FormType } from "../utils/types";

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    questionsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    type: {
      type: String,
      enum: FormType,
      default: FormType.TRAINEE
    }
  },
  { timestamps: {} }
);
FormSchema.index({ title: "text", description: "text", type: "text" });

export default model("Form", FormSchema);
