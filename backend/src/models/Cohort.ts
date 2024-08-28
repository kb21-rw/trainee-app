import { Document, Schema, Types, model } from "mongoose";
import { IForm } from "./Form";
import { IUser } from "./User";

export interface ICohort extends Document {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  applicants: IUser["_id"][];
  trainees: IUser["_id"][];
  coaches: IUser["_id"][];
  forms: IForm["_id"][];

applicationForm:{
  id: IForm["_id"];
    startDate: Date;
    endDate: Date;
}
  stages: { id: string; title: string; description: string }[];
  rejected: { userId: IUser["_id"]; stageId: string; feedback: string }[];

}

const CohortSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
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
    stages: [
      {
        id: { type: String, default: () => new Types.ObjectId().toString() },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        _id: false,
      },
    ],
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
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
    rejected: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        stageId: { type: String, required: true },
        feedback: { type: String, default: "" },
      },
    ],
    applicationForm:{
      id: {
        type: Schema.Types.ObjectId,
        default: null,
      },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null
        },
    }
  },
  { timestamps: {} }
);

CohortSchema.index({ name: "text", description: "text" });

export default model<ICohort>("Cohort", CohortSchema);
