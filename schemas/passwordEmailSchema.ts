import { z } from "zod";

export const PasswordEmailSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>;
