import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 8 characters" }),
});
