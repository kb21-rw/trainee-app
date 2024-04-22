import { Schema, model } from "mongoose";
import { Role } from "../utils/types";

export interface UserProperties {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  coach: string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
  },
  { timestamps: {} }
);
UserSchema.index({ name: "text" });

export default model("User", UserSchema);
