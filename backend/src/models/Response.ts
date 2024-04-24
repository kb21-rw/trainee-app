import { Schema, model } from "mongoose";

const ResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
);

export default model("Response", ResponseSchema);
