import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
