import { z } from "zod"

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(20, "Project name must not exceed 20 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(2_000, "Description must not exceed 2,000 characters"),
})

export type ProjectPayload = z.infer<typeof projectSchema>