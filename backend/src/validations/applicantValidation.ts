import Joi from "joi";

export const applicationDecisionSchema = Joi.object({
  applicantId: Joi.string()
    .hex()
    .length(24)
    .message("A applicantId is not valid")
    .required(),
  decision: Joi.string().valid("ACCEPTED", "REJECTED").required(),
});
