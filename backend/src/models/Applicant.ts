import { Schema, model } from "mongoose";

const ApplicantSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "applicant",
    },
  },
  { timestamps: {} }
);
ApplicantSchema.index({ name: "text" });

export default model("Applicant", ApplicantSchema);
