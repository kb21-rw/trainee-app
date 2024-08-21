import { Document, Schema, model } from "mongoose";
import { IUser } from "./User";

export interface IResponse extends Document {
  userId: IUser["_id"];
  text: null | string | string[];
}

const ResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: Schema.Types.Mixed,
      default: null,
      validate: {
        validator: function (value: null | string | string[]) {
          return (
            value === null ||
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
