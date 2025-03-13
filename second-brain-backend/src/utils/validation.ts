import { z } from "zod";

export const userSchemaValidations = z.object({
  username: z.string({
    required_error:'Username is required',
    invalid_type_error:'Username must be a string'
  })
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores and not spaces"),
  password: z
    .string({
    required_error:'Password is required',
    invalid_type_error:'Password must be a string'
    })
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});
