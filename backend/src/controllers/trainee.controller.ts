import { Response } from "express";
import { editUserSchema } from "../validations/userValidation";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const get_trainees = async (req: any, res: Response) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
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

    return res.status(200).json(trainees);
  } catch (error) {
    res.status(400).send("failed to get trainees ");
  }
};
export const get_my_trainees = async (req: any, res: Response) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
  try {
    const { id } = req.user;
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
    return res.status(200).json(trainees);
  } catch (error) {
    res.status(400).send("failed to get trainees ");
  }
};

export const update_trainee = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;

    const { name, coach, email } = req.body;

    const validationResult = editUserSchema.validate({ name, coach, email });
    if (validationResult.error) {
      console.log(validationResult);
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (name) {
      user.name = name;
    }
    if (coach) {
      user.coach = coach;
    }
    if (email) {
      user.email = email;
    }
    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
