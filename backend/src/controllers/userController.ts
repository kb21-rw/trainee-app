import { NextFunction, Response } from "express";
import { ProfileSchema } from "../validations/userValidation";
import {
  deleteUserService,
  getProfileService,
  getUsersService,
  updateProfileService,
} from "../services/userService";

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
    await ProfileSchema.validateAsync(req.body);

    const user = await updateProfileService(userId, req.body);
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
