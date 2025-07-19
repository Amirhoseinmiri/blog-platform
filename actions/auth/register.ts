"use server";

import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../schemas/registerSchema";
import bcrypt from "bcryptjs";
import { db } from "../../lib/db";
import { getUserByEmail } from "../../lib/user";

export const signUp = async (formData: RegisterSchemaType) => {
  const validatedField = RegisterSchema.safeParse(formData);
  if (!validatedField.success) {
    return {
      error: "invalid field",
    };
  }

  const { name, email, password } = validatedField.data;

  const user = await getUserByEmail(email);
  if (user) {
    return {
      error: "user already exists",
    };
  }

  const hashedPass = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });

  return {
    success: "user created successfully",
  };
};
