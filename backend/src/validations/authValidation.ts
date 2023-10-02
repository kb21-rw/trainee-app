import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  role: Joi.string().valid("ADMIN", "COACH", "TRAINEE").required(),
  coach: Joi.string(),

});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const ProfileSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional()
});

export const coachAssignSchema = Joi.object({
  coachId: Joi.string().required()
});
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
})
