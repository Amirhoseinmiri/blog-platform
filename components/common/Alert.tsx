import React from "react";
import { BiError } from "react-icons/bi";
import {
  IoIosCheckmarkCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { cn } from "../../lib/utils";
const Alert = ({
  error,
  message,
  success,
}: {
  success?: boolean;
  error?: boolean;
  message?: string;
}) => {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-2 p-3 rounded-md",
        success && "bg-green-100 text-green-800",
        error && "bg-rose-100 text-rose-500",
        !success && !error && "bg-blue-100 text-blue-800"
      )}
    >
      <span>
        {success && <IoIosCheckmarkCircleOutline size={20} />}
        {error && <BiError size={20} className="text-red-500" />}
        {!success && !error && <IoIosInformationCircleOutline size={20} />}
      </span>
      {message}
    </div>
  );
};

export default Alert;
