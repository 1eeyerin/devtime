import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[5px] border border-gray-50 bg-gray-50 px-4 py-3 text-body-m text-gray-800 placeholder:text-gray-300 focus-visible:outline-none aria-invalid:border-secondary-negative aria-invalid:bg-white disabled:cursor-not-allowed disabled:opacity-50 [type=password]:not-placeholder-shown:text-2xl",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
