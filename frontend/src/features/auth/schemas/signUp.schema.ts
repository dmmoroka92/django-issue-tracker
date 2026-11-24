import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(150, { message: "First name must be less than 150 characters" }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(150, { message: "Last name must be less than 150 characters" }),

  email: z
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),

  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  path: ["passwordConfirmation"],
  message: "Passwords do not match",
});

export type SignUpPayload = z.infer<typeof signUpSchema>;