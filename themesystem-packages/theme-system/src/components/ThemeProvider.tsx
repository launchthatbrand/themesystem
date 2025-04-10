"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import type { ThemeConfig } from "../types";
import { Theme, ThemeContextType, ThemeStyle } from "../types";

// Helper to safely access localStorage
const getLocalStorageItem = (key: string, defaultValue: string): string => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Helper to safely set localStorage
const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage?.setItem(key, value);
  }
};

const initialState: ThemeContextType = {
  theme: "system",
  themeStyle: "default",
  setTheme: () => null,
  setThemeStyle: () => null,
  systemTheme: "light",
};

const ThemeContext = createContext<ThemeContextType>(initialState);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultStyle?: ThemeStyle;
  storageKey?: string;
  styleStorageKey?: string;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  enableStyleSystem?: boolean;
  themes?: Theme[];
  themeStyles?: ThemeStyle[];
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultStyle = "default",
  storageKey = "ui-theme",
  styleStorageKey = "ui-theme-style",
  disableTransitionOnChange = false,
  enableSystem = true,
  enableStyleSystem = true,
  themes = ["light", "dark", "system"],
  themeStyles = [
    "default",
    "rose",
    "green",
    "blue",
    "orange",
    "purple",
    "custom",
  ],
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => getLocalStorageItem(storageKey, defaultTheme) as Theme,
  );
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>(
    () => getLocalStorageItem(styleStorageKey, defaultStyle) as ThemeStyle,
  );
  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme === "system" ? systemTheme : theme);

    if (disableTransitionOnChange) {
      root.classList.add("[&_*]:!transition-none");
      window.setTimeout(() => {
        root.classList.remove("[&_*]:!transition-none");
      }, 0);
    }
  }, [theme, systemTheme, disableTransitionOnChange]);

  useEffect(() => {
    const root = window.document.documentElement;
    const styleClasses = themeStyles.map((style) => `theme-${style}`);

    root.classList.remove(...styleClasses);
    root.classList.add(`theme-${themeStyle}`);
  }, [themeStyle, themeStyles]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        setTheme((e.newValue as Theme) || defaultTheme);
      }
      if (e.key === styleStorageKey) {
        setThemeStyle((e.newValue as ThemeStyle) || defaultStyle);
      }
    };

    const handleMediaChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [storageKey, styleStorageKey, defaultTheme, defaultStyle]);

  const value = {
    theme,
    themeStyle,
    systemTheme,
    setTheme: (newTheme: Theme) => {
      setLocalStorageItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    setThemeStyle: (newStyle: ThemeStyle) => {
      setLocalStorageItem(styleStorageKey, newStyle);
      setThemeStyle(newStyle);
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export function ThemeConfig(props: React.ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props} />;
}
