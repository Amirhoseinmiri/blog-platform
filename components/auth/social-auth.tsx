import React from "react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row">
      <Button variant={"outline"} className="gap-2 w-1/2 py-6">
        <FaGoogle /> Continue With Google
      </Button>
      <Button variant={"outline"} className="gap-2 w-1/2 py-6">
        <FaGithub /> Continue With GitHub
      </Button>
    </div>
  );
};

export default SocialAuth;
