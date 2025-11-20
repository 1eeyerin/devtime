import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const commonStyle = cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] border border-transparent text-sub-title-s tracking-tight transition ring-offset-white",
  "cursor-pointer disabled:pointer-events-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF47FF]",
  "hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]",
  "active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]"
);

const buttonVariants = cva(commonStyle, {
  variants: {
    priority: {
      primary:
        "bg-primary-500 text-white disabled:bg-gray-400 disabled:text-gray-300",
      secondary:
        "bg-primary-500-10 text-primary-500 disabled:bg-gray-200 disabled:text-gray-400",
      tertiary:
        "bg-gray-50 text-primary-500 disabled:bg-gray-200 disabled:text-gray-400",
    },
    size: {
      default: "h-12 px-4",
    },
  },
  defaultVariants: {
    priority: "primary",
    size: "default",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, priority, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ priority, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
