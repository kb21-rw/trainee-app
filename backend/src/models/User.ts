import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index:{
        unique: true,
        collation:{locale:'en',strength:2}
    }
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
