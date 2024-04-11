import Joi from "joi";

export const applicantSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[0-9])/)
});
