import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} className="relative" variant={"outline"}>
          <Bell size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-[400px]">
        <div className="flex gap-4 justify-between mb-2 p-2">
          <h3 className="font-bold text-lg">Notifications</h3>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
