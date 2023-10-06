import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  ProfileSchema,
  coachAssignSchema,
  resetPasswordSchema,
  editUserSchema,
} from "../validations/authValidation";
import User from "../models/User";
import {
  generateRandomPassword,
  sendEmail,
  generateMessage,
  generateResetPasswordMessage,
} from "../utils/helpers";
import { hash, compare } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.ACCESS_TOKEN_KEY || "";
const ACCESS_TOKEN_EXPIRATION = "5m"; // 5 minutes

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
      newUser = { ...result, password: hashedPassword };
    } else {
      newUser = { ...result };
    }
    const createdUser: any = await User.create(newUser);
    sendEmail(
      createdUser.name,
      createdUser.email,
      "Welcome " + createdUser.name,
      generateMessage(
        createdUser.name,
        createdUser.email,
        createdUser.role,
        password
      )
    ).catch((error) => console.error(error));
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
      return res.status(403).json({ message: "User not found" });
    }
    if (user.role === "TRAINEE") {
      return res
        .status(403)
        .json({ message: "Trainees are not allowed to login" });
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
      }
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

export const getUserProfile = async (req: any, res: Response) => {
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

export const updateUserProfile = async (req: any, res: Response) => {
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

export const reset_password = async (req: Request, res: Response) => {
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
    sendEmail(
      user.name,
      user.email,
      "Hello " + user.name,
      generateResetPasswordMessage(user.name, password)
    );
    return res.status(200).json({ password });
  } catch (error: any) {
    return res.status(400).send(error);
  }
};

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

export const get_users = async (req: any, res: Response) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      return res.status(403).send("Not allowed to view coaches");
    }
    const coaches = await User.aggregate([
      {
        $match: { $or: [
          { role: "ADMIN" },
          { role: "COACH" }
        ] }, 
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
    const {id} = req.user;
    const coach = await User.findById(id)
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

export const deleteUser = async (req: any, res: Response) => {
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


export const editUser = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;
    
    const { name, email, role } = req.body;

    const validationResult = editUserSchema.validate({ name, email, role });
    if (validationResult.error) {
      console.log(validationResult)
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
    return res.status(500).send("Internal Server Error");
  }
};

export const editTrainee = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;
    
    const { name, coach } = req.body;

    const validationResult = editUserSchema.validate({ name, coach });
    if (validationResult.error) {
      console.log(validationResult)
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
    
    await user.save();    

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};