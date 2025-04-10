/**
 * Base theme options
 */
export type BaseTheme = "light" | "dark" | "system";

/**
 * Theme style options
 */
export type ThemeStyle =
  | "default"
  | "rose"
  | "green"
  | "blue"
  | "orange"
  | "purple"
  | "custom";

/**
 * Theme extension type
 */
export interface ThemeExtension {
  id: string;
  name: string;
  description?: string;
  variables: Record<string, string>;
  active: boolean;
}

/**
 * Theme permission settings
 */
export interface ThemePermissions {
  canChangeBaseTheme: boolean;
  canChangeThemeStyle: boolean;
  canUseExtensions: boolean;
}

/**
 * Debug settings
 */
export interface ThemeDebug {
  enabled: boolean;
  showToasts: boolean;
}

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  baseTheme: BaseTheme;
  themeStyle: ThemeStyle;
  extensions: ThemeExtension[];
  permissions: ThemePermissions;
  debug: ThemeDebug;
  defaultTheme?: BaseTheme;
  defaultStyle?: ThemeStyle;
  storageKey?: string;
  styleStorageKey?: string;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  enableStyleSystem?: boolean;
}

/**
 * Permission level type
 */
export type PermissionLevel = "user" | "admin" | "none";

/**
 * Theme definition interface
 */
export interface ThemeDefinition {
  /**
   * Unique identifier for the theme
   */
  id: string;

  /**
   * Human-readable name of the theme
   */
  name: string;

  /**
   * Detailed description of the theme's style
   */
  description: string;

  /**
   * Preview configuration
   */
  preview:
    | string
    | {
        /**
         * Preview strategy to use
         */
        strategy: "static" | "dynamic" | "component";

        /**
         * URL to the preview image (for static strategy)
         */
        asset?: string;

        /**
         * Component IDs to include in the preview (for component strategy)
         */
        components?: string[];
      };

  /**
   * CSS variables used by the theme
   */
  variables: Record<string, string>;

  /**
   * Optional parent theme IDs to extend
   */
  extends?: string[];

  /**
   * Optional theme variants
   */
  variants?: Record<string, Partial<Record<string, string>>>;
}

/**
 * Theme preview provider interface
 */
export interface ThemePreviewProvider {
  /**
   * Generate a preview image for a theme
   */
  generatePreview(theme: ThemeDefinition): Promise<string>;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Context type
export interface ThemeContextType {
  theme: Theme;
  themeStyle: ThemeStyle;
  setTheme: (theme: Theme) => void;
  setThemeStyle: (style: ThemeStyle) => void;
  systemTheme?: Theme;
}
