import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(3, { message: "username and password field must never be empty" }),
});
