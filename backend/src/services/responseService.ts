import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import {
  CreateApplicationResponseDto,
  CreateResponseDto,
  QuestionType,
} from "../utils/types";
import Response, { IResponse } from "../models/Response";
import User, { IUser } from "../models/User";
import {
  COHORT_NOT_FOUND,
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import Form from "../models/Form";
import Cohort from "../models/Cohort";
import { getCurrentCohort } from "../utils/helpers/cohort";

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
      "Only admin or the coach of a trainee can provide a response",
      403
    );
  }

  const selectedOptions = Array.isArray(text) ? text : [text];

  if (relatedQuestion.type !== QuestionType.TEXT) {
    const invalidOptions = selectedOptions.every(
      (option: string) => !relatedQuestion.options.includes(option)
    );

    if (invalidOptions) {
      throw new CustomError(
        NOT_ALLOWED,
        `You can only choose from ${relatedQuestion.options.join(
          ", "
        )} options`,
        400
      );
    }
  }

  const relatedQuestionPopulated = await relatedQuestion.populate<{
    responseIds: IResponse[];
  }>("responseIds");

  const oldResponse = relatedQuestionPopulated.responseIds.find(
    (response) => response.userId.toString() === traineeId
  );

  const responseText =
    relatedQuestion.type === QuestionType.MULTI_SELECT ? selectedOptions : text;

  let response;
  if (oldResponse) {
    response = await Response.findByIdAndUpdate(
      oldResponse._id,
      { text: responseText },
      { new: true }
    );
  } else {
    response = await Response.create({ userId: traineeId, text: responseText });
    relatedQuestion.responseIds.push(response.id);
    await relatedQuestion.save();
  }

  const responseBody = {
    ...response?.toObject(),
    text: response?.text,
  };

  return responseBody;
};

export const createApplicantResponseService = async (
  loggedInUser: IUser,
  responseData: CreateApplicationResponseDto[]
) => {

  const currentCohort = await getCurrentCohort();

  if (!currentCohort.applicationFormId) {
    throw new CustomError(NOT_ALLOWED, "There is no open application", 401);
  }

  const applicationForm = await Form.findById(currentCohort.applicationFormId);

  if (!applicationForm)
    throw new CustomError(NOT_ALLOWED, "There is no open application", 401);

  //check if all question in the form are in the responseData
  if (
    applicationForm.questionIds.every((questionId) =>
      responseData
        .map((response) => response.questionId)
        .includes(questionId.toString())
    )
  )
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
