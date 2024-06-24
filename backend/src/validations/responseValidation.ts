import Joi from "joi";

export const createResponseValidation = Joi.object({
  text: Joi.string().min(1).required(),
});

export const createApplicantResponseValidation = Joi.array().items(
  Joi.object({
    questionId: Joi.string()
      .hex()
      .length(24)
      .message("A questionId is not valid"),
    answer: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ),
  })
);
