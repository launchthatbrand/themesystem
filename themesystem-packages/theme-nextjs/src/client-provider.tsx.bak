"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ThemeEngine, ThemeEngineOptions } from "@themesystem/core";
import { ThemeProvider as CoreProvider } from "@themesystem/ui";

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
      new ThemeEngine({
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
