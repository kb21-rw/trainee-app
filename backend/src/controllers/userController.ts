import { Response } from "express";
import { ProfileSchema, editUserSchema } from "../validations/userValidation";
import User from "../models/User";

import { hash } from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const get_profile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const update_profile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const validationResult = ProfileSchema.validate({ name, email, password });
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
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
    if (password) {
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const get_users = async (req: any, res: Response) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      return res.status(403).send("Not allowed to view coaches");
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
    return res.status(200).json(coaches);
  } catch (error) {
    res.status(400).send(400);
  }
};

export const delete_user = async (req: any, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const update_user = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;

    const { name, email, role } = req.body;

    const validationResult = editUserSchema.validate({ name, email, role });
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
