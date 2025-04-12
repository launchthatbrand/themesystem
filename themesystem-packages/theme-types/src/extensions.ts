import type { Theme } from "./core.js";

export interface ThemeExtension {
  id: string;
  target: string;
  themes: string[];
  defaultTheme?: string;
  storageKey?: string;
  inheritFrom?: string;
}

export interface ThemeState {
  theme: string;
  style: string;
  currentTheme?: Theme;
  extensions: Record<string, ThemeExtension>;
}

export interface ThemeMiddleware {
  process: (
    state: Partial<ThemeState>,
    currentState: ThemeState,
  ) => Promise<Partial<ThemeState>>;
}

export interface ThemePlugin {
  id: string;
  middleware?: ThemeMiddleware[];
  onInstall?: (engine: ThemeEngine) => Promise<void>;
  onUninstall?: () => Promise<void>;
  onThemeChange?: (state: ThemeState) => Promise<void>;
}

export interface ThemeEngine {
  getState: () => ThemeState;
  setState: (state: Partial<ThemeState>) => Promise<void>;
  use: (middleware: ThemeMiddleware) => void;
  registerPlugin: (plugin: ThemePlugin) => Promise<void>;
  unregisterPlugin: (pluginId: string) => Promise<void>;
  registerTheme: (theme: Theme) => void;
  getTheme: (id: string) => Theme | undefined;
  getAllThemes: () => Theme[];
}
