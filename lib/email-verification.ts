import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { Resend } from "resend";
export const getVerificationToken = async (email: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuidv4();
  const now = new Date();
  const expires = new Date(now.getTime() + 3600 * 1000); // 1 hour from now

  const existingToken = await getVerificationToken(email);

  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const emailVerificationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return emailVerificationToken;
};

export const sendEmailVerification = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailVerificationLink = `${process.env.BASE_URL}/email-verification?token=${token}`;

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${emailVerificationLink}">here</a> to verify your email.</p>`,
  });

  return {
    error: response.error,
  };
};
