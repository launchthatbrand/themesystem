"use client";

import { ThemeEngineImpl, ThemeEngineOptions } from "@themesystem/core";
import { useEffect, useState } from "react";

import { ThemeProvider as CoreProvider } from "@themesystem/ui";
import type { ReactNode } from "react";

interface ClientThemeProviderProps extends ThemeEngineOptions {
  children: ReactNode;
}

export function ClientThemeProvider({
  children,
  defaultTheme = "system",
  defaultStyle = "default",
  storageKey = "theme-system-state",
}: ClientThemeProviderProps) {
  const [engine] = useState(
    () =>
      new ThemeEngineImpl({
        defaultTheme,
        defaultStyle,
        storageKey,
      }),
  );

  const [state, setState] = useState(engine.getState());

  useEffect(() => {
    const handleStorageChange = () => {
      setState(engine.getState());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [engine]);

  return <CoreProvider {...state}>{children}</CoreProvider>;
}
