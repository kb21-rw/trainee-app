import CustomError from "../middlewares/customError";
import Question from "../models/Question";
import {
  CreateApplicationResponseDto,
  CreateResponseDto,
  FormType,
} from "../utils/types";
import Response, { ResponseProperties } from "../models/Response";
import User, { UserProperties } from "../models/User";
import {
  NOT_ALLOWED,
  QUESTION_NOT_FOUND,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import Form from "../models/Form";

export const createResponseService = async (
  loggedInUser: UserProperties,
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

  if (
    relatedQuestion.type === "dropdown" &&
    !relatedQuestion.options.includes(text)
  ) {
    throw new CustomError(
      NOT_ALLOWED,
      `You can only choose from ${relatedQuestion.options.join(",")} options`,
      400
    );
  }

  const selectedOptions = Array.isArray(text) ? text : [text];

  if (relatedQuestion.type === "multiple-choice") {
    const availableOptions = relatedQuestion.options.join(',').split(',').map((option: string) => option.trim());

    const invalidOptions = selectedOptions.filter(
      (option: string) => !availableOptions.includes(option)
    );

    if (invalidOptions.length > 0) {
      throw new CustomError(
        NOT_ALLOWED,
        `Invalid options: ${invalidOptions.join(", ")}. You can only choose from ${availableOptions.join(", ")} options`,
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

  const responseText = relatedQuestion.type === "multiple-choice" ? selectedOptions.join(", ") : text;

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

  if (!response) {
    throw new CustomError(500, "Failed to save the response", 500);
  }

  const responseBody = {
    ...response.toObject(),
    text: response.text.split(',').map((option: string) => option.trim())
  };

  return responseBody;
};

export const createApplicantResponseService = async (
  loggedInUser: UserProperties,
  responseData: CreateApplicationResponseDto[]
) => {
  const applicationForm = await Form.findOne({
    $and: [{ type: FormType.APPLICANT }, { isActive: true }],
  });

  if (!applicationForm)
    throw new CustomError(NOT_ALLOWED, "There is no open application", 401);


  if (
    applicationForm.questionIds.toString() !==
    responseData.map((response) => response.questionId).toString()
  )

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
          responseIds: ResponseProperties[];
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
