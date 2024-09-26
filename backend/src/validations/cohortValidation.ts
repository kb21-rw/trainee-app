import Joi from "joi";
import { Decision } from "../utils/types";

export const createCohortValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100).optional(),
  stages: Joi.array()
    .items(Joi.object({ name: Joi.string().min(1), description: Joi.string() }))
    .min(1)
    .message("Add at least 1 stage"),
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
      name: Joi.string().min(1),
      description: Joi.string(),
    })
  ),
});

export const DecisionSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .message("userId is not valid")
    .required(),
  decision: Joi.string().valid(Decision.Accepted, Decision.Rejected).required(),
  feedback: Joi.string().optional(),
});
