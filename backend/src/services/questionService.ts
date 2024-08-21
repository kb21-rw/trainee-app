import { Types } from "mongoose";
import CustomError from "../middlewares/customError";
import Form from "../models/Form";
import Question from "../models/Question";
import Response from "../models/Response";
import {
  FORM_NOT_FOUND,
  QUESTION_NOT_FOUND,
} from "../utils/errorCodes";
import {
  CreateQuestionDto,
  FormType,
  IQuestion,
  QuestionType,
} from "../utils/types";
import { getCurrentCohort } from "../utils/helpers/cohort";

export const createQuestionService = async (
  formId: string,
  questionData: CreateQuestionDto
) => {
  const { title, type, options } = questionData;
  const relatedForm = await Form.findById(formId);
  if (!relatedForm) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  const currentCohort = await getCurrentCohort();

  const createdQuestion = await Question.create({
    title,
    type,
    options,
    responseIds: [],
  });

  relatedForm.questionIds.push(createdQuestion.id);

  let userIds: Types.ObjectId[] = [];

  if (relatedForm.type === FormType.Applicant) {
    userIds = currentCohort.applicants;
  }

  if (relatedForm.type === FormType.Trainee) {
    userIds = currentCohort.trainees;
  }

  const responseIds = await Promise.all(
    userIds.map(async (userId) => {
      const response = new Response({ userId });
      await response.save();
      return response._id;
    })
  );
  createdQuestion.responseIds = responseIds;
  await createdQuestion.save();

  return await relatedForm.save();
};

export const getAllQuestionsService = async (
  searchString: string,
  typeQuery: string
) => {
  const questions: IQuestion[] = await Question.find({
    title: { $regex: searchString, $options: "i" },
    type: { $regex: typeQuery, $options: "i" },
  });
  return questions;
};

export const updateQuestionService = async (
  questionId: string,
  {
    title,
    type,
    options,
  }: { title?: string; type?: QuestionType; options?: string[] }
) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found", 404);
  }

  if (title) question.title = title;

  if (type) question.type = type;

  if (options) question.options = options;

  if (type === QuestionType.Text) question.options = [];

  await Response.updateMany(
    { _id: { $in: question.responseIds } },
    { text: null }
  );

  return await question.save();
};

export const deleteQuestionService = async (questionId: string) => {
  const question = await Question.findByIdAndDelete(questionId);

  if (!question) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found!", 400);
  }

  await Form.updateOne(
    {
      questionIds: question.id,
    },
    { $pull: { questionIds: question.id } }
  );

  await Response.deleteMany({ _id: { $in: question.responseIds } });
};
