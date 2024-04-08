import { NextFunction, Response } from "express";
import { applicantSignup } from "../services/applicantService";
import { applicantSignin } from "../services/applicantService";
import { applicantSchema } from "../validations/applicantValidation";

export const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const applicant = req.user;
    const body = req.body;
    await applicantSchema.validateAsync(body);
    const newApplicant = await applicantSignup(applicant, body);
    delete newApplicant.password;
    return res.status(201).send(newApplicant);
  } catch (error: any) {
    next(error);
  }
};

export const signin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const applicant = req.user;
    const body = req.body;
    const newApplicant = await applicantSignin(applicant, body);
    return res.status(201).send(newApplicant);
  } catch (error: any) {
    next(error);
  }
};