import Joi from "joi";

export const createFormValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100),
});
export const editFormValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
});
