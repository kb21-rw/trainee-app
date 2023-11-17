/* eslint-disable no-useless-catch */
import CustomError from "../middlewares/customError";
import User from "../models/User";
import { NOT_ALLOWED, USER_NOT_FOUND } from "../utils/errorCodes";

export const getCoachesService = async (
  role: "ADMIN" | "COACH" | "TRAINEE",
  {
    searchString,
    sortBy,
    coachesPerPage,
  }: { searchString: string; sortBy: string; coachesPerPage: number },
) => {
  try {
    if (role !== "ADMIN") {
      throw new CustomError(NOT_ALLOWED, "Only admins can view coaches", 403);
    }

    const coaches = await User.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: new RegExp(searchString, "i") } },
            { email: { $regex: new RegExp(searchString, "i") } },
          ],
          role: { $in: ["ADMIN", "COACH"] },
        },
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
      {
        $sort: { [sortBy]: 1 },
      },
      {
        $limit: coachesPerPage,
      },
    ]);
    return coaches;
  } catch (error) {
    throw error;
  }
};

export const updateCoachOrAdminService = async (
  userId: string,
  {
    name,
    email,
    role,
  }: { name: string; email: string; role: "ADMIN" | "COACH" | "TRAINEE" },
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

    if (role) {
      user.role = role;
    }

    await user.save();
  } catch (error) {
    throw error;
  }
};
