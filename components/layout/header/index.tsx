/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { MdNoteAlt } from "react-icons/md";
import Container from "../container";
import { ModeToggle } from "./toggle-mode";
import SearchField from "./search-field";
import Notification from "./notification";
import UserButton from "./user-button";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };
      updateSession();
    }
  }, [isLoggedIn, path]);

  console.log(session);

  return (
    <nav className="sticky top-0 border-b z-50">
      <Container>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <MdNoteAlt className="text-2xl font-bold" />
            <div className="">WEBDEV.blog</div>
          </div>
          <SearchField />
          <div className="flex gap-5 sm:gap-8 items-center">
            <ModeToggle />
            {isLoggedIn && <Notification />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                <Link href={"/login"} className="hidden sm:inline-block">
                  Login
                </Link>

                <Button variant={"link"} asChild>
                  <Link href={"/register"}>Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
