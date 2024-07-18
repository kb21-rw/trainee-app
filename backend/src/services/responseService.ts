import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import {
  CreateApplicationResponseDto,
  CreateResponseDto,
  FormType,
} from "../utils/types";
import Response, { IResponse } from "../models/Response";
import User, { IUser } from "../models/User";
import {
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import Form from "../models/Form";

export const createResponseService = async (
  loggedInUser: IUser,
  traineeId: string,
  questionId: string,
  responseData: CreateResponseDto
) => {
  const { text } = responseData;

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
      "Only admin or the coach of a train can provide a response",
      403
    );
  }

  if (
    relatedQuestion.type === "dropdown" &&
    !relatedQuestion.options.includes(text)
  ) {
    throw new CustomError(
      NOT_ALLOWED,
      `You can only choose from ${relatedQuestion.options} options`,
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

export const createApplicantResponseService = async (
  loggedInUser: IUser,
  responseData: CreateApplicationResponseDto[]
) => {
  const applicationForm = await Form.findOne({
    $and: [{ type: FormType.APPLICANT }, { isActive: true }],
  });

  if (!applicationForm)
    throw new CustomError(NOT_ALLOWED, "There is no open application", 401);

  //check if all question in the form are in the responseData
  const areAllQuestionsAnswered = applicationForm.questionIds.every(
    (questionId) =>
      responseData.map((response) => response.questionId).includes(questionId.toString())
  );
  
  if (!areAllQuestionsAnswered )
    throw new CustomError(NOT_ALLOWED, "Some questions are not answered", 401);

  return Promise.all(
    responseData.map(async (response) => {
      const question = await Question.findById(response.questionId)
        .populate<{
          responseIds: IResponse[];
        }>("responseIds")
        .exec();
      const oldResponseId = question?.responseIds.find(
        (oldResponse) => oldResponse.userId.toString() === loggedInUser.id
      )?._id;

      if (!oldResponseId)
        throw new CustomError(500, "Can't get a response", 500);

      const updatedResponse = await Response.findByIdAndUpdate(
        oldResponseId,
        { text: response.answer },
        { new: true }
      );

      if (!updatedResponse)
        throw new CustomError(500, "Couldn't update response", 500);

      return {
        questionId: response.questionId,
        question: question.title,
        response: updatedResponse.text,
      };
    })
  );
};
