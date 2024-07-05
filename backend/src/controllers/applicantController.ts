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
    const applicant = req.user;

    const { email, password } = body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const newApplicant = await applicantSignin(req.user, body);

    switch (newApplicant) {
      case "user does not exist":
      case "Invalid email or password":
        return res.status(401).send(newApplicant);
      case "signed in succesfully":
        return res.status(201).send(newApplicant);
      default:
        return res.status(500).send("Internal Server Error");
    }
  } catch (error: any) {
    next(error);
  }
};
