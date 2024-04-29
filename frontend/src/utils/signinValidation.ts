import { z } from "zod";

export const signinValidationSchema = z.object({
  email: z.string().min(3, { message: "Provide your Email and Password" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }).toUpperCase().toLowerCase()
});
