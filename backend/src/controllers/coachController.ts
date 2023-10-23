import { Response } from "express";
import User from "../models/User";
import dotenv from "dotenv";
import { editUserSchema } from "../validations/userValidation";
dotenv.config();

export const getCoaches = async (req: any, res: Response) => {
  try {
    const { role } = req.user;
    const searchString = req.query.searchString || "";
    const coachesPerPage = Number(req.query.coachesPerPage) || 10;
    const sortBy = req.query.sortBy || "entry";
    if (role !== "ADMIN") {
      return res.status(403).send("Not allowed to view coaches");
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
    return res.status(200).json(coaches);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateCoachOrAdmin = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;

    const { name, email, role } = req.body;

    const validationResult = editUserSchema.validate({ name, email, role });
    if (validationResult.error) {
      console.error(validationResult);
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
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

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
