import { hash, compare } from "bcryptjs";
import Applicant from "../models/Applicant";

export const applicantSignup = async (applicant: any, body: any) => {
  const { email, password } = body;

  const hashedPassword = await hash(password, 10);

  const newApplicant = {
    email: email,
    password: hashedPassword,
    role: "applicant",
  };

  const createdApplicant = await Applicant.create(newApplicant);

  return createdApplicant;
};

export const applicantSignin = async (applicant: any, body: any) => {
  const { email, password } = body;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const signinApplicant = await Applicant.findOne({ email });

  if (!signinApplicant) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch =
    password && signinApplicant?.password
      ? await compare(password, signinApplicant.password)
      : false;

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  return "signed in succesfully";
};
