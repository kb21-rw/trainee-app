import { Response } from "express";
import {
  coachAssignSchema,
} from "../validations/authValidation";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const get_coaches = async (req: any, res: Response) => {
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

export const assignCoach = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      return res.status(400).send("Only admins can assign coach to trainees");
    }
    const result = await coachAssignSchema.validateAsync(req.body);
    const user: any = await User.findById(id);
    if (user.role !== "TRAINEE") {
      return res.status(403).send("coach is assigned only to trainee");
    }
    const coach: any = await User.findById(result.coach);
    if (coach.role !== "COACH") {
      return res
        .status(403)
        .send("only user with coach role can be assigned to be a coach");
    }
    user.coach = coach._id;
    await user.save();
    return res.status(200).send("coach was assigned succesfully");
  } catch (error) {
    res.status(400).send(error);
  }
};
