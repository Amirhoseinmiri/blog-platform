import React, { ComponentProps } from "react";
import { cn } from "../../lib/utils";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

const FormField = ({
  label,
  className,
  error,
  wrapperClassName,
  ...rest
}: InputProps) => {
  return (
    <div className={cn("flex flex-col gap-1", wrapperClassName)}>
      {label && <label className={"text-sm font-medium"}>{label}</label>}
      <input
        type="text"
        className={cn(
          "w-full p-3 outline-none border rounded-md disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 border-slate-300 focus:border-primary transition-colors",
          className,
          error && "ring-1 ring-red-500 focus:ring-red-500"
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;
