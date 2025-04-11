"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@acme/ui/components/toggle-group";

import { useTheme } from "./UnifiedThemeProvider";

export interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact";
}

/**
 * A simple toggle for switching between light, dark and system themes
 */
export function ThemeToggle({
  className,
  showLabels = true,
  size = "md",
  variant = "default",
}: ThemeToggleProps) {
  const { baseTheme, setBaseTheme, canChangeBaseTheme, debugMode } = useTheme();

  const handleBaseThemeChange = (value: string) => {
    if (!value) return;
    if (debugMode) {
      console.log(`[ThemeSystem] Changing base theme to: ${value}`);
    }
    setBaseTheme(value as "light" | "dark" | "system");
  };

  // Size modifiers for icons and text
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const labelClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSize = sizeClasses[size];
  const labelSize = labelClasses[size];

  // Compact variant for small spaces
  if (variant === "compact") {
    return (
      <div className={`${className || ""}`}>
        {canChangeBaseTheme ? (
          <ToggleGroup
            type="single"
            value={baseTheme}
            onValueChange={handleBaseThemeChange}
            className="flex justify-center"
          >
            <ToggleGroupItem
              value="light"
              aria-label="Light mode"
              className="px-2 py-1"
            >
              <SunIcon className={iconSize} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="dark"
              aria-label="Dark mode"
              className="px-2 py-1"
            >
              <MoonIcon className={iconSize} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="system"
              aria-label="System mode"
              className="px-2 py-1"
            >
              <DesktopIcon className={iconSize} />
            </ToggleGroupItem>
          </ToggleGroup>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No permission to change theme
          </p>
        )}
      </div>
    );
  }

  // Default full variant
  return (
    <div className={`${className || ""}`}>
      {canChangeBaseTheme ? (
        <ToggleGroup
          type="single"
          value={baseTheme}
          onValueChange={handleBaseThemeChange}
          className="w-full justify-center"
        >
          <ToggleGroupItem value="light" aria-label="Light mode">
            <SunIcon className={`mr-2 ${iconSize}`} />
            {showLabels && <span className={labelSize}>Light</span>}
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Dark mode">
            <MoonIcon className={`mr-2 ${iconSize}`} />
            {showLabels && <span className={labelSize}>Dark</span>}
          </ToggleGroupItem>
          <ToggleGroupItem value="system" aria-label="System mode">
            <DesktopIcon className={`mr-2 ${iconSize}`} />
            {showLabels && <span className={labelSize}>System</span>}
          </ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <p className="text-sm italic text-muted-foreground">
          You don't have permission to change the base theme.
        </p>
      )}
    </div>
  );
}
