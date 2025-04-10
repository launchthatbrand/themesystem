"use client";

import { Moon, Sun } from "lucide-react";

import { BaseTheme } from "../types";
import React from "react";
import { useTheme } from "../providers/ThemeProvider";

export interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  showLabels?: boolean;
  className?: string;
}

export function ThemeToggle({
  variant = "default",
  size = "default",
  showLabels = false,
  className = "",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme: BaseTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const buttonSizeClass = {
    default: "h-10 px-4",
    sm: "h-8 px-3",
    lg: "h-12 px-6",
  }[size];

  const buttonVariantClass = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }[variant];

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${buttonSizeClass} ${buttonVariantClass} ${className}`}
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          {showLabels && <span>Dark</span>}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          {showLabels && <span>Light</span>}
        </div>
      )}
    </button>
  );
}
