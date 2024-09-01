import { Document, Schema, model } from "mongoose";
import { IUser } from "./User";

export interface IResponse extends Document {
  userId: IUser["_id"];
  value: string | string[];
}

const ResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value: string | string[]) {
          return (
            typeof value === "string" ||
            (Array.isArray(value) &&
              value.every((item) => typeof item === "string"))
          );
        },
        message: (props: { value: any }) =>
          `${props.value} is not a string or an array of strings!`,
      },
    },
  },
  { timestamps: {} }
);

export default model("Response", ResponseSchema);
