/* eslint-disable no-useless-catch */
import { Types } from "mongoose";
import CustomError from "../middlewares/customError";
import User from "../models/User";
import { USER_NOT_FOUND } from "../utils/errorCodes";

export const getTraineesService = async ({
  searchString,
  sortBy,
  traineesPerPage,
}: {
  searchString: string;
  sortBy: string;
  traineesPerPage: number;
}) => {
  try {
    const trainees = await User.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
          role: "TRAINEE",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "coach",
          foreignField: "_id",
          as: "coach",
        },
      },
      {
        $addFields: {
          coach: {
            $cond: {
              if: { $eq: [{ $size: "$coach" }, 0] },
              then: [{}],
              else: "$coach",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          coach: {
            $cond: {
              if: { $eq: [{ $size: "$coach" }, 0] },
              then: {},
              else: {
                $arrayElemAt: ["$coach", 0],
              },
            },
          },
        },
      },
      {
        $sort: { [sortBy]: 1 },
      },
      {
        $limit: traineesPerPage,
      },
    ]);
    return trainees;
  } catch (error) {
    throw error;
  }
};

export const getTraineesForCoachService = async (
  id: string,
  {
    searchString,
    sortBy,
    traineesPerPage,
  }: { searchString: string; sortBy: string; traineesPerPage: number },
) => {
  try {
    const coach = await User.findById(id);
    const trainees = await User.aggregate([
      {
        $match: {
          coach: coach?._id,
          role: "TRAINEE",
          $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "coach",
          foreignField: "_id",
          as: "coach",
        },
      },
      {
        $addFields: {
          coach: {
            $cond: {
              if: { $eq: [{ $size: "$coach" }, 0] },
              then: [{}],
              else: "$coach",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          coach: {
            $cond: {
              if: { $eq: [{ $size: "$coach" }, 0] },
              then: {},
              else: {
                $arrayElemAt: ["$coach", 0],
              },
            },
          },
        },
      },
      {
        $sort: { [sortBy]: 1 },
      },
      {
        $limit: traineesPerPage,
      },
    ]);
    return trainees;
  } catch (error) {
    throw error;
  }
};

export const updateTraineeService = async (
  userId: string,
  {
    name,
    coach,
    email,
  }: { name: string; coach: Types.ObjectId; email: string },
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(USER_NOT_FOUND, "User not found", 404);
    }

    if (name) {
      user.name = name.trim().replace(/\s+/g, " ");
    }

    if (coach) {
      user.coach = coach;
    }

    if (email) {
      user.email = email;
    }

    await user.save();
  } catch (error) {
    throw error;
  }
};
