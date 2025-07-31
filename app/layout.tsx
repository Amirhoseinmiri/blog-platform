import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../provider";
import Navbar from "@/components/layout/header";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import { SocketContextProvider } from "../context/SocketContext";
import { EdgeStoreProvider } from "../lib/edgestore";
import { Toaster } from "react-hot-toast";

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
    <EdgeStoreProvider>
      <SessionProvider session={session}>
        <SocketContextProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={`flex flex-col min-h-screen px-2 antialiased`}>
              {" "}
              <Toaster
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: "rgb(51 65 85)",
                    color: "#fff",
                  },
                }}
              />
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
        </SocketContextProvider>
      </SessionProvider>
    </EdgeStoreProvider>
  );
}
