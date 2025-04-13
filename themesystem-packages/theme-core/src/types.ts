import type { BaseTheme, Theme, ThemeExtension } from "@themesystem/types";
import { z } from "zod";

// Theme tokens schema
export const themeTokensSchema = z.object({
  colors: z.record(z.string()),
  effects: z.object({
    blur: z.string(),
    border: z.string(),
    shadow: z.string(),
    radius: z.string(),
    glow: z.string().optional(),
  }),
  typography: z.object({
    fontFamily: z.object({
      sans: z.string(),
      display: z.string(),
      body: z.string(),
    }),
    fontSize: z.record(z.string()).optional(),
    fontWeight: z.record(z.string()).optional(),
  }),
});

// Theme schema
export const themeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  preview: z.string().optional(),
  tokens: themeTokensSchema,
  variants: z.record(themeTokensSchema.partial()).optional(),
  components: z.record(z.any()).optional(),
});

// Config schema
export const configSchema = z.object({
  baseTheme: z.enum(["light", "dark", "system"]).default("system"),
  styleTheme: z.string().optional(),
  storage: z
    .object({
      key: z.string(),
      type: z.enum(["localStorage", "cookie"]),
    })
    .optional(),
  framework: z
    .object({
      nextjs: z
        .object({
          serverSideRendering: z.boolean().optional(),
          cookieOptions: z
            .object({
              path: z.string().optional(),
              sameSite: z.enum(["lax", "strict", "none"]).optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

// Types
export type ThemeConfig = z.infer<typeof configSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;

// Theme state
export interface ThemeState {
  theme: BaseTheme;
  style: string;
  currentTheme?: Theme;
  extensions: Record<string, ThemeExtension>;
}

// Theme engine options
export interface ThemeEngineOptions {
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  config?: ThemeConfig;
  storageKey?: string;
}

// Theme middleware
export interface ThemeMiddleware {
  process: (
    state: Partial<ThemeState>,
    currentState: ThemeState,
  ) => Promise<Partial<ThemeState>>;
}

// Theme plugin
export interface ThemePlugin {
  id: string;
  middleware?: ThemeMiddleware[];
  onInstall?: (engine: ThemeEngine) => Promise<void>;
  onUninstall?: () => Promise<void>;
  onThemeChange?: (state: ThemeState) => Promise<void>;
}

// Theme engine interface
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

export type { BaseTheme, Theme, ThemeExtension };
