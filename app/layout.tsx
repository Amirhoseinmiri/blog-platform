import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../provider";
import Navbar from "@/components/layout/header";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Web Dev Blog",
  description: "A blog about web development",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.variable} flex flex-col min-h-screen px-2 antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="grow">{children}</main>
            <footer>...</footer>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
