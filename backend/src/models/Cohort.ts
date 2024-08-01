import { Document, Schema, model } from "mongoose";
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
    applicationForm:{
      id: {
        type: Schema.Types.ObjectId,
        default: null,
      },
        startDate: {
          type: Date,
          required: true,
          default: null,
        },
        endDate: {
          type: Date,
          required: true,
          default: null
        },
    }
  },
  { timestamps: {} }
);

CohortSchema.index({ name: "text", description: "text" });

export default model<ICohort>("Cohort", CohortSchema);
