
import { hash, compare } from "bcryptjs";
import Applicant from "../models/Applicant";

export const generateUserId = async () => {
  const lastApplicant = await Applicant.findOne().sort({ userId: -1 });
  let lastUserId = 0;
  if (lastApplicant) {
    lastUserId = lastApplicant.userId;
  }
  
  const nextUserId = lastUserId + 1;
  return nextUserId;
};

 const formatUserId = (userId: number) => {
  return String(userId).padStart(4, '0');
};

export const applicantSignup = async (applicant: any, body: any, isGoogleSignup: boolean = false) => {
  const { email, password } = body;

  let userId: number;
  if (!isGoogleSignup) {
    userId = await generateUserId();
  } else {
    userId = await generateUserId();
  }

  const formattedUserId = formatUserId(userId);
  const hashedPassword = await hash(password, 10);

  const newApplicant = {
    userId: formattedUserId,
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
console.log(body);

let resettingApplicant:any = await Applicant.findOne({ email });
console.log(resettingApplicant);

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
console.log(formatUserId(resettingApplicant.userId));

return "updated password succesfully"
}
