import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import { CreateResponseDto } from "../utils/types";
import Response, { ResponseProperties } from "../models/Response";
import User, { UserProperties } from "../models/User";
import {
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/errorCodes";

export const createResponseService = async (
  loggedInUser: UserProperties,
  traineeId: string,
  questionId: string,
  responseData: CreateResponseDto
) => {
  const { text, selectedOptions } = responseData;

  const trainee = await User.findOne({
    $and: [{ _id: traineeId }, { role: "TRAINEE" }],
  });

  if (!trainee) {
    throw new CustomError(USER_NOT_FOUND, "Trainee not found!", 400);
  }

  const relatedQuestion = await Question.findById(questionId);

  if (!relatedQuestion) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found!", 400);
  }

  if (
    loggedInUser.role !== "ADMIN" &&
    loggedInUser.id !== trainee.coach?.toString()
  ) {
    throw new CustomError(
      NOT_ALLOWED,
      "Only admin or the coach of a trainee can provide a response",
      403
    );
  }

  if (relatedQuestion.type === "dropdown" && text && !relatedQuestion.options.includes(text)) {
    throw new CustomError(
      NOT_ALLOWED,
      `You can only choose from ${relatedQuestion.options} options`,
      400
    );
  }

  if (relatedQuestion.type === "multiple-choice" && selectedOptions) {
    const validOptions = relatedQuestion.multipleChoiceOptions.map(option => option.text);
    const invalidOptions = selectedOptions.filter(option => !validOptions.includes(option));
    
    if (invalidOptions.length > 0) {
      throw new CustomError(
        NOT_ALLOWED,
        `Invalid options selected: ${invalidOptions.join(", ")}`,
        400
      );
    }
  }

  const relatedQuestionPopulated = await relatedQuestion.populate<{
    responseIds: ResponseProperties[];
  }>("responseIds");

  const oldResponse = relatedQuestionPopulated.responseIds.find(
    (response) => response.userId.toString() === traineeId
  );

  if (oldResponse) {
    const response = await Response.findByIdAndUpdate(
      oldResponse._id,
      relatedQuestion.type === "multiple-choice" ? { selectedOptions } : { text },
      { new: true }
    );
    return response;
  }

  const createdResponse = await Response.create(
    relatedQuestion.type === "multiple-choice"
      ? { userId: traineeId, selectedOptions }
      : { userId: traineeId, text }
  );

  relatedQuestion.responseIds.push(createdResponse.id);
  await relatedQuestion.save();

  return createdResponse;
};