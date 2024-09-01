import CustomError from "../middlewares/customError";
import Question, { IQuestion } from "../models/Question";
import {
  CreateApplicationResponseDto,
  CreateResponseDto,
  Role,
} from "../utils/types";
import { IResponse } from "../models/Response";
import User, { IUser } from "../models/User";
import {
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  RESPONSE_NOT_FOUND,
  USER_NOT_FOUND,
  APPLICATION_FORM_ERROR,
} from "../utils/errorCodes";
import Form from "../models/Form";
import { getCurrentCohort } from "../utils/helpers/cohort";
import dayjs from "dayjs";
import { Except } from "type-fest";
import { upsertResponse } from "../utils/helpers/response";

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

  const relatedQuestion = await Question.findById<IQuestion>(questionId);

  if (!relatedQuestion) {
    throw new CustomError(
      QUESTION_NOT_FOUND,
      "The question you're responding to does not exist!",
      400
    );
  }

  return upsertResponse(relatedQuestion, text, traineeId);
};

export const createApplicantResponseService = async (
  loggedInUser: IUser,
  responseData: CreateApplicationResponseDto[],
  submit: boolean = false
) => {
  const currentCohort = await getCurrentCohort();

  if (!currentCohort.applicationForm.id) {
    throw new CustomError(NOT_ALLOWED, "There is no open application", 404);
  }

  const applicationForm = await Form.findById(currentCohort.applicationForm.id);

  if (!applicationForm) {
    currentCohort.applicationForm.id = null;
    await currentCohort.save();
    throw new CustomError(NOT_ALLOWED, "There is no open application", 404);
  }

  const now = dayjs();
  const applicationStartDate = dayjs(currentCohort.applicationForm.startDate);
  const applicationEndDate = dayjs(currentCohort.applicationForm.endDate);

  if (now.isBefore(applicationStartDate)) {
    throw new CustomError(
      APPLICATION_FORM_ERROR,
      "Applications are not open yet!",
      401
    );
  }

  if (now.isAfter(applicationEndDate)) {
    throw new CustomError(
      APPLICATION_FORM_ERROR,
      "Application deadline has passed!",
      401
    );
  }

  const questionsNotFound = responseData.some(
    (data) =>
      !applicationForm.questionIds
        .map((questionId) => questionId.toString())
        .includes(data.questionId)
  );

  if (questionsNotFound) {
    throw new CustomError(
      QUESTION_NOT_FOUND,
      "You can only answer questions in the form",
      404
    );
  }

  // Create or update a response if already exists
  await Promise.all(responseData.map(async (response) => {
    const question = await Question.findById<IQuestion>(response.questionId)
      .populate<{
        responseIds: IResponse[];
      }>("responseIds")
      .exec();

    if (!question)
      throw new CustomError(QUESTION_NOT_FOUND, "Question was not found!", 404);

    return await upsertResponse(question, response.answer, loggedInUser.id);
  }));

  type PopulatedQuestionIds = Except<
    IQuestion,
    "responseIds" & { responseIds: IResponse[] }
  >[];

  const { _id, name, description, questionIds, type } =
    await applicationForm.populate<{ questionIds: PopulatedQuestionIds }>({
      path: "questionIds",
      populate: { path: "responseIds" },
    });

  // get responses of loggedIn user
  const questions = questionIds.map(
    ({ _id, prompt, type, isRequired, options, responseIds }) => {
      console.log(responseIds);
      const response = responseIds.find(
        (response) => response.userId.toString() === loggedInUser.id
      );

      if (submit) {
        if (isRequired && !response) {
          throw new CustomError(
            RESPONSE_NOT_FOUND,
            `'${prompt}' is required`,
            404
          );
        }
      }

      return {
        _id,
        prompt,
        type,
        isRequired,
        options,
        response: response?.text ?? null,
      };
    }
  );

  return {
    _id,
    name,
    description,
    type,
    questions,
  };
};
