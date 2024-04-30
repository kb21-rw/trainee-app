import { Response, NextFunction } from "express";
import { createResponseValidation } from "../validations/responseValidation";
import { createResponseService } from "../services/responseService";

export const createResponse = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.query;
    const loggedInUser = req.user;
    await createResponseValidation.validateAsync(req.body);
    const createdResponse = await createResponseService(
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
