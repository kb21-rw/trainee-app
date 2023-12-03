import { Schema, model } from "mongoose";

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    active: {
      type: Boolean,
      required: true,
    },
    questionsId: [
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
