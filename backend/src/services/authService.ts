/* eslint-disable no-useless-catch */
import { compare, hash } from "bcryptjs";
import CustomError from "../middlewares/customError";
import {
  INVALID_CREDENTIAL,
  NOT_ALLOWED,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import {
  generateMessage,
  generateRandomPassword,
  generateResetPasswordMessage,
  sendEmail,
} from "../utils/helpers";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/authValidation";
import User from "../models/User";
import { ACCESS_TOKEN_EXPIRATION, secret } from "../constants";
import jwt from "jsonwebtoken";

export const registerService = async (user: any, body: any) => {
  let newUser;
  try {
    if (user.role !== "ADMIN") {
      throw new CustomError(NOT_ALLOWED, "Only admins can register users", 403);
    }

    const result = await registerSchema.validateAsync(body);
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

    return createdUser;
  } catch (error) {
    console.log("first", error);
    throw error;
  }
};

export const loginService = async (body: any) => {
  try {
    const result = await loginSchema.validateAsync(body);
    const user: any = await User.findOne({ email: result.email });
    if (!user) {
      throw new CustomError(USER_NOT_FOUND, "User not found", 404);
    }

    if (user.role === "TRAINEE") {
      throw new CustomError(
        NOT_ALLOWED,
        "Trainees are not allowed to login yet",
        409,
      );
    }

    const match = await compare(result.password, user.password);
    if (!match) {
      throw new CustomError(INVALID_CREDENTIAL, "Invalid credential", 401);
    }

    const accessToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      secret,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      },
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (body: any) => {
  try {
    const result: any = await resetPasswordSchema.validateAsync(body);
    const user: any = await User.findOne({ email: result.email });
    if (!user) {
      throw new CustomError(USER_NOT_FOUND, "User not found", 404);
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
    return password;
  } catch (error: any) {
    throw error;
  }
};
