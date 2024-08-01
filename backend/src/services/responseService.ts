import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import {
  CreateApplicationResponseDto,
  CreateResponseDto,
  QuestionType,
  Role,
} from "../utils/types";
import Response, { IResponse } from "../models/Response";
import User, { IUser } from "../models/User";
import {
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  RESPONSE_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import Form from "../models/Form";
import { getCurrentCohort } from "../utils/helpers/cohort";

export const createCoachResponseService = async (
  loggedInUser: IUser,
  traineeId: string,
  questionId: string,
  responseData: CreateResponseDto
) => {
  const { text } = responseData;

  const currentCohort = await getCurrentCohort();

  const trainee = await User.findOne({
    $and: [{ _id: traineeId }, { role: "TRAINEE" }],
  });

  if (!trainee || !currentCohort.trainees.includes(trainee.id)) {
    throw new CustomError(
      USER_NOT_FOUND,
      "The trainee does not exist in the current cohort!",
      400
    );
  }

  const relatedQuestion = await Question.findById(questionId);

  if (!relatedQuestion) {
    throw new CustomError(
      QUESTION_NOT_FOUND,
      "The question you're responding to does not exist!",
      400
    );
  }

  if (
    loggedInUser.role !== Role.Admin &&
    loggedInUser.id !== trainee.coach?.toString()
  ) {
    throw new CustomError(
      NOT_ALLOWED,
      "Only admin or the coach of a trainee can provide a response",
      403
    );
  }

  const selectedOptions = Array.isArray(text) ? [...new Set(text)] : [text];

  if (relatedQuestion.type !== QuestionType.Text) {
    const areOptionsValid = selectedOptions.every((option: string) =>
      relatedQuestion.options.includes(option)
    );

    if (!areOptionsValid) {
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
    relatedQuestion.type === QuestionType.MultiSelect ? selectedOptions : text;

  if (!oldResponse) {
    throw new CustomError(
      RESPONSE_NOT_FOUND,
      "Responses not found, make sure you're responding to the form in the current cohort",
      404
    );
  }

  const response = await Response.findByIdAndUpdate(
    oldResponse._id,
    { text: responseText },
    { new: true }
  );

  return response;
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
