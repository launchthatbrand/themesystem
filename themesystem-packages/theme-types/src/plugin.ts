import type { ThemeSystemConfig } from "./config.js";
import type { ThemeEngine } from "./extensions.js";

/**
 * Interface for ThemeSystem plugins
 */
export interface ThemeSystemPlugin {
  /**
   * The name of the plugin
   */
  name?: string;

  /**
   * Plugin options
   */
  options?: Record<string, any>;

  /**
   * Apply method to modify the configuration
   */
  apply: (
    config: ThemeSystemConfig,
  ) => ThemeSystemConfig | Promise<ThemeSystemConfig>;
}

/**
 * A plugin function that can modify the configuration
 * Following PayloadCMS's pattern of function-based plugins
 */
export type ThemeSystemPluginFunction = (
  config: ThemeSystemConfig,
) => ThemeSystemConfig | Promise<ThemeSystemConfig>;

/**
 * Helper type for creating plugins with options
 */
export interface PluginCreator<Options = unknown> {
  (options?: Options): ThemeSystemPluginFunction;
}

/**
 * Lifecycle hooks for ThemeSystem plugins
 */
export interface ThemeSystemLifecycleHooks {
  /**
   * Called when the theme engine is initialized
   */
  onInit?: (engine: ThemeEngine) => Promise<void> | void;

  /**
   * Called when the theme changes
   */
  onThemeChange?: (theme: string, prevTheme: string) => Promise<void> | void;

  /**
   * Called when the style changes
   */
  onStyleChange?: (style: string, prevStyle: string) => Promise<void> | void;

  /**
   * Called before server-side rendering
   */
  onBeforeSSR?: () => Promise<void> | void;
}
