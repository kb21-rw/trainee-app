import { hash } from "bcryptjs";
import CustomError from "../middlewares/customError";
import User, { IUser } from "../models/User";
import { USER_NOT_FOUND } from "../utils/errorCodes";

export const getUserService = async (userId: string) => {
  const user = await User.findById<IUser>(userId, { password: 0 });
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  return user;
};

export const updateUserService = async (
  userId: string,
  {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  },
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (password) {
    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;
  }

  await user.save();
  return user;
};

export const deleteUserService = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  return user;
};
