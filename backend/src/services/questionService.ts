import CustomError from "../middlewares/customError";
import Form from "../models/Form";
import Question from "../models/Question";
import Response from "../models/Response";
import User from "../models/User";
import { INVALID_MONGODB_ID, QUESTION_NOT_FOUND } from "../utils/errorCodes";
import { CreateQuestionDto, IQuestion } from "../utils/types";

export const createQuestionService = async (
  formId: string,
  questionData: CreateQuestionDto
) => {
  const { title, type, options, multipleChoiceOptions } = questionData;
  const relatedForm = await Form.findById(formId);
  if (!relatedForm) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalid Document ID", 400);
  }

  const createdQuestion = await Question.create({
    title,
    type,
    options,
    multipleChoiceOptions,
    responseIds: [],
  });

  if (createdQuestion) {
    relatedForm.questionsId.push(createdQuestion._id);

    const trainees = await User.find({ role: "TRAINEE" });

    const responseIds = await Promise.all(
      trainees.map(async (trainee) => {
        const response = new Response({
          userId: trainee._id,
        });
        await response.save();
        return response._id;
      })
    );
    createdQuestion.responseIds = responseIds;
    await createdQuestion.save();
  }

  await relatedForm.save();
  return relatedForm;
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
    multipleChoiceOptions,
  }: { title?: string; type?: "text" | "dropdown" | "multiple-choice"; options?: string[]; multipleChoiceOptions?: { text: string; isCorrect: boolean }[] }
) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new CustomError(QUESTION_NOT_FOUND, "Question not found", 404);
  }

  if (title) question.title = title;
  if (type) question.type = type;
  if (options) question.options = options;
  if (multipleChoiceOptions) question.multipleChoiceOptions = multipleChoiceOptions;

  if (type === "text") question.options = [];

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
      questionsId: question.id,
    },
    { $pull: { questionsId: question.id } }
  );

  await Response.deleteMany({ _id: { $in: question.responseIds } });
};