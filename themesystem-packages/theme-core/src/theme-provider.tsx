"use client";

import { Theme, ThemeEngine, ThemeEngineOptions, ThemeState } from "./types";
import { createContext, useContext, useEffect, useState } from "react";

import { ThemeEngineImpl } from "./theme-engine";

interface ThemeProviderProps extends ThemeEngineOptions {
  children: React.ReactNode;
}

interface ThemeContextValue {
  engine: ThemeEngine;
  state: ThemeState;
  setTheme: (theme: Theme) => Promise<void>;
  setStyle: (style: string) => Promise<void>;
}

const ThemeProviderContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function ThemeProvider({ children, ...options }: ThemeProviderProps) {
  const [engine] = useState(() => new ThemeEngineImpl(options));
  const [state, setState] = useState(engine.getState());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (state.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(state.theme);
  }, [state.theme, mounted]);

  const value = {
    engine,
    state,
    setTheme: async (theme: Theme) => {
      await engine.setState({ theme });
      setState(engine.getState());
    },
    setStyle: async (style: string) => {
      await engine.setState({ style });
      setState(engine.getState());
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
