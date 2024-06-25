import { Schema, model } from "mongoose";

export interface QuestionProperties {
  _id: string;
  title: string;
  type: "text" | "dropdown" | "multiple-choice";
  options: string[];
  multipleChoiceOptions?: { text: string; isCorrect: boolean }[];
  responseIds: string[];
}

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "dropdown", "multiple-choice"],
      required: true,
    },

    options: [String],

    multipleChoiceOptions: [{
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        default: false
      }
    }],

    responseIds: {
      type: [Schema.Types.ObjectId],
      ref: "Response",
      default: [],
    },
  },

  { timestamps: {} }
);

QuestionSchema.index({ title: "text" });

export default model("Question", QuestionSchema);
