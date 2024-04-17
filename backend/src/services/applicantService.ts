
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

export const applicantResetPassword = async ( body: any)=>{
const {email,password}= body

let resettingApplicant:any = await Applicant.findOne({ email });

// return parseInt(String(lastUserId + 1).padStart(4, '0'));
if (!resettingApplicant) {
  return "User does not exist";
}
const hashedPassword = await hash(password, 10);

const isSamePassword = await compare(password, resettingApplicant.password);

if (isSamePassword) {
 return"New password must be different from the old password";
}
resettingApplicant.password = hashedPassword;


await resettingApplicant.save();

return "updated password succesfully"
}
