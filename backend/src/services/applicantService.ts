import { hash, compare } from "bcryptjs";
import Applicant from "../models/Applicant";

export const generateUserId = async () => {
  const lastApplicant = await Applicant.findOne().sort({ userId: -1 });
  let lastUserId = 0;
  if (lastApplicant) {
    lastUserId = parseInt(lastApplicant.userId, 10);
  }
  
  return String(lastUserId + 1).padStart(4, '0');
};

export const applicantSignup = async (applicant: any, body: any, isGoogleSignup: boolean = false) => {
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
   return "Email and password are required";
  }

  const signinApplicant = await Applicant.findOne({ email });

  if (!signinApplicant) {
    return "user does not exist";
  }

  const passwordMatch =
    password && signinApplicant?.password
      ? await compare(password, signinApplicant.password)
      : false;

  if (!passwordMatch) {
    return "Invalid email or password";
  }

  return "signed in succesfully";
};
