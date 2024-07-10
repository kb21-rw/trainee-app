import Joi from "joi";
import { QuestionType } from "../utils/types";

export const createQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid(QuestionType.TEXT, QuestionType.SINGLESELECT, QuestionType.MULTIPLE_CHOICE).required(),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid(QuestionType.SINGLESELECT, QuestionType.MULTIPLE_CHOICE),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});

export const updateQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  type: Joi.string().valid(QuestionType.TEXT, QuestionType.SINGLESELECT, QuestionType.MULTIPLE_CHOICE),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid(QuestionType.SINGLESELECT,QuestionType.MULTIPLE_CHOICE),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});
