import { Document, Schema, model } from "mongoose";
import dayjs from "dayjs";
import { IForm } from "./Form";
import { IUser } from "./User";

export interface ICohort extends Document {
  name: string;
  description: string;
  isActive: boolean;
  applicants: IUser["_id"][];
  trainees: IUser["_id"][];
  coaches: IUser["_id"][];
  forms: IForm["_id"][];
applicationForm:{
  applicationFormId: IForm["_id"];
  applicationPeriod: {
    startDate: Date;
    endDate: Date;
  };
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
      applicationFormId: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      applicationPeriod: {
        startDate: {
          type: Date,
          required: true,
          default: dayjs().startOf('day').toDate(),
        },
        endDate: {
          type: Date,
          required: true,
          default: dayjs().add(30, 'day').endOf('day').toDate(),
        },
      },
    }
  },
  { timestamps: {} }
);

CohortSchema.index({ name: "text", description: "text" });

export default model<ICohort>("Cohort", CohortSchema);
