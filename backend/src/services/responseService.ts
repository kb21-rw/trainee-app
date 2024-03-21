import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import Response from "../models/Response";
import User from "../models/User";
import { INVALID_MONGODB_ID, NOT_ALLOWED } from "../utils/errorCodes";
import { CreateResponseType } from "../utils/types";

export const createResponseService = async (
  loggedInUserId: string,
  traineeId: string,
  questionId: string,
  responseData: CreateResponseType
) => {
  const { text } = responseData;
  const trainee = await User.findById(traineeId);
  const relateQuestion = await Question.findById(questionId);
  if (!relateQuestion || !trainee) {
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

//   await Response.find({user})

  const createdResponse = await Response.create({ userId: traineeId, text });
  if (createdResponse) {
    relateQuestion.responseIds.push(createdResponse._id);
  }

  await relateQuestion.save();
  return relateQuestion;
};
