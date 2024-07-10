import { compare, hash } from "bcryptjs";
import CustomError from "../middlewares/customError";
import {
  COHORT_NOT_FOUND,
  DUPLICATE_USER,
  INVALID_CREDENTIAL,
  NOT_ALLOWED,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import {
  generateRandomPassword,
  generateUserId,
  sendEmail,
} from "../utils/helpers";
import User from "../models/User";
import { ACCESS_TOKEN_EXPIRATION, secret } from "../constants";
import jwt from "jsonwebtoken";
import { Role } from "../utils/types";
import Cohort from "../models/Cohort";

export const registerService = async (user: any, body: any) => {
  let newUser;
  if (user.role !== "ADMIN") {
    throw new CustomError(NOT_ALLOWED, "Only admins can register users", 403);
  }

  let password: string = "";
  const name = body.name.trim().replace(/\s+/g, " "); // Remove unnecesary extra spaces in names
  if (body.role === "COACH" || body.role === "ADMIN") {
    password = generateRandomPassword(10);
    const hashedPassword = await hash(password, 10);
    newUser = {
      ...body,
      userId: await generateUserId(),
      name,
      password: hashedPassword,
    };
  } else {
    newUser = { ...body, name, userId: await generateUserId() };
  }

  const createdUser = await User.create(newUser);
  if (createdUser) {
    await sendEmail(createdUser.email, {
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      password,
    });
  }

  return createdUser;
};

export const applicantRegisterService = async (body: any) => {
  if (await User.findOne({ email: body.email })) {
    throw new CustomError(DUPLICATE_USER, "User already exists", 409);
  }

  const currentCohort = await Cohort.findOne({ isActive: true });

  if (!currentCohort) {
    throw new CustomError(COHORT_NOT_FOUND, "Cohort not found", 404);
  }

  const name = body.name.trim().replace(/\s+/g, " "); // Remove unnecessary extra spaces in names
  const hashedPassword = await hash(body.password, 10);

  const createdUser = await User.create({
    ...body,
    name,
    userId: await generateUserId(),
    password: hashedPassword,
    role: Role.APPLICANT,
  });

  currentCohort.applicants.push(createdUser.id);
  await currentCohort.save();

  if (createdUser) {
    await sendEmail(createdUser.email, {
      name: createdUser.name,
      userId: createdUser.id,
    });
  }

  return createdUser;
};

export const verifyApplicantService = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { verified: true },
    { new: true }
  );
  if (!user) throw new CustomError(USER_NOT_FOUND, "User not found!", 404);
  return user;
};

export const loginService = async (body: any) => {
  const { email, password } = body;
  const user: any = await User.findOne({ email });
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  if (!user.verified) {
    throw new CustomError(
      NOT_ALLOWED,
      "Please verify your email before logging in ",
      401
    );
  }

  if (user.role === "TRAINEE") {
    throw new CustomError(
      NOT_ALLOWED,
      "Trainees are not allowed to login yet",
      409
    );
  }

  const match = await compare(password, user.password);
  if (!match) {
    throw new CustomError(INVALID_CREDENTIAL, "Invalid credential", 401);
  }

  const accessToken = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );
  return accessToken;
};

export const resetPasswordService = async (body: any) => {
  const { email } = body;
  const user: any = await User.findOne({ email });
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  const password = generateRandomPassword(10);
  const hashedPassword = await hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  await sendEmail(user.email, { name: user.name, password });
  return password;
};
