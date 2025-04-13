import type { BaseTheme } from "./core";
import type { ThemeEngine } from "./extensions";
import type {
  PluginCreator,
  ThemeSystemPlugin,
  ThemeSystemPluginFunction,
} from "./plugin";

/**
 * Options for initializing the theme engine
 */
export interface ThemeEngineOptions {
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
  config?: ThemeSystemConfig;
  storageKey?: string;
}

/**
 * Core configuration type for ThemeSystem
 */
export interface ThemeSystemOptions {
  plugins?: (ThemeSystemPlugin | ThemeSystemPluginFunction)[];
  engine?: ThemeEngine;
}

export interface ThemeConfig {
  theme?: BaseTheme;
  style?: string;
  themes?: Record<string, unknown>;
  storage?: "local" | "session" | "memory";
  admin?: {
    theme?: "light" | "dark" | "system";
    components?: Record<string, any>;
  };
  custom?: Record<string, any>;
  onInit?: (engine: ThemeEngine) => Promise<void> | void;
}

export interface ThemeSystemConfig extends ThemeConfig {
  plugins?: Array<
    ThemeSystemPlugin | ThemeSystemPluginFunction | PluginCreator<unknown>
  >;
  framework?: {
    nextjs?: {
      serverSideRendering?: boolean;
      cookieOptions?: Record<string, any>;
    };
  };
  debug?: boolean;
  defaultTheme?: BaseTheme;
  defaultStyle?: string;
}

/**
 * Configuration after validation and plugin application
 */
export interface SanitizedConfig extends Required<ThemeConfig> {
  storage: NonNullable<ThemeConfig["storage"]>;
  admin: NonNullable<ThemeConfig["admin"]>;
  custom: NonNullable<ThemeConfig["custom"]>;
}

export type { ThemeSystemPlugin, ThemeSystemPluginFunction, PluginCreator };
