import Joi from "joi";

export const createResponseValidation = Joi.object({
  text: Joi.string().min(1).required(),
});
