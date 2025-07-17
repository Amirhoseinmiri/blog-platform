import React from "react";
import { MdNoteAlt } from "react-icons/md";
import Container from "../container";
import { ModeToggle } from "./toggle-mode";
import SearchField from "./search-field";
import Notification from "./notification";
import UserButton from "./user-button";
import Link from "next/link";
import { Button } from "../../ui/button";

const Navbar = () => {
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
            <Notification />
            <UserButton />
            <Link href={"/login"} className="hidden sm:inline-block">
              Login
            </Link>

            <Button variant={"link"} asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
