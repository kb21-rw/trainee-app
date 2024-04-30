import { Schema, model } from "mongoose";

export interface FormProperties {
  _id: string;
  title: string;
  description: string;
  questionsId: string[];
}

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
  },
  { timestamps: {} }
);
FormSchema.index({ title: "text", description: "text" });

export default model("Form", FormSchema);
