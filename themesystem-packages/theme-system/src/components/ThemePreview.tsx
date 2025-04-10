"use client";

import React from "react";
import { ThemeStyle } from "../types";
import { useTheme } from "../providers/ThemeProvider";

export interface ThemePreviewProps {
  themeName?: string;
  themeStyle?: ThemeStyle;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export function ThemePreview({
  themeName,
  themeStyle,
  onClick,
  active = false,
  className = "",
}: ThemePreviewProps) {
  const { theme, themeStyle: currentThemeStyle, setThemeStyle } = useTheme();

  const previewTheme = themeName || theme;
  const previewStyle = themeStyle || currentThemeStyle;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (themeStyle) {
      setThemeStyle(themeStyle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border p-2 shadow-sm ${
        active ? "ring-2 ring-primary" : ""
      } ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      aria-label={`Select ${previewStyle} theme style`}
    >
      <div className={`${previewTheme === "dark" ? "dark" : ""}`}>
        <div
          className={`theme-${previewStyle} rounded-md bg-background p-4 text-foreground`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{previewStyle}</span>
            <div className="flex space-x-1">
              <div className="h-4 w-4 rounded-full bg-primary" />
              <div className="h-4 w-4 rounded-full bg-secondary" />
              <div className="h-4 w-4 rounded-full bg-destructive" />
            </div>
          </div>
          <div className="mt-2">
            <div className="h-2 w-16 rounded-full bg-muted" />
            <div className="mt-1 h-2 w-12 rounded-full bg-muted" />
          </div>
        </div>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary" />
      )}
    </div>
  );
}
