import CustomError from "../middlewares/customError";
import Form from "../models/Form";
import Question from "../models/Question";
import Response from "../models/Response";
import { INVALID_MONGODB_ID, QUESTION_NOT_FOUND } from "../utils/errorCodes";
import { CreateQuestionType, QuestionType } from "../utils/types";

export const createQuestionService = async (
  formId: string,
  questionData: CreateQuestionType
) => {
  const { title, type, options } = questionData;
  const relatedForm = await Form.findById(formId);
  if (!relatedForm) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  const createQuestion = await Question.create({
    title,
    type,
    options,
    questionIds: [],
  });
  if (createQuestion) {
    relatedForm.questionsId.push(createQuestion._id);
  }

  await relatedForm.save();
  return relatedForm;
};

export const getAllQuestionsService = async (
  searchString: string,
  typeQuery: string
) => {
  const questions: QuestionType[] = await Question.find({
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
  }: { title: string; type: "text" | "dropdown"; options: string[] }
) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found", 404);
  }

  if (title) {
    question.title = title;
  }

  if (type) {
    question.type = type;
  }

  if (options) {
    question.options = options;
  }

  await question.save();
};

export const deleteQuestionService = async (questionId: string) => {
  const question = await Question.findByIdAndDelete(questionId);

  if (!question) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found!", 400);
  }

  await Response.deleteMany({ _id: { $in: question.responseIds } });
};
