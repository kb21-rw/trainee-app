import { NextFunction, Request, Response } from "express";
import { applicationDecisionSchema } from "../validations/applicantValidation";
import { applicantDecisionService } from "../services/applicantService";

export const decision = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const body = req.body;
      await applicationDecisionSchema.validateAsync(body);
      const decision = await applicantDecisionService(user, body);
      return res.status(201).send(decision);
    } catch (error: any) {
      next(error);
    }
  };