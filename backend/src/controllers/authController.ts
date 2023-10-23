import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
} from "../validations/authValidation";
import User from "../models/User";
import {
  generateRandomPassword,
  sendEmail,
  generateMessage,
  generateResetPasswordMessage,
} from "../utils/helpers";
import { secret, ACCESS_TOKEN_EXPIRATION } from "../constants";
import { hash, compare } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req: any, res: Response) => {
  let newUser;
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      return res.status(400).send("Only admins can register users");
    }

    const result = await registerSchema.validateAsync(req.body);
    let password: string = "";
    if (result.role === "COACH" || result.role === "ADMIN") {
      password = generateRandomPassword(10);
      const hashedPassword = await hash(password, 10);
      newUser = {
        ...result,
        name: result.name.trim().replace(/\s+/g, " "),
        password: hashedPassword,
      };
    } else {
      newUser = { ...result, name: result.name.trim().replace(/\s+/g, " ") };
    }

    const createdUser: any = await User.create(newUser);
    if (createdUser) {
      await sendEmail(
        createdUser.name,
        createdUser.email,
        "Welcome " + createdUser.name,
        generateMessage(
          createdUser.name,
          createdUser.email,
          createdUser.role,
          password,
        ),
      );
    }

    return res.status(201).send({ ...result, password });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user: any = await User.findOne({ email: result.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "TRAINEE") {
      return res
        .status(403)
        .json({ message: "Trainees are not allowed to login yet" });
    }

    const match = await compare(result.password, user.password);
    if (!match) {
      return res.status(403).json({ message: "Invalid credential" });
    }
    const accessToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      secret,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      },
    );
    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ accessToken });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const result: any = await resetPasswordSchema.validateAsync(req.body);
    const user: any = await User.findOne({ email: result.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const password = generateRandomPassword(10);
    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    await sendEmail(
      user.name,
      user.email,
      "Hello " + user.name,
      generateResetPasswordMessage(user.name, password),
    );
    return res.status(200).json({ password });
  } catch (error: any) {
    return res.status(400).send(error);
  }
};
