import Joi from "joi";

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
});
