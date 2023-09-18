import Joi from "joi";

export const registerSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().required(),
   role: Joi.string().required(),
})