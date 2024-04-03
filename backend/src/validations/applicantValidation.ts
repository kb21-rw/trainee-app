import Joi from "joi";

export const applicantSchema = Joi.object({
  email: Joi.string().email().required(),
  password:Joi.string().required()

});
