"use client";

import type { BaseTheme, ThemeEngineOptions, ThemeState } from "./types";
import { createContext, useContext, useEffect, useState } from "react";

import { ThemeEngineImpl } from "./theme-engine";

interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: BaseTheme) => void;
  setStyle: (style: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  options?: ThemeEngineOptions;
  defaultTheme?: BaseTheme;
}

export function ThemeProvider({
  children,
  options,
  defaultTheme,
}: ThemeProviderProps) {
  const [engine] = useState(() => new ThemeEngineImpl(options));
  const [state, setState] = useState<ThemeState>(engine.getState());

  useEffect(() => {
    engine.subscribe((newState: ThemeState) => {
      setState(newState);
    });

    if (defaultTheme) {
      engine.setTheme(defaultTheme);
    }

    return () => {
      engine.dispose();
    };
  }, [engine, defaultTheme]);

  const value = {
    state,
    setTheme: (theme: BaseTheme) => engine.setTheme(theme),
    setStyle: (style: string) => engine.setStyle(style),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
