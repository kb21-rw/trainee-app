import { Schema, model } from "mongoose";

const ResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      default: null,
    },
  },
  { timestamps: {} }
);

export default model("Response", ResponseSchema);
