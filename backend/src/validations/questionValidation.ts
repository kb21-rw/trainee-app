import Joi from "joi";

export const createQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid("text", "dropdown", "multiple-choice").required(),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: "dropdown",
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
  multipleChoiceOptions: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        isCorrect: Joi.boolean().required(),
      })
    )
    .when("type", {
      is: "multiple-choice",
      then: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
          })
        )
        .min(1)
        .required(),
      otherwise: Joi.array().items(Joi.object()).optional(),
    }),
});
export const updateQuestionValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  type: Joi.string().valid("text", "dropdown", "multiple-choice"),
  options: Joi.array()
    .items(Joi.string())
    .when("type", {
      is: "dropdown",
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().items(Joi.string()).optional(),
    }),
  multipleChoiceOptions: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        isCorrect: Joi.boolean().required(),
      })
    )
    .when("type", {
      is: "multiple-choice",
      then: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
          })
        )
        .min(1)
        .required(),
      otherwise: Joi.array().items(Joi.object()).optional(),
    }),
});