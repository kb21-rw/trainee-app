import { ObjectId } from "mongoose";
import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import Response from "../models/Response";
import User from "../models/User";
import { INVALID_MONGODB_ID, NOT_ALLOWED } from "../utils/errorCodes";
import { CreateResponseDto } from "../utils/types";

interface IResponse {
  _id: ObjectId;
  userId: ObjectId;
  text: string;
}

export const createResponseService = async (
  loggedInUserId: string,
  traineeId: string,
  questionId: string,
  responseData: CreateResponseDto
) => {
  const { text } = responseData;

  const trainee = await User.findById(traineeId);
  const relatedQuestion = await Question.findById(questionId);

  if (!relatedQuestion || !trainee) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  if (!trainee.coach) {
    throw new CustomError(
      NOT_ALLOWED,
      "Only trainees can be given response",
      403
    );
  }

  if (loggedInUserId !== trainee.coach.toString()) {
    throw new CustomError(
      NOT_ALLOWED,
      "You can only give response to your trainees",
      403
    );
  }

  if (
    relatedQuestion.type === "dropdown" &&
    !relatedQuestion.options.includes(text)
  ) {
    throw new CustomError(
      NOT_ALLOWED,
      "You can only choose from the available options",
      400
    );
  }

  const relatedQuestionPopulated = await relatedQuestion.populate<{
    responseIds: IResponse[];
  }>("responseIds");

  const oldResponse = relatedQuestionPopulated.responseIds.find(
    (response) => response.userId.toString() === traineeId
  );

  if (oldResponse) {
    const response = await Response.findByIdAndUpdate(
      oldResponse._id,
      { text },
      { new: true }
    );
    return response;
  }

  const createdResponse = await Response.create({ userId: traineeId, text });
  relatedQuestion.responseIds.push(createdResponse.id);
  await relatedQuestion.save();

  return createdResponse;
};
