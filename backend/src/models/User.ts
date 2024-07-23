import { Document, Schema, model } from "mongoose";
import { Role } from "../utils/types";

export interface IUser extends Document {
  userId: number;
  name: string;
  email: string;
  verified: boolean;
  applied: boolean;
  password: string;
  role: Role;
  coach: string;
  googleId: string;
}

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    applied: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: Role,
    },
    coach: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: {} }
);
UserSchema.index({ name: "text" });

export default model("User", UserSchema);
