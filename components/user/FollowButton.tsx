"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { createNotification } from "@/actions/notifications/createNotification";
import { useSocket } from "@/context/SocketContext";
import { Button } from "../ui/button";

const FollowButton = ({
  user,
  isFollowing: following,
  isList = false,
}: {
  user: User | Pick<User, "id" | "name" | "image">;
  isFollowing: boolean;
  isList?: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { sendNotification } = useSocket();

  useEffect(() => {
    setIsFollowing(following);
  }, [following]);

  const handleFollow = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/follow", { followId: user.id });

      if (res.data.success === "followed") {
        setIsFollowing(true);
        if (user.id) {
          await createNotification({
            recipientId: user.id,
            type: "FOLLOW",
            entityType: "USER",
          });

          // send a notification
          sendNotification(user.id);
        }
      } else if (res.data.success === "unfollowed") {
        setIsFollowing(false);
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleFollow}
      disabled={loading}
      size={isList ? "sm" : "default"}
    >
      {loading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
