import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import { editUserSchema } from "../validations/userValidation";
import {
  getCoachesService,
  updateCoachOrAdminService,
} from "../services/coachService";
import { DUPLICATE_DOCUMENT } from "../utils/errorCodes";
import CustomError from "../middlewares/customError";
dotenv.config();

export const getCoaches = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role } = req.user;
    const searchString = req.query.searchString || "";
    const coachesPerPage = Number(req.query.coachesPerPage) || 10;
    const sortBy = req.query.sortBy || "entry";
    const coaches = await getCoachesService(role, {
      searchString,
      coachesPerPage,
      sortBy,
    });
    console.log({ coaches });
    return res.status(200).json(coaches);
  } catch (error) {
    next(error);
  }
};

export const updateCoachOrAdmin = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;

    const { name, email, role } = req.body;

    const validationResult = editUserSchema.validate({ name, email, role });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const user = await updateCoachOrAdminService(userId, { name, email, role });
    return res.status(200).send(user);
  } catch (error: any) {
    if (error.code === 11000) {
      const err = new CustomError(DUPLICATE_DOCUMENT, "Duplicate user", 400);
      next(err);
    }

    next(error);
  }
};
