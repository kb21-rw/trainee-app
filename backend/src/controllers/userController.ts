import { NextFunction, Response } from "express";
import { ProfileSchema } from "../validations/userValidation";
import dotenv from "dotenv";
import {
  deleteUserService,
  getProfileService,
  getUsersService,
  updateProfileService,
} from "../services/userService";

dotenv.config();

export const getProfile = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const user = await getProfileService(userId);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const validationResult = ProfileSchema.validate({ name, email, password });
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const user = await updateProfileService(userId, { name, email, password });
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user;
    const coaches = await getUsersService(role);
    return res.status(200).json(coaches);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    await deleteUserService(userId);
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    next(error);
  }
};
