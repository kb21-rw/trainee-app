import Joi from "joi";
import { FormType } from "../utils/types";

export const createFormValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100),
  type: Joi.string().valid(FormType.Application, FormType.Applicant, FormType.Trainee).required()
});

export const editFormValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
});