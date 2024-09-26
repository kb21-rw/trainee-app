import Joi from "joi";
import { FormType } from "../utils/types";

export const createFormValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100),
  type: Joi.string()
    .valid(FormType.Application, FormType.Applicant, FormType.Trainee)
    .required(),
  startDate: Joi.when("type", {
    is: FormType.Application,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  endDate: Joi.when("type", {
    is: FormType.Application,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  stages: Joi.when("type", {
    is: FormType.Application,
    then: Joi.array().items(
      Joi.object({
        id: Joi.string()
          .hex()
          .length(24)
          .message("stageId is not valid")
          .optional(),
        name: Joi.string().min(1).required(),
        description: Joi.string(),
      })
    ),
    otherwise: Joi.forbidden(),
  }),
});

export const editFormValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
  type: Joi.string()
    .valid(FormType.Application, FormType.Applicant, FormType.Trainee)
    .required(),
  startDate: Joi.when("type", {
    is: FormType.Application,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  endDate: Joi.when("type", {
    is: FormType.Application,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  stages: Joi.when("type", {
    is: FormType.Application,
    then: Joi.array().items(
      Joi.object({
        id: Joi.string()
          .hex()
          .length(24)
          .message("stageId is not valid art")
          .optional(),
        name: Joi.string().min(1).required(),
        description: Joi.string(),
      })
    ),
    otherwise: Joi.forbidden(),
  }),
});
