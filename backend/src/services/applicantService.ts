import { hash, compare } from "bcryptjs";
import Applicant from "../models/Applicant";

export const generateUserId = async () => {
  const lastApplicant = await Applicant.findOne().sort({ userId: -1 });
  let lastUserId = 0;
  if (lastApplicant) {
    lastUserId = parseInt(lastApplicant.userId, 10);
  }

  return String(lastUserId + 1).padStart(4, "0");
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

export const applicantSignin = async (applicant: any, body: any) => {
  const { email, password } = body;

  if (!email || !password) {
    return;
  }

  const signinApplicant = await Applicant.findOne({ email });

  if (!signinApplicant) {
    return;
  }

  const passwordMatch =
    password && signinApplicant?.password
      ? await compare(password, signinApplicant.password)
      : false;

  if (!passwordMatch) {
    return;
  }

  return "signed in succesfully";
};
