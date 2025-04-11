import { configSchema } from "@themesystem/config";
import { z } from "zod";

export type Theme = "light" | "dark" | "system";

export interface ThemeState {
  theme: Theme;
  style: string;
  extensions: Record<string, unknown>;
}

export interface ThemeMiddleware {
  process(
    state: Partial<ThemeState>,
    currentState: ThemeState,
  ): Promise<Partial<ThemeState>>;
}

export interface ThemePlugin<T = Record<string, unknown>> {
  id: string;
  name: string;
  description: string;
  version: string;
  extensions?: Map<string, T>;
  middleware?: ThemeMiddleware[];
  onInstall?(engine: ThemeEngine): void | Promise<void>;
  onUninstall?(): void | Promise<void>;
  onThemeChange?(state: ThemeState): void | Promise<void>;
}

export interface ThemeEngineOptions {
  defaultTheme?: Theme;
  defaultStyle?: string;
  storageKey?: string;
  config?: z.infer<typeof configSchema>;
}

// Re-export this interface once we create the engine
export interface ThemeEngine {
  getState(): ThemeState;
  setState(state: Partial<ThemeState>): Promise<void>;
  use(middleware: ThemeMiddleware): void;
  registerPlugin(plugin: ThemePlugin): Promise<void>;
  unregisterPlugin(pluginId: string): Promise<void>;
}
