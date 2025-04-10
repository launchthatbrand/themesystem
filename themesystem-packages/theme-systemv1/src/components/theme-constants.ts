// Common theme constants and types shared between server and client components
import type { ThemeDefinition } from "../types";

// Storage keys
export const THEME_STYLE_KEY = "theme-style";
export const BASE_THEME_KEY = "base-theme";
export const APP_EXTENSION_THEMES_KEY = "app-extension-themes";

// Types needed for theme system
export type BaseTheme = "light" | "dark" | "system";
export type PermissionLevel = "user" | "admin" | "none";

export interface ThemeSystemPermissions {
  baseTheme: PermissionLevel;
  themeLibrary: PermissionLevel;
  extensions: PermissionLevel;
}

export interface ThemeExtensionTemplate {
  id: string;
  name: string;
  preview: string;
  description?: string;
}

export interface ThemeExtension {
  id: string;
  name: string;
  templates: ThemeExtensionTemplate[];
  defaultTemplate?: string;
}

export interface ThemeSystemConfig {
  baseThemes: BaseTheme[];
  themes: ThemeDefinition[];
  extensions: Record<string, ThemeExtension>;
  permissions: ThemeSystemPermissions;
  defaultTheme: BaseTheme;
  defaultStyle: string;
}
