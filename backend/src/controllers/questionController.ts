import { Response, Request, NextFunction } from "express";
import {
  createQuestionValidation,
  updateQuestionValidation,
} from "../validations/questionValidation";
import { CreateQuestionType, Search } from "../utils/types";
import { ValidationResult } from "joi";
import {
  createQuestionService,
  getAllQuestionsService,
  updateQuestionService,
} from "../services/questionService";
import { deleteFormService } from "../services/formService";

export const createQuestion = async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    const { formId } = req.params;
    const { title, type, options }: CreateQuestionType = req.body;
    const validationResult: ValidationResult<CreateQuestionType> =
      createQuestionValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const createdQuestion = await createQuestionService(formId, {
      title,
      type,
      options,
    });

    return res.status(201).json(createdQuestion);
  } catch (error) {
    next(error);
  }
};

export const getAllQuestions = async (
  req: Request<object, object, object, Search>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchString = req.query.searchString || "";
    const typeQuery = req.query.typeQuery || "";
    const questions = await getAllQuestionsService(searchString, typeQuery);
    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { questionId } = req.params;
    const validationResult: ValidationResult<CreateQuestionType> =
      updateQuestionValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const { title, type, options }: CreateQuestionType = req.body;
    const updatedQuestion = updateQuestionService(questionId, {
      title,
      type,
      options,
    });
    return res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { questionId } = req.params;
    await deleteFormService(questionId);
    return res.status(204).json({ message: "Question deleted successfully" });
  } catch (error) {
    next(error);
  }
};
