import { NextFunction, Response } from "express";
import { applicantSignup } from "../services/applicantService";
import { applicantSignin } from "../services/applicantService";
import { applicantSchema } from "../validations/applicantValidation";
import {
  ErrorObject,
  handleValidationError,
} from "../middlewares/errorHandler";

export const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const applicant = req.user;
    const body = req.body;

    await applicantSchema.validateAsync(body);
    const newApplicant = await applicantSignup(applicant, body);
    return res.status(201).send({
      email: newApplicant.email,
      userId: newApplicant.userId,
      googleId: newApplicant.googleId,
      role: newApplicant.role,
    });
  } catch (error: any) {
    next(error);
  }
};

export const signin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    const newApplicant = await applicantSignin(applicant, body);
    if (!newApplicant) {
      const singInError: ErrorObject = {
        message: "",
        kind: "",
        keyValue: "",
        code: 400,
        name: "ValidationError",
        details: [{ message: "Incorrect email or password" }],
        statusCode: 400,
        errorCode: 400,
      };
      return handleValidationError(singInError, res);
    }

    res.status(201).send(newApplicant);
  } catch (error: any) {
    next(error);
  }
};
