import { hash } from "bcryptjs";
import CustomError from "../middlewares/customError";
import User from "../models/User";
import { NOT_ALLOWED, USER_NOT_FOUND } from "../utils/errorCodes";

/* eslint-disable no-useless-catch */
export const getProfileService = async (userId: string) => {
  try {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      throw new CustomError(USER_NOT_FOUND, "User not found", 404);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (
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
  try {
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
  } catch (error) {
    throw error;
  }
};

export const getUsersService = async (role: "ADMIN" | "COACH" | "TRAINEE") => {
  try {
    if (role !== "ADMIN") {
      throw new CustomError(NOT_ALLOWED, "Not allowed to view coaches", 403);
    }

    const coaches = await User.aggregate([
      {
        $match: { $or: [{ role: "ADMIN" }, { role: "COACH" }] },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "coach",
          as: "trainees",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          trainees: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
          },
        },
      },
    ]);
    return coaches;
  } catch (error) {
    throw error;
  }
};

export const deleeteUserService = async (userId: string) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new CustomError(USER_NOT_FOUND, "User not found", 404);
    }
  } catch (error) {
    throw error;
  }
};
