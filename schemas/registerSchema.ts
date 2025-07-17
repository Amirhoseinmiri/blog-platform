import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "name must be 4 or more char long")
      .max(30, "name must be 30 or less"),
    email: z.string().email(),
    password: z.string().min(6, "password must be 6 or more character"),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords must match",
    }
  );

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
