import Joi from "joi";

export const registerSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   role: Joi.string().required(),
})
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const ProfileSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  });