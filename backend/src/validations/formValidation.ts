import Joi from "joi";
import { FormType } from "../utils/types";

export const createFormValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100),
  type: Joi.string().valid(FormType.APPLICANT)
});

export const editFormValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
});
