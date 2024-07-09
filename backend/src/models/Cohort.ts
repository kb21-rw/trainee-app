import { ObjectId, Schema, model } from "mongoose";

export interface CohortProperties {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  applicationFormId: ObjectId;
  applicants: ObjectId[];
  trainees: ObjectId[];
  coaches: ObjectId[];
  forms: ObjectId[];
}

const CohortSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    applicationFormId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    coaches: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  { timestamps: {} }
);
CohortSchema.index({ name: "text", description: "text" });

export default model("Cohort", CohortSchema);
