import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Name is required").max(255),
  username: z.string().min(3, "Username is required").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role is required").max(10),
});
