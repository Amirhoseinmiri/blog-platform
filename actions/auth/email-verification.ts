"use server";

import { db } from "../../lib/db";
import { getUserByEmail } from "../../lib/user";

export const verifyEmail = async (token: string) => {
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!emailVerificationToken) {
    return {
      error: "Invalid or expired token",
    };
  }

  const isExpired = new Date(emailVerificationToken.expires) < new Date();

  if (isExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(emailVerificationToken.email);

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: emailVerificationToken.email },
  });

  return {
    success: "Email verified successfully",
  };
};
