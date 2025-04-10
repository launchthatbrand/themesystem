import { BaseTheme, PermissionLevel } from "../types";

/**
 * Key used for storing the base theme (light/dark/system) preference
 */
export const BASE_THEME_KEY = "theme-mode";

/**
 * Key used for storing the theme style preference
 */
export const THEME_STYLE_KEY = "theme-style";

/**
 * Key used for storing app extension themes
 */
export const APP_EXTENSION_THEMES_KEY = "app-extension-themes";

/**
 * Default values for new theme system instances
 */
export const DEFAULT_VALUES = {
  /**
   * Default base theme
   */
  baseTheme: "system" as BaseTheme,

  /**
   * Default theme style
   */
  themeStyle: "glass",

  /**
   * Default permission level for theme features
   */
  permissionLevel: "user" as PermissionLevel,
};
