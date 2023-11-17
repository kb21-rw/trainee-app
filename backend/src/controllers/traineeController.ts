import { NextFunction, Response } from "express";
import { editUserSchema } from "../validations/userValidation";
import dotenv from "dotenv";
import {
  getTraineesForCoachService,
  getTraineesService,
  updateTraineeService,
} from "../services/traineeService";

dotenv.config();

export const getTrainees = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
  try {
    const trainees = await getTraineesService({
      searchString,
      sortBy,
      traineesPerPage,
    });
    return res.status(200).json(trainees);
  } catch (error) {
    next("failed to get trainees ");
  }
};

export const getTraineesForCoach = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
  try {
    const { id } = req.user;
    const trainees = await getTraineesForCoachService(id, {
      searchString,
      sortBy,
      traineesPerPage,
    });
    return res.status(200).json(trainees);
  } catch (error) {
    next(error);
  }
};

export const updateTrainee = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, coach, email } = req.body;
    const validationResult = editUserSchema.validate({ name, coach, email });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const user = updateTraineeService(userId, { name, coach, email });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
