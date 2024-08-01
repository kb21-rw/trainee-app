import Joi from "joi";
import { ApplicantDecision } from "../utils/types";

export const createCohortValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100).optional(),
  stages: Joi.array().items(
    Joi.object({ title: Joi.string().min(1), description: Joi.string() })
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
