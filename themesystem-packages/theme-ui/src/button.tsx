"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "./cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground shadow hover:bg-primary/90":
              variant === "default",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "h-9 px-4 py-2": size === "default",
            "h-9 w-9": size === "icon",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
