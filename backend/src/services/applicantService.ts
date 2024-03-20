import { hash } from "bcryptjs";
import { generateRandomPassword, sendEmail } from "../utils/helpers";
import Applicant from "../models/Applicant";
export const applicantSignup = async (applicant: any, body: any) => {
  let password: string = "";

  password = generateRandomPassword(10);
  const hashedPassword = await hash(password, 10);
  const newApplicant = {
    ...body,
    password: hashedPassword,
  };

  const createdApplicant = await Applicant.create(newApplicant);
  if (createdApplicant) {
    await sendEmail(
      createdApplicant.role,
      createdApplicant.email,
      createdApplicant.role,
      password
    );
  }

  return createdApplicant;
};
