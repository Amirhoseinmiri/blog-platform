"use server";

import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../schemas/registerSchema";
import bcrypt from "bcryptjs";
import { db } from "../../lib/db";
import { getUserByEmail } from "../../lib/user";
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "../../lib/email-verification";

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

  const emailVerificationToken = await generateEmailVerificationToken(email);
  const { error } = await sendEmailVerification(
    email,
    emailVerificationToken.token
  );

  if (error) {
    return {
      error: "failed to send email verification",
    };
  }

  return {
    success: "user created successfully",
  };
};
