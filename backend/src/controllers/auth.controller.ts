import { Response } from "express";
import {
  registerSchema,
} from "../validations/authValidation";
import User from "../models/User";
import {
  generateRandomPassword,
  sendEmail,
  generateMessage,
} from "../utils/helpers";
import { hash } from "bcryptjs";


export const register = async (req: any, res: Response) => {
  let newUser;
  try {
    const result = await registerSchema.validateAsync(req.body);
    console.log(result)
    let password: string = "";
    if (result.role === "COACH" || result.role === "ADMIN") {
      password = generateRandomPassword(10) || "";
      const hashedPassword = await hash(password, 10);
      newUser = { ...result, password: hashedPassword };
    } else {
      newUser = { ...result };
    }
    console.log({newUser})
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