"use client";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Button } from "../ui/button";

const EditProfileButton = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(`/user/edit/${user.id}`)}>Edit</Button>
  );
};

export default EditProfileButton;
