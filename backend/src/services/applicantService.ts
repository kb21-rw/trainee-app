import { hash } from "bcryptjs";
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
