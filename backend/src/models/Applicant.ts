import { Schema, model } from "mongoose";

const ApplicantSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
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
