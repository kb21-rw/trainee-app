import Joi from "joi";

export const createQuestionValidation = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    type: Joi.string().valid("text", "dropdown").required(),
    options: Joi.array().items(Joi.string())
  });