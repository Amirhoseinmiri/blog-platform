"use server";
import { getUserByEmail } from "../../lib/user";
import { signIn } from "../../auth";
import { LOGIN_REDIRECT } from "../../route";
import { AuthError } from "next-auth";
import { LoginSchema, LoginSchemaType } from "../../schemas/loginSchema";

export const login = async (formData: LoginSchemaType) => {
  const validatedField = LoginSchema.safeParse(formData);
  if (!validatedField.success) {
    return {
      error: "invalid field",
    };
  }

  const { email, password } = validatedField.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return {
      error: "Invalid Credentials",
    };
  }

  //   if (!user.emailVerified) {
  //     return {
  //       error: "email not varified",
  //     };
  //   }

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
          return {
            error: "Invalid email or password",
          };
        default:
          return {
            error: "An unexpected error occurred during sign-in",
          };
      }
    }
  }
};
