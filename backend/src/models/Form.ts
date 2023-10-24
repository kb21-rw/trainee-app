import { Schema, model } from "mongoose";

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: {} },
);
FormSchema.index({ title: "text", description: "text" });

export default model("Form", FormSchema);
