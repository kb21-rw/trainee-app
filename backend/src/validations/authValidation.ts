import Joi from "joi";

export const registerSchema = Joi.object({
   name: Joi.string().alphanum().min(3).max(30).required(),
   email: Joi.string().email().required(),
   role: Joi.string().valid('ADMIN', 'COACH', 'TRAINEE').required(),
})
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
export const coachAssignSchema =Joi.object({
    coachId: Joi.string().required()
})