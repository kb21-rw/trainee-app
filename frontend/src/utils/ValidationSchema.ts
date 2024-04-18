import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().min(3, { message: "Provide your Email and Password" }),
  password: z.string(),
});
