import "./register-themes"; // This will run the registration

import type {
  Theme,
  ThemeSystemConfig,
  ThemeSystemPlugin,
} from "@themesystem/types";

import { applyPlugins } from "./plugin-system";
import { ThemeEngineImpl } from "./theme-engine";
import { ThemeRegistry } from "./theme-registry";
import { ThemeSystemContext } from "./theme-system-context";

// Config utilities
export function defineConfig(config: ThemeSystemConfig): ThemeSystemConfig {
  return config;
}

/**
 * Helper function to create a theme system configuration with plugins
 */
export function createThemeSystem(
  options: Partial<ThemeSystemConfig> = {},
): ThemeSystemConfig {
  // Provide sensible defaults
  return {
    defaultTheme: "light",
    storage: "local",
    admin: {
      theme: "system",
    },
    plugins: [],
    ...options,
  };
}

// Singleton instance
let themeSystemInstance: ThemeSystem | null = null;

/**
 * Simplified serializable config type for client-side
 */
interface SerializableConfig extends Omit<ThemeSystemConfig, "plugins"> {
  plugins: Array<{
    name: string;
    options?: Record<string, any>;
  }>;
}

/**
 * Main ThemeSystem class
 */
export class ThemeSystem {
  public readonly engine: ThemeEngineImpl;
  public readonly config: ThemeSystemConfig;
  public readonly registry: ThemeRegistry;

  constructor(config: ThemeSystemConfig) {
    this.config = config;
    this.registry = ThemeRegistry.getInstance();
    this.engine = new ThemeEngineImpl({
      defaultTheme: config.defaultTheme || "light",
      defaultStyle: config.defaultStyle || "default",
      config,
    });

    // Initialize plugins
    if (config.plugins?.length) {
      // Apply plugins is handled by the plugin-system module
      applyPlugins(config).catch(console.error);
    }

    console.log("🎨 ThemeSystem initialized");

    // Store singleton instance
    themeSystemInstance = this;
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): ThemeSystem | null {
    return themeSystemInstance;
  }

  /**
   * Create a new instance of ThemeSystem
   */
  public static createInstance(config: ThemeSystemConfig): ThemeSystem {
    return new ThemeSystem(config);
  }

  /**
   * Register a theme with the theme registry
   */
  public registerTheme(theme: Theme): void {
    this.registry.registerTheme(theme);
    this.engine.registerTheme(theme);
  }

  /**
   * Get a theme by ID
   */
  public getTheme(id: string): Theme | undefined {
    return this.registry.getTheme(id) || this.engine.getTheme(id);
  }

  /**
   * Get all registered themes
   */
  public getAllThemes(): Theme[] {
    return this.registry.getAllThemes();
  }

  /**
   * Set the active theme
   */
  public setTheme(theme: string): void {
    this.engine.setTheme(theme);
  }

  /**
   * Set the active style
   */
  public setStyle(style: string): void {
    this.engine.setStyle(style);
  }

  /**
   * Get the client-side configuration
   */
  public getClientConfig(): SerializableConfig {
    return {
      ...this.config,
      // We don't need to send the plugin functions to the client
      plugins: [],
    };
  }
}

/**
 * Initialize the ThemeSystem with a configuration
 * Similar to PayloadCMS's getPayload function
 */
export async function getThemeSystem(options: {
  config: ThemeSystemConfig;
}): Promise<ThemeSystem> {
  const { config } = options;

  // If instance exists, return it
  if (themeSystemInstance) {
    return themeSystemInstance;
  }

  // Create new instance
  themeSystemInstance = new ThemeSystem(config);

  return themeSystemInstance;
}

// Export a singleton instance of ThemeRegistry
export type { Theme };
export { ThemeRegistry };
export const themeRegistry = ThemeRegistry.getInstance();

export { ThemeProvider, useTheme } from "./theme-provider";
export { ThemeEngineImpl as ThemeEngine } from "./theme-engine";
export { ThemeSystemContext };

// Export types
export type {
  BaseTheme,
  ThemeState,
  ThemeEngineOptions,
  ThemeConfig,
  ThemeExtension,
} from "@themesystem/types";

// Re-export plugin types
export type { ThemeSystemConfig, ThemeSystemPlugin };
