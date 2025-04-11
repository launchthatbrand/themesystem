import { ThemeEngine, ThemeEngineOptions } from "@themesystem/core";

export interface NextThemeProviderProps {
  children: React.ReactNode;
  engine: ThemeEngine;
}

export interface ServerThemeProviderProps {
  children: React.ReactNode;
  engine: ThemeEngine;
}

export interface ClientThemeProviderProps {
  children: React.ReactNode;
  engine: ThemeEngine;
}

export interface ThemeScriptProps {
  options: ThemeEngineOptions;
}
