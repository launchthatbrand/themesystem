import type { ThemeSystemConfig, ThemeSystemPlugin } from "@themesystem/types";

/**
 * Type guard to check if a plugin is an object with an apply method
 */
function isPluginObject(plugin: any): plugin is ThemeSystemPlugin {
  return (
    plugin && typeof plugin === "object" && typeof plugin.apply === "function"
  );
}

/**
 * Apply plugins to the configuration
 *
 * This function takes the initial configuration and applies each plugin in sequence.
 * Each plugin can modify the configuration object and return a new version.
 *
 * @param config The initial theme system configuration
 * @returns The configuration after all plugins have been applied
 */
export async function applyPlugins(
  config: ThemeSystemConfig,
): Promise<ThemeSystemConfig> {
  // If no plugins, return the config as is
  if (
    !config.plugins ||
    !Array.isArray(config.plugins) ||
    config.plugins.length === 0
  ) {
    return config;
  }

  // Apply each plugin in sequence
  let result = config;

  for (const plugin of config.plugins) {
    if (typeof plugin === "function") {
      // Handle function plugins
      const pluginResult = await plugin(result);
      // Ensure we're getting a valid config back
      if (pluginResult && typeof pluginResult === "object") {
        result = pluginResult as ThemeSystemConfig;
      }
    } else if (isPluginObject(plugin)) {
      // Handle object plugins with apply method
      const pluginResult = await plugin.apply(result);
      // Ensure we're getting a valid config back
      if (pluginResult && typeof pluginResult === "object") {
        result = pluginResult as ThemeSystemConfig;
      }
    }
  }

  return result;
}

/**
 * Build and validate the theme system configuration
 *
 * This follows the same pattern as PayloadCMS's buildConfig function.
 * It applies plugins to the configuration and then sanitizes/validates it.
 *
 * @param config The initial theme system configuration
 * @returns The final, validated configuration
 */
export async function buildConfig(
  config: ThemeSystemConfig,
): Promise<ThemeSystemConfig> {
  // Apply all plugins sequentially
  const configAfterPlugins = await applyPlugins(config);

  // TODO: Add validation/sanitization logic here
  // For now, just return the config after plugins
  return configAfterPlugins;
}

/**
 * Utility function to create a plugin
 *
 * This is a helper function to make it easier to create plugins with options.
 * It follows the same pattern as PayloadCMS plugins.
 *
 * @example
 * ```typescript
 * const myPlugin = createPlugin({
 *   name: 'my-plugin',
 *   apply: (config) => {
 *     // Modify config
 *     return config;
 *   }
 * });
 * ```
 */
export function createPlugin<T = Record<string, any>>(options: {
  /**
   * Plugin name for debugging
   */
  name: string;
  /**
   * Function that applies modifications to the config
   */
  apply: (
    config: ThemeSystemConfig,
    pluginOptions: T,
  ) => ThemeSystemConfig | Promise<ThemeSystemConfig>;
}) {
  return (pluginOptions: T = {} as T) =>
    async (config: ThemeSystemConfig) => {
      return await options.apply(config, pluginOptions);
    };
}
