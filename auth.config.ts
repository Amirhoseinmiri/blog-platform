import Crentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas/loginSchema";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Crentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);
        if (validatedField.success) {
          const { email, password } = validatedField.data;
          // Perform your authentication logic here
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const isCorrectPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (isCorrectPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
