import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import {
  loginService,
  registerService,
  resetPasswordService,
} from "../services/authService";
import { DUPLICATE_USER } from "../utils/errorCodes";
import CustomError from "../middlewares/customError";

dotenv.config();

export const register = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const body = req.body;
    const newUser = await registerService(user, body);
    delete newUser.password;
    return res.status(201).send(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      const err = new CustomError(
        DUPLICATE_USER,
        "Please that user already exist",
        400,
      );
      next(err);
    }

    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = await loginService(req.body);
    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const password = resetPasswordService(req.body);
    return res.status(200).json({ password });
  } catch (error: any) {
    next(error);
  }
};
