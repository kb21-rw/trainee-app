import { Document, Schema, model } from "mongoose";
import { IForm } from "./Form";
import { IUser } from "./User";

export interface ICohort extends Document {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  applicationFormId: IForm["_id"];
  potentialApplicants: IUser["_id"][];
  applicants: IUser["_id"][];
  trainees: IUser["_id"][];
  coaches: IUser["_id"][];
  forms: IForm["_id"][];
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
    potentialApplicants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
