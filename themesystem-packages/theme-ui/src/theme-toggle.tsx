"use client";

import { Button } from "@acme/ui/button";
import { cn } from "@acme/ui";
import { useTheme } from "@themesystem/core";

export function ThemeToggle() {
  const { state, setTheme } = useTheme();
  const isDark = state.theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("w-9 px-0")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "🌞" : "🌙"}
    </Button>
  );
}
