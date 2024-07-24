import Joi from "joi";
import { QuestionType } from "../utils/types";

export const createQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid(QuestionType.TEXT, QuestionType.SINGLE_SELECT, QuestionType.MULTI_SELECT).required(),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid(QuestionType.SINGLE_SELECT, QuestionType.MULTI_SELECT),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});

export const updateQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  type: Joi.string().valid(QuestionType.TEXT, QuestionType.SINGLE_SELECT, QuestionType.MULTI_SELECT),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid(QuestionType.SINGLE_SELECT,QuestionType.MULTI_SELECT),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});
