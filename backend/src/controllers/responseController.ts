import { Response, NextFunction } from "express";
import {
  createApplicantResponseValidation,
  createCoachResponseValidation,
} from "../validations/responseValidation";
import {
  createApplicantResponseService,
  createCoachResponseService,
} from "../services/responseService";

export const createCoachResponse = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.query;
    const loggedInUser = req.user;
    await createCoachResponseValidation.validateAsync(req.body);
    const createdResponse = await createCoachResponseService(
      loggedInUser,
      userId,
      questionId,
      req.body
    );
    return res.status(201).json(createdResponse);
  } catch (error) {
    next(error);
  }
};

export const createApplicantResponse = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUser = req.user;
    await createApplicantResponseValidation.validateAsync(req.body);
    const createdResponse = await createApplicantResponseService(
      loggedInUser,
      req.body,
      req.query.action === "submit"
    );
    return res.status(201).json(createdResponse);
  } catch (error) {
    next(error);
  }
};
