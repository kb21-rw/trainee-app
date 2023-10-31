import { Response, Request } from "express";
import {
  createQuestionValidation,
  updateQuestionValidation,
} from "../validations/questionValidation";
import Form from "../models/Form";
import Question from "../models/Question";
import { CreateQuestionType, QuestionType, Search } from "../utils/types";
import { ValidationResult } from "joi";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const validationResult: ValidationResult<CreateQuestionType> =
      createQuestionValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const { title, type, options }: CreateQuestionType = req.body;

    const relatedForm = await Form.findById(formId);
    if (!relatedForm) {
      return res.status(404).json({ error: "That form is not found." });
    }

    const createQuestion = await Question.create({ title, type, options });
    if (createQuestion) {
      relatedForm.questionsId.push(createQuestion._id);
    }

    await relatedForm.save();

    return res.status(201).json(createQuestion);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getAllQuestions = async (
  req: Request<object, object, object, Search>,
  res: Response,
) => {
  try {
    const searchString = req.query.searchString || "";
    const typeQuery = req.query.typeQuery || "";
    const questions: QuestionType[] = await Question.find({
      title: { $regex: searchString, $options: "i" },
      type: { $regex: typeQuery, $options: "i" },
    });

    return res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const validationResult: ValidationResult<CreateQuestionType> =
      updateQuestionValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const { title, type, options }: CreateQuestionType = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question is not found" });
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

    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question is not found" });
    }

    return res.status(204).json({ message: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
