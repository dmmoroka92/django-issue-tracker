import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
})

export type LoginPayload = z.infer<typeof loginSchema>;