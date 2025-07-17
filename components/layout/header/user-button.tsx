import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import {
  Bookmark,
  LogOut,
  Pencil,
  Shield,
  User,
  UserRound,
} from "lucide-react";
const UserButton = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback className="border-2 border-slate-500 dark:border-slate-50">
              <UserRound />
            </AvatarFallback>
            <AvatarImage src="/path/to/image.jpg" alt="User Avatar" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button className="w-full flex items-center gap-2">
              <User size={18} />
              Profile
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="w-full flex items-center gap-2">
              <Pencil size={18} />
              Create Post
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="w-full flex items-center gap-2">
              <Bookmark size={18} />
              Bookmark
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="w-full flex items-center gap-2">
              <Shield size={18} />
              Admin
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="w-full flex items-center gap-2">
              <LogOut size={18} />
              Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
