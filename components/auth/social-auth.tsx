import React from "react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { LOGIN_REDIRECT } from "../../route";

const SocialAuth = () => {
  const handleOnClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row">
      <Button
        variant={"outline"}
        className="gap-2 w-1/2 py-6"
        onClick={() => handleOnClick("google")}
      >
        <FaGoogle /> Continue With Google
      </Button>
      <Button
        variant={"outline"}
        className="gap-2 w-1/2 py-6"
        onClick={() => handleOnClick("github")}
      >
        <FaGithub /> Continue With GitHub
      </Button>
    </div>
  );
};

export default SocialAuth;
