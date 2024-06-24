import { hash, compare } from "bcryptjs";
import Applicant from "../models/Applicant";
import User from "../models/User";

export const generateUserId = async () => {
  const lastUser = await User.findOne().sort({ userId: -1 });
  let lastUserId = "0";
  if (lastUser) {
    lastUserId = lastUser.userId ?? 0;
  }

  return String(+lastUserId + 1).padStart(5, "0");
};

export const applicantSignup = async (
  applicant: any,
  body: any,
  isGoogleSignup: boolean = false,
) => {
  const { email, password } = body;

  let userId;
  if (!isGoogleSignup) {
    userId = await generateUserId();
  } else {
    userId = await generateUserId();
  }

  const hashedPassword = await hash(password, 10);

  const newApplicant = {
    userId: userId,
    email: email,
    password: hashedPassword,
    role: "applicant",
  };

  const createdApplicant = await Applicant.create(newApplicant);

  return createdApplicant;
};

export const applicantSignin = async (body: any) => {
  const { email, password } = body;

  if (!email || !password) {
    return {
      status: 400,
      message: "Email and password are required",
      errorName: "ValidationError",
    };
  }

  const signinApplicant = await Applicant.findOne({ email });

  if (!signinApplicant) {
    return {
      status: 400,
      message: "user does not exist",
      errorName: "NotFoundError",
    };
  }

  const passwordMatch =
    password && signinApplicant?.password
      ? await compare(password, signinApplicant.password)
      : false;

  if (!passwordMatch) {
    return {
      status: 400,
      message: "Invalid email or password",
      errorName: "ValidationError",
    };
  }

  return { status: 200, message: "Signed in successfully", errorName: "" };
};

export const applicantResetPassword = async (body: any) => {
  const { email, password } = body;

  const resettingApplicant: any = await Applicant.findOne({ email });
  if (!resettingApplicant) {
    return "User does not exist";
  }

  const hashedPassword = await hash(password, 10);

  const isSamePassword = await compare(password, resettingApplicant.password);

  if (isSamePassword) {
    return "New password must be different from the old password";
  }

  resettingApplicant.password = hashedPassword;

  await resettingApplicant.save();

  return "updated password succesfully";
};
