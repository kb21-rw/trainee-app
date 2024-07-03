import Joi from "joi";

export const createQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid("text", "dropdown", "multiple-choice").required(),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid("dropdown", "multiple-choice"),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});

export const updateQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  type: Joi.string().valid("text", "dropdown", "multiple-choice"),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: Joi.valid("dropdown", "multiple-choice"),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
});
