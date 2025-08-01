"use server";
import { getUserByEmail } from "../../lib/user";
import { signIn } from "../../auth";
import { LOGIN_REDIRECT } from "../../route";
import { AuthError } from "next-auth";
import { LoginSchema, LoginSchemaType } from "../../schemas/loginSchema";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "../../lib/emailVerification";

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return { error: "Invalid credetials" };
  }

  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email
    );

    const { error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    if (error) {
      return {
        error:
          "Something went wrong while sending verification email! Try to login to resend the verification email!",
      };
    }

    return { success: "Verification email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credetials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }
};
