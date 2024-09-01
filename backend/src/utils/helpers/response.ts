import CustomError from "../../middlewares/customError";
import { IQuestion } from "../../models/Question";
import Response, { IResponse } from "../../models/Response";
import { NOT_ALLOWED } from "../errorCodes";
import { QuestionType } from "../types";

export const upsertResponse = async (
  question: IQuestion,
  value: string | string[],
  userId: string
) => {
  const selectedOptions = Array.isArray(value) ? [...new Set(value)] : [value];

  if (question.type !== QuestionType.Text) {
    const areOptionsValid = selectedOptions.every((option: string) =>
      question.options.includes(option)
    );

    if (!areOptionsValid) {
      throw new CustomError(
        NOT_ALLOWED,
        `Please, choose from '${question.options.join(", ")}' options for '${
          question.prompt
        }'`,
        400
      );
    }
  }

  if (Array.isArray(value)) {
    if (question.type === QuestionType.Text) {
      throw new CustomError(NOT_ALLOWED, "Please send a text response", 400);
    }

    if (question.type === QuestionType.SingleSelect) {
      throw new CustomError(
        NOT_ALLOWED,
        "Please provide a single text response with your chosen option.",
        400
      );
    }
  }

  const relatedQuestionPopulated = await question.populate<{
    responseIds: IResponse[];
  }>("responseIds");

  const oldResponse = relatedQuestionPopulated.responseIds.find(
    (response) => response.userId.toString() === userId
  );

  if (!oldResponse) {
    const newResponse = await Response.create({ value, userId });
    question.responseIds.push(newResponse.id);
    return await question.save();
  }

  const response = await Response.findByIdAndUpdate(
    oldResponse._id,
    { value },
    { new: true }
  );

  return response;
};
