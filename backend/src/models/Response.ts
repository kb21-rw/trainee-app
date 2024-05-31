import { ObjectId, Schema, model } from "mongoose";

export interface ResponseProperties {
  _id: string;
  userId: ObjectId;
  text: string;
}

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
