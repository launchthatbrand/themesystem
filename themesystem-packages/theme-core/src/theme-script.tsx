"use client";

import { useEffect } from "react";
import { useTheme } from "./theme-provider";

export function ThemeScript() {
  const { state } = useTheme();

  useEffect(() => {
    // Update the data-theme attribute on the document element
    document.documentElement.setAttribute("data-theme", state.theme);

    // Add class for theme
    const classList = document.documentElement.classList;

    // Clear previous theme classes
    classList.remove("light", "dark", "system");

    // Add current theme class
    classList.add(state.theme);

    // Set a color scheme preference
    if (state.theme === "dark") {
      document.documentElement.style.colorScheme = "dark";
    } else if (state.theme === "light") {
      document.documentElement.style.colorScheme = "light";
    } else {
      // For system, respect the user's OS preference
      document.documentElement.style.colorScheme = "normal";
    }

    // Also update the style class
    if (state.style) {
      // Remove any previous style classes
      document.documentElement.classList.forEach((className) => {
        if (className.startsWith("style-")) {
          classList.remove(className);
        }
      });

      // Add the current style
      classList.add(`style-${state.style}`);
    }
  }, [state.theme, state.style]);

  return null;
}
