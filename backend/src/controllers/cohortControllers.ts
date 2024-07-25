import { NextFunction, Request, Response } from "express";
import { createCohortValidation } from "../validations/cohortValidation";
import { createCohortService } from "../services/cohortService";

export const createCohortController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      await createCohortValidation.validateAsync(req.body);
    const createdCohort = await createCohortService(req.body);
    return res.status(201).json(createdCohort);
  } catch (error) {
    next(error);
  }
};
