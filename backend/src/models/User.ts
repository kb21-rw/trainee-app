import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "COACH", "TRAINEE"],
    },
    coach: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: {} },
);
UserSchema.index({ name: "text" });

export default model("User", UserSchema);
