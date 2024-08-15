import Joi from "joi";
import { Role } from "../utils/types";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  role: Joi.string().valid(Role.Admin, Role.Coach, Role.Trainee).required(),
  coach: Joi.string(),
});

export const applicantRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/ // Check for strong password required (Capital/Small letter, special character and a number)
  ).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
