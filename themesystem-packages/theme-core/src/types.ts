import type { BaseTheme, Theme } from "@themesystem/types/core";
import { z } from "zod";

// Theme tokens schema
const themeTokensSchema = z.object({
  colors: z.record(z.string()).optional(),
  typography: z
    .object({
      fontFamily: z.string().optional(),
      fontSize: z.record(z.string()).optional(),
      lineHeight: z.record(z.string()).optional(),
      fontWeight: z.record(z.string()).optional(),
    })
    .optional(),
  spacing: z.record(z.string()).optional(),
  borderRadius: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional(),
  transitions: z.record(z.string()).optional(),
});

// Component variant schema
const componentVariantSchema = z.record(
  z.object({
    base: z.record(z.string()),
    variants: z.record(z.record(z.string())).optional(),
    sizes: z.record(z.record(z.string())).optional(),
  }),
);

// Extension target schema
const extensionTargetSchema = z.object({
  dataAttribute: z.string(),
  componentName: z.string().optional(),
});

// Extension schema
const extensionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  target: extensionTargetSchema,
  cssPath: z.string().optional(),
  theme: z
    .object({
      tokens: themeTokensSchema.optional(),
      components: componentVariantSchema.optional(),
    })
    .optional(),
  config: z.record(z.unknown()).optional(),
});

// Config schema
const configSchema = z.object({
  baseTheme: z.enum(["light", "dark", "system"]).default("system"),
  styleTheme: z.string().optional(),
  extensions: z.record(z.string(), extensionSchema).optional(),
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
export type ThemeSystemConfig = z.infer<typeof configSchema>;
export type Extension = z.infer<typeof extensionSchema>;
export type ExtensionTarget = z.infer<typeof extensionTargetSchema>;
export type ThemeTokens = z.infer<typeof themeTokensSchema>;
export type ComponentVariant = z.infer<typeof componentVariantSchema>;

// Theme state
export interface ThemeState {
  theme: BaseTheme;
  style: string;
  currentTheme?: Theme;
  extensions: Record<string, Extension>;
}

// Theme engine options
export interface ThemeEngineOptions {
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  config?: ThemeSystemConfig;
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

// Re-export types from @themesystem/types for convenience
export type { ThemeConfig } from "@themesystem/types/config";
export type { BaseTheme, Theme } from "@themesystem/types/core";
export type { ThemeExtension } from "@themesystem/types/extensions";
