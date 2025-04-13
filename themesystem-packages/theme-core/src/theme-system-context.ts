import type { Theme, ThemeState } from "@themesystem/types";
import { createContext, useContext } from "react";

import { ThemeSystem } from "./index";

/**
 * Context value interface for the theme system
 */
export interface ThemeSystemContextValue {
  // Current state
  currentTheme: string;
  currentStyle: string;
  themeState: ThemeState;

  // Actions
  setTheme: (themeId: string) => void;
  setStyle: (styleId: string) => void;

  // Theme system instance access
  themeSystem: ThemeSystem | null;

  // Theme data
  themes: Theme[];
  activeTheme?: Theme;
}

// Default context value
const defaultContextValue: ThemeSystemContextValue = {
  currentTheme: "light",
  currentStyle: "default",
  themeState: {
    theme: "light",
    style: "default",
    extensions: {},
  },
  setTheme: () => {
    console.warn("Theme context not initialized");
  },
  setStyle: () => {
    console.warn("Theme context not initialized");
  },
  themeSystem: null,
  themes: [],
  activeTheme: undefined,
};

// Create the context
export const ThemeSystemContext =
  createContext<ThemeSystemContextValue>(defaultContextValue);

/**
 * Hook to access the theme system context
 */
export function useThemeSystem(): ThemeSystemContextValue {
  const context = useContext(ThemeSystemContext);

  if (!context) {
    throw new Error("useThemeSystem must be used within a ThemeProvider");
  }

  return context;
}

/**
 * Hook to get and set the current theme
 */
export function useTheme(): [string, (themeId: string) => void] {
  const { currentTheme, setTheme } = useThemeSystem();
  return [currentTheme, setTheme];
}

/**
 * Hook to get and set the current style
 */
export function useStyle(): [string, (styleId: string) => void] {
  const { currentStyle, setStyle } = useThemeSystem();
  return [currentStyle, setStyle];
}

/**
 * Hook to get the active theme object
 */
export function useActiveTheme(): Theme | undefined {
  const { activeTheme } = useThemeSystem();
  return activeTheme;
}

/**
 * Hook to get all available themes
 */
export function useThemes(): Theme[] {
  const { themes } = useThemeSystem();
  return themes;
}

/**
 * Hook to get the theme system instance
 */
export function useThemeSystemInstance(): ThemeSystem | null {
  const { themeSystem } = useThemeSystem();
  return themeSystem;
}
