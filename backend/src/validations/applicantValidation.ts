import Joi from "joi";
import { ApplicantDecision } from "../utils/types";

export const applicationDecisionSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .message("A applicantId is not valid")
    .required(),
  decision: Joi.string()
    .valid(ApplicantDecision.ACCEPTED, ApplicantDecision.REJECTED)
    .required(),
  stageId: Joi.when("decision", {
    is: Joi.valid(ApplicantDecision.REJECTED),
    then: Joi.string()
      .hex()
      .length(24)
      .message("A applicantId is not valid")
      .required(),
  }),
  feedback: Joi.string().optional(),
});
