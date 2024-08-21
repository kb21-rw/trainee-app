import Joi from "joi";
import { ApplicantDecision } from "../utils/types";

export const createCohortValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100).optional(),
  startDate: Joi.date().optional().messages({
    "date.base": "Start date must be a valid date",
  }),
  endDate: Joi.date()
    .greater(Joi.ref('startDate'))
    .optional()
    .messages({
      "date.base": "End date must be a valid date",
      "date.greater": "End date must be later than start date",
    }),

  stages: Joi.array().items(
    Joi.object({ title: Joi.string().min(1), description: Joi.string() })
  ),
});

export const updateCohortValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
  stages: Joi.array().items(
    Joi.object({
      id: Joi.string()
        .hex()
        .length(24)
        .message("stageId is not valid")
        .optional(),
      title: Joi.string().min(1),
      description: Joi.string(),
    })
  ),
});

export const applicationDecisionSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .message("userId is not valid")
    .required(),
  decision: Joi.string()
    .valid(ApplicantDecision.Accepted, ApplicantDecision.Rejected)
    .required(),
  stageId: Joi.when("decision", {
    is: Joi.valid(ApplicantDecision.Rejected),
    then: Joi.string()
      .hex()
      .length(24)
      .message("stageId is not valid")
      .required(),
  }),
  feedback: Joi.string().optional(),

});
