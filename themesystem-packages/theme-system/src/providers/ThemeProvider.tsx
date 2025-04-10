"use client";

import { BaseTheme, ThemeConfig, ThemeStyle } from "../types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
  theme: BaseTheme;
  setTheme: (theme: BaseTheme) => void;
  themeStyle: ThemeStyle;
  setThemeStyle: (style: ThemeStyle) => void;
  isLoaded: boolean;
}

const initialConfig: ThemeConfig = {
  baseTheme: "system",
  themeStyle: "default",
  extensions: [],
  permissions: {
    canChangeBaseTheme: true,
    canChangeThemeStyle: true,
    canUseExtensions: true,
  },
  debug: {
    enabled: false,
    showToasts: false,
  },
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => null,
  themeStyle: "default",
  setThemeStyle: () => null,
  isLoaded: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: BaseTheme;
  defaultStyle?: ThemeStyle;
  storageKey?: string;
  styleStorageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultStyle = "default",
  storageKey = "theme",
  styleStorageKey = "theme-style",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<BaseTheme>(defaultTheme);
  const [themeStyle, setThemeStyleState] = useState<ThemeStyle>(defaultStyle);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      root.style.colorScheme = systemTheme;
    } else {
      root.classList.add(theme);
      root.style.colorScheme = theme;
    }

    // Apply theme style
    root.setAttribute("data-theme", themeStyle);
  }, [theme, themeStyle]);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as BaseTheme | null;
    const savedStyle = localStorage.getItem(
      styleStorageKey,
    ) as ThemeStyle | null;

    if (savedTheme) {
      setThemeState(savedTheme);
    }

    if (savedStyle) {
      setThemeStyleState(savedStyle);
    }

    setIsLoaded(true);
  }, [storageKey, styleStorageKey]);

  const setTheme = (newTheme: BaseTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const setThemeStyle = (newStyle: ThemeStyle) => {
    localStorage.setItem(styleStorageKey, newStyle);
    setThemeStyleState(newStyle);
  };

  const value = {
    theme,
    setTheme,
    themeStyle,
    setThemeStyle,
    isLoaded,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
